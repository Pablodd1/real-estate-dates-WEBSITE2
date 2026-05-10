import React from 'react';
import { Shield, Scale, FileText, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export const LegalProtectionSection: React.FC = () => {
  const protections = [
    {
      icon: Scale,
      title: "Pricing Neutrality",
      description: "We never use demographic-based pricing tiers. All users pay the same regardless of age, gender, or background.",
      rule: "RULE #1"
    },
    {
      icon: Shield,
      title: "Notification Integrity",
      description: "Every engagement notification is verified before sending. No fake 'someone liked you' messages.",
      rule: "RULE #2"
    },
    {
      icon: FileText,
      title: "Guarantee Transparency",
      description: "All success guarantees have clear, conspicuous conditions. No hidden terms or misleading promises.",
      rule: "RULE #3"
    },
    {
      icon: Lock,
      title: "Cancellation Simplicity",
      description: "Cancel in 2 clicks maximum. No surveys, no retention calls, no dark patterns.",
      rule: "RULE #4"
    },
    {
      icon: CheckCircle,
      title: "Gender Neutrality",
      description: "No gender-based feature restrictions. Equal platform access for all users.",
      rule: "RULE #5"
    },
    {
      icon: AlertTriangle,
      title: "Zero Tolerance Policy",
      description: "Immediate ban for discriminatory professionals. We report violations to licensing boards.",
      rule: "RULE #6"
    }
  ];

  const cases = [
    {
      company: "Tinder",
      amount: "$60.5M",
      issue: "Age discrimination in pricing (Candelore v. Tinder, Unruh Act)",
      year: "2018"
    },
    {
      company: "Match Group",
      amount: "$14M",
      issue: "FTC settlement for fake notifications and false guarantees",
      year: "2019"
    },
    {
      company: "Bumble",
      amount: "$40M+",
      issue: "BIPA biometric privacy + gender discrimination lawsuits",
      year: "2021-2024"
    },
    {
      company: "OkCupid/Match",
      amount: "Undisclosed",
      issue: "FTC privacy deception - sharing 3M users' data without consent",
      year: "2019"
    }
  ];

  return (
    <section id="legal" className="relative w-full py-20 sm:py-[120px] bg-dark overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gold font-medium mb-3">
            Legal Protection
          </p>
          <h2 className="font-script text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4">
            Built Different
          </h2>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-[640px] mx-auto px-2">
            We studied every major dating app lawsuit. Then we built a platform that avoids every single pitfall.
          </p>
        </div>

        {/* Protection Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {protections.map((item) => (
            <div
              key={item.rule}
              className="group bg-dark-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-gold/30 transition-all duration-300"
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
              <p className="text-sm text-white/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Competitor Litigation Cases */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            What We Learned From <span className="text-gold">$136.5M+</span> in Settlements
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
                <p className="text-xs text-white/40 leading-relaxed">{case_.issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Framework */}
        <div className="bg-dark-card border border-white/10 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Our Compliance Framework
              </h3>
              <div className="space-y-4">
                {[
                  { label: "COPPA Compliant", desc: "Minimum age 18+ with NO exceptions" },
                  { label: "CCPA Ready", desc: "Full data transparency and deletion rights" },
                  { label: "BIPA Safe", desc: "No biometric collection without explicit consent" },
                  { label: "FHA Compliant", desc: "Algorithm only uses property preferences, never demographics" },
                  { label: "FTC Clean", desc: "No fake notifications, no false guarantees, no deceptive marketing" },
                  { label: "SOC 2 Aligned", desc: "Enterprise-grade security and data handling" }
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className="text-xs text-white/40">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
                <Shield className="w-10 h-10 text-gold mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  $78K-$173K to Comply
                </h4>
                <p className="text-sm text-white/50 mb-4">
                  One-time setup cost for full legal protection vs. $40M-$60M per major settlement.
                </p>
                <div className="text-xs text-gold/60 uppercase tracking-widest">
                  Prevention {'>'} Cure
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/30 text-sm max-w-[480px] mx-auto">
            Real Estate Dates is built on the lessons from 6 major legal research documents analyzing competitor litigation, privacy frameworks, age verification laws, fair housing discrimination, FTC marketing rules, and implementation checklists.
          </p>
        </div>
      </div>
    </section>
  );
};