# Monitoring with Telegram alerts — setup guide

A homemade Sentry + UptimeRobot: the site captures its own errors, a daily
cron checks that everything is alive, and both report straight to your
Telegram chat. **$0, no third-party accounts required.**

## What's built

| Piece | File | What it does |
|---|---|---|
| Error capture | `src/lib/monitoring.ts` | window errors + unhandled rejections → deduped (10 min) → `/api/alert` |
| Crash screen | `src/components/ErrorBoundary.tsx` | React render crashes show a graceful Reload screen + report |
| Alert relay | `api/alert.js` | validates secret, dedupes, forwards to Telegram |
| Daily monitor | `api/monitor.js` | 9:00 AM Miami daily: website + web app + /api/health checks (+ optional Sentry top-5) → one Telegram digest |
| Cron | `vercel.json` | `0 13 * * *` UTC = 9 AM EDT / 8 AM EST |

## Activate it (10 minutes)

### 1. Create the Telegram bot
1. In Telegram, message **@BotFather** → `/newbot` → follow prompts
2. Copy the **API token** (`123456:ABC-...`)

### 2. Get your chat ID
1. Message **@userinfobot** → it replies with your numeric **Id**
2. (Optional, recommended) Send any message to your new bot first so it can message you

### 3. Set the env vars (Vercel → this project → Settings → Environment Variables)
| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | the BotFather token |
| `TELEGRAM_CHAT_ID` | your numeric id |
| `ALERT_SECRET` | any long random string (e.g. from https://1password.com/password-generator) |
| `VITE_ALERT_SECRET` | **same value** as `ALERT_SECRET` (the frontend sends it; must be identical) |

Optional (Sentry digest in the daily report):
| `SENTRY_API_TOKEN` | read-only token from sentry.io → Settings → Auth Tokens |
| `SENTRY_ORG` / `SENTRY_PROJECT` | your org/project slugs |

### 4. Redeploy, then test both paths
```bash
# alert relay (should arrive in Telegram within seconds):
curl -X POST https://realestatedates.com/api/alert \
  -H "Content-Type: application/json" \
  -H "x-alert-secret: YOUR_SECRET" \
  -d '{"title":"Test alert","details":"If you can read this, alerts work."}'

# daily monitor (manual trigger — same digest the cron sends at 9 AM Miami):
curl "https://realestatedates.com/api/monitor?secret=YOUR_SECRET"
```

## Notes
- Until the env vars are set, everything silently no-ops — the site sends nothing.
- Dedupe: one Telegram message per distinct error per 10 minutes (frontend and backend each enforce this).
- `VITE_ALERT_SECRET` ships in the JS bundle, so a determined user could send fake alerts. It's spam-protection, not security — fine for v1; add a Vercel Edge rule limiting `/api/alert` POSTs if it's ever abused.
- To also monitor the **web app** (realestatedates.realty): copy `src/lib/monitoring.ts` + `ErrorBoundary.tsx` into it and point `ALERT_ENDPOINT` at `https://realestatedates.com/api/alert` — one bot, both apps reporting.
