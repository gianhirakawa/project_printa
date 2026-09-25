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

## In progress

- [ ] M1.1 — Tailwind v4 setup + base layout (deps installed, assets in place; remaining: `@tailwindcss/vite` plugin in `vite.config.ts`, design tokens + base styles in `src/index.css`, fonts in `main.tsx`, header/footer/layout components, template cleanup)

## Up next — Phase 1 per `MILESTONES.md`

- [ ] M1.2 — Homepage
- [ ] M1.3 — Service overview + 4 service pages
- [ ] M1.4 — Leads form → copy `integrations/cloudflare/lead.reference.ts` into `functions/api/lead.ts`, Turnstile + form UI
- [ ] M1.5 — "Coming Soon" placeholders
- [ ] M1.6 — Contact & location
- [ ] M1.7 — QA pass
- [ ] M1.8 — Deploy (needs Gian's go-ahead)

## Notes

- Push workflow: Pi commits, Gian pushes from his machine (`git push`).
- Don't publish pricing, no fabricated social proof — see `AGENTS.md`.
- Resume point (2026-09-25 checkpoint): M1.1 in progress. `src/` is still the default Vite counter template — nothing built yet. Next: `vite.config.ts` (add `@tailwindcss/vite`), `src/index.css` (Tailwind v4 `@import "tailwindcss"` + `@theme` tokens + component CSS from `design/styles.css`), `src/main.tsx` (fontsource imports), then base components (header/footer/layout) and pages per `design/homepage.html` + `design/service-page.html`.
