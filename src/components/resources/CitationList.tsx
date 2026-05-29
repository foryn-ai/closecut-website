"use client";

import { track } from "@/lib/analytics/adapter";
import type { ResourceCitation } from "@/content/resources/types";
import { SITE_COPY } from "@/lib/copy";
import { IconBadge } from "@/components/shared/IconBadge";

type CitationListProps = {
  slug: string;
  citations: ResourceCitation[];
  links: Record<string, string>;
};

export function CitationList({ slug, citations, links }: CitationListProps) {
  const { resources: resourcesCopy } = SITE_COPY;

  return (
    <section aria-labelledby="citations-heading" className="space-y-4">
      <div className="flex items-center gap-3">
        <IconBadge src={resourcesCopy.citationsIconSrc} size={32} />
        <h2 id="citations-heading" className="t-h3">
          {resourcesCopy.citationsTitle}
        </h2>
      </div>
      <ol className="space-y-3">
        {citations.map((citation) => {
          const href = links[citation.id] ?? citation.url;
          return (
            <li key={citation.id} className="rounded-xl border border-border bg-surface-1 p-4">
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary underline-offset-4 hover:underline"
                aria-label={`${resourcesCopy.citationAriaLabel}: ${citation.title}`}
                onClick={() => {
                  const urlHost = new URL(citation.url).host;
                  track("resource_citation_click", {
                    slug,
                    citeId: citation.id,
                    urlHost,
                  });
                }}
              >
                {citation.title}
              </a>
              <p className="mt-1 text-sm text-body">
                {[citation.publisher, citation.year].filter(Boolean).join(" • ")}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
