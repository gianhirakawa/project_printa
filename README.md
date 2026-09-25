# project_printa — Pi Harness Quick Start

This is the project directory for **Printabilya's website** (working name: `project_printa`), built to slot into your existing Pi coding agent harness (`D:\pi-agent`) the same way `project_kadaj` does. It doesn't duplicate anything global — llama.cpp, the Pi container, and your Pi config all stay shared. This folder only needs a bind mount and, optionally, project-level `.pi/` settings.

Read the other files in this folder before starting a Pi session:

| File | What it's for |
|---|---|
| `SPECS.md` | Site map and page-by-page spec (what to build, in what order) |
| `MILESTONES.md` | Phase 1 (MVP) and Phase 2 (future ecommerce) development plan |
| `AGENTS.md` | Project rules/guardrails for the Pi agent — read this one especially |
| `content/site-content.md` | Ready-to-use copy for every page, pulled from the Printabilya company profile |
| `content/leads-form-schema.md` | Leads form fields + how submissions should be wired up |
| `design/DESIGN.md` | Design system: tokens, type, components, and how to port the mockups to React + Tailwind |
| `design/homepage.html`, `design/service-page.html`, `design/styles.css` | Static visual mockups to rebuild as React components (not to copy as-is) |
| `design/assets/` | Logo files |
| `integrations/cloudflare/lead.reference.ts` | Tested reference for the `/api/lead` function (Pi copies it into `functions/api/`) |
| `integrations/google-sheets/` | Apps Script + setup guide for the leads sheet (Gian sets up once, outside the repo) |
| `DEPLOY.md` | Going live on Cloudflare: domain, hosting, secrets, security checklist, costs |
| `docker-compose-setup.md` | The exact edit to make to your global `docker-compose.yml` |
| `.pi/loop.json`, `.pi/local-hud.json` | Project-level Pi settings |

## Stack (confirmed)

Nothing here has been scaffolded into code yet — that's the first thing you'll do with Pi. Phase 1 is a **static site plus one small function**:

- **Frontend:** Vite + React + TypeScript, with React Router for pages and Tailwind CSS for styling. Same Vite/React pattern as `project_kadaj`.
- **Output:** `npm run build` produces a static `dist/` folder. No SSR, no database.
- **Leads form:** posts to `/api/lead`, a **Cloudflare Pages Function** in `functions/api/lead.ts`. It checks Cloudflare Turnstile (bot protection) and the honeypot, validates the fields, then sends the lead to a **Google Sheet** through a small Apps Script, which also emails the shop. Secrets stay on Cloudflare, never in the browser. Details: `content/leads-form-schema.md`.
- **Hosting:** **Cloudflare Pages** (free) with the domain on Cloudflare Registrar. Cloudflare serves `index.html` for deep links like `/services/apparel` automatically, as long as the build has no `404.html`. See `DEPLOY.md`.
- **Running cost:** about ₱660/year for the .com domain. Hosting, the function, Turnstile, the sheet and the email alerts are all free at this scale.

Known tradeoff: as a single-page app, every URL serves the same `index.html`. Facebook's link-preview crawler doesn't run JavaScript, so a shared service-page link shows the site-wide preview, not a page-specific one. That's acceptable for Phase 1. If page-specific previews matter later, add a prerender step (see `MILESTONES.md`).

## One-time: wire this project into the harness

See `docker-compose-setup.md` for the exact volume line to add to `D:\pi-agent\docker-compose.yml` and the commands to recreate the container. Summary of the pattern from the guide:

```
D:\dev-works\project_printa  →  /workspace/printa
```

## Daily startup (once wired in)

Same sequence as any other project on the harness — see the main Pi guide for full detail. The project-specific pieces:

```powershell
# Terminal A — model server (unchanged, shared across projects)
cd C:\llama-cpp-cu133
# run the known-good Qwen3.8-27B baseline command

# Terminal B — Pi container (unchanged)
cd D:\pi-agent
docker compose up -d

# Launch Pi in project_printa specifically
docker compose exec -w /workspace/printa pi-agent pi

# Once the frontend exists:
cd D:\dev-works\project_printa
npm run dev
```

There's no database to start. The moving parts are the Vite dev server (`http://localhost:5173`) and, when you're working on the form, Wrangler running the `/api/lead` function (`npm run build && npx wrangler pages dev dist`, on `http://localhost:8788`). Vite proxies `/api` to it. See "Local development" in `content/leads-form-schema.md`.

To check the production build locally: `npm run build` then `npm run preview` (static pages only), or `npx wrangler pages dev dist` (pages + function, closest to production).

## First Pi session checklist

- [ ] `docker compose exec pi-agent sh -lc "ls -la /workspace/printa"` shows this folder's contents
- [ ] Pi's footer shows `/workspace/printa` as the working directory
- [ ] Ask Pi to read `SPECS.md`, `MILESTONES.md`, `AGENTS.md`, `content/site-content.md` and `design/DESIGN.md` before writing any code
- [ ] Tell Pi the stack is Vite + React + TypeScript + React Router + Tailwind, static output, with one Cloudflare Pages Function (`/api/lead`) arriving in M1.4
- [ ] Start with Milestone 1.1 in `MILESTONES.md` (project scaffold), not the leads form or ecommerce
