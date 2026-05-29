import path from "node:path";
import { createRequire } from "node:module";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

const require = createRequire(import.meta.url);
const { INTENSIVE_THEME_PAGES_COPY, SITE_COPY } = require("./src/lib/copy/therafoxWebsite.ts");
const { INTENSIVE_SEO } = require("./src/lib/seo/siteMetadata.ts");

const themeOptions = [
  { label: "Before we commit", value: "before-we-commit" },
  { label: "Making a decision", value: "making-a-decision" },
  { label: "Important transition", value: "important-transition" },
  { label: "Breach of trust", value: "breach-of-trust" },
  {
    label: "Loss of spark and sexual challenges",
    value: "loss-of-spark-sexual-challenges",
  },
  { label: "Is this the end", value: "is-this-the-end" },
] as const;

const seededThemeQuotes = [
  {
    themeSlugs: ["before-we-commit", "making-a-decision"],
    quote:
      "It is the quality of our relationships that determines the quality of our lives.",
    practitioner: "Esther Perel",
    sourceTitle: "Letters from Esther #1 - Connection",
    sourceUrl: "https://www.estherperel.com/blog/july-2019-letters-from-esther-connection",
  },
  {
    themeSlugs: ["before-we-commit", "making-a-decision", "is-this-the-end"],
    quote: "All of them can be worked with in similar ways.",
    practitioner: "Martha Kauppi",
    sourceTitle: "Looking At The Narratives Of Jealousy",
    sourceUrl: "https://www.instituteforrelationalintimacy.com/blog/looking-at-the-narratives-of-jealousy-2",
  },
  {
    themeSlugs: ["important-transition", "before-we-commit"],
    quote: "Today, we turn to one person, our partner, for what an entire village once did.",
    practitioner: "Esther Perel",
    sourceTitle: "Letters from Esther #1 - Connection",
    sourceUrl: "https://www.estherperel.com/blog/july-2019-letters-from-esther-connection",
  },
  {
    themeSlugs: ["breach-of-trust", "loss-of-spark-sexual-challenges"],
    quote: "Trust your body. Listen to it with kindness, curiosity, and patience.",
    practitioner: "Emily Nagoski",
    sourceTitle: "FAQs",
    sourceUrl: "https://www.emilynagoski.com/faq",
  },
  {
    themeSlugs: ["loss-of-spark-sexual-challenges", "important-transition"],
    quote: "Pleasure Is the Measure.",
    practitioner: "Emily Nagoski",
    sourceTitle: "Pro Trainings",
    sourceUrl: "https://www.emilynagoski.com/pro-trainings",
  },
  {
    themeSlugs: ["is-this-the-end", "important-transition"],
    quote: "It is absolutely possible to build that capacity.",
    practitioner: "Martha Kauppi",
    sourceTitle: "Feeling Loved When Apart",
    sourceUrl: "https://www.instituteforrelationalintimacy.com/blog/feeling-loved-when-apart-2",
  },
  {
    themeSlugs: ["breach-of-trust", "is-this-the-end"],
    quote: "Trust is earned in the actions you repeat over time.",
    practitioner: "Esther Perel",
    sourceTitle: "Blog",
    sourceUrl: "https://www.estherperel.com/blog",
  },
  {
    themeSlugs: ["making-a-decision", "important-transition"],
    quote: "Context matters for desire, stress, and connection.",
    practitioner: "Emily Nagoski",
    sourceTitle: "FAQs",
    sourceUrl: "https://www.emilynagoski.com/faq",
  },
  {
    themeSlugs: ["breach-of-trust", "loss-of-spark-sexual-challenges"],
    quote: "Relational patterns can shift when both partners build capacity.",
    practitioner: "Martha Kauppi",
    sourceTitle: "Institute for Relational Intimacy Blog",
    sourceUrl: "https://www.instituteforrelationalintimacy.com/blog",
  },
] as const;

