import { useParams, Link } from 'react-router';
import { getPostBySlug } from '@/data/blogPosts';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { useEffect } from 'react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-script text-gold mb-4">Post Not Found</h1>
        <p className="text-white/70 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold/90 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  // A very simple markdown-to-html converter just for the basic structure in the content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-script text-gold italic mt-12 mb-6">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**: ');
        if (parts.length > 1) {
          return <li key={index} className="ml-6 mb-3 text-white/80 leading-relaxed"><strong className="text-white">{parts[0]}:</strong> {parts.slice(1).join('**: ')}</li>;
        }
      }
      if (line.startsWith('1. **') || line.startsWith('2. **') || line.startsWith('3. **') || line.startsWith('4. **')) {
        const parts = line.split('**');
        if (parts.length > 2) {
          return <p key={index} className="ml-6 mb-4 text-white/80 leading-relaxed"><strong className="text-white">{parts[1]}</strong>{parts[2]}</p>;
        }
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-white mb-4 text-lg">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim().length > 0) {
        // Handle bolding within text
        const boldSplit = line.split('**');
        if (boldSplit.length > 1) {
           return (
             <p key={index} className="text-white/80 leading-relaxed mb-6 text-lg">
                {boldSplit.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
             </p>
           )
        }
        return <p key={index} className="text-white/80 leading-relaxed mb-6 text-lg">{line}</p>;
      }
      return null;
    });
  };

  return (
    <article className="relative z-10 pt-32 pb-20 px-6 max-w-[900px] mx-auto min-h-screen">
      
      <Link to="/#blog" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-10 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold uppercase tracking-wider">Back to Blog</span>
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-semibold uppercase tracking-widest text-gold/80">
          <span className="px-3 py-1 bg-gold/10 rounded-full border border-gold/20 text-gold">{post.category}</span>
          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
          <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-script text-white leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-xl text-white/60 leading-relaxed mb-8 border-l-2 border-gold/50 pl-6">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
          <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gold" />
          </div>
          <div>
            <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Written By</div>
            <div className="text-white font-medium">{post.author}</div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-16 relative group">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700" 
        />
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        {renderContent(post.content)}
      </div>
      
      {/* Footer CTA */}
      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to upgrade your network?</h3>
        <p className="text-white/70 mb-8 max-w-[500px] mx-auto">Join thousands of real estate professionals already closing deals and finding matches on our platform.</p>
        <a href="https://realestatedates.realty" className="inline-flex items-center justify-center px-8 py-3 bg-gold text-dark font-bold rounded-lg hover:bg-gold/90 transition-colors shadow-glow">
          Join the Network
        </a>
      </div>
    </article>
  );
}
