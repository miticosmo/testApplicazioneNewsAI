import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybpzgggwldoexdjjsefb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicHpnZ2d3bGRvZXhkampzZWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Njk0MzQsImV4cCI6MjA4NjU0NTQzNH0.Jr_Hbu7UzLl6KOfVB3aE35VBYgLiUBS8E1UBioXEwvY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
