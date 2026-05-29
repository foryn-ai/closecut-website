const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const configPath = join(process.cwd(), "next.config.ts");
const contents = readFileSync(configPath, "utf8");

const requiredHeaders = [
  "Content-Security-Policy",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Strict-Transport-Security",
];

const errors = requiredHeaders.filter((header) => !contents.includes(header));

if (errors.length > 0) {
  console.error("Headers audit failed:");
  errors.forEach((header) => console.error(`- Missing ${header}`));
  process.exit(1);
}

console.log("Headers audit passed.");
