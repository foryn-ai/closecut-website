# Review workflow

## Where copy lives
All visible site copy lives in `src/lib/copy/intensive.ts`.

## Where SEO lives
All SEO strings and structured data live in `src/lib/seo/intensive.ts`.

## Export review JSON
Run:

```bash
npm run review:export
```

This writes `artifacts/intensive.review.export.json` for clinician review.

## Update copy only
- Edit `src/lib/copy/intensive.ts`.
- Run:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run review:export`

## Update SEO only
- Edit `src/lib/seo/intensive.ts`.
- Run:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run review:export`

## Clinician request flow
1. Clinician submits request using `docs/clinician-copy-request-template.md`.
2. Engineer updates copy/SEO files in repo.
3. Engineer runs checks and exports review JSON.
4. Changes are committed and deployed.

## Keep ids stable
- Pricing ids live in `src/lib/pricing/intensive.ts`.
- Each id must exist in `INTENSIVE_COPY.catalogCopy`.

## Bundle analysis
Run:

```bash
npm run analyze
```

This builds with the bundle analyzer enabled.
