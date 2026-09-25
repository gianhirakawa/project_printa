import FacebookIcon from "./FacebookIcon.tsx";

/**
 * Reusable testimonial block (SPECS.md: "Structure this as a reusable
 * testimonial block since more may be added later"). Copy is verbatim from
 * content/site-content.md — the only published review on record.
 */
export default function Testimonial() {
  return (
    <figure className="m-0">
      <div className="relative max-w-[860px] rounded-md border-2 border-ink bg-cream p-7 shadow-[5px_5px_0_0_var(--color-ink)] md:p-10">
        <span aria-hidden="true" className="font-display text-[64px] leading-none text-brand">
          “
        </span>
        <blockquote className="m-0 -mt-4 font-display text-[22px] leading-[1.25] uppercase md:text-[26px]">
          The Printabilya is truly a reliable shop. They printed our custom polos, and the quality was great. The design
          came out sharp, and the fitting is comfortable. I would definitely order again.
        </blockquote>
        <p className="m-0 mt-5 font-mono text-[13px] tracking-[0.06em] text-muted-paper">
          English translation: "Printabilya is truly a reliable shop. They printed our custom polos, and the quality was
          great..."
        </p>
        <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[15px] font-bold">
            — Erica Nasino
            <small className="block font-normal text-muted-paper">Customer review on Facebook</small>
          </span>
          <a
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.08em] shadow-[3px_3px_0_0_var(--color-ink)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_var(--color-ink)]"
            href="https://facebook.com/printabilya"
            rel="noopener"
            target="_blank"
          >
            <FacebookIcon className="h-4 w-4" /> Read more reviews
          </a>
        </figcaption>
      </div>
    </figure>
  );
}
