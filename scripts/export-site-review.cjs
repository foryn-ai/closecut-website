require("ts-node/register/transpile-only");

const { writeFileSync, mkdirSync } = require("node:fs");
const { dirname, join } = require("node:path");

const { SITE_COPY, COPY_VERSION } = require("../src/lib/copy/therafoxWebsite");
const {
  INTENSIVE_SEO,
  PAGE_SEO,
  RESOURCES_SEO,
  SEO_VERSION,
  THERAFOX_SITE_SEO,
} = require("../src/lib/seo/siteMetadata");

const outputPath = join(process.cwd(), "artifacts", "site.review.export.md");
mkdirSync(dirname(outputPath), { recursive: true });

const lines = [];

const addLine = (line = "") => lines.push(line);
const addSection = (title) => {
  addLine(`## ${title}`);
};

const addKeyValue = (key, value) => {
  if (value === undefined || value === null || value === "") {
    addLine(`- ${key}:`);
    return;
  }
  addLine(`- ${key}: ${value}`);
};

const addList = (label, items) => {
  addLine(`- ${label}:`);
  items.forEach((item) => addLine(`  - ${item}`));
};

addLine("# Therafox site review export");
addLine();
addKeyValue("Copy version", COPY_VERSION);
addKeyValue("SEO version", SEO_VERSION);
addLine();
addSection("Review guidance");
addLine("- Use the developmental model as a concept guide, not a literal phrasing guide.");
addLine("- Keep language private, precise, and product focused.");
addLine("- No clinical content.");
addLine("- No em dashes.");
addLine();
addSection("Review notes");
addLine("- Home:");
addLine("- Therapy:");
addLine("- About:");
addLine("- Contact:");
addLine("- Intensive:");
addLine("- Workshops:");
addLine("- Resources:");
addLine();

addSection("SEO overview");
addLine();
addLine("### Global metadata");
addKeyValue("Title", THERAFOX_SITE_SEO.title);
addKeyValue("Description", THERAFOX_SITE_SEO.description);
addKeyValue("Canonical", THERAFOX_SITE_SEO.canonicalPath);
addKeyValue("Open Graph title", THERAFOX_SITE_SEO.openGraph.title);
addKeyValue("Open Graph description", THERAFOX_SITE_SEO.openGraph.description);
addKeyValue("Open Graph image alt", THERAFOX_SITE_SEO.openGraph.imageAlt);
addKeyValue("Twitter title", THERAFOX_SITE_SEO.twitter.title);
addKeyValue("Twitter description", THERAFOX_SITE_SEO.twitter.description);
addLine("- Notes:");
addLine();

const addPageSeo = (label, seo) => {
  addLine(`### ${label}`);
  addKeyValue("Title", seo.title);
  addKeyValue("Description", seo.description);
  addKeyValue("Canonical", seo.canonicalPath);
  addKeyValue("Open Graph title", seo.openGraph.title);
  addKeyValue("Open Graph description", seo.openGraph.description);
  addKeyValue("Open Graph image alt", seo.openGraph.imageAlt);
  addKeyValue("Twitter title", seo.twitter.title);
  addKeyValue("Twitter description", seo.twitter.description);
  addLine("- Notes:");
  addLine();
};

addPageSeo("Home", PAGE_SEO.home);
addPageSeo("Therapy", PAGE_SEO.therapy);
addPageSeo("About", PAGE_SEO.about);
addPageSeo("Contact", PAGE_SEO.contact);

addLine("### Intensive");
addKeyValue("Title", INTENSIVE_SEO.title);
addKeyValue("Description", INTENSIVE_SEO.description);
addKeyValue("Canonical", INTENSIVE_SEO.canonicalPath);
addKeyValue("Open Graph title", INTENSIVE_SEO.openGraph.title);
addKeyValue("Open Graph description", INTENSIVE_SEO.openGraph.description);
addKeyValue("Open Graph image alt", INTENSIVE_SEO.openGraph.imageAlt);
addKeyValue("Twitter title", INTENSIVE_SEO.twitter.title);
addKeyValue("Twitter description", INTENSIVE_SEO.twitter.description);
addLine("- Notes:");
addLine();

