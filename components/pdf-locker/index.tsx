"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createBrowserClient, STORAGE_BUCKET } from "@/lib/supabase";
import { FileDropZone } from "./file-drop-zone";
import { FileList } from "./file-list";
import { LockOptionsPanel } from "./lock-options";
import { ProcessingControls } from "./processing-controls";
import {
  type PdfLockFileInfo,
  type LockOptions,
  type LockResponse,
  type ProcessingStats,
  FILE_STATUS,
  ENCRYPTION_METHODS,
  RESTRICTIONS,
} from "@/lib/types";
import { generateId } from "@/lib/utils";

function getSupabase() {
  return createBrowserClient();
}

export function PdfLocker() {
  const [files, setFiles] = useState<PdfLockFileInfo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<ProcessingStats>({
    total: 0,
    processed: 0,
    succeeded: 0,
    failed: 0,
  });
  const [options, setOptions] = useState<LockOptions>({
    openPassword: "",
    permissionPassword: "",
    restrictions: [
      RESTRICTIONS.PRINTING,
      RESTRICTIONS.COPYING,
      RESTRICTIONS.EDITING,
      RESTRICTIONS.PAGE_EXTRACTION,
      RESTRICTIONS.COMMENTING,
      RESTRICTIONS.FORM_FILLING,
      RESTRICTIONS.DOCUMENT_ASSEMBLY,
    ],
    encryptionMethod: ENCRYPTION_METHODS.AES_256,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // ────────────────────────────────────────────
  // Upload to Supabase Storage
  // ────────────────────────────────────────────

  const uploadToStorage = async (file: File): Promise<string> => {
    const storagePath = `uploads/${Date.now()}-${generateId()}-${file.name}`;
    const { error } = await getSupabase().storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    return storagePath;
  };

  // ────────────────────────────────────────────
  // File Management
  // ────────────────────────────────────────────

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const fileInfos: PdfLockFileInfo[] = newFiles.map((file) => ({
      id: generateId(),
      file,
      name: file.name,
      size: file.size,
      relativePath:
        (file as File & { webkitRelativePath?: string })
          .webkitRelativePath || file.name,
      status: FILE_STATUS.UPLOADING,
    }));

    setFiles((prev) => [...prev, ...fileInfos]);

    // Upload each file to Supabase Storage
    fileInfos.forEach(async (fileInfo) => {
      try {
        const storagePath = await uploadToStorage(fileInfo.file);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileInfo.id
              ? { ...f, storagePath, status: FILE_STATUS.READY }
              : f
          )
        );
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileInfo.id
              ? {
                  ...f,
                  status: FILE_STATUS.FAILED,
                  errorMessage:
                    error instanceof Error
                      ? error.message
                      : "Upload failed",
                }
              : f
          )
        );
      }
    });

    toast.success(
      `${newFiles.length} ${newFiles.length === 1 ? "file" : "files"} added`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setFiles([]);
    setStats({ total: 0, processed: 0, succeeded: 0, failed: 0 });
  }, []);

  // ────────────────────────────────────────────
  // Lock Processing
  // ────────────────────────────────────────────

  const lockSingleFile = async (
    fileInfo: PdfLockFileInfo,
    signal: AbortSignal
  ): Promise<{
    success: boolean;
    signedUrl?: string;
    fileName?: string;
    error?: string;
  }> => {
    const response = await fetch("/api/lock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storagePath: fileInfo.storagePath,
        openPassword: options.openPassword || undefined,
        permissionPassword: options.permissionPassword || undefined,
        restrictions: options.restrictions,
        encryptionMethod: options.encryptionMethod,
        fileName: fileInfo.name,
      }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Lock failed" };
    }

    const data: LockResponse = await response.json();
    return {
      success: true,
      signedUrl: data.signedUrl,
      fileName: data.fileName,
    };
  };

  const handleLockAll = useCallback(async () => {
    const filesToProcess = files.filter(
      (f) =>
        f.status === FILE_STATUS.READY || f.status === FILE_STATUS.FAILED
    );

    if (filesToProcess.length === 0) {
      toast.error("No files ready to process");
      return;
    }

    if (!options.openPassword && !options.permissionPassword) {
      toast.error("At least one password is required");
      return;
    }

    const total = filesToProcess.length;
    setIsProcessing(true);
    setStats({ total, processed: 0, succeeded: 0, failed: 0 });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let succeeded = 0;
    let failed = 0;

    for (const file of filesToProcess) {
      if (controller.signal.aborted) break;

      // Mark as processing
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: FILE_STATUS.PROCESSING, errorMessage: undefined }
            : f
        )
      );

      try {
        const result = await lockSingleFile(file, controller.signal);

        if (result.success && result.signedUrl) {
          succeeded++;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: FILE_STATUS.SUCCESS,
                    signedUrl: result.signedUrl,
                    lockedFileName: result.fileName,
                    errorMessage: undefined,
                  }
                : f
            )
          );
        } else {
          failed++;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: FILE_STATUS.FAILED,
                    errorMessage: result.error || "Lock failed",
                  }
                : f
            )
          );
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: FILE_STATUS.READY,
                    errorMessage: "Stopped by user",
                  }
                : f
            )
          );
          break;
        }
        failed++;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  status: FILE_STATUS.FAILED,
                  errorMessage:
                    error instanceof Error
                      ? error.message
                      : "Unexpected error",
                }
              : f
          )
        );
      }

      setStats((prev) => ({
        ...prev,
        processed: prev.processed + 1,
        succeeded,
        failed,
      }));
    }

    setIsProcessing(false);
    abortControllerRef.current = null;

    if (succeeded > 0) {
      toast.success(
        `${succeeded} ${succeeded === 1 ? "file" : "files"} locked successfully`
      );
    }
    if (failed > 0) {
      toast.error(
        `${failed} ${failed === 1 ? "file" : "files"} failed to lock`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, options]);

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
    toast.info("Stopping... current file will complete first");
  }, []);

  // ────────────────────────────────────────────
  // Download
  // ────────────────────────────────────────────

  const handleDownloadFile = useCallback(
    async (id: string) => {
      const file = files.find((f) => f.id === id);
      if (!file?.signedUrl) return;

      try {
        const response = await fetch(file.signedUrl);
        if (!response.ok) throw new Error("Download failed");
        const blob = await response.blob();
        const outputName =
          file.lockedFileName ||
          file.name.replace(/\.pdf$/i, "_locked.pdf");
        saveAs(blob, outputName);
      } catch (error) {
        console.error("Download error:", error);
        toast.error("Failed to download file. Link may have expired.");
      }
    },
    [files]
  );

  const handleDownloadAll = useCallback(async () => {
    const lockedFiles = files.filter(
      (f) => f.status === FILE_STATUS.SUCCESS && f.signedUrl
    );

    if (lockedFiles.length === 0) return;

    if (lockedFiles.length === 1) {
      await handleDownloadFile(lockedFiles[0].id);
      return;
    }

    // Multiple files — create ZIP
    toast.info("Creating ZIP file...");
    const zip = new JSZip();

    for (const file of lockedFiles) {
      try {
        const response = await fetch(file.signedUrl!);
        if (!response.ok) continue;
        const blob = await response.blob();
        const pathParts = file.relativePath || file.name;
        const outputPath = pathParts.replace(/\.pdf$/i, "_locked.pdf");
        zip.file(outputPath, blob);
      } catch (error) {
        console.error(`Failed to fetch ${file.name}:`, error);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "locked_pdfs.zip");
    toast.success("ZIP downloaded");
  }, [files, handleDownloadFile]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setStats({ total: 0, processed: 0, succeeded: 0, failed: 0 });
  }, []);

  // ────────────────────────────────────────────
  // Computed state
  // ────────────────────────────────────────────

  const hasFiles = files.length > 0;
  const hasReadyFiles = files.some(
    (f) => f.status === FILE_STATUS.READY || f.status === FILE_STATUS.FAILED
  );
  const hasLockedFiles = files.some(
    (f) => f.status === FILE_STATUS.SUCCESS && f.signedUrl
  );
  const hasValidOptions =
    !!options.openPassword || !!options.permissionPassword;

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <FileDropZone
        onFilesAdded={handleFilesAdded}
        isProcessing={isProcessing}
      />

      {/* File List */}
      <FileList
        files={files}
        onRemoveFile={handleRemoveFile}
        onClearAll={handleClearAll}
        onDownloadFile={handleDownloadFile}
        isProcessing={isProcessing}
      />

      {/* Options */}
      {hasFiles && (
        <LockOptionsPanel
          options={options}
          onOptionsChange={setOptions}
          isProcessing={isProcessing}
        />
      )}

      {/* Processing Controls */}
      {hasFiles && (
        <ProcessingControls
          isProcessing={isProcessing}
          hasFiles={hasFiles}
          hasReadyFiles={hasReadyFiles}
          hasLockedFiles={hasLockedFiles}
          hasValidOptions={hasValidOptions}
          stats={stats}
          onLockAll={handleLockAll}
          onStop={handleStop}
          onDownloadAll={handleDownloadAll}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
