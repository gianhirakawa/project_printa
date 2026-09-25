import { Mail, MapPin, Phone } from "lucide-react";
import FacebookIcon from "./FacebookIcon.tsx";

const linkClass = "font-semibold text-ink underline-offset-4 hover:underline";

/**
 * Static contact block shown beside the leads form (SPECS.md, contact brief).
 * Phone / email / address per content/site-content.md.
 */
export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-md border-2 border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] md:p-8">
        <h3 className="font-display text-[22px] uppercase">Visit or call</h3>

        <ul className="m-0 mt-5 list-none space-y-4 p-0 text-[15px]">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>
              National Road, Barangay 9,
              <br />
              Mamburao, Occidental Mindoro 5106
            </span>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <a className={linkClass} href="tel:+639365555193">
              0936 555 5193
            </a>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <a className={linkClass} href="mailto:printabilya@gmail.com">
              printabilya@gmail.com
            </a>
          </li>
          <li className="flex gap-3">
            <FacebookIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <a className={linkClass} href="https://facebook.com/printabilya" rel="noopener" target="_blank">
              facebook.com/printabilya
            </a>
          </li>
        </ul>

        <div className="mt-5 border-t-2 border-dashed border-ink-3 pt-4 font-mono text-[12px] uppercase tracking-[0.12em]">
          Price range: <strong className="text-brand">₱₱ moderate</strong>
        </div>
      </div>

      {/* Map embed lands with real content later — keep clearly labeled */}
      <div
        aria-label="Map placeholder"
        className="grid min-h-[180px] place-items-center rounded-md border-2 border-dashed border-ink-3 bg-white/60 p-4"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-paper">Map embed</span>
      </div>
    </div>
  );
}
