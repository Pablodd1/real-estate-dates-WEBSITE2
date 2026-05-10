import { useState, useCallback } from 'react';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { LogoFull } from './Logo';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';

const navLinks = [
  { label: 'Select Browse', href: '#discover' },
  { label: 'Build an Empire', href: '#how-it-works' },
  { label: 'Investment', href: '#features' },
  { label: 'Protection', href: '#legal' },
  { label: 'Information', href: '#download' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const scrollToSection = useCallback((href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[60px] sm:h-[72px] flex items-center bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection('#hero')} className="shrink-0">
            <LogoFull />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-white/60 hover:text-gold transition-colors duration-200 relative group uppercase tracking-wider"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop Auth CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-bold">
                    {profile?.role || 'Standard'}
                  </span>
                  <span className="text-xs text-white/60 lowercase">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-white/40 hover:text-gold transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-gold text-dark text-xs sm:text-sm font-bold rounded-full hover:bg-gold-light transition-colors duration-200 uppercase tracking-wider"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gold"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-dark/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
          {user && (
            <div className="flex flex-col items-center mb-4">
              <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-1">
                {profile?.role || 'Standard'}
              </span>
              <span className="text-xl text-white font-medium italic">
                {user.displayName || 'User'}
              </span>
            </div>
          )}
          
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-white/60 hover:text-gold transition-colors duration-200 uppercase tracking-wider"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              if (user) {
                logout();
              } else {
                setMobileOpen(false);
                setIsAuthModalOpen(true);
              }
            }}
            className="mt-4 px-8 py-3 bg-gold text-dark text-base sm:text-lg font-semibold rounded-full hover:bg-gold-light transition-all duration-200 uppercase tracking-widest"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            {user ? 'Logout Account' : 'Secure Login'}
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
