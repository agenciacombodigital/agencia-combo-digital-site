import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isQuote, setIsQuote] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-cursor-quote]')) setIsQuote(true);
        if (target.closest('a, button, [data-cursor-hover]')) setIsHovering(true);
        if (target.closest('a, button, [data-cursor-pointer]')) setIsPointer(true);
    };

    const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-cursor-quote]')) setIsQuote(false);
        if (target.closest('a, button, [data-cursor-hover]')) setIsHovering(false);
        if (target.closest('a, button, [data-cursor-pointer]')) setIsPointer(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const cursorSize = isHovering ? 60 : 24;
  const dotSize = isPointer || isQuote ? 0 : 8;

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 transition-all duration-300 ease-out rounded-full flex items-center justify-center"
        style={{
          left: position.x,
          top: position.y,
          width: `${isQuote ? 48 : cursorSize}px`,
          height: `${isQuote ? 48 : cursorSize}px`,
          transform: `translate(-50%, -50%)`,
          border: `2px solid ${isHovering ? COLORS.orange : isQuote ? 'transparent' : COLORS.blue}`,
          opacity: isHovering ? 0.5 : 1,
          backgroundColor: isQuote ? 'rgba(252, 192, 23, 0.2)' : 'transparent',
        }}
      >
        {isQuote && (
            <svg width="24" height="18" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: COLORS.yellow }}>
                <path d="M18 0L24 12V36H0V12L6 0H18ZM42 0L48 12V36H24V12L30 0H42Z" fill="currentColor"/>
            </svg>
        )}
      </div>
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-all duration-100"
        style={{
          left: position.x,
          top: position.y,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          transform: `translate(-50%, -50%)`,
          backgroundColor: COLORS.white,
        }}
      />
    </>
  );
};

export default CustomCursor;