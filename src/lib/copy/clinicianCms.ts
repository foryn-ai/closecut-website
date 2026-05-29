import "server-only";

import { getPayload } from "payload";
import configPromise from "@payload-config";

const CMS_ENABLED = false;

export type ClinicianThemeOverride = {
  slug?: string | null;
  navLabel?: string | null;
  title?: string | null;
  subtitle?: string | null;
  intro?: string | null;
  fitTitle?: string | null;
  fitBullets?: string[] | null;
  outcomesTitle?: string | null;
  outcomesBullets?: string[] | null;
  faq?: ClinicianFaqItem[] | null;
};

export type ClinicianThemeQuote = {
  themeSlugs?: string[] | null;
  quote?: string | null;
  practitioner?: string | null;
  sourceTitle?: string | null;
  sourceUrl?: string | null;
};

export type ClinicianFaqItem = {
  question: string;
  answer: string;
};

export type ClinicianCopyGlobal = {
  home?: {
    heroHeadline?: string | null;
    heroSubhead?: string | null;
    connectionBandTitle?: string | null;
    connectionBandBody?: string[] | null;
    waysTitle?: string | null;
    waysSubtitle?: string | null;
    nextStepTitle?: string | null;
    nextStepBody?: string | null;
    intensiveTitle?: string | null;
    intensiveBody?: string | null;
    intensiveCtaLabel?: string | null;
    videoTitle?: string | null;
    videoDescription?: string | null;
  } | null;
  contact?: {
    heroTitle?: string | null;
    heroSubtitle?: string | null;
    contactIntro?: string | null;
    contactBody?: string | null;
    contactDetailsTitle?: string | null;
    contactDetails?: string[] | null;
    formTitle?: string | null;
    formNameLabel?: string | null;
    namePlaceholder?: string | null;
    formEmailLabel?: string | null;
    emailPlaceholder?: string | null;
    formMessageLabel?: string | null;
    messagePlaceholder?: string | null;
    formHelperText?: string | null;
    submitLabel?: string | null;
    submittingLabel?: string | null;
    successMessage?: string | null;
    errorMessage?: string | null;
    spamBlockedMessage?: string | null;
    faqTitle?: string | null;
    faqItems?: ClinicianFaqItem[] | null;
    serviceAreaTitle?: string | null;
    serviceAreaBody?: string | null;
    hoursTitle?: string | null;
    hoursItems?: string[] | null;
    ratesTitle?: string | null;
    ratesSubtitle?: string | null;
  } | null;
  therapy?: {
    setupTitle?: string | null;
    setupSubhead?: string | null;
    servicesTitle?: string | null;
    howItWorksTitle?: string | null;
    faqTitle?: string | null;
    faqItems?: ClinicianFaqItem[] | null;
    resourceTitle?: string | null;
    resourceBody?: string | null;
    resourceCtaLabel?: string | null;
    intensiveTitle?: string | null;
    intensiveBody?: string | null;
    intensiveCtaLabel?: string | null;
  } | null;
  about?: {
    nameTitle?: string | null;
    heroSubtitle?: string | null;
    credentialResumeTitle?: string | null;
    modalitiesBandTitle?: string | null;
    modalitiesBandIntro?: string | null;
    goodFitTitle?: string | null;
    goodFitBody?: string | null;
    approachTitle?: string | null;
    systemicThinkerTitle?: string | null;
    systemicThinkerBody?: string | null;
    areasOfInterestTitle?: string | null;
    talkingAboutSexTitle?: string | null;
    faqTitle?: string | null;
    faqItems?: ClinicianFaqItem[] | null;
  } | null;
  billing?: {
    heroTitle?: string | null;
    heroSubtitle?: string | null;
    primaryCtaLabel?: string | null;
    secondaryCtaLabel?: string | null;
    privatePayTitle?: string | null;
    superbillsTitle?: string | null;
    superbillsBody?: string | null;
    howItWorksTitle?: string | null;
    howItWorksNote?: string | null;
    diagnosisTitle?: string | null;
    beforeStartTitle?: string | null;
    beforeStartBody?: string | null;
    faqTitle?: string | null;
    faqItems?: ClinicianFaqItem[] | null;
    closingCtaTitle?: string | null;
    closingCtaBody?: string | null;
    closingCtaLabel?: string | null;
  } | null;
  resources?: {
    v2Title?: string | null;
    v2Summary?: string | null;
    keyConceptsTitle?: string | null;
  } | null;
  intensive?: {
    heroHeading?: string | null;
    heroSubhead?: string | null;
    sellTitle?: string | null;
    sellLead?: string | null;
    sellBodyOne?: string | null;
    sellBodyTwo?: string | null;
    sellOutcome?: string | null;
    includedTitle?: string | null;
    includedItems?: string[] | null;
    waitlistCtaTitle?: string | null;
    waitlistCtaBody?: string | null;
    faqTitle?: string | null;
    faqItems?: ClinicianFaqItem[] | null;
  } | null;
  themes?: {
    sectionEyebrow?: string | null;
    sectionTitle?: string | null;
    sectionBody?: string | null;
    relatedThemesTitle?: string | null;
    relatedThemesBody?: string | null;
    quotesTitle?: string | null;
    quotesBody?: string | null;
    quoteSourcePrefix?: string | null;
    quoteThemePrefix?: string | null;
    backToIntensiveLabel?: string | null;
    waitlistCtaLabel?: string | null;
    waitlistCtaHref?: string | null;
    quotes?: ClinicianThemeQuote[] | null;
    entries?: ClinicianThemeOverride[] | null;
  } | null;
} | null;

const trimOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const trimList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (typeof entry === "string") return trimOrNull(entry);
      if (entry && typeof entry === "object" && "text" in entry) {
        return trimOrNull((entry as { text?: unknown }).text);
      }
      return null;
    })
    .filter((entry): entry is string => Boolean(entry));
};

const trimFaqList = (value: unknown): ClinicianFaqItem[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const row = entry as { question?: unknown; answer?: unknown };
      const question = trimOrNull(row?.question);
      const answer = trimOrNull(row?.answer);
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((entry): entry is ClinicianFaqItem => Boolean(entry));
};

export async function getClinicianCopyGlobal(): Promise<ClinicianCopyGlobal> {
  if (!CMS_ENABLED) return null;

  try {
    const payload = await getPayload({ config: configPromise });
    const data = (await payload.findGlobal({
      slug: "clinician-copy",
      depth: 0,
    })) as any;

    return {
      home: {
        heroHeadline: trimOrNull(data?.home?.heroHeadline),
        heroSubhead: trimOrNull(data?.home?.heroSubhead),
        connectionBandTitle: trimOrNull(data?.home?.connectionBandTitle),
        connectionBandBody: trimList(data?.home?.connectionBandBody),
        waysTitle: trimOrNull(data?.home?.waysTitle),
        waysSubtitle: trimOrNull(data?.home?.waysSubtitle),
        nextStepTitle: trimOrNull(data?.home?.nextStepTitle),
        nextStepBody: trimOrNull(data?.home?.nextStepBody),
        intensiveTitle: trimOrNull(data?.home?.intensiveTitle),
        intensiveBody: trimOrNull(data?.home?.intensiveBody),
        intensiveCtaLabel: trimOrNull(data?.home?.intensiveCtaLabel),
        videoTitle: trimOrNull(data?.home?.videoTitle),
        videoDescription: trimOrNull(data?.home?.videoDescription),
      },
      contact: {
        heroTitle: trimOrNull(data?.contact?.heroTitle),
        heroSubtitle: trimOrNull(data?.contact?.heroSubtitle),
        contactIntro: trimOrNull(data?.contact?.contactIntro),
        contactBody: trimOrNull(data?.contact?.contactBody),
        contactDetailsTitle: trimOrNull(data?.contact?.contactDetailsTitle),
        contactDetails: trimList(data?.contact?.contactDetails),
        formTitle: trimOrNull(data?.contact?.formTitle),
        formNameLabel: trimOrNull(data?.contact?.formNameLabel),
        namePlaceholder: trimOrNull(data?.contact?.namePlaceholder),
        formEmailLabel: trimOrNull(data?.contact?.formEmailLabel),
        emailPlaceholder: trimOrNull(data?.contact?.emailPlaceholder),
        formMessageLabel: trimOrNull(data?.contact?.formMessageLabel),
        messagePlaceholder: trimOrNull(data?.contact?.messagePlaceholder),
        formHelperText: trimOrNull(data?.contact?.formHelperText),
        submitLabel: trimOrNull(data?.contact?.submitLabel),
        submittingLabel: trimOrNull(data?.contact?.submittingLabel),
        successMessage: trimOrNull(data?.contact?.successMessage),
        errorMessage: trimOrNull(data?.contact?.errorMessage),
        spamBlockedMessage: trimOrNull(data?.contact?.spamBlockedMessage),
        faqTitle: trimOrNull(data?.contact?.faqTitle),
        faqItems: trimFaqList(data?.contact?.faqItems),
        serviceAreaTitle: trimOrNull(data?.contact?.serviceAreaTitle),
        serviceAreaBody: trimOrNull(data?.contact?.serviceAreaBody),
        hoursTitle: trimOrNull(data?.contact?.hoursTitle),
        hoursItems: trimList(data?.contact?.hoursItems),
        ratesTitle: trimOrNull(data?.contact?.ratesTitle),
        ratesSubtitle: trimOrNull(data?.contact?.ratesSubtitle),
      },
      therapy: {
        setupTitle: trimOrNull(data?.therapy?.setupTitle),
        setupSubhead: trimOrNull(data?.therapy?.setupSubhead),
        servicesTitle: trimOrNull(data?.therapy?.servicesTitle),
        howItWorksTitle: trimOrNull(data?.therapy?.howItWorksTitle),
        faqTitle: trimOrNull(data?.therapy?.faqTitle),
        faqItems: trimFaqList(data?.therapy?.faqItems),
        resourceTitle: trimOrNull(data?.therapy?.resourceTitle),
        resourceBody: trimOrNull(data?.therapy?.resourceBody),
        resourceCtaLabel: trimOrNull(data?.therapy?.resourceCtaLabel),
        intensiveTitle: trimOrNull(data?.therapy?.intensiveTitle),
        intensiveBody: trimOrNull(data?.therapy?.intensiveBody),
        intensiveCtaLabel: trimOrNull(data?.therapy?.intensiveCtaLabel),
      },
      about: {
        nameTitle: trimOrNull(data?.about?.nameTitle),
        heroSubtitle: trimOrNull(data?.about?.heroSubtitle),
        credentialResumeTitle: trimOrNull(data?.about?.credentialResumeTitle),
        modalitiesBandTitle: trimOrNull(data?.about?.modalitiesBandTitle),
        modalitiesBandIntro: trimOrNull(data?.about?.modalitiesBandIntro),
        goodFitTitle: trimOrNull(data?.about?.goodFitTitle),
        goodFitBody: trimOrNull(data?.about?.goodFitBody),
        approachTitle: trimOrNull(data?.about?.approachTitle),
        systemicThinkerTitle: trimOrNull(data?.about?.systemicThinkerTitle),
        systemicThinkerBody: trimOrNull(data?.about?.systemicThinkerBody),
        areasOfInterestTitle: trimOrNull(data?.about?.areasOfInterestTitle),
        talkingAboutSexTitle: trimOrNull(data?.about?.talkingAboutSexTitle),
        faqTitle: trimOrNull(data?.about?.faqTitle),
        faqItems: trimFaqList(data?.about?.faqItems),
      },
      billing: {
        heroTitle: trimOrNull(data?.billing?.heroTitle),
        heroSubtitle: trimOrNull(data?.billing?.heroSubtitle),
        primaryCtaLabel: trimOrNull(data?.billing?.primaryCtaLabel),
        secondaryCtaLabel: trimOrNull(data?.billing?.secondaryCtaLabel),
        privatePayTitle: trimOrNull(data?.billing?.privatePayTitle),
        superbillsTitle: trimOrNull(data?.billing?.superbillsTitle),
        superbillsBody: trimOrNull(data?.billing?.superbillsBody),
        howItWorksTitle: trimOrNull(data?.billing?.howItWorksTitle),
        howItWorksNote: trimOrNull(data?.billing?.howItWorksNote),
        diagnosisTitle: trimOrNull(data?.billing?.diagnosisTitle),
        beforeStartTitle: trimOrNull(data?.billing?.beforeStartTitle),
        beforeStartBody: trimOrNull(data?.billing?.beforeStartBody),
        faqTitle: trimOrNull(data?.billing?.faqTitle),
        faqItems: trimFaqList(data?.billing?.faqItems),
        closingCtaTitle: trimOrNull(data?.billing?.closingCtaTitle),
        closingCtaBody: trimOrNull(data?.billing?.closingCtaBody),
        closingCtaLabel: trimOrNull(data?.billing?.closingCtaLabel),
      },
      resources: {
        v2Title: trimOrNull(data?.resources?.v2Title),
        v2Summary: trimOrNull(data?.resources?.v2Summary),
        keyConceptsTitle: trimOrNull(data?.resources?.keyConceptsTitle),
      },
      intensive: {
        heroHeading: trimOrNull(data?.intensive?.heroHeading),
        heroSubhead: trimOrNull(data?.intensive?.heroSubhead),
        sellTitle: trimOrNull(data?.intensive?.sellTitle),
        sellLead: trimOrNull(data?.intensive?.sellLead),
        sellBodyOne: trimOrNull(data?.intensive?.sellBodyOne),
        sellBodyTwo: trimOrNull(data?.intensive?.sellBodyTwo),
        sellOutcome: trimOrNull(data?.intensive?.sellOutcome),
        includedTitle: trimOrNull(data?.intensive?.includedTitle),
        includedItems: trimList(data?.intensive?.includedItems),
        waitlistCtaTitle: trimOrNull(data?.intensive?.waitlistCtaTitle),
        waitlistCtaBody: trimOrNull(data?.intensive?.waitlistCtaBody),
        faqTitle: trimOrNull(data?.intensive?.faqTitle),
        faqItems: trimFaqList(data?.intensive?.faqItems),
      },
      themes: {
        sectionEyebrow: trimOrNull(data?.themes?.sectionEyebrow),
        sectionTitle: trimOrNull(data?.themes?.sectionTitle),
        sectionBody: trimOrNull(data?.themes?.sectionBody),
        relatedThemesTitle: trimOrNull(data?.themes?.relatedThemesTitle),
        relatedThemesBody: trimOrNull(data?.themes?.relatedThemesBody),
        quotesTitle: trimOrNull(data?.themes?.quotesTitle),
        quotesBody: trimOrNull(data?.themes?.quotesBody),
        quoteSourcePrefix: trimOrNull(data?.themes?.quoteSourcePrefix),
        quoteThemePrefix: trimOrNull(data?.themes?.quoteThemePrefix),
        backToIntensiveLabel: trimOrNull(data?.themes?.backToIntensiveLabel),
        waitlistCtaLabel: trimOrNull(data?.themes?.waitlistCtaLabel),
        waitlistCtaHref: trimOrNull(data?.themes?.waitlistCtaHref),
        quotes:
          data?.themes?.quotes
            ?.map((entry: any) => ({
              themeSlugs: trimList(entry?.themeSlugs),
              quote: trimOrNull(entry?.quote),
              practitioner: trimOrNull(entry?.practitioner),
              sourceTitle: trimOrNull(entry?.sourceTitle),
              sourceUrl: trimOrNull(entry?.sourceUrl),
            }))
            .filter(
              (entry: ClinicianThemeQuote) =>
                entry.quote &&
                entry.practitioner &&
                entry.sourceTitle &&
                entry.sourceUrl &&
                entry.themeSlugs &&
                entry.themeSlugs.length > 0,
            ) ?? [],
        entries:
          data?.themes?.entries
            ?.map((entry: any) => ({
              slug: trimOrNull(entry?.slug),
              navLabel: trimOrNull(entry?.navLabel),
              title: trimOrNull(entry?.title),
              subtitle: trimOrNull(entry?.subtitle),
              intro: trimOrNull(entry?.intro),
              fitTitle: trimOrNull(entry?.fitTitle),
              fitBullets: trimList(entry?.fitBullets),
              outcomesTitle: trimOrNull(entry?.outcomesTitle),
              outcomesBullets: trimList(entry?.outcomesBullets),
              faq: trimFaqList(entry?.faq),
            }))
            .filter((entry: ClinicianThemeOverride) => entry.slug) ?? [],
      },
    };
  } catch {
    return null;
  }
}

