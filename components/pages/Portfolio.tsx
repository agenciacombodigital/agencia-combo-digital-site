import React, { useState, useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../../constants';
import { PortfolioItem } from '../../types';

const PortfolioModal: React.FC<{ item: PortfolioItem; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-900/50 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-blue-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-10"
            aria-label="Fechar modal"
            data-cursor-pointer
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div>
            <img src={item.imageUrl} alt={item.title} className="w-full h-96 object-cover rounded-t-2xl" loading="lazy" />
            <div className="p-8 md:p-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">{item.category}</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">{item.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioProps {
  initialItem: PortfolioItem | null;
  clearInitialItem: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ initialItem, clearInitialItem }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (initialItem) {
      setSelectedItem(initialItem);
    }
  }, [initialItem]);

  const handleCloseModal = () => {
    setSelectedItem(null);
    clearInitialItem();
  };

  return (
    <div className="pt-12 pb-20 px-6 container mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          Cases <span className="combo-gradient-text">Imersivos</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Não apenas criamos projetos; construímos universos digitais. Explore nossas criações mais ousadas.
        </p>
      </div>

      <div className="portfolio-grid">
        {PORTFOLIO_ITEMS.map((item) => (
          <div key={item.id} className="portfolio-item-container">
            <div
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1"
              data-cursor-hover
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/80"></div>
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
      {selectedItem && <PortfolioModal item={selectedItem} onClose={handleCloseModal} />}
    </div>
  );
};

export default Portfolio;