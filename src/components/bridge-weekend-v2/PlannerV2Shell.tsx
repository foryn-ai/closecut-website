"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ctaClass } from "@/components/shared/cta";
import { INTENSIVE_COPY } from "@/lib/copy/intensive";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import {
  btnSecondary,
  card,
  divider,
  focusRing,
  input,
} from "@/lib/ui/classes";
import {
  getAgendaSlotsByDay,
  serializeAgendaForWaitlist,
  validateAgendaState,
  type AgendaValidationError,
} from "@/lib/planner-v2/engine";
import {
  AGENDA_DAYS,
  SKILL_IDS,
  THEME_IDS,
  createAgendaState,
  type AgendaDay,
  type AgendaSlot,
  type SkillId,
  type ThemeId,
} from "@/lib/planner-v2/model";
import { buildStarterSkillPlan } from "@/lib/planner-v2/starterPlan";

type WaitlistSubmitState = "idle" | "submitting" | "success" | "error" | "spam";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function errorMessage(error: AgendaValidationError) {
  const template = INTENSIVE_COPY.plannerV2.errors;
  switch (error.code) {
    case "skills-cap":
      return template.skillsCap;
    case "missing-theme-for-skills":
      return template.missingThemeForSkills;
    case "missing-skills-for-theme":
      return template.missingSkillsForTheme;
    case "expert-held-day-cap":
      return template.expertHeldDayCap;
    case "expert-held-needs-theme":
      return template.expertHeldNeedsTheme;
    case "day-missing-theme":
      return template.dayMissingTheme;
    case "unknown-slot":
    default:
      return template.unknownSlot;
  }
}

function cloneAgendaState(state: ReturnType<typeof createAgendaState>) {
  const slots = {} as ReturnType<typeof createAgendaState>["slots"];
  Object.entries(state.slots).forEach(([slotId, slot]) => {
    slots[slotId as AgendaSlot["id"]] = {
      ...slot,
      skillIds: [...slot.skillIds],
    };
  });
  return { slots };
}

function getUniqueSkillsForDay(state: ReturnType<typeof createAgendaState>, day: AgendaDay) {
  const ordered = getAgendaSlotsByDay(state, day).flatMap((slot) => slot.skillIds);
  return [...new Set(ordered)];
}