addLine("### Resources index");
addKeyValue("Title", RESOURCES_SEO.index.title);
addKeyValue("Description", RESOURCES_SEO.index.description);
addKeyValue("Canonical", RESOURCES_SEO.index.canonicalPath);
addKeyValue("Open Graph image alt", RESOURCES_SEO.index.openGraph.imageAlt);
addKeyValue("Twitter title", RESOURCES_SEO.index.twitter.title);
addKeyValue("Twitter description", RESOURCES_SEO.index.twitter.description);
addLine("- Notes:");
addLine();

addSection("Copy overview");
addLine();

addLine("### Navigation");
addKeyValue("Brand", SITE_COPY.nav.brand);
addKeyValue("Menu label", SITE_COPY.nav.menuLabel);
addList(
  "Links",
  SITE_COPY.nav.links.map((link) => `${link.label} (${link.href})`),
);
addLine("- Notes:");
addLine();

addLine("### Footer");
addKeyValue("Locations label", SITE_COPY.footer.locationsLabel);
addKeyValue("Locations text", SITE_COPY.footer.locationsText);
addKeyValue("Contact label", SITE_COPY.footer.contactLabel);
addKeyValue("Contact text", SITE_COPY.footer.contactText);
addKeyValue("Privacy label", SITE_COPY.footer.privacyLabel);
addKeyValue("Privacy text", SITE_COPY.footer.privacyText);
addKeyValue("CTA label", SITE_COPY.footer.ctaLabel);
addKeyValue("CTA href", SITE_COPY.footer.ctaHref);
addLine("- Notes:");
addLine();

addLine("### Home");
addKeyValue("Hero headline", SITE_COPY.home.heroHeadline);
addKeyValue("Hero subhead", SITE_COPY.home.heroSubhead);
addKeyValue("Hero media alt", SITE_COPY.home.heroMediaAlt);
addKeyValue("Ways title", SITE_COPY.home.waysTitle);
addKeyValue("Ways subtitle", SITE_COPY.home.waysSubtitle);
addList(
  "Ways cards",
  SITE_COPY.home.waysCards.map((card) => `${card.title} - ${card.description}`),
);
addKeyValue("Video title", SITE_COPY.home.videoTitle);
addKeyValue("Video description", SITE_COPY.home.videoDescription);
addKeyValue("Next step title", SITE_COPY.home.nextStepTitle);
addKeyValue("Next step body", SITE_COPY.home.nextStepBody);
addKeyValue("Next step link", SITE_COPY.home.nextStepLinkLabel);
addKeyValue("Resources title", SITE_COPY.home.resourcesTitle);
addKeyValue("Resources body", SITE_COPY.home.resourcesBody);
addKeyValue("Resources CTA label", SITE_COPY.home.resourcesCtaLabel);
addKeyValue("Intensive title", SITE_COPY.home.intensiveTitle);
addKeyValue("Intensive body", SITE_COPY.home.intensiveBody);
addKeyValue("Intensive CTA label", SITE_COPY.home.intensiveCtaLabel);
addLine("- Notes:");
addLine();

