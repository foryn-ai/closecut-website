import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { IntensiveFitCheckClient } from "@/components/intensive/IntensiveFitCheckClient";
import { intensiveFitCheckCopy, intensiveFitCheckResults } from "@/lib/copy/intensive";
import { PAGE_SEO, SEO_IMAGES, SEO_TYPES } from "@/lib/seo/intensive";

export const metadata: Metadata = {
  title: PAGE_SEO.intensiveFitCheck.title,
  description: PAGE_SEO.intensiveFitCheck.description,
  alternates: { canonical: PAGE_SEO.intensiveFitCheck.canonicalPath },
  openGraph: {
    title: PAGE_SEO.intensiveFitCheck.openGraph.title,
    description: PAGE_SEO.intensiveFitCheck.openGraph.description,
    url: PAGE_SEO.intensiveFitCheck.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: PAGE_SEO.intensiveFitCheck.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: PAGE_SEO.intensiveFitCheck.twitter.title,
    description: PAGE_SEO.intensiveFitCheck.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
};

export default function IntensiveFitCheckPage() {
  return (
    <>
      <style>{`
        header {
          display: none;
        }
      `}</style>
      <PageShell>
        <IntensiveFitCheckClient
          copy={intensiveFitCheckCopy}
          resultsCopy={intensiveFitCheckResults}
        />
      </PageShell>
    </>
  );
}
