import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import Script from "next/script";
import { CampaignAttributionCapture } from "@/components/analytics/CampaignAttributionCapture";
import { SitePageViewTracker } from "@/components/analytics/SitePageViewTracker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  ANALYTICS_CONVERSION_ID,
  LOGO_PACK_DIR,
} from "@/lib/brand.config";
import {
  SEO_IMAGES,
  SEO_TYPES,
  SITE_STRUCTURED_DATA,
  SITE_URL,
  THERAFOX_SITE_SEO,
} from "@/lib/seo/intensive";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const playfair = localFont({
  src: [
    {
      path: "../../public/fonts/playfair-display-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/playfair-display-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/playfair-display-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/playfair-display-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: THERAFOX_SITE_SEO.title,
  description: THERAFOX_SITE_SEO.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: THERAFOX_SITE_SEO.canonicalPath,
  },
  openGraph: {
    title: THERAFOX_SITE_SEO.openGraph.title,
    description: THERAFOX_SITE_SEO.openGraph.description,
    url: THERAFOX_SITE_SEO.canonicalPath,
    type: SEO_TYPES.openGraphWebsite,
    images: [
      {
        url: SEO_IMAGES.openGraph.url,
        width: SEO_IMAGES.openGraph.width,
        height: SEO_IMAGES.openGraph.height,
        alt: THERAFOX_SITE_SEO.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: SEO_TYPES.twitterCard,
    title: THERAFOX_SITE_SEO.twitter.title,
    description: THERAFOX_SITE_SEO.twitter.description,
    images: [SEO_IMAGES.twitter],
  },
  icons: {
    icon: [
      { url: `${LOGO_PACK_DIR}/favicon/favicon.ico` },
      { url: `${LOGO_PACK_DIR}/favicon/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${LOGO_PACK_DIR}/favicon/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: `${LOGO_PACK_DIR}/favicon/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: `${LOGO_PACK_DIR}/favicon/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteStructuredData = [SITE_STRUCTURED_DATA.organization, SITE_STRUCTURED_DATA.website];

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {ANALYTICS_CONVERSION_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONVERSION_ID}`}
            strategy="afterInteractive"
          />
        )}
        {ANALYTICS_CONVERSION_ID && (
          <Script id="google-ads-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ANALYTICS_CONVERSION_ID}');`}
          </Script>
        )}
        <CampaignAttributionCapture />
        <Suspense fallback={null}>
          <SitePageViewTracker />
        </Suspense>
        {siteStructuredData.map((entry, index) => (
          <script
            key={`site-structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
