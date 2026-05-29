// TEMPLATE CONTENT — For a new brand: update SITE_URL and the string values in THERAFOX_SITE_SEO,
// PAGE_SEO, SITE_STRUCTURED_DATA, and INTENSIVE_SEO. Do not rename exports — imported throughout the app.

export const SEO_VERSION = "2026-02-05";
export const SEO_LAST_MODIFIED = "2026-02-05";
export const SITE_URL = "https://www.therafox.com";
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
    url: "/intensive/opengraph-image",
    width: 1200,
    height: 630,
  },
  twitter: "/intensive/twitter-image",
} as const;

export const SEO_ROBOTS = {
  noIndex: "noindex, nofollow",
} as const;

export const SITE_STATIC_PATHS = [
  "/",
  "/therapy",
  "/about",
  "/intensive",
  "/intensive-fit-check",
  "/billing",
  "/contact",
  "/resources",
] as const;

export const SHELVED_STATIC_PATHS = ["/workshops"] as const;

export const INTENSIVE_KEYWORDS = [
  "couples intensive",
  "two day couples intensive",
  "relationship intensive",
  "private couples intensive",
  "before we commit couples intensive",
  "making a decision relationship intensive",
  "important transition relationship intensive",
  "breach of trust couples intensive",
  "loss of spark sexual challenges intensive",
  "communication breakdown relationship support",
] as const;

export const THERAFOX_SITE_SEO = {
  title: "Therafox | Therapy and Intensives",
  description:
    "Individual, couples, and sex therapy plus private two day intensive support. Practical, structured care for patterns that keep repeating.",
  canonicalPath: "/",
  openGraph: {
    title: "Therafox | Therapy and Intensives",
    description:
      "Individual, couples, and sex therapy with private intensive options. Name the pattern, then practice the skills that change it.",
    imageAlt: "Therafox therapy practice overview",
  },
  twitter: {
    title: "Therafox | Therapy and Intensives",
    description:
      "Individual, couples, and sex therapy with private intensive support for repeating patterns.",
  },
} as const;

