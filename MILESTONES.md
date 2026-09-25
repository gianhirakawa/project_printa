# Development Plan — project_printa

## Phase 0 — Harness setup (not app work, do this once)

- [ ] Project bind-mounted into the Pi harness (`docker-compose-setup.md`)
- [ ] Container recreated, `/workspace/printa` visible inside it
- [ ] Pi launches correctly with `-w /workspace/printa`
- [ ] Pi told the stack at session start: Vite + React + TypeScript + React Router + Tailwind, static output + one Cloudflare Pages Function (see `README.md`)

## Phase 1 — MVP Website (current milestone)

The whole point of Phase 1: a homepage, a page/section per service, a working leads form, and clearly-marked placeholders for what's coming. No ecommerce yet.

### M1.1 — Project scaffold & foundation
- Scaffold with `npm create vite@latest . -- --template react-ts`, then add React Router and Tailwind CSS. The folder already has these docs in it, so when Vite asks about the non-empty directory, choose **ignore files and continue**. Never choose the option that removes existing files.
- Confirm `npm run lint` and `npm run build` both pass on the empty scaffold before writing features (these are the `/loop` verify commands in `.pi/loop.json`)
- Add `.gitignore` entries for `.env.local`, `.dev.vars`, `.wrangler/` and `dist/`, plus a `.env.example` with `VITE_TURNSTILE_SITE_KEY=`
- Route skeleton: all routes from `SPECS.md` plus a 404 catch-all, each with a stub page
- Design system from `design/DESIGN.md`: fonts via @fontsource, tokens in Tailwind `@theme`, custom effects (sticker text, halftone, CMYK bar, offset buttons) in `@layer components`, `lucide-react` icons
- Copy the logo from `design/assets/` into `public/`
- `src/content/services.ts` as the single source for all service data (see DESIGN.md)
- Base layout: `SiteHeader` (with mobile menu), `SiteFooter`, `Section`, `Button` and the other shared components, matching `design/homepage.html`

### M1.2 — Homepage
- Match `design/homepage.html` section by section
- Hero with tagline + positioning statement + primary/secondary CTAs
- About summary section
- Services overview grid (4 categories, linking out)
- "Why choose Printabilya" section (5 points from source content)
- Testimonial block (Erica Nasino quote, built as a reusable component)
- Footer with contact/location block

### M1.3 — Service pages
- `/services` overview + 4 individual category pages (Apparel & Sublimation, UV Printing, Signage/Stickers/Vehicle Graphics, Business & Presentation Materials)
- Shared page template matching `design/service-page.html`, copy pulled from `content/site-content.md`
- Placeholder image gallery per page (clearly labeled as placeholders, not stock photos standing in as real samples)