export function createThemeOverrideMap(cmsCopy: ClinicianCopyGlobal) {
  const map = new Map<string, ClinicianThemeOverride>();
  const entries = cmsCopy?.themes?.entries ?? [];

  entries.forEach((entry) => {
    if (!entry.slug) return;
    map.set(entry.slug, entry);
  });

  return map;
}

export function getThemeQuotes(cmsCopy: ClinicianCopyGlobal, slug: string): ClinicianThemeQuote[] {
  const quotes = cmsCopy?.themes?.quotes ?? [];
  return quotes.filter((entry) => entry.themeSlugs?.includes(slug));
}

export function resolveHomeCopy(
  base: any,
  cmsCopy: ClinicianCopyGlobal,
): any {
  const home = cmsCopy?.home;

  return {
    ...base,
    heroHeadline: home?.heroHeadline ?? base.heroHeadline,
    heroSubhead: home?.heroSubhead ?? base.heroSubhead,
    connectionBandTitle: home?.connectionBandTitle ?? base.connectionBandTitle,
    connectionBandBody:
      home?.connectionBandBody && home.connectionBandBody.length > 0
        ? home.connectionBandBody
        : base.connectionBandBody,
    waysTitle: home?.waysTitle ?? base.waysTitle,
    waysSubtitle: home?.waysSubtitle ?? base.waysSubtitle,
    nextStepTitle: home?.nextStepTitle ?? base.nextStepTitle,
    nextStepBody: home?.nextStepBody ?? base.nextStepBody,
    intensiveTitle: home?.intensiveTitle ?? base.intensiveTitle,
    intensiveBody: home?.intensiveBody ?? base.intensiveBody,
    intensiveCtaLabel: home?.intensiveCtaLabel ?? base.intensiveCtaLabel,
    videoTitle: home?.videoTitle ?? base.videoTitle,
    videoDescription: home?.videoDescription ?? base.videoDescription,
  };
}

