import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/api/v3/siteverify';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, message, token } = await req.json();

    // 1. Validar se o token do Turnstile foi enviado
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token de verificação de segurança não fornecido.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error("A chave secreta do Turnstile (CLOUDFLARE_TURNSTILE_SECRET_KEY) não foi encontrada nos segredos da função.");
        return new Response(JSON.stringify({ error: "Erro de configuração do servidor: Chave de segurança ausente." }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // 2. Preparar e enviar a verificação para a Cloudflare
    const body = new URLSearchParams();
    body.append('secret', secretKey);
    body.append('response', token);
    const remoteip = req.headers.get('x-forwarded-for');
    if (remoteip) {
      body.append('remoteip', remoteip);
    }

    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });

    const verificationData = await verificationResponse.json();

    // 3. Se a verificação falhar, retornar erro
    if (!verificationData.success) {
      console.warn("Falha na verificação do Turnstile:", verificationData['error-codes']);
      return new Response(
        JSON.stringify({ 
          error: 'Falha na verificação de segurança. Por favor, tente novamente.',
          details: verificationData['error-codes'] 
        }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // 4. Se a verificação passar, o processo continua.
    // (Aqui é onde a lógica de salvar no banco de dados ou enviar email entraria no futuro)
    console.log("Verificação do Turnstile bem-sucedida. Dados do formulário:", { name, email });


    // 5. Retornar sucesso
    return new Response(
      JSON.stringify({ 
        message: 'Mensagem enviada com sucesso!' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Erro ao processar o formulário de contato:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Ocorreu um erro inesperado.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})