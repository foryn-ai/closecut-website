import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/shared/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { CitationList } from "@/components/resources/CitationList";
import { WorksheetDownloads } from "@/components/resources/WorksheetDownloads";
import { RelatedResources } from "@/components/resources/RelatedResources";
import { ResourceViewTracker } from "@/components/resources/ResourceViewTracker";
import { getAllResources, getRelatedResources, getResourceBySlug } from "@/content/resources/utils";
import { buildCitationLinkMap, buildWorksheetLinkMap } from "@/lib/resources/links";
import { buildResourceSchema, getResourceDetailMetadata } from "@/lib/seo/resources";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveResourcesCopy } from "@/lib/copy/clinicianCms";
import { IconBadge } from "@/components/shared/IconBadge";

type ResourceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllResources().map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return getResourceDetailMetadata(resource);
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  const cmsCopy = await getClinicianCopyGlobal();
  const resourcesCopy: typeof SITE_COPY.resources = resolveResourcesCopy(SITE_COPY.resources, cmsCopy);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources(resource, 3);
  const citationLinks = buildCitationLinkMap(resource);
  const worksheetLinks = buildWorksheetLinkMap(resource);
  const schema = buildResourceSchema(resource);

  return (
    <PageShell>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <ResourceViewTracker slug={resource.slug} category={resource.category} />
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">{resource.category}</p>
          <Heading role="h1Hero">{resource.title}</Heading>
          <Text role="body" className="text-body" measure="narrow">
            {resource.summary}
          </Text>
        </div>

        {resource.worksheets ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <WorksheetDownloads slug={resource.slug} worksheets={resource.worksheets} links={worksheetLinks} />
            <CitationList slug={resource.slug} citations={resource.citations} links={citationLinks} />
          </div>
        ) : (
          <div className="mt-10">
            <CitationList slug={resource.slug} citations={resource.citations} links={citationLinks} />
          </div>
        )}

        <section className="mt-10 space-y-4" aria-labelledby="key-concepts-heading">
          <div className="flex items-center gap-3">
            <IconBadge src={resourcesCopy.keyConceptsIconSrc} size={32} />
            <h2 id="key-concepts-heading" className="t-h3">
              {resourcesCopy.keyConceptsTitle}
            </h2>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {resource.keyConcepts.map((concept) => (
              <li key={concept} className="rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm text-body">
                {concept}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <RelatedResources resources={relatedResources} />
        </div>
      </Section>
    </PageShell>
  );
}
