"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ctaClass } from "@/components/shared/cta";
import { IconBadge } from "@/components/shared/IconBadge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { track } from "@/lib/analytics/adapter";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import { card } from "@/lib/ui/classes";

type FitCheckCopy = typeof import("@/lib/copy/intensive").intensiveFitCheckCopy;
type FitCheckResultsCopy = typeof import("@/lib/copy/intensive").intensiveFitCheckResults;

type AnswerValue = FitCheckCopy["answers"][number]["value"];
type ResultType = keyof FitCheckResultsCopy["results"];

type StepAnswerMap = Partial<Record<FitCheckCopy["steps"][number]["id"], string>>;

const fadeTransition = {
  duration: 0.8,
  ease: [0.22, 0.61, 0.36, 1] as const,
};

const RESULT_WHY_ICONS: Record<ResultType, string[]> = {
  weekly: ["/icons/clock.svg", "/icons/arrow-clockwise.svg", "/icons/calendar-blank.svg"],
  consult: ["/icons/compass-rose.svg", "/icons/binoculars.svg", "/icons/path.svg"],
  intensive: ["/icons/waves.svg", "/icons/arrows-out.svg", "/icons/calendar-star.svg"],
};

function getQuizImageClass(src: string) {
  return src.startsWith("/furniture/")
    ? "object-contain p-4 sm:p-6"
    : "object-cover";
}

type IntensiveFitCheckClientProps = {
  copy: FitCheckCopy;
  resultsCopy: FitCheckResultsCopy;
};

