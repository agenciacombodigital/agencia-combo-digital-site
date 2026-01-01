import React, { useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { COLORS } from '../src/constants';

const StrategyIcon = ({ inView }: { inView: boolean }) => (
    <svg className={`w-16 h-16 mb-6 ${inView ? 'animated-icon' : ''}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M32 52C43.0457 52 52 43.0457 52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52Z" stroke="url(#paint0_linear_strategy)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 32H22" stroke="url(#paint0_linear_strategy)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 42V22" stroke="url(#paint0_linear_strategy)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="paint0_linear_strategy" x1="12" y1="32" x2="52" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor={COLORS.blue}/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
    </svg>
);

const DesignIcon = ({ inView }: { inView: boolean }) => (
    <svg className={`w-16 h-16 mb-6 ${inView ? 'animated-icon' : ''}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M51 32C51 20.27 41.73 11 30 11C20.4 11 12.4 17.64 11 26.5" stroke="url(#paint0_linear_design)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 19C22.97 18.97 23.96 18.99 24.96 19.04C29.96 19.29 34.01 23.34 34.26 28.34C34.54 34.04 29.9 38.94 24.2 39.22C19.25 39.45 15.03 35.6 14.58 30.67" stroke="url(#paint0_linear_design)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 25C32.55 25 33 24.55 33 24C33 23.45 32.55 23 32 23C31.45 23 31 23.45 31 24C31 24.55 31.45 25 32 25Z" stroke="url(#paint0_linear_design)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 29C40.55 29 41 28.55 41 28C41 27.45 40.55 27 40 27C39.45 27 39 27.45 39 28C39 28.55 39.45 29 40 29Z" stroke="url(#paint0_linear_design)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 31C24.55 31 25 30.55 25 30C25 29.45 24.55 29 24 29C23.45 29 23 29.45 23 30C23 30.55 23.45 31 24 31Z" stroke="url(#paint0_linear_design)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="paint0_linear_design" x1="11" y1="25.11" x2="51" y2="25.11" gradientUnits="userSpaceOnUse"><stop stopColor={COLORS.orange}/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs>
    </svg>
);

const TechnologyIcon = ({ inView }: { inView: boolean }) => (
    <svg className={`w-16 h-16 mb-6 ${inView ? 'animated-icon' : ''}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M44 16H20C17.79 16 16 17.79 16 20V44C16 46.21 17.79 48 20 48H44C46.21 48 48 46.21 48 44V20C48 17.79 46.21 16 44 16Z" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 16V12" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 52V48" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M48 32H52" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 32H16" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 16V12" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M40 16V12" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 52V48" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M40 52V48" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M48 24H52" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M48 40H52" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24H16" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 40H16" stroke="url(#paint0_linear_tech)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="paint0_linear_tech" x1="12" y1="32" x2="52" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor={COLORS.yellow}/><stop offset="1" stopColor="#84CC16"/></linearGradient></defs>
    </svg>
);

const pillars = [
    { title: 'Estratégia', description: 'Criando estratégias baseadas em dados que ressoam com o público e entregam resultados mensuráveis.', Icon: StrategyIcon, colors: [COLORS.blue, '#6366F1'] },
    { title: 'Design', description: 'Criando identidades visuais e interfaces de usuário premiadas que cativam e convertem.', Icon: DesignIcon, colors: [COLORS.orange, '#EC4899'] },
    { title: 'Tecnologia', description: 'Aproveitando tecnologias imersivas como IA e WebGL para construir experiências inesquecíveis.', Icon: TechnologyIcon, colors: [COLORS.yellow, '#84CC16'] }
];

const PillarCard = ({ pillar }: { pillar: typeof pillars[0] }) => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    };

    return (
        <div ref={ref} className="pillar-card-container" style={{ '--color-1': pillar.colors[0], '--color-2': pillar.colors[1] } as React.CSSProperties}>
            <div ref={cardRef} className="pillar-card-content p-8 text-center flex flex-col items-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <pillar.Icon inView={inView} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: pillar.colors[0] }}>{pillar.title}</h3>
                <p className="text-gray-400">{pillar.description}</p>
            </div>
        </div>
    );
};

const InteractivePillars: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const { clientX, clientY } = e;
                const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
                const x = (clientX - left) / width;
                const y = (clientY - top) / height;
                sectionRef.current.style.setProperty('--mouse-x-percent', `${x * 100}%`);
                sectionRef.current.style.setProperty('--mouse-y-percent', `${y * 100}%`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={sectionRef} className="interactive-pillars-section py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <h2 className="sr-only">Nossos Pilares de Atuação</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {pillars.map((pillar, index) => (
                        <PillarCard key={index} pillar={pillar} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractivePillars;