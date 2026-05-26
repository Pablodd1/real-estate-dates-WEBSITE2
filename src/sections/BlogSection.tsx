import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { TagBadge } from '@/components/TagBadge';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

// Data moved inside component for translation hooks

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const blogPosts = [
    {
      image: '/images/key.png',
      category: t('blog.posts.p1.category'),
      title: t('blog.posts.p1.title'),
      excerpt: t('blog.posts.p1.excerpt'),
    },
    {
      image: '/images/coffee.png',
      category: t('blog.posts.p2.category'),
      title: t('blog.posts.p2.title'),
      excerpt: t('blog.posts.p2.excerpt'),
    },
    {
      image: '/images/app.png',
      category: t('blog.posts.p3.category'),
      title: t('blog.posts.p3.title'),
      excerpt: t('blog.posts.p3.excerpt'),
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const header = sectionRef.current.querySelectorAll('.blog-header');
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

    const cards = sectionRef.current.querySelectorAll('.blog-card');
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.blog-grid'),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const newsletter = sectionRef.current.querySelector('.newsletter');
    gsap.from(newsletter, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: newsletter,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="blog" className="relative w-full py-6 sm:py-10 border-t ">
      {/* Couple background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(/images/app.png)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark via-dark/95 to-dark" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="blog-header flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-gold mb-3">
              {t('blog.sectionTitle')}
            </p>
            <h2 className="text-4xl md:text-[42px] font-semibold text-white leading-tight tracking-tight">
              {t('blog.title')}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-gold font-medium hover:underline cursor-pointer">
            {t('blog.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="blog-card group liquid-glass rounded-xl hover:border-gold/20 transition-all duration-300  cursor-pointer"
            >
              <div className="aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
              <div className="p-6">
                <TagBadge variant="category" className="mb-3">{post.category}</TagBadge>
                <h4 className="text-xl font-medium text-white mb-3 leading-snug group-hover:text-gold transition-colors duration-200">
                  {post.title}
                </h4>
                <p className="text-base text-white/85 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter mt-12 liquid-glass rounded-xl p-8 md:p-12 text-center ">
          <h3 className="text-2xl font-semibold text-white mb-3">
            {t('blog.newsletter.title')}
          </h3>
          <p className="text-white/85 mb-6 max-w-[480px] mx-auto">
            {t('blog.newsletter.subtitle')}
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[480px] mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="w-full sm:w-[320px] h-12 px-4 bg-transparent  rounded-xl text-base text-white placeholder:text-white/75 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)] transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-12 px-8 bg-gold hover:bg-gold-light text-dark font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-glow shrink-0"
            >
              {t('blog.newsletter.button')}
            </button>
          </form>
          <p className="text-xs text-white/75 mt-4">
            {t('blog.newsletter.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}
