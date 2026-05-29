#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { loadResourcesCatalog } = require('./catalog-utils.cjs');

function run() {
  const { booksTags, booksFeaturedIds, booksCatalog } = loadResourcesCatalog();
  const featuredIds = new Set(booksFeaturedIds);

  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'src/lib/copy/therafoxWebsite.ts',
    taxonomy: booksTags.map((tag) => ({
      slug: tag.id,
      label: tag.label,
    })),
    books: booksCatalog
      .slice()
      .sort((a, b) => a.priorityRank - b.priorityRank)
      .map((book) => ({
        slug: book.id,
        title: book.title,
        author: book.author,
        coverPath: book.coverSrc,
        coverAlt: book.coverAlt,
        externalUrl: book.linkHref,
        ctaLabel: book.linkLabel,
        priorityRank: book.priorityRank,
        isFeatured: featuredIds.has(book.id),
        tags: book.hookTags,
      })),
  };

  const outDir = path.join(process.cwd(), 'artifacts');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'books-cms-seed.json');
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${outFile}`);
}

run();
