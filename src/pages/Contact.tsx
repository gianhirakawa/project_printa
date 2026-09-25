import ContactDetails from "../components/ContactDetails.tsx";
import LeadForm from "../components/LeadForm.tsx";
import { usePageTitle } from "../hooks/usePageTitle.ts";

export default function Contact() {
  usePageTitle(
    "Contact & Quotes | Printabilya",
    "Contact Printabilya for a quote on custom apparel, signage, stickers and promotional materials in Mamburao, Occidental Mindoro."
  );

  return (
    <main>
      <section id="quote" className="section section--paper">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-3 text-display-3">
              Tell us what to <span className="sticker-text">print</span>
            </h1>
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
