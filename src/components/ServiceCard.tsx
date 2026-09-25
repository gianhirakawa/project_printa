import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../content/services.ts";

interface ServiceCardProps {
  service: Service;
  /** Zero-padded index, e.g. "02" */
  num: string;
  total: string;
  /** Homepage variant shows the bullet list */
  variant?: "full" | "compact";
}

export default function ServiceCard({ service, num, total, variant = "full" }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      className={`group flex no-underline ${
        variant === "full" ? "flex-col gap-5 p-6 md:p-7" : "flex-col gap-3 p-6"
      } rounded-md border-2 border-ink bg-white text-ink shadow-[5px_5px_0_0_var(--color-ink)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-ink)]`}
      to={`/services/${service.slug}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-2">
          <Icon className="h-6 w-6 text-brand-bright" aria-hidden="true" />
        </span>
        <span className="font-mono text-[12px] tracking-[0.18em] text-muted-paper">
          {num} / {total}
        </span>
      </div>

      <h3 className="text-[24px] md:text-[26px]">{service.title}</h3>

      {variant === "full" ? (
        <ul className="m-0 list-none space-y-2 p-0 text-[15px]">
          {service.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-[15px] text-muted-paper">{service.shortDescription}</p>
      )}

      <span className="mt-auto inline-flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-brand">
        {service.exploreLabel}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
