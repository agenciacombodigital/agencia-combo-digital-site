import { createClient } from '@supabase/supabase-js';

// Next.js uses process.env for environment variables. 
// Client-side variables must be prefixed with NEXT_PUBLIC_.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Note: In Next.js, these checks should ideally happen in getStaticProps/getServerSideProps 
  // or be handled gracefully on the client side if they are client-only variables.
  console.error('As variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são necessárias!');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');