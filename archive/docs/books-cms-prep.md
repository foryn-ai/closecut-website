# Books CMS Prep

This repo keeps resource book copy in `src/lib/copy/therafoxWebsite.ts` under:

- `resources.booksTags`
- `resources.booksFeaturedIds`
- `resources.booksCatalog`

## Validation

Run:

```bash
npm run audit:books
```

This checks:

- duplicate book or tag IDs
- unknown tag references
- local cover file existence
- featured IDs point to real books

## Export for CMS seed

Run:

```bash
npm run books:cms-seed
```

Output:

- `artifacts/books-cms-seed.json`

The export payload is shaped for direct import into a future CMS collection with:

- tag taxonomy (`taxonomy`)
- ordered books (`books`)
- featured flags (`isFeatured`)

## Suggested CMS collections

- `bookTags`
  - `slug`
  - `label`
- `books`
  - `slug`
  - `title`
  - `author`
  - `coverPath`
  - `coverAlt`
  - `externalUrl`
  - `ctaLabel`
  - `priorityRank`
  - `isFeatured`
  - `tags` (relationship to `bookTags`)
