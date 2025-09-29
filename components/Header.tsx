import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';
import { Home, Users, Layers, Send, Menu, X, LogIn } from 'react-feather'; // Importando LogIn

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  [Page.Home]: Home,
  [Page.About]: Users,
  [Page.Portfolio]: Layers,
  [Page.Contact]: Send,
  [Page.Auth]: LogIn, // Mapeando o ícone LogIn para a página Auth
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Bloqueia o scroll do body quando o menu mobile está aberto
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setIsOpen(false); // Fecha o menu ao navegar
    };

    const MobileMenuIcon = isOpen ? X : Menu;

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            <button id="mobile-menu-toggle" className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu" aria-expanded={isOpen} data-cursor-pointer>
                <MobileMenuIcon />
            </button>

            <nav className={`sidebar-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleNavigate(Page.Home); }}
                    className="block mb-20 md:mb-0 px-[15px] py-[12px] md:p-0"
                    data-cursor-pointer
                    aria-label="Página Inicial"
                >
                    <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital" className="w-10 h-10" />
                </a>
                <ul>
                    {PAGES.map(page => {
                        const IconComponent = iconMap[page.name];
                        return (
                            <li key={page.name}>
                                <a 
                                    href="#" 
                                    data-tooltip={page.name} 
                                    aria-label={page.name}
                                    onClick={(e) => { e.preventDefault(); handleNavigate(page.name); }}
                                    className={currentPage === page.name ? 'active' : ''}
                                    data-cursor-pointer
                                >
                                    {IconComponent && <IconComponent />}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                {/* Spacer for vertical alignment on desktop */}
                <div className="hidden md:block w-10 h-10"></div>
            </nav>
        </>
    );
};

export default Header;