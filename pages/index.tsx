import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { Page } from '../src/types';
import AiServices from '../components/AiServices';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import InteractivePillars from '../components/InteractivePillars';
import { usePortfolioNavigation } from '../hooks/usePortfolioNavigation';

const Home: React.FC = () => {
  const { showPortfolioItem, navigateToPage } = usePortfolioNavigation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada simples e elegante
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>Combo Digital — Nós Criamos.</title>
      </Head>
      
      {/* Hero Section - Estável e Impactante */}
      <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden px-4">
        
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Grid Sutil */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            {/* Glow Central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[70vh] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        {/* A Frase Principal com tipografia refinada */}
        <div className="relative z-10 max-w-[90rem] mx-auto text-center">
          <h1 ref={titleRef} className="text-[12vw] md:text-[10vw] lg:text-[8.5rem] font-extrabold text-white tracking-[-0.06em] leading-[0.85] uppercase opacity-0">
            Nós não seguimos,<br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#3b82f6,#9333ea,#3b82f6)] animate-gradient-flow">
              nós criamos.
            </span>
          </h1>
          
          <p className="hero-cta mt-12 text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto opacity-0 font-medium tracking-tight">
            A agência que une estratégia, design e inteligência artificial para marcas que lideram o futuro.
          </p>

          <div className="hero-cta mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0">
            <button 
                onClick={() => navigateToPage(Page.Contact)}
                className="px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5"
                data-cursor-pointer
            >
                Iniciar Projeto
            </button>
            <button 
                onClick={() => navigateToPage(Page.Portfolio)}
                className="px-10 py-5 border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300"
                data-cursor-pointer
            >
                Ver Cases
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hero-cta">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
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