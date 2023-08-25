import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfxzahzhfavlgrhwxoqr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeHphaHpoZmF2bGdyaHd4b3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNTE5ODQsImV4cCI6MjAwNzkyNzk4NH0.BM9uNGWwbGL3dfBmkK3kk1JX9RJsaOsC3E3NbkdPtOY';

// Create the Supabase client using the provided URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
