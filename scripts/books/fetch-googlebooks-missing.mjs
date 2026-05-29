import fs from 'fs/promises';
import path from 'path';

const COPY_PATH = 'src/lib/copy/therafoxWebsite.ts';
const RESULTS_PATH = 'artifacts/book-cover-fetch-results.json';
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

function pickItem(items, title, author) {
  const t = normalize(title);
  const a = normalize(author.split(',')[0]);
  const scored = items.map((it) => {
    const vi = it.volumeInfo || {};
    const itTitle = normalize(vi.title || '');
    const itAuthors = normalize((vi.authors || []).join(' '));
    let score = 0;
    if (itTitle === t) score += 4;
    if (itTitle.includes(t) || t.includes(itTitle)) score += 2;
    if (a && itAuthors.includes(a)) score += 3;
    if (vi.publishedDate) score += 1;
    if (vi.imageLinks?.thumbnail || vi.imageLinks?.smallThumbnail) score += 2;
    return { it, score };
  }).sort((x, y) => y.score - x.score);
  return scored.length ? scored[0].it : null;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const oldResults = JSON.parse(await fs.readFile(RESULTS_PATH, 'utf8'));
  const missing = oldResults.results.filter((r) => r.status !== 'downloaded');

  const copyText = await fs.readFile(COPY_PATH, 'utf8');
  let nextText = copyText;
  const pass2 = [];

  for (const book of missing) {
    const q = new URL('https://www.googleapis.com/books/v1/volumes');
    q.searchParams.set('q', `intitle:${book.title} inauthor:${book.author}`);
    q.searchParams.set('maxResults', '10');
    q.searchParams.set('printType', 'books');

    try {
      const data = await fetchJson(q.toString());
      const items = data.items || [];
      if (!items.length) {
        pass2.push({ ...book, pass2Status: 'missing', pass2Reason: 'no_items' });
        continue;
      }

      const chosen = pickItem(items, book.title, book.author);
      const links = chosen?.volumeInfo?.imageLinks;
      let imageUrl = links?.thumbnail || links?.smallThumbnail || '';
      if (!imageUrl) {
        pass2.push({ ...book, pass2Status: 'missing', pass2Reason: 'no_image_link' });
        continue;
      }

      imageUrl = imageUrl.replace('http://', 'https://').replace('&edge=curl', '');
      imageUrl = imageUrl.includes('&zoom=') ? imageUrl : `${imageUrl}&zoom=2`;

      const outFile = path.join(OUT_DIR, `${book.id}.jpg`);
      await download(imageUrl, outFile);

      const pattern = new RegExp(`(id:\\s*"${escapeRegex(book.id)}"[\\s\\S]*?coverSrc:\\s*")([^"]+)(")`);
      nextText = nextText.replace(pattern, `$1/books/${book.id}.jpg$3`);

      pass2.push({ ...book, pass2Status: 'downloaded', pass2Url: imageUrl, pass2File: outFile });
      console.log(`downloaded ${book.id}`);
    } catch (error) {
      pass2.push({ ...book, pass2Status: 'error', pass2Reason: String(error.message || error) });
      console.log(`error ${book.id}: ${String(error.message || error)}`);
    }
  }

  if (nextText !== copyText) {
    await fs.writeFile(COPY_PATH, nextText, 'utf8');
  }

  await fs.writeFile(
    'artifacts/book-cover-fetch-pass2.json',
    JSON.stringify({ fetchedAt: new Date().toISOString(), results: pass2 }, null, 2),
    'utf8',
  );

  const ok = pass2.filter((r) => r.pass2Status === 'downloaded').length;
  const fail = pass2.length - ok;
  console.log(`pass2 done downloaded=${ok} missing_or_error=${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
