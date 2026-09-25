# Leads Form — Field Schema & Wiring

Goal: collect every inquiry (who, how to reach them, what they want) in a Google Sheet the shop can check, with an email alert per lead. No paid services.

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | required | |
| Contact number | text (tel) | required | Primary channel most local customers will expect a reply on |
| Email address | text (email) | optional | |
| Service interested in | select | required | Label → value: Apparel & Sublimation Printing → `apparel-sublimation` · UV Printing on Custom Products → `uv-printing` · Signage / Stickers / Vehicle Graphics → `signage` · Business & Presentation Materials → `business` · Not sure / other → `other`. Pre-select from a `?service=` query param. |
| Quantity / details | textarea | required | Free text — what they need, rough quantity, timeline |
| Preferred contact method | radio/select | optional | Values: `call` · `sms` · `messenger` · `email` |
| How did you hear about us | select | optional | Values: `facebook` · `referral` · `local` · `other` |
| Consent | checkbox | required | "I agree to be contacted by Printabilya about this inquiry." |
| Honeypot | hidden text `website` | — | Off-screen field that real visitors never fill. Bots do |
| Turnstile | widget | required | Cloudflare's invisible bot check. Place it just above the submit button |

Keep the form short. This is a walk-in-friendly local shop, not an enterprise intake form — every extra required field is a lead lost.

## How a submission flows

```
Browser form ──POST /api/lead──▶ Cloudflare Pages Function ──POST──▶ Google Apps Script ──▶ "Leads" sheet
 (same domain,                    • honeypot check                    • checks shared secret     + email alert
  no CORS setup)                  • Turnstile verification            • appends a row
                                  • validates every field
```

- **Frontend (Pi builds, M1.4):** validates fields, gets a Turnstile token, POSTs JSON to `/api/lead`, shows sending / success / error states. Disable the submit button while sending (the Apps Script step takes 1–3 seconds). On error, keep everything the customer typed and show a retry message that mentions calling or messaging the shop as a fallback.
- **Function (Pi builds, M1.4):** start from `integrations/cloudflare/lead.reference.ts` and place it at `functions/api/lead.ts`. It's already type-checked and tested against all the failure cases below.
- **Apps Script + sheet (Gian sets up once):** `integrations/google-sheets/SETUP.md`.

### Request the frontend sends

```json
{
  "fullName": "Juan Dela Cruz",
  "contactNumber": "0917 123 4567",
  "email": "",
  "service": "apparel-sublimation",
  "details": "30 sublimation jerseys for a barangay league, needed in 2 weeks",
  "preferredContact": "messenger",
  "source": "facebook",
  "page": "/services/apparel",
  "consent": true,
  "website": "",
  "turnstileToken": "<token from the Turnstile widget>"
}
```

### Responses from `/api/lead`

| Status | Body | Frontend should |
|---|---|---|
| 200 | `{"ok":true}` | Show the success state |
| 400 | `{"ok":false,"error":"invalid_json"}` | Show generic error |
| 403 | `{"ok":false,"error":"verification_failed"}` | Reset the Turnstile widget, ask to try again |
| 422 | `missing_fields` / `invalid_service` / `invalid_phone` / `invalid_email` | Highlight the field (shouldn't happen if client validation matches) |
| 502 | `{"ok":false,"error":"save_failed"}` | Show error + "call or message us" fallback. The lead did **not** save |

A honeypot hit also returns 200, so bots think they succeeded, but nothing is saved.

## Environment variables

| Name | Where | Secret? |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | `.env.local` (dev) and Cloudflare build variables | No, public by design |
| `TURNSTILE_SECRET_KEY` | `.dev.vars` (dev) and Cloudflare **Secrets** | Yes |
| `SHEETS_WEBHOOK_URL` | `.dev.vars` (dev) and Cloudflare **Secrets** | Yes |
| `SHEETS_SHARED_SECRET` | `.dev.vars` (dev) and Cloudflare **Secrets** | Yes |

For local development, use Cloudflare's Turnstile test keys, which always pass: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`. Production keys come from the Turnstile widget created in the Cloudflare dashboard.

## Local development

- Dev dependencies: `wrangler`, `@cloudflare/workers-types`. Add a `functions/tsconfig.json` using those types, and add `npx tsc -p functions/tsconfig.json` to `.pi/loop.json` verify once the function exists.
- The Vite dev server doesn't run functions. Run them with Wrangler next to it:
  - Terminal 1: `npm run build && npx wrangler pages dev dist` → functions + built site on `http://localhost:8788`
  - Terminal 2: `npm run dev` with a Vite proxy so `/api` goes to Wrangler: `server: { proxy: { "/api": "http://localhost:8788" } }` in `vite.config.ts`
- Local secrets go in `.dev.vars` (gitignored). Point `SHEETS_WEBHOOK_URL` at a test copy of the sheet, not the shop's real one.
- Frontend Turnstile: load Cloudflare's script (`https://challenges.cloudflare.com/turnstile/v0/api.js`) or use a small React wrapper package. Either is fine; state the choice in the session.

## Explicitly out of scope for Phase 1

- No file/design upload in the form yet (could be a Phase 1.x fast-follow, but it needs storage; Cloudflare R2 would be the fit)
- No CRM, no customer-facing auto-reply email (the shop gets an alert; replies are personal)
- No other backend endpoints beyond `/api/lead`
