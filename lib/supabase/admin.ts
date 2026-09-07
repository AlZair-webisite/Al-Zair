import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oadpkwwcwndocanqnltd.supabase.co';
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZHBrd3djd25kb2NhbnFubHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODU5ODMwMCwiZXhwIjoyMTA0MTc0MzAwfQ.jGHfCjdoiCbQSAgKOFHupv5xte9AxLJ7MjvTBTWZ60w';

/**
 * Server-only Supabase client with full admin privileges (bypasses RLS).
 * Never expose this client to the browser.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
