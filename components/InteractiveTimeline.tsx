import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page } from '../types';
import { TIMELINE_EVENTS } from '../constants';
import { usePortfolioNavigation } from '@/hooks/usePortfolioNavigation';

gsap.registerPlugin(ScrollTrigger);

interface InteractiveTimelineProps {
  // setCurrentPage is no longer needed, replaced by hook
}

const MagneticButton: React.FC<{ children: React.ReactNode; onClick: () => void; className?: string }> = ({ children, onClick, className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(button, { x: x * 0.3, y: y * 0.3, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    // Apply effect only on devices that support hover
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (mediaQuery.matches) {
        document.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (mediaQuery.matches) {
        document.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <button ref={buttonRef} onClick={onClick} className={className} data-cursor-hover>
      {children}
    </button>
  );
};

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { navigateToPage } = usePortfolioNavigation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item-anim');
      
      gsap.set(items, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.timeline-progress-bar', { height: `${progress * 100}%` });
        },
      });

      items.forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item as gsap.DOMTarget,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Nossa Jornada</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Uma linha do tempo da nossa evolução, marcando os momentos que definiram quem somos hoje.
          </p>
        </div>

        <div ref={timelineRef} className="timeline-wrapper">
          <div className="timeline-line">
            <div className="timeline-progress-bar"></div>
          </div>
          {TIMELINE_EVENTS.map((event, index) => (
            <div key={index} className="timeline-item-anim">
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-icon" aria-hidden="true"></div>
                <div className="timeline-content">
                  <h3 className="timeline-year">{event.year}</h3>
                  <h4 className="timeline-title">{event.title}</h4>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24 timeline-item-anim">
          <h3 className="text-3xl font-bold text-white max-w-2xl mx-auto mb-8">
            O próximo marco? <span className="combo-gradient-text">Criar algo épico com você.</span>
          </h3>
          <MagneticButton 
            onClick={() => navigateToPage(Page.Contact)}
            className="footer-cta-button text-white font-bold py-4 px-10 rounded-full text-lg"
          >
            Vamos juntos?
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;