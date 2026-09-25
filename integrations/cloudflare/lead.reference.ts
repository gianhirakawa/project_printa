/**
 * REFERENCE IMPLEMENTATION for milestone M1.4.
 * Pi: copy to `functions/api/lead.ts` → Cloudflare Pages serves it at POST /api/lead.
 * Needs dev deps: wrangler, @cloudflare/workers-types (see content/leads-form-schema.md).
 *
 * Browser form → this function → Google Apps Script web app → "Leads" sheet.
 * Secrets come from Cloudflare (production) or .dev.vars (local). Never from the frontend.
 */

interface Env {
  TURNSTILE_SECRET_KEY: string;
  SHEETS_WEBHOOK_URL: string;   // Apps Script /exec URL
  SHEETS_SHARED_SECRET: string; // must match SHARED_SECRET in the Apps Script
}

const SERVICES = ["apparel-sublimation", "uv-printing", "signage", "business", "other"];
const CONTACT_METHODS = ["call", "sms", "messenger", "email"];
const SOURCES = ["facebook", "referral", "local", "other"];

const str = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const reply = (status: number, error?: string): Response =>
  Response.json(error ? { ok: false, error } : { ok: true }, { status });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(400, "invalid_json");
  }

  // 1. Honeypot: real visitors never see the "website" field. Pretend success, save nothing.
  if (str(body.website, 200)) return reply(200);

  // 2. Turnstile: prove a real browser filled the form.
  const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: str(body.turnstileToken, 2048),
      remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
    }),
  });
  const outcome = await check.json<{ success: boolean }>();
  if (!outcome.success) return reply(403, "verification_failed");

  // 3. Validate: same rules as the frontend, because the frontend can be bypassed.
  const lead = {
    fullName: str(body.fullName, 120),
    contactNumber: str(body.contactNumber, 30),
    email: str(body.email, 160),
    service: str(body.service, 40),
    details: str(body.details, 2000),
    preferredContact: str(body.preferredContact, 20),
    source: str(body.source, 20),
    page: str(body.page, 200),
  };
  if (!lead.fullName || !lead.details || body.consent !== true) return reply(422, "missing_fields");
  if (!SERVICES.includes(lead.service)) return reply(422, "invalid_service");
  if (!/^[0-9+()\-\s]{7,20}$/.test(lead.contactNumber)) return reply(422, "invalid_phone");
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return reply(422, "invalid_email");
  if (!CONTACT_METHODS.includes(lead.preferredContact)) lead.preferredContact = "";
  if (!SOURCES.includes(lead.source)) lead.source = "";

  // 4. Save to the sheet. Apps Script answers POST with a redirect; fetch follows it.
  try {
    const res = await fetch(env.SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.SHEETS_SHARED_SECRET, lead }),
      redirect: "follow",
    });
    const saved = await res.json<{ ok: boolean }>();
    if (!saved.ok) return reply(502, "save_failed");
  } catch {
    return reply(502, "save_failed");
  }

  return reply(200);
};
