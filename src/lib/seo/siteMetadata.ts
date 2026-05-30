// TEMPLATE CONTENT — For a new brand: update SITE_URL and the string values in THERAFOX_SITE_SEO,
// PAGE_SEO, SITE_STRUCTURED_DATA, and INTENSIVE_SEO. Do not rename exports — imported throughout the app.

export const SEO_VERSION = "2026-02-05";
export const SEO_LAST_MODIFIED = "2026-02-05";
export const SITE_URL = "https://closecut.ai";
export const SEO_SCHEMA_CONTEXT = "https://schema.org";

export const SEO_TYPES = {
  openGraphWebsite: "website",
  openGraphArticle: "article",
  twitterCard: "summary_large_image",
  schemaOrganization: "Organization",
  schemaService: "Service",
  schemaFaqPage: "FAQPage",
  schemaQuestion: "Question",
  schemaAnswer: "Answer",
  schemaCollectionPage: "CollectionPage",
  schemaCreativeWork: "CreativeWork",
  schemaWebSite: "WebSite",
} as const;

export const SEO_IMAGES = {
  openGraph: {
    url: "/og/og-image.png",
    width: 1232,
    height: 706,
  },
  twitter: "/og/og-image.png",
} as const;

export const SEO_ROBOTS = {
  noIndex: "noindex, nofollow",
} as const;

export const SITE_STATIC_PATHS = ["/", "/press"] as const;

export const SHELVED_STATIC_PATHS = [] as const;

export const INTENSIVE_KEYWORDS = [] as const;

export const THERAFOX_SITE_SEO = {
  title: "Close Cut — Knife Sharpening Game",
  description:
    "A knife-sharpening skill game for Steam. Hold longer for more points — but the danger window is always coming.",
  canonicalPath: "/",
  openGraph: {
    title: "Close Cut — Knife Sharpening Game",
    description:
      "Hold. Push. Release. One stroke separates a sharp blade from a cut hand.",
    imageAlt: "Close Cut — knife sharpening game key art",
  },
  twitter: {
    title: "Close Cut — Knife Sharpening Game",
    description:
      "One button. Three knives. One slip.",
  },
} as const;

export const PAGE_SEO = {
  home: {
    title: "Close Cut — Knife Sharpening Game",
    description:
      "Hold. Push. Release. One stroke separates a sharp blade from a cut hand. A knife-sharpening skill game for Steam.",
    canonicalPath: "/",
    openGraph: {
      title: "Close Cut — Knife Sharpening Game",
      description:
        "Hold longer for more points — but the danger window is always coming. One button, three knives, one-more-try loop.",
      imageAlt: "Close Cut — knife sharpening game key art",
    },
    twitter: {
      title: "Close Cut — Knife Sharpening Game",
      description: "One button. Three knives. One slip.",
    },
  },
  press: {
    title: "Press Kit — Close Cut",
    description:
      "Key art, factsheet, and press contact for Close Cut — a knife-sharpening skill game for Steam.",
    canonicalPath: "/press",
    openGraph: {
      title: "Press Kit — Close Cut",
      description: "Key art, factsheet, and press contact for Close Cut.",
      imageAlt: "Close Cut press kit",
    },
    twitter: {
      title: "Press Kit — Close Cut",
      description: "Key art and factsheet for Close Cut, a knife-sharpening skill game for Steam.",
    },
  },
} as const;

export const RESOURCES_SEO = {
  index: {
    title: "",
    description: "",
    canonicalPath: "/",
    openGraph: { imageAlt: "" },
    twitter: { title: "", description: "" },
  },
  detail: {
    titleSeparator: " | ",
    titleSuffix: "Close Cut",
    imageAltSeparator: ": ",
    imageAltSuffix: "",
    canonicalPrefix: "/",
  },
  schema: { collectionName: "" },
} as const;

export const SITE_STRUCTURED_DATA = {
  organization: {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaOrganization,
    name: "Close Cut",
    url: SITE_URL,
    description: THERAFOX_SITE_SEO.description,
  },
  website: {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaWebSite,
    name: "Close Cut",
    url: SITE_URL,
    description: THERAFOX_SITE_SEO.description,
  },
} as const;

