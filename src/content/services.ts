import { Coffee, Presentation, Shirt, Sticker } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * One source of truth for the four service categories.
 * Copy comes from content/site-content.md only — see AGENTS.md.
 * `formValue` values must match content/leads-form-schema.md.
 */
export interface Service {
  /** Route: /services/<slug> */
  slug: string;
  /** Value stored on the leads form */
  formValue: string;
  /** Short label used in nav + form chips */
  shortTitle: string;
  title: string;
  /** One line under the nav link */
  shortDescription: string;
  /** Verbatim offerings from content/site-content.md */
  bullets: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "apparel",
    formValue: "apparel-sublimation",
    shortTitle: "Apparel & Sublimation",
    title: "Apparel & Sublimation Printing",
    shortDescription: "Polo shirts, jerseys, sportswear",
    bullets: [
      "Sublimation-printed polo shirts (Hexagon Mesh fabric)",
      "Ripstop sublimation printing, lightweight and durable for sportswear and jerseys",
      "Honeycomb sublimation printing",
    ],
    icon: Shirt,
  },
  {
    slug: "uv-printing",
    formValue: "uv-printing",
    shortTitle: "UV Printing",
    title: "UV Printing on Custom Products",
    shortDescription: "Mugs, tumblers, plaques",
    bullets: [
      "Direct UV printing for personalized hard-surface items",
      "Mugs, tumblers, plaques and similar",
    ],
    icon: Coffee,
  },
  {
    slug: "signage",
    formValue: "signage",
    shortTitle: "Signage, Stickers & Vehicles",
    title: "Signage, Stickers & Vehicle Graphics",
    shortDescription: "Decals, livery, tarpaulins",
    bullets: [
      "Custom stickers and decals from our Sticker World line",
      "Vehicle branding and decals, like ambulance livery",
      "Tarpaulins and campaign/election materials",
    ],
    icon: Sticker,
  },
  {
    slug: "business",
    formValue: "business",
    shortTitle: "Business & Presentation",
    title: "Business & Presentation Materials",
    shortDescription: "Flip charts, poster calendars",
    bullets: ["Flip charts for meetings and presentations", "Poster calendars"],
    icon: Presentation,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
