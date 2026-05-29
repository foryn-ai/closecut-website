import type { Resource } from "@/content/resources/types";
import { RESOURCES_TRACK_CITATIONS, RESOURCES_TRACK_WORKSHEETS } from "@/lib/resources/config";

export function getCitationHref(slug: string, citationId: string, url: string) {
  if (!RESOURCES_TRACK_CITATIONS) return url;
  const query = new URLSearchParams({ slug, cite: citationId });
  return `/r/cite?${query.toString()}`;
}

export function getWorksheetHref(slug: string, assetId: string, url: string) {
  if (!RESOURCES_TRACK_WORKSHEETS) return url;
  const query = new URLSearchParams({ slug, asset: assetId });
  return `/r/worksheet?${query.toString()}`;
}

export function buildCitationLinkMap(resource: Resource) {
  return Object.fromEntries(
    resource.citations.map((citation) => [
      citation.id,
      getCitationHref(resource.slug, citation.id, citation.url),
    ]),
  );
}

export function buildWorksheetLinkMap(resource: Resource) {
  if (!resource.worksheets) return {};
  return Object.fromEntries(
    resource.worksheets.assets.map((asset) => [
      asset.id,
      getWorksheetHref(resource.slug, asset.id, asset.url),
    ]),
  );
}
