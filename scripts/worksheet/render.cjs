#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const DRAFTS_DIR = path.join(ROOT, "worksheets/drafts");
const EXPORTS_DIR = path.join(ROOT, "exports/worksheets");
const RESOURCES_PATH = path.join(ROOT, "src/content/resources/resources.ts");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : "";
    args[key] = value;
    if (value) i += 1;
  }
  return args;
}

function stripMarkdownPrefix(line) {
  return line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").trim();
}

function extractSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escaped}\\s*([\\s\\S]*?)(\\n## |\\s*$)`);
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}

function getTopicTitle(resourceSlug) {
  if (!resourceSlug || !fs.existsSync(RESOURCES_PATH)) {
    return "";
  }

  const source = fs.readFileSync(RESOURCES_PATH, "utf8");
  const regex = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g;
  let match = regex.exec(source);
  while (match) {
    if (match[1] === resourceSlug) {
      return match[2].trim();
    }
    match = regex.exec(source);
  }
  return "";
}

function parseDraft(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const resourceMatch = content.match(/Resource slug:\s*`([^`]+)`/);

  const header = extractSection(content, "## Hero Header `{{HEADER}}`");
  const why = extractSection(content, "## The Why `{{WHY}}`")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^-\s+/.test(line))
    .map(stripMarkdownPrefix);

  const how = extractSection(content, "## The How `{{HOW}}`")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map(stripMarkdownPrefix);

  const heroIconSection = extractSection(content, "## Hero Icon `{{ICON_HERO}}`");
  const whyIconSection = extractSection(content, "## Why Icon `{{ICON_WHY}}`");
  const howIconSection = extractSection(content, "## How Icon `{{ICON_HOW}}`");

  const proTip = extractSection(content, "## The Pro Tip `{{PRO_TIP}}`");
  const footer = extractSection(content, "## Footer/Source `{{FOOTER}}`");

  const resourceSlug = resourceMatch ? resourceMatch[1].trim() : "resource";
  const topicTitle = getTopicTitle(resourceSlug);

  return {
    title: topicTitle || (titleMatch ? titleMatch[1].trim() : "Worksheet"),
    resourceSlug,
    header,
    why,
    how,
    proTip,
    footer,
    heroIconName:
      (
        heroIconSection.match(/^Icon concept label \(one word\):\s*(.+)$/m) ||
        heroIconSection.match(/^Icon name:\s*(.+)$/m) || ["", "Icon"]
      )[1].trim(),
    heroIconFile: (heroIconSection.match(/^-\s*Filename:\s*(.+)$/im) || ["", ""])[1].trim(),
    whyIconName:
      (
        whyIconSection.match(/^Icon concept label \(one word\):\s*(.+)$/m) ||
        whyIconSection.match(/^Icon name:\s*(.+)$/m) || ["", "Icon"]
      )[1].trim(),
    whyIconFile: (whyIconSection.match(/^-\s*Filename:\s*(.+)$/im) || ["", ""])[1].trim(),
    howIconName:
      (
        howIconSection.match(/^Icon concept label \(one word\):\s*(.+)$/m) ||
        howIconSection.match(/^Icon name:\s*(.+)$/m) || ["", "Icon"]
      )[1].trim(),
    howIconFile: (howIconSection.match(/^-\s*Filename:\s*(.+)$/im) || ["", ""])[1].trim(),
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toFileUrl(segments) {
  return `file://${path.join(ROOT, ...segments)}`;
}

