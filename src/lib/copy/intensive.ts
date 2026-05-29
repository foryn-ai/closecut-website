export * from "./therafoxWebsite";

export const intensiveFitCheckCopy = {
  slug: "intensive-fit-check",
  hero: {
    title: "Intensive Fit Check",
    subhead:
      "A quick way to sort whether weekly therapy or a private intensive may fit best right now.",
    body:
      "",
    primaryCtaLabel: "Start the fit check",
    imageSrc: "/furniture/lamp-elevation-color-2.png",
    imageAlt: "Lamp furniture illustration",
  },
  progressLabel: "Question {current} of {total}",
  shared: {
    backLabel: "Back",
    restartLabel: "Start over",
    resultLabel: "Your result",
    categoryAddOnLabel: "Based on what feels most stuck",
  },
  answers: [
    { value: "not-really", label: "Not really", score: 0 },
    { value: "somewhat", label: "Somewhat", score: 1 },
    { value: "yes", label: "Yes", score: 2 },
  ],
  steps: [
    {
      id: "stuck-area",
      type: "single-select",
      title: "What feels most stuck right now?",
      helper:
        "Pick the one that feels closest.",
      options: [
        { value: "communication", label: "Differentiation of Self" },
        { value: "decision-making", label: "Decision making" },
        { value: "betrayal-or-rupture", label: "Betrayal or rupture" },
        { value: "intimacy-or-sex", label: "Intimacy or sex" },
        { value: "major-transition", label: "A major transition" },
      ],
      ctaLabel: "Continue",
      scored: false,
      imageSrc: "/furniture/coat-racks-elevation-color.png",
      imageAlt: "Coat rack furniture illustration",
    },
    {
      id: "momentum",
      type: "single-select",
      title: "Do you keep losing momentum in weekly conversations or sessions?",
      helper:
        "It feels like you keep re-entering the same issue instead of staying with it long enough to move it.",
      ctaLabel: "Next",
      scored: true,
      imageSrc: "/furniture/clock-elevation-color.png",
      imageAlt: "Clock furniture illustration",
    },
    {
      id: "structure",
      type: "single-select",
      title: "Would concentrated time and structure help right now?",
      helper:
        "Not more talking for its own sake. More room to stay with the work.",
      ctaLabel: "Next",
      scored: true,
      imageSrc: "/furniture/file-cabinet-2.svg",
      imageAlt: "File cabinet furniture illustration",
    },
    {
      id: "logistics",
      type: "single-select",
      title: "Would one protected weekend be easier to arrange than weekly scheduling?",
      helper:
        "For some couples, one weekend is easier than coordinating calendars, childcare, or travel every week.",
      ctaLabel: "Next",
      scored: true,
      imageSrc: "/furniture/plant-pot-1.svg",
      imageAlt: "Plant pot furniture illustration",
    },
    {
      id: "readiness",
      type: "single-select",
      title: "Are both of you ready for direct communication, even if it feels uncomfortable?",
      helper:
        "The question is not whether the conversation will be easy. It is whether both people are willing to show up for it.",
      ctaLabel: "See result",
      scored: false,
      gate: true,
      imageSrc: "/furniture/couch-2-elevation-color.png",
      imageAlt: "Couch furniture illustration",
    },
  ],
  scoring: {
    scoredQuestionIds: ["momentum", "structure", "logistics"],
    readinessQuestionId: "readiness",
    weeklyRange: [0, 2],
    consultRange: [3, 4],
    intensiveRange: [5, 6],
    readinessOverride:
      "If readiness = not-really, show consult result regardless of score.",
  },
  categoryAddOns: {
    communication:
      "You may be dealing less with one hard conversation and more with a pattern that needs enough time to slow down and understand.",
    "decision-making":
      "When an important decision feels hard to hold week to week, a more concentrated format can sometimes help bring clarity.",
    "betrayal-or-rupture":
      "Managing a rupture often needs structure, pacing, and enough room to stay with what is hard without losing the thread.",
    "intimacy-or-sex":
      "Sex and intimacy can be part of this work. You do not need a separate perfect reason to bring them into the conversation.",
    "major-transition":
      "Transitions often put pressure on a relationship even when nobody is doing anything wrong. Sometimes the work is about making enough space for the transition together.",
  },
  completion: {
    title: "Want to talk through the result?",
    body:
      "A free 20 minute consult is a simple way to begin. We will talk fit, availability, and next steps.",
    primaryCtaLabel: "Book a consult",
    primaryCtaHref: "/contact",
  },
  analytics: {
    capture: [
      "selected_stuck_area",
      "momentum_answer",
      "structure_answer",
      "logistics_answer",
      "readiness_answer",
      "result_type",
      "cta_clicked",
      "source",
      "timestamp",
    ],
  },
} as const;

