interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subheadline?: string;
  theme?: 'light' | 'dark';
  centered?: boolean;
}

export default function SectionHeader({ eyebrow, headline, subheadline, theme = 'light', centered = true }: SectionHeaderProps) {
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-text-primary';
  const textSecondary = theme === 'dark' ? 'text-white/70' : 'text-text-secondary';
  const eyebrowColor = theme === 'dark' ? 'text-sage-light' : 'text-sage';
  const dividerColor = theme === 'dark' ? 'bg-sage' : 'bg-sage';

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-16`}>
      <p className={`text-xs font-medium uppercase tracking-[0.1em] ${eyebrowColor} mb-3`}>
        {eyebrow}
      </p>
      <div className={`w-10 h-0.5 ${dividerColor} mb-6 ${centered ? 'mx-auto' : ''}`} />
      <h2 className={`text-4xl md:text-5xl font-semibold ${textPrimary} leading-tight tracking-tight mb-4`}>
        {headline}
      </h2>
      {subheadline && (
        <p className={`text-lg ${textSecondary} max-w-[560px] ${centered ? 'mx-auto' : ''} leading-relaxed`}>
          {subheadline}
        </p>
      )}
    </div>
  );
}
