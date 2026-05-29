const { spawnSync } = require("node:child_process");
const { writeFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const startedAt = Date.now();

const result = spawnSync("./node_modules/.bin/next", ["build"], {
  stdio: "inherit",
  shell: true,
});

const durationMs = Date.now() - startedAt;
const outputDir = join(process.cwd(), "artifacts");
const outputPath = join(outputDir, "build-metrics.json");

mkdirSync(outputDir, { recursive: true });
writeFileSync(
  outputPath,
  JSON.stringify({
    startedAt: new Date(startedAt).toISOString(),
    durationMs,
    exitCode: result.status,
  }, null, 2),
);

console.log(`Build metrics written to ${outputPath}`);
process.exit(result.status ?? 1);
