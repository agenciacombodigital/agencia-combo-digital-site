import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

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
    console.log("Função de contato iniciada.");

    let parsedBody;
    try {
      // Tenta ler o corpo da requisição diretamente como JSON
      parsedBody = await req.json();
      console.log("Corpo da requisição JSON recebido:", JSON.stringify(parsedBody));
    } catch (jsonError) {
      console.error("Erro ao fazer parse do JSON do corpo da requisição:", jsonError);
      // Se o erro for 'Unexpected end of JSON input', significa que o corpo estava vazio ou incompleto.
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
    
    console.log("Verificando token do Turnstile...");
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    });
    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      console.warn("Falha na verificação do Turnstile:", verificationData['error-codes']);
      return new Response(JSON.stringify({ error: 'Falha na verificação de segurança.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    console.log("Verificação do Turnstile bem-sucedida.");

    // --- ETAPA 2: PULAR O BANCO DE DADOS E RETORNAR SUCESSO ---
    console.log("TESTE: Inserção no banco de dados pulada. Retornando sucesso para diagnóstico.");
    
    return new Response(
      JSON.stringify({ message: 'Teste bem-sucedido! A verificação de segurança passou.' }),
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