addLine("### Workshops");
addKeyValue("Hero headline", SITE_COPY.workshops.heroHeadline);
addKeyValue("Hero subhead", SITE_COPY.workshops.heroSubhead);
addKeyValue("Meta line", SITE_COPY.workshops.metaLine);
addKeyValue("Primary CTA label", SITE_COPY.workshops.primaryCtaLabel);
addKeyValue("Secondary CTA label", SITE_COPY.workshops.secondaryCtaLabel);
addKeyValue("What title", SITE_COPY.workshops.whatTitle);
addList("What bullets", SITE_COPY.workshops.whatBullets);
addKeyValue("What note", SITE_COPY.workshops.whatNote);
addKeyValue("Waitlist title", SITE_COPY.workshops.waitlistTitle);
addList("Waitlist body", SITE_COPY.workshops.waitlistBody);
addList("Waitlist steps", SITE_COPY.workshops.waitlistSteps);
addKeyValue("Waitlist note", SITE_COPY.workshops.waitlistNote);
addKeyValue("Upcoming title", SITE_COPY.workshops.upcomingTitle);
addKeyValue("Upcoming intro", SITE_COPY.workshops.upcomingIntro);
addKeyValue("Upcoming seat price line", SITE_COPY.workshops.upcomingSeatPriceLine);
addKeyValue("Upcoming date label", SITE_COPY.workshops.upcomingDateLabel);
addKeyValue("Upcoming time label", SITE_COPY.workshops.upcomingTimeLabel);
addKeyValue("Upcoming location label", SITE_COPY.workshops.upcomingLocationLabel);
addKeyValue("Upcoming CTA label", SITE_COPY.workshops.upcomingCtaLabel);
addKeyValue("Rotation title", SITE_COPY.workshops.rotationTitle);
addKeyValue("Rotation intro", SITE_COPY.workshops.rotationIntro);
addKeyValue("Topic CTA label", SITE_COPY.workshops.topicCtaLabel);
addKeyValue("Topic who it is for label", SITE_COPY.workshops.topicWhoItsForLabel);
addKeyValue("Topic takeaway label", SITE_COPY.workshops.topicTakeawayLabel);
addKeyValue("Intensives title", SITE_COPY.workshops.intensivesTitle);
addKeyValue("Intensives body", SITE_COPY.workshops.intensivesBody);
addKeyValue("Intensives CTA label", SITE_COPY.workshops.intensivesCtaLabel);
addKeyValue("FAQ title", SITE_COPY.workshops.faqTitle);
SITE_COPY.workshops.faqItems.forEach((item) => {
  addLine(`- FAQ question: ${item.question}`);
  addLine(`  - Answer: ${item.answer}`);
});
addKeyValue("Form title", SITE_COPY.workshops.formTitle);
addKeyValue("Form body", SITE_COPY.workshops.formBody);
addKeyValue("Form first name label", SITE_COPY.workshops.formFirstNameLabel);
addKeyValue("Form email label", SITE_COPY.workshops.formEmailLabel);
addKeyValue("Form topic label", SITE_COPY.workshops.formTopicLabel);
addKeyValue("Form seats label", SITE_COPY.workshops.formSeatsLabel);
addList("Form seats options", SITE_COPY.workshops.formSeatsOptions);
addKeyValue("Form timing label", SITE_COPY.workshops.formTimingLabel);
addList("Form timing options", SITE_COPY.workshops.formTimingOptions);
addKeyValue("Form time separator", SITE_COPY.workshops.formTimeSeparator);
addKeyValue("Form consent label", SITE_COPY.workshops.formConsentLabel);
addKeyValue("Form submit label", SITE_COPY.workshops.formSubmitLabel);
addKeyValue("Form success template", SITE_COPY.workshops.formSuccessTemplate);
addKeyValue("Form success fallback topic", SITE_COPY.workshops.formSuccessFallbackTopic);
addKeyValue("Form error message", SITE_COPY.workshops.formErrorMessage);
addKeyValue("Form spam message", SITE_COPY.workshops.formSpamMessage);
SITE_COPY.workshops.topics.forEach((topic) => {
  addLine(`- Topic title: ${topic.title}`);
  addLine(`  - Description: ${topic.shortDescription}`);
  addLine(`  - Outcomes: ${topic.outcomes.join(", ")}`);
  addLine(`  - Who it is for: ${topic.whoItsFor}`);
  addLine(`  - Takeaway: ${topic.takeaway}`);
  addLine(`  - Waitlist tag: ${topic.waitlistTag}`);
});
addLine("- Notes:");
addLine();

