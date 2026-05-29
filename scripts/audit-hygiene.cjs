const { readdirSync, statSync } = require("node:fs");
const { join, relative } = require("node:path");

const root = process.cwd();
const blockedNamePattern = /:Zone\.Identifier$/;
const skipDirs = new Set([".git", "node_modules", ".next", "out", "artifacts"]);

const findings = [];

function walk(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (skipDirs.has(entry)) continue;

    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (blockedNamePattern.test(entry)) {
      findings.push(relative(root, fullPath));
    }
  }
}

walk(root);

if (findings.length > 0) {
  console.error("Repo hygiene audit failed. Remove blocked file names:");
  findings.forEach((path) => console.error(`- ${path}`));
  process.exit(1);
}

console.log("Repo hygiene audit passed.");
