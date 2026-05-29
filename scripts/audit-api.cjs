const { execSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const files = execSync("rg --files app", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((file) => /\/api\/.+\/route\.ts$/.test(file) || /\/api\/route\.ts$/.test(file));

const errors = [];

files.forEach((file) => {
  const contents = readFileSync(file, "utf8");
  const matches = contents.matchAll(/NextResponse\.json\((\{[^\}]*\})/g);
  for (const match of matches) {
    const payload = match[1];
    if (!payload.includes("ok:")) {
      errors.push(`${file} JSON response missing ok field`);
    }
  }
});

if (errors.length > 0) {
  console.error("API audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("API audit passed.");
