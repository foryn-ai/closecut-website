// TEMPLATE CONTENT — For a new brand: replace string values in this file, do not restructure it.
// Object shape maps directly to page components and Payload CMS field defaults.
// Workflow: npm run copy:schema <section> → fill in Claude.ai with BRAND_BRIEF.md → npm run copy:apply <section>

import type { SiteCopyShape } from "@/lib/copy/types";

export const COPY_VERSION = "2026-02-01";

// Source of truth for all visible site copy.
// Keep page copy edits, alt text, and aria labels in this file and avoid adding copy resolver pipelines.
export const SITE_COPY = {
  nav: {
    brand: "Close Cut",
    menuLabel: "Menu",
    closeMenuLabel: "Close menu",
    mobileNavLabel: "Mobile navigation",
    links: [
      { href: "/press", label: "Press" },
      { href: "https://store.steampowered.com", label: "Steam" },
    ],
  },
  footer: {
    locationsLabel: "Platform",
    locationsText: "PC — Steam",
    contactLabel: "Press",
    contactText: "press@closecut.ai",
    privacyLabel: "Studio",
    privacyText: "Foryn AI",
    ctaLabel: "Wishlist on Steam",
    ctaHref: "https://store.steampowered.com",
  },
  playgroundFurniture: {
    title: "Furniture asset scratch page",
    subtitle:
      "Review cleaned filenames and suggested alt text. Share the file names you want placed on each page.",
    pathLabel: "Path",
    altLabel: "Suggested alt text",
    emptyLabel: "No furniture assets found.",
  },
  home: {
    heroHeadline: "Cultivate Connection",
    heroSubhead:
      "",
    heroMediaAlt: "Warm linen textures and natural light",
    connectionBandTitle: "Talk therapy for getting grounded in who you are and connected to who you love.",
    connectionBandBody: [
      "",
      "",
    ],
    waysTitle: "Ways to work together",
    waysSubtitle:
      "Individual, couples, and sex therapy grounded in pattern work and practical skills.",
    areasOfInterestTitle: "Topics commonly addressed in therapy",
    areasOfInterestIntro:
      "",
    areasOfInterestItems: [
      {
        id: "sexuality-and-intimacy",
        title: "Sexuality and intimacy",
        iconSrc: "/icons/flower-lotus.svg",
        description:
          "Steady support and education for the physical, emotional, psychological, and relational elements of sex.",
      },
      {
        id: "long-term-relationships",
        title: "Long term relationships",
        iconSrc: "/icons/users-three.svg",
        description:
          "Support for entrenched cycles. Slow the cycle down and build skills to strengthen your relationship.",
      },
      {
        id: "faith-and-identity",
        title: "Faith and identity shifts",
        iconSrc: "/icons/bridge.svg",
        description:
          "Care for faith transitions and mixed-faith dynamics while preserving personal values and relational clarity.",
      },
      {
        id: "parenthood-and-partnership",
        title: "Parenthood",
        iconSrc: "/icons/baby.svg",
        description:
          "Support through role strain, identity shifts, and life transitions.",
      },
      {
        id: "adhd-in-relationships",
        title: "ADHD in relationships",
        iconSrc: "/icons/brain.svg",
        description:
          "Support for relational patterns shaped by attention, overwhelm, and executive function strain.",
      },
      {
        id: "anxiety-and-stress",
        title: "Anxiety and stress",
        iconSrc: "/icons/wave-sawtooth.svg",
        description:
          "Support for stress cycles, nervous system overload, and steadier responses under pressure.",
      },
      {
        id: "non-monogamy",
        title: "Non-monogamy",
        iconSrc: "/icons/arrows-left-right.svg",
        description:
          "Support for agreements, boundaries, and transparency in open relationship structures.",
      },
      {
        id: "infidelity",
        title: "Infidelity",
        iconSrc: "/icons/heart-break.svg",
        description:
          "Support for stabilization, decision clarity, and structured rebuilding after breach of trust.",
      },
      {
        id: "differentiation",
        title: "Differentiation",
        iconSrc: "/icons/target.svg",
        description:
          "Support for staying connected without over-functioning, withdrawing, or losing self-definition.",
      },
    ],
    waysCards: [
      {
        title: "Intensives",
        href: "/intensive",
        iconSrc: "/icons/calendar-star.svg",
        iconAlt: "Calendar star icon",
        imageAlt: "Open calendar and a pencil on a desk",
        description:
          "A two day couples intensive catered to you. Join the waitlist to secure your private spot.",
      },
      {
        title: "Sex Therapy",
        href: "/therapy?service=sex-therapy#services",
        iconSrc: "/icons/hand-heart.svg",
        iconAlt: "Open hand and heart icon",
        imageAlt: "Soft linen textures and a notebook",
        description:
          "Holistic support for concerns related to sexuality and intimacy.",
      },
      {
        title: "Individual Therapy",
        href: "/therapy?service=individual#services",
        iconSrc: "/icons/book-open-text.svg",
        iconAlt: "Open book icon",
        imageAlt: "Individual therapy session notes on a table",
        description:
          "A place to sort through what is keeping you stuck and learn new ways of responding and being.",
      },
      {
        title: "Relational Therapy",
        href: "/therapy?service=relational#services",
        iconSrc: "/icons/chat-circle-text.svg",
        iconAlt: "Conversation icon",
        imageAlt: "Two chairs and a notebook in a calm room",
        description:
          "Great for relationships that need maintenance or improvement.",
      },
      {
        title: "Pre-commitment",
        href: "/therapy?service=pre-commitment#services",
        iconSrc: "/icons/calendar-check.svg",
        iconAlt: "Calendar check icon",
        imageAlt: "Two mugs and a journal on a wood table",
        description:
          "Sort through important topics before making important decisions.",
      },
    ],
    nextStepTitle: "Start here",
    nextStepBody:
      "A free 20 minute consult is a simple way to begin. Share what is bringing you in, and what you hope will feel different.",
    nextStepLinkLabel: "Book a consult",
    resourcesTitle: "Resources",
    resourcesBody:
      "Explore academic summaries and citations that support the work we do in sessions.",
    resourcesCtaLabel: "Explore resources",
    intensiveTitle: "Interested in an Intensive?",
    intensiveBody: "Join the waitlist for dates and availability.",
    intensiveCtaLabel: "Join the waitlist",
    videoTitle: "A quick introduction",
    videoDescription:
      "",
  },
  workshops: {
    heroHeadline: "In person workshops in small groups.",
    heroSubhead: "Join a topics-specific waitlist to access early dates.",
    heroFurnitureSrc: "/furniture/meeting-room.svg",
    heroFurnitureAlt: "Meeting room furniture illustration",
    metaLine: "8 seats • $95 per seat • 90 minutes • In person",
    primaryCtaLabel: "Join a workshop waitlist",
    secondaryCtaLabel: "Learn how the waitlist works",
    whatTitle: "What to expect",
    whatIconSrc: "/icons/list-checks.svg",
    whatBullets: [
      "A structured skill taught clearly",
      "Guided practice that stays private",
      "A take-home worksheet you can reuse",
      "Clear boundaries and a calm pace",
    ],
    whatNote: "These workshops are educational. They are not couples therapy.",
    waitlistTitle: "How the waitlist works",
    waitlistIconSrc: "/icons/queue.svg",
    waitlistBody: [
      "We release new workshop dates to waitlists first. This helps keep groups small and makes scheduling more predictable.",
      "Join the waitlist for the workshop you want. When a new date is announced, you will receive early access to reserve a seat.",
    ],
    waitlistSteps: [
      "Choose a workshop topic below and join that waitlist.",
      "When a date is released, we email that waitlist first.",
      "Seats are first come, first served. Capacity is 8.",
      "If the date does not work for you, stay on the list for the next release.",
    ],
    waitlistNote:
      "Joining a waitlist does not commit you to attend. It simply gives you early access.",
    upcomingTitle: "Upcoming dates",
    upcomingIconSrc: "/icons/calendar-blank.svg",
    upcomingIntro: "Seats are limited to 8. $95 per seat.",
    upcomingSeatPriceLine: "8 seats, $95 per seat",
    upcomingDateLabel: "Date",
    upcomingTimeLabel: "Time",
    upcomingLocationLabel: "Location",
    upcomingCtaLabel: "Reserve a seat",
    rotationTitle: "Choose a workshop topic",
    rotationIconSrc: "/icons/compass-rose.svg",
    rotationIntro:
      "Join the waitlist for the topic you want. We will email you when the next date is released.",
    topicCtaLabel: "Join waitlist for this workshop",
    topicWhoItsForLabel: "Who it is for:",
    topicTakeawayLabel: "You will leave with:",
    intensivesTitle: "Workshops and Intensives",
    intensivesIconSrc: "/icons/compass-tool.svg",
    intensivesBody:
      "Workshops teach the tools. Intensives apply them to your specific pattern with private support. If you leave a workshop thinking, we need help putting this into practice, an Intensive may be the right next step.",
    intensivesCtaLabel: "Join the Intensives waitlist",
    faqTitle: "FAQ",
    faqIconSrc: "/icons/chat-circle-dots.svg",
    faqItems: [
      {
        question: "How does the waitlist work?",
        answer:
          "You join the waitlist for a specific workshop topic. When a new date is released, that waitlist gets early access to reserve seats.",
      },
      {
        question: "Does joining the waitlist commit me to attend?",
        answer: "No. It only gives you early access when dates are announced.",
      },
      {
        question: "Can I join more than one waitlist?",
        answer: "Yes. Choose the topics that fit you.",
      },
      {
        question: "Is this therapy?",
        answer:
          "No. Workshops are educational and skills-focused. If you want therapy, we can suggest next steps.",
      },
      {
        question: "Is it recorded?",
        answer: "No recordings.",
      },
      {
        question: "Do we have to share personal details?",
        answer: "No. Practice is guided, but you can keep your work private.",
      },
      {
        question: "Can I come alone?",
        answer: "Yes. Many skills apply whether you attend solo or with a partner.",
      },
      {
        question: "What is the cancellation policy?",
        answer:
          "Transfers up to 48 hours before start time. Inside 48 hours, transfers are not guaranteed.",
      },
    ],
    formTitle: "Join the waitlist",
    formIconSrc: "/icons/megaphone-simple.svg",
    formBody: "Select a workshop topic. We will email you when the next date is released.",
    formFirstNameLabel: "First name",
    formEmailLabel: "Email",
    formTopicLabel: "Workshop topic",
    formSeatsLabel: "Seats interested",
    formSeatsOptions: ["1", "2"],
    formTimingLabel: "Preferred timing",
    formTimingOptions: ["Weeknight", "Weekend", "Either"],
    formTimeSeparator: "to",
    formConsentLabel: "I understand this is psychoeducation, not therapy.",
    formSubmitLabel: "Join waitlist",
    formSuccessTemplate:
      "You are on the waitlist for {topic}. Watch for early access when the next date is released.",
    formSuccessFallbackTopic: "this workshop",
    formErrorMessage: "Something went wrong. Please try again.",
    formSpamMessage: "Request blocked. Please wait a moment, then try again.",
    topics: [
      {
        id: "repair-after-conflict",
        title: "Repair After Conflict",
        iconSrc: "/icons/hand-fist.svg",
        shortDescription: "Learn a short repair sequence for arguments that repeat.",
        outcomes: [
          "Spot escalation early",
          "Pause the spiral with a simple reset",
          "Use a repair script that lowers defensiveness",
        ],
        whoItsFor: "Couples who feel stuck in recurring fights.",
        takeaway: "A one-page repair script and practice plan.",
        waitlistTag: "repair-after-conflict",
      },
      {
        id: "repeating-pattern",
        title: "The Repeating Pattern",
        iconSrc: "/icons/arrows-clockwise.svg",
        shortDescription: "Name the loop and change the next move.",
        outcomes: [
          "Identify the trigger and the cycle",
          "Choose a different next step",
          "Build a weekly check-in that stays calm",
        ],
        whoItsFor: "Couples who keep having the same argument.",
        takeaway: "A pattern map worksheet you can reuse.",
        waitlistTag: "repeating-pattern",
      },
      {
        id: "intimacy-conversations",
        title: "Intimacy Conversations That Stay Steady",
        iconSrc: "/icons/flower-lotus.svg",
        iconAlt: "Lotus flower icon",
        shortDescription:
          "A structured way to talk about desire, mismatch, and consent with less shame.",
        outcomes: [
          "Use a clear conversation structure",
          "Reduce blame and guessing",
          "Set pacing that keeps the conversation steady",
        ],
        whoItsFor: "Couples who avoid intimacy topics or get stuck fast.",
        takeaway: "A guided worksheet and conversation prompts.",
        waitlistTag: "intimacy-conversations",
      },
    ],
    upcomingDates: [],
  },
  therapy: {
    heroIconSrc: "/icons/user-circle-check.svg",
    heroFurnitureSrc: "/furniture/couch-elevation-color.png",
    heroFurnitureAlt: "Couch furniture illustration",
    setupTitle: "Therapy Services",
    setupSubhead:
      "I help you slow things down, name the pattern, and practice the skills that change it. Sex and intimacy are welcome topics when they matter.",
    servicesTitle: "Choose a service",
    howItWorksTitle: "How it works",
    servicePickerLabel: "Service options",
    serviceImageLabel: "Service image placeholder",
    services: [
      {
        id: "intensive",
        tabLabel: "Intensive",
        title: "Intensive",
        paragraphs: [
          "Intensive is a private two day container for couples who need more space than a weekly format. The structure combines expert-held sessions with planned on-your-own time so you can do focused work without rushing.",
          "We use a clear agenda, practical next steps, and a pace that supports real decisions and follow-through after the weekend.",
        ],
        goodFit:
          "Good fit when weekly sessions feel too slow and you want structured momentum in a short timeframe.",
      },
      {
        id: "sex-therapy",
        tabLabel: "Sex Therapy",
        title: "Sex therapy",
        paragraphs: [
          "The topic of sex is welcome here. We often start with reviewing your history and naming what matters currently.  I support clients in identifying and living into their values while maintaining curiosity. We practice the language of consent, knowing one's own capacity, how to foster or manage desire, and untangle messy myths and messaging about sexuality.",
          "",
        ],
        goodFit:
          "Good fit for desire concerns, sexual dysfunction questions, missing connection, compulsive sexual behavior concerns, and the intersection of parenthood and sexuality.",
      },
      {
        id: "individual",
        tabLabel: "Individual",
        title: "Individual therapy",
        paragraphs: [
          "Individual therapy is a collaborative process that helps you understand your patterns, your stress responses, and how your experiences and relationships have shaped the way you move through the world. We look at how current challenges make sense in the context of your history, and how those patterns can be updated as your life and circumstances change.",
          "Our work integrates practical tools to shift unhelpful thought and behavior patterns, build emotional and nervous system regulation skills, and increase resilience in daily life. Therapy is also a space to process grief and loss, strengthen self-trust, and deepen your understanding of yourself and your relationships. The goal is not to “fix” you, but to help you feel more grounded, clear, and capable of navigating your life with greater choice and confidence.",
        ],
        goodFit:
          "Good fit for anxiety, stress, transitions, identity shifts, burnout, and patterns that keep returning.",
      },
      {
        id: "relational",
        tabLabel: "Relational",
        title: "Relational therapy",
        paragraphs: [
          "Relational therapy focuses on strengthening relationships by starting with personal accountability: how you regulate yourself, understand your own thoughts and emotions, and take responsibility for what you bring into connection. Before communication can truly work, we build the skills to notice stress responses, calm the nervous system, and get clear about what you feel, what you want, and what matters to you.",
          "From there, therapy helps you learn how to express yourself more honestly and effectively, and to listen in a way that actually allows your partner or loved ones to feel heard. We work on reducing reactivity, increasing emotional clarity, and practicing conversations that build understanding rather than defensiveness.",
          "Lasting repair and deeper intimacy don’t come from winning arguments or avoiding conflict, they come from learning how to stay regulated, speaking with clarity, and listening with care. This work creates the foundation for trust, emotional safety, and more meaningful, resilient connection.",
        ],
        goodFit:
          "Good fit for partners, co-parents, and other important relationships that need care, clarity, or a shift.",
      },
      {
        id: "pre-commitment",
        tabLabel: "Pre-commitment",
        title: "Pre-commitment therapy",
        paragraphs: [
          "Make clear agreements before you commit. We name values, expectations, and strategies for decision making so you can move forward with clarity. While a list of topics is presented, we focus only on the areas that need growth or clarity.",
          "",
        ],
        goodFit:
          "Good fit if you want fewer assumptions, clearer expectations, and a steadier foundation for the next step.",
      },
    ],
    scrollSteps: [
      {
        iconSrc: "/icons/user-circle.svg",
        title: "Step 1: Book a free 20 minute consult",
        body:
          "The consult is a simple way to confirm fit.  Expect to share a bit about the support you are looking for.",
        bullets: [
          "Free 20 minute consultation",
          "Review goals and fit",
          "Clear recommendation for next step",
        ],
      },
      {
        iconSrc: "/icons/path.svg",
        title: "Step 2: Complete setup and attend session one",
        body:
          "After the consult, you book your first appointment and complete paperwork in the SimplePractice private portal. Session one covers intake details, reviews confidentiality, general policies, and your priorities.",
        bullets: [
          "Paperwork and billing in private portal",
          "In person or telehealth sessions",
          "55 minute session length",
        ],
      },
      {
        iconSrc: "/icons/users-three.svg",
        title: "Step 3: Choose a format that fits your life",
        body:
          "Some people build momentum through a steady therapy cadence. Others choose a two day Intensive when weekly sessions are not enough space, or when scheduling is difficult.",
        bullets: [
          "Skills practice and tools in session",
          "Option: steady session cadence to build momentum",
          "Option: two day Intensive for focused time and structure",
        ],
      },
      {
        iconSrc: "/icons/map-pin-line.svg",
        title: "Step 4: Review progress and decide what is next",
        body:
          "We revisit goals and adjust as your needs change. Therapy may conclude when your goals are met, continue as ongoing support, or shift into a two day Intensive for a focused reset and a clear plan.",
        bullets: [
          "Goal based review process",
          "Flexible endpoint",
          "Option: Intensive for focused work and planning",
        ],
      },
    ],
    faqIconSrc: "/icons/question-mark.svg",
    faqTitle: "Therapy FAQs",
    faqItems: [
      {
        question: "Do you work with individuals and couples?",
        answer:
          "Yes. I work with individuals and couples. If you are not sure which format fits, we can talk it through in a free 20 minute consult.",
      },
      {
        question: "What is the first session like?",
        answer:
          "We start with what is happening now and what has been repeating. I listen for the pattern, ask focused questions, and help you name what matters most. Before you leave, we choose one clear next step to practice.",
      },
      {
        question: "Do you offer sex therapy?",
        answer:
          "Yes. Sex is welcome here. You do not need a perfect reason to bring it up. If it affects connection, self trust, or communication, it belongs in the room.",
      },
      {
        question: "How long do people usually come for?",
        answer:
          "It depends on what you are working on and how much support you want. Some people come for a short stretch to stabilize a pattern. Others stay longer to build and maintain new habits. We will check in as we go.",
      },
    ],
    resourceIconSrc: "/icons/bookmarks.svg",
    resourceTitle: "Related resources",
    resourceBody:
      "Review academic summaries and citations to go deeper on the ideas we work with in sessions.",
    resourceCtaLabel: "Explore resources",
    intensiveIconSrc: "/icons/hourglass-high.svg",
    intensiveTitle: "Considering Intensive?",
    intensiveBody:
      "If weekly sessions feel too slow, the Intensive offers a two day container with deliberate pacing and a clear take home plan.",
    intensiveCtaLabel: "View Intensive",
  },
  about: {
    heroIconSrc: "/icons/identification-badge.svg",
    heroFurnitureSrc: "/furniture/flower-vase.svg",
    heroFurnitureAlt: "Flower vase furniture illustration",
    heroTitle: "Individual, Relational Therapy for Adults",
    nameTitle: "Anastasia Fox, LMFT, CST",
    heroSubtitle: "Individual, relational, and sex therapy for adults.",
    credentialResumeTitle: "Credentials",
    credentialResumeSections: [
      {
        heading: "Licensure and certification",
        items: [
          "Licensed Marriage and Family Therapist (LMFT)",
          "AASECT Certified Sex Therapist (CST)",
          "Advanced Developmental Model training",
        ],
      },
      {
        heading: "Education and training",
        items: [
          "MA, Couples and Family Therapy, Antioch University Seattle",
          "BA, Sociology, San Francisco State University",
        ],
      },
      {
        heading: "Professional membership",
        items: [
          "American Association of Sexuality Educators, Counselors and Therapists (AASECT)",
          "American Association for Marriage and Family Therapy (AAMFT)",
          "Washington Association for Marriage and Family Therapy (WAMFT)",
          "Mormon Mental Health Association (MMHA)",
        ],
      },
    ],
    modalitiesBandTitle: "Modalities/ Approaches",
    modalitiesBandIntro:
      "Explore the approaches I draw from. Hover or tap each card to view details.",
    modalities: [
      {
        id: "developmental-model",
        title: "Developmental Model",
        iconSrc: "/icons/tree-structure.svg",
        description:
          "The Developmental Model views relationships as evolving through stages, focusing on increasing differentiation and mature connection rather than treating pathology. It combines attachment theory, differentiation, and neuroscience to support facing challenges, improving communication, and building resilient relationships for the long-haul.",
      },
      {
        id: "attachment-theory",
        title: "Attachment Theory",
        iconSrc: "/icons/link-simple.svg",
        description:
          "Attachment Theory describes how early relationships shape our expectations for closeness, safety and trust. These patterns carry into adulthood, influencing how we handle intimacy, conflict and separation. Attachment is not a fixed trait, attachment patterns can change over time.",
      },
      {
        id: "cbt",
        title: "Cognitive Behavioral (CBT)",
        iconSrc: "/icons/path.svg",
        description:
          "Cognitive Behavioral (CBT) is a skills based approach focusing on the connection between thoughts, emotions, and behaviors. Learn to identify unhelpful thinking patterns often present in anxiety and depression and adopt new ways to approach stress and life.",
      },
      {
        id: "narrative-therapy",
        title: "Narrative Therapy",
        iconSrc: "/icons/book-open-text.svg",
        description:
          "Narrative Therapy focuses on the stories people tell about themselves, others, and their lives. It examines where stories came from and supports expanding narratives to create more agency, meaning and possibility.",
      },
      {
        id: "polyvagal-theory",
        title: "Polyvagal Theory",
        iconSrc: "/icons/wave-sawtooth.svg",
        description:
          "Polyvagal Theory helps us understand how our nervous system shapes our sense of safety, connection and threat. We learn to identify nervous system states and gain skills to regulate in order to feel safer in your body, think more clearly, and respond rather than react in stressful situations.",
      },
      {
        id: "gottman-method",
        title: "Gottman Method for Couples Therapy",
        iconSrc: "/icons/users-three.svg",
        description:
          "Gottman Method for Couples Therapy focuses on strengthening friendship, increasing positive affect, reducing destructive patterns, and building skills of repair.",
      },
      {
        id: "structural-family-therapy",
        title: "Structural Family Therapy",
        iconSrc: "/icons/tree-view.svg",
        description:
          "Structural Family Therapy addresses family dysfunction by restructuring unhealthy family dynamics, boundaries, and hierarchies.",
      },
      {
        id: "solution-focused-therapy",
        title: "Solution Focused Therapy",
        iconSrc: "/icons/target.svg",
        description:
          "Solution Focused Therapy focuses on what is working instead of analyzing a problem. It helps people identify strengths, notice small changes, and build practical steps toward their goal.",
      },
      {
        id: "plissit-model",
        title: "PLISSIT Model",
        iconSrc: "/icons/list-checks.svg",
        description:
          "The PLISSIT Model offers a framework to offer the least intrusive and appropriate levels of support for sex therapy, starting with gaining permission, then offering limited information, giving specific suggestions, and then intensive therapy.",
      },
    ],
    goodFitTitle: "A Good Fit",
    goodFitBody:
      "Research indicates that the relationship, or therapeutic alliance between therapist and client is essential for positive outcomes. While part of being a good fit can not be expressed on paper, here are some ways I have been described.",
    goodFitDescriptors: [
      "Warm",
      "Authentic",
      "Caring",
      "Steady",
      "Confident",
      "Creative",
      "Collaborative",
      "Safe",
      "Insightful",
    ],
    logoAssets: [
      { src: "/about/AASECT.png", alt: "AASECT logo" },
      { src: "/about/aamft.png", alt: "AAMFT logo" },
      { src: "/about/antioch.jpg", alt: "Antioch University logo" },
      { src: "/about/mmha.png", alt: "MMHA logo" },
      { src: "/about/sfsu.png", alt: "San Francisco State University logo" },
      { src: "/about/wamft.png", alt: "WAMFT logo" },
    ],
    whatSexTherapyIsIconSrc: "/icons/book-user.svg",
    whatSexTherapyIsTitle: "Sex Therapist?",
    relationallyTrainedIconSrc: "/icons/link-simple.svg",
    relationallyTrainedTitle: "Relationally trained",
    relationallyTrainedBullets: [
      "I pay attention to what happens between people, not just within.",
      "I help you get closer to your values and closer to the people you love.",
      "I believe sexuality is part of being human.",
    ],
    approachIconSrc: "/icons/pencil-line.svg",
    approachTitle: "How I work",
    approachParagraphs: [
      "I aim to work in a supportive and nonjudgmental way, to understand what matters to you and identify what feels stuck.",
      "This includes attentive listening, providing psycho-education where useful, and using a whiteboard to map what is happening. You know yourself and your circumstances best. Together, we name what can change, help you practice new responses, and offer homework when it supports momentum.",
    ],
    approachBullets: [
      "Collaborative, structured sessions",
      "In-session, experiential practice and clear takeaways",
      "Homework when it supports momentum",
    ],
    systemicThinkerIconSrc: "/icons/tree-structure.svg",
    systemicThinkerTitle: "Systemic thinker",
    systemicThinkerBody:
      "I consider your immediate concerns through an anti-racist and anti-oppressive lens. This means naming and considering the way race, gender, sexual orientation, socio-economics, family dynamics, culture, generational and relational stressors impact you. We name power imbalances in and out of the room.",
    areasOfInterestIconSrc: "/icons/grid-four.svg",
    areasOfInterestTitle: "Areas of interest",
    areasOfInterest: [
      "Sexuality",
      "Long term relationships",
      "Communication in relationships",
      "Body acceptance",
      "Post-partum",
      "Faith transitions",
      "Mixed faith relationships",
      "Political ideology divides",
      "LGBTQIA+ support",
      "Dating",
      "Ethical non-monogamy",
      "Infidelity",
      "Pre-commitment counseling",
      "Parent/child relationships",
      "Religious shame and trauma",
    ],
    portraitAlt: "Portrait of Anastasia Fox",
    talkingAboutSexIconSrc: "/icons/chat-teardrop-text.svg",
    talkingAboutSexTitle: "Body Positive and Sex Positive Approach",
    bodyParagraphs: [
      "The topic of sex is always welcome, even if you are not here specifically for a sexually related concern. If the topic of sex and intimacy impacts your relationship, your sense of self, or your ability to communicate, it belongs in the room.",
      "As a trained sex therapist, I believe sexuality is inherently part of the human experience. An individual’s sexual template begins in childhood and is affected by how they are physically cared for, their relationship to their body, and their experiences with physical touch and bodily autonomy. This template expands as people mature and gain more experience. My approach to the subject is slow, collaborative and follows the PLISSIT model that provides a structured and sensitive approach.",
      "My work is relational and systemic. I pay attention to what happens between people, and I keep bringing the focus back to you, your attention, your choices, and your communication.",
    ],
    faqIconSrc: "/icons/seal-question.svg",
    faqTitle: "About FAQs",
    faqItems: [
      {
        question: "What is a CST?",
        answer:
          "CST stands for Certified Sex Therapist through AASECT. It means I have advanced training and supervised experience focused on sexuality, intimacy, and relationship dynamics.",
      },
      {
        question: "Do I need a specific reason to bring up sex?",
        answer:
          "No. Sex is welcome here. If it impacts your relationship, your sense of self, or your ability to communicate, it belongs in the room.",
      },
      {
        question: "Is sex therapy only for couples?",
        answer:
          "No. I work with individuals and couples. We focus on what you want to understand, change, or practice, at a pace that feels steady.",
      },
      {
        question: "What is your approach like in session?",
        answer:
          "I am collaborative and structured. That might look like listening and validating, using research and resources, or using a whiteboard to map the pattern. I try to make sure you leave with clear takeaways and a next step you can actually use.",
      },
      {
        question: "Do you work with faith transitions and mixed faith relationships?",
        answer:
          "Yes. I work with clients navigating faith transitions, mixed faith relationships, and the impact those changes can have on intimacy, identity, and communication.",
      },
      {
        question: "Do you work with LGBTQIA+ clients?",
        answer:
          "Yes. I aim to be inclusive and nonjudgmental. If you have questions about fit or what support might look like, we can talk about it in a free 20 minute consult.",
      },
    ],
  },
  contact: {
    heroIconSrc: "/icons/phone.svg",
    heroFurnitureSrc: "/furniture/book-case-elevation-color.png",
    heroFurnitureAlt: "Bookcase furniture illustration",
    heroTitle: "Request availability",
    heroSubtitle:
      "If you are not sure where to start, that is ok. Share a sentence or two about what is bringing you in, and I will take it from there.",
    locationPhotos: [
      { src: "/images/office.jpg", alt: "Therafox office interior" },
      { src: "/images/building.jpg", alt: "Therafox building exterior" },
      { src: "/images/parking_lot.jpg", alt: "Parking lot near the office" },
      { src: "/images/waiting_room.jpg", alt: "Therafox waiting room" },
    ],
    contactIntro:
      "A free 20 minute consult is a simple way to begin. We will talk fit, availability, and next steps.",
    contactBody:
      "You can also call 425-961-9767.",
    contactDetails: [
      "Start with a free 20 minute consult",
      "Office visits in Issaquah, Washington",
      "Telehealth across Washington and Utah",
      "Leave with a clear next step",
    ],
    contactDetailsTitle: "Contact details",
    formTitle: "Request availability",
    formNameLabel: "Name",
    namePlaceholder: "Name",
    formEmailLabel: "Email",
    emailPlaceholder: "Email",
    formMessageLabel: "Message",
    messagePlaceholder: "What brings you in?",
    formHelperText:
      "",
    submitLabel: "Send request",
    submittingLabel: "Sending request",
    successMessage: "Thanks. Your request is in and you can expect a reply soon.",
    errorMessage: "Something went wrong. Please try again in a minute.",
    spamBlockedMessage: "Request blocked. Please wait a moment, then try again.",
    errorTitle: "Something went wrong",
    errorBody: "Please try again. If it keeps happening, email or call and I will take it from there.",
    errorCtaLabel: "Try again",
    faqIconSrc: "/icons/question.svg",
    faqTitle: "Contact FAQs",
    faqItems: [
      {
        question: "What should I write in the message box?",
        answer:
          "A sentence or two is enough. Share what is bringing you in and what you hope will feel different. You do not need to include sensitive details.",
      },
      {
        question: "How does the free 20 minute consult work?",
        answer:
          "It is a brief call to talk fit, availability, and next steps. I will ask what is bringing you in, what matters most right now, and what kind of support you are looking for.",
      },
      {
        question: "Do you meet in person or online?",
        answer:
          "Both. I offer office visits in Issaquah, Washington, and telehealth across Washington and Utah.",
      },
      {
        question: "Do you take insurance?",
        answer:
          "I am an out of network provider. I provide superbills that you can submit for possible reimbursement, depending on your plan.",
      },
    ],
    serviceAreaTitle: "Service area",
    serviceAreaBody:
      "Office visits in Issaquah, Washington. Telehealth across Washington and Utah.",
    serviceAreaIconSrc: "/icons/map-pin.svg",
    hoursTitle: "Hours",
    hoursIconSrc: "/icons/clock-clockwise.svg",
    hoursItems: [
      "Tuesday 9am to 2pm",
      "Wednesday 11am to 7pm",
      "Thursday 12pm to 8pm",
      "Friday 9am to 4pm",
    ],
    contactDetailsIconSrc: "/icons/phone.svg",
    formIconSrc: "/icons/envelope.svg",
  },
  billing: {
    heroIconSrc: "/icons/currency-circle-dollar.svg",
    heroFurnitureSrc: "/furniture/mini-aloe-vera.svg",
    heroFurnitureAlt: "Aloe plant furniture illustration",
    heroTitle: "Payment Policy",
    heroSubtitle:
      "Payment is due at the time of each session. I do not bill insurance companies directly.",
    primaryCtaLabel: "Book a consult",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "Ask a billing question",
    secondaryCtaHref: "/contact",
    ratesIconSrc: "/icons/currency-circle-dollar.svg",
    rates: {
      title: "Rates",
      subtitle:
        "I am an out-of-network provider that provides superbills for reimbursement.",
      cards: [
        {
          price: "$175 / 55 MINUTES",
          title: "Individual Sessions",
          body:
            "Individual sessions are a great way to learn more about yourself, to unload, to gain clarity and insight, and to grow. Together we can explore the past, focus on current concerns, and ultimately build a better future.",
        },
        {
          price: "$200 / 55 MINUTES",
          title: "Relational Sessions",
          body:
            "Relational sessions are great for relationships that need maintenance or improvement. This includes partners, parent/child relationships, or any important relationship in your life. Together we can determine where you might get stuck or need a shift in order to have a healthy and connected relationship.",
        },
      ],
    },
    paymentPolicyTitle: "Payment Policy",
    paymentPolicyParagraphs: [
      "Payment is due at the time of each session. I do not bill insurance companies directly. Clients are responsible for the full session fee when services are provided.",
      "If you would like to seek reimbursement from your insurance provider, I can provide a superbill that you may submit to your insurance company.",
    ],
    superbillSectionTitle: "What Is a Superbill?",
    superbillSectionBody:
      "A superbill is a detailed receipt used to request reimbursement from your insurance provider for out-of-network therapy services.",
    superbillItems: [
      "Client name and date of birth",
      "Provider name, credentials, and practice information",
      "National Provider Identifier (NPI)",
      "Tax ID number",
      "Date(s) of service",
      "CPT billing code (type of service)",
      "ICD-10 diagnosis code",
      "Fee paid for services",
    ],
    superbillSectionNote:
      "You can submit this document directly to your insurance company according to their claim submission process.",
    outOfNetworkTitle: "Checking Your Out-of-Network Benefits",
    outOfNetworkIntro:
      "If you plan to request reimbursement, it may be helpful to contact your insurance company before beginning therapy.",
    outOfNetworkPrompt: "You may want to ask:",
    outOfNetworkQuestions: [
      "Do I have out-of-network mental health benefits?",
      "What is my out-of-network deductible?",
      "What percentage of the session fee is reimbursed after the deductible is met?",
      "Are there limits on the number of therapy sessions per year?",
      "How do I submit superbills for reimbursement?",
    ],
    outOfNetworkNote:
      "Reimbursement varies depending on your insurance plan and may occur only after your deductible has been met.",
    cptTitle: "Common Psychotherapy Billing Codes (CPT)",
    cptCodes: [
      {
        code: "90791",
        service: "Initial diagnostic evaluation",
      },
      {
        code: "90834",
        service: "Individual psychotherapy (38-52 minutes)",
      },
      {
        code: "90837",
        service: "Individual psychotherapy (53+ minutes)",
      },
      {
        code: "90847",
        service: "Family or couples therapy (with client present)",
      },
      {
        code: "90846",
        service: "Family therapy (without client present)",
      },
    ],
    cptNote:
      "Please note that insurance coverage for couples therapy varies, and some plans may not reimburse for relational treatment.",
    diagnosisRequirementTitle: "Diagnosis Requirement",
    diagnosisRequirementParagraphs: [
      "Insurance companies typically require a mental health diagnosis (ICD-10 code) to process reimbursement claims.",
      "The diagnosis used is based on clinical assessment and treatment needs.",
    ],
    diagnosisExamplesTitle:
      "Examples of diagnoses commonly used in outpatient psychotherapy include:",
    diagnosisExamples: [
      "F41.1 - Generalized Anxiety Disorder",
      "F32.9 - Major Depressive Disorder, Unspecified",
      "F43.23 - Adjustment Disorder with Mixed Anxiety and Depressed Mood",
    ],
    importantNotesTitle: "Important Notes",
    importantNotes: [
      "Reimbursement is not guaranteed and depends on your individual insurance plan.",
      "Clients are responsible for submitting superbills and communicating with their insurance provider.",
      "Payment for services remains the client's responsibility regardless of reimbursement.",
    ],
    consultationTitle: "Consultation",
    consultationBody:
      "If you have questions about fees, superbills, or insurance reimbursement, we can discuss these details further during your consultation.",
    privatePayTitle: "Private pay at Therafox",
    privatePayParagraphs: [
      "I do not bill insurance directly. Payment is private pay.",
      "Many clients choose private pay because it is simple and it keeps therapy decisions between us. If you want to use out-of-network benefits, a superbill can support that process.",
    ],
    superbillsTitle: "Superbills and reimbursement",
    superbillsBody:
      "A superbill is an itemized receipt that you can submit to your insurance company for possible reimbursement. Reimbursement is determined by your plan, not by my office.",
    howItWorksTitle: "How it works",
    howItWorksSteps: [
      "You pay privately for sessions.",
      "I provide a superbill for your records.",
      "You submit it to your insurance company.",
      "Your plan decides whether, and how much, to reimburse.",
    ],
    howItWorksNote:
      "If you want to check your benefits in advance, ask your insurance company about out-of-network mental health reimbursement and whether your plan requires a diagnosis code to process claims.",
    diagnosisTitle: "Diagnosis",
    diagnosisParagraphs: [
      "A diagnosis is not required for care at Therafox.",
      "If you plan to submit superbills to insurance, your plan may require a diagnosis code to consider reimbursement. If you want to use out-of-network benefits, I can talk with you about diagnosis, what it means, and what feels right for you.",
    ],
    beforeStartTitle: "What to expect before you start",
    beforeStartBody:
      "Before the first session, you will receive clear paperwork about fees, payment, and policies so there are no surprises. If you have questions, ask. I want the logistics to feel steady and straightforward.",
    faqTitle: "Billing FAQ",
    faqIconSrc: "/icons/question.svg",
    faqItems: [],
    closingCtaTitle: "Consultation",
    closingCtaBody:
      "If you have questions about fees, superbills, or insurance reimbursement, we can discuss these details further during your consultation.",
    closingCtaLabel: "Book a consult",
    closingCtaHref: "/contact",
  },
  resources: {
    indexIconSrc: "/icons/book-bookmark.svg",
    indexHeroFurnitureSrc: "/furniture/books.svg",
    indexHeroFurnitureAlt: "Stack of books illustration",
    indexTitle: "Academic Resource Library",
    indexSummary: "Brief overviews, key concepts, and citations. Worksheets are optional learning aids.",
    indexNote: "Educational content. Not a substitute for professional care.",
    librarySwitchLabel: "Library version",
    libraryV2Label: "V2 Support + Books",
    libraryV1Label: "V1 Academic Index",
    v1Title: "Academic Resource Library",
    v1Summary: "Brief overviews, key concepts, and citations. Worksheets are optional learning aids.",
    v2Title: "Resource Library",
    v2Summary:
      "A practical library with emergency support links and book recommendations organized by the current topic set.",
    emergencyTitle: "Mental Health Emergency Support",
    emergencyIntro:
      "If there is immediate risk, use urgent support first. These links are for crisis support, not ongoing therapy.",
    emergencyCards: [
      {
        title: "Immediate danger",
        description: "Call 911 right now if someone is in immediate danger or needs emergency medical help.",
        ctaLabel: "Call 911",
        ctaHref: "tel:911",
      },
      {
        title: "Suicide and Crisis Lifeline",
        description: "Call or text 988 for 24/7 confidential crisis support in the United States.",
        ctaLabel: "Call or text 988",
        ctaHref: "https://988lifeline.org/",
      },
      {
        title: "Crisis Text Line",
        description: "Text HOME to 741741 to connect with a live crisis counselor.",
        ctaLabel: "Open Crisis Text Line",
        ctaHref: "https://www.crisistextline.org/",
      },
      {
        title: "Crisis Connections",
        description:
          "Call (866) 427-4747, or call (206) 461-3222 for King County support.",
        ctaLabel: "Call Crisis Connections",
        ctaHref: "tel:+18664274747",
      },
      {
        title: "National Suicide Prevention Lifeline",
        description: "Call 1 (800) 273-8255. TRS: 1 (800) 799-4889.",
        ctaLabel: "Call National Lifeline",
        ctaHref: "tel:+18002738255",
      },
      {
        title: "Washington State Recovery Help Line",
        description: "Call 1-866-789-1511 for 24/7 support.",
        ctaLabel: "Call Recovery Help Line",
        ctaHref: "tel:+18667891511",
      },
    ],
    booksTitle: "Book Recommendations",
    booksIntro:
      "Curated by clinician relevance. Use tags to filter by relational focus. Books without clear hooks are excluded.",
    booksTagLabel: "Book tag filters",
    booksFilterAllLabel: "All",
    booksPriorityLabel: "Priority",
    booksFeaturedTitle: "Featured books",
    booksFeaturedIntro: "A quick start list for common client questions.",
    booksFeaturedIds: [
      "leaving-the-fold",
      "what-my-bones-know",
      "the-science-of-trust",
      "come-together",
      "state-of-affairs",
      "polysecure",
    ],
    booksEmptyLabel: "No books match this tag yet.",
    booksTags: [
      { id: "religious-trauma", label: "Religious trauma" },
      { id: "religious-deconstruction", label: "Religious deconstruction" },
      { id: "complex-trauma", label: "Complex trauma" },
      { id: "relationships", label: "Relationships" },
      { id: "trust", label: "Trust" },
      { id: "divorce", label: "Divorce" },
      { id: "sexual-avoidance", label: "Sexual avoidance" },
      { id: "sexuality", label: "Sexuality" },
      { id: "kink", label: "Kink" },
      { id: "long-term-relationships", label: "Long-term relationships" },
      { id: "infidelity", label: "Infidelity" },
      { id: "sexual-development", label: "Sexual development" },
      { id: "stress", label: "Stress" },
      { id: "nervous-system", label: "Nervous system" },
      { id: "diet-culture", label: "Diet culture" },
      { id: "sexual-trauma", label: "Sexual trauma" },
      { id: "body-positive", label: "Body positive" },
      { id: "non-monogamy", label: "Non monogamy" },
      { id: "attachment", label: "Attachment" },
      { id: "trauma", label: "Trauma" },
      { id: "race", label: "Race" },
      { id: "emotions", label: "Emotions" },
      { id: "differentiation", label: "Differentiation" },
      { id: "trans", label: "Trans" },
      { id: "self-compassion", label: "Self-compassion" },
      { id: "acceptance", label: "Acceptance" },
      { id: "authenticity", label: "Authenticity" },
      { id: "masculinity", label: "Masculinity" },
      { id: "human-development", label: "Human development" },
      { id: "power", label: "Power" },
      { id: "theory", label: "Theory" },
      { id: "sexual-impulsivity", label: "Sexual impulsivity" },
      { id: "anxiety", label: "Anxiety" },
      { id: "co-parenting", label: "Co-parenting" },
      { id: "parenting", label: "Parenting" },
      { id: "depression", label: "Depression" },
      { id: "adhd", label: "ADHD" },
      { id: "abuse", label: "Abuse" },
      { id: "codependency", label: "Codependency" },
      { id: "pleasure", label: "Pleasure" },
      { id: "boundaries", label: "Boundaries" },
      { id: "intimacy", label: "Intimacy" },
      { id: "consent", label: "Consent" },
      { id: "fantasy", label: "Fantasy" },
      { id: "eroticism", label: "Eroticism" },
      { id: "sex-addiction", label: "Sex addiction" },
      { id: "spirituality", label: "Spirituality" },
      { id: "secular-spirituality", label: "Secular spirituality" },
      { id: "adoption", label: "Adoption" },
      { id: "grief", label: "Grief" },
      { id: "relationship-ambivalence", label: "Relationship ambivalence" },
      { id: "enmeshment", label: "Enmeshment" },
      { id: "anger", label: "Anger" },
      { id: "purity-culture", label: "Purity culture" },
      { id: "body-image", label: "Body image" },
    ],
    booksCatalog: [
      {
        id: "leaving-the-fold",
        title: "Leaving the Fold",
        author: "Marlene Winnell, PhD",
        coverSrc: "/books/leaving-the-fold.jpg",
        coverAlt: "Cover of Leaving the Fold by Marlene Winnell",
        linkHref: "https://www.google.com/search?q=Leaving+the+Fold+Marlene+Winnell",
        linkLabel: "Find book",
        priorityRank: 1,
        hookTags: ["religious-trauma", "religious-deconstruction"],
      },
      {
        id: "what-my-bones-know",
        title: "What My Bones Know",
        author: "Stephanie Foo",
        coverSrc: "/books/what-my-bones-know.jpg",
        coverAlt: "Cover of What My Bones Know by Stephanie Foo",
        linkHref: "https://www.google.com/search?q=What+My+Bones+Know+Stephanie+Foo",
        linkLabel: "Find book",
        priorityRank: 2,
        hookTags: ["complex-trauma"],
      },
      {
        id: "you-are-your-own",
        title: "You Are Your Own",
        author: "Jamie Lee Finch",
        coverSrc: "/books/you-are-your-own.webp",
        coverAlt: "Cover of You Are Your Own by Jamie Lee Finch",
        linkHref: "https://www.google.com/search?q=You+Are+Your+Own+Jamie+Lee+Finch",
        linkLabel: "Find book",
        priorityRank: 3,
        hookTags: ["religious-trauma"],
      },
      {
        id: "the-science-of-trust",
        title: "The Science of Trust",
        author: "John Gottman, PhD",
        coverSrc: "/books/the-science-of-trust.jpg",
        coverAlt: "Cover of The Science of Trust by John Gottman",
        linkHref: "https://www.google.com/search?q=The+Science+of+Trust+John+Gottman",
        linkLabel: "Find book",
        priorityRank: 4,
        hookTags: ["relationships", "trust"],
      },
      {
        id: "conscious-uncoupling",
        title: "Conscious Uncoupling",
        author: "Katherine Woodward Thomas",
        coverSrc: "/books/conscious-uncoupling.jpg",
        coverAlt: "Cover of Conscious Uncoupling by Katherine Woodward Thomas",
        linkHref: "https://www.google.com/search?q=Conscious+Uncoupling+Katherine+Woodward+Thomas",
        linkLabel: "Find book",
        priorityRank: 5,
        hookTags: ["divorce"],
      },
      {
        id: "sex-without-stress",
        title: "Sex Without Stress",
        author: "Jessa Zimmerman",
        coverSrc: "/books/sex-without-stress.jpg",
        coverAlt: "Cover of Sex Without Stress by Jessa Zimmerman",
        linkHref: "https://www.google.com/search?q=Sex+Without+Stress+Jessa+Zimmerman",
        linkLabel: "Find book",
        priorityRank: 6,
        hookTags: ["sexual-avoidance"],
      },
      {
        id: "come-together",
        title: "Come Together",
        author: "Emily Nagoski, PhD",
        coverSrc: "/books/come-together.jpg",
        coverAlt: "Cover of Come Together by Emily Nagoski",
        linkHref: "https://www.google.com/search?q=Come+Together+Emily+Nagoski",
        linkLabel: "Find book",
        priorityRank: 7,
        hookTags: ["relationships", "sexuality", "long-term-relationships"],
      },
      {
        id: "state-of-affairs",
        title: "The State of Affairs",
        author: "Esther Perel",
        coverSrc: "/books/state-of-affairs.jpg",
        coverAlt: "Cover of The State of Affairs by Esther Perel",
        linkHref: "https://www.google.com/search?q=The+State+of+Affairs+Esther+Perel",
        linkLabel: "Find book",
        priorityRank: 8,
        hookTags: ["infidelity"],
      },
      {
        id: "come-as-you-are",
        title: "Come as You Are",
        author: "Emily Nagoski",
        coverSrc: "/books/come-as-you-are.jpg",
        coverAlt: "Cover of Come as You Are by Emily Nagoski",
        linkHref: "https://www.google.com/search?q=Come+as+You+Are+Emily+Nagoski",
        linkLabel: "Find book",
        priorityRank: 9,
        hookTags: ["sexuality", "sexual-development", "pleasure"],
      },
      {
        id: "burnout",
        title: "Burnout",
        author: "Emily Nagoski, PhD and Amelia Nagoski, DMA",
        coverSrc: "/books/burnout.jpeg",
        coverAlt: "Cover of Burnout by Emily Nagoski",
        linkHref: "https://www.google.com/search?q=Burnout+Emily+Nagoski+Amelia+Nagoski",
        linkLabel: "Find book",
        priorityRank: 10,
        hookTags: ["stress", "nervous-system"],
      },
      {
        id: "anti-diet",
        title: "Anti-Diet",
        author: "Christy Harrison",
        coverSrc: "/books/anti-diet.jpg",
        coverAlt: "Cover of Anti-Diet by Christy Harrison",
        linkHref: "https://www.google.com/search?q=Anti-Diet+Christy+Harrison",
        linkLabel: "Find book",
        priorityRank: 11,
        hookTags: ["diet-culture"],
      },
      {
        id: "the-sexual-healing-journey",
        title: "The Sexual Healing Journey",
        author: "Wendy Maltz",
        coverSrc: "/books/the-sexual-healing-journey.jpg",
        coverAlt: "Cover of The Sexual Healing Journey by Wendy Maltz",
        linkHref: "https://www.google.com/search?q=The+Sexual+Healing+Journey+Wendy+Maltz",
        linkLabel: "Find book",
        priorityRank: 12,
        hookTags: ["sexual-trauma"],
      },
      {
        id: "the-body-is-not-an-apology",
        title: "The Body Is Not an Apology",
        author: "Sonya Renee Taylor",
        coverSrc: "/books/the-body-is-not-an-apology.jpg",
        coverAlt: "Cover of The Body Is Not an Apology by Sonya Renee Taylor",
        linkHref: "https://www.google.com/search?q=The+Body+Is+Not+an+Apology+Sonya+Renee+Taylor",
        linkLabel: "Find book",
        priorityRank: 13,
        hookTags: ["sexuality", "body-positive"],
      },
      {
        id: "polysecure",
        title: "Polysecure",
        author: "Jessica Fern",
        coverSrc: "/books/polysecure.jpg",
        coverAlt: "Cover of Polysecure by Jessica Fern",
        linkHref: "https://www.google.com/search?q=Polysecure+Jessica+Fern",
        linkLabel: "Find book",
        priorityRank: 14,
        hookTags: ["non-monogamy", "attachment"],
      },
      {
        id: "mating-in-captivity",
        title: "Mating in Captivity",
        author: "Esther Perel",
        coverSrc: "/books/mating-in-captivity.jpg",
        coverAlt: "Cover of Mating in Captivity by Esther Perel",
        linkHref: "https://www.google.com/search?q=Mating+in+Captivity+Esther+Perel",
        linkLabel: "Find book",
        priorityRank: 15,
        hookTags: ["relationships", "non-monogamy", "eroticism"],
      },
      {
        id: "all-about-love",
        title: "All About Love",
        author: "bell hooks",
        coverSrc: "/books/all-about-love.webp",
        coverAlt: "Cover of All About Love by bell hooks",
        linkHref: "https://www.google.com/search?q=All+About+Love+bell+hooks",
        linkLabel: "Find book",
        priorityRank: 16,
        hookTags: ["relationships"],
      },
      {
        id: "waking-the-tiger",
        title: "Waking the Tiger",
        author: "Peter Levine",
        coverSrc: "/books/waking-the-tiger.jpg",
        coverAlt: "Cover of Waking the Tiger by Peter Levine",
        linkHref: "https://www.google.com/search?q=Waking+the+Tiger+Peter+Levine",
        linkLabel: "Find book",
        priorityRank: 17,
        hookTags: ["trauma"],
      },
      {
        id: "my-grandmothers-hands",
        title: "My Grandmother's Hands",
        author: "Resmaa Menakem",
        coverSrc: "/books/my-grandmothers-hands.jpg",
        coverAlt: "Cover of My Grandmother's Hands by Resmaa Menakem",
        linkHref: "https://www.google.com/search?q=My+Grandmother%27s+Hands+Resmaa+Menakem",
        linkLabel: "Find book",
        priorityRank: 18,
        hookTags: ["race"],
      },
      {
        id: "healing-sexual-trauma-workbook",
        title: "Healing Sexual Trauma Workbook",
        author: "Erika Shershun",
        coverSrc: "/books/healing-sexual-trauma-workbook.jpg",
        coverAlt: "Cover of Healing Sexual Trauma Workbook by Erika Shershun",
        linkHref: "https://www.google.com/search?q=Healing+Sexual+Trauma+Workbook+Erika+Shershun",
        linkLabel: "Find book",
        priorityRank: 19,
        hookTags: ["sexual-trauma"],
      },
      {
        id: "polyvagal-theory-in-therapy",
        title: "The Polyvagal Theory in Therapy",
        author: "Deb Dana",
        coverSrc: "/books/polyvagal-theory-in-therapy.jpg",
        coverAlt: "Cover of The Polyvagal Theory in Therapy by Deb Dana",
        linkHref: "https://www.google.com/search?q=The+Polyvagal+Theory+in+Therapy+Deb+Dana",
        linkLabel: "Find book",
        priorityRank: 20,
        hookTags: ["nervous-system", "theory"],
      },
      {
        id: "trauma-and-memory",
        title: "Trauma and Memory",
        author: "Peter Levine",
        coverSrc: "/books/trauma-and-memory.jpg",
        coverAlt: "Cover of Trauma and Memory by Peter Levine",
        linkHref: "https://www.google.com/search?q=Trauma+and+Memory+Peter+Levine",
        linkLabel: "Find book",
        priorityRank: 21,
        hookTags: ["trauma"],
      },
      {
        id: "emotionally-immature-parents",
        title: "Adult Children of Emotionally Immature Parents",
        author: "Lindsay Gibson",
        coverSrc: "/books/emotionally-immature-parents.jpg",
        coverAlt: "Cover of Adult Children of Emotionally Immature Parents by Lindsay Gibson",
        linkHref: "https://www.google.com/search?q=Adult+Children+of+Emotionally+Immature+Parents+Lindsay+Gibson",
        linkLabel: "Find book",
        priorityRank: 22,
        hookTags: ["emotions", "differentiation"],
      },
      {
        id: "trans-bodies-trans-selves",
        title: "Trans Bodies, Trans Selves",
        author: "Laura Erickson-Schroth",
        coverSrc: "/books/trans-bodies-trans-selves.jpg",
        coverAlt: "Cover of Trans Bodies, Trans Selves by Laura Erickson-Schroth",
        linkHref: "https://www.google.com/search?q=Trans+Bodies+Trans+Selves+Laura+Erickson-Schroth",
        linkLabel: "Find book",
        priorityRank: 23,
        hookTags: ["trans"],
      },
      {
        id: "so-you-want-to-talk-about-race",
        title: "So You Want to Talk About Race",
        author: "Ijeoma Oluo",
        coverSrc: "/books/so-you-want-to-talk-about-race.jpg",
        coverAlt: "Cover of So You Want to Talk About Race by Ijeoma Oluo",
        linkHref: "https://www.google.com/search?q=So+You+Want+to+Talk+About+Race+Ijeoma+Oluo",
        linkLabel: "Find book",
        priorityRank: 24,
        hookTags: ["race"],
      },
      {
        id: "radical-acceptance",
        title: "Radical Acceptance",
        author: "Tara Brach",
        coverSrc: "/books/radical-acceptance.webp",
        coverAlt: "Cover of Radical Acceptance by Tara Brach",
        linkHref: "https://www.google.com/search?q=Radical+Acceptance+Tara+Brach",
        linkLabel: "Find book",
        priorityRank: 25,
        hookTags: ["self-compassion", "acceptance"],
      },
      {
        id: "way-of-integrity",
        title: "The Way of Integrity",
        author: "Martha Beck",
        coverSrc: "/books/way-of-integrity.jpeg",
        coverAlt: "Cover of The Way of Integrity by Martha Beck",
        linkHref: "https://www.google.com/search?q=The+Way+of+Integrity+Martha+Beck",
        linkLabel: "Find book",
        priorityRank: 26,
        hookTags: ["authenticity"],
      },
      {
        id: "atlas-of-the-heart",
        title: "Atlas of the Heart",
        author: "Brene Brown",
        coverSrc: "/books/atlas-of-the-heart.jpg",
        coverAlt: "Cover of Atlas of the Heart by Brene Brown",
        linkHref: "https://www.google.com/search?q=Atlas+of+the+Heart+Brene+Brown",
        linkLabel: "Find book",
        priorityRank: 27,
        hookTags: ["emotions"],
      },
      {
        id: "mask-of-masculinity",
        title: "The Mask of Masculinity",
        author: "Lewis Howes",
        coverSrc: "/books/mask-of-masculinity.jpeg",
        coverAlt: "Cover of The Mask of Masculinity by Lewis Howes",
        linkHref: "https://www.google.com/search?q=The+Mask+of+Masculinity+Lewis+Howes",
        linkLabel: "Find book",
        priorityRank: 28,
        hookTags: ["masculinity"],
      },
      {
        id: "sapiens",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        coverSrc: "/books/sapiens.jpg",
        coverAlt: "Cover of Sapiens by Yuval Noah Harari",
        linkHref: "https://www.google.com/search?q=Sapiens+Yuval+Noah+Harari",
        linkLabel: "Find book",
        priorityRank: 29,
        hookTags: ["human-development"],
      },
      {
        id: "women-who-run-with-the-wolves",
        title: "Women Who Run With the Wolves",
        author: "Clarissa Pinkola Estes",
        coverSrc: "/books/women-who-run-with-the-wolves.jpg",
        coverAlt: "Cover of Women Who Run With the Wolves by Clarissa Pinkola Estes",
        linkHref: "https://www.google.com/search?q=Women+Who+Run+With+the+Wolves+Clarissa+Pinkola+Estes",
        linkLabel: "Find book",
        priorityRank: 30,
        hookTags: ["power"],
      },
      {
        id: "highly-sensitive-person",
        title: "The Highly Sensitive Person",
        author: "Elaine Aron",
        coverSrc: "/books/highly-sensitive-person.jpg",
        coverAlt: "Cover of The Highly Sensitive Person by Elaine Aron",
        linkHref: "https://www.google.com/search?q=The+Highly+Sensitive+Person+Elaine+Aron",
        linkLabel: "Find book",
        priorityRank: 31,
        hookTags: ["nervous-system"],
      },
      {
        id: "trauma-and-the-body",
        title: "Trauma and the Body",
        author: "Pat Ogden",
        coverSrc: "/books/trauma-and-the-body.jpg",
        coverAlt: "Cover of Trauma and the Body by Pat Ogden",
        linkHref: "https://www.google.com/search?q=Trauma+and+the+Body+Pat+Ogden",
        linkLabel: "Find book",
        priorityRank: 32,
        hookTags: ["trauma"],
      },
      {
        id: "healing-fragmented-selves",
        title: "Healing the Fragmented Selves of Trauma Survivors",
        author: "Janina Fisher",
        coverSrc: "/books/healing-fragmented-selves.jpeg",
        coverAlt: "Cover of Healing the Fragmented Selves of Trauma Survivors by Janina Fisher",
        linkHref: "https://www.google.com/search?q=Healing+the+Fragmented+Selves+of+Trauma+Survivors+Janina+Fisher",
        linkLabel: "Find book",
        priorityRank: 33,
        hookTags: ["trauma"],
      },
      {
        id: "codependent-no-more",
        title: "Codependent No More",
        author: "Melody Beattie",
        coverSrc: "/books/codependent-no-more.jpg",
        coverAlt: "Cover of Codependent No More by Melody Beattie",
        linkHref: "https://www.google.com/search?q=Codependent+No+More+Melody+Beattie",
        linkLabel: "Find book",
        priorityRank: 34,
        hookTags: ["enmeshment", "differentiation", "codependency"],
      },
      {
        id: "dance-of-anger",
        title: "The Dance of Anger",
        author: "Harriet Lerner",
        coverSrc: "/books/dance-of-anger.jpg",
        coverAlt: "Cover of The Dance of Anger by Harriet Lerner",
        linkHref: "https://www.google.com/search?q=The+Dance+of+Anger+Harriet+Lerner",
        linkLabel: "Find book",
        priorityRank: 35,
        hookTags: ["anger", "relationships", "differentiation"],
      },
      {
        id: "unbound",
        title: "Unbound: A Woman's Guide to Power",
        author: "Kasia Urbaniak",
        coverSrc: "/books/unbound.jpg",
        coverAlt: "Cover of Unbound: A Woman's Guide to Power by Kasia Urbaniak",
        linkHref: "https://www.google.com/search?q=Unbound+A+Woman%27s+Guide+to+Power+Kasia+Urbaniak",
        linkLabel: "Find book",
        priorityRank: 36,
        hookTags: ["power"],
      },
      {
        id: "set-boundaries-find-peace",
        title: "Set Boundaries, Find Peace",
        author: "Nedra Glover Tawwab",
        coverSrc: "/books/set-boundaries-find-peace.jpg",
        coverAlt: "Cover of Set Boundaries, Find Peace by Nedra Glover Tawwab",
        linkHref: "https://www.google.com/search?q=Set+Boundaries+Find+Peace+Nedra+Glover+Tawwab",
        linkLabel: "Find book",
        priorityRank: 37,
        hookTags: ["boundaries"],
      },
      {
        id: "polywise",
        title: "Polywise: A Deeper Dive into Navigating Open Relationships",
        author: "Jessica Fern",
        coverSrc: "/books/polywise.jpeg",
        coverAlt: "Cover of Polywise: A Deeper Dive into Navigating Open Relationships by Jessica Fern",
        linkHref: "https://www.google.com/search?q=Polywise+Jessica+Fern",
        linkLabel: "Find book",
        priorityRank: 38,
        hookTags: ["non-monogamy", "attachment"],
      },
      {
        id: "emotionally-intelligent-child",
        title: "Raising an Emotionally Intelligent Child",
        author: "John Gottman, PhD",
        coverSrc: "/books/emotionally-intelligent-child.jpg",
        coverAlt: "Cover of Raising an Emotionally Intelligent Child by John Gottman",
        linkHref: "https://www.google.com/search?q=Raising+an+Emotionally+Intelligent+Child+John+Gottman",
        linkLabel: "Find book",
        priorityRank: 39,
        hookTags: ["parenting"],
      },
      {
        id: "gifts-of-imperfect-parenting",
        title: "The Gifts of Imperfect Parenting",
        author: "Brene Brown",
        coverSrc: "/books/gifts-of-imperfect-parenting.jpg",
        coverAlt: "Cover of The Gifts of Imperfect Parenting by Brene Brown",
        linkHref: "https://www.google.com/search?q=The+Gifts+of+Imperfect+Parenting+Brene+Brown",
        linkLabel: "Find book",
        priorityRank: 40,
        hookTags: ["parenting"],
      },
      {
        id: "unfuck-your-boundaries",
        title: "Unfuck Your Boundaries",
        author: "Faith Harper",
        coverSrc: "/books/unfuck-your-boundaries.jpg",
        coverAlt: "Cover of Unfuck Your Boundaries by Faith Harper",
        linkHref: "https://www.google.com/search?q=Unfuck+Your+Boundaries+Faith+Harper",
        linkLabel: "Find book",
        priorityRank: 41,
        hookTags: ["boundaries"],
      },
      {
        id: "brainstorm",
        title: "Brainstorm",
        author: "Dan Siegel, MD",
        coverSrc: "/books/brainstorm.jpeg",
        coverAlt: "Cover of Brainstorm by Dan Siegel",
        linkHref: "https://www.google.com/search?q=Brainstorm+Dan+Siegel",
        linkLabel: "Find book",
        priorityRank: 42,
        hookTags: ["parenting"],
      },
      {
        id: "relationship-rx",
        title: "Relationship Rx",
        author: "Stan Tatkin, PsyD, MFT",
        coverSrc: "/books/relationship-rx.jpg",
        coverAlt: "Cover of Relationship Rx by Stan Tatkin",
        linkHref: "https://www.google.com/search?q=Relationship+Rx+Stan+Tatkin",
        linkLabel: "Find book",
        priorityRank: 43,
        hookTags: ["attachment", "relationships"],
      },
      {
        id: "how-to-keep-house-while-drowning",
        title: "How to Keep House While Drowning",
        author: "KC Davis, LPC",
        coverSrc: "/books/how-to-keep-house-while-drowning.jpg",
        coverAlt: "Cover of How to Keep House While Drowning by KC Davis",
        linkHref: "https://www.google.com/search?q=How+to+Keep+House+While+Drowning+KC+Davis",
        linkLabel: "Find book",
        priorityRank: 44,
        hookTags: ["parenting", "depression", "adhd"],
      },
      {
        id: "narcissistic-abuse-and-codependency",
        title: "Narcissistic Abuse and Codependency",
        author: "Courtney Evans",
        coverSrc: "/books/narcissistic-abuse-and-codependency.jpg",
        coverAlt: "Cover of Narcissistic Abuse and Codependency by Courtney Evans",
        linkHref: "https://www.google.com/search?q=Narcissistic+Abuse+and+Codependency+Courtney+Evans",
        linkLabel: "Find book",
        priorityRank: 45,
        hookTags: ["abuse", "codependency"],
      },
      {
        id: "ifs-therapy",
        title: "Internal Family Systems Therapy",
        author: "Richard Schwartz",
        coverSrc: "/books/ifs-therapy.jpg",
        coverAlt: "Cover of Internal Family Systems Therapy by Richard Schwartz",
        linkHref: "https://www.google.com/search?q=Internal+Family+Systems+Therapy+Richard+Schwartz",
        linkLabel: "Find book",
        priorityRank: 46,
        hookTags: ["theory"],
      },
      {
        id: "pleasure-activism",
        title: "Pleasure Activism",
        author: "adrienne maree brown",
        coverSrc: "/books/pleasure-activism.jpg",
        coverAlt: "Cover of Pleasure Activism by adrienne maree brown",
        linkHref: "https://www.google.com/search?q=Pleasure+Activism+adrienne+maree+brown",
        linkLabel: "Find book",
        priorityRank: 47,
        hookTags: ["sexuality", "pleasure"],
      },
      {
        id: "out-of-control-sexual-behavior",
        title: "Out of Control Sexual Behavior",
        author: "Doug Braun-Harvey",
        coverSrc: "/books/out-of-control-sexual-behavior.webp",
        coverAlt: "Cover of Out of Control Sexual Behavior by Doug Braun-Harvey",
        linkHref: "https://www.google.com/search?q=Out+of+Control+Sexual+Behavior+Doug+Braun-Harvey",
        linkLabel: "Find book",
        priorityRank: 48,
        hookTags: ["sexual-impulsivity", "theory"],
      },
      {
        id: "fear-and-other-uninvited-guests",
        title: "Fear and Other Uninvited Guests",
        author: "Harriet Lerner",
        coverSrc: "/books/fear-and-other-uninvited-guests.jpg",
        coverAlt: "Cover of Fear and Other Uninvited Guests by Harriet Lerner",
        linkHref: "https://www.google.com/search?q=Fear+and+Other+Uninvited+Guests+Harriet+Lerner",
        linkLabel: "Find book",
        priorityRank: 49,
        hookTags: ["anxiety"],
      },
      {
        id: "co-parents-handbook",
        title: "The Co-Parents Handbook",
        author: "Karen Bonnell",
        coverSrc: "/books/co-parents-handbook.jpg",
        coverAlt: "Cover of The Co-Parents Handbook by Karen Bonnell",
        linkHref: "https://www.google.com/search?q=The+Co-Parents+Handbook+Karen+Bonnell",
        linkLabel: "Find book",
        priorityRank: 50,
        hookTags: ["co-parenting", "parenting", "divorce"],
      },
      {
        id: "healing-sex",
        title: "Healing Sex: A Mind-Body Approach to Healing Sexual Trauma",
        author: "Staci Haines",
        coverSrc: "/books/healing-sex.webp",
        coverAlt: "Cover of Healing Sex: A Mind-Body Approach to Healing Sexual Trauma by Staci Haines",
        linkHref: "https://www.google.com/search?q=Healing+Sex+Staci+Haines",
        linkLabel: "Find book",
        priorityRank: 51,
        hookTags: ["sexual-trauma"],
      },
      {
        id: "more-than-two",
        title: "More Than Two",
        author: "Franklin Veaux and Eve Rickert",
        coverSrc: "/books/more-than-two.jpg",
        coverAlt: "Cover of More Than Two by Franklin Veaux and Eve Rickert",
        linkHref: "https://www.google.com/search?q=More+Than+Two+Franklin+Veaux+Eve+Rickert",
        linkLabel: "Find book",
        priorityRank: 52,
        hookTags: ["non-monogamy"],
      },
      {
        id: "adhd-after-dark",
        title: "ADHD After Dark",
        author: "Ari Tuckman",
        coverSrc: "/books/adhd-after-dark.jpg",
        coverAlt: "Cover of ADHD After Dark by Ari Tuckman",
        linkHref: "https://www.google.com/search?q=ADHD+After+Dark+Ari+Tuckman",
        linkLabel: "Find book",
        priorityRank: 53,
        hookTags: ["adhd", "sexuality"],
      },
      {
        id: "self-compassion",
        title: "Self-Compassion",
        author: "Kristin Neff",
        coverSrc: "/books/self-compassion.jpg",
        coverAlt: "Cover of Self-Compassion by Kristin Neff",
        linkHref: "https://www.google.com/search?q=Self-Compassion+Kristin+Neff",
        linkLabel: "Find book",
        priorityRank: 54,
        hookTags: ["self-compassion", "acceptance"],
      },
      {
        id: "wild-edge-of-sorrow",
        title: "The Wild Edge of Sorrow",
        author: "Francis Weller",
        coverSrc: "/books/wild-edge-of-sorrow.jpg",
        coverAlt: "Cover of The Wild Edge of Sorrow by Francis Weller",
        linkHref: "https://www.google.com/search?q=The+Wild+Edge+of+Sorrow+Francis+Weller",
        linkLabel: "Find book",
        priorityRank: 55,
        hookTags: ["grief"],
      },
      {
        id: "polyamory-martha-kauppi",
        title: "Polyamory",
        author: "Martha Kauppi",
        coverSrc: "/books/polyamory-martha-kauppi.jpg",
        coverAlt: "Cover of Polyamory by Martha Kauppi",
        linkHref: "https://www.google.com/search?q=Polyamory+Martha+Kauppi",
        linkLabel: "Find book",
        priorityRank: 56,
        hookTags: ["non-monogamy", "differentiation"],
      },
      {
        id: "already-enough",
        title: "Already Enough",
        author: "Lisa Olivera",
        coverSrc: "/books/already-enough.jpg",
        coverAlt: "Cover of Already Enough by Lisa Olivera",
        linkHref: "https://www.google.com/search?q=Already+Enough+Lisa+Olivera",
        linkLabel: "Find book",
        priorityRank: 57,
        hookTags: ["adoption", "acceptance"],
      },
      {
        id: "no-nonsense-spirituality",
        title: "No Nonsense Spirituality",
        author: "Britt Hartley",
        coverSrc: "/books/no-nonsense-spirituality.jpg",
        coverAlt: "Cover of No Nonsense Spirituality by Britt Hartley",
        linkHref: "https://www.google.com/search?q=No+Nonsense+Spirituality+Britt+Hartley",
        linkLabel: "Find book",
        priorityRank: 58,
        hookTags: ["secular-spirituality"],
      },
      {
        id: "too-good-to-leave-too-bad-to-stay",
        title: "Too Good to Leave, Too Bad to Stay",
        author: "Mira Kirshenbaum",
        coverSrc: "/books/too-good-to-leave-too-bad-to-stay.jpg",
        coverAlt: "Cover of Too Good to Leave, Too Bad to Stay by Mira Kirshenbaum",
        linkHref: "https://www.google.com/search?q=Too+Good+to+Leave+Too+Bad+to+Stay+Mira+Kirshenbaum",
        linkLabel: "Find book",
        priorityRank: 59,
        hookTags: ["relationship-ambivalence", "divorce"],
      },
      {
        id: "will-to-change",
        title: "The Will to Change",
        author: "bell hooks",
        coverSrc: "/books/will-to-change.jpg",
        coverAlt: "Cover of The Will to Change by bell hooks",
        linkHref: "https://www.google.com/search?q=The+Will+to+Change+bell+hooks",
        linkLabel: "Find book",
        priorityRank: 60,
        hookTags: ["intimacy", "masculinity"],
      },
      {
        id: "sexsmart",
        title: "SexSmart",
        author: "Aline Zoldbrod, PhD",
        coverSrc: "/books/sexsmart.jpg",
        coverAlt: "Cover of SexSmart by Aline Zoldbrod",
        linkHref: "https://www.google.com/search?q=SexSmart+Aline+Zoldbrod",
        linkLabel: "Find book",
        priorityRank: 61,
        hookTags: ["sexuality"],
      },
      {
        id: "wheel-of-consent",
        title: "The Art of Giving and Receiving: The Wheel of Consent",
        author: "Betty Martin, DC",
        coverSrc: "/books/wheel-of-consent.jpg",
        coverAlt: "Cover of The Art of Giving and Receiving: The Wheel of Consent by Betty Martin",
        linkHref: "https://www.google.com/search?q=The+Wheel+of+Consent+Betty+Martin",
        linkLabel: "Find book",
        priorityRank: 62,
        hookTags: ["consent", "sexuality", "power"],
      },
      {
        id: "secrets-of-a-passionate-marriage",
        title: "Secrets of a Passionate Marriage",
        author: "David Schnarch, PhD",
        coverSrc: "/books/secrets-of-a-passionate-marriage.jpg",
        coverAlt: "Cover of Secrets of a Passionate Marriage by David Schnarch",
        linkHref: "https://www.google.com/search?q=Secrets+of+a+Passionate+Marriage+David+Schnarch",
        linkLabel: "Find book",
        priorityRank: 63,
        hookTags: ["relationships", "differentiation", "intimacy"],
      },
      {
        id: "tell-me-what-you-want",
        title: "Tell Me What You Want",
        author: "Justin Lehmiller",
        coverSrc: "/books/tell-me-what-you-want.jpg",
        coverAlt: "Cover of Tell Me What You Want by Justin Lehmiller",
        linkHref: "https://www.google.com/search?q=Tell+Me+What+You+Want+Justin+Lehmiller",
        linkLabel: "Find book",
        priorityRank: 64,
        hookTags: ["sexuality", "fantasy"],
      },
      {
        id: "the-erotic-mind",
        title: "The Erotic Mind",
        author: "Jack Morin, PhD",
        coverSrc: "/books/the-erotic-mind.jpg",
        coverAlt: "Cover of The Erotic Mind by Jack Morin",
        linkHref: "https://www.google.com/search?q=The+Erotic+Mind+Jack+Morin",
        linkLabel: "Find book",
        priorityRank: 65,
        hookTags: ["eroticism", "sexuality", "pleasure", "fantasy"],
      },
      {
        id: "myth-of-sex-addiction",
        title: "The Myth of Sex Addiction",
        author: "David Ley",
        coverSrc: "/books/myth-of-sex-addiction.jpg",
        coverAlt: "Cover of The Myth of Sex Addiction by David Ley",
        linkHref: "https://www.google.com/search?q=The+Myth+of+Sex+Addiction+David+Ley",
        linkLabel: "Find book",
        priorityRank: 66,
        hookTags: ["sex-addiction"],
      },
      {
        id: "adult-in-relationships",
        title: "How to Be an Adult in Relationships",
        author: "David Richo",
        coverSrc: "/books/adult-in-relationships.jpg",
        coverAlt: "Cover of How to Be an Adult in Relationships by David Richo",
        linkHref: "https://www.google.com/search?q=How+to+Be+an+Adult+in+Relationships+David+Richo",
        linkLabel: "Find book",
        priorityRank: 67,
        hookTags: ["attachment", "differentiation", "spirituality"],
      },
      {
        id: "existential-kink",
        title: "Existential Kink",
        author: "Carolyn Elliott, PhD",
        coverSrc: "/books/existential-kink.jpg",
        coverAlt: "Cover of Existential Kink by Carolyn Elliott",
        linkHref: "https://www.google.com/search?q=Existential+Kink+Carolyn+Elliott",
        linkLabel: "Find book",
        priorityRank: 68,
        hookTags: ["kink", "eroticism"],
      },
      {
        id: "why-does-he-do-that",
        title: "Why Does He Do That?",
        author: "Lundy Bancroft",
        coverSrc: "/books/why-does-he-do-that.jpg",
        coverAlt: "Cover of Why Does He Do That? by Lundy Bancroft",
        linkHref: "https://www.google.com/search?q=Why+Does+He+Do+That+Lundy+Bancroft",
        linkLabel: "Find book",
        priorityRank: 69,
        hookTags: ["abuse"],
      },
      {
        id: "purity-myth",
        title: "The Purity Myth",
        author: "Jessica Valenti",
        coverSrc: "https://covers.openlibrary.org/b/olid/OL22560557M-L.jpg",
        coverAlt: "Cover of The Purity Myth by Jessica Valenti",
        linkHref: "https://www.google.com/search?q=The+Purity+Myth+Jessica+Valenti",
        linkLabel: "Find book",
        priorityRank: 70,
        hookTags: ["sexuality", "purity-culture"],
      },
      {
        id: "mothers-daughters-and-body-image",
        title: "Mothers, Daughters, & Body Image",
        author: "Hilary L. McBride",
        coverSrc:
          "https://books.google.com/books/content?id=mKQ2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        coverAlt: "Cover of Mothers, Daughters, & Body Image by Hilary L. McBride",
        linkHref:
          "https://www.google.com/search?q=Mothers,+Daughters,+and+Body+Image+Hillary+McBride",
        linkLabel: "Find book",
        priorityRank: 71,
        hookTags: ["parenting", "body-image"],
      },
    ],
    searchLabel: "Search topics",
    searchPlaceholder: "Search topics",
    filterLabel: "Filter",
    filterAllLabel: "All",
    resultsEmpty: "No resources match the current filter.",
    relatedTitle: "Related resources",
    relatedIconSrc: "/icons/arrows-left-right.svg",
    citationsTitle: "Citations",
    citationsIconSrc: "/icons/quotes.svg",
    citationAriaLabel: "Open citation",
    keyConceptsTitle: "Key concepts",
    keyConceptsIconSrc: "/icons/lightbulb.svg",
    worksheetsTitle: "Worksheets",
    worksheetsIconSrc: "/icons/file-text.svg",
    worksheetPreviewAlt: "Worksheet preview",
    worksheetFormatLabel: "PDF",
    worksheetCtaLabel: "Open worksheet",
    worksheetTagLabel: "Worksheet",
    citationsLabel: "citations",
  },
  fortyEightCollaborative: {
    heroHeading: "Intensive for Collaborative Law",
    heroSubhead:
      "A 48-hour secure container that upgrades client capacity for collaborative decision-making.",
    heroFurnitureSrc: "/furniture/desk-lamp.svg",
    heroFurnitureAlt: "Desk lamp furniture illustration",
    frameTitle: "Built for legal process stability",
    framePoints: [
      "Time-bounded, structured, and professional from intake to closeout.",
      "Designed to reduce volatility and improve follow-through on commitments.",
      "A focused container, not open-ended treatment.",
    ],
    useCasesTitle: "When to refer",
    useCases: [
      {
        title: "Pre-collaborative readiness",
        body: "A client is not yet stable enough to begin a collaborative process.",
      },
      {
        title: "Mid-process reset",
        body: "Negotiation is stalling because escalation patterns are taking over.",
      },
      {
        title: "Post-agreement stabilization",
        body: "Implementation is slipping due to reactivity, conflict loops, or boundary collapse.",
      },
    ],
    workflowTitle: "How referral works",
    workflowSteps: [
      "Start with a brief consult to confirm fit, timing, and immediate priorities.",
      "Move into a two-day container with structured pacing and clear checkpoints.",
      "Receive a concise summary focused on implementation and next-step coordination.",
    ],
    ctaTitle: "Refer a client for Intensive",
    ctaBody:
      "Use Intensive when you need faster readiness, better emotional steadiness, and stronger execution during collaborative work.",
    primaryCtaLabel: "Book a consult",
    primaryCtaHref: "/contact?source=collaborative-law",
    secondaryCtaLabel: "View main Intensive page",
    secondaryCtaHref: "/intensive",
  },
  fortyEight: {
    heroHeading: "Intensive",
    heroSubhead:
      "A private two day container for relationships that need more time, structure, and momentum than a weekly format.",
    heroIconSrc: "/icons/hourglass-high.svg",
    heroFurnitureSrc: "/furniture/desk-lamp.svg",
    heroFurnitureAlt: "Desk lamp furniture illustration",
    heroMediaAlt: "Soft linen textures with natural light",
    faqTitle: "FAQs",
    faqIconSrc: "/icons/headphones.svg",
    sellTitle: "Why choose Intensive",
    sellLead: "When weekly therapy does not fit your life.",
    sellBodyOne:
      "If your schedule is full, or weekly sessions feel like too little time to make real progress, an intensive can be a better container. You get more time, more structure, and a steadier arc.",
    sellBodyTwo:
      "Therafox Intensive is a private two day couples intensive with time with Anastasia and planned on-your-own time. Intensives are offered in person or at your location. The goal is clarity, practice, and a plan you can follow after the two days.",
    sellOutcome:
      "You leave with a practical next step, not loose ends.",
    includedTitle: "What is included",
    includedBadgeLabel: "Included",
    includedItems: [
      {
        text: "A structured arc across the full two days",
        iconSrc: "/icons/clipboard-text.svg",
      },
      {
        text: "Expert-held sessions with Anastasia",
        iconSrc: "/icons/handshake.svg",
      },
      {
        text: "Planned on-your-own time for connection, repair, and rest",
        iconSrc: "/icons/armchair.svg",
      },
      {
        text: "A clear take-home plan for next steps",
        iconSrc: "/icons/notebook.svg",
      },
    ],
    waitlistCtaTitle: "Get dates when they open",
    waitlistCtaBody:
      "Therafox Intensive is offered in limited windows. Join the waitlist for upcoming dates and private availability.",
    waitlistCtaLabel: "Join the waitlist",
    pricingEyebrow: "Next step",
    pricingTitle: "Request details and availability",
    pricingBodyOne:
      "Intensive is offered in limited windows and scheduled around fit, timing, and pacing.",
    pricingBodyTwo:
      "Join the waitlist to receive upcoming dates and private availability. If you want to talk through fit first, book a consult.",
    pricingSecondaryCtaLabel: "Book a consult",
    conversionIntroLabel: "What happens next",
    conversionSteps: [
      "Join the waitlist to receive dates and private availability.",
      "If a date fits, I will send the next intake step.",
      "If you prefer to confirm fit first, book a consult.",
    ],
    waitlistFormTitle: "Join the intensive waitlist",
    waitlistFormBody:
      "Enter your preferred email. You will hear from me when dates open.",
    waitlistEmailLabel: "Email",
    waitlistEmailPlaceholder: "Enter your preferred email",
    waitlistSubmitLabel: "Join the waitlist",
    waitlistSubmittingLabel: "Joining waitlist",
    waitlistSuccessMessage: "Thanks. You are on the waitlist and will get dates when they open.",
    waitlistErrorMessage: "Something went wrong. Please try again in a minute.",
    waitlistSpamBlockedMessage: "Request blocked. Please wait a moment, then try again.",
    waitlistMicroline: "No newsletters. You will only hear from me when dates open.",
    vignettesTitle: "Illustrative vignettes",
    vignettesIntro:
      "Examples of the kinds of focused work clients use intensives for.",
    vignetteToggleLabel: "Open vignette",
    vignetteOutcomeLabel: "They left with",
    vignettes: [
      {
        title: "Rebuilding After Betrayal",
        body:
          "After twelve years together, Jordan and Alex sought an intensive after Jordan discovered Alex had been engaging in online conversations that crossed the boundaries of their relationship. Both were distraught and struggling with mistrust, painful emotions, and conversations that quickly escalated or shut down.",
        outcomes: [
          "Greater understanding of how the rupture occurred",
          "Tools to regulate themselves and stay present in difficult conversations",
          "Clarity about relationship agreements and boundaries",
          "A shared understanding of their values moving forward",
          "Practical tools for repairing trust and navigating future conflict",
        ],
      },
      {
        title: "Navigating the Empty Nest Transition",
        body:
          "As their youngest child left for college, Maria and Daniel found themselves experiencing the transition very differently, Maria felt excitement about the next chapter, while Daniel was grieving the end of daily family life. The difference in their emotional responses created distance and misunderstandings between them.",
        outcomes: [
          "A deeper understanding of each other's emotional experience",
          "Greater empathy for the grief and excitement that can coexist in life transitions",
          "Tools for listening with curiosity and responding with empathy",
          "Clarity about how each partner wanted to move into the next stage of life",
          "A better sense of how to support one another during the transition",
        ],
      },
      {
        title: "Reconnecting Intimately",
        body:
          "Over time, Maya and Elena noticed that the playful and exploratory intimacy they once shared had faded. Stress, busy schedules, and unspoken differences had created distance, and both partners felt unsure how to begin the conversation.",
        outcomes: [
          "A renewed ability to talk openly about intimacy and desires",
          "Greater understanding of what often interferes with connection in long-term relationships",
          "Tools for expressing preferences and curiosity with one another",
          "Practical exercises to rebuild playfulness and exploration",
          "A stronger sense of themselves as sexual beings and how they want to connect together",
        ],
      },
    ],
    vignettesNote:
      "Composite vignettes based on common experiences in couples therapy.",
    share: {
      wordmark: "THERAFOX",
      generatedLabel: "Generated",
      expertHeldLabel: "Expert-held time",
      togetherByCategoryTitle: "Time by category",
      copyLinkLabel: "Copy link",
      exportPdfLabel: "Export PDF",
    },
  },
} satisfies SiteCopyShape;