export function resolveContactCopy(
  base: any,
  cmsCopy: ClinicianCopyGlobal,
): any {
  const contact = cmsCopy?.contact;

  return {
    ...base,
    heroTitle: contact?.heroTitle ?? base.heroTitle,
    heroSubtitle: contact?.heroSubtitle ?? base.heroSubtitle,
    contactIntro: contact?.contactIntro ?? base.contactIntro,
    contactBody: contact?.contactBody ?? base.contactBody,
    contactDetailsTitle: contact?.contactDetailsTitle ?? base.contactDetailsTitle,
    contactDetails:
      contact?.contactDetails && contact.contactDetails.length > 0
        ? contact.contactDetails
        : base.contactDetails,
    formTitle: contact?.formTitle ?? base.formTitle,
    formNameLabel: contact?.formNameLabel ?? base.formNameLabel,
    namePlaceholder: contact?.namePlaceholder ?? base.namePlaceholder,
    formEmailLabel: contact?.formEmailLabel ?? base.formEmailLabel,
    emailPlaceholder: contact?.emailPlaceholder ?? base.emailPlaceholder,
    formMessageLabel: contact?.formMessageLabel ?? base.formMessageLabel,
    messagePlaceholder: contact?.messagePlaceholder ?? base.messagePlaceholder,
    formHelperText: contact?.formHelperText ?? base.formHelperText,
    submitLabel: contact?.submitLabel ?? base.submitLabel,
    submittingLabel: contact?.submittingLabel ?? base.submittingLabel,
    successMessage: contact?.successMessage ?? base.successMessage,
    errorMessage: contact?.errorMessage ?? base.errorMessage,
    spamBlockedMessage: contact?.spamBlockedMessage ?? base.spamBlockedMessage,
    faqTitle: contact?.faqTitle ?? base.faqTitle,
    faqItems:
      contact?.faqItems && contact.faqItems.length > 0 ? contact.faqItems : base.faqItems,
    serviceAreaTitle: contact?.serviceAreaTitle ?? base.serviceAreaTitle,
    serviceAreaBody: contact?.serviceAreaBody ?? base.serviceAreaBody,
    hoursTitle: contact?.hoursTitle ?? base.hoursTitle,
    hoursItems:
      contact?.hoursItems && contact.hoursItems.length > 0
        ? contact.hoursItems
        : base.hoursItems,
  };
}

