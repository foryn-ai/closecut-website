import type { Metadata } from "next";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  alternates: { canonical: PAGE_SEO.about.canonicalPath },
  openGraph: {
    title: PAGE_SEO.about.openGraph.title,
    description: PAGE_SEO.about.openGraph.description,
    url: PAGE_SEO.about.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.about.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.about.twitter.title,
    description: PAGE_SEO.about.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
