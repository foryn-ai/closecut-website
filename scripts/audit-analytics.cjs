const { execSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const analyticsEventsSource = readFileSync(
  join(process.cwd(), "src", "lib", "analytics", "events.ts"),
  "utf8",
);
const analyticsEventValues = [...analyticsEventsSource.matchAll(/:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);

const files = execSync("rg -F -n \"track(\" app src", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(":"))
  .map(([file, lineNumber]) => ({ file, lineNumber: Number(lineNumber) }));

const allowed = new Set(analyticsEventValues);
const errors = [];

files.forEach(({ file }) => {
  const contents = readFileSync(file, "utf8");
  const matches = contents.matchAll(/track\(\s*["'`](.+?)["'`]/g);
  for (const match of matches) {
    const eventName = match[1];
    if (!allowed.has(eventName)) {
      errors.push(`${file} uses unknown analytics event: ${eventName}`);
    }
  }
});

if (errors.length > 0) {
  console.error("Analytics audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Analytics audit passed.");
