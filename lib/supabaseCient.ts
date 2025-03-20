import { createClient } from "@supabase/supabase-js";

const supabaseClientUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseClientKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabaseClient = createClient(
  supabaseClientUrl,
  supabaseClientKey,
);
