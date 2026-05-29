#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(process.cwd(), "src/lib/copy/intensive.ts");
const copyText = fs.readFileSync(filePath, "utf8");

const findings = [];

if (copyText.includes("—")) {
  findings.push('Found em dash character "—" in copy source.');
}

const bannedTerms = [
  "luxury",
  "pamper",
  "spa-like",
  "spa",
  "life-changing",
  "transformational",
  "revolutionary",
  "best-in-class",
  "world-class",
];

const lower = copyText.toLowerCase();
for (const term of bannedTerms) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\b${escaped}\\b`, "i");
  if (pattern.test(lower)) {
    findings.push(`Found banned language term: "${term}".`);
  }
}

if (findings.length > 0) {
  console.error("Copy guardrail audit failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Copy guardrail audit passed.");
