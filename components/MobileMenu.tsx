import React from 'react';
import { Page } from '../src/types';
import { PAGES } from '../src/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <nav
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900/95 shadow-2xl p-8 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex justify-between items-center mb-16">
          <div id="mobile-menu-title" className="text-2xl font-extrabold tracking-widest combo-gradient-text">
            MENU
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" data-cursor-pointer aria-label="Fechar menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex flex-col space-y-8">
          {PAGES.map((page) => (
            <a
              key={page.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(page.name);
              }}
              className={`text-3xl font-bold transition-colors duration-300 text-left ${currentPage === page.name ? 'combo-gradient-text' : 'text-gray-300 hover:text-white'}`}
            >
              {page.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;