import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oadpkwwcwndocanqnltd.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZHBrd3djd25kb2NhbnFubHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1OTgzMDAsImV4cCI6MjEwNDE3NDMwMH0.YLjskb4sIzJ1lJ1nviP-gJI7Qv2yvCAkJPssKWM9F-M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
