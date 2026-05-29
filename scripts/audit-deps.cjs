const { readFileSync, existsSync } = require("node:fs");
const { join } = require("node:path");

const pkgPath = join(process.cwd(), "package.json");
const lockPath = join(process.cwd(), "package-lock.json");

if (!existsSync(lockPath)) {
  console.error("package-lock.json is missing");
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const lock = JSON.parse(readFileSync(lockPath, "utf8"));

const errors = [];

if (pkg.name !== lock.name) {
  errors.push(`package-lock name mismatch: ${lock.name}`);
}

if (pkg.version !== lock.version) {
  errors.push(`package-lock version mismatch: ${lock.version}`);
}

const deps = Object.keys(pkg.dependencies || {});
const devDeps = Object.keys(pkg.devDependencies || {});
const missing = [];

[...deps, ...devDeps].forEach((dep) => {
  if (!lock.packages || !lock.packages[`node_modules/${dep}`]) {
    missing.push(dep);
  }
});

if (missing.length > 0) {
  errors.push(`package-lock missing deps: ${missing.join(", ")}`);
}

if (errors.length > 0) {
  console.error("Dependency audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Dependency audit passed.");
