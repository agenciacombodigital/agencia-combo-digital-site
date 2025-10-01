import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/api/v3/siteverify';

serve(async (req) => {
  // Handle CORS preflight request
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
        return new Response(JSON.stringify({ error: "Erro de configuração do servidor." }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Verify the token with Cloudflare using the correct 'application/x-www-form-urlencoded' format
    const body = new URLSearchParams();
    body.append('secret', secretKey);
    body.append('response', token);

    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
        console.warn("Falha na verificação do Turnstile:", verificationData['error-codes']);
        return new Response(JSON.stringify({ error: "Falha na verificação de segurança. Por favor, tente novamente." }), {
            status: 403, // Forbidden
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Se a verificação for bem-sucedida, processe os dados do formulário
    console.log("Formulário verificado com sucesso! Dados:", { name, email, message });

    // Retorne uma resposta de sucesso
    return new Response(JSON.stringify({ message: "Mensagem enviada com sucesso!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro na função 'submit-contact-form':", error.message);
    return new Response(JSON.stringify({ error: `Erro interno do servidor: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})