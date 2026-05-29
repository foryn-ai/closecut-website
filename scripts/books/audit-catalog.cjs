#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { loadResourcesCatalog } = require('./catalog-utils.cjs');

function audit() {
  const { booksTags, booksFeaturedIds, booksCatalog } = loadResourcesCatalog();
  const errors = [];
  const warnings = [];

  const tagIds = new Set();
  for (const tag of booksTags) {
    if (!tag.id || !tag.label) {
      errors.push(`Invalid tag entry: ${JSON.stringify(tag)}`);
      continue;
    }
    if (tagIds.has(tag.id)) {
      errors.push(`Duplicate tag id: ${tag.id}`);
    }
    tagIds.add(tag.id);
  }

  const bookIds = new Set();
  const ranks = new Set();

  for (const book of booksCatalog) {
    if (!book.id || !book.title || !book.author) {
      errors.push(`Missing required book fields for entry: ${JSON.stringify(book)}`);
      continue;
    }

    if (bookIds.has(book.id)) {
      errors.push(`Duplicate book id: ${book.id}`);
    }
    bookIds.add(book.id);

    if (!Number.isFinite(book.priorityRank)) {
      errors.push(`Invalid priorityRank for ${book.id}`);
    } else if (ranks.has(book.priorityRank)) {
      warnings.push(`Duplicate priorityRank: ${book.priorityRank}`);
    } else {
      ranks.add(book.priorityRank);
    }

    if (!Array.isArray(book.hookTags) || book.hookTags.length === 0) {
      errors.push(`Missing hookTags for ${book.id}`);
    } else {
      for (const tagId of book.hookTags) {
        if (!tagIds.has(tagId)) {
          errors.push(`Unknown hookTag '${tagId}' in ${book.id}`);
        }
      }
    }

    if (typeof book.coverAlt !== 'string' || !book.coverAlt.startsWith('Cover of ')) {
      warnings.push(`coverAlt should follow 'Cover of ...' format for ${book.id}`);
    }

    if (typeof book.linkHref !== 'string' || !book.linkHref.startsWith('http')) {
      warnings.push(`linkHref is not an external http link for ${book.id}`);
    }

    if (typeof book.coverSrc !== 'string' || book.coverSrc.length === 0) {
      errors.push(`Missing coverSrc for ${book.id}`);
    } else if (book.coverSrc.startsWith('/books/')) {
      const localPath = path.join(process.cwd(), 'public', book.coverSrc.replace(/^\//, ''));
      if (!fs.existsSync(localPath)) {
        errors.push(`Missing local cover file for ${book.id}: ${book.coverSrc}`);
      }
    }
  }

  for (const featuredId of booksFeaturedIds) {
    if (!bookIds.has(featuredId)) {
      errors.push(`booksFeaturedIds includes unknown id: ${featuredId}`);
    }
  }

  console.log(`booksTags=${booksTags.length} booksCatalog=${booksCatalog.length}`);
  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.error('\nErrors:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('\nBook catalog audit passed.');
}

audit();
