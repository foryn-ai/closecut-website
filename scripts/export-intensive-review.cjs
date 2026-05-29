require("ts-node/register/transpile-only");

const { writeFileSync, mkdirSync } = require("node:fs");
const { dirname, join } = require("node:path");

const { INTENSIVE_COPY, COPY_VERSION } = require("../src/lib/copy/therafoxWebsite");
const { INTENSIVE_SEO, SEO_VERSION } = require("../src/lib/seo/siteMetadata");
const { MOMENTS } = require("../src/lib/pricing/planner");

const outputPath = join(
  process.cwd(),
  "artifacts",
  "intensive.review.export.json",
);

mkdirSync(dirname(outputPath), { recursive: true });

const catalogIds = MOMENTS.map((item) => item.id);

const payload = {
  COPY_VERSION,
  copy: INTENSIVE_COPY,
  SEO_VERSION,
  seo: INTENSIVE_SEO,
  catalog: catalogIds.map((id) => ({
    id,
    label: INTENSIVE_COPY.catalogCopy[id]?.label ?? null,
    description: INTENSIVE_COPY.catalogCopy[id]?.description ?? null,
  })),
};

writeFileSync(outputPath, JSON.stringify(payload, null, 2));

console.log(`Review export written to ${outputPath}`);
