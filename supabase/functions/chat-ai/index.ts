import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

// ATUALIZADO: Usando Gemini 2.5 Flash (Versão Estável Atual)
const GEMINI_API_MODEL = "gemini-2.5-flash"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

serve(async (req) => {
  // 1. Tratamento de CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY_CHATBOT');
    if (!geminiApiKey) {
      throw new Error("Chave de API do Gemini não configurada.");
    }

    const { message, sessionContext } = await req.json();

    // 2. Inteligência Temporal (Data e Hora de Brasília)
    // Calcula a data exata no Brasil para a IA não alucinar datas
    const now = new Date();
    const timeZone = 'America/Sao_Paulo';
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const dataHoraAtual = formatter.format(now);

    // 3. Prompt do Sistema (Com Data Injetada)
    const SYSTEM_PROMPT = `
    Você é o **Combo Jam**, o estrategista digital da agência Combo Digital.
    
    **CONTEXTO TEMPORAL (CRÍTICO):**
    Hoje é: **${dataHoraAtual}** (Horário de Brasília).
    Use essa data como referência absoluta. Se o usuário perguntar "que dia é hoje", responda com essa informação.

    **Sua Personalidade:**
    - Especialista, ágil, inovador e focado em crescimento.
    - Você não é um robô de suporte, é um consultor.
    
    **Sobre a Combo Digital:**
    - Foco: Estratégia de Dados, Design UI/UX, Tecnologia Imersiva e Automação com IA.
    
    **Diretrizes:**
    - Respostas curtas e impactantes.
    - Incentive o agendamento de conversa.
    `;

    // 4. Chamada para a API (Gemini 2.5)
    const response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\nContexto da sessão: ${JSON.stringify(sessionContext || {})}\n\nPergunta do usuário: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Erro na API do Gemini:", JSON.stringify(data));
      // Tratamento específico para erro de modelo não encontrado (caso a chave não tenha acesso ao 2.5 ainda)
      if (data.error?.code === 404) {
         throw new Error("Modelo Gemini 2.5 não encontrado. Verifique a chave ou o endpoint.");
      }
      throw new Error(data.error?.message || "Erro desconhecido na API.");
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, tive um lapso. Pode repetir?";

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erro na Edge Function:", error.message);
    return new Response(JSON.stringify({ 
        reply: "Minha conexão neural está reiniciando para atualização (Gemini 2.5) 🚀. Tente novamente em alguns segundos ou me chame no WhatsApp!" 
    }), {
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})