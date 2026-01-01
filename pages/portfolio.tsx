import React from 'react';
import Head from 'next/head';
import { PORTFOLIO_ITEMS } from '../src/constants';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 portfolio-page-container">
      <Head><title>Portfólio — Combo Digital</title></Head>
      <div className="particle-background"></div>
      <div className="container mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-16 animated-portfolio-title">Nosso Trabalho</h1>
        <div className="portfolio-grid">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.id} className="portfolio-item-container">
              <div className="portfolio-card-3d">
                <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                <div className="p-6 bg-gray-900/80">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-400">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;