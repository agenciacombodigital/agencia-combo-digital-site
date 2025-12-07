import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Page } from '../types';

const Contato: React.FC = () => {
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState<string>('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    // Lendo a chave de site real da variável de ambiente do Next.js
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; 
    
    // Chave de teste do Cloudflare que funciona em qualquer domínio (para desenvolvimento/preview)
    const fallbackSiteKey = '1x0000000000000000000000000000000AA';
    const finalSiteKey = siteKey || fallbackSiteKey;

    if (!finalSiteKey) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center pt-24 pb-20 px-6 contact-bg">
                <div className="max-w-md bg-black/50 p-8 rounded-xl border border-red-800">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Erro de Configuração</h1>
                    <p className="text-gray-300">
                        A chave de segurança do Cloudflare Turnstile (NEXT_PUBLIC_TURNSTILE_SITE_KEY) não foi definida. 
                        O formulário de contato está desabilitado por segurança.
                    </p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!token) {
            // Se o token não estiver presente, tentamos resetar o Turnstile e pedimos ao usuário para tentar novamente.
            setStatus('Por favor, aguarde a verificação de segurança e tente novamente.');
            turnstileRef.current?.reset();
            setTimeout(() => setStatus(''), 5000);
            return;
        }

        setStatus('Enviando...');
        
        try {
            // A Edge Function usará a chave SECRETA para verificar este token
            const response = await fetch('https://sisvmbkwwmawnjhwydxh.supabase.co/functions/v1/submit-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message, token }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Erro no servidor (${response.status})`);
            }

            const data = await response.json();

            setStatus(data.message || 'Obrigado! Sua mensagem foi enviada com sucesso.');
            setName('');
            setEmail('');
            setMessage('');
            turnstileRef.current?.reset();
            setToken('');
            setTimeout(() => setStatus(''), 5000);

        } catch (error) {
            console.error("Erro no envio do formulário:", error);
            setStatus(`Erro: ${(error as Error).message}`);
            turnstileRef.current?.reset();
            setToken('');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    const handleTurnstileError = (errorCode: string) => {
        console.error(`Erro no Turnstile: ${errorCode}`);
        // Esta mensagem é exibida quando o widget falha ao carregar ou verificar no frontend
        setStatus(`Falha na verificação de segurança. Por favor, atualize a página.`);
    };

    const SocialLink: React.FC<{href: string, children: React.ReactNode}> = ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" data-cursor-pointer>
            {children}
        </a>
    );

  return (
    <div className="min-h-screen flex items-center justify-center pt-12 pb-20 px-6 contact-bg">
      <Head>
        <title>Contato — Vamos Criar o Impossível | Combo Digital</title>
        <meta name="description" content="Entre em contato com a Combo Digital. Sua próxima grande ideia começa com uma conversa." />
      </Head>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
            Vamos Criar o <span className="combo-gradient-text">Impossível</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
            Sua próxima grande ideia começa com uma conversa. Estamos prontos para ouvir.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800">
            <div className="md:col-span-2">
                 <h2 className="text-3xl font-bold mb-6">Inicie uma Conversa</h2>
                 <p className="text-gray-400 mb-8">
                    Use o formulário para nos enviar uma mensagem ou conecte-se conosco através de nossos canais diretos. A vanguarda digital espera por você.
                 </p>
                 <div className="space-y-4 text-gray-300 mb-8">
                    <p><strong>Email:</strong> <a href="mailto:hello@combo.digital" className="hover:text-blue-400 transition-colors">hello@combo.digital</a></p>
                    <p><strong>Telefone:</strong> +55 (11) 99999-8888</p>
                 </div>
                 <div className="flex space-x-6">
                    <SocialLink href="#" aria-label="Visite nosso perfil no X"><svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></SocialLink>
                    <SocialLink href="https://www.instagram.com/agenciacombodigital/" aria-label="Visite nosso perfil no Instagram">
                        <svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <title>Instagram</title>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </SocialLink>
                 </div>
            </div>
            <form onSubmit={handleSubmit} className="md:col-span-3">
                <div className="space-y-10">
                    <div className="relative">
                        <input type="text" name="name" id="name" placeholder=" " required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 transition-colors duration-300" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Seu Nome</label>
                    </div>
                    <div className="relative">
                        <input type="email" name="email" id="email" placeholder=" " required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 transition-colors duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Seu Email</label>
                    </div>
                    <div className="relative">
                        {/* Ajuste no textarea para garantir que a linha de baixo não seja cortada */}
                        <textarea name="message" id="message" placeholder=" " rows={4} required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 pb-4 transition-colors duration-300" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <label htmlFor="message" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Sua Mensagem</label>
                    </div>
                    
                    {/* Centralizando e adicionando margem superior ao Turnstile */}
                    <div className="flex justify-center pt-4">
                        <Turnstile
                            ref={turnstileRef}
                            siteKey={finalSiteKey}
                            onSuccess={setToken}
                            onError={handleTurnstileError}
                            options={{ theme: 'dark' }}
                        />
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled={status === 'Enviando...'} // Removida a dependência do token
                            // Revertendo para a cor azul primária com hover
                            className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                            data-cursor-hover
                        >
                            {status === 'Enviando...' ? 'Enviando...' : 'Enviar Proposta'}
                        </button>
                    </div>
                    {status && <p className="text-center text-yellow-400 font-semibold mt-4">{status}</p>}
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

Contato.displayName = Page.Contact;
export default Contato;