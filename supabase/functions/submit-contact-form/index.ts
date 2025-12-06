import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

serve(async (req) => {
  // 1. Log inicial para debug
  console.log(`[Edge Function] Iniciada. Método: ${req.method}`);

  // 2. Tratamento de CORS (Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 3. Bloqueio de Métodos Incorretos (Se chegar GET, rejeita aqui e não quebra)
  if (req.method !== 'POST') {
    console.error(`[Erro] Método não permitido: ${req.method}`);
    return new Response(JSON.stringify({ error: 'Método não permitido. Use POST.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // 4. Leitura Segura do Body (Lê texto primeiro para evitar SyntaxError)
    const rawBody = await req.text();
    if (!rawBody) {
      console.error("[Erro] Corpo da requisição está vazio.");
      return new Response(JSON.stringify({ error: 'O corpo da requisição está vazio.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const parsedBody = JSON.parse(rawBody);
    console.log("[Debug] Payload recebido:", JSON.stringify(parsedBody));

    const { name, email, message, token } = parsedBody;

    // --- VALIDAÇÃO DO TURNSTILE ---
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token de segurança não fornecido.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error("ERRO CRÍTICO: Variável CLOUDFLARE_TURNSTILE_SECRET_KEY não definida.");
        return new Response(JSON.stringify({ error: "Erro interno de configuração." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', req.headers.get('x-forwarded-for') || '');

    const turnstileResult = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        body: formData,
    });

    const verification = await turnstileResult.json();
    console.log("[Turnstile] Resultado:", verification);

    if (!verification.success) {
        return new Response(JSON.stringify({ error: 'Falha na verificação de segurança.', details: verification['error-codes'] }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // --- SALVAR NO SUPABASE ---
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("[Supabase] Erro ao salvar:", dbError);
      throw new Error("Erro ao salvar no banco de dados.");
    }

    return new Response(
      JSON.stringify({ message: 'Obrigado! Sua mensagem foi enviada com sucesso.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error("[Exception]", err);
    return new Response(
      JSON.stringify({ error: err.message || 'Erro interno no servidor.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});