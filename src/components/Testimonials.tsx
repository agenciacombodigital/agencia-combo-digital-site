import React from 'react';
import { useInView } from '../hooks/useInView';
import { COLORS } from '../constants';

interface TestimonialProps {
    quote: string;
    author: string;
    title: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, title }) => (
    <div className="bg-[#161b22] p-8 rounded-xl border border-gray-800 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500">
        <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">"{quote}"</p>
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold">
                {author.charAt(0)}
            </div>
            <div>
                <h4 className="text-white font-bold text-lg">{author}</h4>
                <p className="text-gray-400 text-sm">{title}</p>
            </div>
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

const testimonials = [
    {
        quote: "A Combo Digital transformou nossa presença online. O design é impecável e a estratégia de IA realmente impulsionou nossos resultados.",
        author: "Ana Paula S.",
        title: "CEO, Tech Solutions"
    },
    {
        quote: "Nunca vi uma agência tão dedicada e inovadora. O projeto superou todas as nossas expectativas e o suporte foi excepcional.",
        author: "Roberto M.",
        title: "Diretor de Marketing, Global Corp"
    },
    {
        quote: "Desde o branding até a campanha de lançamento, a Combo Digital entregou excelência. Nossos clientes adoraram a nova identidade!",
        author: "Carla V.",
        title: "Fundadora, Creative Brands"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            O Que Nossos <span style={{color: COLORS.blue}}>Clientes</span> Dizem
                        </h2>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                            Histórias de sucesso e parcerias que nos inspiram a ir além.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Testimonials;