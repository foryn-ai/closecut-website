import type { Metadata } from "next";
import {
  PAGE_SEO,
  SEO_IMAGES,
  SEO_TYPES,
} from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.workshops.title,
  description: PAGE_SEO.workshops.description,
  alternates: { canonical: "/intensive" },
  openGraph: {
    title: PAGE_SEO.workshops.openGraph.title,
    description: PAGE_SEO.workshops.openGraph.description,
    url: PAGE_SEO.workshops.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.workshops.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.workshops.twitter.title,
    description: PAGE_SEO.workshops.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
