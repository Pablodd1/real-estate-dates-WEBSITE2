import React from 'react';
import { Shield, Scale, FileText, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Data moved inside component for translation hooks
export const LegalProtectionSection: React.FC = () => {
  const { t } = useTranslation();

  const protections = [
    {
      icon: Scale,
      title: t('legalProtection.rules.r1.title'),
      description: t('legalProtection.rules.r1.description'),
      rule: t('legalProtection.rules.r1.rule')
    },
    {
      icon: Shield,
      title: t('legalProtection.rules.r2.title'),
      description: t('legalProtection.rules.r2.description'),
      rule: t('legalProtection.rules.r2.rule')
    },
    {
      icon: FileText,
      title: t('legalProtection.rules.r3.title'),
      description: t('legalProtection.rules.r3.description'),
      rule: t('legalProtection.rules.r3.rule')
    },
    {
      icon: Lock,
      title: t('legalProtection.rules.r4.title'),
      description: t('legalProtection.rules.r4.description'),
      rule: t('legalProtection.rules.r4.rule')
    },
    {
      icon: CheckCircle,
      title: t('legalProtection.rules.r5.title'),
      description: t('legalProtection.rules.r5.description'),
      rule: t('legalProtection.rules.r5.rule')
    },
    {
      icon: AlertTriangle,
      title: t('legalProtection.rules.r6.title'),
      description: t('legalProtection.rules.r6.description'),
      rule: t('legalProtection.rules.r6.rule')
    }
  ];

  const cases = [
    {
      company: t('legalProtection.litigation.cases.c1.company'),
      amount: t('legalProtection.litigation.cases.c1.amount'),
      issue: t('legalProtection.litigation.cases.c1.issue'),
      year: t('legalProtection.litigation.cases.c1.year')
    },
    {
      company: t('legalProtection.litigation.cases.c2.company'),
      amount: t('legalProtection.litigation.cases.c2.amount'),
      issue: t('legalProtection.litigation.cases.c2.issue'),
      year: t('legalProtection.litigation.cases.c2.year')
    },
    {
      company: t('legalProtection.litigation.cases.c3.company'),
      amount: t('legalProtection.litigation.cases.c3.amount'),
      issue: t('legalProtection.litigation.cases.c3.issue'),
      year: t('legalProtection.litigation.cases.c3.year')
    },
    {
      company: t('legalProtection.litigation.cases.c4.company'),
      amount: t('legalProtection.litigation.cases.c4.amount'),
      issue: t('legalProtection.litigation.cases.c4.issue'),
      year: t('legalProtection.litigation.cases.c4.year')
    }
  ];

  return (
    <section id="legal" className="relative w-full py-6 sm:py-10">
      {/* Background gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            {t('legalProtection.sectionTitle')}
          </p>
          <h2 className="font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            {t('legalProtection.title')}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-[640px] mx-auto px-2">
            {t('legalProtection.subtitle')}
          </p>
        </div>

        {/* Protection Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {protections.map((item) => (
            <div
              key={item.rule}
              className="group liquid-glass  rounded-2xl p-6 sm:p-8 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gold/60 font-bold">
                  {item.rule}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Competitor Litigation Cases */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            {t('legalProtection.litigation.titlePrefix')} <span className="text-gold">{t('legalProtection.litigation.titleAmount')}</span> {t('legalProtection.litigation.titleSuffix')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((case_) => (
              <div
                key={case_.company}
                className="bg-red-950/20 border border-red-500/20 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white">{case_.company}</span>
                  <span className="text-xs text-red-400">{case_.year}</span>
                </div>
                <div className="text-2xl font-bold text-red-400 mb-2">{case_.amount}</div>
                <p className="text-xs text-white/75 leading-relaxed">{case_.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Framework */}
        <div className="liquid-glass  rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('legalProtection.framework.title')}
              </h3>
              <div className="space-y-4">
                {[
                  { label: t('legalProtection.framework.items.i1.label'), desc: t('legalProtection.framework.items.i1.desc') },
                  { label: t('legalProtection.framework.items.i2.label'), desc: t('legalProtection.framework.items.i2.desc') },
                  { label: t('legalProtection.framework.items.i3.label'), desc: t('legalProtection.framework.items.i3.desc') },
                  { label: t('legalProtection.framework.items.i4.label'), desc: t('legalProtection.framework.items.i4.desc') },
                  { label: t('legalProtection.framework.items.i5.label'), desc: t('legalProtection.framework.items.i5.desc') },
                  { label: t('legalProtection.framework.items.i6.label'), desc: t('legalProtection.framework.items.i6.desc') }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className="text-xs text-white/75">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
                <Shield className="w-10 h-10 text-gold mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  {t('legalProtection.framework.costTitle')}
                </h4>
                <p className="text-sm text-white/80 mb-4">
                  {t('legalProtection.framework.costDesc')}
                </p>
                <div className="text-xs text-gold/60 uppercase tracking-widest">
                  {t('legalProtection.framework.prevention')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-white/75 text-sm max-w-[480px] mx-auto">
            {t('legalProtection.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};