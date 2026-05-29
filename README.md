# Therafox

## Using this template
This repo is a GitHub template for branded therapy/clinical practice sites. To spin up a new brand:
1. Click **Use this template** on GitHub to create a new repo.
2. Follow **[BRAND.md](BRAND.md)** — the step-by-step setup checklist.
3. Copy `.env.example` to `.env.local` and fill in your values.
4. Delete the `archive/` directory — it contains therafox-specific reference material.

---

## Overview
A Next.js App Router site with practice pages, a resources library, and an Intensive planning experience (48-hour private couples intensive). Payload CMS is optional and disabled by default.

## Codex session prep
- Web session runbook: `archive/docs/codex-web-session.md`
- Clinician request template: `archive/docs/clinician-copy-request-template.md`
- Launch workflow baseline is set for repo-first deployment on Vercel.

## Key routes
- /
- /therapy
- /about
- /billing
- /contact
- /resources
- /resources/[slug]
- /intensive

## Product architecture
- Brand tokens (name, URL, logo paths, analytics ID): `src/lib/brand.config.ts`
- Visible site copy source of truth: `src/lib/copy/intensive.ts`
- SEO source of truth: `src/lib/seo/intensive.ts`
- Planner state and pricing logic: `src/lib/pricing/intensive.ts`
- Copy export scripts: `scripts/export-intensive-copy.cjs`, `scripts/export-site-review.cjs`, `scripts/export-resources-review.cjs`
- Review export script: `scripts/export-intensive-review.cjs`
- Worksheet pipeline scripts: `scripts/worksheet/*.cjs` and `scripts/worksheet/icons.py`
- Contact form endpoint: `app/(site)/api/contact/route.ts`
- Intensive waitlist endpoint: `app/(site)/api/waitlist/route.ts`
- Workshops waitlist endpoint: `app/(site)/api/workshops-waitlist/route.ts`
- Share short-link endpoint: `app/(site)/api/share/route.ts`
- Share short-link redirect route: `app/(site)/s/[code]/route.ts`
- Intensive route metadata and JSON-LD: `app/(site)/intensive/page.tsx`
- Security headers baseline: `next.config.ts`
- Homepage interactive office hero: `src/components/home/OfficeHeroScene.tsx`
- Homepage hero placement and hotspot config: `src/components/home/officeHeroConfig.ts`
- Homepage hotspot config tests: `src/components/home/officeHeroConfig.test.ts`
- Furniture asset catalog helper: `src/lib/assets/furnitureCatalog.ts` with assets in `public/furniture`
- Resources books data and tags: `src/lib/copy/therafoxWebsite.ts` (`resources.booksTags`, `resources.booksFeaturedIds`, `resources.booksCatalog`)
- Resources books UI module: `src/components/resources/ResourcesLibraryV2.tsx`
- Resources books schema builder: `src/lib/seo/resources.ts` (`buildResourcesBooksSchema`)
- Homepage in-band contact form: `src/components/home/HomeStartHereForm.tsx`
- Homepage areas-of-interest module: `src/components/home/AreasOfInterestBanner.tsx`
- About modalities banner: `src/components/about/ModalitiesBanner.tsx`
- Shared page hero module: `src/components/shared/PageHeroHeader.tsx`
- Shared hero furniture image: `src/components/shared/HeroFurnitureImage.tsx`
- Shared FAQ schema builder: `src/lib/seo/structuredData.ts`
- Route consistency test: `src/lib/seo/routeConsistency.test.ts`
- Logo pack source and exports: `public/therafox_logo_pack/` (update path in `src/lib/brand.config.ts` for new brands)
- Books CMS prep guide: `archive/docs/books-cms-prep.md`

## New page recipe

Follow this pattern exactly when adding a page that does not already exist.

**1. Copy section** — add a new key to `SITE_COPY` in `src/lib/copy/therafoxWebsite.ts`:
```typescript
mypage: {
  heroFurnitureSrc: "/furniture/your-asset.png",
  heroFurnitureAlt: "Alt text",
  heroTitle: "Page title",
  heroSubtitle: "Page subtitle",
  faqTitle: "Common questions",
  faqIconSrc: "/icons/icon-faq.svg",
  faqItems: [],
} satisfies Record<string, unknown>,
```
The `SiteCopyShape` type uses `& Record<string, unknown>` on each section — new page keys are accepted without touching the type file.

**2. SEO** — add entries to `src/lib/seo/siteMetadata.ts`:
```typescript
// Inside PAGE_SEO:
mypage: {
  title: "Page Title | Brand Name",
  description: "...",
  canonicalPath: "/mypage",
  openGraph: { title: "...", description: "...", imageAlt: "..." },
  twitter: { title: "...", description: "..." },
},
```

**3. Layout** — `app/(site)/mypage/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";
export const metadata: Metadata = {
  title: PAGE_SEO.mypage.title,
  description: PAGE_SEO.mypage.description,
  alternates: { canonical: PAGE_SEO.mypage.canonicalPath },
  openGraph: { ...PAGE_SEO.mypage.openGraph, type: SEO_TYPES.openGraphWebsite, images: [{ ...SEO_IMAGES.openGraph, alt: PAGE_SEO.mypage.openGraph.imageAlt }] },
  twitter: { card: SEO_TYPES.twitterCard, ...PAGE_SEO.mypage.twitter, images: [SEO_IMAGES.twitter] },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
```

