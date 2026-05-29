const { readFileSync, readdirSync, statSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const chunksDir = join(process.cwd(), ".next", "static", "chunks");
const baselinePath = join(process.cwd(), "artifacts", "bundle-baseline.json");

if (!existsSync(chunksDir)) {
  console.error(".next/static/chunks not found. Run next build first.");
  process.exit(1);
}

if (!existsSync(baselinePath)) {
  console.error("Bundle baseline not found. Run node scripts/bundle-baseline.cjs first.");
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
const baselineMap = new Map(baseline.chunks.map((chunk) => [chunk.name, chunk.size]));

const currentChunks = readdirSync(chunksDir)
  .filter((name) => name.endsWith(".js"))
  .map((name) => {
    const fullPath = join(chunksDir, name);
    const size = statSync(fullPath).size;
    return { name, size };
  });

const errors = [];
const totalBaseline = baseline.chunks.reduce((acc, chunk) => acc + chunk.size, 0);
const totalCurrent = currentChunks.reduce((acc, chunk) => acc + chunk.size, 0);

const totalIncrease = totalBaseline > 0 ? (totalCurrent - totalBaseline) / totalBaseline : 0;
if (totalIncrease > 0.15) {
  errors.push(`Total chunk size increased ${(totalIncrease * 100).toFixed(1)}%`);
}

currentChunks.forEach((chunk) => {
  const baselineSize = baselineMap.get(chunk.name);
  if (!baselineSize) return;
  const increase = (chunk.size - baselineSize) / baselineSize;
  if (increase > 0.2) {
    errors.push(`${chunk.name} increased ${(increase * 100).toFixed(1)}%`);
  }
});

if (errors.length > 0) {
  console.error("Bundle audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Bundle audit passed.");
