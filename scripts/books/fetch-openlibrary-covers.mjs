import fs from 'fs/promises';
import path from 'path';

const COPY_PATH = 'src/lib/copy/therafoxWebsite.ts';
const OUT_DIR = 'public/books';

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseBooks(text) {
  const start = text.indexOf('booksCatalog: [');
  const end = text.indexOf('],\n    searchLabel:', start);
  if (start === -1 || end === -1) return [];
  const block = text.slice(start, end);
  const regex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?author:\s*"([^"]+)"[\s\S]*?\},/g;
  const books = [];
  let m;
  while ((m = regex.exec(block))) {
    books.push({ id: m[1], title: m[2], author: m[3] });
  }
  return books;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'therafox-cover-fetch/1.0',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function download(url, filePath) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'therafox-cover-fetch/1.0',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arr = new Uint8Array(await res.arrayBuffer());
  await fs.writeFile(filePath, arr);
}

function pickDoc(docs, title, author) {
  const t = normalize(title);
  const a = normalize(author.split(',')[0]);

  const scored = docs
    .filter((d) => d.cover_i)
    .map((d) => {
      const dt = normalize(d.title || '');
      const da = normalize((d.author_name && d.author_name[0]) || '');
      let score = 0;
      if (dt === t) score += 4;
      if (dt.includes(t) || t.includes(dt)) score += 2;
      if (a && da.includes(a)) score += 3;
      if (d.first_publish_year) score += 1;
      return { d, score };
    })
    .sort((x, y) => y.score - x.score);

  return scored.length ? scored[0].d : null;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const copyText = await fs.readFile(COPY_PATH, 'utf8');
  const books = parseBooks(copyText);
  if (!books.length) {
    console.error('No books parsed from copy source');
    process.exit(1);
  }

  const results = [];

  for (const book of books) {
    const q = new URL('https://openlibrary.org/search.json');
    q.searchParams.set('title', book.title);
    q.searchParams.set('author', book.author);
    q.searchParams.set('limit', '8');

    try {
      const data = await fetchJson(q.toString());
      const doc = pickDoc(data.docs || [], book.title, book.author);
      if (!doc || !doc.cover_i) {
        results.push({ ...book, status: 'missing', reason: 'no_cover_match' });
        continue;
      }

      const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
      const outFile = path.join(OUT_DIR, `${book.id}.jpg`);
      await download(coverUrl, outFile);

      results.push({ ...book, status: 'downloaded', coverUrl, file: outFile });
      console.log(`downloaded ${book.id}`);
    } catch (error) {
      results.push({ ...book, status: 'error', reason: String(error.message || error) });
      console.log(`error ${book.id}: ${String(error.message || error)}`);
    }
  }

  await fs.writeFile(
    'artifacts/book-cover-fetch-results.json',
    JSON.stringify({ fetchedAt: new Date().toISOString(), results }, null, 2),
    'utf8',
  );

  let next = copyText;
  for (const row of results) {
    if (row.status !== 'downloaded') continue;
    const pattern = new RegExp(`(id:\\s*"${escapeRegex(row.id)}"[\\s\\S]*?coverSrc:\\s*")([^"]+)(")`);
    next = next.replace(pattern, `$1/books/${row.id}.jpg$3`);
  }

  if (next !== copyText) {
    await fs.writeFile(COPY_PATH, next, 'utf8');
  }

  const ok = results.filter((r) => r.status === 'downloaded').length;
  const fail = results.length - ok;
  console.log(`done downloaded=${ok} missing_or_error=${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
