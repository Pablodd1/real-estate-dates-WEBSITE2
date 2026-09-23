// Shared Telegram sender for serverless functions.
// Requires TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars.

async function sendTelegramFromMonitor(htmlLines) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, reason: 'TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set' };

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: htmlLines.join('\n').slice(0, 4000),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) return { ok: false, reason: data.description || `HTTP ${r.status}` };
  return { ok: true };
}

export { sendTelegramFromMonitor };
