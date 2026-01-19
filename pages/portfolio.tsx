import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PORTFOLIO_ITEMS } from '../src/constants';
import { PortfolioItem } from '../src/types';
import PortfolioModal from '../components/PortfolioModal';

const Portfolio: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (itemId) {
      const item = PORTFOLIO_ITEMS.find(p => p.id === parseInt(itemId as string));
      if (item) setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
  }, [itemId]);

  const handleOpenItem = (item: PortfolioItem) => {
    router.push({
      pathname: '/portfolio',
      query: { itemId: item.id },
    }, undefined, { shallow: true });
  };

  const handleCloseModal = () => {
    router.push('/portfolio', undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 portfolio-page-container">
      <Head><title>Portfólio — Combo Digital</title></Head>
      <div className="particle-background"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter animated-portfolio-title">
            Nosso Trabalho
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Design de impacto, tecnologia de ponta e resultados reais. Explore o que criamos.
          </p>
        </div>

        <div className="portfolio-grid">
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="portfolio-item-container"
              onClick={() => handleOpenItem(item)}
            >
              <div className="portfolio-card-3d group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 bg-[#0d1117] border-t border-gray-800 transition-colors group-hover:bg-[#161b22]">
                  <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-2 block">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm font-medium">
                    <span>Ver Projeto</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PortfolioModal item={selectedItem} onClose={handleCloseModal} />
    </div>
  );
};

export default Portfolio;