import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';

interface CustomToastProps {
  message: string;
  duration?: number; // in ms
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast with a slight delay for animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);
    // Hide toast after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Call onClose after animation finishes
      setTimeout(onClose, 500); 
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}
      style={{
        background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.orange})`,
        color: COLORS.white,
        transformStyle: 'preserve-3d',
        transform: `translateZ(50px) ${isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)'}`
      }}
    >
      <p className="font-semibold text-lg">{message}</p>
    </div>
  );
};

export default CustomToast;