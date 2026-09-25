# Leads → Google Sheet: setup

One-time setup, done by Gian in a browser. This part isn't built by Pi. Cost: ₱0.

```
Website form → POST /api/lead (Cloudflare function) → Apps Script web app → "Leads" sheet
                  checks Turnstile, honeypot,            checks shared secret,  + email alert
                  validates fields                        appends a row          to the shop
```

## 1. Create the sheet

- Use the Google account that should **own the leads**. Ideally that's Printabilya's own (printabilya@gmail.com), shared with Gian as editor, so the client keeps their data if you ever hand off.
- Create a spreadsheet, e.g. "Printabilya Website Leads". The `Leads` tab and header row are created automatically on the first lead.

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Replace the default code with the contents of `Code.gs` from this folder. Save.
3. **Project Settings (gear icon) → Script Properties → Add**:
   - `SHARED_SECRET`: a long random string. Generate one with `openssl rand -hex 32`, or type about 40 random characters.
   - `NOTIFY_EMAIL`: e.g. `printabilya@gmail.com` (comma-separate to add more). Leave it out to skip emails.
4. In the editor, choose `testDoPost` in the function dropdown → **Run**. Approve the permissions prompt (Sheets + send email). You should see `{"ok":true}` in the log, a new row in the sheet, and an email. Delete the test row.

## 3. Deploy as a web app

1. **Deploy → New deployment → type: Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Deploy, then copy the **Web app URL** (ends in `/exec`).

"Anyone" is required so Cloudflare can call it without a Google login. The shared secret is what keeps others out: requests without it get `unauthorized` and nothing is written.

## 4. Give Cloudflare the values

In the Cloudflare Pages project (see `DEPLOY.md`), add these as **Secrets**:

| Name | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | The `/exec` URL from step 3 |
| `SHEETS_SHARED_SECRET` | Same string as `SHARED_SECRET` in step 2 |

For local development, put the same two lines in `.dev.vars` (gitignored). Better still, point local dev at a separate test copy of the sheet.

## Updating the script later

Editing `Code.gs` doesn't change the live web app by itself. Go to **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. This keeps the same URL. Creating a *new deployment* instead gives a new URL, and Cloudflare would need updating.

## Limits (free Gmail account)

- Email alerts: 100 recipients a day. Far above what a local shop's form will see. If alerts ever stop, leads are still saved to the sheet.
- 30 simultaneous executions. Fine for a contact form.
- Each request takes 1–3 seconds (Apps Script is not instant). The form shows a "sending" state while it waits.

## Troubleshooting

- **`unauthorized`:** the secret in Cloudflare doesn't match the Script Property, or the property name has a typo.
- **Cloudflare gets HTML instead of JSON:** the deployment isn't set to "Anyone", or the URL is the editor URL instead of the `/exec` URL.
- **Phone numbers lose the leading 0:** the script already stores them as text. If you edited the sheet by hand, set that column's format to Plain text.