export const INTENSIVE_COPY = {
  zones: {
    shareable: "Shareable partner view",
    conversion: "Conversion and waitlist",
  },
  hero: {
    title: "Therafox Intensive",
    shortTitle: "Intensive",
    startingPriceLine: "Pricing is based on expert-held time.",
  },
  planner: {
    title: "Build your 48 hour draft",
    subtitle: "A private planning tool to sketch the two days before you commit to anything.",
    note: "You can read the page without using it. If you want to try it, start by placing a few moments and see what kind of pacing you are building. Time with Anastasia is part of the experience, and you can add it to your draft at times when you are ready.",
    starterDraftsTitle: "Starter drafts",
    starterDraftsHelper: "Select one to auto-fill your 48 hours. You can change anything after it loads.",
    starterDrafts: [
      {
        id: "more-voice",
        label: "More voice",
        description: "More direct language, clearer requests, less avoiding.",
      },
      {
        id: "more-calm",
        label: "More calm",
        description: "Slower pacing, more space, calmer repair after tension.",
      },
      {
        id: "more-desire",
        label: "More desire",
        description: "More intentional intimacy and playful connection, with consent first.",
      },
      {
        id: "more-alignment",
        label: "More alignment",
        description: "More structure, agreements, and a clean plan for Monday.",
      },
    ],
    clearAllLabel: "Clear all",
    organizeLabel: "Organize",
    timelineTitle: "Timeline canvas",
    includeLabel: "Include",
    removeLabel: "Remove",
    openLibraryLabel: "Open library",
    closeLibraryLabel: "Close",
    expandLabel: "Expand",
    collapseLabel: "Collapse",
    libraryTitle: "Moment library",
    libraryNote: "Choose a category and place a moment into the next open slot.",
    categoryLabels: {
      quiet: "Quiet",
      connection: "Connection",
      reset: "Reset",
      desire: "Desire",
      integration: "Integration",
      "expert-held": "Expert-held",
    },
    periodLabels: {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    },
    noItemsLabel: "No moments yet",
    day1Title: "Day 1",
    day2Title: "Day 2",
    errorIntro: "Draft guardrail",
  },
  plannerV2: {
    title: "Build your two day agenda",
    subtitle:
      "Pick one theme to auto-build a two day draft, then fine-tune only what you need.",
    note: "This is a planning preview, not homework. Start with one click, then adjust lightly.",
    starterThemesTitle: "Choose a focus theme",
    starterThemesHelper:
      "These work like starter drafts. Selecting one preloads skills across Day 1 and Day 2.",
    starterAppliedLabel: "Applied theme",
    clearAllLabel: "Clear agenda",
    errorIntro: "Agenda guardrail",
    dayLabels: {
      day1: "Day 1",
      day2: "Day 2",
    },
    periodLabels: {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    },
    themeLabel: "Theme",
    themePlaceholder: "Select a theme",
    skillsLabel: "Skills",
    skillsHelper: "Skills repeat across themes. Choose the ones that fit this period.",
    suggestedSkillsTitle: "Suggested skills for this theme",
    suggestedSkillsHelper: "Optional quick picks. You can use, swap, or skip these.",
    suggestedSkillsSelectedLabel: "selected",
    selectedSkillsTitle: "Selected for this period",
    noSkillsSelectedLabel: "No skills selected yet",
    skillLibraryTitle: "Browse the full skill set",
    skillLibraryHelper:
      "Optional depth. Open this only if you want to see definitions and observable markers.",
    skillLibraryAddDay1Label: "Add to Day 1",
    skillLibraryAddDay2Label: "Add to Day 2",
    skillLibraryAddedDay1Label: "Added to Day 1",
    skillLibraryAddedDay2Label: "Added to Day 2",
    skillLibraryAlreadyInPlannerLabel: "Already in planner",
    expertHeldLabel: "Expert-held support in this period",
    themes: {
      "before-we-commit": "Before we commit",
      "making-a-decision": "Making a decision",
      "important-transition": "An important transition",
      "breach-of-trust": "Breach of trust",
      "loss-of-spark-sexual-challenges": "Loss of spark and sexual challenges",
      "communication-breakdown": "Communication breakdown",
    },
    skills: {
      rel_stage_mapping: {
        label: "Know what stage you are in",
        shortDefinition:
          "Name what your relationship is moving through right now, so you stop guessing what to do next.",
        observableMarker:
          "You can say this is an early bonding phase or this is a self-definition moment and agree on the next step for today.",
      },
      relationship_acclimation: {
        label: "Stabilize the new normal",
        shortDefinition:
          "Settle your nervous system into the reality of being in a relationship, especially when everything feels urgent.",
        observableMarker:
          "You slow the pace, clarify expectations, and make fewer high-stakes decisions when flooded.",
      },
      attunement_reading: {
        label: "Read each other better",
        shortDefinition:
          "Get more accurate about what your partner is signaling, beneath the words.",
        observableMarker:
          "One of you reflects the other's feeling or need and the other says yes, that's what I meant.",
      },
      shared_boundary_building: {
        label: "Build the we without losing yourself",
        shortDefinition:
          "Create shared agreements while keeping room for two real people.",
        observableMarker:
          "You make a plan that supports the relationship and each person's needs, without either of you feeling controlled.",
      },
      idealization_reality_shift: {
        label: "Move from fantasy to reality",
        shortDefinition:
          "Let the relationship mature from we are the same into we are different and still here.",
        observableMarker:
          "You can name differences without turning them into proof that you should leave.",
      },
      difference_tolerance: {
        label: "Handle differences without panic",
        shortDefinition:
          "Stay connected when values, timelines, or desires do not match perfectly.",
        observableMarker:
          "Hard topics end with a next step, not a spiral, threat, or shutdown.",
      },
      nondefensive_expression: {
        label: "Say what you need cleanly",
        shortDefinition:
          "Share thoughts, feelings, wishes, and boundaries without blame or character attacks.",
        observableMarker:
          "You use specific I feel, I need, I am asking language and the room stays calm enough to keep talking.",
      },
      nonreactive_listening: {
        label: "Listen without fighting for the win",
        shortDefinition:
          "Take in your partner's experience without cross-examining, correcting, or punishing them for it.",
        observableMarker:
          "You can summarize their point fairly before you respond with your own.",
      },
      discomfort_regulation: {
        label: "Stay steady when it gets hot",
        shortDefinition:
          "Manage anxiety, anger, and fear so you can make decisions from clarity, not threat.",
        observableMarker:
          "You notice flooding early, pause, and come back to finish the conversation.",
      },
      decision_clarity: {
        label: "Make a decision you can stand behind",
        shortDefinition:
          "Sort signal from noise when you are asking do we commit, pause, or part.",
        observableMarker:
          "You can state the decision, the reasons, and the conditions for revisiting it without re-litigating daily.",
      },
      transition_alignment: {
        label: "Navigate big transitions as a team",
        shortDefinition:
          "Coordinate during moves, new jobs, parenting shifts, blended families, or major life changes.",
        observableMarker:
          "You leave a planning talk with roles, dates, and a check-in plan instead of vague promises.",
      },
      autonomy_self_esteem: {
        label: "Rebuild confidence inside yourself",
        shortDefinition:
          "Strengthen self-worth so the relationship is not the only source of stability.",
        observableMarker:
          "Each partner has at least one grounded support or growth path that does not depend on the other's mood.",
      },
      secure_reconnection: {
        label: "Come back together after distance",
        shortDefinition:
          "Rebuild closeness after independence, stress, or disconnection without losing the I.",
        observableMarker:
          "You can initiate closeness directly and respond without punishment or pursuit.",
      },
      trust_repair_protocol: {
        label: "Repair trust with structure",
        shortDefinition:
          "Replace prove it fights with a clear trust repair plan after a breach.",
        observableMarker:
          "You agree on transparency steps, timelines, and repair conversations, and you can track follow-through.",
      },
      impact_ownership: {
        label: "Take responsibility without collapsing",
        shortDefinition:
          "Own harm without self-destruction and without demanding immediate forgiveness.",
        observableMarker:
          "You can say I understand the impact, I own my part, here is what changes and stay present.",
      },
      sexual_reconnection: {
        label: "Rebuild erotic and emotional connection",
        shortDefinition:
          "Address loss of spark, desire mismatch, and sexual stress with honesty and care.",
        observableMarker:
          "You can talk about sex without shame or blame, and you create small experiments you both consent to.",
      },
      object_constancy: {
        label: "Stay connected even when disappointed",
        shortDefinition:
          "Hold on to the sense of being cared for during conflict, distance, or disillusionment.",
        observableMarker:
          "You can tolerate a hard moment without deciding it means the whole relationship is broken.",
      },
      rupture_repair: {
        label: "Fight and recover well",
        shortDefinition:
          "Learn how to come back after a blow-up so conflict stops feeling like the end.",
        observableMarker:
          "After conflict, you complete a sequence: acknowledge, name impact, take ownership, make a request, agree on a next step.",
      },
      symbiotic_bind_spotting: {
        label: "Spot the stuck pattern",
        shortDefinition:
          "Identify the loop that keeps pulling you back into the same painful roles.",
        observableMarker:
          "You can name the trigger, the moves you each make, and the cost, without turning it into a verdict on each other.",
      },
      stage_matched_next_step: {
        label: "Choose the right next move",
        shortDefinition:
          "Take the next step that fits your moment, whether you are rebuilding, deciding, or transitioning.",
        observableMarker:
          "You leave sessions or talks with one small, clear action for this week that reduces chaos and builds stability.",
      },
    },
    recommendedSkillsByTheme: {
      "before-we-commit": [
        "rel_stage_mapping",
        "difference_tolerance",
        "decision_clarity",
      ],
      "making-a-decision": [
        "decision_clarity",
        "nonreactive_listening",
        "stage_matched_next_step",
      ],
      "important-transition": [
        "transition_alignment",
        "shared_boundary_building",
        "discomfort_regulation",
      ],
      "breach-of-trust": [
        "trust_repair_protocol",
        "impact_ownership",
        "nondefensive_expression",
      ],
      "loss-of-spark-sexual-challenges": [
        "sexual_reconnection",
        "attunement_reading",
        "secure_reconnection",
      ],
      "communication-breakdown": [
        "symbiotic_bind_spotting",
        "nonreactive_listening",
        "rupture_repair",
      ],
    },
    summary: {
      title: "Agenda summary",
      selectedSlotsLabel: "Selected periods",
      skillCountLabel: "Total skills",
      expertHeldLabel: "Expert-held periods",
      day1ThemesLabel: "Day 1 themed periods",
      day2ThemesLabel: "Day 2 themed periods",
    },
    waitlist: {
      zoneLabel: "V2 conversion and waitlist",
      heading: "Join the waitlist",
      helper:
        "Share your email to receive upcoming dates and private availability for this two day format.",
      inputPlaceholder: "Enter your preferred email",
      submitLabel: "Join the waitlist",
      submittingLabel: "Joining waitlist",
      successMessage: "Thanks. You are on the waitlist and will get dates when they open.",
      errorMessage: "Something went wrong. Please try again in a minute.",
      spamBlockedMessage: "Request blocked. Please wait a moment, then try again.",
      microline: "No newsletters. You will only hear from me when dates open.",
    },
    errors: {
      skillsCap: "A period can include up to three skills.",
      missingThemeForSkills: "Select a theme before selecting skills for this period.",
      missingSkillsForTheme: "Add at least one skill when a theme is selected.",
      expertHeldDayCap: "Expert-held support is limited to two periods per day.",
      expertHeldNeedsTheme: "Select a theme before enabling expert-held support.",
      dayMissingTheme: "Each day needs at least one themed period.",
      unknownSlot: "That period is not available right now.",
    },
  },
  shareable: {
    title: "Share your 48 hour draft",
    reportTitle: "Your 48 hour draft",
    helper: "Built for collaboration. Turn your draft into a clean private overview you can look at together, then adjust the pacing until it feels right.",
    actionsHelper:
      "Review the overview together, then share privately by link or PDF.",
    shareDraftLabel: "Share Draft",
    joinWaitlistLabel: "Join the waitlist",
    emptyState: "Build a draft to enable sharing.",
  },
  investment: {
    title: "Investment",
    subhead:
      "Your investment is based on expert-held time with Anastasia. Planned time is shown so you can see the pacing of the two days.",
    expertHeldLabel: "Time with Anastasia",
    togetherLabel: "Planned time",
    totalLabel: "Total investment",
    trustLine:
      "This is dedicated time for your relationship. Choose the level of support that fits you.",
    guardrailLine: "To keep the work steady, expert-held time is capped at 6 hours per day.",
  },
  waitlist: {
    heading: "Join the waitlist",
    helper: "Join the waitlist to receive upcoming dates and private availability.",
    inputPlaceholder: "Enter your preferred email",
    submitLabel: "Join the waitlist",
    submittingLabel: "Joining waitlist",
    successMessage: "Thanks. You are on the waitlist and will get dates when they open.",
    errorMessage: "Something went wrong. Please try again in a minute.",
    spamBlockedMessage: "Request blocked. Please wait a moment, then try again.",
    microline: "No newsletters. You will only hear from me when dates open.",
  },
  errors: {
    totalCap: "This draft exceeds 48 hours. Remove one moment.",
    overlap: "This overlaps. Adjust or replace.",
    dayHoursCap: "{dayLabel} expert-held time cannot exceed 6 hours.",
    majorExclusive: "Choose one major expert-held block for this draft.",
    conflict: "These expert-held blocks cannot be selected together.",
    unknownItem: "One of the selected moments is not available.",
  },
  catalogCopy: {
    "quiet-dinner": {
      label: "Quiet dinner",
      description: "A 90 minute phone free dinner with light structure.",
    },
    "listening-exchange": {
      label: "Listening exchange",
      description: "A 30 minute structured listening exchange to reset tone.",
    },
    "walk-reset": {
      label: "Walk reset",
      description: "A 60 minute walk to lower intensity and regain pace.",
    },
    "phones-off-hour": {
      label: "Phones off hour",
      description: "A 60 minute window to build presence and ease.",
    },
    "appreciation-round": {
      label: "Appreciation round",
      description: "A 30 minute round of clear appreciation and thanks.",
    },
    "reset-practice": {
      label: "Reset practice",
      description: "A 30 minute practice for clean resets after tension.",
    },
    "morning-coffee": {
      label: "Morning coffee check-in",
      description: "A 30 minute morning check-in to set tone and pace.",
    },
    "solo-decompression": {
      label: "Solo decompression",
      description: "A 60 minute reset window for quiet recalibration.",
    },
    "journal-share": {
      label: "Journal then share",
      description: "A 30 minute written reflection followed by sharing.",
    },
    "values-alignment": {
      label: "Values alignment conversation",
      description: "A 60 minute alignment conversation for direction.",
    },
    "desire-mapping": {
      label: "Desire mapping prompts",
      description: "A 60 minute prompt set to reopen curiosity and play.",
    },
    "non-goal-touch": {
      label: "Non-goal touch",
      description: "A 30 minute connection window without an agenda.",
    },
    "plan-for-monday": {
      label: "Plan the week",
      description: "A 60 minute transition plan for the week ahead.",
    },
    "relationship-agreements": {
      label: "Relationship agreements",
      description: "A 30 minute agreements pass to clarify expectations.",
    },
    "shared-playlist": {
      label: "Shared playlist",
      description: "A 30 minute reset using shared music cues.",
    },
    "integration-journaling": {
      label: "Integration journaling",
      description: "A 30 minute written integration to lock in choices.",
    },
    "sunrise-checkin": {
      label: "Sunrise check-in",
      description: "A 30 minute start to align tone and priorities.",
    },
    "threshold-call": {
      label: "Threshold Call",
      description: "A 30 minute expert-held call to set intention and entry points.",
    },
    "alignment-checkins": {
      label: "Alignment Check-ins",
      description: "Two short expert-held check-ins to stabilize pacing on Day 1.",
    },
    "breakthrough-block": {
      label: "Breakthrough Block",
      description: "A 90 minute expert-held block for a precise shift in momentum.",
    },
    "stabilization-session": {
      label: "Stabilization Session",
      description: "An expert-held session to translate Day 2 decisions into home life.",
    },
    "integration-sessions": {
      label: "Integration Sessions (2)",
      description: "Two expert-held sessions to carry momentum after the weekend.",
    },
    "expert-held-session": {
      label: "Expert-held session",
      description: "A 60 minute expert-held session for precision and clarity.",
    },
    "home-blueprint": {
      label: "Home Blueprint",
      description: "A self guided written blueprint to keep decisions active.",
    },
    "calendar-protection": {
      label: "Calendar Buffer",
      description: "A 30 minute buffer to keep pacing and timing steady.",
    },
    "quiet-reading": {
      label: "Quiet reading",
      description: "A 60 minute quiet stretch to settle and reset.",
    },
    "evening-wind-down": {
      label: "Evening wind-down",
      description: "A 60 minute close to soften and slow the pace.",
    },
    "focus-ritual": {
      label: "Focus ritual",
      description: "A 30 minute ritual to align attention and steadiness.",
    },
  },
};

