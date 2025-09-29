import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// Cabeçalhos CORS para permitir que o seu site chame esta função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// A URL da API do Gemini
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

serve(async (req) => {
  // Responde a solicitações de pre-flight (necessário para CORS)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Pega a chave da API do Gemini dos secrets do Supabase
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error("A chave da API do Gemini não foi configurada nos secrets do Supabase.");
    }

    // Pega a mensagem do usuário do corpo da requisição
    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "A mensagem não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Monta a requisição para a API do Gemini
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }]
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Erro da API do Gemini:", errorData);
      throw new Error(`Erro na API do Gemini: ${geminiResponse.statusText}`);
    }

    const responseData = await geminiResponse.json();
    // Extrai o texto da resposta da IA
    const botResponseText = responseData.candidates[0].content.parts[0].text;

    // Envia a resposta da IA de volta para o chat
    return new Response(JSON.stringify({ reply: botResponseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})