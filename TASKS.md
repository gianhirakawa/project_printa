# TASKS — project_printa

Working task list. Updated at the end of each working session. Phase breakdown lives in `MILESTONES.md`; this file tracks actual progress.

## Done

- [x] 2026-09-25 — Harness/docs in place (`SPECS.md`, `MILESTONES.md`, `AGENTS.md`, `content/`, `design/`, `DEPLOY.md`)
- [x] 2026-09-25 — Scaffolded Vite + React + TypeScript project in repo root
- [x] 2026-09-25 — `.gitignore` hardened for secrets (`.env`, `.env.*`, `*.local`, `.dev.vars`); added `.env.example` + `.dev.vars.example`
- [x] 2026-09-25 — Restored original project README (template boilerplate was overwriting it)
- [x] 2026-09-25 — Committed scaffold; pushed to `github.com/gianhirakawa/project_printa`

## In progress

_(nothing active right now)_

## Up next — Phase 1 per `MILESTONES.md`

- [ ] M1.1 — Clean up template leftovers (`App.css`, `assets/hero.png`, counter demo), set up Tailwind, base layout from `design/DESIGN.md`
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
