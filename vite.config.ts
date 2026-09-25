import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev: the Cloudflare Pages Function runs under `wrangler pages dev`
    // on :8788; Vite proxies /api so the leads form works in the browser.
    proxy: {
      "/api": "http://localhost:8788",
    },
  },
});
