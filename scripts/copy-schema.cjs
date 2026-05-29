#!/usr/bin/env node
// Exports the string fields of a SITE_COPY section as a JSON template.
// Usage: node scripts/copy-schema.cjs <section>
// Example: node scripts/copy-schema.cjs home > copy-drafts/home.json
//
// Output is a flat JSON object of string-valued fields only.
// Array and object fields are skipped — those require manual editing.
// Paste the output into Claude.ai with BRAND_BRIEF.md to generate copy.

require("ts-node/register/transpile-only");

const fs = require("node:fs");
const path = require("node:path");

const section = process.argv[2];

if (!section) {
  const { SITE_COPY } = require("../src/lib/copy/therafoxWebsite");
  console.error("Usage: node scripts/copy-schema.cjs <section>");
  console.error("Available sections:", Object.keys(SITE_COPY).join(", "));
  process.exit(1);
}

const { SITE_COPY } = require("../src/lib/copy/therafoxWebsite");

const sectionCopy = SITE_COPY[section];
if (!sectionCopy || typeof sectionCopy !== "object") {
  console.error(`Section "${section}" not found in SITE_COPY.`);
  console.error("Available sections:", Object.keys(SITE_COPY).join(", "));
  process.exit(1);
}

const schema = {};
const skipped = [];

for (const [key, value] of Object.entries(sectionCopy)) {
  if (typeof value === "string") {
    schema[key] = value;
  } else {
    skipped.push(`${key} (${Array.isArray(value) ? "array" : typeof value})`);
  }
}

process.stdout.write(JSON.stringify(schema, null, 2) + "\n");

if (skipped.length > 0) {
  process.stderr.write(
    `\nSkipped non-string fields (edit manually in therafoxWebsite.ts):\n` +
      skipped.map((s) => `  - ${s}`).join("\n") +
      "\n"
  );
}
