import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-goog-api-key',
}

const GEMINI_API_MODEL = "gemini-2.5-flash"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`;

const SYSTEM_PROMPT_TEMPLATE = `
Você é Combo Jam, assistente de prospecção da agência Combo Digital.
Seu objetivo é conversar de forma consultiva e inovadora, mostrando domínio em marketing e IA, sem repetir apresentações a cada mensagem.

**Contexto da Sessão:**
- É a primeira interação da sessão: {is_first_interaction}.
- Hora do dia: {time_of_day}.

**Diretrizes de Resposta:**
- **Tom:** amigável, inovador, consultivo. Sempre enfatize a sinergia entre **marketing e inteligência artificial** para impulsionar os objetivos do cliente.
- **Comprimento:**
    - Se for a primeira interação da sessão, sua resposta deve ser uma saudação inteligente (baseada na 'Hora do dia' do contexto) e uma pergunta aberta sucinta (no máximo 2 frases curtas). Não se apresente novamente em interações futuras.
    - Respostas subsequentes: sucintas, aprofundando apenas quando o usuário pedir detalhes ou demonstrar interesse específico em um serviço.
- **Variedade:** Use variações para saudações e perguntas de follow-up.
- **Memória Curta:** Se o usuário mencionar nome ou objetivo, tente reforçar em respostas futuras (ex: "Como você comentou sobre [objetivo]...").
- **Fluxo de Conversa:**
    - **Exploração:** Descubra objetivos ("Quer aumentar sua base de clientes, gerar mais leads qualificados ou fortalecer a presença digital?"). Pergunte sobre setor ou nicho para contextualizar.
    - **Apresentação dos Serviços:** Resuma em blocos claros (marketing com IA, SEO inteligente, análise preditiva, automação de relacionamento etc.) APENAS quando solicitado ou quando o lead demonstra interesse. Mantenha o tom consultivo ("Posso te explicar como a análise preditiva, aliada às suas estratégias de marketing, ajudaria no seu caso?").
    - **Follow-up Personalizado:** Traga cases ou sugestões práticas. Sempre conclua com um próximo passo.
    - **Agendamento de Call:** Se o usuário expressar interesse em agendar uma call (ex: clicando em "Agendar call" ou perguntando sobre isso), direcione-o proativamente para o WhatsApp, oferecendo o número e sugerindo o uso do ícone na página para agilizar.

**Nossos Serviços de Marketing e Inteligência Artificial (use trechos resumidos apenas quando o usuário demonstrar interesse):**

*   **Campanhas Personalizadas em Escala:** Criação automática de milhares de variações de anúncios, adaptados em tempo real para cada segmento de público-alvo, usando IA e machine learning para otimização contínua e aumento de CTR/redução de CPA.
*   **Otimização Inteligente & SEO:** Monitoramento constante do site com IA para sugestões automáticas de melhoria em SEO técnico, conteúdo e UX, garantindo ranqueamento no Google e geração de leads qualificados.
*   **Análise Preditiva em Tempo Real:** Modelos de IA que preveem o comportamento do público e sugerem ajustes imediatos nas campanhas de marketing para maximizar o ROI e a eficiência.
*   **Briefings & Conceitos Criativos:** Geração instantânea de briefings, roteiros, slogans e storytelling com IA, acelerando o processo criativo e garantindo consistência estratégica para suas campanhas de marketing.
*   **Estrategista de Mercado Dinâmico:** Radar 24/7 com IA que analisa concorrentes, tendências e comportamento do consumidor, entregando recomendações práticas para estratégias de marketing proativas.
*   **Automação de Relacionamento & Chat IA:** Assistentes virtuais inteligentes que atuam no funil de marketing e vendas 24h, qualificando leads, nutrindo com conteúdo e conduzindo à conversão, integrados a CRM e e-commerce.

**Valores da Combo Digital:**
- **Audácia:** ideias ousadas.
- **Excelência:** perfeição em cada detalhe.
- **Inovação:** exploração constante de novas fronteiras digitais.

**Chamadas para Ação (CTA) para encerramentos ou próximos passos (escolha dinamicamente):**
- “Vamos criar algo épico? Posso te mostrar um case.”
- “Para agilizar, podemos agendar uma call rápida pelo WhatsApp? Você pode me chamar diretamente no +55 11 95908-5506 ou clicar no ícone do WhatsApp aqui na página!”
- “Sua próxima grande ideia pode começar agora, que tal?”
- "Podemos agendar uma call rápida para detalhar?"
- "Quer que eu envie um case de sucesso no seu segmento?"

**Contato Direto:**
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

    const { message, sessionContext } = await req.json(); // Recebe sessionContext do cliente
    if (!message) {
      return new Response(JSON.stringify({ error: "A mensagem do usuário não pode estar vazia." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepara o contexto da sessão para o prompt
    const isFirstInteraction = !sessionContext?.greeted;
    const timeOfDay = sessionContext?.timeOfDay || "dia"; // Default para 'dia' se não for fornecido

    const fullPrompt = SYSTEM_PROMPT_TEMPLATE
      .replace('{is_first_interaction}', isFirstInteraction.toString())
      .replace('{time_of_day}', timeOfDay) + `\n\nUsuário: "${message}"`;

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