export const INTENSIVE_SEO = {
  title: "Therafox Intensive | Private Two Day Couples Intensive",
  description:
    "A private two day couples intensive with expert-held sessions and planned on-your-own time. Built for themes like before we commit, making a decision, important transition, breach of trust, loss of spark, and communication breakdown.",
  canonicalPath: "/intensive",
  openGraph: {
    title: "Therafox Intensive | Private Two Day Couples Intensive",
    description:
      "Deliberate pacing, clear containers, and time with Anastasia. A two day intensive designed to leave you with a plan you can follow.",
    imageAlt: "Therafox Intensive overview",
  },
  twitter: {
    title: "Therafox Intensive",
    description:
      "Private two day couples intensive with time with Anastasia and a clear take-home plan. Join the waitlist for dates.",
  },
  robots: {
    index: true,
    follow: true,
  },
  structuredData: {
    organization: {
      "@context": SEO_SCHEMA_CONTEXT,
      "@type": SEO_TYPES.schemaOrganization,
      name: "Therafox",
      url: SITE_URL,
    },
    offering: {
      "@context": SEO_SCHEMA_CONTEXT,
      "@type": SEO_TYPES.schemaService,
      name: "Therafox Intensive",
      description:
        "A private two day couples intensive with expert-held sessions and planned on-your-own time.",
      serviceType: "Couples intensive",
      areaServed: "United States",
      provider: {
        "@type": SEO_TYPES.schemaOrganization,
        name: "Therafox",
      },
    },
    faq: {
      "@context": SEO_SCHEMA_CONTEXT,
      "@type": SEO_TYPES.schemaFaqPage,
      mainEntity: [
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive help before we commit?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive works well when you are deciding whether to commit and need a structured process to evaluate fit, expectations, and next steps.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive help us make a relationship decision?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive gives you expert-held structure for clarifying values and negotiating outcomes.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive support an important transition?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive is designed to stabilize transitions like parenting shifts, role changes, relocation, or high-pressure life transitions.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive support breach of trust recovery?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive can provide a structured trust-repair process with clear ownership steps, communication guardrails, and practical follow-through.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive help with loss of spark and sexual challenges?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive can address desire mismatch, intimacy shutdown, and sexual disconnection with clear pacing and direct conversations.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "Can intensive help with recurring communication breakdown?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "Yes. Intensive can help couples map escalation cycles, practice new communication skills, and build a practical pause and repair plan.",
          },
        },
        {
          "@type": SEO_TYPES.schemaQuestion,
          name: "What happens after we join the waitlist?",
          acceptedAnswer: {
            "@type": SEO_TYPES.schemaAnswer,
            text: "You receive upcoming dates and private availability. If a date fits, you can request it. Joining the waitlist is not a commitment.",
          },
        },
      ],
    },
  },
} as const;

// Backward-compatible alias for legacy imports.
export const BRIDGE_WEEKEND_SEO = INTENSIVE_SEO;

export const AI_DISCOVERY = {
  llmsPath: "/llms.txt",
  title: "Close Cut AI Discovery",
  summary:
    "Close Cut is a knife-sharpening skill game for Steam. One button, three knives, risk/reward timing, one-more-try loop.",
  focus:
    "Primary conversion path is the Steam wishlist CTA on the home page.",
  themeIntents: [
    "knife sharpening game",
    "skill game steam",
    "arcade timing game",
    "one more try game",
    "indie game steam wishlist",
  ] as const,
  priorityPaths: ["/", "/press"] as const,
} as const;

export const INTENSIVE_THEME_PAGES = [
  "before-we-commit",
  "making-a-decision",
  "important-transition",
  "breach-of-trust",
  "loss-of-spark-sexual-challenges",
  "communication-breakdown",
] as const;

export type IntensiveThemeSlug = (typeof INTENSIVE_THEME_PAGES)[number];

