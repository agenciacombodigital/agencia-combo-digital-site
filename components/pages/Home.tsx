import React from 'react';
import { Page, PortfolioItem } from '../../types';
import { useInView } from '../../hooks/useInView';
import AiServices from '../AiServices';
import FeaturedProjects from '../FeaturedProjects';
import Testimonials from '../Testimonials';
import InteractivePillars from '../InteractivePillars';

interface HomeProps {
    setCurrentPage: (page: Page) => void;
    showPortfolioItem: (item: PortfolioItem) => void;
}

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.3 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};


const Home: React.FC<HomeProps> = ({setCurrentPage, showPortfolioItem}) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 z-0">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
             <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="text-center z-20 px-4">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            <span className="block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Nós não seguimos</span>
            <span className="block combo-gradient-text animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Nós criamos.</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            A Combo Digital é uma agência criativa que une ideias audaciosas com tecnologia de ponta para construir experiências digitais exclusivas.
          </p>
          <button 
            onClick={() => setCurrentPage(Page.Portfolio)}
            className="mt-10 px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 animate-fade-in-up" 
            style={{ animationDelay: '1.1s' }}
            data-cursor-hover
            >
            Explore Nosso Trabalho
          </button>
        </div>
      </section>

      {/* Interactive Pillars Section */}
      <InteractivePillars />

      {/* AI Services Section */}
      <AiServices />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Featured Projects Section */}
      <FeaturedProjects setCurrentPage={setCurrentPage} showPortfolioItem={showPortfolioItem} />

    </div>
  );
};

export default Home;