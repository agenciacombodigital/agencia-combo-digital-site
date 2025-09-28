import React, { useState, useEffect } from 'react';
import { Page, PortfolioItem } from './types';
import { PAGES } from './constants';
import Header from './components/Header';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Portfolio from './components/pages/Portfolio';
import Contact from './components/pages/Contact';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ChatWidget from './components/ChatWidget';
import WhatsAppBubble from './components/WhatsAppBubble';
import Footer from './components/Footer';
import HeadManager from './components/HeadManager'; // Importando o HeadManager

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const showPortfolioItem = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setCurrentPage(Page.Portfolio);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home setCurrentPage={setCurrentPage} showPortfolioItem={showPortfolioItem} />;
      case Page.About:
        return <About setCurrentPage={setCurrentPage} />;
      case Page.Portfolio:
        return <Portfolio initialItem={selectedPortfolioItem} clearInitialItem={() => setSelectedPortfolioItem(null)} />;
      case Page.Contact:
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} showPortfolioItem={showPortfolioItem} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black text-white min-h-screen font-manrope">
      <HeadManager currentPage={currentPage} selectedPortfolioItem={selectedPortfolioItem} /> {/* Adicionando o HeadManager */}
      <CustomCursor />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <ChatWidget />
      <WhatsAppBubble />
    </div>
  );
};

export default App;