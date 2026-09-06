import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, Crown, Package, Check, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface MinutePlan {
  name: string;
  value: string;
  note: string;
}

export default function VideoMinutesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const plans = t('videoMinutes.plans', { returnObjects: true }) as MinutePlan[];
  const rules = t('videoMinutes.rules', { returnObjects: true }) as string[];

  const planIcons = [
    <Crown className="w-5 h-5" strokeWidth={1.5} />,
    <Package className="w-5 h-5" strokeWidth={1.5} />,
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.vm-plan', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.vm-rule', {
      x: -24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.vm-rules',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="video-minutes" className="relative w-full py-6 sm:py-10">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[420px] h-[420px] rounded-full opacity-[0.03]"
          style={{ background: '#D4AF37', filter: 'blur(130px)', top: '15%', left: '-10%' }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          eyebrow={t('videoMinutes.sectionTitle')}
          headline={t('videoMinutes.title')}
          subheadline={t('videoMinutes.subtitle')}
          theme="dark"
        />

        {/* Plans */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-14">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="vm-plan relative p-6 sm:p-8 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.06] via-white/[0.02] to-transparent hover:border-gold/35 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  {planIcons[i % planIcons.length]}
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold/80 font-semibold">
                  {plan.name}
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-semibold text-white mb-2">{plan.value}</p>
              <p className="text-sm text-white/70 leading-relaxed">{plan.note}</p>
            </div>
          ))}
        </div>

        {/* Rules + privacy */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div className="vm-rules">
            <h3 className="font-script text-gold text-2xl sm:text-3xl italic mb-6">
              {t('videoMinutes.rulesTitle')}
            </h3>
            <ul className="space-y-4">
              {rules.map((rule, i) => (
                <li key={i} className="vm-rule flex items-start gap-3">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-1" strokeWidth={2.5} />
                  <span className="text-sm sm:text-base text-white/80 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">
              <Lock className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-white/80 leading-relaxed">{t('videoMinutes.privacy')}</p>
            <a
              href="#pricing"
              className="mt-6 inline-flex items-center gap-2 text-gold text-sm font-semibold hover:text-gold-light transition-colors"
            >
              <Video className="w-4 h-4" />
              {t('videoMinutes.sectionTitle')} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
