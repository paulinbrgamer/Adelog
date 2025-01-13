import { createClient } from '@supabase/supabase-js';
const SUPABASEURL = 'https://ugldbslfvgfaxnblgmzo.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbGRic2xmdmdmYXhuYmxnbXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1Mzc1NzMsImV4cCI6MjA1MjExMzU3M30.0l5JdmYSSvRHNa5cFmJkygg4fUpkydiDdFbgo6BDTog'
export const supabase = createClient(SUPABASEURL,KEY)