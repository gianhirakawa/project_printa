import { ArrowRight, Camera, Home as HomeIcon } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Button from "../components/Button.tsx";
import CmykBar from "../components/CmykBar.tsx";
import PhotoPlaceholder from "../components/PhotoPlaceholder.tsx";
import ServiceCard from "../components/ServiceCard.tsx";
import { services, serviceNumber, getService } from "../content/services.ts";
import { usePageTitle } from "../hooks/usePageTitle.ts";

const steps = [
  {
    title: "Send your request",
    blurb: "Tell us what you want to print — item, quantity, and any logo or artwork you have.",
  },
  {
    title: "We quote & confirm",
    blurb: "We reply with a quote and confirm the details before anything goes to press.",
  },
  {
    title: "We print & you pick up",
    blurb: "We print, you pay, and you pick up or arrange delivery.",
  },
];

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);

  usePageTitle(
    service ? `${service.title} | Printabilya` : "Service | Printabilya",
    service?.metaDescription
  );

  if (!service) return <Navigate to="/404" replace />;

  const total = String(services.length).padStart(2, "0");
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      {/* Hero */}
      <section className="section section--ink halftone">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-muted-ink">
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-cream">
                <HomeIcon className="h-3.5 w-3.5" aria-hidden="true" /> Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/#services" className="transition hover:text-cream">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-cream">{service.shortTitle}</span>
            </nav>

            <p className="eyebrow">
              Service {serviceNumber(service.slug)} / {total}
            </p>
            <h1 className="mt-3 text-display-2">
              {renderTitle(service.title, service.accent)}
            </h1>
            <p className="mt-5 max-w-[560px] text-lead">{service.lead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to={`/?service=${service.formValue}#quote`}>
                {service.ctaLabel} <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button href="#gallery" variant="ghost">
                See sample work
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-[380px] rotate-2 rounded-md border-2 border-cream/25 bg-ink-2 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <PhotoPlaceholder icon={service.icon} label={service.featuredPhoto} shape="square" />
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-muted-ink">
                <span>PRINTABILYA · MAMBURAO</span>
                <span>LOT {serviceNumber(service.slug)}</span>
              </div>
            </div>
          </div>
        </div>
        <CmykBar className="absolute inset-x-0 bottom-0" />
      </section>

      {/* Offerings */}
      <section className="section section--paper">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="eyebrow">What we offer</p>
            <h2 className="mt-3 text-display-3">{service.offerHeading}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {service.offers.map((o) => (
              <div key={o.title} className="flex flex-col gap-3 rounded-md border-2 border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)]">
                <span className="w-fit rounded-full border-2 border-ink bg-gold px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
                  {o.tag}
                </span>
                <h3 className="text-[20px]">{o.title}</h3>
                <p className="m-0 text-[14px] leading-[1.5] text-muted-paper">{o.blurb}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[12px] tracking-[0.06em] text-muted-paper">
            Pricing depends on quantity and design. Send us the details for a quote.
          </p>
        </div>
      </section>

      {/* Sample work */}
      <section id="gallery" className="section section--paper-2">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Sample work</p>
              <h2 className="mt-3 text-display-3">Recent {service.shortTitle.toLowerCase()} jobs</h2>
            </div>
            <p className="mb-1 max-w-[400px] text-[14px] text-muted-paper">
              Placeholder grid. Real photos from Printabilya's Facebook albums go here.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoPlaceholder icon={Camera} label="Photo 1" shape="square" light />
            {[2, 3, 4].map((n) => (
              <PhotoPlaceholder key={n} icon={Camera} label={`Photo ${n}`} shape="wide" light />
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="section section--ink">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="eyebrow">How to order</p>
            <h2 className="mt-3 text-display-3 text-white">
              Three steps, <span className="text-gold-soft">no queue</span>
            </h2>
          </div>
          <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-md border border-ink-3 bg-ink-2/70 p-6">
                <span className="font-display text-[40px] leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[20px]">{s.title}</h3>
                <p className="mt-2 m-0 text-[14px] leading-[1.5] text-cream/75">{s.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other services */}
      <section className="section section--paper">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="eyebrow">Other services</p>
            <h2 className="mt-3 text-display-3">
              Also on the <span className="sticker-text">press</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} num={serviceNumber(s.slug)} total={total} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--red halftone">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6">
          <div>
            <h2 className="text-display-3 text-white">Have a design in mind?</h2>
            <p className="mt-2 m-0 max-w-[520px] text-[15px] text-cream/85">
              Send us the details and we'll take it from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="light" to={`/?service=${service.formValue}#quote`}>
              Request a quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Renders the title with the given word(s) as sticker text. */
function renderTitle(title: string, accent: string) {
  const idx = title.indexOf(accent);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="sticker-text">{accent}</span>
      {title.slice(idx + accent.length)}
    </>
  );
}
