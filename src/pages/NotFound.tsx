import { usePageTitle } from "../hooks/usePageTitle.ts";
import Button from "../components/Button.tsx";

export default function NotFound() {
  usePageTitle("Page not found | Printabilya");
  return (
    <section className="section section--ink halftone">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-6">
        <p className="eyebrow">Error 404</p>
        <h1 className="text-display-2">
          This page <span className="sticker-text">isn't printed.</span>
        </h1>
        <p className="max-w-[560px] text-lead">
          The page you're looking for doesn't exist. Head back to the homepage or browse the services.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button to="/">Back to home</Button>
          <Button to="/services/apparel" variant="ghost">
            Browse services
          </Button>
        </div>
      </div>
    </section>
  );
}
