import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Page } from '../src/types';
import { PAGES } from '../src/constants';
import { useInView } from '../hooks/useInView';

interface FooterProps {}

const SocialLink: React.FC<{href: string, children: React.ReactNode, 'aria-label': string}> = ({ href, children, 'aria-label': ariaLabel }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-social-link" data-cursor-hover aria-label={ariaLabel}>
        {children}
    </a>
);

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
            {children}
        </div>
    );
};

const Footer: React.FC<FooterProps> = () => {
    const footerRef = useRef<HTMLElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (footerRef.current) {
                const { clientX, clientY } = e;
                const { left, top } = footerRef.current.getBoundingClientRect();
                footerRef.current.style.setProperty('--mouse-x', `${clientX - left}px`);
                footerRef.current.style.setProperty('--mouse-y', `${clientY - top}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getPathFromPage = (pageName: Page) => {
        const page = PAGES.find(p => p.name === pageName);
        return page ? page.path : '/';
    };
    
    const navigateToContact = () => {
        router.push(getPathFromPage(Page.Contact));
    };


  return (
    <footer ref={footerRef} className="site-footer">
        <div className="container mx-auto px-6 py-20 footer-content">
            <AnimatedSection>
                <div className="text-center mb-16">
                    <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital - Agência de Marketing e IA" className="w-16 h-16 mx-auto mb-6 footer-logo" />
                    <p className="text-2xl font-medium text-gray-300 max-w-2xl mx-auto">
                        Construindo o futuro digital com criatividade e tecnologia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center mb-16">
                    <div className="flex justify-center md:justify-start space-x-8 text-lg">
                        {PAGES.slice(0, 2).map(page => (
                            <Link key={page.name} href={getPathFromPage(page.name)} className="footer-link" data-cursor-hover>
                                {page.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center order-first md:order-none">
                        <div className="flex space-x-6">
                            <SocialLink href="https://www.instagram.com/agenciacombodigital/" aria-label="Siga-nos no Instagram">
                                <svg role="img" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <title>Instagram</title>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </SocialLink>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end space-x-8 text-lg">
                        {PAGES.slice(2, 4).map(page => (
                            <Link key={page.name} href={getPathFromPage(page.name)} className="footer-link" data-cursor-hover>
                                {page.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="footer-cta-card text-center max-w-3xl mx-auto mb-16">
                    <h3 className="text-3xl font-bold text-white mb-4">Pronto para criar o próximo nível?</h3>
                    <p className="text-gray-300 mb-6">Vamos transformar sua visão em uma realidade digital impactante.</p>
                    <button 
                        onClick={navigateToContact}
                        className="footer-cta-button text-white font-bold py-4 px-10 rounded-full"
                        data-cursor-hover
                        aria-label="Ir para a página de contato"
                    >
                        Entre em Contato
                    </button>
                </div>

                <div className="footer-bottom-bar pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Combo Digital. Todos os direitos reservados.
                    </p>
                </div>
            </AnimatedSection>
        </div>
    </footer>
  );
};

export default Footer;