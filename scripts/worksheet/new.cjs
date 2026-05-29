#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const TEMPLATE_PATH = path.join(ROOT, "worksheets/templates/one-page-worksheet.md");
const DRAFTS_DIR = path.join(ROOT, "worksheets/drafts");
const RESOURCES_PATH = path.join(ROOT, "src/content/resources/resources.ts");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : "";
    args[key] = value;
    if (value) {
      i += 1;
    }
  }
  return args;
}

function getResourceSlugs() {
  const content = fs.readFileSync(RESOURCES_PATH, "utf8");
  const slugs = new Set();
  const regex = /slug:\s*"([^"]+)"/g;
  let match = regex.exec(content);
  while (match) {
    slugs.add(match[1]);
    match = regex.exec(content);
  }
  return slugs;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const resource = args.resource;
  const title = args.title;

  if (!resource || !title) {
    console.error("Usage: npm run worksheet:new -- --resource <resource-slug> --title \"Worksheet Title\"");
    process.exit(1);
  }

  const knownResources = getResourceSlugs();
  if (!knownResources.has(resource)) {
    console.error(`Unknown resource slug: ${resource}`);
    console.error("Use a slug that exists in src/content/resources/resources.ts");
    process.exit(1);
  }

  const fileName = `${resource}_worksheet.md`;
  const outPath = path.join(DRAFTS_DIR, fileName);

  if (fs.existsSync(outPath)) {
    console.error(`Draft already exists: ${path.relative(ROOT, outPath)}`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const output = template
    .replace(/\{\{TITLE\}\}/g, title)
    .replace(/\{\{RESOURCE_SLUG\}\}/g, resource);

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`Created ${path.relative(ROOT, outPath)}`);
}

run();
