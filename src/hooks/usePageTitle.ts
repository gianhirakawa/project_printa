import { useEffect } from "react";

/** Sets the browser tab title for a route (SPECS.md: per-route titles). */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
