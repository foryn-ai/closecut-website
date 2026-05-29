export type FaqSchemaItem = {
  question: string;
  answer: string;
};

export type CitationSchemaItem = {
  quote: string;
  practitioner: string;
  sourceTitle: string;
  sourceUrl: string;
  themes?: string[];
};

export function buildFaqSchema(items: FaqSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCitationWebPageSchema({
  pageTitle,
  pageUrl,
  items,
}: {
  pageTitle: string;
  pageUrl: string;
  items: CitationSchemaItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: pageUrl,
    citation: items.map((item) => ({
      "@type": "CreativeWork",
      name: item.sourceTitle,
      url: item.sourceUrl,
      author: {
        "@type": "Person",
        name: item.practitioner,
      },
      text: item.quote,
      keywords: item.themes ?? [],
    })),
  };
}
