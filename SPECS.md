# Site Spec — Printabilya Website (Phase 1 / MVP)

Source material: `content/site-content.md` (all copy) and `content/leads-form-schema.md` (form fields). This file is the site map and page-by-page brief — hand it to Pi alongside those two before any page gets built.

## Brand snapshot

- **Name:** Printabilya
- **Tagline / positioning:** "Prints That Talk"
- **Location:** National Road, Barangay 9, Mamburao, Occidental Mindoro, Philippines 5106
- **Vibe:** local, trusted, fast, friendly, craft/studio-quality — not corporate. 4,300+ Facebook followers, 100% recommendation rate across 49 reviews.

## Site map

```
/                       Homepage
/services               Services overview (grid → links into the 4 pages below)
/services/apparel       Apparel & Sublimation Printing
/services/uv-printing   UV Printing on Custom Products
/services/signage       Signage, Stickers & Vehicle Graphics
/services/business      Business & Presentation Materials
/contact                Contact & leads form (also embedded as a homepage section)
/coming-soon (or inline "Coming Soon" badges — see below)
```

Each route above is a React Router route in the Vite app, not a separate HTML file. Every service category must have its own URL so people can share direct links.

### Routing & meta (static SPA specifics)

- Use `BrowserRouter` (clean URLs, no `#/`). On Cloudflare Pages no rule file is needed: with no `404.html` in the build, Pages serves `index.html` for any unknown path. Don't add a `404.html` or a `_redirects` catch-all.
- Add a catch-all 404 route inside the app so bad URLs show a friendly "page not found" with links back to the homepage and services.
- Set `document.title` (and the meta description) per route so browser tabs and Google show the right page title. Google runs JavaScript, so per-route titles do reach search results.
- Put solid site-wide Open Graph tags in `index.html`: title, description, and a share image in `public/`. Facebook doesn't run JavaScript, so these are what every shared link will show in Phase 1.
- Scroll to the top on route change.

## Page-by-page brief

### Homepage (`/`)

1. **Hero** — tagline "Prints That Talk", one-line positioning statement, primary CTA button → leads form/contact, secondary CTA → services overview.
2. **About summary** — short version of the About Us copy (2–3 sentences), link to full story if you want a dedicated About section.
3. **Services overview** — 4 cards (Apparel & Sublimation, UV Printing, Signage/Stickers/Vehicle Graphics, Business & Presentation Materials), each linking to its own page/section. Use the bullet items from `content/site-content.md` as sub-copy on each card.
4. **Why choose Printabilya** — the 5 bullet points from the source (track record, fast turnaround, friendly service, growing capability, community trust).
5. **Testimonial** — the Erica Nasino quote. Structure this as a reusable testimonial block since more may be added later.
6. **Leads form section** — see below. Can live inline on the homepage and also have its own `/contact` route.
7. **Footer** — address, phone, email, Facebook link, price-range indicator (₱₱ — do not translate this into an actual number).

### Services overview + 4 service pages

Each of the 4 service pages follows the same template:

- Page hero/title matching the category name
- Short intro sentence (can be adapted from the category description in `content/site-content.md`)
- Bulleted list of specific offerings in that category (verbatim from source — don't add or remove items)
- Image gallery placeholder grid (real photos to come from Gian/Printabilya later — use clearly-labeled placeholder blocks, not stock photography that implies real work samples)
- CTA at the bottom → leads form, with the service category pre-selected if the form supports a query param or similar

Do not add pricing, turnaround-time guarantees, or minimum order quantities to any service page — none of that is confirmed source material.

### Contact / Leads form (`/contact`, also embeddable)

- Form fields and submission handling: see `content/leads-form-schema.md`
- Static contact block alongside the form: address, phone, email, Facebook link, and (optional, nice-to-have) an embedded map
- After successful submission, show a clear confirmation state (not just a silent reset) — this is a small local business; people should feel heard

### "Coming Soon" placeholders

Per `MILESTONES.md` Phase 2, at least reserve a nav slot or homepage teaser for:

- Online store / print-on-demand ordering
- Order tracking

These should be visually present (so visitors know they're coming) but clearly marked "Coming Soon" and non-clickable or leading to a simple "notify me" / leads-form fallback — never a dead link or a half-built page.

## Non-goals for Phase 1

- No server, SSR, or database. Static `dist/` output, plus the single `/api/lead` Cloudflare Pages Function for the form
- No shopping cart, checkout, or payment integration
- No customer accounts or login
- No published price list
- No blog/CMS (unless Gian asks for one separately — not in the source spec)
