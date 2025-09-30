import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';
import { Home, Users, Layers, Send, Menu, X } from 'react-feather'; // Import X para o botão de fechar interno

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  [Page.Home]: Home,
  [Page.About]: Users,
  [Page.Portfolio]: Layers,
  [Page.Contact]: Send,
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

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            {/* Este botão sempre será o ícone de hambúrguer para abrir o menu */}
            <button id="mobile-menu-toggle" className="mobile-menu-toggle" onClick={() => setIsOpen(true)} aria-label="Abrir menu" aria-expanded={isOpen} data-cursor-pointer>
                <Menu /> {/* Sempre mostra o ícone de Menu */}
            </button>

            <nav className={`sidebar-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
                {/* Cabeçalho Mobile - visível apenas no mobile, contém botão de fechar e logo */}
                <div className="mobile-menu-header md:hidden flex justify-between items-center w-full p-4 pb-8">
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" data-cursor-pointer aria-label="Fechar menu">
                        <X className="h-8 w-8" />
                    </button>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handleNavigate(Page.Home); }}
                        className="block"
                        data-cursor-pointer
                        aria-label="Página Inicial"
                    >
                        <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital" className="w-10 h-10" />
                    </a>
                </div>

                {/* Logo Desktop - escondido no mobile */}
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleNavigate(Page.Home); }}
                    className="hidden md:block mb-20 px-[15px] py-[12px] md:p-0"
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
                                    {/* No mobile, o texto é exibido ao lado do ícone, gerenciado via CSS */}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                {/* Espaçador para alinhamento vertical no desktop */}
                <div className="hidden md:block w-10 h-10"></div>
            </nav>
        </>
    );
};

export default Header;