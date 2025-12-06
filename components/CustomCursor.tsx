"use client";

import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants';

const CustomCursor: React.FC = () => {
  // Refs para elementos DOM
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Refs para rastreamento de posição
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Fator de suavização (easing) para a fluidez
  const easing = 0.3; // Aumentado de 0.15 para 0.3 para maior velocidade de resposta

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-hover]')) setIsHovering(true);
        if (target.closest('a, button, [data-cursor-pointer]')) setIsPointer(true);
    };

    const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-hover]')) setIsHovering(false);
        if (target.closest('a, button, [data-cursor-pointer]')) setIsPointer(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Loop de animação para movimento suave
    let animationFrameId: number;
    
    const animate = () => {
      // Interpolação de posição
      currentX.current += (targetX.current - currentX.current) * easing;
      currentY.current += (targetY.current - currentY.current) * easing;

      // Atualiza o DOM diretamente usando transform3d para aceleração de GPU
      if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Inicia o loop de animação
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Lógica de tamanho do cursor (isQuote removido)
  const cursorSize = isHovering ? 60 : 24;
  const dotSize = isPointer ? 0 : 8; 

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out rounded-full flex items-center justify-center"
        style={{
          // A posição é controlada pelo JS transform
          left: 0,
          top: 0,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          border: `2px solid ${isHovering ? COLORS.orange : COLORS.blue}`,
          opacity: isHovering ? 0.5 : 1,
          backgroundColor: 'transparent',
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-100"
        style={{
          left: 0,
          top: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: COLORS.white,
        }}
      />
    </>
  );
};

export default CustomCursor;