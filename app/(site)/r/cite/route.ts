import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/content/resources/utils";
import { trackServerEvent } from "@/lib/analytics/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug")?.trim();
  const citeId = url.searchParams.get("cite")?.trim();

  if (!slug || !citeId) {
    return NextResponse.redirect(new URL("/resources", request.url), 302);
  }

  const resource = getResourceBySlug(slug);
  const citation = resource?.citations.find((entry) => entry.id === citeId);

  if (!resource || !citation) {
    return NextResponse.redirect(new URL("/resources", request.url), 302);
  }

  trackServerEvent("resource_citation_click", {
    slug,
    citeId,
    urlHost: new URL(citation.url).host,
  });

  return NextResponse.redirect(citation.url, 302);
}
