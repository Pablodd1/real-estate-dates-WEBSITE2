import { useState } from 'react';

export default function AgeGate({ onVerified }: { onVerified: () => void }) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    
    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > new Date().getFullYear()) {
      setError('Please enter a valid date of birth.');
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError('You must be 18 or older to enter.');
      return;
    }

    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('ageVerifiedAt', new Date().toISOString());
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Age Verification Required</h2>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          Real Estate Dates is an adults-only platform. You must be 18 or older to enter.
          By continuing, you confirm you meet this requirement and agree to our{' '}
          <a href="/#/terms" className="text-gold underline">Terms of Service</a>.
        </p>

        <div className="mb-2">
          <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-3">DATE OF BIRTH</label>
          <div className="flex gap-2">
            <input
              type="number" placeholder="MM" min="1" max="12"
              value={month} onChange={e => { setMonth(e.target.value); setError(''); }}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-3 py-3 text-white text-center text-lg focus:border-gold focus:outline-none"
            />
            <input
              type="number" placeholder="DD" min="1" max="31"
              value={day} onChange={e => { setDay(e.target.value); setError(''); }}
              className="flex-1 bg-black border border-zinc-700 rounded-xl px-3 py-3 text-white text-center text-lg focus:border-gold focus:outline-none"
            />
            <input
              type="number" placeholder="YYYY" min="1900" max={new Date().getFullYear()}
              value={year} onChange={e => { setYear(e.target.value); setError(''); }}
              className="flex-[2] bg-black border border-zinc-700 rounded-xl px-3 py-3 text-white text-center text-lg focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <button onClick={handleVerify}
          className="w-full py-3 bg-gold hover:bg-gold-light text-dark font-bold rounded-xl transition-all duration-200 mb-3">
          I am 18+
        </button>

        <button onClick={() => window.location.href = 'https://google.com'}
          className="w-full py-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
          Exit
        </button>

        <p className="text-zinc-600 text-xs mt-6">
          We do not store your date of birth. Only a verification flag is saved locally.
        </p>
      </div>
    </div>
  );
}
