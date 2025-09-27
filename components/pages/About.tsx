import React from 'react';
import { useInView } from '../../hooks/useInView';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const [ref, isInView] = useInView({ threshold: 0.2 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </div>
    );
};

const About: React.FC = () => {
  return (
    <div className="pt-12 pb-20 px-6 container mx-auto">
      <AnimatedSection className="text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          Os <span className="combo-gradient-text">Arquitetos</span> do Futuro
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
          Somos um coletivo de estrategistas, designers e desenvolvedores unidos pela paixão por desafiar o comum. Nossa missão é construir legados digitais para marcas que ousam ser diferentes.
        </p>
      </AnimatedSection>
      
      <AnimatedSection className="mt-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://picsum.photos/seed/team/1000/800" alt="Equipe Combo Digital" className="rounded-2xl shadow-2xl shadow-blue-500/10" loading="lazy"/>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Nossa Filosofia</h2>
            <p className="text-gray-400 mb-4">
              Acreditamos no poder do "combo" — a fusão perfeita entre criatividade e tecnologia. Não se trata apenas de fazer as coisas parecerem bonitas; trata-se de construir experiências que pareçam intuitivas, imersivas e impactantes. Desafiamos convenções e ultrapassamos limites para criar um trabalho que não apenas se destaca, mas também resiste ao teste do tempo.
            </p>
            <p className="text-gray-400">
              Nosso processo é colaborativo, transparente e adaptado a cada cliente. Mergulhamos fundo no DNA da sua marca para descobrir insights únicos que alimentam nosso fogo criativo.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-24 text-center">
        <h2 className="text-4xl font-bold mb-12">Nossos Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-800 rounded-lg group">
                <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-400">Audácia</h3>
                <p className="text-gray-400">Abraçamos ideias ousadas e corremos riscos calculados.</p>
            </div>
            <div className="p-8 border border-gray-800 rounded-lg group">
                <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-yellow-400">Excelência</h3>
                <p className="text-gray-400">Somos incansáveis em nossa busca pela perfeição.</p>
            </div>
            <div className="p-8 border border-gray-800 rounded-lg group">
                <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-400">Inovação</h3>
                <p className="text-gray-400">Exploramos constantemente novas fronteiras em tecnologia e design.</p>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;