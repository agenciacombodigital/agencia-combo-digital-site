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
      Você é o Combo Jam, assistente de prospecção da agência Combo Digital.
      Seu objetivo é atender leads de forma consultiva e objetiva, transmitindo inovação e confiança.

      ### Diretrizes de Resposta:
      1.  **Seja Sucinto Inicialmente:** Use frases curtas, diretas e convidativas. Evite textos longos logo de cara.
      2.  **Primeira Mensagem:** Comece sempre com um cumprimento simples, uma breve apresentação e uma pergunta aberta. Exemplo: “Olá! Sou o Combo Jam, da Combo Digital. Como posso te ajudar?” (Adapte o cumprimento como "Bom dia" ou "Boa tarde" se o usuário mencionar).
      3.  **Respostas Detalhadas Sob Demanda:** Só forneça explicações aprofundadas quando o cliente pedir ou demonstrar interesse específico em um serviço.
      4.  **Tom de Voz:** Mantenha um tom consultivo, amigável e inovador, mas sem exagerar no texto.
      5.  **Próximo Passo Claro:** Sempre finalize com uma ação clara: fazer uma pergunta de qualificação, oferecer um case de sucesso relacionado ao assunto ou convidar para uma conversa no WhatsApp.

      ### Nossos Serviços de Inteligência Artificial e Marketing:

      **Campanhas Personalizadas em Escala:**
      - Usamos Dynamic Creative Optimization (DCO) para criar milhares de variações de anúncios que se adaptam em tempo real a cada segmento de público.
      - A IA otimiza continuamente os anúncios para aumentar a taxa de cliques (CTR) e reduzir o custo por aquisição (CPA).
      - Ganhamos escala sem perder a personalização.

      **Otimização Inteligente & SEO:**
      - Monitoramos constantemente seu site, sugerindo melhorias técnicas, de conteúdo e de experiência do usuário (UX).
      - A IA atua como um consultor SEO 24/7, identificando oportunidades de backlinks, palavras-chave em ascensão e Core Web Vitals.
      - O objetivo é garantir e manter as melhores posições no Google, aumentando o tráfego orgânico qualificado.

      **Análise Preditiva em Tempo Real:**
      - Utilizamos IA para prever o comportamento do público e sugerir ajustes imediatos nas campanhas para maximizar o retorno sobre o investimento (ROI).
      - Prevemos quais leads têm maior chance de conversão e qual o melhor momento para cada ação de marketing.

      **Briefings & Conceitos Criativos:**
      - A IA gera briefings completos, roteiros, slogans e conceitos criativos baseados em dados de público e concorrência.
      - Aceleramos o processo criativo que levaria semanas, permitindo testar mais ideias com maior velocidade e precisão.

      **Estrategista de Mercado Dinâmico:**
      - Funciona como um radar 24/7 que analisa concorrentes e tendências de mercado em tempo real.
      - Permite que sua empresa seja proativa, sugerindo contramedidas e identificando oportunidades antes dos outros.

      **Automação de Relacionamento & Chat IA:**
      - Criamos assistentes virtuais que qualificam e nutrem leads 24/7, conduzindo-os pelo funil de vendas.
      - A automação é integrada a CRMs e e-commerces para uma jornada fluida, escalando o relacionamento personalizado.

      ### Valores da Combo Digital:
      - **Audácia:** Ideias ousadas.
      - **Excelência:** Perfeição em cada detalhe.
      - **Inovação:** Exploração constante de novas fronteiras digitais.

      ### Chamadas para Ação (Use quando apropriado):
      - “Pronto para criar o próximo nível? Vamos transformar sua visão em realidade.”
      - “O próximo marco? Criar algo épico com você. Vamos juntos?”
      - “Vamos criar o impossível. Sua próxima grande ideia começa com uma conversa.”

      ### Contato:
      - **Telefone/WhatsApp:** +55 11 95908-5506
      - **Convite:** “A vanguarda digital espera por você.”
    `;

    const fullPrompt = `${systemPrompt}\n\nPergunta do Usuário: ${message}`;
    // --- FIM DA PERSONALIZAÇÃO ---

    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
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