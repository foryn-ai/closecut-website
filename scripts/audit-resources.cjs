require("ts-node/register/transpile-only");

const { RESOURCES } = require("../src/content/resources/resources");

const errors = [];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

RESOURCES.forEach((resource) => {
  if (!isNonEmptyString(resource.slug)) errors.push(`Resource slug missing for ${resource.title || "unknown"}`);
  if (!isNonEmptyString(resource.summary)) errors.push(`Resource summary missing for ${resource.slug}`);
  if (!Array.isArray(resource.tags) || resource.tags.length === 0) {
    errors.push(`Resource tags missing for ${resource.slug}`);
  }
  if (!Array.isArray(resource.keyConcepts) || resource.keyConcepts.length === 0) {
    errors.push(`Resource keyConcepts missing for ${resource.slug}`);
  }
  if (resource.updatedAt) {
    const updated = new Date(resource.updatedAt);
    if (Number.isNaN(updated.getTime())) {
      errors.push(`Resource updatedAt invalid for ${resource.slug}`);
    } else if (updated.getTime() > Date.now()) {
      errors.push(`Resource updatedAt is in the future for ${resource.slug}`);
    }
  }
});

if (errors.length > 0) {
  console.error("Resources audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Resources audit passed.");
