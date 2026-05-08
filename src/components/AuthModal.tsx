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
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up as requested
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
        toast.success('Protocol Initiated: Check your email for reset instructions.');
        setIsReset(false);
      } else if (isLogin) {
        await loginWithEmail(email, password);
        toast.success('Access Granted: Welcome back to the Empire.');
        onClose();
      } else {
        if (!displayName) {
          toast.error('Identity required: Please provide your full name.');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, displayName);
        toast.success('Account Created: Your real estate journey begins.');
        onClose();
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      // More descriptive error messages for the user
      let message = error.message;
      if (error.code === 'auth/email-already-in-use') message = 'This email is already registered in the database.';
      if (error.code === 'auth/wrong-password') message = 'Incorrect credentials. Authentication failed.';
      if (error.code === 'auth/user-not-found') message = 'No record found for this email.';
      if (error.code === 'auth/weak-password') message = 'Password too weak. Protect your empire with a stronger key.';
      
      toast.error(message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('Sync Successful: Access granted via Google.');
      onClose();
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      let message = 'Google synchronization failed.';
      if (error.code === 'auth/popup-blocked') message = 'Protocol Blocked: Please allow popups for this site.';
      if (error.code === 'auth/unauthorized-domain') message = 'Security Error: This domain is not authorized in Firebase.';
      
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] bg-dark-elevated border-gold/30 text-white p-0 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-b from-gold/10 to-transparent p-8 pt-10">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-gold font-script text-4xl text-center">
              {isReset ? 'Recover Access' : isLogin ? 'Secure Entry' : 'Protocol Join'}
            </DialogTitle>
            <DialogDescription className="text-white/50 text-center mt-2 uppercase tracking-[0.2em] text-[10px] font-bold">
              {isReset 
                ? 'Identity Verification' 
                : isLogin 
                  ? 'Market Access Protocol' 
                  : 'Empire Registration'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && !isReset && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gold uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full bg-dark-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all placeholder:text-white/20"
                  placeholder="Enter your name"
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gold uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dark-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all placeholder:text-white/20"
                placeholder="investor@realestate.com"
              />
            </div>

            {!isReset && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gold uppercase tracking-widest ml-1">Secure Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-dark-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all placeholder:text-white/20"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gold text-dark font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/10 disabled:opacity-50 text-xs mt-2"
            >
              {loading ? 'Processing...' : isReset ? 'Send Link' : isLogin ? 'Access Market' : 'Create Profile'}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
            {!isReset && (
              <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" className="opacity-70"/>
                </svg>
                Sign in with Google
              </button>
            )}

            <div className="flex flex-col items-center gap-3 mt-2">
              {!isReset && isLogin && (
                <button 
                  onClick={() => setIsReset(true)}
                  className="text-white/30 hover:text-gold transition-colors text-[10px] uppercase tracking-widest font-bold"
                >
                  Lost your key?
                </button>
              )}
              <button 
                onClick={() => {
                  setIsReset(false);
                  setIsLogin(!isLogin);
                }}
                className="text-white/50 hover:text-white transition-colors text-xs font-medium"
              >
                {isReset 
                  ? 'Back to Access Protocol' 
                  : isLogin 
                    ? "New to the Market? Create Profile" 
                    : 'Already an Investor? Access Market'}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