addLine("### Therapy");
addKeyValue("Setup title", SITE_COPY.therapy.setupTitle);
addKeyValue("Setup subhead", SITE_COPY.therapy.setupSubhead);
SITE_COPY.therapy.scrollSteps.forEach((step, index) => {
  addLine(`- Step ${index + 1} title: ${step.title}`);
  addLine(`  - Body: ${step.body}`);
  step.bullets.forEach((bullet) => addLine(`  - Bullet: ${bullet}`));
});
addKeyValue("FAQ title", SITE_COPY.therapy.faqTitle);
SITE_COPY.therapy.faqItems.forEach((item) => {
  addLine(`- FAQ question: ${item.question}`);
  addLine(`  - Answer: ${item.answer}`);
});
addKeyValue("Resources title", SITE_COPY.therapy.resourceTitle);
addKeyValue("Resources body", SITE_COPY.therapy.resourceBody);
addKeyValue("Resources CTA label", SITE_COPY.therapy.resourceCtaLabel);
addKeyValue("Intensive title", SITE_COPY.therapy.intensiveTitle);
addKeyValue("Intensive body", SITE_COPY.therapy.intensiveBody);
addKeyValue("Intensive CTA label", SITE_COPY.therapy.intensiveCtaLabel);
addLine("- Notes:");
addLine();

addLine("### About");
addKeyValue("Hero title", SITE_COPY.about.heroTitle);
addKeyValue("Name title", SITE_COPY.about.nameTitle);
addKeyValue("Hero subtitle", SITE_COPY.about.heroSubtitle);
addList("Credential items", SITE_COPY.about.credentialItems);
addKeyValue("What sex therapy is title", SITE_COPY.about.whatSexTherapyIsTitle);
addKeyValue("Body paragraph 1", SITE_COPY.about.bodyParagraphs[0]);
addKeyValue("Relationally trained title", SITE_COPY.about.relationallyTrainedTitle);
addList("Relationally trained bullets", SITE_COPY.about.relationallyTrainedBullets);
addKeyValue("Approach title", SITE_COPY.about.approachTitle);
addList("Approach paragraphs", SITE_COPY.about.approachParagraphs.filter(Boolean));
addList("Approach bullets", SITE_COPY.about.approachBullets);
addKeyValue("Systemic thinker title", SITE_COPY.about.systemicThinkerTitle);
addKeyValue("Systemic thinker body", SITE_COPY.about.systemicThinkerBody);
addKeyValue("Areas of interest title", SITE_COPY.about.areasOfInterestTitle);
addList("Areas of interest", SITE_COPY.about.areasOfInterest);
addKeyValue("Talking about sex title", SITE_COPY.about.talkingAboutSexTitle);
addKeyValue("Body paragraph 2", SITE_COPY.about.bodyParagraphs[1]);
addKeyValue("Portrait alt", SITE_COPY.about.portraitAlt);
addKeyValue("FAQ title", SITE_COPY.about.faqTitle);
SITE_COPY.about.faqItems.forEach((item) => {
  addLine(`- FAQ question: ${item.question}`);
  addLine(`  - Answer: ${item.answer}`);
});
addLine("- Notes:");
addLine();

