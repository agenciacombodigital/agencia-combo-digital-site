import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';

// Declaration for feather icons script
declare global {
    interface Window {
        feather: {
            replace: () => void;
        };
    }
}

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const iconMap: { [key: string]: string } = {
  [Page.Home]: 'home',
  [Page.About]: 'users',
  [Page.Portfolio]: 'layers',
  [Page.Contact]: 'send',
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Run feather.replace() to render icons after component mounts or when menu opens/closes
        if (window.feather) {
            window.feather.replace();
        }
    }, [isOpen]);

    useEffect(() => {
        // Lock body scroll when mobile menu is open
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
        setIsOpen(false); // Close menu on navigation
    };

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>
            <button id="mobile-menu-toggle" className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu" aria-expanded={isOpen} data-cursor-pointer>
                <i data-feather={isOpen ? 'x' : 'menu'}></i>
            </button>

            <nav className={`sidebar-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleNavigate(Page.Home); }}
                    className="block mb-20 md:mb-0 px-[15px] py-[12px] md:p-0"
                    data-cursor-pointer
                    aria-label="Página Inicial"
                >
                    <img src="/Logo-ComboDigitalV2.svg" alt="Combo Digital Logo" className="w-10 h-10" />
                </a>
                <ul>
                    {PAGES.map(page => (
                        <li key={page.name}>
                            <a 
                                href="#" 
                                data-tooltip={page.name} 
                                aria-label={page.name}
                                onClick={(e) => { e.preventDefault(); handleNavigate(page.name); }}
                                className={currentPage === page.name ? 'active' : ''}
                                data-cursor-pointer
                            >
                                <i data-feather={iconMap[page.name]}></i>
                            </a>
                        </li>
                    ))}
                </ul>
                {/* Spacer for vertical alignment on desktop */}
                <div className="hidden md:block w-10 h-10"></div>
            </nav>
        </>
    );
};

export default Header;