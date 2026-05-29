import Link from "next/link";
import type { Resource } from "@/content/resources/types";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { Heading } from "@/components/ui/Heading";
import { SITE_COPY } from "@/lib/copy";
import { IconBadge } from "@/components/shared/IconBadge";

type RelatedResourcesProps = {
  resources: Resource[];
};

export function RelatedResources({ resources }: RelatedResourcesProps) {
  if (resources.length === 0) return null;
  const { resources: resourcesCopy } = SITE_COPY;

  return (
    <section aria-labelledby="related-resources-heading" className="space-y-4">
      <div className="flex items-center gap-3">
        <IconBadge src={resourcesCopy.relatedIconSrc} size={32} />
        <h2 id="related-resources-heading" className="t-h3">
          {resourcesCopy.relatedTitle}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <SurfaceCard key={resource.slug}>
            <Heading role="h4" className="text-[20px]">
              <Link href={`/resources/${resource.slug}`} className="focus-visible:underline">
                {resource.title}
              </Link>
            </Heading>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
