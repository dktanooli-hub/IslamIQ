import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration for IslamIQ
 * Project URL: https://udlunwwubmskgdbbjwee.supabase.co
 * 
 * Safe configuration with environment variable support.
 * Only the public publishable anon key is used on the client.
 * Secret service_role keys are NEVER exposed to the frontend.
 */
export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL || 'https://udlunwwubmskgdbbjwee.supabase.co';

export const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY.length > 20 &&
    SUPABASE_ANON_KEY !== 'placeholder-anon-key'
  );
};

// Singleton client instance - uses fallback placeholder to prevent module load crash if anon key unset
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
