require("ts-node/register/transpile-only");

const { writeFileSync, mkdirSync } = require("node:fs");
const { dirname, join } = require("node:path");

const { RESOURCES } = require("../src/content/resources/resources");

const outputPath = join(process.cwd(), "artifacts", "resources.review.export.md");
mkdirSync(dirname(outputPath), { recursive: true });

const lines = [];
const addLine = (line = "") => lines.push(line);

addLine("# Resource Review Export");
addLine();
addLine("Use this document for clinician review. Edit text directly.");
addLine();

RESOURCES.forEach((resource, index) => {
  if (index > 0) addLine("\n---\n");
  addLine("## Resource");
  addLine(`- Slug: ${resource.slug}`);
  addLine(`- Title: ${resource.title}`);
  addLine(`- Category: ${resource.category}`);
  addLine(`- Summary: ${resource.summary}`);
  addLine(`- Tags: ${resource.tags.join(", ")}`);
  addLine(`- Key concepts: ${resource.keyConcepts.join(", ")}`);
  addLine(`- Updated at: ${resource.updatedAt || ""}`);
  addLine();
  addLine("## Citations");
  if (!resource.citations || resource.citations.length === 0) {
    addLine("- Title:");
    addLine("  Publisher:");
    addLine("  Year:");
    addLine("  URL:");
    addLine("  Kind:");
  } else {
    resource.citations.forEach((citation) => {
      addLine(`- Title: ${citation.title}`);
      addLine(`  Publisher: ${citation.publisher || ""}`);
      addLine(`  Year: ${citation.year || ""}`);
      addLine(`  URL: ${citation.url}`);
      addLine(`  Kind: ${citation.kind}`);
    });
  }
  addLine();
  addLine("## Worksheets");
  if (!resource.worksheets) {
    addLine("- Notes:");
    addLine("- Preview image path:");
    addLine("- Assets:");
    addLine("  - Label:");
    addLine("    URL:");
    addLine("    Type:");
  } else {
    addLine(`- Notes: ${resource.worksheets.notes || ""}`);
    addLine(`- Preview image path: ${resource.worksheets.previewImage || ""}`);
    addLine("- Assets:");
    resource.worksheets.assets.forEach((asset) => {
      addLine(`  - Label: ${asset.label}`);
      addLine(`    URL: ${asset.url}`);
      addLine(`    Type: ${asset.type}`);
    });
  }
});

writeFileSync(outputPath, lines.join("\n"));
console.log(`Resources review export written to ${outputPath}`);
