import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
    };

    const MobileMenu = () => (
        <div className="mobile-nav-overlay animate-fade-in-up">
            <nav>
                <ul className="flex flex-col items-center space-y-8">
                    {PAGES.map((page, index) => (
                        <li key={page.name} className="animate-fade-in-up" style={{ animationDelay: `${150 * (index + 1)}ms` }}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavigate(page.name); }}
                                className={currentPage === page.name ? 'active' : ''}
                                data-cursor-pointer
                            >
                                {page.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

    return (
        <>
            <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleNavigate(Page.Home); }}
                        className="header-logo"
                        data-cursor-pointer
                        aria-label="Página Inicial"
                    >
                        <img src="/Logo-ComboDigitalV2.svg" alt="Combo Digital Logo" className="w-10 h-10" />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 header-nav">
                        {PAGES.map(page => (
                            <a
                                key={page.name}
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavigate(page.name); }}
                                className={currentPage === page.name ? 'active' : ''}
                                data-cursor-pointer
                            >
                                {page.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                     <button 
                        onClick={() => handleNavigate(Page.Contact)}
                        className="hidden md:block px-6 py-2 text-white font-semibold rounded-full header-cta"
                        data-cursor-hover
                    >
                        Vamos Criar
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white mobile-nav-toggle"
                        aria-label="Abrir menu"
                        data-cursor-pointer
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </header>
            {mobileMenuOpen && <MobileMenu />}
        </>
    );
};

export default Header;