type IntensiveThemeSeoEntry = {
  title: string;
  description: string;
  canonicalPath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  faqQuestion: string;
  faqAnswer: string;
};

export const INTENSIVE_THEME_PAGES_SEO: Record<IntensiveThemeSlug, IntensiveThemeSeoEntry> = {
  "before-we-commit": {
    title: "Before We Commit Intensive | Therafox",
    description:
      "Private two day intensive support for couples asking if they are ready to commit. Clarify fit, expectations, and next steps.",
    canonicalPath: "/intensive/before-we-commit",
    openGraphTitle: "Before We Commit Intensive | Therafox",
    openGraphDescription:
      "A structured intensive process for couples deciding whether and how to commit.",
    faqQuestion: "Can intensive help before we commit?",
    faqAnswer:
      "Yes. Intensive helps clarify commitment fit, expectations, and next steps through a bounded process.",
  },
  "making-a-decision": {
    title: "Making a Decision Intensive | Therafox",
    description:
      "Private two day intensive support for couples who need decision clarity about staying, pausing, or separating.",
    canonicalPath: "/intensive/making-a-decision",
    openGraphTitle: "Making a Decision Intensive | Therafox",
    openGraphDescription:
      "A structured intensive for high-stakes relationship decisions and clean follow-through.",
    faqQuestion: "Can intensive help us make a relationship decision?",
    faqAnswer:
      "Yes. Intensive gives structure for decision clarity when couples feel stuck between options.",
  },
  "important-transition": {
    title: "Important Transition Intensive | Therafox",
    description:
      "Private two day intensive support for couples navigating major life transitions and role changes.",
    canonicalPath: "/intensive/important-transition",
    openGraphTitle: "Important Transition Intensive | Therafox",
    openGraphDescription:
      "A structured intensive for transition alignment, role clarity, and relationship stability.",
    faqQuestion: "Can intensive support an important transition?",
    faqAnswer:
      "Yes. Intensive supports transitions with structure, role clarity, and practical planning.",
  },
  "breach-of-trust": {
    title: "Breach of Trust Intensive | Therafox",
    description:
      "Private two day intensive support for couples working through a breach of trust with clear repair structure.",
    canonicalPath: "/intensive/breach-of-trust",
    openGraphTitle: "Breach of Trust Intensive | Therafox",
    openGraphDescription:
      "A structured intensive for trust repair, ownership, and practical follow-through.",
    faqQuestion: "Can intensive support breach of trust recovery?",
    faqAnswer:
      "Yes. Intensive can support trust repair through ownership steps, communication guardrails, and follow-through planning.",
  },
  "loss-of-spark-sexual-challenges": {
    title: "Loss of Spark and Sexual Challenges Intensive | Therafox",
    description:
      "Private two day intensive support for couples facing desire mismatch, sexual disconnection, or intimacy shutdown.",
    canonicalPath: "/intensive/loss-of-spark-sexual-challenges",
    openGraphTitle: "Loss of Spark and Sexual Challenges Intensive | Therafox",
    openGraphDescription:
      "A structured intensive for couples addressing intimacy, desire, and sexual connection.",
    faqQuestion: "Can intensive help with loss of spark and sexual challenges?",
    faqAnswer:
      "Yes. Intensive can address desire mismatch and intimacy shutdown through structured conversations and pacing.",
  },
  "communication-breakdown": {
    title: "Communication Breakdown Intensive | Therafox",
    description:
      "Private intensive support for couples stuck in recurring fights, shutdowns, or conflict avoidance. Practice new skills and leave with a plan.",
    canonicalPath: "/intensive/communication-breakdown",
    openGraphTitle: "Communication Breakdown Intensive | Therafox",
    openGraphDescription:
      "A structured intensive for recurring arguments, shutdown and pursue cycles, and practical communication repair.",
    faqQuestion: "Can intensive help with recurring communication breakdown?",
    faqAnswer:
      "Yes. Intensive helps couples map the interaction cycle, practice calmer communication, and leave with pause, repair, and request rules they can use at home.",
  },
};