const clinicianCopyDefaults = {
  home: {
    heroHeadline: SITE_COPY.home.heroHeadline,
    heroSubhead: SITE_COPY.home.heroSubhead,
    connectionBandTitle: SITE_COPY.home.connectionBandTitle,
    connectionBandBody: SITE_COPY.home.connectionBandBody.map((text: any) => ({ text })),
    waysTitle: SITE_COPY.home.waysTitle,
    waysSubtitle: SITE_COPY.home.waysSubtitle,
    nextStepTitle: SITE_COPY.home.nextStepTitle,
    nextStepBody: SITE_COPY.home.nextStepBody,
    intensiveTitle: SITE_COPY.home.intensiveTitle,
    intensiveBody: SITE_COPY.home.intensiveBody,
    intensiveCtaLabel: SITE_COPY.home.intensiveCtaLabel,
    videoTitle: SITE_COPY.home.videoTitle,
    videoDescription: SITE_COPY.home.videoDescription,
  },
  contact: {
    heroTitle: SITE_COPY.contact.heroTitle,
    heroSubtitle: SITE_COPY.contact.heroSubtitle,
    contactIntro: SITE_COPY.contact.contactIntro,
    contactBody: SITE_COPY.contact.contactBody,
    contactDetailsTitle: SITE_COPY.contact.contactDetailsTitle,
    contactDetails: SITE_COPY.contact.contactDetails.map((text: any) => ({ text })),
    formTitle: SITE_COPY.contact.formTitle,
    formNameLabel: SITE_COPY.contact.formNameLabel,
    namePlaceholder: SITE_COPY.contact.namePlaceholder,
    formEmailLabel: SITE_COPY.contact.formEmailLabel,
    emailPlaceholder: SITE_COPY.contact.emailPlaceholder,
    formMessageLabel: SITE_COPY.contact.formMessageLabel,
    messagePlaceholder: SITE_COPY.contact.messagePlaceholder,
    formHelperText: SITE_COPY.contact.formHelperText,
    submitLabel: SITE_COPY.contact.submitLabel,
    submittingLabel: SITE_COPY.contact.submittingLabel,
    successMessage: SITE_COPY.contact.successMessage,
    errorMessage: SITE_COPY.contact.errorMessage,
    spamBlockedMessage: SITE_COPY.contact.spamBlockedMessage,
    faqTitle: SITE_COPY.contact.faqTitle,
    faqItems: SITE_COPY.contact.faqItems.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })),
    serviceAreaTitle: SITE_COPY.contact.serviceAreaTitle,
    serviceAreaBody: SITE_COPY.contact.serviceAreaBody,
    hoursTitle: SITE_COPY.contact.hoursTitle,
    hoursItems: SITE_COPY.contact.hoursItems.map((text: any) => ({ text })),
    ratesTitle: SITE_COPY.billing.rates.title,
    ratesSubtitle: SITE_COPY.billing.rates.subtitle,
  },
  therapy: {
    setupTitle: SITE_COPY.therapy.setupTitle,
    setupSubhead: SITE_COPY.therapy.setupSubhead,
    servicesTitle: SITE_COPY.therapy.servicesTitle,
    howItWorksTitle: SITE_COPY.therapy.howItWorksTitle,
    faqTitle: SITE_COPY.therapy.faqTitle,
    faqItems: SITE_COPY.therapy.faqItems.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })),
    resourceTitle: SITE_COPY.therapy.resourceTitle,
    resourceBody: SITE_COPY.therapy.resourceBody,
    resourceCtaLabel: SITE_COPY.therapy.resourceCtaLabel,
    intensiveTitle: SITE_COPY.therapy.intensiveTitle,
    intensiveBody: SITE_COPY.therapy.intensiveBody,
    intensiveCtaLabel: SITE_COPY.therapy.intensiveCtaLabel,
  },
  about: {
    nameTitle: SITE_COPY.about.nameTitle,
    heroSubtitle: SITE_COPY.about.heroSubtitle,
    credentialResumeTitle: SITE_COPY.about.credentialResumeTitle,
    modalitiesBandTitle: SITE_COPY.about.modalitiesBandTitle,
    modalitiesBandIntro: SITE_COPY.about.modalitiesBandIntro,
    goodFitTitle: SITE_COPY.about.goodFitTitle,
    goodFitBody: SITE_COPY.about.goodFitBody,
    approachTitle: SITE_COPY.about.approachTitle,
    systemicThinkerTitle: SITE_COPY.about.systemicThinkerTitle,
    systemicThinkerBody: SITE_COPY.about.systemicThinkerBody,
    areasOfInterestTitle: SITE_COPY.about.areasOfInterestTitle,
    talkingAboutSexTitle: SITE_COPY.about.talkingAboutSexTitle,
    faqTitle: SITE_COPY.about.faqTitle,
    faqItems: SITE_COPY.about.faqItems.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })),
  },
  billing: {
    heroTitle: SITE_COPY.billing.heroTitle,
    heroSubtitle: SITE_COPY.billing.heroSubtitle,
    primaryCtaLabel: SITE_COPY.billing.primaryCtaLabel,
    secondaryCtaLabel: SITE_COPY.billing.secondaryCtaLabel,
    privatePayTitle: SITE_COPY.billing.privatePayTitle,
    superbillsTitle: SITE_COPY.billing.superbillsTitle,
    superbillsBody: SITE_COPY.billing.superbillsBody,
    howItWorksTitle: SITE_COPY.billing.howItWorksTitle,
    howItWorksNote: SITE_COPY.billing.howItWorksNote,
    diagnosisTitle: SITE_COPY.billing.diagnosisTitle,
    beforeStartTitle: SITE_COPY.billing.beforeStartTitle,
    beforeStartBody: SITE_COPY.billing.beforeStartBody,
    faqTitle: SITE_COPY.billing.faqTitle,
    faqItems: SITE_COPY.billing.faqItems.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    })),
    closingCtaTitle: SITE_COPY.billing.closingCtaTitle,
    closingCtaBody: SITE_COPY.billing.closingCtaBody,
    closingCtaLabel: SITE_COPY.billing.closingCtaLabel,
  },
  resources: {
    v2Title: SITE_COPY.resources.v2Title,
    v2Summary: SITE_COPY.resources.v2Summary,
    keyConceptsTitle: SITE_COPY.resources.keyConceptsTitle,
  },
  intensive: {
    heroHeading: SITE_COPY.fortyEight.heroHeading,
    heroSubhead: SITE_COPY.fortyEight.heroSubhead,
    sellTitle: SITE_COPY.fortyEight.sellTitle,
    sellLead: SITE_COPY.fortyEight.sellLead,
    sellBodyOne: SITE_COPY.fortyEight.sellBodyOne,
    sellBodyTwo: SITE_COPY.fortyEight.sellBodyTwo,
    sellOutcome: SITE_COPY.fortyEight.sellOutcome,
    includedTitle: SITE_COPY.fortyEight.includedTitle,
    includedItems: SITE_COPY.fortyEight.includedItems.map((item: any) => ({
      text: item.text,
    })),
    waitlistCtaTitle: SITE_COPY.fortyEight.waitlistCtaTitle,
    waitlistCtaBody: SITE_COPY.fortyEight.waitlistCtaBody,
    faqTitle: SITE_COPY.fortyEight.faqTitle,
    faqItems: INTENSIVE_SEO.structuredData.faq.mainEntity.map((item: any) => ({
      question: item.name,
      answer: item.acceptedAnswer.text,
    })),
  },
  themes: {
    sectionEyebrow: INTENSIVE_THEME_PAGES_COPY.sectionEyebrow,
    sectionTitle: INTENSIVE_THEME_PAGES_COPY.sectionTitle,
    sectionBody: INTENSIVE_THEME_PAGES_COPY.sectionBody,
    relatedThemesTitle: INTENSIVE_THEME_PAGES_COPY.relatedThemesTitle,
    relatedThemesBody: INTENSIVE_THEME_PAGES_COPY.relatedThemesBody,
    quotesTitle: INTENSIVE_THEME_PAGES_COPY.quotesTitle,
    quotesBody: INTENSIVE_THEME_PAGES_COPY.quotesBody,
    quoteSourcePrefix: INTENSIVE_THEME_PAGES_COPY.quoteSourcePrefix,
    quoteThemePrefix: INTENSIVE_THEME_PAGES_COPY.quoteThemePrefix,
    backToIntensiveLabel: INTENSIVE_THEME_PAGES_COPY.backToIntensiveLabel,
    waitlistCtaLabel: INTENSIVE_THEME_PAGES_COPY.waitlistCtaLabel,
    waitlistCtaHref: INTENSIVE_THEME_PAGES_COPY.waitlistCtaHref,
    quotes: seededThemeQuotes.map((entry: any) => ({
      themeSlugs: entry.themeSlugs,
      quote: entry.quote,
      practitioner: entry.practitioner,
      sourceTitle: entry.sourceTitle,
      sourceUrl: entry.sourceUrl,
    })),
    entries: INTENSIVE_THEME_PAGES_COPY.themes.map((theme: any) => ({
      slug: theme.slug,
      navLabel: theme.navLabel,
      title: theme.title,
      subtitle: theme.subtitle,
      intro: theme.intro,
      fitTitle: theme.fitTitle,
      fitBullets: theme.fitBullets.map((bullet: any) => ({
        text: bullet,
      })),
      outcomesTitle: theme.outcomesTitle,
      outcomesBullets: theme.outcomesBullets.map((bullet: any) => ({
        text: bullet,
      })),
      faq: theme.faq.map((item: any) => ({
        question: item.question,
        answer: item.answer,
      })),
    })),
  },
} as const;

