# Going Live — Cloudflare

Everything runs on Cloudflare (domain, hosting, the `/api/lead` function, bot protection) plus a free Google Sheet for leads. Prices checked September 2026, at about ₱62.8 per US dollar.

## Cost

| Item | Cost |
|---|---|
| Domain `printabilya.com` (Cloudflare Registrar, cost price, same price at renewal) | ~$10.44/yr ≈ **₱660/yr** |
| Hosting (Cloudflare Pages free): unlimited visits and bandwidth, free HTTPS | ₱0 |
| `/api/lead` function: free up to 100,000 calls/day; visits don't count | ₱0 |
| Turnstile, DDoS protection, firewall, Bot Fight Mode | ₱0 |
| Google Sheet + Apps Script + email alerts | ₱0 |
| **Total** | **≈ ₱660/yr** |

Optional: `printabilya.ph` as a second domain (~$46/yr ≈ ₱2,900, not sold by Cloudflare; e.g., Dynadot or Porkbun). Optional: Cloudflare Email Routing to forward e.g. `hello@printabilya.com` to the shop's Gmail (free; receive only).

## Accounts and ownership

- **Cloudflare account:** ideally owned by Printabilya with Gian added as a member, or created by Gian with the shop's login details handed over. The client should always control their domain.
- **Google account for the leads sheet:** ideally printabilya@gmail.com, shared with Gian.
- **GitHub:** private repo for the code.

## Step by step

1. **Register the domain.** Cloudflare dashboard → Domain Registration → Register → `printabilya.com`. Turn on auto-renew. WHOIS privacy is included.
2. **Leads sheet.** Follow `integrations/google-sheets/SETUP.md`. Keep the `/exec` URL and shared secret.
3. **Turnstile widget.** Dashboard → Turnstile → Add widget → hostnames `printabilya.com` and `www.printabilya.com`, mode **Managed**. Keep the site key and secret key.
4. **Pages project.** Workers & Pages → Create → Pages → Connect to Git → pick the repo.
   - Framework preset: React (Vite). Build command `npm run build`. Output directory `dist`.
   - Settings → Variables and Secrets:
     - `VITE_TURNSTILE_SITE_KEY` as a plain variable (the site needs it at build time)
     - `TURNSTILE_SECRET_KEY`, `SHEETS_WEBHOOK_URL`, `SHEETS_SHARED_SECRET` as **encrypted** secrets
   - If the build complains about the Node version, add a `NODE_VERSION` variable matching your local `node -v`.
   - If the dashboard steers you to Workers instead of Pages, stop and check with Pi before continuing. The `functions/` folder setup here is the Pages way.
5. **Deploy and check the preview address** (`printabilya.pages.dev`): pages load, and a deep link like `/services/apparel` loads on refresh. That works automatically because the build has no `404.html` (see `AGENTS.md`).
6. **Custom domain.** Pages project → Custom domains → add `printabilya.com` and `www.printabilya.com`. DNS and HTTPS are set up automatically because the domain is on Cloudflare.

## Security checklist (all free)

- [ ] **Bot Fight Mode** on (Security → Bots). Afterwards, check a link in Facebook's Sharing Debugger to confirm previews still work.
- [ ] **Rate limiting rule** (Security → WAF → Rate limiting rules; free plan allows 1): path equals `/api/lead`, more than 5 requests per 10 seconds from the same IP → Block.
- [ ] **Turnstile** keys set to the production ones (test keys never go live).
- [ ] **`pages.dev` redirect:** `printabilya.pages.dev` isn't covered by the domain's security rules. Redirect it to `printabilya.com` using Cloudflare's guide for redirecting `*.pages.dev` to a custom domain.
- [ ] **AI crawlers:** leave allowed unless scraping becomes a problem. Blocking them also hides the shop from AI search tools.
- [ ] **Apps Script** web app deployed as "Execute as: Me / Anyone", with `SHARED_SECRET` set, so requests without the secret write nothing.

## Launch test (on a phone, over mobile data)

- [ ] Submit a real test lead → row appears in the sheet, email alert arrives. Delete the test row.
- [ ] Open a service page directly by URL, and refresh it
- [ ] Shared link preview looks right in Facebook's Sharing Debugger
- [ ] `http://` redirects to `https://`, and `www` works

## After launch

- **Google Search Console:** verify the domain (easy with DNS on Cloudflare) and submit `sitemap.xml`. Pi should add a static one in `public/` listing every route.
- **Google Business Profile:** add the website link.
- **Facebook page:** update the website field (most traffic comes from here).

## Updating the live site

Every push to the main branch redeploys automatically. Other branches get their own preview URLs, which are handy for showing the client changes before they go live. Per `AGENTS.md`, production deploys need Gian's go-ahead.
