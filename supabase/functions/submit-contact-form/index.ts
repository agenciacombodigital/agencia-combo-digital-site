import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/api/v3/siteverify';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, message, token } = await req.json();

    // 1. Verificação do Turnstile (como antes)
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token de verificação não fornecido.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
      console.error("CLOUDFLARE_TURNSTILE_SECRET_KEY não encontrado.");
      return new Response(JSON.stringify({ error: "Erro de configuração do servidor." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const body = new URLSearchParams();
    body.append('secret', secretKey);
    body.append('response', token);
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      console.warn("Falha na verificação do Turnstile:", verificationData['error-codes']);
      return new Response(JSON.stringify({ error: 'Falha na verificação de segurança.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 2. Se a verificação passar, salvar no Supabase
    console.log("Verificação bem-sucedida. Salvando no banco de dados...");

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Erro ao salvar no banco de dados:", dbError);
      throw new Error("Não foi possível salvar sua mensagem. Tente novamente.");
    }

    // 3. Retornar sucesso
    return new Response(
      JSON.stringify({ message: 'Mensagem enviada com sucesso!' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Erro ao processar o formulário de contato:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Ocorreu um erro inesperado.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})