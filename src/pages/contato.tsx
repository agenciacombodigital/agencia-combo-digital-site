import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Page } from '@/types';

const Contato: React.FC = () => {
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState<string>('');
    const turnstileRef = useRef<TurnstileInstance>(null);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x0000000000000000000000000000000AA';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) {
            setStatus('Por favor, aguarde a verificação de segurança.');
            return;
        }
        setStatus('Enviando...');
        try {
            const response = await fetch('https://sisvmbkwwmawnjhwydxh.supabase.co/functions/v1/submit-contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, token }),
            });
            if (!response.ok) throw new Error('Erro no servidor');
            setStatus('Obrigado! Sua mensagem foi enviada.');
            setName(''); setEmail(''); setMessage('');
        } catch (error) {
            setStatus('Erro ao enviar. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-12 pb-20 px-6 contact-bg">
            <Head><title>Contato — Combo Digital</title></Head>
            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
                        Vamos Criar o <span className="combo-gradient-text">Impossível</span>
                    </h1>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold mb-6">Conecte sua marca ao futuro</h2>
                        <p className="text-gray-400">Não estamos aqui para seguir tendências, estamos aqui para criá-las junto com você.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="md:col-span-3 space-y-10">
                        <input type="text" placeholder="Nome" required className="w-full bg-transparent border-b-2 border-gray-600 p-2 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" required className="w-full bg-transparent border-b-2 border-gray-600 p-2 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <textarea placeholder="Mensagem" rows={4} required className="w-full bg-transparent border-b-2 border-gray-600 p-2 outline-none" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <div className="flex justify-center"><Turnstile siteKey={siteKey} onSuccess={setToken} theme="dark" /></div>
                        <button type="submit" className="w-full py-4 bg-blue-600 rounded-lg font-bold uppercase">Enviar Proposta</button>
                        {status && <p className="text-center text-yellow-400">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contato;