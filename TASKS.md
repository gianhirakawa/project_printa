# TASKS — project_printa

Working task list. Updated at the end of each working session. Phase breakdown lives in `MILESTONES.md`; this file tracks actual progress.

## Done

- [x] 2026-09-25 — Harness/docs in place (`SPECS.md`, `MILESTONES.md`, `AGENTS.md`, `content/`, `design/`, `DEPLOY.md`)
- [x] 2026-09-25 — Scaffolded Vite + React + TypeScript project in repo root
- [x] 2026-09-25 — `.gitignore` hardened for secrets (`.env`, `.env.*`, `*.local`, `.dev.vars`); added `.env.example` + `.dev.vars.example`
- [x] 2026-09-25 — Restored original project README (template boilerplate was overwriting it)
- [x] 2026-09-25 — Committed scaffold; pushed to `github.com/gianhirakawa/project_printa`
- [x] 2026-09-25 — Installed M1 dependencies: `tailwindcss` + `@tailwindcss/vite`, `react-router-dom`, `lucide-react`, fonts (`@fontsource/anton`, `@fontsource-variable/dm-sans`, `@fontsource/space-mono`)
- [x] 2026-09-25 — Logo assets copied to `public/assets/` (`printabilya-logo-480.webp` + `printabilya-logo-full.png`); `public/favicon.svg` + `public/icons.svg` in place
- [x] 2026-09-25 — M1.1 — Tailwind v4 setup + base layout (see checkpoint log below)

## In progress

—

## Up next — Phase 1 per `MILESTONES.md`

