#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const DRAFTS_DIR = path.join(ROOT, "worksheets/drafts");
const ICONS_DIR = path.join(ROOT, "public/icons");

const REQUIRED_HEADINGS = [
  "## 4 Row Table Layout",
  "## Hero Header `{{HEADER}}`",
  "## Hero Icon `{{ICON_HERO}}`",
  "## Why Icon `{{ICON_WHY}}`",
  "## How Icon `{{ICON_HOW}}`",
  "## The Why `{{WHY}}`",
  "## The How `{{HOW}}`",
  "## The Pro Tip `{{PRO_TIP}}`",
  "## Footer/Source `{{FOOTER}}`",
];
const WHY_START_VERBS = ["supports", "reduces", "improves", "protects"];
const HOW_START_VERBS = ["name", "pause", "scan", "state", "ask", "close"];
const BANNED_INTERPRETATION_WORDS = ["always", "should", "fix", "heal", "diagnose"];

function countWords(content) {
  return (content.match(/\b[\w']+\b/g) || []).length;
}

function extractSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped}\\s*([\\s\\S]*?)(\\n## |\\s*$)`);
  const match = content.match(pattern);
  return match ? match[1].trim() : "";
}

function validateWordRange(value, min, max, label, problems) {
  const words = countWords(value);
  if (words < min || words > max) {
    problems.push(`${label} word count ${words} is outside ${min}-${max}`);
  }
}

function firstWord(value) {
  const match = value.trim().toLowerCase().match(/^([a-z']+)/);
  return match ? match[1] : "";
}

function startsWithCapital(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[A-Z]/.test(trimmed);
}

function findBannedWords(text) {
  const lowered = text.toLowerCase();
  return BANNED_INTERPRETATION_WORDS.filter((word) => new RegExp(`\\b${word}\\b`, "i").test(lowered));
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const problems = [];

  if (!content.startsWith("# ")) {
    problems.push("Missing H1 title");
  }

  for (const heading of REQUIRED_HEADINGS) {
    if (!content.includes(heading)) {
      problems.push(`Missing heading: ${heading}`);
    }
  }

  const headerSection = extractSection(content, "## Hero Header `{{HEADER}}`");
  const whySection = extractSection(content, "## The Why `{{WHY}}`");
  const howSection = extractSection(content, "## The How `{{HOW}}`");
  const proTipSection = extractSection(content, "## The Pro Tip `{{PRO_TIP}}`");
  const footerSection = extractSection(content, "## Footer/Source `{{FOOTER}}`");
  const heroIconSection = extractSection(content, "## Hero Icon `{{ICON_HERO}}`");
  const whyIconSection = extractSection(content, "## Why Icon `{{ICON_WHY}}`");
  const howIconSection = extractSection(content, "## How Icon `{{ICON_HOW}}`");

  validateWordRange(headerSection, 60, 70, "Hero Header", problems);
  validateWordRange(whySection, 45, 60, "The Why", problems);
  validateWordRange(howSection, 60, 80, "The How", problems);
  validateWordRange(proTipSection, 15, 20, "The Pro Tip", problems);

  const footerWords = countWords(footerSection);
  if (footerWords === 0 || footerWords > 10) {
    problems.push(`Footer/Source word count ${footerWords} must be 1-10`);
  }

  const whyBullets = whySection
    .split("\n")
    .filter((line) => /^-\s+\S+/.test(line.trim()));
  if (whyBullets.length !== 3) {
    problems.push(`The Why must contain exactly 3 bullets, found ${whyBullets.length}`);
  }

  const howSteps = howSection
    .split("\n")
    .filter((line) => /^\d+\.\s+\S+/.test(line.trim()));
  if (howSteps.length !== 4) {
    problems.push(`The How must contain exactly 4 steps, found ${howSteps.length}`);
  }

  for (const [index, line] of whyBullets.entries()) {
    const bulletText = line.replace(/^-\s+/, "");
    const verb = firstWord(bulletText);
    if (!WHY_START_VERBS.includes(verb)) {
      problems.push(
        `The Why bullet ${index + 1} must start with one of: ${WHY_START_VERBS.join(", ")}`,
      );
    }
    if (!startsWithCapital(bulletText)) {
      problems.push(`The Why bullet ${index + 1} must start with a capitalized first word`);
    }
  }

  for (const [index, line] of howSteps.entries()) {
    const stepText = line.replace(/^\d+\.\s+/, "");
    const verb = firstWord(stepText);
    if (!HOW_START_VERBS.includes(verb)) {
      problems.push(
        `The How step ${index + 1} must start with one of: ${HOW_START_VERBS.join(", ")}`,
      );
    }
    if (!startsWithCapital(stepText)) {
      problems.push(`The How step ${index + 1} must start with a capitalized first word`);
    }
  }

  const whyBannedWords = findBannedWords(whySection);
  if (whyBannedWords.length > 0) {
    problems.push(`The Why contains banned words: ${whyBannedWords.join(", ")}`);
  }

  const howBannedWords = findBannedWords(howSection);
  if (howBannedWords.length > 0) {
    problems.push(`The How contains banned words: ${howBannedWords.join(", ")}`);
  }

  const proTipBannedWords = findBannedWords(proTipSection);
  if (proTipBannedWords.length > 0) {
    problems.push(`The Pro Tip contains banned words: ${proTipBannedWords.join(", ")}`);
  }

  const headerParagraphs = headerSection
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (headerParagraphs.length !== 2) {
    problems.push(`Hero Header must contain exactly 2 paragraphs, found ${headerParagraphs.length}`);
  }

  const iconSections = [
    { label: "Hero Icon", section: heroIconSection },
    { label: "Why Icon", section: whyIconSection },
    { label: "How Icon", section: howIconSection },
  ];
  const defaultIconLines = [
    "Icon concept label (one word):",
    "- Filename:",
    "- Library:",
    "- Weight: Thin or Light",
    "- Output size: 60px x 60px",
  ];
  const seenIconFilenames = new Set();
  for (const icon of iconSections) {
    const iconLines = icon.section
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (iconLines.length === 0 || iconLines.every((line) => defaultIconLines.includes(line))) {
      problems.push(`${icon.label} is missing icon details`);
      continue;
    }

    const filenameLine = iconLines.find((line) => line.toLowerCase().startsWith("- filename:"));
    const iconLabelLine = iconLines.find((line) =>
      line.toLowerCase().startsWith("icon concept label (one word):"),
    );
    if (!iconLabelLine) {
      problems.push(`${icon.label} is missing one word concept label`);
    } else {
      const iconLabel = iconLabelLine.split(":").slice(1).join(":").trim();
      if (!iconLabel) {
        problems.push(`${icon.label} concept label is empty`);
      } else if (!/^[A-Za-z][A-Za-z-]*$/.test(iconLabel)) {
        problems.push(`${icon.label} concept label must be one word`);
      }
    }

    if (!filenameLine) {
      problems.push(`${icon.label} is missing - Filename`);
      continue;
    }

    const filename = filenameLine.split(":").slice(1).join(":").trim();
    if (!filename) {
      problems.push(`${icon.label} filename is empty`);
      continue;
    }
    if (!/^[a-z0-9-]+\.(svg|png)$/i.test(filename)) {
      problems.push(`${icon.label} filename must be a .svg or .png icon file, got ${filename}`);
      continue;
    }
    if (!fs.existsSync(path.join(ICONS_DIR, filename))) {
      problems.push(`${icon.label} file not found in public/icons: ${filename}`);
      continue;
    }
    if (seenIconFilenames.has(filename)) {
      problems.push(`${icon.label} must use a different icon filename, duplicate found: ${filename}`);
      continue;
    }
    seenIconFilenames.add(filename);
  }

  if (content.includes("—")) {
    problems.push("Contains em dash character");
  }

  return problems;
}

function run() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    console.log("No worksheet drafts found.");
    return;
  }

  const files = fs
    .readdirSync(DRAFTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    console.log("No worksheet drafts found.");
    return;
  }

  let hasErrors = false;

  for (const file of files) {
    const fullPath = path.join(DRAFTS_DIR, file);
    const problems = lintFile(fullPath);
    if (problems.length === 0) {
      console.log(`OK ${path.relative(ROOT, fullPath)}`);
      continue;
    }

    hasErrors = true;
    console.error(`FAIL ${path.relative(ROOT, fullPath)}`);
    for (const problem of problems) {
      console.error(`  - ${problem}`);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

run();
