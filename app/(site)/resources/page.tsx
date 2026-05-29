import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { ResourcesLibraryV2 } from "@/components/resources/ResourcesLibraryV2";
import { getAllResources } from "@/content/resources/utils";
import { buildResourcesBooksSchema, buildResourcesCollectionSchema } from "@/lib/seo/resources";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveResourcesCopy } from "@/lib/copy/clinicianCms";
import { PageHeroHeader } from "@/components/shared/PageHeroHeader";
import { permanentRedirect } from "next/navigation";

type ResourcesPageProps = {
  searchParams: Promise<{ library?: string }>;
};

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;
  if (typeof params?.library === "string") {
    permanentRedirect("/resources");
  }
  const resources = getAllResources();
  const collectionSchema = buildResourcesCollectionSchema(resources.map((resource) => resource.slug));
  const cmsCopy = await getClinicianCopyGlobal();
  const resourcesCopy: typeof SITE_COPY.resources = resolveResourcesCopy(SITE_COPY.resources, cmsCopy);
  const booksSchema = buildResourcesBooksSchema(resourcesCopy);
  const heroTitle = resourcesCopy.v2Title;
  const heroSummary = resourcesCopy.v2Summary;

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(booksSchema) }} />
      <PageHeroHeader
        title={heroTitle}
        subtitle={heroSummary}
        imageSrc={resourcesCopy.indexHeroFurnitureSrc}
        imageAlt={resourcesCopy.indexHeroFurnitureAlt}
      />
      <Section>
        <div className="mt-8">
          <ResourcesLibraryV2 resources={resourcesCopy} />
        </div>
      </Section>
    </PageShell>
  );
}
