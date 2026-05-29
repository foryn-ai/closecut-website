# New Brand Setup Checklist

> **AI agent reading this:** Do not rewrite or scaffold from scratch. The infrastructure, components, and copy pipeline are the template. The therafox content is the example to replace. Work through the numbered steps below in order.

This repo is a GitHub template. After clicking **Use this template**, follow these steps to swap in a new brand. The therafox content serves as a working example — replace it, don't delete the structure.

---

## 1. Brand config (start here)

Edit **`src/lib/brand.config.ts`** — this is the single file that controls the most-referenced brand tokens:

| Constant | What it controls |
|---|---|
| `BRAND_NAME` | Site name used in structured data |
| `LOGO_PACK_DIR` | Public path to your logo directory |
| `WORDMARK_SRC` | Path to the SVG used in the header and footer |
| `ANALYTICS_CONVERSION_ID` | Google Ads conversion ID (`AW-XXXXXXXXX`). Set to `""` to disable. |

---

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `SMTP_USER`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` — your domain's email
- `GOOGLE_APPS_SCRIPT_ANALYTICS_WEBHOOK_URL` — new Apps Script deployment
- `GOOGLE_SHEETS_ANALYTICS_SHEET_NAME` — use a unique name per site
- `ANALYTICS_HASH_SALT` — generate a fresh random string
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — new Redis instance (or share one)

---

## 3. Copy (visible text)

**`src/lib/copy/therafoxWebsite.ts`** — the primary source of truth for all visible site copy (~3000 lines). Replace the content of the `SITE_COPY` export:

- `nav.brand` — the brand name shown in the nav
- `footer.locationsLabel` / `footer.locationsText` — practice address
- All page sections: `home`, `therapy`, `about`, `contact`, `billing`, `resources`, `fortyEight`

**Adding or removing pages:** The `SiteCopyShape` type uses `& Record<string, unknown>` on each top-level section, so you can add new page keys (e.g. `coaching: { ... }`) without modifying the type file. Remove sections for pages your brand does not use. See the **New page recipe** section in `README.md` for the full pattern.

Use the copy draft workflow (`npm run copy:schema` + `npm run copy:apply`) to generate first-draft copy from `BRAND_BRIEF.md` via AI chat. See `README.md` for the workflow.

---

## 4. SEO and metadata

**`src/lib/seo/siteMetadata.ts`** — all page titles, descriptions, OpenGraph, Twitter cards, and structured data. Update `SITE_URL` (line 5) and:

- `THERAFOX_SITE_SEO` — site-level title and description
- `PAGE_SEO` — title, description, and canonical path per page
- `SITE_STRUCTURED_DATA` — Organization and WebSite schema (name, URL)
- `INTENSIVE_SEO` — intensive service SEO if you're keeping that feature
- `AI_DISCOVERY` — llms.txt discovery content

The file is re-exported via **`src/lib/seo/intensive.ts`** — all app code imports from that path, so don't change the import paths.

---

## 5. Logo and favicon

Replace the entire **`public/therafox_logo_pack/`** directory with your brand's logo pack. Expected structure:

```
public/
  your_logo_pack/
    favicon/
      favicon.ico
      favicon-16x16.png
      favicon-32x32.png
      apple-touch-icon.png
      android-chrome-192x192.png
      android-chrome-512x512.png
      site.webmanifest          ← update "name" and "short_name" inside
    wordmark/
      your-wordmark.svg
    mark/
      your-mark.svg
```

Update `LOGO_PACK_DIR` and `WORDMARK_SRC` in `brand.config.ts` to match.

---

## 6. Colors

**`app/(site)/globals.css`** — CSS custom properties at the top of the file:

```css
--primary: #6b7f6d;       /* main brand color */
--accent: #d4af37;        /* accent / highlight */
--accent-warm: #c96d42;   /* warm accent (home page hero) */
```

Surface, border, and shadow colors are derived from these. The home page and interior page shell gradients are in the same file.

---

## 7. Package name

**`package.json`** → `"name"` field. Change from `my-site` to your project slug.

---

## 8. Analytics salt (webmanifest)

**`public/your_logo_pack/favicon/site.webmanifest`** — update `"name"` and `"short_name"` to your brand name.

---

## 9. Payload CMS defaults

**`payload.config.ts`** seeds CMS field defaults from `SITE_COPY`. After updating the copy file, run:

```bash
npm run payload -- migrate:fresh
```

to reset the CMS to the new defaults (dev only — this drops all CMS data).

---

## 10. Clean up therafox-specific reference material

Delete the `archive/` directory — it contains therafox strategy docs, worksheet drafts, and development history that have no place in a new brand repo:

```bash
rm -rf archive/
```

Also update `AGENTS.md` with your brand's narrative and voice rules (the placeholders are marked with `<!-- -->` comments).

---

## Checklist summary

- [ ] `src/lib/brand.config.ts` — BRAND_NAME, SITE_URL, LOGO_PACK_DIR, WORDMARK_SRC, ANALYTICS_CONVERSION_ID
- [ ] `.env.local` — email, analytics, Redis, salt
- [ ] `src/lib/copy/therafoxWebsite.ts` — all visible copy
- [ ] `src/lib/seo/bridgeWeekend.ts` — all SEO metadata and structured data
- [ ] `public/therafox_logo_pack/` → replaced with new logo pack
- [ ] `app/(site)/globals.css` — brand colors
- [ ] `package.json` → `"name"`
- [ ] `public/.../site.webmanifest` → `"name"` and `"short_name"`
- [ ] `AGENTS.md` — brand narrative and voice rules
- [ ] `archive/` deleted
- [ ] Vercel project created, env vars added, domain configured
