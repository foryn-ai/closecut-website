import type { Metadata } from "next";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.billing.title,
  description: PAGE_SEO.billing.description,
  alternates: { canonical: PAGE_SEO.billing.canonicalPath },
  openGraph: {
    title: PAGE_SEO.billing.openGraph.title,
    description: PAGE_SEO.billing.openGraph.description,
    url: PAGE_SEO.billing.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.billing.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.billing.twitter.title,
    description: PAGE_SEO.billing.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
};

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
