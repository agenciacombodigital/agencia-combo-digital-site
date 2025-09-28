import React, { useEffect, useRef } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';
import { useInView } from '../hooks/useInView';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

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

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    const footerRef = useRef<HTMLElement>(null);

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

  return (
    <footer ref={footerRef} className="site-footer">
        <div className="container mx-auto px-6 py-20 footer-content">
            <AnimatedSection>
                <div className="text-center mb-16">
                    <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital" className="w-16 h-16 mx-auto mb-6 footer-logo" />
                    <p className="text-2xl font-medium text-gray-300 max-w-2xl mx-auto">
                        Construindo o futuro digital com criatividade e tecnologia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center mb-16">
                    <div className="flex justify-center md:justify-start space-x-8 text-lg">
                        {PAGES.slice(0, 2).map(page => (
                            <a key={page.name} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page.name); }} className="footer-link" data-cursor-hover>
                                {page.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex justify-center order-first md:order-none">
                        <div className="flex space-x-6">
                            <SocialLink href="#" aria-label="Visite nosso X"><svg role="img" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></SocialLink>
                            <SocialLink href="#" aria-label="Visite nosso Instagram"><svg role="img" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.35 7.35 0 0 0 16.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.38-.896-.423-.164-1.057-.36-2.227-.413C3.615 17.585 3.235 17.57 0 17.57s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.056-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.38-.896.423-.164 1.057-.36 2.227-.413C8.415 2.175 8.795 2.16 12 2.16zm0 9.04c-1.815 0-3.286 1.47-3.286 3.286s1.47 3.286 3.286 3.286 3.286-1.47 3.286-3.286S13.815 11.2 12 11.2zm0 5.433c-1.188 0-2.146-.958-2.146-2.146s.958-2.146 2.146-2.146 2.146.958 2.146 2.146-.958 2.146-2.146 2.146zm6.362-7.393c-.595 0-1.077.482-1.077 1.077s.482 1.077 1.077 1.077 1.077-.482 1.077-1.077-.482-1.077-1.077-1.077z" /></svg></SocialLink>
                            <SocialLink href="#" aria-label="Visite nosso LinkedIn"><svg role="img" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.14-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg></SocialLink>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end space-x-8 text-lg">
                        {PAGES.slice(2, 4).map(page => (
                            <a key={page.name} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page.name); }} className="footer-link" data-cursor-hover>
                                {page.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-cta-card text-center max-w-3xl mx-auto mb-16">
                    <h3 className="text-3xl font-bold text-white mb-4">Pronto para criar o próximo nível?</h3>
                    <p className="text-gray-300 mb-6">Vamos transformar sua visão em uma realidade digital impactante.</p>
                    <button 
                        onClick={() => setCurrentPage(Page.Contact)}
                        className="footer-cta-button text-white font-bold py-3 px-8 rounded-full"
                        data-cursor-hover
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