import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// GitHub Pages client preview (see .github/workflows/gh-pages.yml): the
// site is served from https://<user>.github.io/project_printa/, so asset
// URLs need that base path. Cloudflare Pages and local dev use "/".
const base = process.env.GH_PAGES === "1" ? "/project_printa/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev: the Cloudflare Pages Function runs under `wrangler pages dev`
    // on :8788; Vite proxies /api so the leads form works in the browser.
    proxy: {
      "/api": "http://localhost:8788",
    },
  },
});
