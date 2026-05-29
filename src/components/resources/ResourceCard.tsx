import Link from "next/link";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { Resource } from "@/content/resources/types";
import { SITE_COPY } from "@/lib/copy";
import { chip, chipAccent } from "@/lib/ui/classes";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const { resources: resourcesCopy } = SITE_COPY;

  return (
    <SurfaceCard className="h-full" interactive>
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <span className={chip}>{resource.category}</span>
          <span className={chipAccent}>
            {resource.citations.length} {resourcesCopy.citationsLabel}
          </span>
          {resource.worksheets ? (
            <span className={chipAccent}>{resourcesCopy.worksheetTagLabel}</span>
          ) : null}
        </div>
        <Heading role="h3" className="text-[24px] leading-[1.2]">
          <Link href={`/resources/${resource.slug}`} className="focus-visible:underline">
            {resource.title}
          </Link>
        </Heading>
        <Text role="bodySmall" className="text-body">
          {resource.summary}
        </Text>
        <div className="mt-auto flex flex-wrap gap-2">
          {resource.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-body">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}
