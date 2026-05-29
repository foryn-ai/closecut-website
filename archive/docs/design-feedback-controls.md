# Design Feedback Controls

This file maps high impact visual controls to their source files so design feedback can be implemented quickly without regressions.

## Global Tokens
- File: `app/globals.css`
- Color and accent tokens live in `:root`.
- Core accent line controls:
  - `--accent-warm`
  - `--accent-rule-width`
  - `--accent-rule-thickness`
  - `--accent-rule-inset`

## Page Tone System
- File: `src/components/layout/PageShell.tsx`
- `tone="home"` and `tone="interior"` control page-level styling.
- File: `app/globals.css`
- `.page-shell--home` and `.page-shell--interior` define tone behavior.

## Section Accent Rules
- File: `app/globals.css`
- Accent rule rendering is class-based and opt-in through `.tf-rule-section`.
- `.tf-no-rule` disables rules for special sections.
- Hero adjacency safeguard prevents an immediate line after `.tf-hero`.

## Shared Section API
- File: `src/components/shared/Section.tsx`
- `rule` prop:
  - `"auto"` (default) adds `.tf-rule-section`
  - `"none"` adds `.tf-no-rule`
- Use `rule="none"` for timeline, media separators, or sections where a rule feels dense.

## Card Accent System
- File: `app/globals.css`
- `.tf-accent-card::before` controls card top accent line.
- Shared card surfaces:
  - `src/components/shared/SurfaceCard.tsx`
  - `src/components/shared/VideoCard.tsx`

## Icon Treatment
- File: `src/components/shared/IconBadge.tsx`
- Icon weight, size, and style variants are centralized here.
- Prefer updating this component rather than per-page icon wrappers.

## Recommended Review Flow for New Feedback
1. Adjust token values in `app/globals.css`.
2. Apply section-level class decisions (`tf-rule-section` or `tf-no-rule`).
3. Validate in these pages first: `app/page.tsx`, `app/therapy/page.tsx`, `app/about/page.tsx`, `app/intensive/page.tsx`.
4. Run `npm run typecheck` and `npm run lint`.
