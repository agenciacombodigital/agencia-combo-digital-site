import React, { useEffect, useState } from 'react';
import { PortfolioItem } from '../src/types';
import { X, ChevronLeft, ChevronRight } from 'react-feather';
import { gsap } from 'gsap';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(".modal-content", 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [item]);

  if (!item) return null;

  const images = [item.imageUrl, ...item.galleryImages];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="modal-content relative w-full max-w-6xl bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        {/* Galeria de Imagens */}
        <div className="relative w-full md:w-2/3 bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={images[currentImageIndex]} 
            alt={`${item.title} - Imagem ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain transition-opacity duration-500"
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-white/10 text-white rounded-full"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-white/10 text-white rounded-full"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={32} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'}`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Informações do Projeto */}
        <div className="w-full md:w-1/3 p-8 md:p-12 overflow-y-auto">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 block">
            {item.category}
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            {item.title}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {item.description}
          </p>

          <div className="space-y-8">
            {item.metric && (
              <div>
                <h4 className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Impacto</h4>
                <p className="text-2xl font-bold text-white">{item.metric}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-3">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-3">Paleta de Cores</h4>
              <div className="flex gap-3">
                {item.colorPalette.map((color) => (
                  <div 
                    key={color} 
                    className="w-10 h-10 rounded-full border border-white/10" 
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;