"use client";

import Image from "next/image";
import { track } from "@/lib/analytics/adapter";
import type { Resource } from "@/content/resources/types";
import { SITE_COPY } from "@/lib/copy";
import { IconBadge } from "@/components/shared/IconBadge";

type WorksheetDownloadsProps = {
  slug: string;
  worksheets: NonNullable<Resource["worksheets"]>;
  links: Record<string, string>;
};

export function WorksheetDownloads({ slug, worksheets, links }: WorksheetDownloadsProps) {
  const { resources: resourcesCopy } = SITE_COPY;

  return (
    <section aria-labelledby="worksheets-heading" className="space-y-4">
      <div className="flex items-center gap-3">
        <IconBadge src={resourcesCopy.worksheetsIconSrc} size={32} />
        <h2 id="worksheets-heading" className="t-h3">
          {resourcesCopy.worksheetsTitle}
        </h2>
      </div>
      {worksheets.previewImage ? (
        <div className="overflow-hidden rounded-xl border border-border bg-surface-1">
          <Image
            src={worksheets.previewImage}
            alt={resourcesCopy.worksheetPreviewAlt}
            width={1200}
            height={630}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
        </div>
      ) : null}
      {worksheets.notes ? <p className="t-body-sm text-body">{worksheets.notes}</p> : null}
      <ul className="grid gap-4">
        {worksheets.assets.map((asset) => {
          const href = links[asset.id] ?? asset.url;
          return (
            <li key={asset.id}>
              <a
                href={href}
                className="group block rounded-xl border border-border bg-surface-1 p-4 transition-colors hover:border-primary/40"
                onClick={() => {
                  track("worksheet_download_click", {
                    slug,
                    assetId: asset.id,
                  });
                }}
              >
                <div className="grid items-center gap-4 sm:grid-cols-[120px_1fr]">
                  <div className="relative mx-auto w-[110px] sm:mx-0">
                    <div className="aspect-[8.5/11] rounded-md border border-border bg-white p-3 shadow-sm">
                      <div className="h-2.5 w-12 rounded bg-heading/10" />
                      <div className="mt-2 space-y-1.5">
                        <div className="h-1.5 w-full rounded bg-body/15" />
                        <div className="h-1.5 w-5/6 rounded bg-body/15" />
                        <div className="h-1.5 w-full rounded bg-body/15" />
                        <div className="h-1.5 w-2/3 rounded bg-body/15" />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {resourcesCopy.worksheetFormatLabel}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-heading">{asset.label}</p>
                    <p className="text-sm text-primary underline-offset-4 group-hover:underline">
                      {resourcesCopy.worksheetCtaLabel}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
