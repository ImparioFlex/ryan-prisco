import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — read-only via RLS. Used on public blog pages.
export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false },
});
