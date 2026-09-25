import { Link } from "react-router-dom";
import { services } from "../content/services.ts";
import CmykBar from "./CmykBar.tsx";

const footerLink = "no-underline hover:text-white hover:underline hover:underline-offset-4";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-[15px] text-muted-ink">
      <CmykBar />
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-6 pb-12 pt-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img src="/assets/printabilya-logo-480.webp" alt="Printabilya" width={480} height={168} className="mb-4 h-[72px] w-auto" />
          <p>
            Printing and personalized merchandise from Mamburao, Occidental Mindoro: custom apparel, signage, stickers and
            promotional materials.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[12px] tracking-[0.16em] uppercase text-white">Services</h4>
          <ul className="m-0 list-none p-0">
            {services.map((s) => (
              <li key={s.slug} className="mt-2.5 first:mt-0">
                <Link to={`/services/${s.slug}`} className={footerLink}>
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[12px] tracking-[0.16em] uppercase text-white">Printabilya</h4>
          <ul className="m-0 list-none p-0">
            <li>
              <Link to="/#about" className={footerLink}>
                About us
              </Link>
            </li>
            <li className="mt-2.5">
              <Link to="/#quote" className={footerLink}>
                Get a quote
              </Link>
            </li>
            <li className="mt-2.5">
              Online store <span className="badge-soon">Soon</span>
            </li>
            <li className="mt-2.5">
              Order tracking <span className="badge-soon">Soon</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[12px] tracking-[0.16em] uppercase text-white">Visit or call</h4>
          <ul className="m-0 list-none p-0">
            <li>
              #9 H. Alcaide St., Brgy. Payompon,
              <br />
              Mamburao, Occidental Mindoro
            </li>
            <li className="mt-2.5">
              <a href="tel:+639365555193" className={footerLink}>
                0936 555 5193
              </a>
            </li>
            <li className="mt-2.5">
              <a href="mailto:printabilya@gmail.com" className={footerLink}>
                printabilya@gmail.com
              </a>
            </li>
            <li className="mt-2.5">
              <a href="https://facebook.com/printabilya" rel="noopener" target="_blank" className={footerLink}>
                facebook.com/printabilya
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-3 border-t border-ink-3 px-6 pb-8 pt-5 font-mono text-[12px] tracking-[0.06em]">
        <span>© 2026 Printabilya</span>
        <span>Prints That Talk...</span>
      </div>
    </footer>
  );
}
