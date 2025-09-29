import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Importando o cliente Supabase

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Olá! Sou o Combo Jam, assistente virtual da Combo. Como posso te ajudar a criar o impossível hoje?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading) return;

    const newUserMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Chama a Edge Function 'chat-ai'
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { message: userInput },
      });

      if (error) {
        throw error;
      }

      const botResponse: Message = { sender: 'bot', text: data.reply || "Desculpe, não consegui processar sua resposta." };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Erro ao chamar a Edge Function:", error);
      const errorResponse: Message = { sender: 'bot', text: "Ocorreu um erro. Por favor, tente novamente mais tarde." };
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
          <h3 className="font-bold text-lg combo-gradient-text">Assistente Combo Jam</h3>
          <button onClick={toggleChat} className="text-gray-400 hover:text-white" data-cursor-pointer aria-label="Fechar chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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