export const intensiveFitCheckResults = {
  shared: {
    kicker: "Your result",
    sectionLabels: {
      why: "Why this result came up",
      actions: "Next steps",
    },
    actions: {
      consult: {
        id: "book-consult",
        label: "Book a consult",
        href: "/contact",
      },
    },
  },
  results: {
    weekly: {
      id: "weekly",
      badge: "Steady Rhythm",
      headline: "Weekly therapy may fit best right now.",
      summary:
        "Your answers suggest this may be a better season for steady ongoing support than a concentrated format.",
      why: [
        "A steady rhythm may fit better than a protected weekend right now.",
        "Returning over time may help more than concentrating the work.",
        "A slower container may be the better fit for this season.",
      ],
      imageSrc: "/furniture/tall-storage-baskets.svg",
      imageAlt: "Tall storage baskets furniture illustration",
    },
    consult: {
      id: "consult",
      badge: "Needs Clarity",
      headline: "A consult would help sort the best fit.",
      summary:
        "Your answers suggest there is real pressure here, but the right container is not fully clear from a short check alone.",
      why: [
        "Some signs point toward wanting more structure or momentum.",
        "Other parts of the picture need more context first.",
        "A consult can help sort the next best container.",
      ],
      imageSrc: "/furniture/pink-side-computer.svg",
      imageAlt: "Pink side computer furniture illustration",
    },
    intensive: {
      id: "intensive",
      badge: "More Space",
      headline: "A private intensive may fit.",
      summary:
        "Your answers suggest that more continuous time, more structure, and a protected container may help more than a stop-start weekly rhythm right now.",
      why: [
        "Momentum may keep getting lost.",
        "Concentrated time may help you stay with the work long enough to move it.",
        "One protected weekend may be easier than weekly scheduling.",
      ],
      imageSrc: "/furniture/desk-lamp.svg",
      imageAlt: "Desk lamp furniture illustration",
    },
  },
  categoryAddOns: {
    communication:
      "This may be less about one bad conversation and more about a pattern that needs enough time to slow down.",
    "decision-making":
      "When an important decision is hard to hold week to week, more structure can help bring clarity.",
    "betrayal-or-rupture":
      "Repair often needs pacing, structure, and enough room to stay with what is hard.",
    "intimacy-or-sex":
      "Sex and intimacy can be part of this work. You do not need a separate perfect reason to bring them into the conversation.",
    "major-transition":
      "Transitions can put real pressure on a relationship, even when nobody is doing anything wrong.",
  },
  ui: {
    layoutOrder: [
      "kicker",
      "badge",
      "headline",
      "summary",
      "why",
      "actions",
    ],
    showCategoryAddOn: true,
  },
} as const;

export function getIntensiveFitCheckResult(params: {
  momentum: 0 | 1 | 2;
  structure: 0 | 1 | 2;
  logistics: 0 | 1 | 2;
  readiness: "not-really" | "somewhat" | "yes";
}) {
  const { momentum, structure, logistics, readiness } = params;

  if (readiness === "not-really") return "consult";

  const total = momentum + structure + logistics;

  if (total <= 2) return "weekly";
  if (total <= 4) return "consult";
  return "intensive";
}
