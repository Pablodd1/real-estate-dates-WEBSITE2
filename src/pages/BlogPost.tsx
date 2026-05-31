import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { getPostBySlug } from '@/data/blogPosts';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

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

  // A robust markdown-to-html converter supporting tables, lists, inline formatting, code blocks, and links
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    const parseInlineStyles = (text: string): React.ReactNode[] => {
      const boldSplit = text.split('**');
      
      return boldSplit.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="text-white font-semibold">{part}</strong>;
        } else {
          // Parse links within the non-bold part: [text](url)
          const subParts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          const localLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          
          while ((match = localLinkRegex.exec(part)) !== null) {
            if (match.index > lastIndex) {
              subParts.push(part.substring(lastIndex, match.index));
            }
            const linkText = match[1];
            const linkUrl = match[2];
            subParts.push(
              <a 
                key={match.index} 
                href={linkUrl} 
                className="text-gold hover:text-gold-light underline transition-colors font-medium"
                target={linkUrl.startsWith('http') ? '_blank' : undefined}
                rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {linkText}
              </a>
            );
            lastIndex = localLinkRegex.lastIndex;
          }
          if (lastIndex < part.length) {
            subParts.push(part.substring(lastIndex));
          }
          return <span key={index}>{subParts}</span>;
        }
      });
    };

    while (i < lines.length) {
      const line = lines[i];

      // 1. Horizontal Separator
      if (line.trim() === '---') {
        elements.push(<hr key={i} className="border-white/10 my-8 sm:my-12" />);
        i++;
        continue;
      }

      // 2. Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl font-script text-gold italic mt-12 mb-6 leading-tight">
            {line.replace('## ', '')}
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 leading-snug">
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // 3. Code Blocks
      if (line.trim().startsWith('```')) {
        const codeLines: string[] = [];
        i++; // skip opening ```
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-5 overflow-x-auto text-sm text-gold/90 font-mono my-6 leading-relaxed shadow-inner">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        i++; // skip closing ```
        continue;
      }

      // 4. Tables
      if (line.trim().startsWith('|')) {
        const tableRows: string[][] = [];
        
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          const rawRow = lines[i].trim();
          // Skip divider lines e.g. | :--- | :---: |
          if (rawRow.includes('---')) {
            i++;
            continue;
          }
          const cells = rawRow
            .split('|')
            .map(c => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1); // remove outer empty strings
          
          tableRows.push(cells);
          i++;
        }

        if (tableRows.length > 0) {
          const headers = tableRows[0];
          const bodyRows = tableRows.slice(1);
          elements.push(
            <div key={i} className="w-full overflow-x-auto my-8 rounded-xl border border-white/10 shadow-lg">
              <table className="w-full border-collapse text-left text-sm text-white/80">
                <thead className="bg-white/[0.04] text-white border-b border-white/10 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    {headers.map((h, idx) => (
                      <th key={idx} className="px-6 py-4 border-r border-white/5 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {bodyRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-white/[0.01] transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 border-r border-white/5 last:border-r-0 font-medium">
                          {parseInlineStyles(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // 5. Bullet Lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('- '))) {
          const cleanItem = lines[i].trim().substring(2);
          listItems.push(cleanItem);
          i++;
        }
        elements.push(
          <ul key={i} className="list-disc ml-6 mb-6 space-y-2.5 text-lg text-white/80">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // 6. Ordered Lists
      if (/^\d+\.\s/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          const cleanItem = lines[i].trim().replace(/^\d+\.\s/, '');
          listItems.push(cleanItem);
          i++;
        }
        elements.push(
          <ol key={i} className="list-decimal ml-6 mb-6 space-y-2.5 text-lg text-white/80">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // 7. Paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p key={i} className="text-white/85 leading-relaxed mb-6 text-lg">
            {parseInlineStyles(line)}
          </p>
        );
      }
      i++;
    }

    return elements;
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
