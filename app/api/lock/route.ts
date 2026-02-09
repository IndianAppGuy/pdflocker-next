import * as mupdf from "mupdf";
import { createServerClient, STORAGE_BUCKET } from "@/lib/supabase";
import {
  type Restriction,
  type EncryptionMethod,
  calculatePermissions,
} from "@/lib/types";

interface LockRequestBody {
  storagePath: string;
  openPassword?: string;
  permissionPassword?: string;
  restrictions: Restriction[];
  encryptionMethod: EncryptionMethod;
  fileName: string;
}

export async function POST(request: Request) {
  try {
    const body: LockRequestBody = await request.json();
    const {
      storagePath,
      openPassword,
      permissionPassword,
      restrictions,
      encryptionMethod,
      fileName,
    } = body;

    if (!storagePath) {
      return Response.json(
        { error: "No storage path provided" },
        { status: 400 }
      );
    }

    if (!openPassword && !permissionPassword) {
      return Response.json(
        { error: "At least one password must be provided" },
        { status: 400 }
      );
    }

    // Download file from Supabase Storage
    const supabase = createServerClient();
    const { data: fileData, error: downloadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .download(storagePath);

    if (downloadError || !fileData) {
      console.error("Storage download error:", downloadError);
      return Response.json(
        { error: "Failed to download file from storage" },
        { status: 500 }
      );
    }

    const buffer = await fileData.arrayBuffer();

    // Open the document
    const doc = mupdf.Document.openDocument(
      Buffer.from(buffer),
      "application/pdf"
    );

    // Cast to PDFDocument for save operations
    const pdfDoc = doc as mupdf.PDFDocument;

    // Build the permissions integer
    const permissions = calculatePermissions(restrictions);

    // Build save options string for encryption
    const saveOptionsParts: string[] = [];

    // Set encryption method
    saveOptionsParts.push(`encrypt=${encryptionMethod}`);

    // Set user password (document open password)
    if (openPassword) {
      saveOptionsParts.push(`user-password=${openPassword}`);
    }

    // Set owner password (permissions password)
    // If only open password is provided, use it as owner password too
    const ownerPwd = permissionPassword || openPassword;
    if (ownerPwd) {
      saveOptionsParts.push(`owner-password=${ownerPwd}`);
    }

    // Set permissions
    saveOptionsParts.push(`permissions=${permissions}`);

    // Add optimization flags
    saveOptionsParts.push("garbage=compact");
    saveOptionsParts.push("clean");

    const saveOptions = saveOptionsParts.join(",");

    // Save the locked PDF
    const outputBuffer = pdfDoc.saveToBuffer(saveOptions);
    const outputBytes = outputBuffer.asUint8Array();
    doc.destroy();

    // Generate output filename
    const originalName = (fileName || "document").replace(/\.pdf$/i, "");
    const outputName = `${originalName}_locked.pdf`;

    // Upload locked file to Supabase Storage
    const outputPath = `locked/${Date.now()}-${outputName}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(outputPath, Buffer.from(outputBytes), {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return Response.json(
        { error: "Failed to save locked file" },
        { status: 500 }
      );
    }

    // Generate signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(outputPath, 3600);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Signed URL error:", signedUrlError);
      return Response.json(
        { error: "Failed to generate download link" },
        { status: 500 }
      );
    }

    return Response.json({
      signedUrl: signedUrlData.signedUrl,
      fileName: outputName,
    });
  } catch (error) {
    console.error("Lock error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to lock PDF";
    return Response.json({ error: message }, { status: 500 });
  }
}
