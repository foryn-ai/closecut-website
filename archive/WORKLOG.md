# Worklog

## 2026-02-04
- Completed 48 Hours SEO pack in `src/lib/seo/bridgeWeekend.ts` and wired route metadata plus JSON-LD in `app/48-hours/page.tsx`.
- Added repo hygiene audit `scripts/audit-hygiene.cjs`, removed `*:Zone.Identifier` files, and enforced the audit in `.github/workflows/ci.yml`.
- Added security baseline headers in `next.config.ts` including CSP, frame, referrer, permissions, and HSTS policies.
- Wired contact request handling through `app/api/contact/route.ts` with validation, honeypot spam checks, rate limiting, and client side status handling in `app/contact/page.tsx`.
- Added SMTP email delivery in `app/api/contact/route.ts` via `nodemailer` with env driven configuration and delivery error handling.
- Removed unused dependencies `@tabler/icons-react` and `lucide-react` from `package.json`.
- Finalized Aceternity placeholder components by removing stub TODO markers and keeping active local implementations.

## 2026-02-03
- Deprecated slot based copy resolution and now source `SITE_COPY` directly from `src/lib/copy/bridgeWeekend.ts`.
- Removed lorem mode wiring from `app/layout.tsx` and `next.config.ts`.
- Removed deprecated slot pipeline files in `src/lib/copy` and export tooling in `scripts/export-content-slots.cjs`.
- Updated copy workflow docs in `README.md` and `docs/copy-handoff.md` to match direct per-page editing.
- Moved remaining about and 48 Hours page literals into `src/lib/copy/bridgeWeekend.ts` and aligned planner summary category labels to copy.

## 2026-02-02
- Added a Linen-forward token guide in `app/globals.css` with approved palette variables and derived tints (`--surface-1`, `--surface-2`, `--border`, `--divider`, `--focus`).
- Normalized interaction colors across shared UI: `src/components/shared/cta.ts`, `app/contact/page.tsx`, `src/components/ui/VanishInput.tsx`, and global focus/input styles in `app/globals.css`.
- Normalized surface usage and subtle borders in `src/components/shared/SurfaceCard.tsx`, `src/components/shared/VideoCard.tsx`, `src/components/shared/Section.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/aceternity/bento-grid.tsx`, and `src/components/aceternity/timeline.tsx`.
- Added color guardrail script `scripts/audit-colors.ts` with `npm run audit:colors` (strict mode via `RUN_COLOR_AUDIT_STRICT=true`).
- Replaced Therapy sticky scroll with timeline based flow and added on-scroll reveal animation.
- Tuned timeline visual treatment with solid green spine, filled gold dots, and increased vertical spacing.
- Updated Home page copy, layout spacing, and CTA section presentation.
- Reworked About page into a bento system with interleaved logo/image cards from `public/about/*`.
- Iterated About tile ordering, logo sizing, and content blocks including Relationally Trained and Systemic Thinker sections.
- Added and applied global type scale utility classes in `app/globals.css`.
- Updated shared components to use standardized type classes (`cta`, `SectionHeader`, `VideoCard`, nav, footer, bento item).
- Populated major `BRIDGE_WEEKEND_COPY` sections for 48 Hours hero, planner, shareable, investment, waitlist, and FAQ copy.
- Updated Contact page intro copy, removed extra body line, and switched list to checkmark bullets.
- Removed Playground link from header navigation.
- Created `public/about/` and aligned assets to cleaned file names.

## 2026-02-01
- Started scaffold rebuild for new sitemap and component playgrounds.
- Added global header, footer, and page shell with nav for sitemap routes.
- Built page scaffolds for Home, Therapy, About, Contact, and 48 Hours with placeholder copy.
- Added component playground routes and pages for Aurora, Lamp, Card Spotlight, and Expandable Card.
- Added Aurora stub, feature flag in Home, and TODO docs for later verification.
- Moved Aceternity stubs into `src/components/aceternity` with TODO notes.
- Added component strategy doc and updated sitemap.
- Ran `npm run lint`.
- Animated the Aurora stub with local keyframes and reduced motion handling.
- Switched editorial pages to `Section` and `SurfaceCard` with softer surfaces and more spacing.
- Removed border heavy styling from header, footer, cards, and playground shells.
- Adjusted Home hero spacing for a calmer, more premium layout.
- Swapped Aurora background stub to the official structure with brand gradients and reduced motion handling.
- Added primary CTA defaults and wired hero CTAs on Therapy and About plus a waitlist CTA on 48 Hours.
- Added a Lorem placeholder system with a banner toggle, and wired pages to switch copy via `NEXT_PUBLIC_USE_LOREM`.
- Added marketing content slots with metadata, slot resolver, and export script for Sheets handoff.
- Populated slot metadata templates for voice notes, SEO intent, and keywords via slot mapping.
- Reworked page layouts to match new magic budget and added sticky scroll and bento stubs with playground pages.
- Replaced sticky scroll and bento stubs with demo based Aceternity implementations in verified paths and kept color-only overrides.
- Refactored /therapy into setup, full-page sticky scroll spine, and compact close with slot-driven anchors and step content.
- Added therapy setup, scroll step, and close slot IDs plus metadata and exportable outputs.
- Updated share materials with THERAFOX header, generated timestamp, category summary, copy link, and PDF export.
- TODO: Wire 48 Hours page metadata and finalize placeholder copy for planner sections.
- TODO: Verify playgrounds against official demos and swap stubs when ready.
