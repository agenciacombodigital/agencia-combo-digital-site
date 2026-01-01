"use client";

import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../src/constants';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const easing = 0.2;

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

    let animationFrameId: number;
    
    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * easing;
      currentY.current += (targetY.current - currentY.current) * easing;

      if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const cursorSize = isHovering ? 80 : 20;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] transition-all duration-300 ease-out rounded-full flex items-center justify-center mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          border: `1.5px solid ${COLORS.white}`,
          opacity: isHovering ? 0.8 : 0.4,
          backgroundColor: isHovering ? 'white' : 'transparent',
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-100 bg-white mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          width: '6px',
          height: '6px',
        }}
      />
    </>
  );
};

export default CustomCursor;