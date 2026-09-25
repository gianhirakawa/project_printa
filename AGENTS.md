# Project Rules — project_printa

These are the guardrails for the Pi coding agent while working in this repository. Per the harness guide (section 6.5), project rules like this live with the repo and don't affect other projects. When a rule below would block Pi from finishing a task, it should stop and ask rather than work around it — that's expected behavior, not a bug.

## Content accuracy

- **Do not publish pricing.** Printabilya has not published a formal price list. Do not invent one, estimate one, or add a "from ₱X" figure anywhere on the site. Every services page should route pricing questions to the leads form or direct contact ("Message us for a quote").
- **Do not fabricate reviews, testimonials, or follower/customer counts.** Use only what's in `content/site-content.md`. If more social proof is needed later, it has to come from Gian, not be generated.
- **Do not invent services, materials, or turnaround-time promises** that aren't in `content/site-content.md`. If a page feels thin, flag it instead of padding it with made-up claims.

## Design

- Follow `design/DESIGN.md`. The HTML files in `design/` are visual references: rebuild them as React components with Tailwind, don't paste their markup or mockup `<script>` into the app.
- Don't introduce new colors, fonts, or visual styles outside the design system without Gian's approval.
- Photo placeholders stay clearly labeled until Gian supplies real photos. No stock photos presented as Printabilya's work.

## Leads form & data handling

- The leads form collects PII (name, phone, sometimes email). Don't log full form submissions to the browser console, client-side analytics, or any committed file.
- The form posts only to `/api/lead`. That function is the only place secrets are used (`TURNSTILE_SECRET_KEY`, `SHEETS_WEBHOOK_URL`, `SHEETS_SHARED_SECRET`). They come from Cloudflare Secrets in production and `.dev.vars` locally.
- `.env.local` and `.dev.vars` must be in `.gitignore` from the first commit. Keep a `.env.example` and a `.dev.vars.example` with variable names only.
- Anything prefixed `VITE_` ships to the browser. Only `VITE_TURNSTILE_SITE_KEY` belongs there (it's public by design). Never put a secret in a `VITE_` variable or anywhere in frontend code.
- Never log lead contents inside the function either (no `console.log(body)`); Cloudflare keeps function logs.
- Don't change where leads are saved (the Google Sheet via Apps Script) or add another destination without confirming with Gian first. The Apps Script itself lives outside this repo; `integrations/google-sheets/Code.gs` is the reference copy.

## Scope discipline

- **Static site plus `/api/lead`, nothing more.** Stack is Vite + React + TypeScript + React Router + Tailwind, built to a plain static `dist/` folder, hosted on Cloudflare Pages. The only backend code is Cloudflare Pages Functions under `functions/api/`. Don't add Next.js, SSR, an Express/Node server, a database, or new endpoints without Gian's approval.
- **No function outside `functions/api/`.** Never add a root `functions/_middleware.ts` or a catch-all route (`functions/[[path]].ts`). Those run on every page visit, which turns free, unlimited static traffic into metered function calls.
- **Don't add a `404.html`** to `public/` or the build. Cloudflare Pages only treats the site as a single-page app (serving `index.html` for `/services/apparel` etc.) when there's no `404.html`. The app's own 404 route handles bad URLs.
- Don't add new dependencies beyond the stack above without a reason stated in the session. Small, well-known libraries (e.g., a form helper, an icon set) are fine if Pi says why.
- **Phase 1 only for now.** No ecommerce, cart, checkout, product variants, or payment integration — see `MILESTONES.md`. If a task starts pulling in that direction, stop and flag it rather than quietly scaffolding it.
- Sections/nav items for future features (see `MILESTONES.md` Phase 2) should be visibly marked "Coming Soon" and non-functional — placeholders, not stubs that look finished.

## Deploys & infrastructure

- No production deploy, domain change, or hosting-account change without explicit go-ahead in the session. Local/preview builds are fine at any time.
- No destructive git operations (`reset --hard`, force-push, history rewrite) without confirmation.

## When in doubt

If a request conflicts with anything above, or the right call depends on business info not in this repo (pricing, legal disclaimers, exact service-area boundaries), stop and ask rather than guessing.
