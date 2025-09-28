import React from 'react';
import { COLORS } from '../constants';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 border-2 border-gray-800 rounded-full animate-pulse"></div>
        <div 
            className="absolute inset-2 border-2 rounded-full animate-spin"
            style={{ borderColor: COLORS.blue, animationDuration: '3s' }}
        ></div>
        <div 
            className="absolute inset-4 border-2 rounded-full animate-spin"
            style={{ borderColor: COLORS.orange, animationDirection: 'reverse', animationDuration: '2.5s' }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/Logo-ComboDigitalV2.svg" 
            alt="Logo Combo Digital animado" 
            className="w-24 h-24 animate-pulse" // Adicionando o logo e a animação de pulsação
            style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;