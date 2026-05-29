#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

require("ts-node/register/transpile-only");

const fs = require("fs");
const path = require("path");

const { RESOURCES } = require("../../src/content/resources/resources");

const ROOT = process.cwd();
const DRAFTS_DIR = path.join(ROOT, "worksheets", "drafts");
const OUTPUT_ROOT = path.join(ROOT, "artifacts", "worksheet-review");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    const value = next && !next.startsWith("--") ? next : "";
    if (!args[key]) {
      args[key] = [];
    }
    if (value) {
      args[key].push(value);
      i += 1;
    }
  }
  return args;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(
    now.getMinutes(),
  )}${pad(now.getSeconds())}`;
}

function findDraftSlugs() {
  if (!fs.existsSync(DRAFTS_DIR)) return [];
  return fs
    .readdirSync(DRAFTS_DIR)
    .filter((file) => file.endsWith("_worksheet.md"))
    .map((file) => file.replace(/_worksheet\.md$/, ""))
    .sort();
}

function copyIfExists(srcPath, dstPath, warnings) {
  if (!fs.existsSync(srcPath)) {
    warnings.push(`Missing file: ${path.relative(ROOT, srcPath)}`);
    return;
  }
  ensureDir(path.dirname(dstPath));
  fs.copyFileSync(srcPath, dstPath);
}

function renderCitationMarkdown(resource) {
  const lines = [
    `# ${resource.title} Citation Snapshot`,
    "",
    `Resource slug: \`${resource.slug}\``,
    "",
    ...resource.citations.map((citation, index) => {
      const meta = [citation.publisher, citation.year, citation.kind].filter(Boolean).join(" | ");
      return `${index + 1}. ${citation.title}\n   - ${meta}\n   - ${citation.url}`;
    }),
    "",
  ];
  return lines.join("\n");
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const requestedSlugs = args.slug || [];
  const slugs = requestedSlugs.length > 0 ? requestedSlugs : findDraftSlugs();

  if (slugs.length === 0) {
    console.error("No worksheet slugs found. Add drafts in worksheets/drafts/*_worksheet.md or pass --slug.");
    process.exit(1);
  }

  const bundleDir = path.join(OUTPUT_ROOT, timestamp());
  ensureDir(bundleDir);

  const manifest = {
    generatedAt: new Date().toISOString(),
    topics: [],
    warnings: [],
  };

  for (const slug of slugs) {
    const resource = RESOURCES.find((entry) => entry.slug === slug);
    if (!resource) {
      manifest.warnings.push(`No resource entry for slug: ${slug}`);
      continue;
    }

    const topicDir = path.join(bundleDir, slug);
    ensureDir(topicDir);

    const draftSrc = path.join(DRAFTS_DIR, `${slug}_worksheet.md`);
    const draftDst = path.join(topicDir, `${slug}_worksheet.md`);
    copyIfExists(draftSrc, draftDst, manifest.warnings);

    const citationJsonPath = path.join(topicDir, "citations.snapshot.json");
    fs.writeFileSync(citationJsonPath, JSON.stringify(resource.citations, null, 2), "utf8");

    const citationMdPath = path.join(topicDir, "citations.snapshot.md");
    fs.writeFileSync(citationMdPath, renderCitationMarkdown(resource), "utf8");

    const copiedPdfs = [];
    if (resource.worksheets && resource.worksheets.assets) {
      for (const asset of resource.worksheets.assets) {
        if (asset.type !== "pdf") continue;
        const relativePdf = asset.url.startsWith("/") ? asset.url.slice(1) : asset.url;
        const pdfSrc = path.join(ROOT, "public", relativePdf.replace(/^public\//, ""));
        const pdfDst = path.join(topicDir, path.basename(relativePdf));
        copyIfExists(pdfSrc, pdfDst, manifest.warnings);
        if (fs.existsSync(pdfDst)) {
          copiedPdfs.push(path.relative(bundleDir, pdfDst));
        }
      }
    }

    manifest.topics.push({
      slug,
      title: resource.title,
      draft: path.relative(bundleDir, draftDst),
      citationsJson: path.relative(bundleDir, citationJsonPath),
      citationsMarkdown: path.relative(bundleDir, citationMdPath),
      pdfs: copiedPdfs,
    });
  }

  const manifestPath = path.join(bundleDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`Worksheet review bundle written to ${path.relative(ROOT, bundleDir)}`);
  console.log(`Manifest: ${path.relative(ROOT, manifestPath)}`);
  if (manifest.warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of manifest.warnings) {
      console.log(`- ${warning}`);
    }
  }
}

run();
