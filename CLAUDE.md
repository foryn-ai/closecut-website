# Claude Code instructions

## What this repo is

A production Next.js site (therafox.com) that doubles as a GitHub template for spinning up new branded clinical practice or coaching sites. The therafox content is the working example — it is not coupled code, it is replaceable content.

**Do not suggest rewriting or scaffolding from scratch.** The infrastructure, component system, copy pipeline, and audit suite are the value. For a new brand, you replace content and follow the checklist — you do not rebuild.

---

## Two modes

### Production mode (default — working on therafox.com)
Normal development. Edit copy, SEO, components, features. All rules below apply.

### New brand mode (spinning up a different site from this template)
Triggered when: user names a different brand, different domain, different practitioner, or describes a site that is clearly not therafox.

**In new brand mode:**
1. Open `BRAND_BRIEF.md` — ask the user to fill it in if it is empty.
2. Follow `BRAND.md` — it is the complete step-by-step checklist.
3. Use the copy draft workflow — do not write copy directly.
4. Replace content in the files listed below. Do not restructure them.
5. Do not create new components unless the new brand genuinely needs UI that does not exist.
6. Do not delete pages without confirming — they may just need content replaced.

---

## File map — what to touch for each type of change

| What you want to change | File |
|---|---|
| Brand name, logo path, analytics ID | `src/lib/brand.config.ts` |
| Site URL (used in all SEO and sitemaps) | `src/lib/seo/siteMetadata.ts` → `SITE_URL` |
| Practitioner name, specialty, city, phone, rate | `src/lib/brand.config.ts` |
| All visible copy (headlines, body, CTAs, FAQs) | `src/lib/copy/therafoxWebsite.ts` |
| Nav links and brand wordmark label | `src/lib/copy/therafoxWebsite.ts` → `SITE_COPY.nav` |
| Page titles, descriptions, OG tags | `src/lib/seo/siteMetadata.ts` |
| Structured data (Organization, WebSite schema) | `src/lib/seo/siteMetadata.ts` → `SITE_STRUCTURED_DATA` |
| Brand colors | `app/(site)/globals.css` → `:root` custom properties |
| Header and footer wordmark image | `src/lib/brand.config.ts` → `WORDMARK_SRC` |
| Favicon and PWA manifest | `public/<logo_pack>/favicon/` |
| Environment variables | `.env.local` (copy from `.env.example`) |
| New page | See **New page recipe** in `README.md` |

---

## Copy draft workflow (for new brand copy)

```bash
npm run copy:schema <section>   # export current values as JSON template
# → paste into Claude.ai with BRAND_BRIEF.md → get filled copy back
npm run copy:apply <section>    # apply filled JSON to therafoxWebsite.ts
npm run audit:copy && npm run typecheck
```

Available sections: `nav`, `footer`, `home`, `therapy`, `about`, `contact`, `billing`, `resources`, `fortyEight`.

---

## Structural rules (both modes)

- No em dashes anywhere — not in copy, comments, or docs.
- No clinical content.
- Keep language private, precise, and product-focused.
- All visible copy lives in `src/lib/copy/intensive.ts` (facade over `therafoxWebsite.ts`).
- All SEO strings live in `src/lib/seo/intensive.ts` (facade over `siteMetadata.ts`).
- Never write copy inline in components — always route through the copy file.

## Component catalog (dev only)

Run `npm run dev` and visit `/playground/components` to browse all shared UI building blocks before designing a new page. Visit `/playground/furniture` for available illustration assets.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run audit:copy
npm run audit:all
npm run build
npm run copy:schema <section>
npm run copy:apply <section>
```

## Verify sequence before committing

```bash
npm run audit:copy && npm run audit:copy-guardrails && npm run lint && npm run typecheck && npm run test && npm run build
```