- [ ] M1.2 — Homepage (hero is already built as part of M1.1 — add About summary, services overview, why-choose, testimonial, leads-form sections)
- [ ] M1.3 — Service overview + 4 service pages
- [ ] M1.4 — Leads form → copy `integrations/cloudflare/lead.reference.ts` into `functions/api/lead.ts`, Turnstile + form UI
- [ ] M1.5 — "Coming Soon" placeholders
- [ ] M1.6 — Contact & location
- [ ] M1.7 — QA pass
- [ ] M1.8 — Deploy (needs Gian's go-ahead)

## Checkpoint log

### 2026-09-25 (session 3) — M1.2–M1.7 content, leads form, function, QA ✅

- **M1.2 Homepage** (`src/pages/Home.tsx`): full section stack per `design/homepage.html` — hero (from M1.1), services overview grid (4 `ServiceCard`s from `src/content/services.ts`), about/why section with proof points, `Testimonial` (Erica quote, verbatim from `site-content.md`), coming-soon band, quote section = `LeadForm` + `ContactDetails` side by side.
- **M1.3 Service pages** (`src/pages/ServicePage.tsx` + `src/content/services.ts`): breadcrumbs, hero with accent-word sticker treatment + `PhotoPlaceholder` (portrait), offerings cards, gallery (3 placeholder tiles), how-to-order steps, other-services cross-links, CTA band (`/?service=<formValue>#quote` preselects the lead form chip via `?service=` query param). Copy derived from `site-content.md` bullets only.
- **M1.4 Leads form + function**: `src/components/LeadForm.tsx` — service chips (controlled, `?service=` preselect), contact-method chips, source select, name/phone/email/details/consent, hidden honeypot, Cloudflare Turnstile (explicit render, dynamic script load, `execute()`+poll for token), client validation mirroring the function. `functions/api/lead.ts` — JSON parse → honeypot → Turnstile siteverify → field validation (same regexes as frontend) → POST to Apps Script `/exec` with `SHEETS_SHARED_SECRET`. `functions/tsconfig.json` (Workers types). Vite dev proxy `/api → :8788` (`wrangler pages dev`). Verified end-to-end locally: invalid JSON 400, bad phone/service 422, honeypot silent 200, valid lead passes Turnstile test key → 502 `save_failed` (expected: webhook not configured yet).
- **M1.5 Coming soon** (`src/pages/Home.tsx`): Online store + Order tracking cards, marked non-functional, link to Facebook.
- **M1.6 Contact** (`src/pages/Contact.tsx`): `/contact` route = heading + `LeadForm` + `ContactDetails` (address, phone, email, FB, hours note, map placeholder). Header "Contact" still targets `/#quote` per design.
- **M1.7 QA/meta**:
  - `usePageTitle(title, description?)` now sets per-route meta description too; every route passes its own title+description (service pages use per-service `metaDescription` from `services.ts`).
  - Site-wide OG tags in `index.html` (`og:image` → `/og-image.png`).
  - `scripts/generate-og-image.mjs` — dependency-free Node PNG encoder (5×7 bitmap font) producing `public/og-image.png` (1200×630, brand red, "PRINTS THAT TALK", CMYK stripe). Re-run with `npm run og`.
  - `package.json`: `og` + `typecheck` scripts; `.pi/loop.json` verify now includes `npm run typecheck` (app + `functions/` tsconfig).
- **Components**: `ServiceCard`, `Testimonial`, `ContactDetails`, `FacebookIcon` (inline SVG — lucide dropped brand icons), `CmykBar` accepts `className`.
- **App**: `/services` → redirect to `/#services`; `ScrollToTop` handles in-page `#hash` (rAF + `scrollIntoView`) and resets scroll otherwise.
- **Local dev**: `.env.local` (Turnstile test site key) + `.dev.vars` (test secret; sheet webhook empty until Apps Script is deployed) — both gitignored, `.env.example`/`.dev.vars.example` committed with names only.
- **Verified**: `npm run lint`, `npm run typecheck`, `npm run build` all green; `vite preview` smoke test: `/`, `/services/apparel`, `/contact`, `/services`, `/og-image.png` all 200.
- **Open (not blockers)**: deploy + real Turnstile keys + Apps Script webhook (`content/leads-form-schema.md` §deploy); prerendering decision (`MILESTONES.md` M1.9); real photos (designer placeholders stay obvious per AGENTS.md).

**Next:** M1.8 deploy (needs Gian's go-ahead + Cloudflare project), then M2 per MILESTONES.md.

---

### 2026-09-25 (session 2) — M1.1 base layout ✅

M1.1 complete. Dev server verified on `http://localhost:5173/` (all modules compile, build passes).

- **Vite/Tailwind**: `@tailwindcss/vite` plugin wired in `vite.config.ts`. `src/index.css` now holds all design tokens as Tailwind v4 `@theme` (colors, fonts, radii, display type scale) + component classes ported from `design/styles.css` (`.section--*` tones, `.eyebrow`, `.sticker-text`, `.cmyk-bar`, `.halftone`, `.confetti`, `.btn`, `.badge-soon`, `.ph` placeholder tiles, `.site-header`/`.nav__menu` dropdown).
- **Fonts**: Fontsource imports in `src/main.tsx` (Anton, Space Mono 400/700, DM Sans Variable) — no Google Fonts at runtime.
- **Content**: `src/content/services.ts` — one source of truth for the 4 service categories (slugs, `formValue` matching `leads-form-schema.md`, short copy + verbatim bullets + icons), shared by header nav, footer, and routes.
- **Components**: `Button` (primary/ghost/light, renders Link/a/button), `CmykBar`, `PhotoPlaceholder` (kept clearly a placeholder), `SiteHeader` (sticky ink header, services dropdown on hover/focus, mobile panel, Shop "Soon" badge), `SiteFooter` (4 columns + CMYK topline).
- **Routing** (`react-router-dom`): `/` (Home), `/services/:slug` ×4 (clearly-marked Coming-soon placeholders so nav links don't 404), catch-all 404. Plus `ScrollToTop` (with in-page hash handling), skip-to-content link, per-route `document.title` via `usePageTitle` hook.
- **Homepage so far**: hero only (ink + halftone + confetti, "Prints that talk." sticker H1, CTAs, sourced proof stats, 4-tile sticker stack). Rest of the page is M1.2.
- **Housekeeping**: `index.html` title + meta description; removed template leftovers (`App.css`, `hero.png`, `src/assets/*.svg`).
- Not yet (by design): `/api` proxy in `vite.config.ts` (M1.4, per `leads-form-schema.md`), OG tags/share image (M1.7), leads form (M1.4).

**Next (M1.2):** build the remaining homepage sections per `design/homepage.html` — About summary, services overview cards (reuse `services.ts`), why-choose, testimonial (Erica quote), leads-form section shell. The `/#about`, `/#quote`, `/#services` CTA targets land here.

---

### 2026-09-25 (session 1)

- Docs in place; scaffolded Vite + React + TS in repo root; restored original README; hardened `.gitignore` for secrets (`.env`, `.env.*`, `.dev.vars`, `*.local`) + example files; committed and pushed.
- Installed M1 deps: `tailwindcss` + `@tailwindcss/vite`, `react-router-dom`, `lucide-react`, Fontsource fonts.
- Logo assets to `public/assets/`; favicon + icons in place.

## Notes

- Push workflow: Pi commits, Gian pushes from his machine (`git push`).
- Don't publish pricing, no fabricated social proof — see `AGENTS.md`.
- `design/` files are visual references only — rebuild as React/Tailwind, don't paste mockup markup/scripts (AGENTS.md).
