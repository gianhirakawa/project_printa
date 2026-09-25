import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "../content/services.ts";
import Button from "./Button.tsx";
import CmykBar from "./CmykBar.tsx";

const pill =
  "inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-cream no-underline hover:bg-white/10 hover:text-white";

const dropdownLink =
  "block rounded-[10px] p-3 font-sans text-[15px] font-semibold no-underline hover:bg-ink-3";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Close the mobile panel on any navigation (adjust state during render, not an effect)
  const locKey = `${pathname}${hash}`;
  const [seenKey, setSeenKey] = useState(locKey);
  if (locKey !== seenKey) {
    setSeenKey(locKey);
    if (open) setOpen(false);
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
            className="h-[50px] w-auto md:h-[62px]"
          />
        </Link>

        <button
          type="button"
          className="inline-grid h-12 w-12 place-items-center rounded-[14px] border-[1.5px] border-ink-3 bg-ink-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [pill, isActive && "bg-white/10 text-white shadow-[inset_3px_0_0_var(--color-brand-bright)]"].filter(Boolean).join(" ")
              }
            >
              Home
            </NavLink>

            <div className="flex flex-col gap-1 pl-3 pt-1" role="group" aria-label="Services">
              <span className="px-3 pt-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold">Services</span>
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className={dropdownLink}>
                  {s.shortTitle}
                  <small className="block font-sans text-[13px] font-normal text-muted-ink">{s.shortDescription}</small>
                </Link>
              ))}
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
            <Button to="/#quote" sm className="mt-2.5">
              Get a quote
            </Button>
          </nav>
        )}

        {/* Desktop nav */}
        <nav className="nav hidden items-center gap-1.5 md:flex" aria-label="Main">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                pill,
                isActive && "rounded-[999px_999px_6px_6px] bg-white/10 text-white shadow-[inset_0_-3px_0_var(--color-brand-bright)]",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
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

          <NavLink
            to="/#about"
            className={({ isActive }) =>
              [
                pill,
                isActive && "rounded-[999px_999px_6px_6px] bg-white/10 text-white shadow-[inset_0_-3px_0_var(--color-brand-bright)]",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
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
