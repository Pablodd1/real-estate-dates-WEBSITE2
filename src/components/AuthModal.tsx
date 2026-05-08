import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginWithEmail, signUpWithEmail, resetPassword, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isReset) {
        await resetPassword(email);
        toast.success('Password reset email sent! Please check your inbox.');
        setIsReset(false);
      } else if (isLogin) {
        await loginWithEmail(email, password);
        toast.success('Successfully logged in!');
        onClose();
      } else {
        await signUpWithEmail(email, password, displayName);
        toast.success('Account created successfully!');
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('Successfully logged in with Google!');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-dark-elevated border-gold/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-gold font-script text-3xl">
            {isReset ? 'Reset Password' : isLogin ? 'Secure Login' : 'Create Empire'}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {isReset 
              ? 'Enter your email to receive a password reset link.' 
              : isLogin 
                ? 'Enter your credentials to access the market protocol.' 
                : 'Join the elite real estate network.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isLogin && !isReset && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gold uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-colors"
              placeholder="investor@example.com"
            />
          </div>

          {!isReset && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold text-dark font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : isReset ? 'Send Link' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4 text-center text-sm">
          {!isReset && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-elevated px-2 text-white/40">Or continue with</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full bg-white text-dark font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </>
          )}

          <div className="flex flex-col gap-2 mt-2">
            {!isReset && (
              <button 
                onClick={() => setIsReset(true)}
                className="text-white/40 hover:text-gold transition-colors text-xs"
              >
                Forgot your password?
              </button>
            )}
            <button 
              onClick={() => {
                setIsReset(false);
                setIsLogin(!isLogin);
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isReset 
                ? 'Back to login' 
                : isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
