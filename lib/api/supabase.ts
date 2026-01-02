import { createClient } from '@supabase/supabase-js';

// These environment variables will be available on Cloudflare and Vercel
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''; // Only used on backend/Vercel

// Client for client-side operations (public/anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Client for server-side admin operations (bypasses RLS)
 * WARNING: Only use this in API routes (server-side), NEVER on the client.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
