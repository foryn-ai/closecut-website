import type { Metadata } from "next";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  alternates: { canonical: PAGE_SEO.contact.canonicalPath },
  openGraph: {
    title: PAGE_SEO.contact.openGraph.title,
    description: PAGE_SEO.contact.openGraph.description,
    url: PAGE_SEO.contact.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.contact.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.contact.twitter.title,
    description: PAGE_SEO.contact.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
