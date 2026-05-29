import type { Metadata } from "next";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.therapy.title,
  description: PAGE_SEO.therapy.description,
  alternates: { canonical: PAGE_SEO.therapy.canonicalPath },
  openGraph: {
    title: PAGE_SEO.therapy.openGraph.title,
    description: PAGE_SEO.therapy.openGraph.description,
    url: PAGE_SEO.therapy.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.therapy.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.therapy.twitter.title,
    description: PAGE_SEO.therapy.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
};

export default function TherapyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
