import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

// ATUALIZADO: Usando Gemini 2.5 Flash (Versão Estável 2025)
const GEMINI_API_MODEL = "gemini-2.5-flash"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

const SYSTEM_PROMPT_TEMPLATE = `
Você é o **Combo Jam**, o estrategista digital da agência Combo Digital.
Sua vibe é: Especialista, ágil, inovador e focado em crescimento. Você não é um robô de suporte, é um consultor que ajuda empresas a venderem mais com IA.

**Contexto:**
- Primeira mensagem do usuário? {is_first_interaction}
- Horário: {time_of_day}

**Diretrizes de Resposta (Personalidade):**
1.  **Direto ao Ponto:** Respostas curtas e impactantes. Nada de textos longos.
2.  **Zero "Corporatês":** Fale como um expert humano e acessível. Use emojis com moderação (🚀, 💡, 🔥).
3.  **Venda o Valor:** Não explique a ferramenta, explique o resultado (ex: "Não fazemos apenas SEO, colocamos sua marca no topo do Google para quem quer comprar").
4.  **Foco em IA:** Destaque sempre como nossa tecnologia de IA economiza tempo e dinheiro.

**Nossos Serviços (Munição):**
- *Tráfego Pago com IA:* Campanhas que se otimizam sozinhas.
- *SEO Inteligente:* Ranqueamento orgânico qualificado.
- *Automação:* Chatbots que vendem 24h.
- *Dados & Analytics:* Previsão de comportamento de compra.
- *Branding:* Marcas que se destacam na multidão.

**Call to Action (CTA):**
- Se o cliente quiser avançar, direcione para o WhatsApp: **+55 11 95908-5506**.
- Diga: "Clica no ícone do WhatsApp aqui no canto para falarmos agora mesmo."

**Frases de Encerramento:**
- "Vamos escalar seu negócio?"
- "O futuro da sua marca começa hoje."
- "Bora fazer acontecer?"

**IMPORTANTE:** Se for a primeira interação, termine com uma pergunta sobre o desafio atual da empresa dele.

Responda à mensagem abaixo:
`;

serve(async (req) => {
  // Tratamento de CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY_CHATBOT');

    if (!geminiApiKey) {
      console.error("ERRO CRÍTICO: Chave GEMINI_API_KEY_CHATBOT ausente.");
      return new Response(JSON.stringify({ error: "Erro de configuração interna." }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, sessionContext } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: "Mensagem vazia." }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isFirstInteraction = !sessionContext?.greeted;
    const timeOfDay = sessionContext?.timeOfDay || "dia";

    const fullPrompt = SYSTEM_PROMPT_TEMPLATE
      .replace('{is_first_interaction}', isFirstInteraction ? 'Sim' : 'Não')
      .replace('{time_of_day}', timeOfDay) + `\n\nUsuário disse: "${message}"`;

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
      console.error("Erro Gemini API:", JSON.stringify(responseData));
      
      // Tratamento amigável para erro de chave ou modelo
      if (geminiResponse.status === 403 || geminiResponse.status === 404 || geminiResponse.status === 400) {
          return new Response(JSON.stringify({ 
              reply: "Minha conexão com a IA está passando por um upgrade rápido! 🚀 Enquanto isso, me chama no WhatsApp (ícone ao lado) que eu te atendo na hora." 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }

      return new Response(JSON.stringify({ error: "Erro na comunicação com a IA." }), {
        status: geminiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const botResponseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botResponseText) {
        throw new Error("A IA não retornou texto válido.");
    }

    return new Response(JSON.stringify({ reply: botResponseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Exception:", error);
    return new Response(JSON.stringify({ error: error.message || 'Erro interno.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})