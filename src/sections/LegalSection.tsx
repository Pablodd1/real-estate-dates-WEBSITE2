import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Scale, Eye, UserCheck, Lock, FileText, AlertTriangle, Ban, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Move static arrays inside component for i18n hooks

export default function LegalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const policies = [
    {
      icon: <UserCheck className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy1.title'),
      content: t('legal.policies.policy1.content'),
    },
    {
      icon: <Shield className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy2.title'),
      content: t('legal.policies.policy2.content'),
    },
    {
      icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy3.title'),
      content: t('legal.policies.policy3.content'),
    },
    {
      icon: <Scale className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy4.title'),
      content: t('legal.policies.policy4.content'),
    },
    {
      icon: <Lock className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy5.title'),
      content: t('legal.policies.policy5.content'),
    },
    {
      icon: <Eye className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy6.title'),
      content: t('legal.policies.policy6.content'),
    },
    {
      icon: <Ban className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy7.title'),
      content: t('legal.policies.policy7.content'),
    },
    {
      icon: <CheckCircle className="w-5 h-5" strokeWidth={1.5} />,
      title: t('legal.policies.policy8.title'),
      content: t('legal.policies.policy8.content'),
    },
  ];

  const legalHighlights = [
    {
      label: t('legal.highlights.item1.label'),
      value: t('legal.highlights.item1.value'),
      note: t('legal.highlights.item1.note'),
    },
    {
      label: t('legal.highlights.item2.label'),
      value: t('legal.highlights.item2.value'),
      note: t('legal.highlights.item2.note'),
    },
    {
      label: t('legal.highlights.item3.label'),
      value: t('legal.highlights.item3.value'),
      note: t('legal.highlights.item3.note'),
    },
    {
      label: t('legal.highlights.item4.label'),
      value: t('legal.highlights.item4.value'),
      note: t('legal.highlights.item4.note'),
    },
    {
      label: t('legal.highlights.item5.label'),
      value: t('legal.highlights.item5.value'),
      note: t('legal.highlights.item5.note'),
    },
    {
      label: t('legal.highlights.item6.label'),
      value: t('legal.highlights.item6.value'),
      note: t('legal.highlights.item6.note'),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.legal-item');
    gsap.from(items, {
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.legal-title', {
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.legal-stat', {
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.legal-stats',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="legal"
      className="relative w-full py-6 sm:py-10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{ background: '#D4AF37', filter: 'blur(120px)', top: '30%', left: '-15%' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="legal-title text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('legal.sectionTitle')}
          </p>
          <h2 className="legal-title font-script text-gold text-3xl sm:text-4xl md:text-5xl italic mb-4 sm:mb-5">
            {t('legal.title')}
          </h2>
          <p className="legal-title text-base sm:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            {t('legal.subtitle')}
          </p>
        </div>

        {/* Legal Compliance Stats */}
        <div className="legal-stats grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 sm:mb-10 max-w-[1000px] mx-auto">
          {legalHighlights.map((stat, i) => (
            <div key={i} className="legal-stat text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-xs text-white/75 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-gold">{stat.value}</p>
              <p className="text-[10px] text-white/70 mt-1">{stat.note}</p>
            </div>
          ))}
        </div>

        {/* Accordion Policies */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {policies.map((policy, i) => (
            <div
              key={i}
              className="legal-item border border-white/[0.06] rounded-xl transition-all duration-300 hover:border-gold/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  {policy.icon}
                </div>
                <span className="flex-1 text-sm sm:text-base font-medium text-white">
                  {policy.title}
                </span>
                <svg
                  className={`w-4 h-4 text-white/75 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[4.5rem] sm:pl-[4.5rem] text-sm text-white/80 leading-relaxed">
                  {policy.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom notice */}
        <div className="max-w-[800px] mx-auto mt-10 sm:mt-12 p-5 sm:p-6 rounded-xl border border-gold/10 bg-gold/[0.02]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white mb-1">{t('legal.notice.title')}</p>
              <p className="text-sm text-white/80 leading-relaxed">
                {t('legal.notice.content')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
