import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

serve(async (req) => {
  // 1. Tratamento de CORS (Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 2. Segurança: Aceitar apenas POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // 3. Leitura Segura do Body (Evita Crash "Unexpected end of JSON")
    const rawBody = await req.text();
    if (!rawBody || rawBody.trim() === "") {
      return new Response(JSON.stringify({ error: 'Payload vazio.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { name, email, message, token } = JSON.parse(rawBody);

    // 4. Validação do Token
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token de segurança ausente.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error("ERRO CRÍTICO: Chave secreta não configurada no Supabase.");
        throw new Error("Erro de configuração do servidor.");
    }

    // Envio para Cloudflare
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', req.headers.get('x-forwarded-for') || '');

    const turnstileRes = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        body: formData,
    });

    const verification = await turnstileRes.json();

    if (!verification.success) {
        console.error('Falha Turnstile:', verification['error-codes']);
        return new Response(JSON.stringify({ 
            error: 'Falha na verificação de segurança.', 
            details: verification['error-codes'] 
        }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // 5. Sucesso - Gravar no Banco
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Erro Supabase:", dbError);
      throw new Error("Erro ao salvar no banco de dados.");
    }

    return new Response(
      JSON.stringify({ message: 'Obrigado! Sua mensagem foi enviada com sucesso.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error("Exception:", err);
    return new Response(
      JSON.stringify({ error: err.message || 'Erro interno no servidor.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});