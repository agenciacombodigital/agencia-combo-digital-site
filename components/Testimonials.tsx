import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { COLORS, TESTIMONIALS } from '../constants';

interface TestimonialProps {
    quote: string;
    author: string;
    title: string;
    imageUrl: string;
}

const QuoteIcon: React.FC = () => (
    <svg width="80" height="60" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-4 -left-4 text-gray-800" style={{ color: 'rgba(252, 192, 23, 0.05)' }}>
        <path d="M18 0L24 12V36H0V12L6 0H18ZM42 0L48 12V36H24V12L30 0H42Z" fill="currentColor"/>
    </svg>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, title, imageUrl }) => (
    <div className="testimonial-card-container w-[80vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 snap-center" data-cursor-quote>
        <div className="testimonial-card relative bg-[#161b22]/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800 flex flex-col h-full shadow-lg">
            <QuoteIcon />
            <p className="text-2xl md:text-3xl font-medium text-gray-200 mb-8 italic leading-snug z-10 relative flex-grow">
                {quote}
            </p>
            <div className="mt-auto z-10 relative flex items-center gap-4">
                <img src={imageUrl} alt={author} className="w-16 h-16 rounded-full object-cover border-2 border-gray-700 grayscale transition-all duration-300 group-hover:grayscale-0" />
                <div>
                    <h4 className="text-white font-bold text-lg" style={{color: COLORS.yellow}}>{author}</h4>
                    <p className="text-gray-400 text-sm">{title}</p>
                </div>
            </div>
        </div>
    </div>
);

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

const Testimonials: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const { clientX, clientY } = e;
                const { left, top } = sectionRef.current.getBoundingClientRect();
                sectionRef.current.style.setProperty('--mouse-x', `${clientX - left}px`);
                sectionRef.current.style.setProperty('--mouse-y', `${clientY - top}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollableWidth = container.scrollWidth - container.clientWidth;
            const progress = scrollableWidth > 0 ? (container.scrollLeft / scrollableWidth) * 100 : 0;
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', handleScroll, { passive: true });
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="py-24 bg-black overflow-hidden relative"
            style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 161, 255, 0.08), transparent 50%)`
            }}
        >
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            <span style={{color: COLORS.yellow}}>Vozes</span> que Marcam
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            O que nossos parceiros dizem sobre a experiência de criar o futuro conosco.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
            
            <AnimatedSection>
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-8 pl-[10vw] md:pl-[20vw] lg:pl-[27.5vw] pr-[10vw] md:pr-[20vw] lg:pr-[27.5vw] overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                >
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>

                <div className="container mx-auto px-6 mt-16">
                    <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full h-1">
                        <div 
                            className="h-1 rounded-full"
                            style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.orange})` }}
                        ></div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

export default Testimonials;