const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// support common env var names (case-insensitive variants)
const supabaseurl = process.env.SUPABASE_URL || process.env.supabase_url;
const supabaseanonkey = process.env.SUPABASE_ANON_KEY || process.env.supabase_anon_key;

if (!supabaseurl || !supabaseanonkey) {
	throw new Error('Missing Supabase configuration: set SUPABASE_URL and SUPABASE_ANON_KEY in environment or .env');
}

const supabase = createClient(supabaseurl, supabaseanonkey);

module.exports = supabase;