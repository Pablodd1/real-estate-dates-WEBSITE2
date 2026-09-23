// Daily monitor — runs on a Vercel cron (see vercel.json).
// What it does (a homemade UptimeRobot + Sentry digest, reported to Telegram):
//   1. Checks the website and web app respond 200
//   2. Checks /api/health (serverless + DB layer)
//   3. Optionally pulls the newest unresolved issues from Sentry
//      (set SENTRY_API_TOKEN + SENTRY_ORG + SENTRY_PROJECT)
//   4. Sends one Telegram digest (or an immediate alert if a check fails)
//
// Called as GET /api/monitor — the shared ALERT_SECRET can be required for
// manual runs via ?secret=... but Vercel cron calls are exempt by user-agent.

const { sendTelegramFromMonitor } = require('./_telegram.cjs');

const CHECKS = [
  { name: 'Website', url: 'https://realestatedates.com/' },
  { name: 'Web app', url: 'https://realestatedates.realty' },
  { name: 'API health', url: 'https://realestatedates.com/api/health' },
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const isVercelCron = (req.headers['user-agent'] || '').includes('vercel');
  if (!isVercelCron && process.env.ALERT_SECRET && req.query.secret !== process.env.ALERT_SECRET) {
    return res.status(403).json({ error: 'bad secret' });
  }

  // 1-2. uptime checks
  const results = await Promise.all(
    CHECKS.map(async (c) => {
      const started = Date.now();
      try {
        const r = await fetch(c.url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
        return { ...c, ok: r.ok, status: r.status, ms: Date.now() - started };
      } catch (e) {
        return { ...c, ok: false, status: 0, ms: Date.now() - started, error: e.message };
      }
    })
  );

  // 3. Sentry digest (optional)
  let sentryLines = [];
  if (process.env.SENTRY_API_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT) {
    try {
      const r = await fetch(
        `https://sentry.io/api/0/organizations/${process.env.SENTRY_ORG}/issues/?query=is:unresolved&statsPeriod=24h&perPage=5`,
        { headers: { Authorization: `Bearer ${process.env.SENTRY_API_TOKEN}` } }
      );
      if (r.ok) {
        const issues = await r.json();
        sentryLines = issues.map(
          (i) => `  • ${i.title} — ${i.count} events (last: ${new Date(i.lastSeen).toISOString().slice(11, 16)} UTC)`
        );
      }
    } catch (e) {
      sentryLines = [`  (Sentry query failed: ${e.message})`];
    }
  }

  // 4. report
  const down = results.filter((r) => !r.ok);
  const icon = down.length ? '🚨' : '✅';
  const lines = [
    `${icon} <b>Daily monitor — Real Estate Dates</b>`,
    ...results.map((r) =>
      `  ${r.ok ? '🟢' : '🔴'} ${r.name}: ${r.status || 'DOWN'} in ${r.ms}ms${r.error ? ` (${r.error})` : ''}`
    ),
  ];
  if (sentryLines.length) {
    lines.push('', `<b>Sentry (last 24h, top 5):</b>`, ...(sentryLines.length ? sentryLines : ['  (no unresolved issues 🎉)']));
  }
  if (down.length === 0 && sentryLines.length === 0) {
    lines.push('', 'All systems operational.');
  }

  const telegram = await sendTelegramFromMonitor(lines.join('\n'));
  res.status(200).json({ results, sentry: sentryLines, telegramSent: telegram });
};
