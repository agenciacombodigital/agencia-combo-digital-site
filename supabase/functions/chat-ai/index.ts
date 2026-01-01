import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

// Configurações do Gemini
const GEMINI_API_MODEL = "gemini-1.5-flash"; // Versão estável
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

const SYSTEM_PROMPT = `
Você é o **Combo Jam**, o estrategista digital da agência Combo Digital.
Sua vibe é: Especialista, ágil, inovador e focado em crescimento. Você não é um robô de suporte, é um consultor que ajuda empresas a venderem mais com IA.
A Combo Digital é uma agência que foca em: Estratégia de Dados, Design de UI/UX, Tecnologia Imersiva e Automação com IA.
Sempre seja amigável e incentive o usuário a conhecer nossos serviços ou agendar uma conversa.
`;

serve(async (req) => {
  // Tratamento de CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY_CHATBOT');
    if (!geminiApiKey) {
      throw new Error("Chave de API do Gemini não configurada.");
    }

    const { message, sessionContext } = await req.json();

    const response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\nContexto da sessão: ${JSON.stringify(sessionContext)}\nPergunta do usuário: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Erro na API do Gemini:", data);
      throw new Error(data.error?.message || "Erro desconhecido na API de IA.");
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, estou com dificuldades para processar isso agora.";

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro na Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})