import { createServerClient, STORAGE_BUCKET } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Vercel cron will call this every hour
export async function GET(request: Request) {
  // Verify cron secret (optional security layer)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  let deletedCount = 0;

  // Clean up uploaded (input) files
  const { data: uploads } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list("uploads", { limit: 1000 });

  if (uploads && uploads.length > 0) {
    const oldUploads = uploads.filter(
      (f) => f.created_at && f.created_at < oneHourAgo
    );
    if (oldUploads.length > 0) {
      const paths = oldUploads.map((f) => `uploads/${f.name}`);
      const { data } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove(paths);
      deletedCount += data?.length ?? 0;
    }
  }

  // Clean up locked (output) files
  const { data: locked } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list("locked", { limit: 1000 });

  if (locked && locked.length > 0) {
    const oldLocked = locked.filter(
      (f) => f.created_at && f.created_at < oneHourAgo
    );
    if (oldLocked.length > 0) {
      const paths = oldLocked.map((f) => `locked/${f.name}`);
      const { data } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove(paths);
      deletedCount += data?.length ?? 0;
    }
  }

  return NextResponse.json({
    success: true,
    deletedCount,
    timestamp: new Date().toISOString(),
  });
}
