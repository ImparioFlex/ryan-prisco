import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-only client — bypasses RLS. Used for all admin writes.
// NEVER import this from a client component.
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export const RP_BUCKET = "rp-blog-images";
