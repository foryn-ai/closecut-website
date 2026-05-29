import type { Metadata } from "next";
import {
  INTENSIVE_SEO,
  INTENSIVE_KEYWORDS,
  SEO_IMAGES,
  SEO_TYPES,
} from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: INTENSIVE_SEO.title,
  description: INTENSIVE_SEO.description,
  alternates: {
    canonical: INTENSIVE_SEO.canonicalPath,
  },
  openGraph: {
    title: INTENSIVE_SEO.openGraph.title,
    description: INTENSIVE_SEO.openGraph.description,
    url: INTENSIVE_SEO.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: INTENSIVE_SEO.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: INTENSIVE_SEO.twitter.title,
    description: INTENSIVE_SEO.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
  keywords: [...INTENSIVE_KEYWORDS],
  robots: INTENSIVE_SEO.robots,
};

export default function IntensiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
