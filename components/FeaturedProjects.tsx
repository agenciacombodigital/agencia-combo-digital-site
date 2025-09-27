
import React from 'react';
import { Page, PortfolioItem } from '../types';
import { useInView } from '../hooks/useInView';
import { COLORS, PORTFOLIO_ITEMS } from '../constants';

interface FeaturedProjectsProps {
    setCurrentPage: (page: Page) => void;
    showPortfolioItem: (item: PortfolioItem) => void;
}

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ setCurrentPage, showPortfolioItem }) => {
    const featuredProjects = PORTFOLIO_ITEMS.filter(p => p.featured).slice(0, 3);

    return (
        <section className="bg-[#0d1117] py-24">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            <span style={{color: COLORS.orange}}>Projetos</span> em <span style={{color: COLORS.yellow}}>Destaque</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Alguns dos trabalhos que nos orgulhamos de ter criado para nossos clientes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {featuredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="projeto-card relative h-96 rounded-xl bg-cover bg-center overflow-hidden text-white flex p-8 text-left transition-transform duration-300 ease-in-out hover:-translate-y-1.5 border border-gray-800 cursor-pointer"
                                style={{ backgroundImage: `url(${project.imageUrl})` }}
                                onClick={() => showPortfolioItem(project)}
                                data-cursor-hover
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && showPortfolioItem(project)}
                                aria-label={`Ver projeto ${project.title}`}
                            >
                                <div className="relative z-10 mt-auto">
                                    <span className="block text-sm font-semibold mb-2" style={{color: COLORS.yellow}}>{project.category}</span>
                                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                                    {project.metric && <p className="text-base bg-white/10 px-4 py-1.5 rounded-full inline-block font-medium">{project.metric}</p>}
                                </div>
                            </div>
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