# Repo instructions

## What this repo is

A production Next.js site that doubles as a GitHub template for new branded sites. The therafox content is the working example — it is replaceable content, not coupled code. For the full agent guide including new brand mode, see `CLAUDE.md`.

**Do not suggest rewriting or scaffolding from scratch.** Replace content. Follow `BRAND.md`.

---

## Structural rules

- No em dashes in any code comments, UI copy, or docs.
- No clinical content.
- Keep language private, precise, and product focused.
- All visible copy must live in `src/lib/copy/intensive.ts` (re-exports from `src/lib/copy/therafoxWebsite.ts`).
- All SEO strings must live in `src/lib/seo/intensive.ts` (re-exports from `src/lib/seo/siteMetadata.ts`).
- Do not add copy inline in components — always route it through the copy file.

## Brand identity

- Brand name, site URL, logo paths, analytics ID, contact info: `src/lib/brand.config.ts`
- Brand colors: CSS custom properties in `app/(site)/globals.css` (--primary, --accent, --accent-warm)
- Typefaces: Playfair Display (headings), Inter (UI and body)
- Motion: Framer Motion fade-in, duration 0.8s, gentle easing; buttons scale to 1.02 on hover

## Voice
<!-- Replace this section with your brand's voice rules and terminology.
- Use [preferred term] instead of [avoided term].
- Avoid [type of language].
-->

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run copy:schema <section>
npm run copy:apply <section>
```
