import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// Cabeçalhos CORS para permitir que o seu site chame esta função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// A URL da API do Gemini
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Dados de treinamento e persona da IA
const SYSTEM_PROMPT = `
Você é um assistente virtual da Combo Digital, uma agência de marketing e publicidade de vanguarda.
Sua personalidade é: prestativa, criativa, profissional e um pouco futurista.
Sua missão é ajudar os usuários, responder a perguntas sobre a Combo Digital e seus serviços (Estratégia, Design, Tecnologia, IA), e incentivar o contato para novos projetos.
Seja conciso e direto em suas respostas.

Responda à seguinte mensagem do usuário:
`;

serve(async (req) => {
  console.log("Função 'chat-ai' invocada.");

  // Responde a solicitações de pre-flight (necessário para CORS)
  if (req.method === 'OPTIONS') {
    console.log("Recebida solicitação OPTIONS. Respondendo com cabeçalhos CORS.");
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Pega a chave da API do Gemini dos secrets do Supabase
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error("ERRO CRÍTICO: GEMINI_API_KEY não encontrada nos secrets do Supabase.");
      throw new Error("GEMINI_API_KEY não foi configurada nos secrets do Supabase.");
    }
    console.log("GEMINI_API_KEY carregada com sucesso.");

    // Pega a mensagem do usuário do corpo da requisição
    const { message } = await req.json();
    if (!message) {
      console.warn("Recebida requisição sem mensagem.");
      return new Response(JSON.stringify({ error: "A mensagem não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    console.log(`Mensagem recebida do usuário: "${message}"`);

    const fullPrompt = `${SYSTEM_PROMPT}\n\nUsuário: "${message}"`;

    // Monta a requisição para a API do Gemini
    console.log("Enviando requisição para a API do Gemini...");
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }]
      })
    });

    console.log(`Resposta da API do Gemini - Status: ${geminiResponse.status}`);

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Erro da API do Gemini:", geminiResponse.status, errorBody);
      throw new Error(`A API do Gemini retornou um erro: ${geminiResponse.statusText}`);
    }

    const responseData = await geminiResponse.json();
    console.log("Resposta da API do Gemini recebida com sucesso.");
    
    // Verifica se a resposta tem o conteúdo esperado
    if (!responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content || !responseData.candidates[0].content.parts || !responseData.candidates[0].content.parts[0]) {
        console.error("Resposta inesperada da API do Gemini:", JSON.stringify(responseData, null, 2));
        throw new Error("Formato de resposta inválido da API do Gemini.");
    }

    // Extrai o texto da resposta da IA
    const botResponseText = responseData.candidates[0].content.parts[0].text;
    console.log(`Resposta gerada pela IA: "${botResponseText.substring(0, 50)}..."`);

    // Envia a resposta da IA de volta para o chat
    return new Response(JSON.stringify({ reply: botResponseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro capturado no bloco catch da Função Edge 'chat-ai':", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})