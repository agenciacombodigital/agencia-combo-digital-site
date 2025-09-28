import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { COLORS, TESTIMONIALS } from '../constants';

interface TestimonialProps {
    quote: string;
    author: string;
    title: string;
}

const QuoteIcon: React.FC = () => (
    <svg width="60" height="45" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-2 left-2" style={{ color: COLORS.yellow, opacity: 0.15 }}>
        <path d="M18 0L24 12V36H0V12L6 0H18ZM42 0L48 12V36H24V12L30 0H42Z" fill="currentColor"/>
    </svg>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, title }) => (
    <div className="relative w-[90vw] md:w-[480px] flex-shrink-0 bg-[#0d1117] p-10 rounded-2xl border border-gray-800 snap-start flex flex-col">
        <QuoteIcon />
        <p className="text-lg text-gray-300 mb-8 italic leading-relaxed z-10 relative flex-grow">
            “{quote}”
        </p>
        <div className="mt-auto z-10 relative">
            <h4 className="text-white font-bold text-lg">{author}</h4>
            <p className="text-gray-400 text-sm">{title}</p>
        </div>
    </div>
);

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ref, isInView] = useInView({ threshold: 0.2 });
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
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollableWidth = container.scrollWidth - container.clientWidth;
            if (scrollableWidth > 0) {
                const progress = (container.scrollLeft / scrollableWidth) * 100;
                setScrollProgress(progress);
            }
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', handleScroll, { passive: true });
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            <span style={{color: COLORS.yellow}}>Vozes</span> que Marcam
                        </h2>
                    </div>
                </AnimatedSection>
            </div>
            
            <AnimatedSection>
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-8 pl-6 md:pl-24 pr-6 md:pr-24 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                >
                    {TESTIMONIALS.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>

                <div className="container mx-auto px-6 mt-16">
                    <div className="w-full max-w-lg mx-auto bg-gray-800 rounded-full h-1.5 relative">
                        <div 
                            className="h-1.5 rounded-full"
                            style={{ width: `${scrollProgress}%`, backgroundColor: COLORS.orange }}
                        ></div>
                        <div 
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
                            style={{ 
                                left: `calc(${scrollProgress}% - 8px)`, 
                                backgroundColor: COLORS.black,
                                borderColor: COLORS.blue
                            }}
                        >
                           <div className="w-full h-full rounded-full scale-75" style={{backgroundColor: COLORS.blue}}></div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

export default Testimonials;