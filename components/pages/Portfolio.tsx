import React, { useState, useEffect, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../../constants';
import { PortfolioItem, Page } from '../../types';
import { useInView } from '../../hooks/useInView';

// --- Modal Aprimorado ---
const PortfolioModal: React.FC<{ items: PortfolioItem[]; initialIndex: number; onClose: () => void }> = ({ items, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const item = items[currentIndex];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const navigate = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col md:flex-row relative shadow-2xl shadow-blue-500/10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-20" aria-label="Fechar modal" data-cursor-pointer>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="w-full md:w-3/5 h-1/2 md:h-full relative">
          <img src={item.imageUrl} alt={`Imagem do projeto ${item.title}`} className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        </div>

        <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-12 flex flex-col overflow-y-auto">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">{item.category}</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">{item.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{item.description}</p>
          </div>
          <div className="mt-auto space-y-8">
            <div>
              <h4 className="font-bold text-white mb-3">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map(tech => <span key={tech} className="bg-gray-700/50 text-gray-300 text-sm px-3 py-1 rounded-full">{tech}</span>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Paleta de Cores</h4>
              <div className="flex gap-3">
                {item.colorPalette.map(color => <div key={color} className="w-8 h-8 rounded-full border-2 border-gray-700" style={{ backgroundColor: color }}></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegação */}
      <button onClick={() => navigate('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all" data-cursor-pointer aria-label="Projeto anterior"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
      <button onClick={() => navigate('next')} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all" data-cursor-pointer aria-label="Próximo projeto"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
    </div>
  );
};

// --- Componente Principal ---
const FILTERS = ['Todos', 'Web', 'Branding', 'Motion'];

const Portfolio: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{ item: PortfolioItem; index: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredItems = useMemo(() => 
    activeFilter === 'Todos' 
      ? PORTFOLIO_ITEMS 
      : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter),
    [activeFilter]
  );

  const handleOpenModal = (item: PortfolioItem, index: number) => {
    const originalIndex = PORTFOLIO_ITEMS.findIndex(p => p.id === item.id);
    setSelectedItem({ item, index: originalIndex });
  };

  return (
    <div className="portfolio-page-container">
      <div className="particle-background"></div>
      <div className="pt-24 pb-20 px-6 container mx-auto relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter animated-portfolio-title">
            Portfólio Imersivo
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Projetos que respiram tecnologia e arte.
          </p>
        </div>

        <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
          {FILTERS.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'}`}
              data-cursor-pointer
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="portfolio-item-container">
              <div
                className="group portfolio-card-3d"
                data-cursor-hover
                onClick={() => handleOpenModal(item, index)}
                role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOpenModal(item, index)}
              >
                <img src={item.imageUrl} alt={`Capa do projeto ${item.title}`} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">{item.category}</h3>
                    <h2 className="text-3xl font-bold text-white mt-2">{item.title}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && <PortfolioModal items={PORTFOLIO_ITEMS} initialIndex={selectedItem.index} onClose={() => setSelectedItem(null)} />}
      
      <section className="py-24 text-center relative z-10">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-4">Pronto para criar algo inesquecível?</h2>
            <button 
                onClick={() => { /* Navigate to Contact Page */ }}
                className="footer-cta-button text-white font-bold py-3 px-8 rounded-full mt-4"
                data-cursor-hover
            >
                Vamos conversar
            </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;