const fs = require('fs');
const path = require('path');

const COPY_PATH = path.join(process.cwd(), 'src/lib/copy/therafoxWebsite.ts');

function parseArrayFromCopy(text, key) {
  const start = text.indexOf(`${key}: [`);
  if (start === -1) return null;

  let i = text.indexOf('[', start);
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (; i < text.length; i += 1) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === '[') {
      depth += 1;
      continue;
    }

    if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(text.indexOf('[', start), i + 1);
      }
    }
  }

  return null;
}

function normalizeJsLiteralToJson(literal) {
  return literal
    .replace(/([\{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
    .replace(/,\s*([}\]])/g, '$1');
}

function loadResourcesCatalog() {
  const text = fs.readFileSync(COPY_PATH, 'utf8');
  const tagsLiteral = parseArrayFromCopy(text, 'booksTags');
  const booksLiteral = parseArrayFromCopy(text, 'booksCatalog');
  const featuredIdsLiteral = parseArrayFromCopy(text, 'booksFeaturedIds');

  if (!tagsLiteral || !booksLiteral || !featuredIdsLiteral) {
    throw new Error('Unable to parse booksTags, booksFeaturedIds, or booksCatalog from copy source');
  }

  const booksTags = JSON.parse(normalizeJsLiteralToJson(tagsLiteral));
  const booksFeaturedIds = JSON.parse(normalizeJsLiteralToJson(featuredIdsLiteral));
  const booksCatalog = JSON.parse(normalizeJsLiteralToJson(booksLiteral));

  return { booksTags, booksFeaturedIds, booksCatalog };
}

module.exports = {
  loadResourcesCatalog,
};