export function PlannerV2Shell() {
  const copy = INTENSIVE_COPY.plannerV2;
  const [state, setState] = useState(() => createAgendaState());
  const [errors, setErrors] = useState<AgendaValidationError[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId | null>(null);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistWebsite, setWaitlistWebsite] = useState("");
  const [waitlistStartedAt] = useState(() => Date.now());
  const [waitlistSubmitState, setWaitlistSubmitState] =
    useState<WaitlistSubmitState>("idle");

  const waitlistSubmitLabel =
    waitlistSubmitState === "submitting"
      ? copy.waitlist.submittingLabel
      : copy.waitlist.submitLabel;

  const waitlistStatusMessage =
    waitlistSubmitState === "success"
      ? copy.waitlist.successMessage
      : waitlistSubmitState === "spam"
        ? copy.waitlist.spamBlockedMessage
        : waitlistSubmitState === "error"
          ? copy.waitlist.errorMessage
          : "";

  const handleApplyStarterTheme = (themeId: ThemeId) => {
    const starterPlan = buildStarterSkillPlan(themeId);
    const nextState = createAgendaState();

    (["day1", "day2"] as const).forEach((day) => {
      const daySkills = day === "day1" ? starterPlan.day1 : starterPlan.day2;
      getAgendaSlotsByDay(nextState, day).forEach((slot, index) => {
        const start = index * 2;
        const nextSlot = nextState.slots[slot.id];
        nextSlot.themeId = themeId;
        nextSlot.skillIds = daySkills.slice(start, start + 2);
      });
    });

    setSelectedThemeId(themeId);
    setErrors([]);
    setState(nextState);
  };

  const handleAddSkillToPlanner = (skillId: SkillId, day: AgendaDay) => {
    if (!selectedThemeId) {
      setErrors([{ code: "missing-theme-for-skills" }]);
      return;
    }

    const alreadyIncludedForDay = getAgendaSlotsByDay(state, day).some((slot) =>
      slot.skillIds.includes(skillId),
    );
    if (alreadyIncludedForDay) return;
    const alreadyIncludedAnywhere = Object.values(state.slots).some((slot) =>
      slot.skillIds.includes(skillId),
    );
    if (alreadyIncludedAnywhere) return;

    const nextState = cloneAgendaState(state);
    const targetSlot =
      getAgendaSlotsByDay(nextState, day).find(
        (item) => item.themeId && item.skillIds.length < 3,
      ) ?? null;

    if (!targetSlot) {
      setErrors([{ code: "skills-cap" }]);
      return;
    }

    nextState.slots[targetSlot.id].skillIds.push(skillId);
    const validationErrors = validateAgendaState(nextState);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setState(nextState);
  };

  const handleClearAll = () => {
    setState(createAgendaState());
    setSelectedThemeId(null);
    setErrors([]);
  };

  const handleWaitlistSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAgendaState(state, { enforceCompleteness: true });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setWaitlistSubmitState("idle");
      return;
    }
    setWaitlistSubmitState("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: waitlistEmail,
          website: waitlistWebsite,
          startedAt: waitlistStartedAt,
          source: "intensive-v2",
          campaignAttribution: getCampaignAttribution(),
          plannerSummary: serializeAgendaForWaitlist(state),
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; code?: string };
      if (!response.ok || !payload.ok) {
        if (response.status === 429 || payload.code === "spam_blocked") {
          setWaitlistSubmitState("spam");
          return;
        }
        setWaitlistSubmitState("error");
        return;
      }

      setWaitlistSubmitState("success");
      setWaitlistEmail("");
      setWaitlistWebsite("");
    } catch {
      setWaitlistSubmitState("error");
    }
  };

  return (
    <div className="space-y-12">
      <motion.section
        {...fadeIn}
        className={`${card} space-y-6 rounded-xl border border-border p-6`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="h-[3px] w-16 rounded-full bg-[var(--accent-warm)]" />
            <h2 className="font-heading text-2xl text-heading">{copy.title}</h2>
            <p className="text-sm text-body">{copy.subtitle}</p>
            <p className="text-sm text-body">{copy.note}</p>
          </div>
          <button
            type="button"
            onClick={handleClearAll}
            className={`${btnSecondary} ${focusRing} rounded-md px-4 py-2 text-sm font-semibold`}
          >
            {copy.clearAllLabel}
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-lg text-heading">{copy.starterThemesTitle}</h3>
          <p className="text-sm text-body">{copy.starterThemesHelper}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {THEME_IDS.map((themeId) => {
              const isSelected = selectedThemeId === themeId;
              return (
                <button
                  key={`starter-${themeId}`}
                  type="button"
                  onClick={() => handleApplyStarterTheme(themeId)}
                  className={`${btnSecondary} w-full justify-start px-3 py-2 text-sm ${focusRing} ${isSelected ? "border-[var(--accent-warm)] bg-[rgba(201,109,66,0.1)] text-heading" : ""}`}
                >
                  {copy.themes[themeId]}
                </button>
              );
            })}
          </div>
          {selectedThemeId ? (
            <p className="inline-flex w-fit rounded-full border border-[var(--accent-warm)] bg-[rgba(201,109,66,0.12)] px-3 py-1 text-xs text-heading">
              {copy.starterAppliedLabel}: {copy.themes[selectedThemeId]}
            </p>
          ) : null}
        </div>

        {errors.length > 0 ? (
          <div className="rounded-md border border-border bg-[rgba(212,175,55,0.12)] px-4 py-3 text-sm text-heading">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{copy.errorIntro}</p>
            <p>{errorMessage(errors[0])}</p>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          {AGENDA_DAYS.map((day) => {
            const skills = getUniqueSkillsForDay(state, day);
            return (
              <section key={day} className="rounded-lg border border-border bg-canvas p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-warm)]" />
                  <h3 className="font-heading text-lg text-heading">{copy.dayLabels[day]}</h3>
                </div>
                {skills.length === 0 ? (
                  <p className="mt-2 text-sm text-body">{copy.noSkillsSelectedLabel}</p>
                ) : (
                  <ul className="mt-2 grid gap-2">
                    {skills.map((skillId) => (
                      <li
                        key={`${day}-${skillId}`}
                        className="rounded-md border border-border bg-surface-1 px-3 py-2 text-sm text-heading"
                      >
                        {copy.skills[skillId].label}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        <details className="rounded-md border border-border bg-surface-1 p-4">
          <summary className={`cursor-pointer text-sm font-semibold text-heading ${focusRing}`}>
            {copy.skillLibraryTitle}
          </summary>
          <p className="mt-2 text-xs text-body">{copy.skillLibraryHelper}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {SKILL_IDS.map((skillId) => {
              const isAddedDay1 = getAgendaSlotsByDay(state, "day1").some((slot) =>
                slot.skillIds.includes(skillId),
              );
              const isAddedDay2 = getAgendaSlotsByDay(state, "day2").some((slot) =>
                slot.skillIds.includes(skillId),
              );
              const isAddedAnywhere = isAddedDay1 || isAddedDay2;
              return (
                <div
                  key={`library-${skillId}`}
                  className="rounded-md border border-border bg-canvas p-3"
                >
                  <p className="text-sm text-heading">{copy.skills[skillId].label}</p>
                  <p className="mt-1 text-xs text-body">{copy.skills[skillId].shortDefinition}</p>
                  <p className="mt-1 text-xs text-heading">
                    {copy.skills[skillId].observableMarker}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddSkillToPlanner(skillId, "day1")}
                      disabled={isAddedAnywhere || !selectedThemeId}
                      className={`${btnSecondary} px-2 py-1 text-xs ${focusRing}`}
                    >
                      {isAddedDay1
                        ? copy.skillLibraryAddedDay1Label
                        : isAddedAnywhere
                          ? copy.skillLibraryAlreadyInPlannerLabel
                        : copy.skillLibraryAddDay1Label}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddSkillToPlanner(skillId, "day2")}
                      disabled={isAddedAnywhere || !selectedThemeId}
                      className={`${btnSecondary} px-2 py-1 text-xs ${focusRing}`}
                    >
                      {isAddedDay2
                        ? copy.skillLibraryAddedDay2Label
                        : isAddedAnywhere
                          ? copy.skillLibraryAlreadyInPlannerLabel
                        : copy.skillLibraryAddDay2Label}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      </motion.section>

      <section
        id="conversion"
        className={`space-y-8 border-t ${divider} pt-10`}
        aria-label={copy.waitlist.zoneLabel}
      >
        <div className="space-y-2">
          <h2 className="font-heading text-2xl text-heading">{copy.waitlist.heading}</h2>
          <p className="text-sm text-body">{copy.waitlist.helper}</p>
        </div>

        <div className={`${card} max-w-xl rounded-xl border border-border p-6`}>
          <form className="flex flex-col gap-3" onSubmit={handleWaitlistSubmit}>
            <input
              type="email"
              required
              value={waitlistEmail}
              onChange={(event) => setWaitlistEmail(event.target.value)}
              placeholder={copy.waitlist.inputPlaceholder}
              className={`w-full ${input} ${focusRing} transition focus:border-primary`}
              maxLength={320}
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={waitlistWebsite}
              onChange={(event) => setWaitlistWebsite(event.target.value)}
              className="hidden"
            />
            <button
              type="submit"
              disabled={waitlistSubmitState === "submitting"}
              className={ctaClass(
                "primary",
                "!bg-[var(--accent-warm)] !text-canvas hover:!bg-[#b85f36]",
              )}
            >
              {waitlistSubmitLabel}
            </button>
            <p className="text-xs text-body">{copy.waitlist.microline}</p>
            {waitlistStatusMessage ? (
              <p className="text-xs text-body">{waitlistStatusMessage}</p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