function mergeThemeQuotes(value: unknown) {
  const current = Array.isArray(value) ? value : [];
  const byKey = new Map<string, any>();

  current.forEach((entry: any) => {
    const key = [entry?.quote, entry?.practitioner, entry?.sourceUrl].join("|");
    byKey.set(key, entry);
  });

  clinicianCopyDefaults.themes.quotes.forEach((entry: any) => {
    const key = [entry?.quote, entry?.practitioner, entry?.sourceUrl].join("|");
    if (!byKey.has(key)) byKey.set(key, entry);
  });

  return [...byKey.values()];
}

function applyClinicianCopyDefaults(data: unknown) {
  const source = (data ?? {}) as Record<string, unknown>;
  const home = (source.home ?? {}) as Record<string, unknown>;
  const contact = (source.contact ?? {}) as Record<string, unknown>;
  const therapy = (source.therapy ?? {}) as Record<string, unknown>;
  const about = (source.about ?? {}) as Record<string, unknown>;
  const billing = (source.billing ?? {}) as Record<string, unknown>;
  const resources = (source.resources ?? {}) as Record<string, unknown>;
  const intensive = (source.intensive ?? {}) as Record<string, unknown>;
  const themes = (source.themes ?? {}) as Record<string, unknown>;

  return {
    ...source,
    home: {
      heroHeadline: home.heroHeadline ?? clinicianCopyDefaults.home.heroHeadline,
      heroSubhead: home.heroSubhead ?? clinicianCopyDefaults.home.heroSubhead,
      connectionBandTitle: home.connectionBandTitle ?? clinicianCopyDefaults.home.connectionBandTitle,
      connectionBandBody:
        Array.isArray(home.connectionBandBody) && home.connectionBandBody.length > 0
          ? home.connectionBandBody
          : clinicianCopyDefaults.home.connectionBandBody,
      waysTitle: home.waysTitle ?? clinicianCopyDefaults.home.waysTitle,
      waysSubtitle: home.waysSubtitle ?? clinicianCopyDefaults.home.waysSubtitle,
      nextStepTitle: home.nextStepTitle ?? clinicianCopyDefaults.home.nextStepTitle,
      nextStepBody: home.nextStepBody ?? clinicianCopyDefaults.home.nextStepBody,
      intensiveTitle: home.intensiveTitle ?? clinicianCopyDefaults.home.intensiveTitle,
      intensiveBody: home.intensiveBody ?? clinicianCopyDefaults.home.intensiveBody,
      intensiveCtaLabel: home.intensiveCtaLabel ?? clinicianCopyDefaults.home.intensiveCtaLabel,
      videoTitle: home.videoTitle ?? clinicianCopyDefaults.home.videoTitle,
      videoDescription: home.videoDescription ?? clinicianCopyDefaults.home.videoDescription,
    },
    contact: {
      heroTitle: contact.heroTitle ?? clinicianCopyDefaults.contact.heroTitle,
      heroSubtitle: contact.heroSubtitle ?? clinicianCopyDefaults.contact.heroSubtitle,
      contactIntro: contact.contactIntro ?? clinicianCopyDefaults.contact.contactIntro,
      contactBody: contact.contactBody ?? clinicianCopyDefaults.contact.contactBody,
      contactDetailsTitle: contact.contactDetailsTitle ?? clinicianCopyDefaults.contact.contactDetailsTitle,
      contactDetails:
        Array.isArray(contact.contactDetails) && contact.contactDetails.length > 0
          ? contact.contactDetails
          : clinicianCopyDefaults.contact.contactDetails,
      formTitle: contact.formTitle ?? clinicianCopyDefaults.contact.formTitle,
      formNameLabel: contact.formNameLabel ?? clinicianCopyDefaults.contact.formNameLabel,
      namePlaceholder: contact.namePlaceholder ?? clinicianCopyDefaults.contact.namePlaceholder,
      formEmailLabel: contact.formEmailLabel ?? clinicianCopyDefaults.contact.formEmailLabel,
      emailPlaceholder: contact.emailPlaceholder ?? clinicianCopyDefaults.contact.emailPlaceholder,
      formMessageLabel: contact.formMessageLabel ?? clinicianCopyDefaults.contact.formMessageLabel,
      messagePlaceholder: contact.messagePlaceholder ?? clinicianCopyDefaults.contact.messagePlaceholder,
      formHelperText: contact.formHelperText ?? clinicianCopyDefaults.contact.formHelperText,
      submitLabel: contact.submitLabel ?? clinicianCopyDefaults.contact.submitLabel,
      submittingLabel: contact.submittingLabel ?? clinicianCopyDefaults.contact.submittingLabel,
      successMessage: contact.successMessage ?? clinicianCopyDefaults.contact.successMessage,
      errorMessage: contact.errorMessage ?? clinicianCopyDefaults.contact.errorMessage,
      spamBlockedMessage: contact.spamBlockedMessage ?? clinicianCopyDefaults.contact.spamBlockedMessage,
      faqTitle: contact.faqTitle ?? clinicianCopyDefaults.contact.faqTitle,
      faqItems:
        Array.isArray(contact.faqItems) && contact.faqItems.length > 0
          ? contact.faqItems
          : clinicianCopyDefaults.contact.faqItems,
      serviceAreaTitle: contact.serviceAreaTitle ?? clinicianCopyDefaults.contact.serviceAreaTitle,
      serviceAreaBody: contact.serviceAreaBody ?? clinicianCopyDefaults.contact.serviceAreaBody,
      hoursTitle: contact.hoursTitle ?? clinicianCopyDefaults.contact.hoursTitle,
      hoursItems:
        Array.isArray(contact.hoursItems) && contact.hoursItems.length > 0
          ? contact.hoursItems
          : clinicianCopyDefaults.contact.hoursItems,
      ratesTitle: contact.ratesTitle ?? clinicianCopyDefaults.contact.ratesTitle,
      ratesSubtitle: contact.ratesSubtitle ?? clinicianCopyDefaults.contact.ratesSubtitle,
    },
    therapy: {
      setupTitle: therapy.setupTitle ?? clinicianCopyDefaults.therapy.setupTitle,
      setupSubhead: therapy.setupSubhead ?? clinicianCopyDefaults.therapy.setupSubhead,
      servicesTitle: therapy.servicesTitle ?? clinicianCopyDefaults.therapy.servicesTitle,
      howItWorksTitle: therapy.howItWorksTitle ?? clinicianCopyDefaults.therapy.howItWorksTitle,
      faqTitle: therapy.faqTitle ?? clinicianCopyDefaults.therapy.faqTitle,
      faqItems:
        Array.isArray(therapy.faqItems) && therapy.faqItems.length > 0
          ? therapy.faqItems
          : clinicianCopyDefaults.therapy.faqItems,
      resourceTitle: therapy.resourceTitle ?? clinicianCopyDefaults.therapy.resourceTitle,
      resourceBody: therapy.resourceBody ?? clinicianCopyDefaults.therapy.resourceBody,
      resourceCtaLabel: therapy.resourceCtaLabel ?? clinicianCopyDefaults.therapy.resourceCtaLabel,
      intensiveTitle: therapy.intensiveTitle ?? clinicianCopyDefaults.therapy.intensiveTitle,
      intensiveBody: therapy.intensiveBody ?? clinicianCopyDefaults.therapy.intensiveBody,
      intensiveCtaLabel: therapy.intensiveCtaLabel ?? clinicianCopyDefaults.therapy.intensiveCtaLabel,
    },
    about: {
      nameTitle: about.nameTitle ?? clinicianCopyDefaults.about.nameTitle,
      heroSubtitle: about.heroSubtitle ?? clinicianCopyDefaults.about.heroSubtitle,
      credentialResumeTitle: about.credentialResumeTitle ?? clinicianCopyDefaults.about.credentialResumeTitle,
      modalitiesBandTitle: about.modalitiesBandTitle ?? clinicianCopyDefaults.about.modalitiesBandTitle,
      modalitiesBandIntro: about.modalitiesBandIntro ?? clinicianCopyDefaults.about.modalitiesBandIntro,
      goodFitTitle: about.goodFitTitle ?? clinicianCopyDefaults.about.goodFitTitle,
      goodFitBody: about.goodFitBody ?? clinicianCopyDefaults.about.goodFitBody,
      approachTitle: about.approachTitle ?? clinicianCopyDefaults.about.approachTitle,
      systemicThinkerTitle: about.systemicThinkerTitle ?? clinicianCopyDefaults.about.systemicThinkerTitle,
      systemicThinkerBody: about.systemicThinkerBody ?? clinicianCopyDefaults.about.systemicThinkerBody,
      areasOfInterestTitle: about.areasOfInterestTitle ?? clinicianCopyDefaults.about.areasOfInterestTitle,
      talkingAboutSexTitle: about.talkingAboutSexTitle ?? clinicianCopyDefaults.about.talkingAboutSexTitle,
      faqTitle: about.faqTitle ?? clinicianCopyDefaults.about.faqTitle,
      faqItems:
        Array.isArray(about.faqItems) && about.faqItems.length > 0
          ? about.faqItems
          : clinicianCopyDefaults.about.faqItems,
    },
    billing: {
      heroTitle: billing.heroTitle ?? clinicianCopyDefaults.billing.heroTitle,
      heroSubtitle: billing.heroSubtitle ?? clinicianCopyDefaults.billing.heroSubtitle,
      primaryCtaLabel: billing.primaryCtaLabel ?? clinicianCopyDefaults.billing.primaryCtaLabel,
      secondaryCtaLabel: billing.secondaryCtaLabel ?? clinicianCopyDefaults.billing.secondaryCtaLabel,
      privatePayTitle: billing.privatePayTitle ?? clinicianCopyDefaults.billing.privatePayTitle,
      superbillsTitle: billing.superbillsTitle ?? clinicianCopyDefaults.billing.superbillsTitle,
      superbillsBody: billing.superbillsBody ?? clinicianCopyDefaults.billing.superbillsBody,
      howItWorksTitle: billing.howItWorksTitle ?? clinicianCopyDefaults.billing.howItWorksTitle,
      howItWorksNote: billing.howItWorksNote ?? clinicianCopyDefaults.billing.howItWorksNote,
      diagnosisTitle: billing.diagnosisTitle ?? clinicianCopyDefaults.billing.diagnosisTitle,
      beforeStartTitle: billing.beforeStartTitle ?? clinicianCopyDefaults.billing.beforeStartTitle,
      beforeStartBody: billing.beforeStartBody ?? clinicianCopyDefaults.billing.beforeStartBody,
      faqTitle: billing.faqTitle ?? clinicianCopyDefaults.billing.faqTitle,
      faqItems:
        Array.isArray(billing.faqItems) && billing.faqItems.length > 0
          ? billing.faqItems
          : clinicianCopyDefaults.billing.faqItems,
      closingCtaTitle: billing.closingCtaTitle ?? clinicianCopyDefaults.billing.closingCtaTitle,
      closingCtaBody: billing.closingCtaBody ?? clinicianCopyDefaults.billing.closingCtaBody,
      closingCtaLabel: billing.closingCtaLabel ?? clinicianCopyDefaults.billing.closingCtaLabel,
    },
    resources: {
      v2Title: resources.v2Title ?? clinicianCopyDefaults.resources.v2Title,
      v2Summary: resources.v2Summary ?? clinicianCopyDefaults.resources.v2Summary,
      keyConceptsTitle: resources.keyConceptsTitle ?? clinicianCopyDefaults.resources.keyConceptsTitle,
    },
    intensive: {
      heroHeading: intensive.heroHeading ?? clinicianCopyDefaults.intensive.heroHeading,
      heroSubhead: intensive.heroSubhead ?? clinicianCopyDefaults.intensive.heroSubhead,
      sellTitle: intensive.sellTitle ?? clinicianCopyDefaults.intensive.sellTitle,
      sellLead: intensive.sellLead ?? clinicianCopyDefaults.intensive.sellLead,
      sellBodyOne: intensive.sellBodyOne ?? clinicianCopyDefaults.intensive.sellBodyOne,
      sellBodyTwo: intensive.sellBodyTwo ?? clinicianCopyDefaults.intensive.sellBodyTwo,
      sellOutcome: intensive.sellOutcome ?? clinicianCopyDefaults.intensive.sellOutcome,
      includedTitle: intensive.includedTitle ?? clinicianCopyDefaults.intensive.includedTitle,
      includedItems:
        Array.isArray(intensive.includedItems) && intensive.includedItems.length > 0
          ? intensive.includedItems
          : clinicianCopyDefaults.intensive.includedItems,
      waitlistCtaTitle: intensive.waitlistCtaTitle ?? clinicianCopyDefaults.intensive.waitlistCtaTitle,
      waitlistCtaBody: intensive.waitlistCtaBody ?? clinicianCopyDefaults.intensive.waitlistCtaBody,
      faqTitle: intensive.faqTitle ?? clinicianCopyDefaults.intensive.faqTitle,
      faqItems:
        Array.isArray(intensive.faqItems) && intensive.faqItems.length > 0
          ? intensive.faqItems
          : clinicianCopyDefaults.intensive.faqItems,
    },
    themes: {
      sectionEyebrow: themes.sectionEyebrow ?? clinicianCopyDefaults.themes.sectionEyebrow,
      sectionTitle: themes.sectionTitle ?? clinicianCopyDefaults.themes.sectionTitle,
      sectionBody: themes.sectionBody ?? clinicianCopyDefaults.themes.sectionBody,
      relatedThemesTitle: themes.relatedThemesTitle ?? clinicianCopyDefaults.themes.relatedThemesTitle,
      relatedThemesBody: themes.relatedThemesBody ?? clinicianCopyDefaults.themes.relatedThemesBody,
      quotesTitle: themes.quotesTitle ?? clinicianCopyDefaults.themes.quotesTitle,
      quotesBody: themes.quotesBody ?? clinicianCopyDefaults.themes.quotesBody,
      quoteSourcePrefix: themes.quoteSourcePrefix ?? clinicianCopyDefaults.themes.quoteSourcePrefix,
      quoteThemePrefix: themes.quoteThemePrefix ?? clinicianCopyDefaults.themes.quoteThemePrefix,
      backToIntensiveLabel: themes.backToIntensiveLabel ?? clinicianCopyDefaults.themes.backToIntensiveLabel,
      waitlistCtaLabel: themes.waitlistCtaLabel ?? clinicianCopyDefaults.themes.waitlistCtaLabel,
      waitlistCtaHref: themes.waitlistCtaHref ?? clinicianCopyDefaults.themes.waitlistCtaHref,
      quotes: mergeThemeQuotes(themes.quotes),
      entries:
        Array.isArray(themes.entries) && themes.entries.length > 0
          ? themes.entries
          : clinicianCopyDefaults.themes.entries,
    },
  };
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-this",
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
    },
  }),
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
  },
  routes: {
    admin: "/cms",
  },
  collections: [
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [
        {
          name: "name",
          type: "text",
        },
      ],
    },
  ],
  globals: [
    {
      slug: "clinician-copy",
      admin: {
        group: "Site",
        description:
          "Prefilled with current copy for Home, Contact, Therapy, About, Billing, Resources, and Intensive routes.",
      },
      access: {
        read: () => true,
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            return applyClinicianCopyDefaults(data);
          },
        ],
      },
      fields: [
        {
          name: "home",
          type: "group",
          fields: [
            { name: "heroHeadline", type: "text", defaultValue: clinicianCopyDefaults.home.heroHeadline },
            { name: "heroSubhead", type: "textarea", defaultValue: clinicianCopyDefaults.home.heroSubhead },
            { name: "connectionBandTitle", type: "text", defaultValue: clinicianCopyDefaults.home.connectionBandTitle },
            {
              name: "connectionBandBody",
              type: "array",
              defaultValue: clinicianCopyDefaults.home.connectionBandBody,
              fields: [{ name: "text", type: "textarea" }],
            },
            { name: "waysTitle", type: "text", defaultValue: clinicianCopyDefaults.home.waysTitle },
            { name: "waysSubtitle", type: "textarea", defaultValue: clinicianCopyDefaults.home.waysSubtitle },
            { name: "nextStepTitle", type: "text", defaultValue: clinicianCopyDefaults.home.nextStepTitle },
            { name: "nextStepBody", type: "textarea", defaultValue: clinicianCopyDefaults.home.nextStepBody },
            { name: "intensiveTitle", type: "text", defaultValue: clinicianCopyDefaults.home.intensiveTitle },
            { name: "intensiveBody", type: "textarea", defaultValue: clinicianCopyDefaults.home.intensiveBody },
            { name: "intensiveCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.home.intensiveCtaLabel },
            { name: "videoTitle", type: "text", defaultValue: clinicianCopyDefaults.home.videoTitle },
            { name: "videoDescription", type: "textarea", defaultValue: clinicianCopyDefaults.home.videoDescription },
          ],
        },
        {
          name: "contact",
          type: "group",
          fields: [
            { name: "heroTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.heroTitle },
            { name: "heroSubtitle", type: "textarea", defaultValue: clinicianCopyDefaults.contact.heroSubtitle },
            { name: "contactIntro", type: "textarea", defaultValue: clinicianCopyDefaults.contact.contactIntro },
            { name: "contactBody", type: "textarea", defaultValue: clinicianCopyDefaults.contact.contactBody },
            { name: "contactDetailsTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.contactDetailsTitle },
            {
              name: "contactDetails",
              type: "array",
              defaultValue: clinicianCopyDefaults.contact.contactDetails,
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "formTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.formTitle },
            { name: "formNameLabel", type: "text", defaultValue: clinicianCopyDefaults.contact.formNameLabel },
            { name: "namePlaceholder", type: "text", defaultValue: clinicianCopyDefaults.contact.namePlaceholder },
            { name: "formEmailLabel", type: "text", defaultValue: clinicianCopyDefaults.contact.formEmailLabel },
            { name: "emailPlaceholder", type: "text", defaultValue: clinicianCopyDefaults.contact.emailPlaceholder },
            { name: "formMessageLabel", type: "text", defaultValue: clinicianCopyDefaults.contact.formMessageLabel },
            { name: "messagePlaceholder", type: "textarea", defaultValue: clinicianCopyDefaults.contact.messagePlaceholder },
            { name: "formHelperText", type: "textarea", defaultValue: clinicianCopyDefaults.contact.formHelperText },
            { name: "submitLabel", type: "text", defaultValue: clinicianCopyDefaults.contact.submitLabel },
            { name: "submittingLabel", type: "text", defaultValue: clinicianCopyDefaults.contact.submittingLabel },
            { name: "successMessage", type: "textarea", defaultValue: clinicianCopyDefaults.contact.successMessage },
            { name: "errorMessage", type: "textarea", defaultValue: clinicianCopyDefaults.contact.errorMessage },
            { name: "spamBlockedMessage", type: "textarea", defaultValue: clinicianCopyDefaults.contact.spamBlockedMessage },
            { name: "faqTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.faqTitle },
            {
              name: "faqItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.contact.faqItems,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
            { name: "serviceAreaTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.serviceAreaTitle },
            { name: "serviceAreaBody", type: "text", defaultValue: clinicianCopyDefaults.contact.serviceAreaBody },
            { name: "hoursTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.hoursTitle },
            {
              name: "hoursItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.contact.hoursItems,
              fields: [{ name: "text", type: "text", required: true }],
            },
            { name: "ratesTitle", type: "text", defaultValue: clinicianCopyDefaults.contact.ratesTitle },
            { name: "ratesSubtitle", type: "textarea", defaultValue: clinicianCopyDefaults.contact.ratesSubtitle },
          ],
        },
        {
          name: "therapy",
          type: "group",
          fields: [
            { name: "setupTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.setupTitle },
            { name: "setupSubhead", type: "textarea", defaultValue: clinicianCopyDefaults.therapy.setupSubhead },
            { name: "servicesTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.servicesTitle },
            { name: "howItWorksTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.howItWorksTitle },
            { name: "faqTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.faqTitle },
            {
              name: "faqItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.therapy.faqItems,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
            { name: "resourceTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.resourceTitle },
            { name: "resourceBody", type: "textarea", defaultValue: clinicianCopyDefaults.therapy.resourceBody },
            { name: "resourceCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.therapy.resourceCtaLabel },
            { name: "intensiveTitle", type: "text", defaultValue: clinicianCopyDefaults.therapy.intensiveTitle },
            { name: "intensiveBody", type: "textarea", defaultValue: clinicianCopyDefaults.therapy.intensiveBody },
            { name: "intensiveCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.therapy.intensiveCtaLabel },
          ],
        },
        {
          name: "about",
          type: "group",
          fields: [
            { name: "nameTitle", type: "text", defaultValue: clinicianCopyDefaults.about.nameTitle },
            { name: "heroSubtitle", type: "textarea", defaultValue: clinicianCopyDefaults.about.heroSubtitle },
            { name: "credentialResumeTitle", type: "text", defaultValue: clinicianCopyDefaults.about.credentialResumeTitle },
            { name: "modalitiesBandTitle", type: "text", defaultValue: clinicianCopyDefaults.about.modalitiesBandTitle },
            { name: "modalitiesBandIntro", type: "textarea", defaultValue: clinicianCopyDefaults.about.modalitiesBandIntro },
            { name: "goodFitTitle", type: "text", defaultValue: clinicianCopyDefaults.about.goodFitTitle },
            { name: "goodFitBody", type: "textarea", defaultValue: clinicianCopyDefaults.about.goodFitBody },
            { name: "approachTitle", type: "text", defaultValue: clinicianCopyDefaults.about.approachTitle },
            { name: "systemicThinkerTitle", type: "text", defaultValue: clinicianCopyDefaults.about.systemicThinkerTitle },
            { name: "systemicThinkerBody", type: "textarea", defaultValue: clinicianCopyDefaults.about.systemicThinkerBody },
            { name: "areasOfInterestTitle", type: "text", defaultValue: clinicianCopyDefaults.about.areasOfInterestTitle },
            { name: "talkingAboutSexTitle", type: "text", defaultValue: clinicianCopyDefaults.about.talkingAboutSexTitle },
            { name: "faqTitle", type: "text", defaultValue: clinicianCopyDefaults.about.faqTitle },
            {
              name: "faqItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.about.faqItems,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          name: "billing",
          type: "group",
          fields: [
            { name: "heroTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.heroTitle },
            { name: "heroSubtitle", type: "textarea", defaultValue: clinicianCopyDefaults.billing.heroSubtitle },
            { name: "primaryCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.billing.primaryCtaLabel },
            { name: "secondaryCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.billing.secondaryCtaLabel },
            { name: "privatePayTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.privatePayTitle },
            { name: "superbillsTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.superbillsTitle },
            { name: "superbillsBody", type: "textarea", defaultValue: clinicianCopyDefaults.billing.superbillsBody },
            { name: "howItWorksTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.howItWorksTitle },
            { name: "howItWorksNote", type: "textarea", defaultValue: clinicianCopyDefaults.billing.howItWorksNote },
            { name: "diagnosisTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.diagnosisTitle },
            { name: "beforeStartTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.beforeStartTitle },
            { name: "beforeStartBody", type: "textarea", defaultValue: clinicianCopyDefaults.billing.beforeStartBody },
            { name: "faqTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.faqTitle },
            {
              name: "faqItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.billing.faqItems,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
            { name: "closingCtaTitle", type: "text", defaultValue: clinicianCopyDefaults.billing.closingCtaTitle },
            { name: "closingCtaBody", type: "textarea", defaultValue: clinicianCopyDefaults.billing.closingCtaBody },
            { name: "closingCtaLabel", type: "text", defaultValue: clinicianCopyDefaults.billing.closingCtaLabel },
          ],
        },
        {
          name: "resources",
          type: "group",
          fields: [
            { name: "v2Title", type: "text", defaultValue: clinicianCopyDefaults.resources.v2Title },
            { name: "v2Summary", type: "textarea", defaultValue: clinicianCopyDefaults.resources.v2Summary },
            { name: "keyConceptsTitle", type: "text", defaultValue: clinicianCopyDefaults.resources.keyConceptsTitle },
          ],
        },
        {
          name: "intensive",
          type: "group",
          fields: [
            {
              name: "heroHeading",
              type: "text",
              defaultValue: clinicianCopyDefaults.intensive.heroHeading,
            },
            {
              name: "heroSubhead",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.heroSubhead,
            },
            {
              name: "sellLead",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.sellLead,
            },
            {
              name: "sellTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.intensive.sellTitle,
            },
            {
              name: "sellBodyOne",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.sellBodyOne,
            },
            {
              name: "sellBodyTwo",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.sellBodyTwo,
            },
            {
              name: "sellOutcome",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.sellOutcome,
            },
            {
              name: "includedTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.intensive.includedTitle,
            },
            {
              name: "includedItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.intensive.includedItems,
              fields: [{ name: "text", type: "text", required: true }],
            },
            {
              name: "waitlistCtaTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.intensive.waitlistCtaTitle,
            },
            {
              name: "waitlistCtaBody",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.intensive.waitlistCtaBody,
            },
            {
              name: "faqTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.intensive.faqTitle,
            },
            {
              name: "faqItems",
              type: "array",
              defaultValue: clinicianCopyDefaults.intensive.faqItems,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          name: "themes",
          type: "group",
          fields: [
            {
              name: "sectionEyebrow",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.sectionEyebrow,
            },
            {
              name: "sectionTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.sectionTitle,
            },
            {
              name: "sectionBody",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.themes.sectionBody,
            },
            {
              name: "relatedThemesTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.relatedThemesTitle,
            },
            {
              name: "relatedThemesBody",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.themes.relatedThemesBody,
            },
            {
              name: "quotesTitle",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.quotesTitle,
            },
            {
              name: "quotesBody",
              type: "textarea",
              defaultValue: clinicianCopyDefaults.themes.quotesBody,
            },
            {
              name: "quoteSourcePrefix",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.quoteSourcePrefix,
            },
            {
              name: "quoteThemePrefix",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.quoteThemePrefix,
            },
            {
              name: "backToIntensiveLabel",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.backToIntensiveLabel,
            },
            {
              name: "waitlistCtaLabel",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.waitlistCtaLabel,
            },
            {
              name: "waitlistCtaHref",
              type: "text",
              defaultValue: clinicianCopyDefaults.themes.waitlistCtaHref,
            },
            {
              name: "quotes",
              type: "array",
              defaultValue: clinicianCopyDefaults.themes.quotes,
              fields: [
                {
                  name: "themeSlugs",
                  type: "select",
                  hasMany: true,
                  required: true,
                  options: [...themeOptions],
                },
                { name: "quote", type: "textarea", required: true },
                { name: "practitioner", type: "text", required: true },
                { name: "sourceTitle", type: "text", required: true },
                { name: "sourceUrl", type: "text", required: true },
              ],
            },
            {
              name: "entries",
              type: "array",
              defaultValue: clinicianCopyDefaults.themes.entries,
              fields: [
                {
                  name: "slug",
                  type: "select",
                  required: true,
                  options: [...themeOptions],
                },
                { name: "navLabel", type: "text" },
                { name: "title", type: "text" },
                { name: "subtitle", type: "textarea" },
                { name: "intro", type: "textarea" },
                { name: "fitTitle", type: "text" },
                {
                  name: "fitBullets",
                  type: "array",
                  fields: [{ name: "text", type: "text", required: true }],
                },
                { name: "outcomesTitle", type: "text" },
                {
                  name: "outcomesBullets",
                  type: "array",
                  fields: [{ name: "text", type: "text", required: true }],
                },
                {
                  name: "faq",
                  type: "array",
                  fields: [
                    { name: "question", type: "text", required: true },
                    { name: "answer", type: "textarea", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
});