export function resolveTherapyCopy(base: any, cmsCopy: ClinicianCopyGlobal): any {
  const therapy = cmsCopy?.therapy;

  return {
    ...base,
    setupTitle: therapy?.setupTitle ?? base.setupTitle,
    setupSubhead: therapy?.setupSubhead ?? base.setupSubhead,
    servicesTitle: therapy?.servicesTitle ?? base.servicesTitle,
    howItWorksTitle: therapy?.howItWorksTitle ?? base.howItWorksTitle,
    faqTitle: therapy?.faqTitle ?? base.faqTitle,
    faqItems: therapy?.faqItems && therapy.faqItems.length > 0 ? therapy.faqItems : base.faqItems,
    resourceTitle: therapy?.resourceTitle ?? base.resourceTitle,
    resourceBody: therapy?.resourceBody ?? base.resourceBody,
    resourceCtaLabel: therapy?.resourceCtaLabel ?? base.resourceCtaLabel,
    intensiveTitle: therapy?.intensiveTitle ?? base.intensiveTitle,
    intensiveBody: therapy?.intensiveBody ?? base.intensiveBody,
    intensiveCtaLabel: therapy?.intensiveCtaLabel ?? base.intensiveCtaLabel,
  };
}

export function resolveAboutCopy(base: any, cmsCopy: ClinicianCopyGlobal): any {
  const about = cmsCopy?.about;

  return {
    ...base,
    nameTitle: about?.nameTitle ?? base.nameTitle,
    heroSubtitle: about?.heroSubtitle ?? base.heroSubtitle,
    credentialResumeTitle: about?.credentialResumeTitle ?? base.credentialResumeTitle,
    modalitiesBandTitle: about?.modalitiesBandTitle ?? base.modalitiesBandTitle,
    modalitiesBandIntro: about?.modalitiesBandIntro ?? base.modalitiesBandIntro,
    goodFitTitle: about?.goodFitTitle ?? base.goodFitTitle,
    goodFitBody: about?.goodFitBody ?? base.goodFitBody,
    approachTitle: about?.approachTitle ?? base.approachTitle,
    systemicThinkerTitle: about?.systemicThinkerTitle ?? base.systemicThinkerTitle,
    systemicThinkerBody: about?.systemicThinkerBody ?? base.systemicThinkerBody,
    areasOfInterestTitle: about?.areasOfInterestTitle ?? base.areasOfInterestTitle,
    talkingAboutSexTitle: about?.talkingAboutSexTitle ?? base.talkingAboutSexTitle,
    faqTitle: about?.faqTitle ?? base.faqTitle,
    faqItems: about?.faqItems && about.faqItems.length > 0 ? about.faqItems : base.faqItems,
  };
}

