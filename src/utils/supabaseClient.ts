import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qkafsykwvoktrorayexm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYWZzeWt3dm9rdHJvcmF5ZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDUwNzAsImV4cCI6MjA2NDE4MTA3MH0.zmmwags9kn1Asiihy3B3LkdXUp0q6wSd6ATTzGBsd1I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
