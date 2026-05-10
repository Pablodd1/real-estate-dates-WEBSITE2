import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { TagBadge } from '@/components/TagBadge';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    image: '/assets/blog-trends.jpg',
    category: 'Market Insights',
    title: '2026 Australian Property Market: What Buyers Need to Know',
    excerpt: 'Interest rates, supply shortages, and shifting demographics — we break down the forces shaping the market this year.',
  },
  {
    image: '/assets/blog-first-home.jpg',
    category: 'Buying Guide',
    title: 'The Complete First Home Buyer\'s Playbook for 2026',
    excerpt: 'From deposit savings to settlement day, everything you need to navigate your first purchase with confidence.',
  },
  {
    image: '/assets/blog-investment.jpg',
    category: 'Investment',
    title: 'Building Wealth Through Property: Strategies That Actually Work',
    excerpt: 'Negative gearing, positive cash flow, or renovation flips? We compare the strategies with real numbers.',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="blog" className="w-full py-[120px] bg-dark border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="blog-header flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-gold mb-3">
              Insights & Tips
            </p>
            <h2 className="text-4xl md:text-[42px] font-semibold text-white leading-tight tracking-tight">
              From the Blog
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-gold font-medium hover:underline cursor-pointer">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="blog-card group bg-dark-card rounded-xl overflow-hidden hover:border-gold/20 transition-all duration-300 border border-white/10 cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
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
                <p className="text-base text-white/60 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter mt-20 bg-dark-card rounded-xl p-8 md:p-12 text-center border border-white/10">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Get Market Insights Delivered
          </h3>
          <p className="text-white/60 mb-6 max-w-[480px] mx-auto">
            Weekly tips, market updates, and exclusive property alerts. No spam, just value.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[480px] mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-[320px] h-12 px-4 bg-dark border border-white/20 rounded-xl text-base text-white placeholder:text-white/40 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)] transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-12 px-8 bg-gold hover:bg-gold-light text-dark font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-glow shrink-0"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-white/40 mt-4">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
