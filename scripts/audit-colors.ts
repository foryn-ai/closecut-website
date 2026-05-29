import { readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["src"];
const ALLOWED_HEX = new Set([
  "#fdfcfb",
  "#6b7f6d",
  "#2d3748",
  "#d4af37",
  "#718096",
]);
const STRICT = process.env.RUN_COLOR_AUDIT_STRICT === "true";

async function walk(dir: string, files: string[] = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function toRelative(filePath: string) {
  return path.relative(ROOT, filePath).replaceAll("\\", "/");
}

async function main() {
  const targetFiles: string[] = [];

  for (const directory of TARGET_DIRS) {
    const fullPath = path.join(ROOT, directory);
    const stats = statSync(fullPath, { throwIfNoEntry: false });
    if (!stats || !stats.isDirectory()) continue;
    const discovered = await walk(fullPath);
    targetFiles.push(...discovered);
  }

  const findings: Array<{ file: string; line: number; hex: string }> = [];
  const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;

  for (const fullPath of targetFiles) {
    const relativePath = toRelative(fullPath);

    const source = readFileSync(fullPath, "utf8");
    const lines = source.split("\n");
    lines.forEach((line: string, index: number) => {
      const matches = line.match(hexPattern);
      if (!matches) return;

      matches.forEach((rawHex: string) => {
        const hex = rawHex.toLowerCase();
        if (ALLOWED_HEX.has(hex)) return;
        findings.push({
          file: relativePath,
          line: index + 1,
          hex: rawHex,
        });
      });
    });
  }

  if (findings.length === 0) {
    console.log("Color audit clean. No off-palette hex colors found.");
    return;
  }

  console.log("Color audit warnings. Off-palette hex colors found:");
  findings.forEach((finding) => {
    console.log(`- ${finding.file}:${finding.line} -> ${finding.hex}`);
  });

  if (STRICT) {
    process.exitCode = 1;
  }
}

void main();
