import { useEffect } from "react";

/**
 * Sets the per-route document.title and meta description (SPECS.md: per-route
 * titles + descriptions so browser tabs and Google show the right page).
 */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
