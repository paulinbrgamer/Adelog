import { createClient } from '@supabase/supabase-js';
const SUPABASEURL = process.env.REACT_APP_SUPABASE_URL;
const KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASEURL,KEY)