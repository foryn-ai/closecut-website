import type { Metadata } from "next";
import type { Resource } from "@/content/resources/types";
import type { SiteCopyShape } from "@/lib/copy/types";
import {
  RESOURCES_SEO,
  SEO_IMAGES,
  SEO_SCHEMA_CONTEXT,
  SEO_TYPES,
  SITE_URL,
} from "@/lib/seo/intensive";

export function getResourcesIndexMetadata(): Metadata {
  const title = RESOURCES_SEO.index.title;
  const description = RESOURCES_SEO.index.description;

  return {
    title,
    description,
    alternates: { canonical: RESOURCES_SEO.index.canonicalPath },
    openGraph: {
      title,
      description,
      type: SEO_TYPES.openGraphWebsite,
      url: RESOURCES_SEO.index.canonicalPath,
      images: [
        {
          url: SEO_IMAGES.openGraph.url,
          width: SEO_IMAGES.openGraph.width,
          height: SEO_IMAGES.openGraph.height,
          alt: RESOURCES_SEO.index.openGraph.imageAlt,
        },
      ],
    },
    twitter: {
      card: SEO_TYPES.twitterCard,
      title: RESOURCES_SEO.index.twitter.title,
      description: RESOURCES_SEO.index.twitter.description,
      images: [SEO_IMAGES.twitter],
    },
  };
}

export function getResourceDetailMetadata(resource: Resource): Metadata {
  const title = `${resource.title}${RESOURCES_SEO.detail.titleSeparator}${RESOURCES_SEO.detail.titleSuffix}`;
  const description = resource.summary;
  const imageAlt = `${resource.title}${RESOURCES_SEO.detail.imageAltSeparator}${RESOURCES_SEO.detail.imageAltSuffix}`;
  const canonical = `${RESOURCES_SEO.detail.canonicalPrefix}${resource.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: SEO_TYPES.openGraphArticle,
      url: canonical,
      images: [
        {
          url: SEO_IMAGES.openGraph.url,
          width: SEO_IMAGES.openGraph.width,
          height: SEO_IMAGES.openGraph.height,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: SEO_TYPES.twitterCard,
      title,
      description,
      images: [SEO_IMAGES.twitter],
    },
  };
}

export function buildResourcesCollectionSchema(resourceSlugs: string[]) {
  return {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaCollectionPage,
    name: RESOURCES_SEO.schema.collectionName,
    url: `${SITE_URL}${RESOURCES_SEO.index.canonicalPath}`,
    hasPart: resourceSlugs.map((slug) => ({
      "@type": SEO_TYPES.schemaCreativeWork,
      url: `${SITE_URL}${RESOURCES_SEO.detail.canonicalPrefix}${slug}`,
    })),
  };
}

export function buildResourceSchema(resource: Resource) {
  const organization = {
    "@type": SEO_TYPES.schemaOrganization,
    name: "Therafox",
    url: SITE_URL,
  };

  return {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaCreativeWork,
    name: resource.title,
    url: `${SITE_URL}${RESOURCES_SEO.detail.canonicalPrefix}${resource.slug}`,
    description: resource.summary,
    about: resource.tags,
    keywords: resource.tags,
    author: organization,
    publisher: organization,
    dateModified: resource.updatedAt,
    citation: resource.citations.map((citation) => ({
      "@type": SEO_TYPES.schemaCreativeWork,
      name: citation.title,
      url: citation.url,
      publisher: citation.publisher,
      datePublished: citation.year,
    })),
  };
}

export function buildResourcesBooksSchema(resourcesCopy: SiteCopyShape["resources"]) {
  const tagLookup = new Map(resourcesCopy.booksTags.map((tag) => [tag.id, tag.label]));
  const books = [...resourcesCopy.booksCatalog].sort((a, b) => a.title.localeCompare(b.title));

  return {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": "ItemList",
    name: resourcesCopy.booksTitle,
    description: resourcesCopy.booksIntro,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: books.length,
    itemListElement: books.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        "@id": `${SITE_URL}/resources#book-${book.id}`,
        name: book.title,
        author: {
          "@type": "Person",
          name: book.author,
        },
        image: book.coverSrc.startsWith("http") ? book.coverSrc : `${SITE_URL}${book.coverSrc}`,
        url: book.linkHref,
        keywords: book.hookTags.map((tagId) => tagLookup.get(tagId) ?? tagId).join(", "),
      },
    })),
  };
}
