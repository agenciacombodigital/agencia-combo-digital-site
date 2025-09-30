import React, { useRef } from 'react';
import { Page, PortfolioItem } from '../types';
import { useInView } from '../hooks/useInView';
import { COLORS, PORTFOLIO_ITEMS } from '../constants';

interface FeaturedProjectsProps {
    setCurrentPage: (page: Page) => void;
    showPortfolioItem: (item: PortfolioItem) => void;
}

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

const ProjectCard: React.FC<{ project: PortfolioItem; onClick: () => void }> = ({ project, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 15;
        const y = (e.clientY - top - height / 2) / 15;
        card.style.transform = `perspective(1500px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(1500px) rotateY(0deg) rotateX(0deg) scale(1)';
    };

    return (
        <div 
            className="projeto-card-container"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            aria-label={`Ver projeto ${project.title}`}
            data-cursor-hover
        >
            <div ref={cardRef} className="projeto-card-content">
                <img src={project.imageUrl} alt={`Capa do projeto ${project.title}`} className="projeto-card-bg" />
                <div className="projeto-card-overlay"></div>
                <div className="projeto-card-text-wrapper">
                    <span className="block text-sm font-semibold mb-2" style={{color: COLORS.yellow}}>{project.category}</span>
                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    {project.metric && (
                        <p className="text-base bg-white/10 px-4 py-1.5 rounded-full inline-block font-medium reveal-on-hover" style={{ transitionDelay: '0.1s' }}>
                            {project.metric}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ setCurrentPage, showPortfolioItem }) => {
    const featuredProjects = PORTFOLIO_ITEMS.filter(p => p.featured).slice(0, 3);

    return (
        <section className="section-projetos-destaque py-24">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 animated-gradient-heading">
                            Projetos em Destaque
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Alguns dos trabalhos que nos orgulhamos de ter criado para nossos clientes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {featuredProjects.map((project) => (
                           <ProjectCard 
                                key={project.id}
                                project={project}
                                onClick={() => showPortfolioItem(project)}
                           />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button
                            onClick={() => setCurrentPage(Page.Portfolio)}
                            className="inline-flex items-center text-white border border-gray-700 px-8 py-3 rounded-full font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
                            data-cursor-hover
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M1.5 13.5H13.5V1.5H7.5V0H13.5C14.325 0 15 0.675 15 1.5V13.5C15 14.325 14.325 15 13.5 15H1.5C0.675 15 0 14.325 0 13.5V7.5H1.5V13.5ZM3 0V1.5H11.595L0 13.095L1.4025 14.5L13.5 2.4075V12H15V0H3Z" fill="currentColor"/></svg>
                            Ver Todos os Projetos
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default FeaturedProjects;