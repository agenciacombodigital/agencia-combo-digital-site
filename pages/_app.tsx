import '../src/index.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import WhatsAppBubble from '../components/WhatsAppBubble';
import LoadingScreen from '../components/LoadingScreen';
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
        <title>Agência de Marketing Digital e IA | Combo Digital | Estratégia, Design e Tecnologia</title>
        <meta name="description" content="Agência digital que une estratégia de dados, design premiado e inteligência artificial para marcas que lideram o futuro. Cases comprovados em branding, SEO e automação." />
        <meta name="keywords" content="agência digital, marketing digital, inteligência artificial, IA marketing, design ui/ux, estratégia digital, SEO, branding, automação marketing, chatbot IA, combo digital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.agenciacombodigital.com.br/" />

        {/* Open Graph */}
        <meta property="og:title" content="Combo Digital - Agência de Marketing e IA" />
        <meta property="og:description" content="Estratégia, design e inteligência artificial para marcas que lideram o futuro" />
        <meta property="og:image" content="https://www.agenciacombodigital.com.br/og-image.jpg" />
        <meta property="og:url" content="https://www.agenciacombodigital.com.br" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Combo Digital - Agência de Marketing e IA" />
        <meta name="twitter:description" content="Estratégia, design e inteligência artificial" />
        <meta name="twitter:image" content="https://www.agenciacombodigital.com.br/twitter-card.jpg" />

        {/* Schema Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Combo Digital",
              "url": "https://www.agenciacombodigital.com.br",
              "logo": "https://www.agenciacombodigital.com.br/Logo-ComboDigital.svg",
              "description": "Agência digital especializada em estratégia, design e inteligência artificial",
              "sameAs": ["https://www.instagram.com/agenciacombodigital/"],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              }
            })
          }}
        />
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