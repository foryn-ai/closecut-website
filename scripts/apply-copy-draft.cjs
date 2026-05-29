#!/usr/bin/env node
// Applies a filled copy-drafts/<section>.json to therafoxWebsite.ts.
// Usage: node scripts/apply-copy-draft.cjs <section>
// Example: node scripts/apply-copy-draft.cjs home
//
// For each string field in the JSON, finds the corresponding assignment within
// the named SITE_COPY section and replaces the quoted value in-place.
// Fields with zero matches or multiple matches are skipped with a report.
// Array and object fields from the JSON are skipped automatically.
// Run audit:copy and typecheck after applying.

const fs = require("node:fs");
const path = require("node:path");

const section = process.argv[2];

if (!section) {
  console.error("Usage: node scripts/apply-copy-draft.cjs <section>");
  process.exit(1);
}

const draftPath = path.join(process.cwd(), "copy-drafts", `${section}.json`);
const copyPath = path.join(
  process.cwd(),
  "src",
  "lib",
  "copy",
  "therafoxWebsite.ts"
);

if (!fs.existsSync(draftPath)) {
  console.error(`Draft not found: ${draftPath}`);
  console.error("Generate a template first: npm run copy:schema " + section);
  process.exit(1);
}

const draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));
const source = fs.readFileSync(copyPath, "utf8");

// ── Find section boundaries ──────────────────────────────────────────────────
// Locate the start of `  sectionName: {` and trace to the matching closing `},`
// at the same indentation level using brace counting.

const sectionStartPattern = new RegExp(
  `(?:^|\\n)([ \\t]+${section}:\\s*\\{)`,
  "m"
);
const sectionStartMatch = source.match(sectionStartPattern);

if (!sectionStartMatch) {
  console.error(
    `Section "${section}" not found in therafoxWebsite.ts. Check available sections with: npm run copy:schema`
  );
  process.exit(1);
}

// Offset in source where the section object `{` begins.
const sectionStart = source.indexOf(
  sectionStartMatch[0],
  sectionStartMatch.index ?? 0
);
let braceDepth = 0;
let sectionEnd = sectionStart;

for (let i = sectionStart; i < source.length; i++) {
  if (source[i] === "{") braceDepth++;
  if (source[i] === "}") {
    braceDepth--;
    if (braceDepth === 0) {
      sectionEnd = i + 1;
      break;
    }
  }
}

const sectionSource = source.slice(sectionStart, sectionEnd);

// ── Apply replacements ───────────────────────────────────────────────────────

const applied = [];
const skipped = [];

let updatedSection = sectionSource;

for (const [key, value] of Object.entries(draft)) {
  if (typeof value !== "string") {
    skipped.push({ key, reason: "not a string — edit manually" });
    continue;
  }

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(\\b${escapedKey}:\\s+)"[^"]*"`, "g");
  const matches = [...updatedSection.matchAll(pattern)];

  if (matches.length === 0) {
    skipped.push({ key, reason: "not found within section" });
    continue;
  }

  if (matches.length > 1) {
    skipped.push({
      key,
      reason: `${matches.length} matches within section — edit manually`,
    });
    continue;
  }

  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  updatedSection = updatedSection.replace(pattern, `$1"${escaped}"`);
  applied.push(key);
}

const updatedSource =
  source.slice(0, sectionStart) + updatedSection + source.slice(sectionEnd);

fs.writeFileSync(copyPath, updatedSource, "utf8");

// ── Report ───────────────────────────────────────────────────────────────────

console.log(`\nSection: ${section}`);
console.log(`Applied: ${applied.length} fields`);
if (applied.length > 0) {
  for (const k of applied) console.log(`  + ${k}`);
}

if (skipped.length > 0) {
  console.log(`\nSkipped: ${skipped.length} fields`);
  for (const { key, reason } of skipped) {
    console.log(`  - ${key}: ${reason}`);
  }
}

console.log("\nNext: npm run audit:copy && npm run typecheck");
