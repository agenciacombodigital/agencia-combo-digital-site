import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/api/v3/siteverify';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, token } = await req.json();

    if (!name || !email || !message || !token) {
      return new Response(JSON.stringify({ error: "Todos os campos e o token são obrigatórios." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error("A chave secreta do Turnstile não foi encontrada.");
        return new Response(JSON.stringify({ error: "Erro de configuração do servidor: Chave secreta ausente." }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Enviando a verificação para a Cloudflare usando o formato JSON
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: secretKey,
            response: token,
        }),
    });

    if (!verificationResponse.ok) {
        const errorText = await verificationResponse.text();
        console.error(`Cloudflare API returned an error: ${verificationResponse.status} ${verificationResponse.statusText}`, errorText);
        return new Response(JSON.stringify({ error: `Erro de comunicação com o serviço de verificação. Status: ${verificationResponse.status}` }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    const verificationData = await verificationResponse.json();
    console.log("Resposta da verificação do Turnstile:", verificationData);

    if (!verificationData.success) {
        console.warn("Falha na verificação do Turnstile:", verificationData['error-codes']);
        const errorCodes = verificationData['error-codes']?.join(', ') || 'desconhecido';
        return new Response(JSON.stringify({ error: `Falha na verificação de segurança. Código: ${errorCodes}` }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log("Formulário verificado com sucesso! Dados:", { name, email, message });

    return new Response(JSON.stringify({ message: "Mensagem enviada com sucesso!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro CRÍTICO na função 'submit-contact-form':", error);
    return new Response(JSON.stringify({ error: `Erro interno do servidor: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})