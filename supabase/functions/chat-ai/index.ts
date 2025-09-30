import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

// Alterado para gemini-2.5-flash conforme o guia fornecido pelo usuário
const GEMINI_API_MODEL = "gemini-2.5-flash"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

const SYSTEM_PROMPT = `
Você é um assistente virtual da Combo Digital, uma agência de marketing e publicidade de vanguarda.
Sua personalidade é: prestativa, criativa, profissional e um pouco futurista.
Sua missão é ajudar os usuários, responder a perguntas sobre a Combo Digital e seus serviços (Estratégia, Design, Tecnologia, IA), e incentivar o contato para novos projetos.
Seja conciso e direto em suas respostas.

Responda à seguinte mensagem do usuário:
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY_CHATBOT');
    
    console.log(`[chat-ai Edge Function] Usando modelo: ${GEMINI_API_MODEL}`);
    console.log(`[chat-ai Edge Function] Chamando URL: ${GEMINI_API_URL}`);

    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: "A chave GEMINI_API_KEY_CHATBOT não foi encontrada. Por favor, configure-a nos segredos do Supabase." }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "A mensagem do usuário não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUsuário: "${message}"`;

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }]
      })
    });

    const responseData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Erro da API do Gemini:", JSON.stringify(responseData, null, 2));
      const errorMessage = responseData.error?.message || `Erro desconhecido da API do Gemini (Status: ${geminiResponse.status})`;
      return new Response(JSON.stringify({ error: `Falha ao se comunicar com o Gemini: ${errorMessage}` }), {
        status: geminiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const botResponseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!botResponseText) {
        console.error("Formato de resposta inesperado da API do Gemini:", JSON.stringify(responseData, null, 2));
        throw new Error("A API do Gemini retornou uma resposta em um formato inesperado.");
    }

    return new Response(JSON.stringify({ reply: botResponseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro na Função Edge 'chat-ai':", error.message);
    return new Response(JSON.stringify({ error: `Erro interno do servidor: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})