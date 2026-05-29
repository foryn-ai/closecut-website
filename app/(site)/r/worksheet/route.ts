import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/content/resources/utils";
import { trackServerEvent } from "@/lib/analytics/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug")?.trim();
  const assetId = url.searchParams.get("asset")?.trim();

  if (!slug || !assetId) {
    return NextResponse.redirect(new URL("/resources", request.url), 302);
  }

  const resource = getResourceBySlug(slug);
  const asset = resource?.worksheets?.assets.find((entry) => entry.id === assetId);

  if (!resource || !asset) {
    return NextResponse.redirect(new URL("/resources", request.url), 302);
  }

  trackServerEvent("worksheet_download_click", {
    slug,
    assetId,
  });

  const destination = asset.url.startsWith("http")
    ? asset.url
    : new URL(asset.url, request.url).toString();

  return NextResponse.redirect(destination, 302);
}