export function IntensiveFitCheckClient({ copy, resultsCopy }: IntensiveFitCheckClientProps) {
  const [screenIndex, setScreenIndex] = useState(-1);
  const [answers, setAnswers] = useState<StepAnswerMap>({});
  const trackedResultRef = useRef<ResultType | null>(null);
  const viewedStepIdsRef = useRef<Set<string>>(new Set());
  const lastSeenStepRef = useRef<{ stepId: string; stepIndex: number } | null>(null);

  const activeStep = screenIndex >= 0 ? copy.steps[screenIndex] : null;
  const isResultScreen = screenIndex >= copy.steps.length;
  const totalSteps = copy.steps.length;

  const scoreByAnswer = useMemo(() => {
    return Object.fromEntries(copy.answers.map((answer) => [answer.value, answer.score])) as Record<
      AnswerValue,
      number
    >;
  }, [copy.answers]);

  const resultType = useMemo<ResultType | null>(() => {
    if (!isResultScreen) return null;

    return getResultTypeFromAnswers();
  }, [answers, copy.scoring, isResultScreen, scoreByAnswer]);

  const analyticsPayload = useMemo(() => {
    const attribution = getCampaignAttribution();

    return {
      selected_stuck_area: answers["stuck-area"] ?? "",
      momentum_answer: answers.momentum ?? "",
      structure_answer: answers.structure ?? "",
      logistics_answer: answers.logistics ?? "",
      readiness_answer: answers.readiness ?? "",
      result_type: resultType ?? "",
      source: attribution.utmSource ?? attribution.landingPath ?? attribution.referrer ?? "direct",
      timestamp: new Date().toISOString(),
    };
  }, [answers, resultType]);

  useEffect(() => {
    if (!resultType || trackedResultRef.current === resultType) return;

    track(ANALYTICS_EVENTS.intensiveFitCheckComplete, analyticsPayload);
    trackedResultRef.current = resultType;
  }, [analyticsPayload, resultType]);

  useEffect(() => {
    if (screenIndex < 0) return;

    if (activeStep) {
      lastSeenStepRef.current = { stepId: String(activeStep.id), stepIndex: screenIndex + 1 };

      if (!viewedStepIdsRef.current.has(String(activeStep.id))) {
        viewedStepIdsRef.current.add(String(activeStep.id));
        track(ANALYTICS_EVENTS.intensiveFitCheckStepView, {
          ...analyticsPayload,
          step_id: activeStep.id,
          step_index: screenIndex + 1,
          step_total: totalSteps,
        });
      }

      return;
    }

    if (isResultScreen) {
      lastSeenStepRef.current = { stepId: "result", stepIndex: totalSteps + 1 };
    }
  }, [activeStep, analyticsPayload, isResultScreen, screenIndex, totalSteps]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState !== "hidden") return;
      if (trackedResultRef.current || screenIndex < 0) return;

      const lastSeenStep = lastSeenStepRef.current;
      track(ANALYTICS_EVENTS.intensiveFitCheckExit, {
        ...analyticsPayload,
        step_id: lastSeenStep?.stepId ?? "hero",
        step_index: lastSeenStep?.stepIndex ?? 0,
      });
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [analyticsPayload, screenIndex]);

  const progressLabel = activeStep
    ? copy.progressLabel
        .replace("{current}", String(screenIndex + 1))
        .replace("{total}", String(totalSteps))
    : "";

  const selectedCategoryAddOn =
    resultType && answers["stuck-area"]
      ? resultsCopy.categoryAddOns[
          answers["stuck-area"] as keyof typeof resultsCopy.categoryAddOns
        ]
      : null;

  const currentAnswer = activeStep ? answers[activeStep.id] ?? "" : "";
  const resultEntry = resultType ? resultsCopy.results[resultType] : null;

  function getResultTypeFromAnswers(): ResultType {
    const momentum = scoreByAnswer[(answers.momentum as AnswerValue | undefined) ?? "not-really"] ?? 0;
    const structure = scoreByAnswer[(answers.structure as AnswerValue | undefined) ?? "not-really"] ?? 0;
    const logistics = scoreByAnswer[(answers.logistics as AnswerValue | undefined) ?? "not-really"] ?? 0;
    const readiness = (answers.readiness as AnswerValue | undefined) ?? "not-really";

    if (readiness === "not-really") {
      return "consult";
    }

    const total = momentum + structure + logistics;

    if (total <= 2) return "weekly";
    if (total <= 4) return "consult";
    return "intensive";
  }

  function moveNext() {
    setScreenIndex((current) => current + 1);
  }

  function handleStart() {
    track(ANALYTICS_EVENTS.intensiveFitCheckStart, analyticsPayload);
    setScreenIndex(0);
  }

  function handleBack() {
    if (isResultScreen) {
      setScreenIndex(copy.steps.length - 1);
      return;
    }

    setScreenIndex((current) => Math.max(-1, current - 1));
  }

  function handleRestart() {
    trackedResultRef.current = null;
    setAnswers({});
    setScreenIndex(-1);
  }

  function handleAnswer(stepId: FitCheckCopy["steps"][number]["id"], value: string) {
    track(ANALYTICS_EVENTS.intensiveFitCheckAnswer, {
      ...analyticsPayload,
      step_id: stepId,
      answer_value: value,
    });

    setAnswers((current) => ({
      ...current,
      [stepId]: value,
    }));
  }

  function handleContinue() {
    if (!activeStep) return;
    if (!currentAnswer) return;
    moveNext();
  }

  const screenKey = isResultScreen
    ? `result-${resultType ?? "pending"}`
    : activeStep
      ? String(activeStep.id)
      : "hero";

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-lg items-stretch px-3 py-3 sm:px-6 sm:py-6">
      <AnimatePresence mode="wait">
        <motion.section
          key={screenKey}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={fadeTransition}
          className={`${card} flex min-h-0 w-full flex-col overflow-hidden rounded-[28px] bg-canvas sm:min-h-[calc(100svh-3rem)]`}
        >
          {!activeStep && !isResultScreen ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative h-[22svh] min-h-[120px] max-h-[180px] w-full overflow-hidden border-b border-border bg-surface-2 sm:h-[26svh] sm:max-h-[220px]">
                <Image
                  src={copy.hero.imageSrc}
                  alt={copy.hero.imageAlt}
                  fill
                  className={getQuizImageClass(copy.hero.imageSrc)}
                  sizes="(min-width: 640px) 32rem, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
                <div className="space-y-3">
                  <Heading role="h1Page" className="text-center text-balance text-[clamp(1.75rem,6vw,2.3rem)] leading-[1.02]">
                  {copy.hero.title}
                  </Heading>
                  <Text
                    role="bodySmall"
                    className="mx-auto max-w-[24rem] text-center text-balance text-[0.96rem] leading-6 text-body"
                  >
                    {copy.hero.subhead}
                  </Text>
                  <Text
                    role="fine"
                    className="mx-auto max-w-[22rem] text-center text-[0.84rem] leading-5 text-body"
                  >
                    {copy.hero.body}
                  </Text>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <button type="button" className={ctaClass("primary")} onClick={handleStart}>
                    {copy.hero.primaryCtaLabel}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {activeStep ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative h-[19svh] min-h-[104px] max-h-[160px] w-full overflow-hidden border-b border-border bg-surface-2 sm:h-[23svh] sm:max-h-[190px]">
                <Image
                  src={activeStep.imageSrc}
                  alt={activeStep.imageAlt}
                  fill
                  className={getQuizImageClass(activeStep.imageSrc)}
                  sizes="(min-width: 640px) 32rem, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <Text role="eyebrow" className="text-primary">
                    {progressLabel}
                  </Text>
                  {screenIndex >= 0 ? (
                    <button
                      type="button"
                      className={ctaClass("tertiary", "h-auto rounded-none p-0 text-[15px]")}
                      onClick={handleBack}
                    >
                      {copy.shared.backLabel}
                    </button>
                  ) : null}
                </div>
                <div className="space-y-2 text-center">
                  <Heading role="h2" className="text-balance text-[clamp(1.45rem,5.6vw,2rem)] leading-[1.08]">
                    {activeStep.title}
                  </Heading>
                  <Text
                    role="fine"
                    className="mx-auto max-w-[24rem] text-balance text-[0.84rem] leading-5 text-body"
                  >
                    {activeStep.helper}
                  </Text>
                </div>
                <div className="flex-1 space-y-2.5">
                  {"options" in activeStep
                    ? activeStep.options.map((option) => {
                        const isSelected = currentAnswer === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            className={`w-full rounded-2xl border px-4 py-3.5 text-left transition ${
                              isSelected
                                ? "border-primary bg-surface-2 text-heading"
                                : "border-border bg-canvas text-heading hover:bg-surface-1"
                            }`}
                            onClick={() => handleAnswer(activeStep.id, option.value)}
                          >
                            <Text role="bodySmall" as="span" className="font-medium text-heading">
                              {option.label}
                            </Text>
                          </button>
                        );
                      })
                    : copy.answers.map((answer) => {
                        const isSelected = currentAnswer === answer.value;
                        return (
                          <button
                            key={answer.value}
                            type="button"
                            className={`w-full rounded-2xl border px-4 py-3.5 text-left transition ${
                              isSelected
                                ? "border-primary bg-surface-2 text-heading"
                                : "border-border bg-canvas text-heading hover:bg-surface-1"
                            }`}
                            onClick={() => handleAnswer(activeStep.id, answer.value)}
                          >
                            <Text role="body" as="span" className="font-medium text-heading">
                              {answer.label}
                            </Text>
                          </button>
                        );
                      })}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    className={ctaClass("primary")}
                    disabled={!currentAnswer}
                    onClick={handleContinue}
                  >
                    {activeStep.ctaLabel}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {isResultScreen && resultType && resultEntry ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="relative h-[22svh] min-h-[120px] max-h-[180px] w-full overflow-hidden border-b border-border bg-surface-2 sm:h-[26svh] sm:max-h-[220px]">
                <Image
                  src={resultEntry.imageSrc}
                  alt={resultEntry.imageAlt}
                  fill
                  className={getQuizImageClass(resultEntry.imageSrc)}
                  sizes="(min-width: 640px) 32rem, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <Text role="eyebrow" className="text-primary">
                    {resultsCopy.shared.kicker}
                  </Text>
                  <button
                    type="button"
                    className={ctaClass("tertiary", "h-auto rounded-none p-0 text-[15px]")}
                    onClick={handleRestart}
                  >
                    {copy.shared.restartLabel}
                  </button>
                </div>
                <div className="mx-auto max-w-[30rem] space-y-3 text-center">
                  <Heading role="h2" className="text-balance text-[clamp(1.55rem,5.8vw,2.1rem)] leading-[1.06]">
                    {resultEntry.headline}
                  </Heading>
                  <Text
                    role="body"
                    className="mx-auto max-w-[26rem] text-balance text-[0.95rem] leading-6 text-body"
                  >
                    {resultEntry.summary}
                  </Text>
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-surface-1 p-4">
                  <Text role="eyebrow" className="text-primary">
                    {resultsCopy.shared.sectionLabels.why}
                  </Text>
                  <ul className="mt-3 space-y-3">
                    {resultsCopy.ui.showCategoryAddOn && selectedCategoryAddOn ? (
                      <li className="rounded-xl bg-canvas px-3 py-3">
                        <div className="flex items-start gap-3">
                          <IconBadge src="/icons/target.svg" size={30} variant="soft" className="shrink-0" />
                          <Text role="bodySmall" className="pt-1 text-[0.92rem] leading-5 font-medium text-heading">
                            {selectedCategoryAddOn}
                          </Text>
                        </div>
                      </li>
                    ) : null}
                    {resultEntry.why.map((item: string, index: number) => (
                      <li key={item} className="rounded-xl bg-canvas px-3 py-3">
                        <div className="flex items-start gap-3">
                          <IconBadge
                            src={RESULT_WHY_ICONS[resultType][index] ?? "/icons/asterisk.svg"}
                            size={30}
                            variant="soft"
                            className="shrink-0"
                          />
                          <Text role="bodySmall" className="pt-1 text-[0.92rem] leading-5 text-body">
                            {item}
                          </Text>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
