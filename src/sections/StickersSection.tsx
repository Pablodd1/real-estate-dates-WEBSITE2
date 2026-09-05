import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Send, BellRing, CreditCard, ShieldCheck, Check, Coins, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const STICKER_EMOJIS = ['🌹','💋','🤗','😄','😮','❤️','🥂','🧸','🔥','✨','🔑','🏡','🤝','👑'];

function StickerMedallion({ emoji, name, time, delay = 0 }: { emoji: string; name: string; time: string; delay?: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5" style={{ animationDelay: `${delay}s` }}>
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        {/* expanding burst rings */}
        <span className="sticker-burst absolute inset-0 rounded-full border-2 border-gold/60" />
        <span className="sticker-burst-delay absolute inset-0 rounded-full border border-gold/40" />
        {/* gold medallion */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center shadow-glow ring-2 ring-gold/80"
          style={{ background: 'radial-gradient(circle at 32% 26%, #FFE44D 0%, #FFD700 42%, #E6C200 100%)' }}
        >
          <span className="sticker-breathe text-4xl sm:text-5xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            {emoji}
          </span>
          {/* diagonal shine sweep */}
          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <span className="sticker-shine absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </span>
        </div>
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{name}</p>
      <p className="flex items-center gap-1 text-[9px] text-white/50">
        {time}
        <Check className="w-3 h-3 text-[#E0312D] fill-[#E0312D]" aria-hidden="true" />
      </p>
    </div>
  );
}

export default function StickersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const names = t('stickers.tray.names', { returnObjects: true }) as string[];

  const steps = [
    { icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />, title: t('stickers.howItWorks.steps.step1.title'), desc: t('stickers.howItWorks.steps.step1.desc') },
    { icon: <Send className="w-5 h-5" strokeWidth={1.5} />, title: t('stickers.howItWorks.steps.step2.title'), desc: t('stickers.howItWorks.steps.step2.desc') },
    { icon: <BellRing className="w-5 h-5" strokeWidth={1.5} />, title: t('stickers.howItWorks.steps.step3.title'), desc: t('stickers.howItWorks.steps.step3.desc') },
    { icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />, title: t('stickers.howItWorks.steps.step4.title'), desc: t('stickers.howItWorks.steps.step4.desc') },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.sticker-chat-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.sticker-chat-card', start: 'top 85%', toggleActions: 'play none none none' },
    });

    gsap.from('.sticker-step', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.sticker-steps', start: 'top 80%', toggleActions: 'play none none none' },
    });

    gsap.from('.sticker-tile', {
      y: 24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.sticker-tray', start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="stickers" className="relative w-full py-6 sm:py-10 overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: '#D4AF37', filter: 'blur(140px)', top: '30%', right: '-15%' }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          eyebrow={t('stickers.sectionTitle')}
          headline={t('stickers.title')}
          subheadline={t('stickers.subtitle')}
          theme="dark"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-[1050px] mx-auto">
          {/* Chat mockup */}
          <div className="sticker-chat-card liquid-glass rounded-3xl border border-gold/15 p-5 sm:p-6 shadow-card">
            {/* chat header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">S</div>
                <div>
                  <p className="text-sm font-medium text-white leading-tight">Sophia</p>
                  <p className="text-[10px] text-white/50">{t('stickers.chat.header')}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[10px] font-semibold">
                <Coins className="w-3 h-3" />
                {t('stickers.chat.credits')}
              </span>
            </div>

            {/* thread */}
            <div className="space-y-5">
              {/* incoming text */}
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-[9px] font-bold shrink-0">S</div>
                <div className="max-w-[70%] bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <p className="text-sm text-white/85">{t('stickers.chat.incoming')}</p>
                </div>
              </div>

              {/* outgoing sticker */}
              <div className="flex flex-col items-end">
                <StickerMedallion emoji="🌹" name={names[0] ?? 'Flowers'} time="5:24 PM" />
              </div>

              {/* incoming sticker */}
              <div className="flex flex-col items-start">
                <StickerMedallion emoji="🔑" name={names[10] ?? 'Golden Key'} time="5:25 PM" delay={0.8} />
              </div>

              {/* outgoing text */}
              <div className="flex items-end justify-end gap-2">
                <div className="max-w-[70%] bg-gold/15 border border-gold/20 rounded-2xl rounded-br-sm px-4 py-2.5">
                  <p className="text-sm text-white/90">{t('stickers.chat.outgoing')}</p>
                  <p className="flex items-center justify-end gap-1 text-[9px] text-white/45 mt-1">
                    5:26 PM
                    <Check className="w-3 h-3 text-[#E0312D] fill-[#E0312D]" aria-hidden="true" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="sticker-steps">
            <h3 className="font-script text-gold text-2xl sm:text-3xl italic mb-6">
              {t('stickers.howItWorks.title')}
            </h3>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={i} className="sticker-step flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white mb-1">{step.title}</p>
                    <p className="text-sm text-white/75 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The collection tray */}
        <div className="sticker-tray max-w-[1050px] mx-auto mt-14 sm:mt-16">
          <h3 className="flex items-center justify-center gap-2 font-script text-gold text-2xl sm:text-3xl italic mb-8">
            <Sparkles className="w-5 h-5 text-gold/70" />
            {t('stickers.tray.title')}
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 sm:gap-4">
            {STICKER_EMOJIS.map((emoji, i) => (
              <div
                key={i}
                className="sticker-tile group relative rounded-2xl border border-gold/20 p-3 sm:p-4 flex flex-col items-center gap-1.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-glow"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,215,0,0.14) 0%, rgba(255,215,0,0.04) 70%)' }}
              >
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-gold text-dark text-[9px] font-bold leading-none">
                  $1
                </span>
                <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
                  {emoji}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/70 text-center leading-tight">
                  {names[i] ?? ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Romance + security */}
        <div className="max-w-[900px] mx-auto mt-14 sm:mt-16 text-center">
          <h3 className="font-script text-gold text-2xl sm:text-3xl italic mb-4">
            {t('stickers.romance.title')}
          </h3>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[640px] mx-auto mb-6 text-balance">
            {t('stickers.romance.desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {((t('stickers.romance.highlights', { returnObjects: true }) as string[]) ?? []).map((h, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full border border-gold/25 bg-gold/[0.07] text-gold/90 text-sm"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="px-5 py-2 rounded-full bg-gold/10 border border-gold/25 text-gold text-sm font-semibold">
              {t('stickers.priceLine')}
            </span>
            <span className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
              <ShieldCheck className="w-4 h-4 text-gold/70 shrink-0" />
              {t('stickers.secure')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
