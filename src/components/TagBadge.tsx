import { cn } from '@/lib/utils';

interface TagBadgeProps {
  children: React.ReactNode;
  variant?: 'featured' | 'new' | 'category' | 'success' | 'glass';
  className?: string;
}

export function TagBadge({ children, variant = 'category', className }: TagBadgeProps) {
  const variants = {
    featured: 'bg-gold text-dark',
    new: 'bg-gold-light text-dark',
    category: 'bg-dark-elevated text-white/70',
    success: 'bg-gold/20 text-gold',
    glass: 'bg-white/10 text-white',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
