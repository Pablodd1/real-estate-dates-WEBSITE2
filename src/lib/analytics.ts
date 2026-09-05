/**
 * Consent-aware GA4 loader.
 *
 * Nothing loads unless BOTH are true:
 *  1. VITE_GA_MEASUREMENT_ID is set at build time (e.g. G-XXXXXXXXXX in Vercel env vars)
 *  2. the visitor accepted "Accept All" in the cookie banner (localStorage cookieConsent === 'all')
 *
 * Set the env var and redeploy — no code change needed.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = 'cookieConsent';

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'all';
  } catch {
    return false;
  }
}

function injectGtag(): void {
  if (!GA_ID || document.getElementById('ga-script') || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Called once on app mount: loads GA4 only if consent was already granted. */
export function initAnalytics(): void {
  if (GA_ID && hasConsent()) injectGtag();
}

/** Called when the visitor clicks "Accept All" in the cookie banner. */
export function loadAnalytics(): void {
  if (GA_ID) injectGtag();
}

/** Track a custom event (safe no-op before consent / without GA_ID). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (GA_ID && window.gtag) window.gtag('event', name, params);
}
