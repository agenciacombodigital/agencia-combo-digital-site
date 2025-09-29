import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificamos se as variáveis estão presentes.
if (!supabaseUrl || !supabaseAnonKey) {
  // Em vez de travar o aplicativo, registramos um erro claro no console.
  // Isso ajuda na depuração e permite que o resto do aplicativo seja carregado.
  console.error('As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não foram definidas.');
  console.error('O aplicativo será carregado, mas os recursos que dependem do Supabase, como o chat, não funcionarão.');
}

// Criamos o cliente. Se as variáveis estiverem ausentes, o createClient receberá strings vazias.
// Isso não travará o aplicativo na importação; as funcionalidades que o utilizam falharão de forma controlada mais tarde.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Também exportamos uma flag para verificar facilmente se o Supabase está configurado.
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);