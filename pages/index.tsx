import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { Page } from '../types';
import AiServices from '../components/AiServices';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import InteractivePillars from '../components/InteractivePillars';
import { usePortfolioNavigation } from '@/hooks/usePortfolioNavigation';

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
        <meta name="description" content="A Combo Digital é uma agência criativa que une ideias audaciosas com tecnologia de ponta para construir experiências digitais exclusivas." />
      </Head>
      
      {/* Hero Section */}
      <section ref={heroRef} className="section-hero-combo">
        <div className="hero-interactive-bg"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none kinetic-title">
            <span className="block">Nós não seguimos,</span>
            <span className="block combo-gradient-text">nós criamos.</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            A Combo Digital é uma agência criativa que une ideias audaciosas com tecnologia de ponta para construir experiências digitais exclusivas.
          </p>
          <button 
            onClick={() => navigateToPage(Page.Portfolio)}
            className="mt-10 px-8 py-4 text-white font-bold uppercase tracking-widest rounded-full glass-button" 
            data-cursor-hover
            >
            Explore Nosso Trabalho
          </button>
        </div>
        <div className="scroll-indicator text-white" data-cursor-pointer>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Interactive Pillars Section */}
      <InteractivePillars />

      {/* AI Services Section */}
      <AiServices />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Featured Projects Section */}
      <FeaturedProjects setCurrentPage={(page) => navigateToPage(page)} showPortfolioItem={showPortfolioItem} />

    </>
  );
};

Home.displayName = Page.Home;
export default Home;