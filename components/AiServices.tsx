import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { COLORS } from '../src/constants';

// --- Animated Section Wrapper ---
const AnimatedSection: React.FC<{children: React.ReactNode; delay?: number}> = ({ children, delay = 0 }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- Animated Icons ---
const BullseyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <g className="icon-reveal">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </g>
    </svg>
);
const MagnifyingGlassChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <g className="icon-reveal">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A6 6 0 0116.5 15a5.972 5.972 0 01-2.433 4.814" />
        </g>
    </svg>
);
const BrainCircuitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="icon-reveal">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
            <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
            <path d="M12 11v-3" /><path d="M12 21v-3" /><path d="M10 5.5a2.5 2.5 0 0 1 4 0" />
            <path d="M12 3a2.5 2.5 0 0 0 -2.5 2.5" /><path d="M12 3a2.5 2.5 0 0 1 2.5 2.5" />
            <path d="M4.5 10.5a3.5 3.5 0 0 1 -1 -2.5a3.5 3.5 0 0 1 3.5 -3.5" />
            <path d="M19.5 10.5a3.5 3.5 0 0 0 1 -2.5a3.5 3.5 0 0 0 -3.5 -3.5" />
        </g>
    </svg>
);
const LightbulbIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <g className="icon-reveal">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </g>
    </svg>
);
const BinocularsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="icon-reveal">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="5" cy="10" r="3" /><circle cx="15" cy="10" r="3" />
            <path d="M7.5 10l1 0" /><path d="M12.5 10l1 0" />
            <path d="M8 13l-1.5 6" /><path d="M16 13l1.5 6" />
            <path d="M10.5 10l-1.5 -5" /><path d="M13.5 10l1.5 -5" />
        </g>
    </svg>
);
const ChatAutomationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <g className="icon-reveal">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </g>
    </svg>
);

// --- Service Card Component ---
interface ServiceCardProps {
    service: {
        icon: React.ReactNode;
        title: string;
        description: string;
        color: string;
    };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
        
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        }
    };

    return (
        <div className="ai-service-card-container h-full">
            <div
                ref={cardRef}
                className="ai-service-card h-full p-8"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ '--glow-color': service.color } as React.CSSProperties}
            >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg mb-6" style={{backgroundColor: service.color}}>
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">{service.description}</p>
            </div>
        </div>
    );
};

// --- Main Component ---
const services = [
    { icon: <BullseyeIcon />, title: 'Campanhas Personalizadas em Escala', description: 'Criação automática de muitos formatos de anúncios, adaptados em tempo real para cada tipo de público.', color: COLORS.blue },
    { icon: <MagnifyingGlassChartIcon />, title: 'Otimização Inteligente & SEO', description: 'Análise contínua do seu site com sugestões automáticas para melhorar a posição no Google.', color: COLORS.orange },
    { icon: <BrainCircuitIcon />, title: 'Análise Preditiva em Tempo Real', description: 'Previsões e ajustes instantâneos para aumentar os resultados das suas campanhas.', color: COLORS.yellow },
    { icon: <LightbulbIcon />, title: 'Briefings & Conceitos Criativos', description: 'Geração instantânea de ideias e roteiros criativos para campanhas e projetos.', color: COLORS.blue },
    { icon: <BinocularsIcon />, title: 'Estrategista de Mercado Dinâmico', description: 'Acompanhamento do mercado e da concorrência em tempo real para indicar as melhores ações e oportunidades.', color: COLORS.orange },
    { icon: <ChatAutomationIcon />, title: 'Automação de Relacionamento & Chat IA', description: 'Assistentes virtuais que nutrem leads e fidelizam clientes 24 horas por dia.', color: COLORS.yellow }
];

const AiServices: React.FC = () => {
    return (
        <section className="ai-services-section py-24 bg-[#0d1117]">
            <div className="container mx-auto px-6 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 animated-gradient-heading">
                            Nossos Serviços de IA
                        </h2>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                            Soluções de marketing com Inteligência Artificial para acelerar o crescimento da sua marca no universo digital.
                        </p>
                    </div>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <AnimatedSection key={index} delay={index * 100}>
                            <ServiceCard service={service} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiServices;