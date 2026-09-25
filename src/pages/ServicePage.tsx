import { ArrowRight } from "lucide-react";
import Button from "../components/Button.tsx";
import { getService } from "../content/services.ts";
import { usePageTitle } from "../hooks/usePageTitle.ts";

/**
 * Service category page — placeholder until M1.3.
 * Clearly marked "coming soon"; real intro, bullets and gallery land then.
 */
export default function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  usePageTitle(service ? `${service.title} | Printabilya` : "Service | Printabilya");

  if (!service) return null;
  const Icon = service.icon;

  return (
    <section className="section section--ink halftone">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-6">
        <div className="flex items-center gap-3">
          <span className="eyebrow">Service</span>
          <span className="badge-soon">Coming soon</span>
        </div>
        <h1 className="max-w-[900px] text-display-2">{service.title}</h1>
        <div className="flex flex-wrap items-start gap-x-5 gap-y-4">
          <Icon className="mt-1.5 h-10 w-10 text-brand-bright" aria-hidden="true" />
          <p className="max-w-[520px] text-lead">
            This page is next on the build list. In the meantime, tell us what you want printed and we'll take it from
            there.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/#quote">
            Request a quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button to="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
