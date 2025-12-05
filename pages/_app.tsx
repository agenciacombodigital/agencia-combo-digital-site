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

// Note: In Next.js, we use the built-in router for navigation, 
// so the custom routing logic from App.tsx is removed here.

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black text-white min-h-screen font-manrope">
      <Head>
        {/* Next.js handles most SEO via Head component in pages, but we keep global meta here */}
        <title>Combo Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <CustomCursor />
      {/* Header now uses Next.js Link for navigation */}
      <Header currentPage={Component.displayName as any} setCurrentPage={() => {}} /> 
      
      <main>
        <Component {...pageProps} />
      </main>
      
      <Footer setCurrentPage={() => {}} />
      <ChatWidget />
      <WhatsAppBubble />
    </div>
  );
}