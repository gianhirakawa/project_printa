import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { useLocation } from "react-router-dom";
import { services } from "../content/services.ts";
import Button from "./Button.tsx";

// GitHub Pages client preview — the /api/lead function only exists on
// Cloudflare Pages, so the form can't deliver leads there.
const IS_PREVIEW = typeof window !== "undefined" && window.location.hostname.endsWith(".github.io");

const SERVICE_OPTIONS = [...services.map((s) => ({ value: s.formValue, label: s.shortTitle })), { value: "other", label: "Other / not sure" }];
const CONTACT_METHODS = [
  { value: "call", label: "Call" },
  { value: "sms", label: "Text (SMS)" },
  { value: "messenger", label: "Messenger" },
  { value: "email", label: "Email" },
];
const SOURCE_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "referral", label: "Someone told me" },
  { value: "local", label: "I'm local — I've seen the place" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "sending" | "success" | "error";
type FieldKey = "fullName" | "contactNumber" | "email" | "service" | "details" | "consent";

const ERROR_MESSAGES: Record<FieldKey, string> = {
  fullName: "Please enter your name.",
  contactNumber: "Please enter a valid mobile number.",
  email: "Please fix the email address, or leave it blank.",
  service: "Please pick the closest service.",
  details: "Tell us what you want printed.",
  consent: "Please confirm before sending.",
};

/* ---------- Cloudflare Turnstile (explicit widget) ---------------------- */

interface TurnstileWidget {
  execute: () => void;
  reset: () => void;
  getResponse: () => string;
}

interface TurnstileGlobal {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (id?: string) => void;
  reset: (id?: string) => void;
  getResponse: (id?: string) => string;
}

declare global {
  interface Window {
    turnstile?: TurnstileGlobal;
    __onTurnstileReady?: () => void;
  }
}

let turnstileLoader: Promise<void> | null = null;
function ensureTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileLoader) {
    turnstileLoader = new Promise((resolve) => {
      window.__onTurnstileReady = () => resolve();
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__onTurnstileReady";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return turnstileLoader;
}

/** Returns a fresh widget token, or "" if Turnstile couldn't produce one. */
async function freshToken(widget: TurnstileWidget | null): Promise<string> {
  if (!widget) return "";
  if (!widget.getResponse()) widget.execute();
  const deadline = Date.now() + 4000;
  while (Date.now() < deadline) {
    const token = widget.getResponse();
    if (token) return token;
    await new Promise((r) => setTimeout(r, 120));
  }
  return widget.getResponse();
}

/* ---------- Validation (mirrors functions/api/lead.ts) -------------------- */

type Errors = Partial<Record<FieldKey, string>>;

function validate(data: Record<string, string>, consent: boolean): Errors {
  const errors: Errors = {};
  if (!data.fullName) errors.fullName = ERROR_MESSAGES.fullName;
  if (!/^[0-9+()\-\s]{7,20}$/.test(data.contactNumber)) errors.contactNumber = ERROR_MESSAGES.contactNumber;
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = ERROR_MESSAGES.email;
  if (!SERVICE_OPTIONS.some((o) => o.value === data.service)) errors.service = ERROR_MESSAGES.service;
  if (!data.details) errors.details = ERROR_MESSAGES.details;
  if (!consent) errors.consent = ERROR_MESSAGES.consent;
  return errors;
}

/* ---------- Component ----------------------------------------------------- */

export default function LeadForm() {
  const location = useLocation();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState<string>(() => {
    const requested = new URLSearchParams(location.search).get("service") ?? "";
    return SERVICE_OPTIONS.some((o) => o.value === requested) ? requested : "";
  });
  const formRef = useRef<HTMLFormElement>(null);
  const tsSlotRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TurnstileWidget | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  // Mount the Turnstile widget once.
  useEffect(() => {
    if (!siteKey) return;
    let active = true;
    ensureTurnstile().then(() => {
      const slot = tsSlotRef.current;
      if (!active || !slot || !window.turnstile) return;
      slot.innerHTML = "";
      const id = window.turnstile.render(slot, { sitekey: siteKey, theme: "light" });
      widgetRef.current = {
        execute: () => window.turnstile?.execute(id),
        reset: () => window.turnstile?.reset(id),
        getResponse: () => window.turnstile?.getResponse(id) ?? "",
      };
    });
    return () => {
      active = false;
    };
  }, [siteKey]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (IS_PREVIEW) {
      setStatus("error");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = Object.fromEntries(fd.entries()) as Record<string, string>;
    data.service = service;
    const consent = fd.get("consent") === "on";
    const found = validate(data, consent);
    setErrors(found);
    if (Object.keys(found).length) return;

    // Honeypot: pretend nothing happened. Nothing is logged.
    if (data.website) return;

    setStatus("sending");
    const token = await freshToken(widgetRef.current);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent, page: location.pathname, turnstileToken: token }),
      });
      if (res.status === 200) {
        setStatus("success");
        return;
      }
      let serverError = "unknown";
      try {
        serverError = ((await res.json()) as { error?: string }).error ?? "unknown";
      } catch {
        /* non-JSON body */
      }
      if (serverError === "verification_failed") widgetRef.current?.reset();
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function resetForAnother() {
    formRef.current?.reset();
    setService("");
    setErrors({});
    widgetRef.current?.reset();
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="tick">
          <Check className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3>Thank you — we've got it.</h3>
        <p className="max-w-[420px] text-[15px] text-muted-paper">
          We'll get back to you as soon as we can. If anything is urgent, call{" "}
          <a className="font-bold text-ink underline underline-offset-4" href="tel:+639365555193">
            0936 555 5193
          </a>
          .
        </p>
        <Button variant="ghost" onClick={() => resetForAnother()}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} ref={formRef}>
      {IS_PREVIEW && (
        <div className="form-banner form-banner--note" role="note">
          <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>This is a preview build — the form isn't connected here.</span>
        </div>
      )}
      {status === "error" && (
        <div className="form-banner form-banner--error" role="alert">
          <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            We couldn't send that. Please try again, or call{" "}
            <a className="underline" href="tel:+639365555193">
              0936 555 5193
            </a>
            / message us on{" "}
            <a className="underline" href="https://facebook.com/printabilya" rel="noopener" target="_blank">
              Facebook
            </a>
            .
          </span>
        </div>
      )}

      <div className="form-field">
        <label className="form-label" htmlFor="lead-fullName">
          Name *
        </label>
        <input className="form-input" id="lead-fullName" name="fullName" type="text" autoComplete="name" maxLength={120} required />
        {errors.fullName && <p className="form-error">{errors.fullName}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-contactNumber">
          Mobile number *
        </label>
        <input
          className="form-input"
          id="lead-contactNumber"
          name="contactNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09XX XXX XXXX"
          maxLength={20}
          required
        />
        {errors.contactNumber && <p className="form-error">{errors.contactNumber}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-email">
          Email <small>Optional</small>
        </label>
        <input
          className="form-input"
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={160}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <fieldset className="form-field m-0 p-0">
        <span className="form-label">
          Service needed *
          <small id="service-hint">Pick the closest one</small>
        </span>
        <div className="chips" aria-describedby="service-hint" role="radiogroup">
          {SERVICE_OPTIONS.map((opt) => (
            <label key={opt.value} className="chip">
              <input type="radio" name="service" value={opt.value} checked={service === opt.value} onChange={() => setService(opt.value)} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.service && <p className="form-error">{errors.service}</p>}
      </fieldset>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-details">
          What would you like to print? *
        </label>
        <textarea
          className="form-textarea"
          id="lead-details"
          name="details"
          placeholder="Item, quantity, design notes — the more detail the faster we can quote."
          maxLength={2000}
          required
        />
        {errors.details && <p className="form-error">{errors.details}</p>}
      </div>

      <div className="form-field">
        <span className="form-label">
          Preferred contact <small>Optional</small>
        </span>
        <div className="chips" role="radiogroup">
          {CONTACT_METHODS.map((opt) => (
            <label key={opt.value} className="chip">
              <input type="radio" name="preferredContact" value={opt.value} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="lead-source">
          How did you hear about us? <small>Optional</small>
        </label>
        <select className="form-select" id="lead-source" name="source" defaultValue="">
          <option value="">—</option>
          {SOURCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot — real visitors never see or fill this */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="lead-website">
          Website
          <input className="form-input" id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" value="on" required />
        <span>
          I agree that Printabilya may contact me about this request. *<br />
          <small className="text-muted-paper">
            No spam. Your info is only used to answer this inquiry.{" "}
            <a href="https://facebook.com/printabilya" target="_blank" rel="noopener">
              See us on Facebook
            </a>
          </small>
        </span>
      </label>
      {errors.consent && <p className="form-error -mt-4 mb-4">{errors.consent}</p>}

      {siteKey && (
        <div className="form-field">
          <div ref={tsSlotRef} className="turnstile-slot" />
        </div>
      )}

      <button className="btn btn--block" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send request"}
        {status !== "sending" && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p className="form-note mt-3 mb-0 text-center">Fields marked * are required.</p>
    </form>
  );
}
