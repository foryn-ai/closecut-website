# Book Cover Manual Queue

These book IDs still use the fallback cover and need manually sourced images.

## Remaining titles (16)

- leaving-the-fold
- you-are-your-own
- burnout
- way-of-integrity
- mask-of-masculinity
- healing-fragmented-selves
- unbound
- polywise
- brainstorm
- out-of-control-sexual-behavior
- healing-sex
- more-than-two
- no-nonsense-spirituality
- sexsmart
- wheel-of-consent
- secrets-of-a-passionate-marriage

## Add flow

1. Save image as `public/books/<id>.jpg` or `.webp`.
2. Set `coverSrc` in `src/lib/copy/therafoxWebsite.ts` to `/books/<id>.<ext>`.
3. Run `npm run lint` and `npm run typecheck`.

## Source of truth

- Initial fetch results: `artifacts/book-cover-fetch-results.json`
- Google Books pass results: `artifacts/book-cover-fetch-pass2.json`
- OpenLibrary pass 2 results: `artifacts/book-cover-fetch-pass2-openlibrary.json`
