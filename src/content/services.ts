import { Coffee, Presentation, Shirt, Sticker } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  /** Route slug, e.g. /services/apparel */
  slug: string;
  /** Value stored in the leads sheet (content/leads-form-schema.md) */
  formValue: string;
  /** Nav label */
  shortTitle: string;
  /** Page title */
  title: string;
  /** Card copy on the homepage */
  shortDescription: string;
  /** Card bullets on the homepage */
  bullets: string[];
  /** Word(s) in the title rendered as sticker text on the page hero */
  accent: string;
  /** Nav / CTA labels */
  exploreLabel: string;
  ctaLabel: string;
  icon: LucideIcon;
  /** One-line intro under the page hero */
  lead: string;
  /** Offerings-section heading (design: short two-line display heading) */
  offerHeading: string;
  /** Specific offerings — verbatim from content/site-content.md */
  offers: { tag: string; title: string; blurb: string }[];
  /** Featured photo placeholder label (hero) */
  featuredPhoto: string;
  /** Per-route meta description */
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: "apparel",
    formValue: "apparel-sublimation",
    shortTitle: "Apparel & Sublimation",
    title: "Apparel & Sublimation Printing",
    shortDescription: "Sublimation printing line for apparel and other fabric-based items",
    bullets: [
      "Polo shirts & polos (sublimation-printed)",
      "Ripstop (sublimation)",
      "Honeycomb sublimation (for sportswear / jerseys)",
    ],
    accent: "Sublimation",
    exploreLabel: "Explore apparel",
    ctaLabel: "Get an apparel quote",
    icon: Shirt,
    lead: "Custom apparel from our in-house sublimation printing line, for shirts, sportswear, jerseys and other fabric-based items.",
    offerHeading: "Printed on fabric, built to be worn",
    offers: [
      {
        tag: "Sublimation",
        title: "Polo shirts & polos",
        blurb: "Polo shirts and polos, sublimation-printed on our in-house printing line.",
      },
      {
        tag: "Sportswear",
        title: "Ripstop sublimation",
        blurb: "Ripstop fabric, sublimation-printed for teams, staff and events that move.",
      },
      {
        tag: "Jerseys",
        title: "Honeycomb sublimation",
        blurb: "Honeycomb sublimation for sportswear and jerseys, made to sweat, stretch and last.",
      },
    ],
    featuredPhoto: "Featured jersey / polo",
    metaDescription:
      "Sublimation-printed polo shirts, ripstop and honeycomb sublimation for sportswear and jerseys. Printabilya, Mamburao, Occidental Mindoro.",
  },
  {
    slug: "uv-printing",
    formValue: "uv-printing",
    shortTitle: "UV Printing",
    title: "UV Printing on Custom Products",
    shortDescription: "Direct UV printing for personalized hard-surface items",
    bullets: ["Direct UV printing for personalized hard-surface items", "Mugs, tumblers, plaques and similar"],
    accent: "UV",
    exploreLabel: "Explore UV printing",
    ctaLabel: "Get a UV printing quote",
    icon: Coffee,
    lead: "Direct UV printing in-house, for personalized hard-surface items — mugs, tumblers, plaques and similar.",
    offerHeading: "Your idea, on hard surfaces",
    offers: [
      {
        tag: "In-house UV",
        title: "Direct UV printing",
        blurb: "Personalized hard-surface items, printed directly with our in-house UV printing.",
      },
      {
        tag: "Popular items",
        title: "Mugs, tumblers & plaques",
        blurb: "Mugs, tumblers, plaques and similar. Bring the idea; we'll handle the print.",
      },
    ],
    featuredPhoto: "Featured UV-printed item",
    metaDescription:
      "Direct UV printing on mugs, tumblers, plaques and other hard-surface items. Printabilya, Mamburao, Occidental Mindoro.",
  },
  {
    slug: "signage",
    formValue: "signage",
    shortTitle: "Signage, Stickers & Decals",
    title: "Signage, Stickers & Vehicle Graphics",
    shortDescription: "Stickers, vehicle decals, tarpaulins & campaign materials",
    bullets: [
      "Custom stickers & decals (Sticker World product line)",
      "Vehicle branding & decals (incl. ambulance livery)",
      "Tarpaulins & campaign/election materials",
    ],
    accent: "Vehicle",
    exploreLabel: "Explore signage",
    ctaLabel: "Get a signage quote",
    icon: Sticker,
    lead: "Stickers, decals, vehicle graphics and tarpaulins — from our Sticker World product line to full vehicle livery.",
    offerHeading: "Made to be seen",
    offers: [
      {
        tag: "Sticker World",
        title: "Custom stickers & decals",
        blurb: "Custom stickers and decals from our Sticker World product line.",
      },
      {
        tag: "Vehicles",
        title: "Vehicle branding & decals",
        blurb: "Vehicle branding and decals — including our ambulance livery.",
      },
      {
        tag: "Campaigns",
        title: "Tarpaulins & campaign materials",
        blurb: "Tarpaulins and campaign/election materials.",
      },
    ],
    featuredPhoto: "Featured signage or decal",
    metaDescription:
      "Custom stickers, decals, vehicle branding and tarpaulins. Printabilya, Mamburao, Occidental Mindoro.",
  },
  {
    slug: "business",
    formValue: "business",
    shortTitle: "Business & Presentation",
    title: "Business & Presentation Materials",
    shortDescription: "Flip charts, poster calendars & more",
    bullets: ["Flip charts for meetings & presentations", "Poster calendars"],
    accent: "Business",
    exploreLabel: "Explore business prints",
    ctaLabel: "Get a business print quote",
    icon: Presentation,
    lead: "Business and presentation materials, printed in Mamburao — from the meeting room to your office wall.",
    offerHeading: "Printed for the meeting room",
    offers: [
      {
        tag: "Meetings",
        title: "Flip charts",
        blurb: "Flip charts for meetings and presentations.",
      },
      {
        tag: "Walls & desks",
        title: "Poster calendars",
        blurb: "Poster calendars, printed in Mamburao.",
      },
    ],
    featuredPhoto: "Featured flip chart / calendar",
    metaDescription:
      "Flip charts and poster calendars for meetings and presentations. Printabilya, Mamburao, Occidental Mindoro.",
  },
];

export const serviceOrder = services.map((s) => s.slug);

export function getService(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceNumber(slug: string): string {
  const i = services.findIndex((s) => s.slug === slug);
  return String(i + 1).padStart(2, "0");
}
