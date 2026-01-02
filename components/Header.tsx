import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Page } from '../src/types';
import { PAGES } from '../src/constants';
import { Home, Users, Layers, Send, Menu, X } from 'react-feather';

interface HeaderProps {}

const iconMap: { [key: string]: React.ElementType } = {
  [Page.Home]: Home,
  [Page.About]: Users,
  [Page.Portfolio]: Layers,
  [Page.Contact]: Send,
};

const getPathFromPage = (pageName: Page) => {
    const page = PAGES.find(p => p.name === pageName);
    return page ? page.path : '/';
};

const Header: React.FC<HeaderProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    
    const currentPath = router.pathname;

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
        setIsOpen(false);
    };

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            <button id="mobile-menu-toggle" className="mobile-menu-toggle" onClick={() => setIsOpen(true)} aria-label="Abrir menu de navegação" aria-expanded={isOpen} data-cursor-pointer>
                <Menu aria-hidden="true" />
            </button>

            <nav className={`sidebar-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
                <div className="mobile-menu-header md:hidden flex justify-between items-center w-full p-4 pb-8">
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" data-cursor-pointer aria-label="Fechar menu de navegação">
                        <X className="h-8 w-8" aria-hidden="true" />
                    </button>
                    <Link 
                        href="/" 
                        onClick={handleNavigate}
                        className="block"
                        data-cursor-pointer
                        aria-label="Combo Digital - Home"
                    >
                        <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital - Agência de Marketing e IA" className="w-10 h-10" />
                    </Link>
                </div>

                <Link 
                    href="/" 
                    className="hidden md:block mb-20 px-[15px] py-[12px] md:p-0"
                    data-cursor-pointer
                    aria-label="Combo Digital - Home"
                >
                    <img src="/Logo-ComboDigitalV2.svg" alt="Logo Combo Digital - Agência de Marketing e IA" className="w-10 h-10" />
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
                                    {IconComponent && <IconComponent aria-hidden="true" />}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="hidden md:block w-10 h-10"></div>
            </nav>
        </>
    );
};

export default Header;