function renderHtml(data) {
  const interRegular = toFileUrl(["public", "fonts", "inter-latin-400-normal.woff2"]);
  const interSemiBold = toFileUrl(["public", "fonts", "inter-latin-600-normal.woff2"]);
  const playfairRegular = toFileUrl(["public", "fonts", "playfair-display-latin-400-normal.woff2"]);
  const playfairBold = toFileUrl(["public", "fonts", "playfair-display-latin-700-normal.woff2"]);
  const wordmarkSrc = toFileUrl(["public", "therafox_logo_pack", "wordmark", "therafox-wordmark-tight.svg"]);

  const iconMarkup = (iconFile, iconName) => {
    const iconSrc = iconFile ? toFileUrl(["public", "icons", iconFile]) : "";
    const iconPath = iconFile ? path.join(ROOT, "public", "icons", iconFile) : "";
    const icon = iconSrc
      ? iconFile.toLowerCase().endsWith(".svg")
        ? (() => {
            if (!fs.existsSync(iconPath)) {
              return "<div class=\"icon-placeholder\">60 x 60</div>";
            }
            const rawSvg = fs.readFileSync(iconPath, "utf8");
            const cleaned = rawSvg
              .replace(/<\?xml[\s\S]*?\?>/g, "")
              .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
              .replace(/<svg\b([^>]*)>/i, "<svg$1 aria-hidden=\"true\" focusable=\"false\">");
            return `<div class="svg-icon-inline" role="img" aria-label="${escapeHtml(
              iconName || "Worksheet icon",
            )}">${cleaned}</div>`;
          })()
        : `<img src="${escapeHtml(iconSrc)}" width="60" height="60" alt="${escapeHtml(iconName || "Worksheet icon")}" />`
      : "<div class=\"icon-placeholder\">60 x 60</div>";
    return `${icon}<div class="icon-label">${escapeHtml(iconName || "Visual Anchor")}</div>`;
  };

  const headerParagraphs = data.header
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part)}</p>`)
    .join("\n");
  const whyItems = data.why.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  const howItems = data.how.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(data.title)}</title>
  <style>
    @font-face { font-family: InterCustom; src: url('${interRegular}') format('woff2'); font-weight: 400; }
    @font-face { font-family: InterCustom; src: url('${interSemiBold}') format('woff2'); font-weight: 600; }
    @font-face { font-family: PlayfairCustom; src: url('${playfairRegular}') format('woff2'); font-weight: 400; }
    @font-face { font-family: PlayfairCustom; src: url('${playfairBold}') format('woff2'); font-weight: 700; }

    :root {
      --canvas: #FDFCFB;
      --primary: #6B7F6D;
      --heading: #2D3748;
      --accent: #D4AF37;
      --body: #718096;
      --line: #d7ddd5;
      --surface: #f7f8f6;
      --surface-glow: #f4f7f2;
    }

    * { box-sizing: border-box; }

    @page {
      size: Letter;
      margin: 10mm;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: var(--canvas);
      color: var(--heading);
      font-family: InterCustom, Inter, system-ui, -apple-system, Segoe UI, sans-serif;
    }

    .sheet {
      height: 255mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .header-bar {
      margin-bottom: 4.2mm;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 4mm;
    }

    .title {
      margin: 0;
      font-family: PlayfairCustom, "Playfair Display", Georgia, serif;
      font-weight: 700;
      font-size: 9mm;
      line-height: 1.05;
      color: var(--heading);
      letter-spacing: 0.01em;
    }

    .brand-mark {
      width: 42mm;
      height: auto;
      opacity: 0.78;
      margin-top: 0;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 3mm;
    }

    .row-shell {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 4mm;
      padding: 0;
      overflow: hidden;
    }

    .bento {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 34mm;
      align-items: stretch;
      min-height: 58mm;
    }

    .bento.icon-left {
      grid-template-columns: 34mm minmax(0, 1fr);
    }

    .text-cell {
      padding: 4.8mm 4.8mm;
      display: grid;
      gap: 2.4mm;
      align-content: start;
    }

    .text-cell h2 {
      margin: 0;
      font-family: PlayfairCustom, "Playfair Display", Georgia, serif;
      font-weight: 700;
      font-size: 4.6mm;
      line-height: 1.15;
      color: var(--heading);
    }

    .text-cell p,
    .text-cell li {
      margin: 0;
      color: var(--body);
      font-size: 3.4mm;
      line-height: 1.33;
    }

    .what-is-it p + p {
      margin-top: 2mm;
    }

    .text-cell ul,
    .text-cell ol {
      margin: 0;
      padding-left: 4.8mm;
      display: grid;
      gap: 2.1mm;
    }

    .icon-cell {
      background: transparent;
      border-left: 0;
      display: grid;
      place-items: center;
      padding: 5mm 2mm;
      text-align: center;
    }

    .icon-left .icon-cell {
      border-left: 0;
      border-right: 0;
    }

    .icon-wrap {
      display: grid;
      gap: 1.8mm;
      justify-items: center;
    }

    .icon-wrap img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      filter: saturate(0.85);
    }

    .svg-icon-inline {
      width: 60px;
      height: 60px;
      display: grid;
      place-items: center;
      color: #2D3748;
    }

    .svg-icon-inline svg {
      width: 60px;
      height: 60px;
      display: block;
    }

    .svg-icon-inline svg [stroke] {
      stroke: #2D3748 !important;
    }

    .svg-icon-inline svg [fill]:not([fill="none"]) {
      fill: #2D3748 !important;
    }

    .icon-label {
      font-size: 2.8mm;
      line-height: 1.2;
      color: var(--primary);
      font-weight: 600;
    }

    .icon-placeholder {
      width: 60px;
      height: 60px;
      border: 1px dashed var(--line);
      color: var(--body);
      display: grid;
      place-items: center;
      font-size: 2.4mm;
    }

    .pro-tip {
      padding: 5mm;
      background: linear-gradient(145deg, #fffdf6, #f9f7ef);
      display: grid;
      gap: 2.4mm;
    }

    .pro-tip h2 {
      margin: 0;
      font-family: PlayfairCustom, "Playfair Display", Georgia, serif;
      font-size: 4.6mm;
      color: var(--heading);
    }

    .pro-tip p {
      margin: 0;
      color: var(--body);
      font-size: 3.45mm;
      line-height: 1.32;
    }

    .footer {
      margin-top: auto;
      padding-top: 3mm;
      border-top: 1px solid var(--line);
      color: var(--body);
      font-size: 2.9mm;
      text-align: right;
    }
  </style>
</head>
<body>
  <main class="sheet" role="document" aria-label="${escapeHtml(data.title)} worksheet">
    <div class="header-bar">
      <h1 class="title">${escapeHtml(data.title)}</h1>
      <img class="brand-mark" src="${escapeHtml(wordmarkSrc)}" alt="Therafox" />
    </div>
    <table aria-label="4 row worksheet table">
      <tr>
        <td class="row-shell">
          <section class="bento icon-right">
            <div class="text-cell">
              <h2>What Is It</h2>
              <div class="what-is-it">${headerParagraphs}</div>
            </div>
            <div class="icon-cell">
              <div class="icon-wrap">${iconMarkup(data.heroIconFile, data.heroIconName)}</div>
            </div>
          </section>
        </td>
      </tr>
      <tr>
        <td class="row-shell">
          <section class="bento icon-left">
            <div class="icon-cell">
              <div class="icon-wrap">${iconMarkup(data.whyIconFile, data.whyIconName)}</div>
            </div>
            <div class="text-cell">
              <h2>The Why</h2>
              <ul>${whyItems}</ul>
            </div>
          </section>
        </td>
      </tr>
      <tr>
        <td class="row-shell">
          <section class="bento icon-right">
            <div class="text-cell">
              <h2>The How</h2>
              <ol>${howItems}</ol>
            </div>
            <div class="icon-cell">
              <div class="icon-wrap">${iconMarkup(data.howIconFile, data.howIconName)}</div>
            </div>
          </section>
        </td>
      </tr>
      <tr>
        <td class="row-shell pro-tip">
          <h2>Pro Tip</h2>
          <p>${escapeHtml(data.proTip)}</p>
        </td>
      </tr>
    </table>
    <p class="footer">${escapeHtml(data.footer)}</p>
  </main>
</body>
</html>`;
}

function getInputPath(args) {
  if (args.input) {
    return path.isAbsolute(args.input) ? args.input : path.join(ROOT, args.input);
  }
  if (args.resource && args.title) {
    const slug = args.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return path.join(DRAFTS_DIR, `${args.resource}__${slug}.md`);
  }
  return null;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = getInputPath(args);
  if (!inputPath) {
    console.error("Usage: npm run worksheet:render -- --input worksheets/drafts/<file>.md [--out exports/worksheets/<file>.html]");
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${path.relative(ROOT, inputPath)}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(inputPath, "utf8");
  const data = parseDraft(markdown);
  const html = renderHtml(data);

  const defaultName = path.basename(inputPath, ".md") + ".html";
  const outputPath = args.out
    ? path.isAbsolute(args.out)
      ? args.out
      : path.join(ROOT, args.out)
    : path.join(EXPORTS_DIR, defaultName);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`Rendered ${path.relative(ROOT, outputPath)}`);
}

run();
