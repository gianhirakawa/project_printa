import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "../content/services.ts";
import Button from "./Button.tsx";
import CmykBar from "./CmykBar.tsx";

/* Every menu item (Home → Shop) shares this exact treatment:
   fully circular pill + red shadow */
const pill =
  "inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2.5 font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-white no-underline shadow-[inset_0_-3px_0_var(--color-brand-bright)] transition-transform duration-150 hover:scale-[1.05] hover:bg-white/15";

const dropdownLink =
  "block rounded-[10px] p-3 font-sans text-[15px] font-semibold no-underline hover:bg-ink-3";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Close the mobile panel (and collapse its accordion) on any navigation
  // (adjust state during render, not an effect)
  const locKey = `${pathname}${hash}`;
  const [seenKey, setSeenKey] = useState(locKey);
  if (locKey !== seenKey) {
    setSeenKey(locKey);
    if (open) setOpen(false);
    if (servicesOpen) setServicesOpen(false);
  }

  return (
    <header className="site-header" id="top">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-6 px-6 md:h-[84px]">
        <Link to="/" aria-label="Printabilya home" className="shrink-0 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}assets/printabilya-logo-480.webp`}
            alt="Printabilya — Prints That Talk"
            width={480}
            height={168}
            className="h-[50px] w-auto transition-transform duration-150 hover:scale-[1.04] md:h-[62px]"
          />
        </Link>

        <button
          type="button"
          className="inline-grid h-12 w-12 place-items-center rounded-[14px] border-[1.5px] border-ink-3 bg-ink-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            setOpen((v) => !v);
            setServicesOpen(false);
          }}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {/* Mobile panel */}
        {open && (
          <nav
            id="site-nav"
            aria-label="Main"
            className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-ink-3 bg-ink px-6 pb-6 pt-3"
          >
            <NavLink to="/" end className={`${pill} w-full`}>
              Home
            </NavLink>

            {/* Services: same pill as the other items; tap to expand the list */}
            <button
              type="button"
              className={`${pill} w-full justify-between`}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-gold" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 border-l-2 border-brand-bright py-1.5 pl-3" role="group" aria-label="Services">
                  {services.map((s) => (
                    <NavLink
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className={({ isActive }) => `${dropdownLink} ${isActive ? "bg-ink-3" : ""}`}
                    >
                      {s.shortTitle}
                      <small className="block font-sans text-[13px] font-normal text-muted-ink">{s.shortDescription}</small>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/#about" className={`${pill} w-full`}>
              About
            </NavLink>
            <NavLink to="/#quote" className={`${pill} w-full`}>
              Contact
            </NavLink>
            <span className={`${pill} w-full justify-between`} aria-disabled="true">
              Shop <span className="badge-soon">Soon</span>
            </span>
            <Button to="/#quote" sm className="mt-2.5 w-full">
              Get a quote
            </Button>
          </nav>
        )}

        {/* Desktop nav */}
        <nav className="nav hidden items-center gap-1.5 md:flex" aria-label="Main">
          <NavLink to="/" end className={pill}>
            Home
          </NavLink>

          <div className="nav__item relative">
            <button type="button" className={pill} aria-haspopup="true" aria-expanded="false">
              Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="nav__menu absolute left-0 top-[calc(100%+8px)] min-w-[300px] rounded-md border border-ink-3 bg-ink-2 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className={dropdownLink}>
                  {s.shortTitle}
                  <small className="block font-sans text-[13px] font-normal text-muted-ink">{s.shortDescription}</small>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/#about" className={pill}>
            About
          </NavLink>
          <NavLink to="/#quote" className={pill}>
            Contact
          </NavLink>
          <span className={pill} aria-disabled="true">
            Shop <span className="badge-soon">Soon</span>
          </span>
          <Button to="/#quote" sm className="ml-2.5">
            Get a quote
          </Button>
        </nav>
      </div>
      <CmykBar />
    </header>
  );
}
