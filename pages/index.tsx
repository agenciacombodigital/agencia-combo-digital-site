import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { Page } from '../src/types';
import AiServices from '../components/AiServices';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import InteractivePillars from '../components/InteractivePillars';
import MagneticButton from '../components/MagneticButton';
import { usePortfolioNavigation } from '../hooks/usePortfolioNavigation';

// Importação dinâmica para evitar erro de SSR com Three.js
const HeroBackground = dynamic(() => import('../components/HeroBackground'), { 
  ssr: false 
});

const Home: React.FC = () => {
  const { showPortfolioItem, navigateToPage } = usePortfolioNavigation();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      
      const tl = gsap.timeline();

      if (chars) {
        tl.to(chars, {
          y: '0%',
          stagger: 0.05,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.5
        });
      }

      tl.to([subtitleRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=1");
    }, heroRef);

    // Interactive Distortion (Mouse Follow)
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(".massive-typography", {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        ctx.revert();
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <Head>
        <title>Combo Digital — Além do Digital</title>
      </Head>
      
      <section ref={heroRef} className="hero-massive-container">
        <HeroBackground />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 ref={titleRef} className="massive-typography">
            <div className="massive-typography-row">
                {splitText("COMBO")}
            </div>
          </h1>
          
          <div ref={subtitleRef} className="hero-subtitle px-6">
            Estrategistas digitais criando experiências que não seguem tendências, elas as definem.
          </div>

          <div ref={ctaRef} className="magnetic-cta-wrap">
            <MagneticButton 
              className="w-48 h-48 md:w-56 md:h-56"
              onClick={() => navigateToPage(Page.Portfolio)}
            >
              Projetos
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
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