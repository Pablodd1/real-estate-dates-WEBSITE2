import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Data moved inside component for translation hooks

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t('testimonials.list.t1.quote'),
      avatar: '/images/coffee.png',
      name: t('testimonials.list.t1.name'),
      role: t('testimonials.list.t1.role'),
    },
    {
      quote: t('testimonials.list.t2.quote'),
      avatar: '/images/couple.png',
      name: t('testimonials.list.t2.name'),
      role: t('testimonials.list.t2.role'),
    },
    {
      quote: t('testimonials.list.t3.quote'),
      avatar: '/images/couple.png',
      name: t('testimonials.list.t3.name'),
      role: t('testimonials.list.t3.role'),
    },
  ];

  const stats = [
    { value: t('testimonials.stats.s1.value'), label: t('testimonials.stats.s1.label') },
    { value: t('testimonials.stats.s2.value'), label: t('testimonials.stats.s2.label') },
    { value: t('testimonials.stats.s3.value'), label: t('testimonials.stats.s3.label') },
    { value: t('testimonials.stats.s4.value'), label: t('testimonials.stats.s4.label') },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const header = sectionRef.current.querySelectorAll('.test-header');
    gsap.from(header, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    const cards = sectionRef.current.querySelectorAll('.test-card');
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.test-grid'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const statsBar = sectionRef.current.querySelector('.stats-bar');
    gsap.from(statsBar, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsBar,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Count-up animation for stat numbers
    const statNumbers = sectionRef.current.querySelectorAll('.stat-number');
    statNumbers.forEach((el) => {
      const target = el.getAttribute('data-value') || '0';
      // Parse numeric part
      const numericMatch = target.match(/[\d.]+/);
      if (!numericMatch) return;
      const numericValue = parseFloat(numericMatch[0]);
      const isDecimal = target.includes('.');
      const suffix = target.replace(/[\d.,]+/, '');

      const obj = { val: 0 };
      gsap.to(obj, {
        val: numericValue,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsBar,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (isDecimal) {
            el.textContent = obj.val.toFixed(1) + suffix;
          } else {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          }
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-6 sm:py-10">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-12"
        style={{ backgroundImage: 'url(/images/app.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="test-header">
          <SectionHeader
            eyebrow={t('testimonials.sectionTitle')}
            headline={t('testimonials.title')}
            subheadline={t('testimonials.subtitle')}
            theme="dark"
          />
        </div>

        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="test-card liquid-glass rounded-xl p-8 hover:border-gold/20 transition-all duration-300 "
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-white/80 italic leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-medium text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/80 uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar mt-12 liquid-glass rounded-xl p-8 md:p-12 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="stat-number text-4xl md:text-5xl font-semibold text-gold mb-2"
                  data-value={stat.value}
                >
                  0
                </p>
                <p className="text-xs text-white/80 uppercase tracking-[0.1em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
