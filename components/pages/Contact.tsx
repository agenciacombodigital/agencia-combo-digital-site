import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import ContactBackground from '../ContactBackground';
import InteractiveGlobe from '../InteractiveGlobe';
import CustomToast from '../CustomToast';
import { Page } from '../../types';
import { COLORS } from '../../constants';

gsap.registerPlugin(TextPlugin);

interface ContactProps {
  setCurrentPage: (page: Page) => void;
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

const Contact: React.FC<ContactProps> = ({ setCurrentPage }) => {
    const [status, setStatus] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const formCardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          duration: 1.5,
          text: "VAMOS CRIAR O IMPOSSÍVEL",
          ease: "power1.inOut",
          delay: 0.5,
          onComplete: () => {
            gsap.to(".contact-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
          }
        });
      }
    }, []);

    const playClickSound = useCallback(() => {
      const audio = new Audio('/audio/futuristic-click.mp3'); // Placeholder for a futuristic click sound
      audio.volume = 0.5;
      audio.play().catch(e => console.error("Failed to play sound:", e));
    }, []);

    const handleCopyClick = useCallback(async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('Copiado para a área de transferência!');
        setShowToast(true);
        playClickSound();
      } catch (err) {
        console.error('Failed to copy: ', err);
        setStatus('Falha ao copiar.');
        setShowToast(true);
      }
    }, [playClickSound]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        playClickSound();
        setStatus('Enviando...');
        setShowToast(false); // Hide previous toast if any

        // Simulate particle burst and ripple effect
        if (formCardRef.current) {
          gsap.to(formCardRef.current, {
            scale: 1.02,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            boxShadow: "0 0 30px rgba(0, 161, 255, 0.5), 0 0 60px rgba(251, 86, 38, 0.3)",
            onComplete: () => {
              gsap.to(formCardRef.current, { boxShadow: "0 10px 30px rgba(0,0,0,0.2)", duration: 0.5 });
            }
          });
        }

        setTimeout(() => {
            setStatus('Obrigado! Sua mensagem foi enviada com sucesso.');
            setShowToast(true);
            e.currentTarget.reset();
            // setTimeout(() => setStatus(''), 3000); // Handled by CustomToast
        }, 2000);
    };

    const SocialLink: React.FC<{href: string, children: React.ReactNode, label: string}> = ({ href, children, label }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 relative group" data-cursor-pointer aria-label={label}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 group-hover:bg-transparent transition-colors duration-300 transform group-hover:rotate-6 group-hover:scale-110">
                {children}
            </div>
        </a>
    );

  return (
    <div className="min-h-screen flex items-center justify-center pt-12 pb-20 px-6 relative overflow-hidden">
      <ContactBackground isMobile={isMobile} /> {/* Three.js Background */}
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black uppercase tracking-tighter combo-gradient-text contact-hero-title" style={{ textStroke: '1px #fff', WebkitTextStroke: '1px #fff', WebkitTextFillColor: 'transparent' }}>
            {/* Initial text for GSAP to animate */}
          </h1>
          <h2 className="mt-4 max-w-3xl mx-auto text-lg text-gray-300 opacity-0 translate-y-10 contact-subtitle">
            Sua próxima grande ideia começa com uma conversa. Estamos prontos para ouvir.
          </h2>
        </div>

        <div ref={formCardRef} className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 bg-black/30 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-800 relative overflow-hidden contact-form-card">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl p-[2px] pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-orange-500 to-yellow-500 animate-spin-slow"></div>
                <div className="absolute inset-[2px] rounded-2xl bg-black/30"></div>
            </div>

            <div className="md:col-span-2 relative z-10">
                 <h3 className="text-3xl font-bold mb-6">Inicie uma Conversa</h3>
                 <p className="text-gray-400 mb-8">
                    Use o formulário para nos enviar uma mensagem ou conecte-se conosco através de nossos canais diretos. A vanguarda digital espera por você.
                 </p>
                 <div className="space-y-4 text-gray-300 mb-8">
                    <p>
                      <strong>Email:</strong> 
                      <span 
                        className="ml-2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" 
                        onClick={() => handleCopyClick('hello@combo.digital')}
                        data-cursor-pointer
                      >
                        hello@combo.digital
                      </span>
                    </p>
                    <p>
                      <strong>Telefone:</strong> 
                      <span 
                        className="ml-2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" 
                        onClick={() => handleCopyClick('+55 (11) 99999-8888')}
                        data-cursor-pointer
                      >
                        +55 (11) 99999-8888
                      </span>
                    </p>
                 </div>
                 <div className="flex space-x-6">
                    <SocialLink href="#" label="Visite nosso perfil no X"><i data-feather="twitter" className="h-6 w-6"></i></SocialLink>
                    <SocialLink href="#" label="Visite nosso perfil no Instagram"><i data-feather="instagram" className="h-6 w-6"></i></SocialLink>
                    <SocialLink href="#" label="Visite nosso perfil no LinkedIn"><i data-feather="linkedin" className="h-6 w-6"></i></SocialLink>
                    <SocialLink href="https://wa.me/5511959085506" label="Contactar no WhatsApp"><i data-feather="message-circle" className="h-6 w-6"></i></SocialLink>
                 </div>
            </div>
            <form onSubmit={handleSubmit} className="md:col-span-3 relative z-10">
                <div className="space-y-10">
                    <div className="relative">
                        <input type="text" name="name" id="name" placeholder=" " required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 transition-colors duration-300 contact-input" />
                        <label htmlFor="name" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Seu Nome</label>
                    </div>
                    <div className="relative">
                        <input type="email" name="email" id="email" placeholder=" " required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 transition-colors duration-300 contact-input" />
                        <label htmlFor="email" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Seu Email</label>
                    </div>
                    <div className="relative">
                        <textarea name="message" id="message" placeholder=" " rows={4} required className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none p-2 transition-colors duration-300 contact-input"></textarea>
                        <label htmlFor="message" className="absolute left-2 -top-5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-blue-400 peer-focus:text-xs">Sua Mensagem</label>
                    </div>
                    <div>
                         <MagneticButton 
                            onClick={handleSubmit}
                            className="w-full py-4 text-white font-bold uppercase tracking-widest rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl contact-submit-button"
                            style={{ background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.orange})` }}
                        >
                            Enviar Proposta
                        </MagneticButton>
                    </div>
                </div>
            </form>
        </div>

        {/* Interactive Globe */}
        <div className="mt-20 h-96 w-full max-w-4xl mx-auto relative z-10">
          <InteractiveGlobe isMobile={isMobile} />
        </div>

        {/* Call to Action Final */}
        <div className="text-center mt-24 py-16 bg-black relative z-10">
          <h3 className="text-4xl font-bold text-white max-w-3xl mx-auto mb-8">
            Pronto para criar o futuro conosco?
          </h3>
          <MagneticButton 
            onClick={() => setCurrentPage(Page.Contact)} // Stays on contact, or could navigate to a "thank you" page
            className="footer-cta-button text-white font-bold py-4 px-10 rounded-full text-lg"
          >
            Vamos Conversar
          </MagneticButton>
        </div>
      </div>
      {showToast && <CustomToast message={status} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default Contact;