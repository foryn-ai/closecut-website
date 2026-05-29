const { readFileSync } = require("node:fs");
const { execSync } = require("node:child_process");

const files = execSync("rg --files app src", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"));

const imageUsages = [];

files.forEach((file) => {
  const contents = readFileSync(file, "utf8");
  if (!contents.includes("<Image")) return;

  const segments = contents.split("<Image");
  segments.shift();

  segments.forEach((segment) => {
    const snippet = segment.slice(0, 400);
    imageUsages.push({ file, snippet });
  });
});

const errors = [];
let priorityCount = 0;

imageUsages.forEach(({ file, snippet }) => {
  const hasSizes = /\bsizes=/.test(snippet);
  const hasFill = /\bfill\b/.test(snippet);
  const hasWidth = /\bwidth=/.test(snippet);
  const hasHeight = /\bheight=/.test(snippet);
  const hasPriority = /\bpriority\b/.test(snippet);

  if (hasPriority) priorityCount += 1;

  if (!hasSizes) {
    errors.push(`${file} Image missing sizes prop`);
  }

  if (!hasFill && (!hasWidth || !hasHeight)) {
    errors.push(`${file} Image missing width or height props`);
  }
});

if (priorityCount > 3) {
  errors.push(`Too many Image priority props: ${priorityCount}`);
}

if (errors.length > 0) {
  console.error("Image audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Image audit passed.");
