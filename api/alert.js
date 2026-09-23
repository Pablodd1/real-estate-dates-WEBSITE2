// Telegram alert relay — receives error/incident reports from the site
// and forwards them to a Telegram chat.
//
// Required env vars (Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — your chat id (from @userinfobot)
//   ALERT_SECRET        — any random string; clients must send it as
//                         the 'x-alert-secret' header
//
// Rate limiting: in-memory dedupe — max 1 message per key per 10 minutes
// per lambda instance, so one broken page cannot spam the chat.

const sent = new Map();
const DEDUPE_MS = 10 * 60 * 1000;

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, reason: 'TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set' };
  }
  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text.slice(0, 4000), // Telegram hard limit
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) return { ok: false, reason: data.description || `HTTP ${r.status}` };
  return { ok: true };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-alert-secret');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (process.env.ALERT_SECRET && req.headers['x-alert-secret'] !== process.env.ALERT_SECRET) {
    return res.status(403).json({ error: 'bad secret' });
  }

  const { title, details, key } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title required' });
  }

  const dedupeKey = key || title;
  const now = Date.now();
  if (sent.has(dedupeKey) && now - sent.get(dedupeKey) < DEDUPE_MS) {
    return res.status(200).json({ ok: true, deduped: true });
  }

  const text = `🚨 <b>${escapeHtml(title)}</b>\n<pre>${escapeHtml(String(details || '').slice(0, 1500))}</pre>\n🌐 realestatedates.com · ${new Date().toISOString()}`;
  const result = await sendTelegram(text);

  if (result.ok) sent.set(dedupeKey, now);
  return res.status(result.ok ? 200 : 502).json(result);
};

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
