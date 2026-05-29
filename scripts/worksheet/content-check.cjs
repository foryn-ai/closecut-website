#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");

const BANNED_WORDS = ["always", "should", "fix", "heal", "diagnose"];
const CLINICAL_WORDS = [
  "treatment",
  "diagnosis",
  "diagnostic",
  "patient",
  "clinical",
  "prescription",
  "disorder",
  "symptom",
];

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : "";
    args[key] = val || true;
    if (val) i += 1;
  }
  return args;
}

function extractSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}\\s*([\\s\\S]*?)(?=\\n## |$)`);
  const match = content.match(re);
  return match ? match[1].trim() : "";
}

function findWords(text, words) {
  const lower = text.toLowerCase();
  return words.filter((word) => new RegExp(`\\b${word}\\b`, "i").test(lower));
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    console.error("Usage: npm run worksheet:content-check -- --input worksheets/drafts/<file>.md");
    process.exit(1);
  }

  const inputPath = path.isAbsolute(args.input) ? args.input : path.join(ROOT, args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${path.relative(ROOT, inputPath)}`);
    process.exit(1);
  }

  const content = fs.readFileSync(inputPath, "utf8");
  const why = extractSection(content, "## The Why `{{WHY}}`");
  const how = extractSection(content, "## The How `{{HOW}}`");
  const proTip = extractSection(content, "## The Pro Tip `{{PRO_TIP}}`");

  const findings = [];

  const bannedWhy = findWords(why, BANNED_WORDS);
  const bannedHow = findWords(how, BANNED_WORDS);
  const bannedPro = findWords(proTip, BANNED_WORDS);

  if (bannedWhy.length) findings.push(`The Why uses banned words: ${bannedWhy.join(", ")}`);
  if (bannedHow.length) findings.push(`The How uses banned words: ${bannedHow.join(", ")}`);
  if (bannedPro.length) findings.push(`The Pro Tip uses banned words: ${bannedPro.join(", ")}`);

  const clinicalHits = findWords(`${why}\n${how}\n${proTip}`, CLINICAL_WORDS);
  if (clinicalHits.length) {
    findings.push(`Potential clinical language found: ${clinicalHits.join(", ")}`);
  }

  if (findings.length === 0) {
    console.log(`PASS ${path.relative(ROOT, inputPath)}`);
  } else {
    console.error(`FAIL ${path.relative(ROOT, inputPath)}`);
    for (const finding of findings) {
      console.error(`- ${finding}`);
    }
    process.exit(1);
  }

}

run();