**4. Page** — `app/(site)/mypage/page.tsx`:
```typescript
import { Section } from "@/components/shared/Section";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { SITE_COPY } from "@/lib/copy";
const copy = SITE_COPY.mypage;
export default function MyPage() {
  return (
    <>
      <PageHeroHeader title={copy.heroTitle} subtitle={copy.heroSubtitle} imageSrc={copy.heroFurnitureSrc} imageAlt={copy.heroFurnitureAlt} />
      <Section>{ /* page content */ }</Section>
    </>
  );
}
```

**5. Sitemap** — add route to `app/sitemap.ts`.

**6. Route test** — add to `src/lib/seo/routeConsistency.test.ts`.

**7. Nav** — add to `SITE_COPY.nav.links` in `src/lib/copy/therafoxWebsite.ts` if the page should appear in navigation.

## Copy workflow
1. Edit visible copy in `src/lib/copy/intensive.ts`.
2. Edit SEO strings in `src/lib/seo/intensive.ts`.
3. Run checks and build.

## Copy draft workflow (AI chat input)

Use this when feeding copy from a Claude.ai or ChatGPT session into the codebase. The coding agent does not write copy — it only applies structured input.

**1. Fill in `BRAND_BRIEF.md`** with practitioner name, specialty, voice, etc.

**2. Export a section template:**
```bash
npm run copy:schema home > copy-drafts/home.json
npm run copy:schema about > copy-drafts/about.json
```
This writes a flat JSON object of all string fields in that section, pre-filled with current values.

**3. In Claude.ai or ChatGPT:**
- Paste `BRAND_BRIEF.md` (the filled brief)
- Paste the JSON template from step 2
- Prompt: *"Fill in this JSON copy template for the brand described above. Keep all keys exactly as-is. Only change string values. Do not invent clinical claims. Match the voice and terminology described."*

**4. Save the AI output** to `copy-drafts/<section>.json` (same filename as step 2).

**5. Apply:**
```bash
npm run copy:apply home
npm run copy:apply about
```
The script replaces matched string fields in `therafoxWebsite.ts` and reports what was applied vs. what needs manual attention (arrays, nested objects, ambiguous keys).

**6. Verify:**
```bash
npm run audit:copy && npm run typecheck
```

**Notes:**
- `copy-drafts/*.json` files are gitignored — they are working files, not source of truth.
- Fields skipped by the apply script (arrays, FAQ items, service lists) must be edited manually in `therafoxWebsite.ts`.
- SEO strings are not handled by this workflow — edit `src/lib/seo/siteMetadata.ts` directly.

## Logo pack workflow
1. Put source vectors in `public/<your_logo_pack>/source/wordmark.svg` and `.../source/mark.svg`.
2. Regenerate exports in the `wordmark/`, `mark/`, and `favicon/` subdirectories.
3. Update `LOGO_PACK_DIR` and `WORDMARK_SRC` in `src/lib/brand.config.ts`.
4. Update `public/<your_logo_pack>/favicon/site.webmanifest` with the new `name` and `short_name`.

## Furniture workflow
1. Add source assets to `public/furniture`.
2. Use kebab-case filenames (lowercase, hyphen separated). Avoid spaces and mixed casing.
3. Review assets on `/playground/furniture` before placement.
4. Suggested alt text and display labels are generated in `src/lib/assets/furnitureCatalog.ts`.
5. Place homepage hero assets and hotspots via `src/components/home/officeHeroConfig.ts`.
6. For mobile hero composition, use `max-sm:*` placement overrides per object.

## Resources books workflow
1. Add or update covers in `public/books`.
2. Keep book metadata in `src/lib/copy/therafoxWebsite.ts` under `resources.booksCatalog`.
3. Run `npm run audit:books` to validate IDs, tags, and local cover paths.
4. Run `npm run books:cms-seed` to export `artifacts/books-cms-seed.json` for future CMS import.
5. Keep implementation notes in `archive/docs/books-cms-prep.md`.

## Future Codex copy update rule
- Treat `src/lib/copy/intensive.ts` as the only editable source for visible copy.
- Do not add or reintroduce slot systems, lorem toggles, CSV import pipelines, or copy resolvers.
- If a page still has hardcoded visible text in JSX, move it into `src/lib/copy/intensive.ts` before changing that copy.
- Keep user facing accessibility text with copy, including `alt` text and `aria-label` values.
- Keep all SEO strings in `src/lib/seo/intensive.ts`.
- After copy edits run `npm run lint`, `npm run typecheck`, and `npm run build`.
- `npm run audit:copy` enforces no literal `alt`, `aria-label`, `title`, or `placeholder` strings in `app` and `src/components`.
- `npm run audit:copy-guardrails` enforces additional wording and punctuation guardrails on copy source.

