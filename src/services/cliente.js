import { createClient } from '@supabase/supabase-js';
const SUPABASEURL = import.meta.env.VITE_API_URL ;
const KEY = import.meta.env.VITE_API_KEY;
export const supabase = createClient(SUPABASEURL,KEY)