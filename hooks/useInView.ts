import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useInView = (options?: UseInViewOptions) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const { threshold = 0.1, triggerOnce = false, ...observerOptions } = options || {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
            // Optional: reset when out of view
            if (!triggerOnce) {
                setIsInView(false);
            }
        }
      },
      {
        threshold,
        ...observerOptions,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, observerOptions]); // Adicionando dependências

  return [ref, isInView] as const;
};