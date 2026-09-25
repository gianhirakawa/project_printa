# Design System — Printabilya

Visual reference for the Phase 1 build. The HTML files in this folder are **static mockups**, not code to copy. Pi's job is to rebuild them as React components with Tailwind (see "Porting to Vite + React + Tailwind").

| File | What it is |
|---|---|
| `homepage.html` | Full homepage mockup (all sections from `SPECS.md`) |
| `service-page.html` | Service page **template**, filled with Apparel & Sublimation content. The other 3 service pages use the same layout |
| `styles.css` | All tokens and component styles, split into numbered sections (1 Tokens … 16 Responsive) |
| `assets/` | Logo files (see "Logo") |

**Context tip for Pi:** don't load everything at once. Read this file first, then only the `styles.css` section and the HTML block for the component you're building.

## Concept: "Prints That Talk"

The look is taken from the logo itself: red lettering, a white die-cut sticker outline, black background, gold confetti. Everything else is a print-shop motif:

- **Ink and paper.** Sections alternate between near-black "ink" and warm off-white "paper," like printing on two stocks. One red section per page for emphasis.
- **Sticker outlines.** Thick white borders on dark backgrounds (photo tiles, the red "sticker text" in headlines) echo the logo's die-cut outline.
- **Offset shadows.** Buttons and cards cast a hard, unblurred shadow a few pixels down-right, like a slightly misregistered print. Ink-colored on paper, gold on ink.
- **Print details.** A CMYK color bar under the header and above the footer, halftone dot fields behind heroes, and gold confetti flecks in the homepage hero.
- **Speech bubble.** The testimonial sits in a comic speech bubble, because the prints "talk."

## Tokens

| Token | Value | Use |
|---|---|---|
| `ink` / `ink-2` / `ink-3` | `#111010` / `#1c1a19` / `#2a2725` | Dark sections, raised dark cards, dark borders |
| `paper` / `paper-2` | `#f6f2ea` / `#ece5d8` | Light sections, alternate light section, input fill |
| `white` | `#ffffff` | Cards on paper, sticker outlines |
| `red` | `#b3121b` | Primary buttons, icon badges, eyebrows on paper. Sampled from the logo (`#95090a` average) and brightened for screens |
| `red-deep` / `red-bright` | `#8a0a0f` / `#d8262e` | Hover states / red on ink. `red-bright` on ink is 3.8:1, so use it only for large display text (headlines, step numbers), never body text |
| `gold` / `gold-soft` | `#e9a23b` / `#f4c77a` | Eyebrows and offset shadows on ink, "Soon" badges, confetti |
| `c` `m` `y` | `#00aeef` `#ec008c` `#ffe500` | **CMYK bar only.** Never use for text or buttons |
| `muted-on-ink` / `muted-on-paper` | `#b9b2a8` / `#5e5750` | Secondary text. Both pass WCAG AA on their backgrounds |

Radii: 10 / 18 / 28px, pills at 999px. Offset shadow 5px on buttons, 6–10px on cards. Container 1200px with 24px gutters.

## Type

| Role | Font | Notes |
|---|---|---|
| Display (H1–H3) | **Anton** | Always uppercase. Condensed poster type, like tarpaulin lettering |
| Labels, buttons, eyebrows, nav | **Space Mono** 700 | Uppercase with wide letter-spacing. Echoes the logo's "PRINTS THAT TALK…" line |
| Body | **DM Sans** | 17px desktop / 16px mobile, line-height 1.6 |

Scale: H1 `clamp(64px, 10vw, 136px)`, H2 `clamp(40px, 5.5vw, 72px)`, H3 `clamp(26px, 2.4vw, 32px)`, lead `clamp(18px, 1.6vw, 21px)`.

The blackletter "Printabilya" style belongs to the logo only. Don't recreate it with a web font.

## Logo

- `assets/printabilya-logo-480.webp` (34 KB) for the header and footer. `printabilya-logo.webp` / `.png` (900px) and `printabilya-logo-full.png` (1673px) for anything larger.
- These were **cut out of a screenshot** Gian shared: the background, galaxy and confetti were removed, keeping the white sticker outline. They look right at header size, but ask Printabilya for the original high-resolution or vector file before launch.
- Minimum display height 48px (the tagline line gets unreadable below that). Header: 62px desktop, 50px mobile.
- The logo was designed on black, so the header and footer are always ink-colored.

## Components (build these as React components)

