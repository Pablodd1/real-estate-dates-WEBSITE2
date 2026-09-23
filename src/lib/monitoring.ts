/**
 * Lightweight error monitoring — a homemade Sentry.
 *
 * Captures window errors and unhandled promise rejections, dedupes them
 * (max 1 report per key per 10 minutes), and forwards them to /api/alert
 * which relays to Telegram. Activates only when VITE_ALERT_SECRET is set
 * at build time — without it, nothing is sent.
 */

const ALERT_ENDPOINT = '/api/alert';
const DEDUPE_MS = 10 * 60 * 1000;
const seen = new Map<string, number>();

const SECRET = import.meta.env.VITE_ALERT_SECRET as string | undefined;

function report(title: string, details: string, key: string): void {
  if (!SECRET) return;
  const now = Date.now();
  const last = seen.get(key);
  if (last !== undefined && now - last < DEDUPE_MS) return;
  seen.set(key, now);

  fetch(ALERT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-alert-secret': SECRET },
    body: JSON.stringify({ title, details, key }),
    keepalive: true,
  }).catch(() => {
    /* never let monitoring break the site */
  });
}

function context(): string {
  return [
    `page: ${location.pathname}`,
    `ua: ${navigator.userAgent.slice(0, 160)}`,
  ].join('\n');
}

export function initMonitoring(): void {
  window.addEventListener('error', (e) => {
    const msg = e.message || 'unknown error';
    report(
      `JS error: ${msg.slice(0, 120)}`,
      `${msg}\n${e.filename}:${e.lineno}:${e.colno}\n${context()}`,
      `js:${msg}`
    );
  });

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason instanceof Error ? e.reason.message : String(e.reason);
    report(
      `Unhandled rejection: ${reason.slice(0, 120)}`,
      `${reason}\n${context()}`,
      `rej:${reason}`
    );
  });
}

/** Used by the React ErrorBoundary (components/ErrorBoundary.tsx). */
export function reportErrorBoundary(title: string, details: string): void {
  report(title, `${details}\n${context()}`, `eb:${title}`);
}
