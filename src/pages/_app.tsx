import '@/index.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import WhatsAppBubble from '@/components/WhatsAppBubble';
import LoadingScreen from '@/components/LoadingScreen';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black text-white min-h-screen font-manrope">
      <Head>
        <title>Combo Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <CustomCursor />
      <Header /> 
      
      <main>
        <Component {...pageProps} />
      </main>
      
      <Footer />
      <ChatWidget />
      <WhatsAppBubble />
    </div>
  );
}