| Component | Mockup reference | Notes |
|---|---|---|
| `SiteHeader` | `.site-header`, `.nav`, `.nav-toggle` | Sticky, ink with slight transparency + blur. Services dropdown opens on hover/focus (desktop). Hamburger opens a full-width panel below 860px. "Shop" is disabled with a Soon badge |
| `CmykBar` | `.cmyk-bar` | 5px, four equal segments: C, M, Y, brand red |
| `Section` | `.section--ink/paper/paper-2/red`, `.halftone` | Props: `tone`, `halftone`. Content must sit above the dot layer (see `.halftone > .container`) |
| `SectionHead` | `.section-head`, `.eyebrow` | Eyebrow + H2 + optional lead |
| `Button` | `.btn`, `--ghost`, `--light`, `--sm`, `--block` | Offset shadow; hover lifts 2px, press sinks into the shadow |
| `StickerText` | `.sticker-text` | Red fill, white outline via stacked text-shadows. One or two words per headline, max |
| `PhotoPlaceholder` | `.ph`, `--light`, `--square`, `--wide` | Striped tile + icon + "Photo · …" label. Replaced 1:1 by real photos later |
| `StickerStack` | `.sticker-stack`, `.sticker` | Homepage hero collage; tilted tiles with white border. Shows 2 tiles on mobile |
| `ServiceCard` | `.service-card` | White card, ink border, ink offset shadow that turns red on hover. Whole card is the link |
| `IconBadge` | `.icon-badge` | Red circle, white ring, thin ink outer ring |
| `StatTile`, `ReasonItem` | `.stat`, `.reason` | About section |
| `QuoteBubble` | `.bubble` | Speech bubble with tail; attribution below |
| `ComingSoonCard` | `.soon-card`, `.badge-soon` | Dashed border, not clickable |
| `LeadForm` | `.form-card`, `.form`, `.chips`, `.form-success` | Service and contact-method choices are radio "chips" (single select, keyboard accessible). Honeypot field is off-screen. Turnstile widget sits just above the submit button (not in the mockup). Success state replaces the form |
| `ContactList` | `.contact-item` | Phone, email and Facebook are links (`tel:`, `mailto:`) |
| Service page parts | `.page-hero__grid`, `.offer-card`, `.gallery`, `.steps`, `.related-grid`, `.cta-band` | Same template for all 4 services |
| `SiteFooter` | `.site-footer` | CMYK bar on top, 4 columns, collapses to 1 on mobile |

### One source of truth for services

Create `src/content/services.ts` with one entry per service: `slug` (route), `formValue` (from `content/leads-form-schema.md`), `title`, `shortDescription`, `bullets`, `icon`. The homepage cards, nav dropdown, footer links, service pages and "Other services" row all read from it. Copy comes from `content/site-content.md` only.

## Porting to Vite + React + Tailwind

**Fonts:** self-host via npm instead of the Google Fonts link used in the mockup:

```bash
npm i @fontsource/anton @fontsource/space-mono @fontsource-variable/dm-sans
```

```ts
// src/main.tsx
import "@fontsource/anton";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "@fontsource-variable/dm-sans";
```

**Tokens:** map them into Tailwind v4's theme in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #111010;
  --color-ink-2: #1c1a19;
  --color-ink-3: #2a2725;
  --color-paper: #f6f2ea;
  --color-paper-2: #ece5d8;
  --color-brand: #b3121b;
  --color-brand-deep: #8a0a0f;
  --color-brand-bright: #d8262e;
  --color-gold: #e9a23b;
  --color-gold-soft: #f4c77a;
  --color-muted-ink: #b9b2a8;
  --color-muted-paper: #5e5750;
  --color-cmyk-c: #00aeef;
  --color-cmyk-m: #ec008c;
  --color-cmyk-y: #ffe500;

  --font-sans: "DM Sans Variable", system-ui, sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;
  --font-display: "Anton", Impact, sans-serif;

  --radius-card: 28px;
}
```

Brand red is named `brand` so it doesn't collide with Tailwind's built-in `red-*` scale.

**What stays as custom CSS:** a few effects are awkward as utility classes. Put them in `@layer components` in `index.css`, copied from `styles.css`: `.sticker-text`, `.halftone`, `.cmyk-bar`, the button offset shadow and states, `.bubble` and its tail, `.ph` stripes, `.confetti`. Everything else (layout, spacing, grids, type sizes) should be Tailwind utilities.

**Icons:** use `lucide-react` instead of the inline SVG sprite. Shirt → `Shirt`, mug → `Coffee`, sticker → `Sticker`, board → `Presentation`, van → `Truck`, pin → `MapPin`, phone → `Phone`, mail → `Mail`, chat → `MessageCircle`, tag → `Tag`, check → `Check`, bag → `ShoppingBag`, track → `Clock`, menu → `Menu`, arrow → `ArrowRight`, chevron → `ChevronDown`.

**Don't port:**
- The mockup `<script>`. Nav toggle and form states become React state. The real form submit is milestone M1.4.
- The `service-page.html` / `homepage.html#…` links. Use the React Router routes from `SPECS.md` (`/services/apparel` etc.).
- The inline `style="…"` attributes. They're mockup shortcuts; turn them into proper classes.

## Rules

- **Placeholders stay obvious.** Every `.ph` tile is labeled "Photo · …". Never swap in stock photos that look like Printabilya's real work.
- **Copy:** headlines like "Four ways to make it yours" are UI copy and fine to keep. Every fact (services, numbers, contact details) must match `content/site-content.md`. The English line under the testimonial is a translation of the Tagalog review. Confirm with Printabilya before launch.
- **Accessibility:** keep the skip link, visible focus rings (gold outline), labeled form fields, `aria-current` on the active nav item, `aria-expanded` on the menu button, and the `prefers-reduced-motion` rule that stops the confetti animation.
- **Mobile first check:** most visitors come from Facebook on phones. Verify every section at 390px wide, with no sideways scrolling.
