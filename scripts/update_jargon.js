const fs = require('fs');
const path = require('path');

const enPath = path.join('src', 'locales', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

en.howItWorks = {
  journey: 'The Escrow of Love',
  title: 'From Open House, to Key Turned, to Marriage (or Friends Forever)',
  subtitle: 'Skip the generic apps. Experience a streamlined pipeline to finding your ultimate co-investor in life and business.',
  step1: {
    title: 'List Your Professional Profile',
    desc: 'Put your best asset on the market. Showcase your real estate niche—whether you are closing commercial deals, flipping residential, or syndicating multifamily. Set your "cap rate" for what you are looking for in a partner, and let your profile be your premier digital handshake.'
  },
  step2: {
    title: 'Tour Verified Prospects',
    desc: 'Navigate a curated, secure MLS of active industry players. We filter out the window-shoppers with rigorous ID checks. Browse profiles, assess the ROI of potential connections, and see who meets your strict underwriting criteria for lifestyle and ambition.'
  },
  step3: {
    title: 'Turn the Key (Match) & Unlock Bios',
    desc: 'Forget generic swiping—here, you "Turn Key" to show interest. If you are unsure, hold them in "Pending", or "Reject" to pass on the listing. When both parties Turn Key, it is a Mutual Match! This instantly unlocks deep-dive biographies so you can run your due diligence before chatting.'
  },
  step4: {
    title: 'Enter the Option Period (Chat & Video)',
    desc: 'Move seamlessly from a Mutual Match into active negotiations. Start with direct text chat or leverage built-in Video Chat to check the structural integrity of your chemistry. Plus, join our exclusive Online Happy Hour Speed Dating to meet multiple prospects face-to-face in rapid 3-minute virtual showings.'
  },
  step5: {
    title: 'In-Person Walkthroughs (Real Dates)',
    desc: 'Take the connection from digital to physical. Skip the awkward setups and meet where you thrive—coordinate twilight walkthrough dates at active listings, grab espresso near a new development, or meet at an industry gala to see if the foundation is solid.'
  },
  step6: {
    title: 'Close the Deal (Go Exclusive)',
    desc: 'When you have found the ultimate co-founder for your personal life, take yourselves off the market. Going exclusive hides both your profiles from the registry and unlocks couples-only features: share collaborative property wishlists, integrate your showing schedules, and build your empire together.'
  }
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log('en.json updated successfully');
