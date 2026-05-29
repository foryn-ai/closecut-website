import fs from 'fs/promises';
import path from 'path';

const COPY_PATH = 'src/lib/copy/therafoxWebsite.ts';
const PREV_RESULTS_PATH = 'artifacts/book-cover-fetch-results.json';
const OUT_DIR = 'public/books';

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripSubtitle(title) {
  return title.split(':')[0].split('|')[0].trim();
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'therafox-cover-fetch/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function download(url, filePath) {
  const res = await fetch(url, { headers: { 'user-agent': 'therafox-cover-fetch/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arr = new Uint8Array(await res.arrayBuffer());
  await fs.writeFile(filePath, arr);
}

function scoreDoc(doc, title, author) {
  const t = normalize(title);
  const tShort = normalize(stripSubtitle(title));
  const a = normalize(author.split(',')[0]);
  const dt = normalize(doc.title || '');
  const da = normalize((doc.author_name || []).join(' '));
  let score = 0;
  if (dt === t || dt === tShort) score += 6;
  if (dt.includes(tShort) || tShort.includes(dt)) score += 3;
  if (a && da.includes(a)) score += 4;
  if (doc.first_publish_year) score += 1;
  if (doc.cover_i) score += 3;
  return score;
}

async function searchOpenLibrary(query) {
  const url = new URL('https://openlibrary.org/search.json');
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '20');
  return fetchJson(url.toString());
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const prev = JSON.parse(await fs.readFile(PREV_RESULTS_PATH, 'utf8'));
  const missing = prev.results.filter((r) => r.status !== 'downloaded');

  const copyText = await fs.readFile(COPY_PATH, 'utf8');
  let nextText = copyText;

  const pass2 = [];

  for (const book of missing) {
    const titleShort = stripSubtitle(book.title);
    const authorBase = book.author.split(',')[0].trim();

    const queries = [
      `${book.title} ${book.author}`,
      `${titleShort} ${authorBase}`,
      `${titleShort}`,
      `${book.title}`,
    ];

    let docs = [];
    for (const q of queries) {
      try {
        const data = await searchOpenLibrary(q);
        docs = docs.concat(data.docs || []);
      } catch {}
    }

    const uniqueByKey = new Map();
    for (const d of docs) {
      const key = `${d.key || ''}:${d.cover_i || ''}:${d.title || ''}`;
      if (!uniqueByKey.has(key)) uniqueByKey.set(key, d);
    }

    const candidates = Array.from(uniqueByKey.values())
      .filter((d) => d.cover_i)
      .map((d) => ({ d, s: scoreDoc(d, book.title, book.author) }))
      .sort((a, b) => b.s - a.s);

    const best = candidates[0]?.d;
    if (!best) {
      pass2.push({ ...book, status: 'missing', reason: 'no_cover_match_pass2' });
      continue;
    }

    try {
      const coverUrl = `https://covers.openlibrary.org/b/id/${best.cover_i}-L.jpg`;
      const outFile = path.join(OUT_DIR, `${book.id}.jpg`);
      await download(coverUrl, outFile);
      const pattern = new RegExp(`(id:\\s*"${escapeRegex(book.id)}"[\\s\\S]*?coverSrc:\\s*")([^"]+)(")`);
      nextText = nextText.replace(pattern, `$1/books/${book.id}.jpg$3`);
      pass2.push({ ...book, status: 'downloaded', coverUrl, score: candidates[0]?.s || 0 });
      console.log(`downloaded ${book.id}`);
    } catch (err) {
      pass2.push({ ...book, status: 'error', reason: String(err.message || err) });
      console.log(`error ${book.id}: ${String(err.message || err)}`);
    }
  }

  if (nextText !== copyText) {
    await fs.writeFile(COPY_PATH, nextText, 'utf8');
  }

  await fs.writeFile(
    'artifacts/book-cover-fetch-pass2-openlibrary.json',
    JSON.stringify({ fetchedAt: new Date().toISOString(), results: pass2 }, null, 2),
  );

  const ok = pass2.filter((r) => r.status === 'downloaded').length;
  const fail = pass2.length - ok;
  console.log(`pass2-openlibrary done downloaded=${ok} missing_or_error=${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
