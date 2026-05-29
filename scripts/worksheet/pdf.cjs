#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../..");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : "";
    args[key] = value;
    if (value) i += 1;
  }
  return args;
}

function resolvePath(value) {
  if (!value) return "";
  return path.isAbsolute(value) ? value : path.join(ROOT, value);
}

function findBrowser() {
  const candidates = ["google-chrome", "chromium-browser", "chromium", "google-chrome-stable"];
  for (const candidate of candidates) {
    const probe = spawnSync("bash", ["-lc", `command -v ${candidate}`], { encoding: "utf8" });
    if (probe.status === 0 && probe.stdout.trim()) {
      return probe.stdout.trim();
    }
  }
  return "";
}

function getPageCount(pdfPath) {
  const scan = fs.readFileSync(pdfPath, "latin1");
  const matches = scan.match(/\/Type\s*\/Page(?!s)\b/g);
  return matches ? matches.length : 0;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = resolvePath(args.input);
  const outputPath = resolvePath(args.out);

  if (!inputPath || !outputPath) {
    console.error("Usage: npm run worksheet:pdf -- --input exports/worksheets/<file>.html --out public/downloads/resources/<slug>/<file>.pdf");
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${path.relative(ROOT, inputPath)}`);
    process.exit(1);
  }

  const browser = findBrowser();
  if (!browser) {
    console.error("No Chromium browser found. Install google-chrome or chromium to export PDF.");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const fileUrl = `file://${inputPath}`;
  const result = spawnSync(
    browser,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      `--print-to-pdf=${outputPath}`,
      "--no-pdf-header-footer",
      fileUrl,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    console.error(result.stderr || "PDF export failed");
    process.exit(1);
  }

  const pages = getPageCount(outputPath);
  if (pages !== 1) {
    console.error(`PDF must be one page, got ${pages} pages`);
    process.exit(1);
  }

  console.log(`Exported ${path.relative(ROOT, outputPath)}`);
}

run();
