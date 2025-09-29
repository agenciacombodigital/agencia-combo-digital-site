import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ATUALIZADO: Alterado para usar o modelo gemini-1.5-flash e a versão v1 da API, conforme a sugestão do Gemini.
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

const SYSTEM_PROMPT = `
Você é um assistente virtual da Combo Digital, uma agência de marketing e publicidade de vanguarda.
Sua personalidade é: prestativa, criativa, profissional e um pouco futurista.
Sua missão é ajudar os usuários, responder a perguntas sobre a Combo Digital e seus serviços (Estratégia, Design, Tecnologia, IA), e incentivar o contato para novos projetos.
Seja conciso e direto em suas respostas.

Responda à seguinte mensagem do usuário:
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error("A chave GEMINI_API_KEY não foi encontrada nos segredos do Supabase.");
    }

    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "A mensagem não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUsuário: "${message}"`;

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }]
      })
    });

    const responseData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const errorMessage = responseData.error?.message || `Erro ${geminiResponse.status} - ${geminiResponse.statusText}`;
      console.error("Erro da API do Gemini:", JSON.stringify(responseData));
      // Return the specific error from Google to the client
      return new Response(JSON.stringify({ error: `A API do Google retornou um erro: "${errorMessage}"` }), {
        status: geminiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const botResponseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!botResponseText) {
        console.error("Formato de resposta inesperado da API do Gemini:", JSON.stringify(responseData));
        throw new Error("Formato de resposta inválido da API do Gemini.");
    }

    return new Response(JSON.stringify({ reply: botResponseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro na Função Edge 'chat-ai':", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})