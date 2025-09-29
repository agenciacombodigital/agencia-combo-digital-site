import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error("A chave da API do Gemini não foi configurada nos secrets do Supabase.");
    }

    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "A mensagem não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- INÍCIO DA PERSONALIZAÇÃO ---
    const systemPrompt = `
      Você é o 'Combo Jam', o assistente de IA da agência de marketing e publicidade Combo Digital.
      Sua personalidade é: futurista, ousada, criativa e extremamente prestativa. Você adora a fusão de tecnologia e arte.
      Sua missão é ajudar os visitantes do site a entenderem o que a Combo Digital faz e incentivá-los a entrar em contato.

      Aqui estão as informações sobre a Combo Digital que você DEVE usar para responder:
      ---
      [INFORMAÇÕES DA AGÊNCIA AQUI - SERÁ SUBSTITUÍDO PELO TEXTO DO USUÁRIO]
      ---
      
      Regras para responder:
      1.  Sempre se apresente como 'Combo Jam'.
      2.  Use as informações fornecidas acima para basear TODAS as suas respostas.
      3.  Se você não souber a resposta com base nas informações, diga que não tem essa informação, mas que pode conectar o usuário com a equipe humana da Combo.
      4.  Seja conciso e direto.
      5.  Sempre que apropriado, termine suas respostas incentivando o usuário a preencher o formulário de contato ou a chamar no WhatsApp para uma conversa mais aprofundada.
    `;

    const fullPrompt = `${systemPrompt}\n\nPergunta do Usuário: ${message}`;
    // --- FIM DA PERSONALIZAÇÃO ---

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }] // Usando o prompt completo e personalizado
        }]
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Erro da API do Gemini:", errorData);
      throw new Error(`Erro na API do Gemini: ${geminiResponse.statusText}`);
    }

    const responseData = await geminiResponse.json();
    const botResponseText = responseData.candidates[0].content.parts[0].text;

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