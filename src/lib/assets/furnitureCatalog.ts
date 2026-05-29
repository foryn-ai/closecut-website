import { readdir } from "node:fs/promises";
import path from "node:path";

export type FurnitureAsset = {
  filename: string;
  src: string;
  displayName: string;
  alt: string;
};

const FURNITURE_PUBLIC_DIR = path.join(process.cwd(), "public", "furniture");
const IMAGE_EXTENSIONS = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp"]);

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function normalizeNoun(tokens: string[]) {
  const filtered = tokens.filter(
    (token) => !["color", "elevation", "view", "front", "side", "back"].includes(token),
  );
  return filtered.length > 0 ? filtered : tokens;
}

function makeDisplayName(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  const tokens = base.split("-").filter(Boolean);
  const variantTokens = tokens.filter((token) => /^\d+$/.test(token));
  const nounTokens = normalizeNoun(tokens.filter((token) => !/^\d+$/.test(token)));
  const noun = toTitleCase(nounTokens.join(" "));
  if (variantTokens.length === 0) return noun;
  return `${noun} ${variantTokens.join(" ")}`;
}

function makeAlt(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  const tokens = base.split("-").filter(Boolean);
  const hasSide = tokens.includes("side");
  const hasFront = tokens.includes("front");
  const hasBack = tokens.includes("back");
  const hasElevation = tokens.includes("elevation");
  const variant = tokens.find((token) => /^\d+$/.test(token));
  const nounTokens = normalizeNoun(tokens.filter((token) => !/^\d+$/.test(token)));
  const noun = nounTokens.join(" ").replace(/\bcomputer\b/g, "computer monitor");

  if (hasSide) return `Side view illustration of ${noun}.`;
  if (hasFront) return `Front view illustration of ${noun}.`;
  if (hasBack) return `Back view illustration of ${noun}.`;
  if (hasElevation) {
    return variant
      ? `Elevation illustration of ${noun}, variant ${variant}.`
      : `Elevation illustration of ${noun}.`;
  }
  return variant
    ? `Illustration of ${noun}, variant ${variant}.`
    : `Illustration of ${noun}.`;
}

export async function listFurnitureAssets(): Promise<FurnitureAsset[]> {
  const filenames = await readdir(FURNITURE_PUBLIC_DIR);
  return filenames
    .filter((filename) => IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => ({
      filename,
      src: `/furniture/${filename}`,
      displayName: makeDisplayName(filename),
      alt: makeAlt(filename),
    }));
}
