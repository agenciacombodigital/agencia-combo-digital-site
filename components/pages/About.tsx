import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { COLORS } from '../../constants';
import { Page } from '../../types';
import InteractiveTimeline from '../InteractiveTimeline';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </div>
    );
};

const ValueCard: React.FC<{title: string, description: string, icon: React.ReactNode, color: string}> = ({ title, description, icon, color }) => (
    <div className="value-card-3d group">
        <div className="p-8 border border-gray-800 rounded-2xl h-full flex flex-col items-center text-center bg-gray-900/30 backdrop-blur-sm">
            <div className="w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110" style={{ color }}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 transition-colors duration-300" style={{ color }}>{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

interface AboutProps {
  setCurrentPage: (page: Page) => void;
}

const About: React.FC<AboutProps> = ({ setCurrentPage }) => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="about-page-container bg-black text-white">
      <div className="scroll-progress-bar" style={{ height: `${scrollProgress}%` }}></div>

      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="fluid-title text-center leading-none">
          Os <span className="combo-gradient-text">Arquitetos</span><br/> do Futuro
        </h1>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 about-manifesto">
        <div className="container mx-auto px-6 text-center">
            <AnimatedSection>
                <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
                    Não seguimos tendências, <span className="combo-gradient-text">nós as criamos.</span>
                </h2>
            </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Nossa Filosofia</h2>
            <p className="text-gray-400 mb-4 text-lg leading-relaxed">
              Acreditamos no poder do "combo" — a fusão perfeita entre criatividade e tecnologia. Não se trata apenas de fazer as coisas parecerem bonitas; trata-se de construir experiências que pareçam intuitivas, imersivas e impactantes. Desafiamos convenções e ultrapassamos limites para criar um trabalho que não apenas se destaca, mas também resiste ao teste do tempo.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nosso processo é colaborativo, transparente e adaptado a cada cliente. Mergulhamos fundo no DNA da sua marca para descobrir insights únicos que alimentam nosso fogo criativo.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/seed/philosophy/1000/1200" alt="Visual abstrato representando a filosofia da Combo Digital" className="rounded-2xl shadow-2xl shadow-blue-500/10 w-full h-full object-cover" loading="lazy"/>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
                <h2 className="text-4xl font-bold">Nossos Valores</h2>
            </AnimatedSection>
            <AnimatedSection>
                <div className="grid md:grid-cols-3 gap-8">
                    <ValueCard 
                        title="Audácia" 
                        description="Abraçamos ideias ousadas e corremos riscos calculados para criar o extraordinário."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a2.25 2.25 0 002.25-2.25V8.857a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v3.893A2.25 2.25 0 0012 15z" /></svg>}
                        color={COLORS.blue}
                    />
                    <ValueCard 
                        title="Excelência" 
                        description="Somos incansáveis em nossa busca pela perfeição em cada pixel e linha de código."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        color={COLORS.orange}
                    />
                    <ValueCard 
                        title="Inovação" 
                        description="Exploramos constantemente novas fronteiras em tecnologia e design para o futuro."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>}
                        color={COLORS.yellow}
                    />
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <InteractiveTimeline setCurrentPage={setCurrentPage} />

      {/* DNA Section */}
      <section className="dna-section">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                    Mais que uma agência, somos um <span className="combo-gradient-text">coletivo criativo</span> que hackeia o futuro.
                </h2>
            </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;