import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Page } from '../types';
import { PAGES } from '../constants';
import { Home, Users, Layers, Send, Menu, X } from 'react-feather';

interface HeaderProps {
  // currentPage and setCurrentPage are no longer needed for routing in Next.js, 
  // but we keep the structure for compatibility with the component's original design.
  // We will use the router path instead.
}

const iconMap: { [key: string]: React.ElementType } = {
  [Page.Home]: Home,
  [Page.About]: Users,
  [Page.Portfolio]: Layers,
  [Page.Contact]: Send,
};

// Helper function to map Page enum to Next.js path
const getPathFromPage = (pageName: Page) => {
    const page = PAGES.find(p => p.name === pageName);
    return page ? page.path : '/';
};

const Header: React.FC<HeaderProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    
    // Determine the current page based on the router path
    const currentPath = router.pathname;
    const currentPageName = PAGES.find(p => p.path === currentPath)?.name || Page.Home;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleNavigate = () => {
        setIsOpen(false); // Close menu on navigation
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
                    <Link 
                        href="/" 
                        onClick={handleNavigate}
                        className="block"
                        data-cursor-pointer
                        aria-label="Página Inicial"
                    >
                        <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital" className="w-10 h-10" />
                    </Link>
                </div>

                {/* Logo Desktop - escondido no mobile */}
                <Link 
                    href="/" 
                    className="hidden md:block mb-20 px-[15px] py-[12px] md:p-0"
                    data-cursor-pointer
                    aria-label="Página Inicial"
                >
                    <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital" className="w-10 h-10" />
                </Link>
                <ul>
                    {PAGES.map(page => {
                        const IconComponent = iconMap[page.name];
                        const path = getPathFromPage(page.name);
                        const isActive = currentPath === path;
                        
                        return (
                            <li key={page.name}>
                                <Link 
                                    href={path} 
                                    data-tooltip={page.name} 
                                    aria-label={page.name}
                                    onClick={handleNavigate}
                                    className={isActive ? 'active' : ''}
                                    data-cursor-pointer
                                >
                                    {IconComponent && <IconComponent />}
                                    {/* No mobile, o texto é exibido ao lado do ícone, gerenciado via CSS */}
                                </Link>
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