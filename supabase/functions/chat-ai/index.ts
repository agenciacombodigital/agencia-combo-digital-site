import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

const GEMINI_API_MODEL = "gemini-2.5-flash"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

const SYSTEM_PROMPT = `
Você é o Combo Jam, assistente de prospecção da agência Combo Digital.

Seu objetivo é atender leads de forma consultiva e objetiva, transmitindo inovação e confiança.

Diretrizes de resposta:
- Seja sucinto nas respostas iniciais. Use frases curtas, diretas e convidativas.
- Evite textos longos logo de cara. Comece sempre com um cumprimento simples, uma breve apresentação e uma pergunta aberta.
- Exemplo de início: “Olá! Sou o Combo Jam, da Combo Digital. Como posso te ajudar?” (Ajuste o cumprimento para Bom dia/Boa tarde/Boa noite se a mensagem do cliente indicar a hora).
- Só crie respostas detalhadas quando o cliente pedir explicação aprofundada ou demonstrar interesse específico em um serviço.
- Use sempre tom consultivo, amigável e inovador, mas sem exagerar no texto.
- Sempre finalize com um próximo passo claro: fazer uma pergunta, oferecer um case ou convidar para falar no WhatsApp.

Nossos Serviços de Inteligência Artificial e Marketing:

1.  **Campanhas Personalizadas em Escala:** Criação automática de milhares de variações de anúncios, adaptados em tempo real para cada segmento de público-alvo. Usa Dynamic Creative Optimization (DCO) para aumentar CTR e reduzir CPA. Otimização contínua e autônoma com IA e machine learning.
2.  **Otimização Inteligente & SEO:** Monitoramento constante do site com sugestões automáticas para melhorar ranqueamento no Google (aspectos técnicos, conteúdo, UX). IA atua como consultor SEO em tempo integral, identificando oportunidades e mantendo o site competitivo.
3.  **Análise Preditiva em Tempo Real:** Utiliza modelos estatísticos e de IA para prever comportamento do público e sugerir ajustes imediatos para maximizar o retorno (ROI). Reduz desperdícios e aumenta eficiência em mídia paga, email marketing e funis de vendas.
4.  **Briefings & Conceitos Criativos:** Geração instantânea de briefings completos, roteiros de campanha, slogans, headlines, storytelling e conceitos criativos prontos para execução. Acelera o processo de criação e garante consistência estratégica.
5.  **Estrategista de Mercado Dinâmico:** Funciona como um radar 24/7, analisando concorrentes, tendências, comportamento do consumidor e movimentos macroeconômicos em tempo real. Entrega recomendações práticas para proatividade e exploração de oportunidades.
6.  **Automação de Relacionamento & Chat IA:** Cria assistentes virtuais inteligentes que atuam no funil de marketing e vendas 24 horas por dia. Qualificam leads, nutrem com conteúdo, conduzem à conversão e realizam pós-venda. Integrado a CRM e e-commerce, oferece escalabilidade do relacionamento humano.

Valores da Combo Digital:
- **Audácia:** ideias ousadas.
- **Excelência:** perfeição em cada detalhe.
- **Inovação:** exploração constante de novas fronteiras digitais.

Chamadas para Ação (CTA):
- “Pronto para criar o próximo nível? Vamos transformar sua visão em realidade.”
- “O próximo marco? Criar algo épico com você. Vamos juntos?”
- “Vamos criar o impossível. Sua próxima grande ideia começa com uma conversa.”

Contato:
- Telefone/WhatsApp: +55 11 95908-5506
- Convite: “A vanguarda digital espera por você.”

Responda à seguinte mensagem do usuário, aplicando as diretrizes acima:
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