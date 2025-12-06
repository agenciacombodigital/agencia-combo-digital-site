import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// URL correta para verificação do Cloudflare Turnstile
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

serve(async (req) => {
  console.log("Edge Function 'submit-contact-form' invoked.");

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Função de contato iniciada.");

    let parsedBody;
    try {
      parsedBody = await req.json();
      console.log("Corpo da requisição JSON recebido:", JSON.stringify(parsedBody));
    } catch (jsonError) {
      console.error("Erro ao fazer parse do JSON do corpo da requisição:", jsonError);
      return new Response(JSON.stringify({ error: `Corpo da requisição inválido ou vazio: ${jsonError.message}.` }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { name, email, message, token } = parsedBody;

    // --- ETAPA 1: VERIFICAÇÃO DO TURNSTILE ---
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token de verificação não fornecido.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
      console.error("ERRO CRÍTICO: A variável CLOUDFLARE_TURNSTILE_SECRET_KEY não está configurada.");
      return new Response(JSON.stringify({ error: "Erro de configuração do servidor (Turnstile Key)." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const body = new URLSearchParams();
    body.append('secret', secretKey);
    body.append('response', token);
    
    console.log(`[Turnstile] Enviando para verificação. Body: ${body.toString()}`);
    
    // Requisição POST para o endpoint de verificação
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    });

    console.log(`[Turnstile] Status da resposta: ${verificationResponse.status} ${verificationResponse.statusText}`);
    const rawTurnstileResponse = await verificationResponse.text();
    console.log("[Turnstile] Resposta bruta:", rawTurnstileResponse);

    let verificationData;
    try {
      verificationData = JSON.parse(rawTurnstileResponse);
    } catch (parseError) {
      console.error("[Turnstile] Erro ao parsear resposta como JSON:", parseError);
      // Se a resposta bruta estiver vazia (como no log 405), lançamos um erro mais claro.
      if (rawTurnstileResponse.trim() === '') {
          throw new Error(`Falha na comunicação com o Turnstile. Status: ${verificationResponse.status}. Resposta vazia.`);
      }
      return new Response(JSON.stringify({ error: `Resposta inválida do Turnstile. Corpo: '${rawTurnstileResponse}'` }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (!verificationData.success) {
      console.warn("[Turnstile] Falha na verificação:", verificationData['error-codes']);
      return new Response(JSON.stringify({ error: 'Falha na verificação de segurança.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    console.log("[Turnstile] Verificação bem-sucedida.");

    // --- ETAPA 2: INSERÇÃO NO BANCO DE DADOS ---
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Usar service role key para operações server-side
    );

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { name, email, message },
      ]);

    if (error) {
      console.error("Erro ao inserir no Supabase:", error);
      return new Response(JSON.stringify({ error: `Erro ao salvar sua mensagem: ${error.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Mensagem de contato salva com sucesso no Supabase.");
    
    return new Response(
      JSON.stringify({ message: 'Obrigado! Sua mensagem foi enviada com sucesso.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Erro capturado no bloco principal da função:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Ocorreu um erro inesperado.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})