// Backward-compatible alias for legacy imports.
export const BRIDGE_WEEKEND_COPY = INTENSIVE_COPY;

export const INTENSIVE_THEME_PAGES_COPY = {
  sectionEyebrow: "Intensive themes",
  sectionTitle: "Choose a theme for your intensive",
  sectionBody:
    "",
  relatedThemesTitle: "Related intensive themes",
  relatedThemesBody:
    "If your situation spans multiple pressure points, review adjacent themes and start with the one that feels most urgent.",
  quotesTitle: "Practitioner perspectives",
  quotesBody: "Referenced ideas connected to intensive themes.",
  quoteSourcePrefix: "Source",
  quoteThemePrefix: "Theme",
  backToIntensiveLabel: "Back to Intensive",
  waitlistCtaLabel: "Join intensive waitlist",
  waitlistCtaHref: "/intensive#conversion",
  themes: [
    {
      slug: "before-we-commit",
      navLabel: "Before we commit",
      title: "Intensive Theme: Before We Commit",
      subtitle: "Make the commitment decision with structure, not pressure.",
      intro:
        "You can love each other and still feel stuck at the threshold. This intensive helps you name the real decision, cover the conversations people avoid, and write down what you are agreeing to. You leave with clarity, not a vague sense of progress.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "You are near a commitment decision and want structure.",
        "You want to discuss money, roles, kids, or family boundaries without spiraling.",
        "You are tired of looping conversations with no output.",
        "You want written agreements you can revisit.",
        "You can both show up for direct conversation, even if it is tense.",
        "You want clarity more than winning.",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "Clear list of commitment decisions and open questions",
        "Defined dealbreakers and workable integrated agreements",
        "Written agreements for money, time, roles, and boundaries",
        "A conflict and repair plan you both commit to try",
        "A decision timeline with check-in dates",
        "A next-step plan, together or apart",
      ],
      faq: [
        {
          question: "How long is the intensive?",
          answer:
            "The format is structured and concentrated, but the exact schedule depends on fit and logistics. The core goal is the same: cover the commitment decision, track choices, and produce written outputs you can use.",
        },
        {
          question: "Do we need to be in crisis to do this?",
          answer:
            "No. Many people use this theme to prevent crisis. If you can talk directly and want clarity, you can benefit even if things are mostly good.",
        },
        {
          question: "Will you tell us whether we should commit?",
          answer:
            "No. The intensive helps you make your own decision with clear information, specific agreements, and honest tradeoffs.",
        },
        {
          question: "What if we disagree on kids?",
          answer:
            "You will name the real decision, define what each position is trying to preserve, and explore whether there is a workable path. If there is not, the work supports a clean next step instead of endless debate.",
        },
        {
          question: "Can we include money and prenup-related conversations?",
          answer:
            "You can include money, budgeting, roles, and boundaries. For legal documents, you will still need legal counsel. The intensive helps you clarify preferences and write down rules you both can follow.",
        },
        {
          question: "What if one of us is afraid of commitment?",
          answer:
            "Fear is common. The work turns fear into specifics: what is at stake, what is needed, and what would build trust. Then you decide what is workable.",
        },
        {
          question: "Do we get anything in writing?",
          answer:
            "Yes. You leave with clear notes and draft agreements in plain language, designed to be reviewed and revised.",
        },
        {
          question: "What if conflict gets intense?",
          answer:
            "The intensive includes guardrails for pacing, repair, and taking breaks. If it is not safe to meet together, that is a different fit question.",
        },
        {
          question: "Can we do this if we already had premarital counseling?",
          answer:
            "Yes. This can be a more decision-focused reset, especially if prior work stayed high-level and did not produce concrete agreements.",
        },
        {
          question: "What happens if we decide not to commit?",
          answer:
            "If the answer is no, the intensive supports a respectful, practical next step so you do not keep reopening the wound.",
        },
      ],
    },
    {
      slug: "making-a-decision",
      navLabel: "Making a decision",
      title: "Intensive Theme: Making a Decision",
      subtitle: "Decide what happens next with structure and calm.",
      intro:
        "If you are stuck, the problem is often not effort. The problem is the lack of a decision process. This intensive helps you define the real choice, set criteria, and leave with a plan.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "When there's a desicion to be made but you're stalled out",
        "When you disagree and get stuck",
        "You want criteria and options, not endless processing.",
        "You want a respectful plan if the answer is no.",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "Space to clearly define thoughts and desires",
        "Guided exploration of what the risks are and what's at stake",
        "Practice communicating desires and hearing no",
        "Skills around integrated alignment",
        "An action plan for the future",
      ],
      faq: [
        {
          question: "Do we have to decide in one day?",
          answer:
            "No. The intensive is decision-focused, but it can also produce a clear trial plan with dates and criteria. The goal is to stop drifting.",
        },
        {
          question: "Can we do this if one person is leaning out?",
          answer:
            "Yes, if they will participate honestly. The process clarifies willingness and next steps.",
        },
        {
          question: "Will you push us to stay together?",
          answer:
            "No. The work supports clarity and practical next steps, not a preferred outcome.",
        },
        {
          question: "Can you help us set boundaries while we decide?",
          answer:
            "Yes. Boundaries are often the missing piece that prevents repeated escalation.",
        },
        {
          question: "What if separation is likely?",
          answer:
            "Then the intensive focuses on respectful planning, communication rules, and stability.",
        },
        {
          question: "Can we include co-parenting agreements?",
          answer:
            "You can include communication and cooperation agreements. Legal custody matters require legal guidance.",
        },
        {
          question: "What if we keep blaming each other?",
          answer:
            "The structure turns blame into requests and commitments, then tracks follow-through.",
        },
        {
          question: "Can we do this alongside mediation?",
          answer:
            "Yes. The intensive can help you show up prepared and reduce reactive conflict.",
        },
        {
          question: "Do we get written outputs?",
          answer:
            "Yes. You leave with plain-language agreements and a next-step plan.",
        },
        {
          question: "How do we start?",
          answer:
            "Join the waitlist. You will receive intake and proposed structure if it is a fit.",
        },
      ],
    },
    {
      slug: "important-transition",
      navLabel: "Important transition",
      title: "Intensive Theme: Important Transition",
      subtitle: "Update the relationship for the life you are living now.",
      intro:
        "Transitions break old agreements, even good ones. This intensive helps you renegotiate roles, routines, and boundaries so the relationship can hold the new reality.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "A major shift changed time, roles, or stress level.",
        "You want updated agreements that match reality.",
        "Conflict increased after the change.",
        "You need boundaries with work or family.",
        "One person feels overloaded.",
        "Space to discuss impact to identity and values",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "Updated roles and responsibilities map",
        "Communication rules that reduce daily conflict",
        "Boundaries with work, schedules, and family",
        "More clearly defined values and motivations",
        "Repair scripts for high-stress moments",
        "Clear next steps and review dates",
      ],
      faq: [
        {
          question: "What counts as an important transition?",
          answer:
            "Any major shift that changes time, roles, routines, or stress. The focus is the relationship update needed, not the label of the event.",
        },
        {
          question: "Do we have to be in crisis?",
          answer:
            "No. This theme often prevents crisis by updating agreements early.",
        },
        {
          question: "Will we create a schedule and roles plan?",
          answer:
            "Yes. You map ownership, standards, and limits in plain language.",
        },
        {
          question: "What if one person is overwhelmed?",
          answer:
            "The work clarifies capacity and renegotiates responsibilities with specifics.",
        },
        {
          question: "Can we address boundaries with work?",
          answer:
            "Yes. You will learn to better understand your capacity and set important boundaries.",
        },
        {
          question: "Can we address boundaries with family?",
          answer:
            "Yes. You can gain tools to clarify and uphold important values and boundaries.",
        },
        {
          question: "What if we disagree on priorities?",
          answer:
            "This collaborative process will help you better understand what matters and why.",
        },
        {
          question: "Do we get written outputs?",
          answer:
            "Yes, where relevant you can walk away with a guide.",
        },
        {
          question: "Is this location-specific?",
          answer:
            "No, it is location neutral and scheduling is handled privately.",
        },
        {
          question: "How do we start?",
          answer:
            "Join the waitlist and complete intake. If it is a fit, you receive a proposed structure.",
        },
      ],
    },
    {
      slug: "breach-of-trust",
      navLabel: "Breach of trust",
      title: "Intensive Theme: Breach of Trust",
      subtitle: "Repair trust with clear boundaries and measurable actions.",
      intro:
        "Broken trust creates constant questions and consistent elevated emotions. This intensive turns chaos into a plan: boundaries, transparency agreements, and repair steps you can track.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "When you have a full or partial disclosure that needs more space.",
        "You're confused or need clarity on how you got to this place.",
        "You want to understand the process of repair.",
        "You want to make more steady agreements for the future.",
        "You want a plan for questions and check-ins.",
        "You want to stop cycles of accusation and defensiveness.",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "Plain-language repair plan",
        "Transparency agreements that are specific and reviewable",
        "Rules for questions and check-ins",
        "Skills to manage triggers",
        "A decision path for staying or separating",
      ],
      faq: [
        {
          question: "Do we have to share every detail?",
          answer:
            "Not always. The intensive helps you decide what is necessary for repair versus what increases harm. You create a clear scope and container for questions.",
        },
        {
          question: "Will you tell us if we should stay together?",
          answer:
            "No. You decide. The intensive provides structure, agreements, and clarity on requirements.",
        },
        {
          question: "What if the breaching partner is defensive?",
          answer:
            "The intention is to support accountability and ownership of impact. A defensive partner will get better tools to manage their reactions.",
        },
        {
          question: "What if trust was broken more than once?",
          answer:
            "You've come to the right place so you can better understand how to prevent this from happening in the future.",
        },
        {
          question: "Can we address money secrecy?",
          answer:
            "Yes, financial secrecy is disruptive to relationships.",
        },
        {
          question: "What if triggers derail every talk?",
          answer:
            "You build pacing and repair steps, including how to pause and return.",
        },
        {
          question: "Do we get written outputs?",
          answer:
            "Yes. Agreements, timelines, and next steps in plain language.",
        },
        {
          question: "Is forgiveness the goal?",
          answer:
            "The goal is clarity and credible repair steps. Forgiveness is personal and cannot be forced.",
        },
        {
          question: "How do we start?",
          answer:
            "Join the waitlist, complete intake, and receive proposed structure if it is a fit.",
        },
      ],
    },
    {
      slug: "loss-of-spark-sexual-challenges",
      navLabel: "Loss of spark and sexual challenges",
      title: "Intensive Theme: Loss of Spark and Sexual Challenges",
      subtitle: "Reset the pressure loop and rebuild intimacy with clear agreements.",
      intro:
        "When intimacy gets tense, most people either push harder or avoid the topic. Both moves usually make it worse. This intensive helps you name the pattern, reduce pressure, and build agreements that support consent and pleasure.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "Desire mismatch or attraction concerns creates tension or silent distance.",
        "Sex conversations turn into debate, shutdown, or sarcasm.",
        "One person initiates and feels rejected, the other feels pressured.",
        "You find yourselves not talking about sex at all",
        "You have a concern around sexual health, functioning or pleasure",
        "You want to rebuild closeness without forcing outcomes.",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "Clear language for talking about intimacy without escalation",
        "A shared map of the pressure loop that drives avoidance and pursuit",
        "Boundaries that make no safer and yes more trustworthy",
        "A practical initiation plan that reduces guessing and resentment",
        "Processing through resentment, fear or pain that gets in the way",
        "Exercises in and out of session that support your growth",
      ],
      faq: [
        {
          question: "Is this about having more sex?",
          answer:
            "No. The intensive is about changing the pattern around intimacy so you can make decisions without pressure, guessing, or resentment.",
        },
        {
          question: "Do we have to talk about explicit details?",
          answer:
            "No. You control what you share. We focus on patterns, agreements, and skills. Specifics only come if they help you communicate clearly.",
        },
        {
          question: "What if one of us has lower desire?",
          answer:
            "That is common. We work on making no safe, reducing pressure, and building a plan that supports connection without coercion.",
        },
        {
          question: "What if we keep having the same fight?",
          answer:
            "We map the sequence, identify the trigger point, and build a new script for the moment it usually breaks down, including a repair step.",
        },
        {
          question: "Can this help if intimacy stopped after a big life change?",
          answer:
            "Yes. We take time to identify what gets in the way and design a plan that fits your current season.",
        },
        {
          question: "What if we are not sure we are compatible anymore?",
          answer:
            "The intensive can help you get specific. We clarify desires, limits, and what can change, then build a next-step decision plan.",
        },
        {
          question: "How private is this?",
          answer:
            "Very. The work is designed to be contained and practical. We do not require public sharing, group formats, or ongoing exposure.",
        },
        {
          question: "What if we struggle with talking without defensiveness?",
          answer:
            "That is exactly what the structure is for. We slow the process down, set rules, and practice language that keeps the conversation usable.",
        },
        {
          question: "What happens if we need more support afterward?",
          answer:
            "You will receive next-step recommendations. Some people choose follow-up sessions to implement and adjust. Others use the plan independently.",
        },
      ],
    },
    {
      slug: "communication-breakdown",
      navLabel: "Communication breakdown",
      title: "Intensive Theme: Communication Breakdown",
      subtitle: "Map the cycle, practice new skills, and leave with rules you can use.",
      intro:
        "If every hard topic turns into an argument, avoidance, or shutdown, more talking on your own usually does not fix it. This intensive maps the cycle in detail, slows the conversation down, and gives you live practice with new skills.",
      fitTitle: "When this theme fits",
      fitBullets: [
        "Arguments escalate fast and both of you lose the thread.",
        "One of you pursues while the other shuts down or goes quiet.",
        "You avoid hard topics because every talk becomes a fight.",
        "You want to practice new communication skills during the intensive, not just talk about them.",
        "You need a practical conflict plan with pause, resume, and repair steps.",
      ],
      outcomesTitle: "What you can expect",
      outcomesBullets: [
        "A shared map of the interaction cycle that keeps pulling you off course",
        "In-session practice with self-soothing and downshifting activation",
        "Curious listening skills that reduce defensiveness and clarify meaning",
        "Skill building in knowing yourself, thoughts, desires and requests",
        "Pause and resume rules for hard conversations at home",
      ],
      faq: [
        {
          question: "What does communication breakdown mean in this intensive?",
          answer:
            "It means your conversations keep getting pulled into the same cycle. That might look like escalation, criticism, defensiveness, shutting down, pursuing, or avoiding the topic altogether. The intensive focuses on changing that pattern in real time.",
        },
        {
          question: "Can this help if we keep having the same fight?",
          answer:
            "Yes. Repeating fights usually follow a predictable sequence. The intensive helps you map the trigger, the moves each person makes, and the point where the conversation breaks down, then practice a different sequence.",
        },
        {
          question: "What if one of us shuts down during conflict?",
          answer:
            "Shutdown is part of many cycles. The intensive helps both of you spot early activation, use downshifting skills, and follow pause and resume rules so the conversation does not collapse or get forced.",
        },
        {
          question: "What if one of us keeps pushing and the other avoids?",
          answer:
            "That pursue and avoid pattern is common. The work focuses on what each move is trying to accomplish, how it accidentally makes the cycle worse, and what to do instead when the pattern starts.",
        },
        {
          question: "Will we actually practice communication skills during the intensive?",
          answer:
            "Yes. This is not only insight work. You practice self-soothing, curious listening, cleaner requests, and short repair moves inside the session so the skills are concrete before you take them home.",
        },
        {
          question: "Can this help if we avoid hard topics altogether?",
          answer:
            "Yes. Avoidance is part of the cycle for many couples. The intensive helps you set topic boundaries, pacing, and turn-taking rules so difficult conversations become usable instead of overwhelming.",
        },
        {
          question: "What do we leave with in writing?",
          answer:
            "You leave with a written cycle map, pause and resume rules, a repair routine, examples of clean requests, and topic boundaries for the issues that usually derail you.",
        },
        {
          question: "Is this about who is right?",
          answer:
            "No. The focus is the pattern between you, not proving a winner. You still name impact and responsibility, but the goal is to make conversations more workable and more accurate.",
        },
        {
          question: "What if we have tried therapy before?",
          answer:
            "That can still fit. Many couples understand their pattern in theory but still need structured practice and a concrete home plan. The intensive focuses on implementation, not just insight.",
        },
        {
          question: "How do we start?",
          answer:
            "Join the waitlist. You will receive intake, and if the intensive fits your goals, you will get a proposed structure and next steps.",
        },
      ],
    },
  ],
} as const;
