import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Browser client — uses publishable key, safe for client-side
export function createBrowserClient() {
  return createClient(supabaseUrl, supabasePublishableKey);
}

// Server client — uses service role key, bypasses RLS
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export const STORAGE_BUCKET = "pdf-files";
