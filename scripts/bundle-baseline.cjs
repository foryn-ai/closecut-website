const { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const outputDir = join(process.cwd(), "artifacts");
const baselinePath = join(outputDir, "bundle-baseline.json");
const chunksDir = join(process.cwd(), ".next", "static", "chunks");

if (!existsSync(chunksDir)) {
  console.error(".next/static/chunks not found. Run next build first.");
  process.exit(1);
}

const chunks = readdirSync(chunksDir)
  .filter((name) => name.endsWith(".js"))
  .map((name) => {
    const fullPath = join(chunksDir, name);
    const size = statSync(fullPath).size;
    return { name, size };
  })
  .sort((a, b) => b.size - a.size);

mkdirSync(outputDir, { recursive: true });
writeFileSync(baselinePath, JSON.stringify({ createdAt: new Date().toISOString(), chunks }, null, 2));

console.log(`Bundle baseline written to ${baselinePath}`);
