require("ts-node/register/transpile-only");

const {
  INTENSIVE_SEO,
  PAGE_SEO,
  RESOURCES_SEO,
  THERAFOX_SITE_SEO,
  SEO_LAST_MODIFIED,
} = require("../src/lib/seo/siteMetadata");

const errors = [];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const checkMeta = (label, meta) => {
  if (!meta) {
    errors.push(`${label} is missing`);
    return;
  }
  if (!isNonEmptyString(meta.title)) errors.push(`${label}.title is required`);
  if (!isNonEmptyString(meta.description)) errors.push(`${label}.description is required`);
  if (!isNonEmptyString(meta.canonicalPath)) errors.push(`${label}.canonicalPath is required`);
  if (meta.canonicalPath && !meta.canonicalPath.startsWith("/")) {
    errors.push(`${label}.canonicalPath must start with /`);
  }
  if (!meta.openGraph) errors.push(`${label}.openGraph is required`);
  if (meta.openGraph) {
    if (!isNonEmptyString(meta.openGraph.title)) {
      errors.push(`${label}.openGraph.title is required`);
    }
    if (!isNonEmptyString(meta.openGraph.description)) {
      errors.push(`${label}.openGraph.description is required`);
    }
    if (!isNonEmptyString(meta.openGraph.imageAlt)) {
      errors.push(`${label}.openGraph.imageAlt is required`);
    }
  }
  if (!meta.twitter) errors.push(`${label}.twitter is required`);
  if (meta.twitter) {
    if (!isNonEmptyString(meta.twitter.title)) errors.push(`${label}.twitter.title is required`);
    if (!isNonEmptyString(meta.twitter.description)) {
      errors.push(`${label}.twitter.description is required`);
    }
  }
};

checkMeta("THERAFOX_SITE_SEO", THERAFOX_SITE_SEO);
checkMeta("PAGE_SEO.home", PAGE_SEO.home);
checkMeta("PAGE_SEO.therapy", PAGE_SEO.therapy);
checkMeta("PAGE_SEO.about", PAGE_SEO.about);
checkMeta("PAGE_SEO.contact", PAGE_SEO.contact);
checkMeta("PAGE_SEO.workshops", PAGE_SEO.workshops);
checkMeta("INTENSIVE_SEO", INTENSIVE_SEO);

if (!RESOURCES_SEO?.index) {
  errors.push("RESOURCES_SEO.index is required");
} else {
  if (!isNonEmptyString(RESOURCES_SEO.index.title)) errors.push("RESOURCES_SEO.index.title is required");
  if (!isNonEmptyString(RESOURCES_SEO.index.description)) {
    errors.push("RESOURCES_SEO.index.description is required");
  }
  if (!isNonEmptyString(RESOURCES_SEO.index.canonicalPath)) {
    errors.push("RESOURCES_SEO.index.canonicalPath is required");
  }
  if (!RESOURCES_SEO.index.canonicalPath.startsWith("/")) {
    errors.push("RESOURCES_SEO.index.canonicalPath must start with /");
  }
  if (!isNonEmptyString(RESOURCES_SEO.index.openGraph?.imageAlt)) {
    errors.push("RESOURCES_SEO.index.openGraph.imageAlt is required");
  }
  if (!isNonEmptyString(RESOURCES_SEO.index.twitter?.title)) {
    errors.push("RESOURCES_SEO.index.twitter.title is required");
  }
  if (!isNonEmptyString(RESOURCES_SEO.index.twitter?.description)) {
    errors.push("RESOURCES_SEO.index.twitter.description is required");
  }
}

const lastModifiedDate = new Date(SEO_LAST_MODIFIED);
if (Number.isNaN(lastModifiedDate.getTime())) {
  errors.push("SEO_LAST_MODIFIED must be a valid date string");
} else if (lastModifiedDate.getTime() > Date.now()) {
  errors.push("SEO_LAST_MODIFIED must not be in the future");
}

if (errors.length > 0) {
  console.error("SEO audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("SEO audit passed.");
