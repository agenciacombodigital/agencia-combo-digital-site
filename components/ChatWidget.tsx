import React, { useState, useRef, useEffect } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type SessionContext = {
  greeted: boolean;
  timeOfDay: 'manhã' | 'tarde' | 'noite' | 'dia';
};

// Função para determinar a saudação com base na hora local
const getSaudacao = () => {
  const agora = new Date();
  const hora = agora.getHours();
  if (hora >= 5 && hora < 12) return "Bom dia";
  if (hora >= 12 && hora < 18) return "Boa tarde";
  return "Boa noite";
};

// Função para determinar a parte do dia para o contexto da sessão
const getPartOfDay = (): SessionContext['timeOfDay'] => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'manhã';
  if (hour >= 12 && hour < 18) return 'tarde';
  if (hour >= 18 || hour < 5) return 'noite';
  return 'dia';
};

const ChatWidget: React.FC = () => {
  const initialTimeOfDay = getPartOfDay();
  const initialWelcomeMessage: Message = { 
    sender: 'bot', 
    text: `${getSaudacao()}! Sou o Combo Jam, seja bem-vindo à Combo Digital! Em que posso te ajudar?` 
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]); // Inicializa com a saudação automática
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionContext, setSessionContext] = useState<SessionContext>({ 
    greeted: true, // Já saudado pelo cliente
    timeOfDay: initialTimeOfDay 
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent, predefinedMessage?: string) => {
    e.preventDefault();
    const messageToSend = predefinedMessage || userInput;
    if (messageToSend.trim() === '' || isLoading) return;

    const newUserMessage: Message = { sender: 'user', text: messageToSend };
    setMessages(prev => [...prev, newUserMessage]);
    if (!predefinedMessage) {
      setUserInput('');
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://sisvmbkwwmawnjhwydxh.supabase.co/functions/v1/chat-ai`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messageToSend, sessionContext }), // Envia sessionContext
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Não foi possível obter uma resposta. Erro desconhecido.";
        throw new Error(errorMessage);
      }

      const botResponseText = data.reply || "Desculpe, não consegui processar sua resposta.";
      const botResponse: Message = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botResponse]);
      // sessionContext.greeted já é true, não precisa mudar aqui.

    } catch (error) {
      console.error("Erro ao se comunicar com o assistente:", error);
      const errorResponse: Message = { sender: 'bot', text: `Ocorreu um erro: ${(error as Error).message}. Por favor, tente novamente.` };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`fixed bottom-28 left-4 md:left-24 w-[calc(100%-2rem)] max-w-sm h-[60vh] max-h-[500px] bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl shadow-black/50 flex flex-col transition-all duration-500 ease-in-out z-30 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="font-bold text-lg combo-gradient-text">Combo Jam</h3>
          <button onClick={toggleChat} className="text-gray-400 hover:text-white" data-cursor-pointer aria-label="Fechar chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 pt-0 flex justify-around gap-2">
            <button
                onClick={() => handleSendMessage({ preventDefault: () => {} } as React.FormEvent, "Gostaria de agendar uma call.")}
                className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600 transition-colors"
                data-cursor-pointer
                aria-label="Agendar uma call"
            >
                Agendar call
            </button>
            <button
                onClick={() => handleSendMessage({ preventDefault: () => {} } as React.FormEvent, "Quero ver os serviços de vocês.")}
                className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-600 transition-colors"
                data-cursor-pointer
                aria-label="Ver serviços"
            >
                Ver serviços
            </button>
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isLoading ? "Aguarde..." : "Digite sua mensagem..."}
              disabled={isLoading}
              className="w-full bg-gray-800 border border-gray-600 rounded-full py-2 pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            />
            <button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 rounded-full hover:bg-orange-500 transition-colors disabled:bg-gray-600" data-cursor-pointer aria-label="Enviar mensagem">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Chat Bubble */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 md:left-28 bg-gradient-to-br from-orange-500 to-orange-700 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 transform transition-transform duration-300 hover:scale-110 animate-pulse z-30"
        aria-label="Iniciar chat"
        data-cursor-hover
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </button>
    </>
  );
};

export default ChatWidget;