addLine("### Contact");
addKeyValue("Hero title", SITE_COPY.contact.heroTitle);
addKeyValue("Hero subtitle", SITE_COPY.contact.heroSubtitle);
addKeyValue("Rates title", SITE_COPY.contact.rates.title);
addKeyValue("Rates subtitle", SITE_COPY.contact.rates.subtitle);
addList(
  "Rates cards",
  SITE_COPY.contact.rates.cards.map((card) => `${card.title} - ${card.price} - ${card.body}`),
);
addKeyValue("Contact intro", SITE_COPY.contact.contactIntro);
addKeyValue("Contact body", SITE_COPY.contact.contactBody || "");
addKeyValue("Contact details title", SITE_COPY.contact.contactDetailsTitle);
addList("Contact details", SITE_COPY.contact.contactDetails);
addKeyValue("Form title", SITE_COPY.contact.formTitle);
addKeyValue("Form name label", SITE_COPY.contact.formNameLabel);
addKeyValue("Form email label", SITE_COPY.contact.formEmailLabel);
addKeyValue("Form message label", SITE_COPY.contact.formMessageLabel);
addKeyValue("Name placeholder", SITE_COPY.contact.namePlaceholder);
addKeyValue("Email placeholder", SITE_COPY.contact.emailPlaceholder);
addKeyValue("Message placeholder", SITE_COPY.contact.messagePlaceholder);
addKeyValue("Submit label", SITE_COPY.contact.submitLabel);
addKeyValue("Submitting label", SITE_COPY.contact.submittingLabel);
addKeyValue("Success message", SITE_COPY.contact.successMessage);
addKeyValue("Error message", SITE_COPY.contact.errorMessage);
addKeyValue("Spam blocked message", SITE_COPY.contact.spamBlockedMessage);
addKeyValue("Form helper text", SITE_COPY.contact.formHelperText);
addKeyValue("Error title", SITE_COPY.contact.errorTitle);
addKeyValue("Error body", SITE_COPY.contact.errorBody);
addKeyValue("Error CTA label", SITE_COPY.contact.errorCtaLabel);
addKeyValue("Service area title", SITE_COPY.contact.serviceAreaTitle);
addKeyValue("Service area body", SITE_COPY.contact.serviceAreaBody);
addKeyValue("Hours title", SITE_COPY.contact.hoursTitle);
addList("Hours items", SITE_COPY.contact.hoursItems);
addKeyValue("FAQ title", SITE_COPY.contact.faqTitle);
SITE_COPY.contact.faqItems.forEach((item) => {
  addLine(`- FAQ question: ${item.question}`);
  addLine(`  - Answer: ${item.answer}`);
});
addLine("- Notes:");
addLine();

addLine("### Intensive");
const fortyEight = SITE_COPY.fortyEight;
addKeyValue("Hero heading", fortyEight.heroHeading);
addKeyValue("Hero media alt", fortyEight.heroMediaAlt);
addKeyValue("FAQ title", fortyEight.faqTitle);
addKeyValue("Sell title", fortyEight.sellTitle);
addKeyValue("Sell lead", fortyEight.sellLead);
addKeyValue("Sell body one", fortyEight.sellBodyOne);
addKeyValue("Sell body two", fortyEight.sellBodyTwo);
addKeyValue("Sell outcome", fortyEight.sellOutcome);
addKeyValue("Included title", fortyEight.includedTitle);
addKeyValue("Included badge label", fortyEight.includedBadgeLabel);
addList("Included items", fortyEight.includedItems);
addLine("- Notes:");
addLine();

addLine("### Resources");
addKeyValue("Index title", SITE_COPY.resources.indexTitle);
addKeyValue("Index summary", SITE_COPY.resources.indexSummary);
addKeyValue("Index note", SITE_COPY.resources.indexNote);
addKeyValue("Search label", SITE_COPY.resources.searchLabel);
addKeyValue("Search placeholder", SITE_COPY.resources.searchPlaceholder);
addKeyValue("Filter label", SITE_COPY.resources.filterLabel);
addKeyValue("Filter all label", SITE_COPY.resources.filterAllLabel);
addKeyValue("Results empty", SITE_COPY.resources.resultsEmpty);
addKeyValue("Related title", SITE_COPY.resources.relatedTitle);
addKeyValue("Citations title", SITE_COPY.resources.citationsTitle);
addKeyValue("Citation aria label", SITE_COPY.resources.citationAriaLabel);
addKeyValue("Key concepts title", SITE_COPY.resources.keyConceptsTitle);
addKeyValue("Worksheets title", SITE_COPY.resources.worksheetsTitle);
addKeyValue("Worksheet preview alt", SITE_COPY.resources.worksheetPreviewAlt);
addKeyValue("Worksheet format label", SITE_COPY.resources.worksheetFormatLabel);
addKeyValue("Worksheet CTA label", SITE_COPY.resources.worksheetCtaLabel);
addKeyValue("Worksheet tag label", SITE_COPY.resources.worksheetTagLabel);
addKeyValue("Citations label", SITE_COPY.resources.citationsLabel);
addLine("- Notes:");
addLine();

writeFileSync(outputPath, lines.join("\n"));

console.log(`Review export written to ${outputPath}`);
