import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "@fontsource/anton";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "@fontsource-variable/dm-sans";
import "./index.css";
import App from "./App.tsx";

// GitHub Pages client preview: the site is served from a subpath
// (`https://<user>.github.io/<repo>/`) with no SPA fallback, so routes
// must live in the URL hash there. Production (Cloudflare Pages) and
// local dev use normal history routing.
const isGitHubPages =
  typeof window !== "undefined" && window.location.hostname.endsWith(".github.io");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isGitHubPages ? (
      <HashRouter>
        <App />
      </HashRouter>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);
