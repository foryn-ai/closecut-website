#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function getInputPath(args) {
  if (args.input) {
    return path.isAbsolute(args.input) ? args.input : path.join(ROOT, args.input);
  }
  return null;
}

function replaceSection(content, heading, body) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped}\\s*)([\\s\\S]*?)(?=\\n## |$)`);
  const trimmed = body.trim();
  return content.replace(re, `$1${trimmed}\n`);
}

function buildPrompt(markdown) {
  const resourceMatch = markdown.match(/Resource slug:\s*`([^`]+)`/);
  const resourceSlug = resourceMatch ? resourceMatch[1] : "unknown-resource";

  return [
    "You are writing one-page educational worksheet content.",
    "Return ONLY valid JSON with this schema:",
    '{"header_paragraph_1":"...","header_paragraph_2":"...","why":["...","...","..."],"how":["...","...","...","..."],"pro_tip":"...","footer":"..."}',
    "Constraints:",
    "- No clinical content.",
    "- No hype language.",
    "- No em dash.",
    "- Header must be exactly 2 paragraphs and 60-70 words total.",
    "- Why must be exactly 3 bullets, 45-60 words total.",
    "- Each Why bullet must start with one of: Supports, Reduces, Improves, Protects.",
    "- How must be exactly 4 numbered-step style lines, 60-80 words total.",
    "- Each How step must start with one of: Name, Pause, Scan, State, Ask, Close.",
    "- Pro tip must be 15-20 words, non controversial, practical.",
    "- Avoid words: always, should, fix, heal, diagnose.",
    "- Keep language private, precise, product focused.",
    "- Be expert-level accurate on the worksheet topic and keep explanations educational and concrete.",
    `Resource slug: ${resourceSlug}`,
    "Current draft context:",
    markdown,
  ].join("\n");
}

function getOutputText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const chunks = [];
  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item.content) ? item.content : [];
    for (const part of content) {
      if (part && typeof part.text === "string") {
        chunks.push(part.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

async function callOpenAI({ apiKey, model, prompt }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const payload = await response.json();
  const text = getOutputText(payload);
  if (!text) {
    throw new Error("OpenAI API returned empty output");
  }

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}$/);
    if (!jsonMatch) {
      throw new Error("Could not parse model output as JSON");
    }
    return JSON.parse(jsonMatch[0]);
  }
}

function validateResult(result) {
  const errors = [];
  if (!result || typeof result !== "object") {
    return ["Model output is not an object"];
  }

  const required = [
    "header_paragraph_1",
    "header_paragraph_2",
    "why",
    "how",
    "pro_tip",
    "footer",
  ];
  for (const key of required) {
    if (!(key in result)) {
      errors.push(`Missing key: ${key}`);
    }
  }

  if (!Array.isArray(result.why) || result.why.length !== 3) {
    errors.push("why must be an array of 3 items");
  }
  if (!Array.isArray(result.how) || result.how.length !== 4) {
    errors.push("how must be an array of 4 items");
  }

  return errors;
}

function applyGeneratedContent(markdown, result) {
  const header = `${result.header_paragraph_1.trim()}\n\n${result.header_paragraph_2.trim()}`;
  const why = result.why.map((line) => `- ${line.trim()}`).join("\n");
  const how = result.how.map((line, idx) => `${idx + 1}. ${line.trim()}`).join("\n");

  let out = markdown;
  out = replaceSection(out, "## Hero Header `{{HEADER}}`", header);
  out = replaceSection(out, "## The Why `{{WHY}}`", why);
  out = replaceSection(out, "## The How `{{HOW}}`", how);
  out = replaceSection(out, "## The Pro Tip `{{PRO_TIP}}`", result.pro_tip);
  out = replaceSection(out, "## Footer/Source `{{FOOTER}}`", result.footer);
  return out;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = getInputPath(args);
  if (!inputPath) {
    console.error("Usage: npm run worksheet:generate -- --input worksheets/drafts/<file>.md [--model gpt-5-mini] [--write]");
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${path.relative(ROOT, inputPath)}`);
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY in environment");
    process.exit(1);
  }

  const model = args.model || "gpt-5-mini";
  const markdown = fs.readFileSync(inputPath, "utf8");
  const prompt = buildPrompt(markdown);

  const generated = await callOpenAI({ apiKey, model, prompt });
  const issues = validateResult(generated);
  if (issues.length > 0) {
    console.error("Invalid model output:");
    for (const issue of issues) console.error(`- ${issue}`);
    process.exit(1);
  }

  const output = applyGeneratedContent(markdown, generated);

  if (args.write) {
    fs.writeFileSync(inputPath, output, "utf8");
    console.log(`Updated ${path.relative(ROOT, inputPath)} with model ${model}`);
    return;
  }

  const outPath = path.join(
    path.dirname(inputPath),
    `${path.basename(inputPath, ".md")}__generated.md`,
  );
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`Wrote ${path.relative(ROOT, outPath)} with model ${model}`);
}

run().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
