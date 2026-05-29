const { existsSync, readFileSync, readdirSync, statSync } = require("node:fs");
const { join, extname } = require("node:path");

const bannedTerms = [
  "peace",
  "healing",
  "zen",
  "unlock now",
  "safe space",
  "relationship healing",
  "better communication",
  "conflict resolution",
  "compromise",
];

const bannedPatterns = bannedTerms.map((term) => new RegExp(term, "i"));
const emDashPattern = /—/;

const targets = [
  join(process.cwd(), "app", "(site)"),
  join(process.cwd(), "src", "components"),
  join(process.cwd(), "src", "lib", "copy"),
  join(process.cwd(), "src", "lib", "seo"),
  join(process.cwd(), "AGENTS.md"),
];

const jsxScanTargets = [
  join(process.cwd(), "app", "(site)", "intensive"),
  join(process.cwd(), "src", "components", "bridge-weekend"),
  join(process.cwd(), "src", "components", "bridge-weekend-v2"),
];

const accessibilityScanTargets = [
  join(process.cwd(), "app"),
  join(process.cwd(), "src", "components"),
];

const matches = [];

function scanFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  lines.forEach((line, lineIndex) => {
    if (/^\s*(id|title|author|coverSrc|coverAlt|linkHref):\s*/.test(line)) {
      return;
    }

    bannedPatterns.forEach((pattern, index) => {
      if (pattern.test(line)) {
        matches.push(
          `Banned term '${bannedTerms[index]}' found in ${filePath}#L${lineIndex + 1}`,
        );
      }
    });
  });
  if (emDashPattern.test(content)) {
    matches.push(`Em dash found in ${filePath}`);
  }
}

function scanPath(path) {
  if (!existsSync(path)) return;
  const stats = statSync(path);
  if (stats.isFile()) {
    scanFile(path);
    return;
  }

  readdirSync(path).forEach((entry) => {
    const fullPath = join(path, entry);
    const entryStats = statSync(fullPath);
    if (entryStats.isDirectory()) {
      scanPath(fullPath);
      return;
    }

    if (entryStats.isFile()) {
      scanFile(fullPath);
    }
  });
}

function scanJsxStrings(path) {
  if (!existsSync(path)) return;
  const stats = statSync(path);
  if (stats.isFile()) {
    if (extname(path) === ".tsx") {
      checkJsxFile(path);
    }
    return;
  }

  readdirSync(path).forEach((entry) => {
    const fullPath = join(path, entry);
    const entryStats = statSync(fullPath);
    if (entryStats.isDirectory()) {
      scanJsxStrings(fullPath);
      return;
    }

    if (entryStats.isFile() && extname(fullPath) === ".tsx") {
      checkJsxFile(fullPath);
    }
  });
}

function checkJsxFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const lineRegex = /<[^>]+>\s*[A-Za-z][^<>{]{18,}\s*<\/[^>]+>/;
  lines.forEach((line, index) => {
    if (lineRegex.test(line)) {
      const trimmed = line.trim();
      matches.push(`Long JSX text literal found in ${filePath}#L${index + 1}: "${trimmed}"`);
    }
  });
}

function scanAccessibilityLiterals(path) {
  if (!existsSync(path)) return;
  const stats = statSync(path);
  if (stats.isFile()) {
    if (extname(path) === ".tsx") {
      checkAccessibilityLiterals(path);
    }
    return;
  }

  readdirSync(path).forEach((entry) => {
    const fullPath = join(path, entry);
    const entryStats = statSync(fullPath);
    if (entryStats.isDirectory()) {
      scanAccessibilityLiterals(fullPath);
      return;
    }

    if (entryStats.isFile() && extname(fullPath) === ".tsx") {
      checkAccessibilityLiterals(fullPath);
    }
  });
}

function checkAccessibilityLiterals(filePath) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const accessibilityLiteralPatterns = [
    { key: "alt", regex: /\balt\s*=\s*"[^"{][^"]*"/ },
    { key: "aria-label", regex: /\baria-label\s*=\s*"[^"{][^"]*"/ },
    { key: "title", regex: /\btitle\s*=\s*"[^"{][^"]*"/ },
    { key: "placeholder", regex: /\bplaceholder\s*=\s*"[^"{][^"]*"/ },
  ];

  lines.forEach((line, index) => {
    accessibilityLiteralPatterns.forEach(({ key, regex }) => {
      if (regex.test(line)) {
        matches.push(
          `Literal ${key} string found in ${filePath}#L${index + 1}. Use copy-sourced values instead.`,
        );
      }
    });
  });
}

for (const target of targets) {
  scanPath(target);
}

for (const target of jsxScanTargets) {
  scanJsxStrings(target);
}

for (const target of accessibilityScanTargets) {
  scanAccessibilityLiterals(target);
}

if (matches.length > 0) {
  console.error("Copy audit failed:");
  matches.forEach((match) => console.error(`- ${match}`));
  process.exit(1);
}

console.log("Copy audit passed.");
