import type { CSSProperties } from "react";
import { ArrowRight, Shirt, Coffee, Sticker, Truck } from "lucide-react";
import Button from "../components/Button.tsx";
import PhotoPlaceholder from "../components/PhotoPlaceholder.tsx";
import { usePageTitle } from "../hooks/usePageTitle.ts";

const confetti = [
  { top: "14%", left: "46%", r: "25deg" },
  { top: "26%", left: "58%", r: "-18deg", d: "1.2s" },
  { top: "62%", left: "50%", r: "40deg", d: "2.4s" },
  { top: "74%", left: "66%", r: "-30deg", d: "0.6s" },
  { top: "20%", left: "72%", r: "12deg", d: "1.8s" },
  { top: "42%", left: "82%", r: "-42deg", d: "3s" },
];

const stickers = [
  { icon: Shirt, label: "Sublimation jersey", rotate: "rotate-[-5deg]", hideMobile: false },
  { icon: Coffee, label: "UV tumbler", rotate: "rotate-[4deg]", hideMobile: false },
  { icon: Sticker, label: "Sticker decal", rotate: "rotate-[3deg]", hideMobile: true },
  { icon: Truck, label: "Vehicle livery", rotate: "rotate-[-3deg]", hideMobile: true },
];

export default function Home() {
  usePageTitle("Printabilya | Custom Printing in Mamburao, Occidental Mindoro");

  return (
    <>
      <section
        id="home"
        className="section section--ink halftone overflow-hidden pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,8vw,112px)]"
      >
        <div className="confetti" aria-hidden="true">
          {confetti.map((c, i) => (
            <i
              key={i}
              style={
                {
                  top: c.top,
                  left: c.left,
                  "--r": c.r,
                  animationDelay: c.d,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Mamburao · Occidental Mindoro</p>
            <h1 id="hero-title" className="mt-5 text-display-1">
              Prints
              <br />
              that <span className="sticker-text">talk.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-lead">
              Custom apparel, signage, stickers and promotional materials. Bring us the idea and we'll handle the rest,
              with fast turnaround and studio-quality finishing.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/#quote">
                Request a quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button to="/#services" variant="ghost">
                Browse services
              </Button>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 p-0">
              <li className="m-0 list-none">
                <span className="block text-[40px] leading-none font-display">4,300+</span>
                <span className="mt-2 block font-mono text-[11px] tracking-[0.14em] uppercase text-muted-ink">
                  Facebook followers
                </span>
              </li>
              <li className="m-0 list-none">
                <span className="block text-[40px] leading-none font-display">100%</span>
                <span className="mt-2 block font-mono text-[11px] tracking-[0.14em] uppercase text-muted-ink">
                  recommend us (49 reviews)
                </span>
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="grid grid-cols-2 gap-5 p-3">
              {stickers.map((s) => (
                <div
                  key={s.label}
                  className={[
                    "sticker border-[6px] border-white rounded-[22px] shadow-[10px_12px_28px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-[1.03]",
                    s.rotate,
                    s.hideMobile && "max-[719px]:hidden",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <PhotoPlaceholder icon={s.icon} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
