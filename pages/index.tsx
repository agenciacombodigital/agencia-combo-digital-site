import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { Page } from '../src/types';
import AiServices from '../components/AiServices';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import InteractivePillars from '../components/InteractivePillars';
import { usePortfolioNavigation } from '../hooks/usePortfolioNavigation';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { showPortfolioItem, navigateToPage } = usePortfolioNavigation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroRef.current;
        const x = (clientX / offsetWidth) * 100;
        const y = (clientY / offsetHeight) * 100;
        heroRef.current.style.setProperty('--mouse-x', `${x}%`);
        heroRef.current.style.setProperty('--mouse-y', `${y}%`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>Nós não seguimos, nós criamos — Combo Digital</title>
      </Head>
      
      <section ref={heroRef} className="section-hero-combo">
        <div className="hero-interactive-bg"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none kinetic-title">
            <span className="block">Nós não seguimos,</span>
            <span className="block combo-gradient-text">nós criamos.</span>
          </h1>
          <button 
            onClick={() => navigateToPage(Page.Home)} // Ajustado para exemplo, use a navegação correta conforme necessário
            className="mt-10 px-8 py-4 text-white font-bold uppercase tracking-widest rounded-full glass-button" 
            data-cursor-hover
            >
            Explore Nosso Trabalho
          </button>
        </div>
      </section>

      <InteractivePillars />
      <AiServices />
      <Testimonials />
      <FeaturedProjects setCurrentPage={navigateToPage} showPortfolioItem={showPortfolioItem} />
    </>
  );
};

export default Home;