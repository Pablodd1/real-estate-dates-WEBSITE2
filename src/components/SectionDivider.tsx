interface SectionDividerProps {
  variant?: 'gold' | 'heart' | 'gradient';
}

export default function SectionDivider({ variant = 'gradient' }: SectionDividerProps) {
  if (variant === 'gold') {
    return (
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    );
  }

  if (variant === 'heart') {
    return (
      <div className="w-full flex items-center justify-center py-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="mx-3 text-gold/60 text-sm">💕</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    );
  }

  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
  );
}
