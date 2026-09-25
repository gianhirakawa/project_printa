import { ArrowRight, PackageSearch, Shirt, Store } from "lucide-react";
import Button from "../components/Button.tsx";
import CmykBar from "../components/CmykBar.tsx";
import ContactDetails from "../components/ContactDetails.tsx";
import LeadForm from "../components/LeadForm.tsx";
import PhotoPlaceholder from "../components/PhotoPlaceholder.tsx";
import ServiceCard from "../components/ServiceCard.tsx";
import Testimonial from "../components/Testimonial.tsx";
import { services } from "../content/services.ts";
import { usePageTitle } from "../hooks/usePageTitle.ts";

const total = String(services.length).padStart(2, "0");

const reasons = [
  { title: "Track record", blurb: "Long-running shop in Mamburao with real jobs for real customers." },
  { title: "Fast turnaround", blurb: "Quick turnaround on apparel, signage and promotional items." },
  { title: "Friendly service", blurb: "Known for friendly customer service." },
  { title: "Growing capability", blurb: "Constantly growing, now with in-house sublimation and UV printing." },
  { title: "Community trust", blurb: "Trusted by locals, with strong social proof on Facebook." },
];

const comingSoon = [
  { icon: Store, title: "Online store", blurb: "Browse and order print products online, straight from the site." },
  { icon: PackageSearch, title: "Order tracking", blurb: "Track order status and delivery progress from the site." },
];

export default function Home() {
  usePageTitle(
    "Printabilya | Custom Printing in Mamburao, Occidental Mindoro",
    "Custom apparel, signage, stickers and promotional materials from Mamburao, Occidental Mindoro. Request a quote."
  );

  return (
    <main>
      {/* Hero */}
      <section className="section section--ink halftone">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink-3 bg-ink-2 px-4 py-2 font-mono text-[13px] tracking-[0.08em] text-gold">
              <span className="badge-soon">New</span> In-house sublimation &amp; UV printing
            </div>
            <h1 className="text-display-1">
              Prints That
              <br />
              <span className="sticker-text">Talk.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-lead">
              Custom apparel, signage, stickers and promotional materials from Mamburao, Occidental Mindoro. Local shop,
              local service — prints people remember.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/#quote">
                Get a quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button to="/#services" variant="ghost">
                See what we print
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto max-w-[420px] rotate-2 rounded-md border-2 border-cream/25 bg-ink-2 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <PhotoPlaceholder icon={Shirt} label="Featured print job" shape="portrait" />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-muted-ink">
                <span>PRINTABILYA · MAMBURAO</span>
                <span>LOT 001</span>
              </div>
            </div>
          </div>
        </div>
        <div className="confetti" aria-hidden="true">
          <i style={{ top: "18%", left: "6%", "--r": "14deg" } as React.CSSProperties} />
          <i style={{ top: "70%", left: "12%", "--r": "-30deg" } as React.CSSProperties} />
          <i style={{ top: "30%", right: "8%", "--r": "40deg" } as React.CSSProperties} />
          <i style={{ top: "80%", right: "16%", "--r": "-12deg" } as React.CSSProperties} />
        </div>
        <CmykBar className="absolute inset-x-0 bottom-0" />
      </section>

      {/* Services overview */}
      <section id="services" className="section section--paper">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-3 text-display-3">
                What we can <span className="sticker-text">print</span> for you
              </h2>
            </div>
            <p className="mb-1 max-w-[400px] text-[15px] text-muted-paper">
              Four service lines, one local shop. Pick a line to see what's included.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} num={String(i + 1).padStart(2, "0")} total={total} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border-2 border-dashed border-ink-3 bg-white/70 px-6 py-5">
            <p className="m-0 font-mono text-[13px] tracking-[0.06em]">
              Don't see what you need? Ask us — we print more than the list.
            </p>
            <Button to="/?service=other#quote" sm>
              Ask us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* About / why */}
      <section id="about" className="section section--ink halftone">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="mt-3 text-display-3">
              From a local shop in <span className="sticker-text">Mamburao</span>
            </h2>
            <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-cream/85">
              Printabilya started as a small printing shop in Mamburao, Occidental Mindoro, and has since grown to offer
              a full range of print services.
            </p>
            <p className="mt-4 max-w-[540px] text-[15px] leading-[1.7] text-cream/85">
              Today we combine that local trust with the in-house capability of a print studio — serving teams, offices,
              schools and events across the province.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-3 pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-ink">Location</dt>
                <dd className="mt-1 m-0 font-display text-[20px] uppercase">Mamburao</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-ink">Service lines</dt>
                <dd className="mt-1 m-0 font-display text-[20px] uppercase">{total}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-ink">Online store</dt>
                <dd className="mt-1 m-0 font-display text-[20px] uppercase text-gold">Soon</dd>
              </div>
            </dl>
          </div>

          <ol className="m-0 list-none space-y-3 p-0">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                className="flex items-start gap-4 rounded-md border border-ink-3 bg-ink-2/70 p-4 transition hover:border-gold/60"
              >
                <span className="font-mono text-[13px] tracking-[0.12em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[17px] normal-case tracking-normal">{r.title}</h3>
                  <p className="mt-1 m-0 text-[14px] leading-[1.5] text-cream/75">{r.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section section--red halftone">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-8">
            <p className="eyebrow">Testimonial</p>
            <h2 className="mt-3 text-display-3 text-white">
              What customers <span className="text-gold-soft">say</span>
            </h2>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* Coming soon (Phase 2) */}
      <section className="section section--ink">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Coming soon</p>
              <h2 className="mt-3 text-display-3">
                Next on the <span className="sticker-text">press</span>
              </h2>
            </div>
            <p className="mb-1 max-w-[400px] text-[15px] text-cream/70">
              Phase 2 features, building in line. These are teasers — not live yet.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {comingSoon.map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-md border border-ink-3 bg-ink-2/70 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-3 bg-ink">
                  <c.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <span className="badge-soon">Coming soon</span>
                  <h3 className="mt-2 text-[20px]">{c.title}</h3>
                  <p className="mt-1 m-0 text-[14px] leading-[1.5] text-cream/75">{c.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / leads form */}
      <section id="quote" className="section section--paper">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 text-display-3">
              Tell us what to <span className="sticker-text">print</span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] text-muted-paper">
              Send us the details and we'll get back with a quote. If anything is urgent, call{" "}
              <a className="font-bold text-ink underline underline-offset-4" href="tel:+639365555193">
                0936 555 5193
              </a>
              .
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-md border-2 border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] md:p-8">
              <LeadForm />
            </div>
            <ContactDetails />
          </div>
        </div>
      </section>
    </main>
  );
}
