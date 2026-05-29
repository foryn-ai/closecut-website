require("ts-node/register/transpile-only");

const { writeFileSync, mkdirSync } = require("node:fs");
const { dirname, join } = require("node:path");

const { INTENSIVE_COPY, COPY_VERSION } = require("../src/lib/copy/therafoxWebsite");

const outputPath = join(
  process.cwd(),
  "artifacts",
  "intensive.copy.export.json",
);

mkdirSync(dirname(outputPath), { recursive: true });

const payload = {
  COPY_VERSION,
  copy: INTENSIVE_COPY,
};

writeFileSync(outputPath, JSON.stringify(payload, null, 2));

console.log(`Copy export written to ${outputPath}`);
