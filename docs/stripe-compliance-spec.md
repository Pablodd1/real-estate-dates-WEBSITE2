# Stripe Compliance Specification — Web App (realestatedates.realty)

**Scope:** Engineering requirements for the web app (registration, checkout, moderation, consent storage) so Stripe's restricted-business review for online dating/matchmaking finds a clean, auditable business.
**Status of this repo (marketing website):** implemented — see "Website implementation" at the bottom.
**Golden rule:** Dating platform → strong moderation + clear consumer disclosures + documented consent + no adult commercial services + transparent Stripe checkout. Never disguise or rename the dating/matchmaking activity.

---

## 1. Business description (must match everywhere)

The service provides **online dating, matchmaking, profile discovery, communication, and membership features for real estate professionals**. Customers pay for:

| Purchase | Price | Billing |
|---|---|---|
| Premium membership | $9.99/mo | auto-renewing monthly |
| Elite membership | $14.99/mo | auto-renewing monthly |
| 100 Video Minutes | $5.99 | one-time, never expires, stacks |
| Happy Hour Pass | $4.99 | one-time per event |
| 5 Sticker Credits | $5.00 | one-time ($1 per send) |
| 3 Message Credits | $2.99 | one-time |

Stripe account description, checkout `statement_descriptor`, App Store listing, website, and ads must all describe this same model. Statement descriptor suggestion: `REAL ESTATE DATES`.

## 2. Registration flow (required)

1. DOB entry with real age math (≥18) — reject minors, store only a verified flag + timestamp.
2. Required checkbox: **"I am 18 years of age or older."**
3. Required checkbox: **"I agree to the Terms of Service and Privacy Policy."**
4. Links to Terms, Privacy, and Community Guidelines visible on the registration screen (not buried).
5. Underage reporting: any user can report a suspected minor from a profile → auto-opens a moderation ticket at highest priority → suspension + deletion workflow.

## 3. Consent ledger (database requirement)

Every consent event is stored, immutable, queryable:

```
consent_events
  id            uuid pk
  user_id       uuid fk
  type          enum('tos_v1','privacy_v1','guidelines_v1','recurring_billing','age_18')
  terms_version string          -- e.g. 'tos-2026-09-18'
  accepted_at   timestamptz
  ip_address    inet
  user_agent    text
  subscription_id / order_id    -- nullable, for billing consents
  evidence      jsonb           -- raw checkbox payload / checkout snapshot
```

Record at: registration (age + tos + privacy), and at every paid subscription (recurring-billing acknowledgement: amount, frequency, cancellation path). Retain for the life of the account + 5 years.

## 4. Checkout requirements (before payment is taken)

On the paywall/checkout screen, all of the following visible **without scrolling or clicking**:

- Exact price and currency.
- Billing frequency ("billed monthly").
- What the purchase includes (feature list).
- "Automatically renews until you cancel" for subscriptions; "one-time purchase, never renews" for add-ons.
- Cancellation path: "Cancel anytime in Settings → Subscription; takes effect immediately, access continues to the end of the paid period."
- Refund summary + link to full policy.
- Order summary line items (no pre-checked add-ons, no hidden trial-to-paid conversion).

Stripe specifics: use Stripe Checkout or Payment Element (never raw card data); set `statement_descriptor`; for subscriptions send `cancel_at_period_end` semantics on user cancellation; keep `subscription.metadata.user_id` for reconciliation.

## 5. Prohibited-use enforcement (app-side)

Surface in onboarding + Community Guidelines + report flows:

> No prostitution; no escort services; no paid or compensated dates; no solicitation of sexual services; no fetish/sexual-service marketplace; no pornography or sexually explicit content; no adult live-chat service; no trafficking or exploitation; no buying/selling access to another person; no user-to-user payment for dates, companionship, or sexual activity.

Moderation rules:
- Keyword/ML flagging for commercial-adult solicitation terms in profiles, bios, and messages (selling dates, escorting, payment for companionship, explicit solicitation, external payment requests tied to prohibited services).
- **Do not blanket-ban ordinary dating conversation** — target commercial activity only. Human review before permanent action; warning → suspension → ban ladder; full audit trail (who/what/when/evidence) on every action.
- One-tap report + block in every chat, profile, and Ballroom date; reports reviewed within 24h; escalation path to customer support.

## 6. Payments architecture

- **User → Company only** (memberships and features), via Stripe.
- **No user-to-user payments** for dates/companionship; no platform payouts to users for meeting users; no tips-for-companionship. (Stickers are sender→platform purchases that unlock a richer message — the recipient never receives money. Keep it that way; document it in the Stripe folder.)

## 7. Stripe review folder (assemble & keep current)

1. Business model summary (Section 1 table).
2. Pricing screenshots (website pricing section + in-app paywall).
3. Terms of Service, Privacy Policy, Community Guidelines, Refund & Cancellation policy.
4. Moderation process description (flagging, review SLA, ladder, audit trail).
5. 18+ process screenshots (registration + age gate).
6. Onboarding + checkout screenshots (consent checkboxes, disclosures).
7. Statement: the company does not facilitate escorts, prostitution, compensated dating, or sexual services; all payments are user→company for platform features.

## 8. Website implementation (this repo — DONE)

- Age gate: DOB + required 18+/ToS/Privacy/Guidelines consent checkbox (`src/components/AgeGate.tsx`).
- Legal section: policy 9 "Prohibited Commercial & Adult Services" + policy 10 "Payments, Subscriptions, Cancellation & Refunds" (en+es).
- Pricing: payments note (user→company only, Stripe) + full auto-renew/cancel/refund disclosure under tiers.
- Footer: "terms & privacy" links resolve to `#legal`.

## 9. Open items (not code — business)

- Counsel review of final Terms (state auto-renewal, dating-service, and consumer laws exceed Stripe's baseline).
- Confirm the legal entity name + support contact shown to users.
- Keep this spec and the Stripe folder in sync on every pricing change.