## Commands
- npm run dev
- npm run lint
- npm run typecheck
- npm run test
- npm run audit:copy
- npm run audit:copy-guardrails
- npm run audit:a11y
- npm run audit:hygiene
- npm run audit:colors
- npm run audit:seo
- npm run audit:faq
- npm run audit:resources
- npm run audit:books
- npm run audit:images
- npm run audit:analytics
- npm run audit:headers
- npm run audit:sitemap
- npm run audit:deps
- npm run audit:api
- npm run audit:all
- npm run build
- npm run review:export
- npm run resources:review
- npm run analyze
- npm run books:cms-seed
- npm run worksheet:new
- npm run worksheet:icons
- npm run worksheet:generate
- npm run worksheet:content-check
- npm run worksheet:lint
- npm run worksheet:render
- npm run worksheet:pdf
- npm run worksheet:review-bundle

## Worksheet workflow
1. Create or edit a topic draft in `worksheets/drafts/<resource-slug>_worksheet.md`.
2. Select icons from `public/icons` with `npm run worksheet:icons`.
3. Optionally generate copy with `npm run worksheet:generate` after setting `OPENAI_API_KEY`.
4. Run `npm run worksheet:content-check` and `npm run worksheet:lint`.
5. Export HTML and PDF with `npm run worksheet:render` and `npm run worksheet:pdf`.
6. Build clinician review package with `npm run worksheet:review-bundle` (writes to `artifacts/worksheet-review/<timestamp>`).

## Mail env
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE` (`true` or `false`, optional)
- `CONTACT_TO_EMAIL` (optional, defaults to `SMTP_USER`)
- `CONTACT_FROM_EMAIL` (optional, defaults to `SMTP_USER`)
- `WAITLIST_TO_EMAIL` (optional, defaults to `CONTACT_TO_EMAIL`)
- `WAITLIST_FROM_EMAIL` (optional, defaults to `CONTACT_FROM_EMAIL` or `SMTP_USER`)
- `UPSTASH_REDIS_REST_URL` (optional, enables shared rate limits and short-link storage)
- `UPSTASH_REDIS_REST_TOKEN` (optional, enables shared rate limits and short-link storage)

## CMS env
- `ENABLE_CMS` (`true` to enable `/cms` and payload APIs, optional)
- `PAYLOAD_SECRET` (required only when `ENABLE_CMS=true`)
- `DATABASE_URL` (required only when `ENABLE_CMS=true`)

## Minimal launch env (repo-first)
- You can launch without CMS by leaving `ENABLE_CMS` unset.
- For forms/email, configure SMTP vars above.
- Without SMTP, contact/waitlist APIs return `email_not_configured`.
- With SMTP configured, forms deliver to `CONTACT_TO_EMAIL` when set, otherwise to `SMTP_USER`.

## Current behavior notes
- Contact form is live and sends email through SMTP.
- Homepage hero is a full-bleed office scene with furniture placements and hotspot geometry from `src/components/home/officeHeroConfig.ts`.
- Mobile hero currently keeps couch, office chair, and main wall art only.
- Top nav remains visible on homepage for orientation while hero scene handles exploratory navigation.
- Site heroes for Therapy, About, Resources, Billing, Contact, and Intensive use a consistent shared hero structure with furniture images.
- Intensive waitlist form posts to `/api/waitlist` with rate limit and honeypot checks.
- Workshops waitlist form posts to `/api/workshops-waitlist` with rate limit and honeypot checks.
- Intensive share links carry encoded planner state and open directly in share view.
- Share links default to short links from `/s/{code}` (30 day TTL). Storage uses Upstash Redis when configured, with in-memory fallback.
- Intensive waitlist email includes share link and planner summary when a draft exists.
- Share mode hides site header/footer and top marketing sections, then renders a report-style draft view.
- Export PDF opens browser print/save directly from hidden iframe render.
- Repo hygiene blocks `*:Zone.Identifier` files via `npm run audit:hygiene`.
- CI runs lint, typecheck, test, copy audit, accessibility audit, hygiene audit, and build.

## Intensive feature prep checklist
- Keep visible copy for all new planner states in `src/lib/copy/intensive.ts`.
- Keep SEO changes for `/intensive` in `src/lib/seo/intensive.ts`.
- Reuse `app/(site)/api/waitlist/route.ts` for email capture, then expand payload fields when CRM wiring is ready.
- Configure Upstash Redis before moving to multi-instance deploys so rate limiting and short links are shared across instances.

## Typography quick guide
- Display: `Playfair Display` (`--font-playfair`) for headings and display treatment.
- UI/body: `Inter` (`--font-inter`) for body copy, labels, controls, and helper text.
- Use typography tokens from `src/lib/ui/typography.ts` through `Heading` and `Text` components.

## Recommended verify sequence
- `npm run audit:copy`
- `npm run audit:copy-guardrails`
- `npm run audit:a11y`
- `npm run audit:books`
- `npm run audit:hygiene`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Notes
- Keep no em dashes rule in all visible copy and docs.
- Keep planner internals untouched unless explicitly requested.