### M1.4 — Leads form
- Build per `content/leads-form-schema.md`
- Frontend: client-side validation, honeypot field, Turnstile widget (test keys locally), POST to `/api/lead`
- Function: copy `integrations/cloudflare/lead.reference.ts` to `functions/api/lead.ts`. Add dev deps `wrangler` and `@cloudflare/workers-types`, a `functions/tsconfig.json`, and a `.dev.vars.example`
- Add `npx tsc -p functions/tsconfig.json` to `.pi/loop.json` verify
- Vite dev proxy: `/api` → `http://localhost:8788` (Wrangler)
- Success/failure UI states per the response table in the schema; submit button disabled while sending
- Service-category pre-select via `?service=` query param (so a service page's CTA can deep-link into the form with that category chosen)
- **Outside the repo (Gian, once):** create the sheet + Apps Script per `integrations/google-sheets/SETUP.md`, and a test copy for local dev

### M1.5 — "Coming Soon" placeholders
- Nav entry and/or homepage teaser for the future online store / order tracking (Phase 2)
- Clearly marked, non-functional, no dead links

### M1.6 — Contact & location
- Dedicated `/contact` (or homepage section) with address, phone, email, Facebook link, optional map embed
- Leads form lives here too

### M1.7 — QA pass before calling Phase 1 done
- Mobile responsiveness check (this audience is largely mobile/Facebook-referred)
- Form delivers a test lead end-to-end (row in the sheet + email alert), locally via Wrangler and on the live domain
- Failure path works: with the sheet URL deliberately wrong, the form shows the error state and keeps the customer's input
- Per-route `document.title` + meta description; site-wide Open Graph tags and share image in `index.html`
- `npm run build` + `npm run preview`: every route loads, including on a hard refresh of a deep link
- No placeholder/lorem-ipsum copy left anywhere outside intentional "Coming Soon" labels
- No pricing, fabricated reviews, or invented services anywhere (see `AGENTS.md`)

### M1.8 — Deploy (needs Gian's go-ahead per `AGENTS.md`)
- Follow `DEPLOY.md`: Cloudflare Pages connected to the GitHub repo, build command `npm run build`, output `dist`
- Set `VITE_TURNSTILE_SITE_KEY` (variable) and `TURNSTILE_SECRET_KEY`, `SHEETS_WEBHOOK_URL`, `SHEETS_SHARED_SECRET` (encrypted secrets)
- Custom domain `printabilya.com` + `www`, then the security checklist in `DEPLOY.md` (Bot Fight Mode, rate limit on `/api/lead`, `pages.dev` redirect)

### M1.9 — Optional fast-follow: page-specific link previews
- Only if shared service links on Facebook need their own title/image
- Add a build-time prerender step (e.g., a Vite prerender/SSG plugin) that writes a real HTML file per route with its own meta tags. Still a static build, no server.

---

## Phase 2 — Future milestone: Print-on-Demand Ecommerce

Not started until Phase 1 ships and Gian greenlights it. Recorded here so scope is clear and nothing from this phase leaks into Phase 1 build-out.

### M2.1 — Platform decision
- Evaluate Shopify (+ a POD app like Printify/Printful) vs. WooCommerce vs. a custom storefront, weighed against what Printabilya can actually fulfill in-house (they print/produce locally — this may end up being a hybrid: Shopify storefront + in-house fulfillment rather than a pure dropship POD model)
- The Cloudflare-hosted Vite site doesn't block any of these. Leading options:
  - **Cloudflare + Supabase + PayMongo** (recommended): the site stays the storefront; Supabase Pro (~$25/mo) for accounts, orders and design uploads; Cloudflare functions create PayMongo checkouts and verify payment webhooks
  - **Shopify + PayMongo** on `shop.printabilya.com` (~$19–25/mo plus Shopify's per-order fee on third-party payments): fastest, and the shop can manage products itself
  - **Medusa** self-hosted (e.g., DigitalOcean, ~$35/mo managed): most built-in features, most upkeep
- PayMongo fees apply on every route (cards 3.125% + ₱13.39, GCash 2.23%, Maya 1.79%, QR Ph 1.34%, excl. VAT; checked Sept 2026)

### M2.2 — Product catalog
- Turn the existing offerings (sublimation apparel, UV custom products, stickers, signage) into sellable products/variants with real pricing (finally — Phase 1 deliberately has none)

### M2.3 — Payments & fulfillment
- Local payment methods relevant to Occidental Mindoro customers (GCash/Maya, cash-on-pickup, possibly COD via courier)
- Shipping vs. local pickup logic

### M2.4 — Automation tie-in
- Order notifications and a production queue the shop actually checks. Start from what Phase 1 already uses (Cloudflare functions + email alerts; the leads sheet or the store's own admin) before adding new tools
- Production queue visibility for the shop

### M2.5 — Customer experience
- Accounts, order history/tracking
- Possibly a simple design-upload/customization flow for print-on-demand items

### M2.6 — Marketing loop
- Email/SMS follow-up, repeat-customer incentives — leverages the same local trust/loyalty Printabilya already has on Facebook
