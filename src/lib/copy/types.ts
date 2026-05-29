export type NavLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HomeAreaOfInterestItem = {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
};

export type HomeWaysCard = {
  title: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  imageAlt: string;
  description: string;
};

export type WorkshopTopicCopy = {
  id: string;
  title: string;
  iconSrc: string;
  iconAlt?: string;
  shortDescription: string;
  outcomes: string[];
  whoItsFor: string;
  takeaway: string;
  waitlistTag: string;
};

export type TherapyServiceCopy = {
  id: string;
  tabLabel: string;
  title: string;
  paragraphs: string[];
  goodFit: string;
};

export type AboutModalityCopy = {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
};

export type SiteCopyShape = {
  nav: {
    brand: string;
    menuLabel: string;
    closeMenuLabel: string;
    mobileNavLabel: string;
    links: NavLink[];
  } & Record<string, unknown>;
  footer: {
    locationsLabel: string;
    locationsText: string;
    contactLabel: string;
    contactText: string;
    privacyLabel: string;
    privacyText: string;
    ctaLabel: string;
    ctaHref: string;
  } & Record<string, unknown>;
  playgroundFurniture: {
    title: string;
    subtitle: string;
    pathLabel: string;
    altLabel: string;
    emptyLabel: string;
  } & Record<string, unknown>;
  home: {
    heroHeadline: string;
    heroSubhead: string;
    connectionBandTitle: string;
    connectionBandBody: string[];
    areasOfInterestTitle: string;
    areasOfInterestIntro: string;
    areasOfInterestItems: HomeAreaOfInterestItem[];
    waysTitle: string;
    waysSubtitle: string;
    waysCards: HomeWaysCard[];
    nextStepTitle: string;
    nextStepBody: string;
    resourcesTitle: string;
    resourcesBody: string;
    resourcesCtaLabel: string;
    intensiveTitle: string;
    intensiveBody: string;
    intensiveCtaLabel: string;
    videoTitle: string;
    videoDescription: string;
  } & Record<string, unknown>;
  workshops: {
    heroHeadline: string;
    heroSubhead: string;
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    metaLine: string;
    primaryCtaLabel: string;
    faqTitle: string;
    faqIconSrc: string;
    faqItems: FaqItem[];
    topics: WorkshopTopicCopy[];
  } & Record<string, unknown>;
  therapy: {
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    setupTitle: string;
    setupSubhead: string;
    servicesTitle: string;
    servicePickerLabel: string;
    serviceImageLabel: string;
    services: TherapyServiceCopy[];
    faqTitle: string;
    faqIconSrc: string;
    faqItems: FaqItem[];
  } & Record<string, unknown>;
  about: {
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    nameTitle: string;
    heroSubtitle: string;
    credentialResumeTitle: string;
    credentialResumeSections: Array<{ heading: string; items: string[] }>;
    modalitiesBandTitle: string;
    modalitiesBandIntro: string;
    modalities: AboutModalityCopy[];
    faqTitle: string;
    faqIconSrc: string;
    faqItems: FaqItem[];
  } & Record<string, unknown>;
  contact: {
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    heroTitle: string;
    heroSubtitle: string;
    faqTitle: string;
    faqIconSrc: string;
    faqItems: FaqItem[];
  } & Record<string, unknown>;
  billing: {
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    heroTitle: string;
    heroSubtitle: string;
    faqTitle: string;
    faqIconSrc: string;
    faqItems: FaqItem[];
  } & Record<string, unknown>;
  resources: {
    indexHeroFurnitureSrc: string;
    indexHeroFurnitureAlt: string;
    indexTitle: string;
    indexSummary: string;
    indexNote: string;
    librarySwitchLabel: string;
    libraryV2Label: string;
    libraryV1Label: string;
    v1Title: string;
    v1Summary: string;
    v2Title: string;
    v2Summary: string;
    emergencyTitle: string;
    emergencyIntro: string;
    emergencyCards: Array<{
      title: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
    }>;
    booksTitle: string;
    booksIntro: string;
    booksTagLabel: string;
    booksFilterAllLabel: string;
    booksPriorityLabel: string;
    booksFeaturedTitle: string;
    booksFeaturedIntro: string;
    booksFeaturedIds: string[];
    booksEmptyLabel: string;
    booksTags: Array<{
      id: string;
      label: string;
    }>;
    booksCatalog: Array<{
      id: string;
      title: string;
      author: string;
      coverSrc: string;
      coverAlt: string;
      linkHref: string;
      linkLabel: string;
      priorityRank: number;
      hookTags: string[];
    }>;
  } & Record<string, unknown>;
  fortyEight: {
    heroFurnitureSrc: string;
    heroFurnitureAlt: string;
    heroHeading: string;
    heroSubhead: string;
    faqTitle: string;
    faqIconSrc: string;
    waitlistCtaLabel?: string;
    pricingEyebrow?: string;
    pricingTitle?: string;
    pricingBodyOne?: string;
    pricingBodyTwo?: string;
    pricingSecondaryCtaLabel?: string;
    conversionIntroLabel?: string;
    conversionSteps?: string[];
    waitlistFormTitle?: string;
    waitlistFormBody?: string;
    waitlistEmailLabel?: string;
    waitlistEmailPlaceholder?: string;
    waitlistSubmitLabel?: string;
    waitlistSubmittingLabel?: string;
    waitlistSuccessMessage?: string;
    waitlistErrorMessage?: string;
    waitlistSpamBlockedMessage?: string;
    waitlistMicroline?: string;
  } & Record<string, unknown>;
} & Record<string, unknown>;
