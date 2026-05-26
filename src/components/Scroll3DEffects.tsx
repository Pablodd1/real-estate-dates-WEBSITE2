import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Scroll3DEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function Scroll3DEffect({ children, className = '', intensity = 1 }: Scroll3DEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade and slide up on scroll
      gsap.fromTo(contentRef.current, 
        { 
          opacity: 0.3,
          y: 50 * intensity
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          ease: 'none',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={className}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
