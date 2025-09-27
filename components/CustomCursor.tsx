
import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-hover]')) {
            setIsHovering(true);
        }
         if (target.closest('a, button, [data-cursor-pointer]')) {
            setIsPointer(true);
        }
    };

    const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-hover]')) {
            setIsHovering(false);
        }
        if (target.closest('a, button, [data-cursor-pointer]')) {
            setIsPointer(false);
        }
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
  const dotSize = isPointer ? 0 : 8;

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 transition-all duration-300 ease-out rounded-full"
        style={{
          left: position.x,
          top: position.y,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: `translate(-50%, -50%)`,
          border: `2px solid ${isHovering ? COLORS.orange : COLORS.blue}`,
          opacity: isHovering ? 0.5 : 1,
        }}
      />
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
