# Copy Handoff

This repo uses repo-first copy editing.

## Source of truth
- Visible copy: `src/lib/copy/intensive.ts`
- SEO strings: `src/lib/seo/intensive.ts`
- Optional CMS scope (only if `ENABLE_CMS=true`): Payload global `clinician-copy` for `/`, `/contact`, `/therapy`, `/about`, `/billing`, `/resources`, `/resources/[slug]`, `/intensive`, and `/intensive/[theme]`

## Export for review
Run:

```bash
npm run copy:export
npm run review:export
```

Outputs:
- `artifacts/intensive.copy.export.json`
- `artifacts/intensive.review.export.json`

## Updating copy
1. Edit the page section directly in `src/lib/copy/intensive.ts`.
2. Run `npm run lint` and `npm run build`.
3. Export review artifacts if needed.

## Clinician request intake
Use `docs/clinician-copy-request-template.md` for request submissions.