export const PAGE_SEO = {
  home: {
    title: "Cultivate Connection | Therafox Therapy",
    description:
      "Stay close to others without losing yourself. Individual, couples, and sex therapy with private intensive options.",
    canonicalPath: "/",
    openGraph: {
      title: "Cultivate Connection | Therafox",
      description:
        "Stay close to others without losing yourself. Therapy for individuals and couples, with space for sex and intimacy when it matters.",
      imageAlt: "Cultivate Connection, Therafox homepage",
    },
    twitter: {
      title: "Cultivate Connection | Therafox",
      description:
        "Individual, couples, and sex therapy with private intensive support for repeating patterns.",
    },
  },
  therapy: {
    title: "Therapy Services | Therafox",
    description:
      "I help you slow things down, name the pattern, and practice the skills that change it through individual, couples, and sex therapy.",
    canonicalPath: "/therapy",
    openGraph: {
      title: "Therapy Services | Therafox",
      description:
        "Individual and couples therapy with a steady, practical approach. We name the pattern and practice new ways to respond.",
      imageAlt: "Therafox therapy services overview",
    },
    twitter: {
      title: "Therapy Services | Therafox",
      description:
        "Individual and couples therapy with practical support for anxiety, conflict, distance, and repair.",
    },
  },
  about: {
    title: "About Anastasia Fox, LMFT, CST | Therafox",
    description:
      "Meet Anastasia Fox, LMFT, CST. Relationally trained therapist offering sex therapy for adults and couples.",
    canonicalPath: "/about",
    openGraph: {
      title: "About Anastasia Fox | Therafox",
      description:
        "Background, training, and approach. Relational work that pays attention to what happens between people, not just within.",
      imageAlt: "Anastasia Fox, training and credentials",
    },
    twitter: {
      title: "About Anastasia Fox | Therafox",
      description:
        "Background, training, and approach for sex therapy, couples therapy, and individual therapy.",
    },
  },
  contact: {
    title: "Request Availability | Book a Consult | Therafox",
    description:
      "Start with a free 20 minute consult. Share what is bringing you in and get a clear next step.",
    canonicalPath: "/contact",
    openGraph: {
      title: "Contact Therafox | Book a Consult",
      description:
        "Request availability and start with a free 20 minute consult.",
      imageAlt: "Therafox contact and consult",
    },
    twitter: {
      title: "Contact Therafox | Book a Consult",
      description:
        "Request availability for individual, couples, sex therapy, and intensive support.",
    },
  },
  workshops: {
    title: "Workshops for Couples | Therafox",
    description:
      "In-person workshops for couples who want better conversations at home. Small groups, practical tools, and a clear waitlist-first process.",
    canonicalPath: "/workshops",
    openGraph: {
      title: "Therafox Workshops",
      description:
        "In-person workshops for couples who want better conversations at home. Join a topic-specific waitlist to receive early access.",
      imageAlt: "Therafox workshops overview",
    },
    twitter: {
      title: "Therafox Workshops",
      description:
        "In-person workshops for couples. Topic-specific waitlists and early access to new dates.",
    },
  },
  billing: {
    title: "Billing and Reimbursement | Therafox",
    description:
      "Therafox is a private pay practice. Learn how superbills and out-of-network reimbursement work, including diagnosis and billing FAQs.",
    canonicalPath: "/billing",
    openGraph: {
      title: "Billing and Reimbursement | Therafox",
      description:
        "Private pay billing, superbills, and out-of-network reimbursement details for Therafox clients.",
      imageAlt: "Therafox billing and reimbursement information",
    },
    twitter: {
      title: "Billing and Reimbursement | Therafox",
      description:
        "Private pay billing and superbill guidance for out-of-network reimbursement at Therafox.",
    },
  },
  intensiveFitCheck: {
    title: "Intensive Fit Check | Therafox",
    description:
      "A short mobile fit check to sort whether weekly therapy, a private intensive, or a consult may fit best right now.",
    canonicalPath: "/intensive-fit-check",
    openGraph: {
      title: "Intensive Fit Check | Therafox",
      description:
        "A quick structured check for sorting fit between weekly therapy, a consult, and a private intensive.",
      imageAlt: "Therafox Intensive Fit Check overview",
    },
    twitter: {
      title: "Intensive Fit Check | Therafox",
      description:
        "Take a short fit check to sort whether weekly therapy, a private intensive, or a consult may fit best right now.",
    },
  },
} as const;

export const RESOURCES_SEO = {
  index: {
    title: "Therafox Resources | Academic Reference Library",
    description:
      "Brief overviews, key concepts, and citations across couples therapy, sex therapy, and relationship research. Designed for learning, not sales.",
    canonicalPath: "/resources",
    openGraph: {
      imageAlt: "Therafox academic resource library",
    },
    twitter: {
      title: "Therafox Resources | Academic Reference Library",
      description:
        "Brief overviews, key concepts, and citations across couples therapy, sex therapy, and relationship research.",
    },
  },
  detail: {
    titleSeparator: " | ",
    titleSuffix: "Therafox Resources",
    imageAltSeparator: ": ",
    imageAltSuffix: "resource overview",
    canonicalPrefix: "/resources/",
  },
  schema: {
    collectionName: "Academic Resource Library",
  },
} as const;

export const SITE_STRUCTURED_DATA = {
  organization: {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaOrganization,
    name: "Therafox",
    url: SITE_URL,
    description: THERAFOX_SITE_SEO.description,
  },
  website: {
    "@context": SEO_SCHEMA_CONTEXT,
    "@type": SEO_TYPES.schemaWebSite,
    name: "Therafox",
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
  title: "Therafox AI Discovery",
  summary:
    "Therafox focuses on a private two day couples intensive with structured expert-held support and clear follow-through planning.",
  focus:
    "Primary conversion path is the intensive page and waitlist flow. Workshops and legacy planner paths are shelved for MVP launch.",
  themeIntents: [
    "before we commit",
    "making a decision",
    "important transition",
    "breach of trust",
    "loss of spark and sexual challenges",
    "communication breakdown",
  ] as const,
  priorityPaths: ["/intensive", "/contact", "/therapy", "/about"] as const,
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
