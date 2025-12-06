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
            setStatus('Por favor, aguarde a verificação de segurança.');
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
                    <SocialLink href="https://www.instagram.com/agenciacombodigital/" aria-label="Visite nosso perfil no Instagram"><svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.35 7.35 0 0 0 16.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.057.36-2.227.413C3.615 17.585 3.235 17.57 0 17.57s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36 1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.056-1.17.249-1.805.413 2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.38-.896.423-.164 1.057-.36 2.227-.413C8.415 2.175 8.795 2.16 12 2.16zm0 9.04c-1.815 0-3.286 1.47-3.286 3.286s1.47 3.286 3.286 3.286 3.286-1.47 3.286-3.286S13.815 11.2 12 11.2zm0 5.433c-1.188 0-2.146-.958-2.146-2.146s.958-2.146 2.146-2.146 2.146.958 2.146 2.146-.958 2.146-2.146 2.146zm6.362-7.393c-.595 0-1.077.482-1.077 1.077s.482 1.077 1.077 1.077 1.077-.482 1.077-1.077-.482-1.077-1.077-1.077z" /></svg></SocialLink>
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
                            disabled={!token || status === 'Enviando...'}
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