export function resolveBillingCopy(base: any, cmsCopy: ClinicianCopyGlobal): any {
  const billing = cmsCopy?.billing;

  return {
    ...base,
    heroTitle: billing?.heroTitle ?? base.heroTitle,
    heroSubtitle: billing?.heroSubtitle ?? base.heroSubtitle,
    primaryCtaLabel: billing?.primaryCtaLabel ?? base.primaryCtaLabel,
    secondaryCtaLabel: billing?.secondaryCtaLabel ?? base.secondaryCtaLabel,
    privatePayTitle: billing?.privatePayTitle ?? base.privatePayTitle,
    superbillsTitle: billing?.superbillsTitle ?? base.superbillsTitle,
    superbillsBody: billing?.superbillsBody ?? base.superbillsBody,
    howItWorksTitle: billing?.howItWorksTitle ?? base.howItWorksTitle,
    howItWorksNote: billing?.howItWorksNote ?? base.howItWorksNote,
    diagnosisTitle: billing?.diagnosisTitle ?? base.diagnosisTitle,
    beforeStartTitle: billing?.beforeStartTitle ?? base.beforeStartTitle,
    beforeStartBody: billing?.beforeStartBody ?? base.beforeStartBody,
    faqTitle: billing?.faqTitle ?? base.faqTitle,
    faqItems: billing?.faqItems && billing.faqItems.length > 0 ? billing.faqItems : base.faqItems,
    closingCtaTitle: billing?.closingCtaTitle ?? base.closingCtaTitle,
    closingCtaBody: billing?.closingCtaBody ?? base.closingCtaBody,
    closingCtaLabel: billing?.closingCtaLabel ?? base.closingCtaLabel,
  };
}

export function resolveResourcesCopy(base: any, cmsCopy: ClinicianCopyGlobal): any {
  const resources = cmsCopy?.resources;

  return {
    ...base,
    v2Title: resources?.v2Title ?? base.v2Title,
    v2Summary: resources?.v2Summary ?? base.v2Summary,
    keyConceptsTitle: resources?.keyConceptsTitle ?? base.keyConceptsTitle,
  };
}
