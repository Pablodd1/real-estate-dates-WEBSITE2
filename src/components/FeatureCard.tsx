import { TagBadge } from './TagBadge';

interface FeatureCardProps {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  description: string;
  tags?: string[];
  variant?: 'default' | 'glass';
}

export default function FeatureCard({ icon, iconColor = 'text-sage', title, description, tags, variant = 'default' }: FeatureCardProps) {
  if (variant === 'glass') {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:-translate-y-1 transition-all duration-300">
        <div className={`w-12 h-12 ${iconColor} mb-5`}>{icon}</div>
        <h4 className="text-xl font-medium text-white mb-3">{title}</h4>
        <p className="text-white/70 leading-relaxed mb-4">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag} variant="glass">{tag}</TagBadge>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-warm-white border border-beige-dark rounded-xl p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className={`w-12 h-12 ${iconColor} mb-5`}>{icon}</div>
      <h4 className="text-xl font-medium text-text-primary mb-3">{title}</h4>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
