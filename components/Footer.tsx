import React from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const SocialLink: React.FC<{href: string, children: React.ReactNode, 'aria-label': string}> = ({ href, children, 'aria-label': ariaLabel }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" data-cursor-pointer aria-label={ariaLabel}>
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

  return (
    <footer className="site-footer">
        <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Coluna 1: Logo e Descrição */}
                <div className="lg:col-span-1">
                    <img src="/Logo-ComboDigitalV2.svg" alt="Combo Digital Logo" className="w-12 h-12 mb-4" />
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Arquitetos do futuro digital, construindo legados para marcas que ousam ser diferentes.
                    </p>
                </div>

                {/* Coluna 2: Navegação */}
                <div>
                    <h3 className="footer-heading">Navegação</h3>
                    <ul className="space-y-3">
                        {PAGES.map(page => (
                            <li key={page.name}>
                                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page.name); }} className="footer-link">
                                    {page.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div>
                    <h3 className="footer-heading">Conecte-se</h3>
                    <div className="flex space-x-5 mt-4">
                        <SocialLink href="#" aria-label="Visite nosso X"><svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></SocialLink>
                        <SocialLink href="#" aria-label="Visite nosso Instagram"><svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.854.228A7.35 7.35 0 0 0 16.947.072C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.38-.896-.423-.164-1.057-.36-2.227-.413C3.615 17.585 3.235 17.57 0 17.57s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.074-4.85c.056-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.38-.896.423-.164 1.057-.36 2.227-.413C8.415 2.175 8.795 2.16 12 2.16zm0 9.04c-1.815 0-3.286 1.47-3.286 3.286s1.47 3.286 3.286 3.286 3.286-1.47 3.286-3.286S13.815 11.2 12 11.2zm0 5.433c-1.188 0-2.146-.958-2.146-2.146s.958-2.146 2.146-2.146 2.146.958 2.146 2.146-.958 2.146-2.146 2.146zm6.362-7.393c-.595 0-1.077.482-1.077 1.077s.482 1.077 1.077 1.077 1.077-.482 1.077-1.077-.482-1.077-1.077-1.077z" /></svg></SocialLink>
                        <SocialLink href="#" aria-label="Visite nosso LinkedIn"><svg role="img" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.14-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg></SocialLink>
                    </div>
                </div>

                {/* Coluna 4: Contato */}
                <div>
                    <h3 className="footer-heading">Vamos Criar</h3>
                    <a href="mailto:hello@combo.digital" className="footer-link text-lg font-bold combo-gradient-text">
                        hello@combo.digital
                    </a>
                </div>
            </div>

            {/* Barra Inferior */}
            <div className="footer-bottom-bar">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Combo Digital. Todos os direitos reservados.
                </p>
                <button onClick={scrollToTop} className="back-to-top-btn" data-cursor-pointer>
                    Voltar ao Topo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
            </div>
        </div>
    </footer>
  );
};

export default Footer;