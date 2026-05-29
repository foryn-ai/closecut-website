# Intensive V2 Direction

## Confirmed direction
- Move from drag-and-drop itinerary mechanics to a simpler slot selection flow.
- Shift page and planner language toward a two-day agenda centered on themes and skills.
- Keep the existing full-feature planner logic and UI available for future reuse in a separate context.
- Tighten alignment with copy architecture so visible strings are sourced from `src/lib/copy/intensive.ts`.

## Product framing for V2
- Planning object: agenda slots, not personal moments.
- Slot content: theme + skill pairings, not micro-itinerary items.
- Output: clear draft agenda for Day 1 and Day 2 with practical emphasis and pacing.

## Recommended implementation strategy

### 1. Preserve V1 planner intact
- Keep current granular planner engine in `src/lib/pricing/intensive.ts`.
- Keep current planner UI in `src/components/bridge-weekend/PlannerShell.tsx`.
- Do not delete or mutate V1 behavior except for bugfixes.

### 2. Introduce V2 planner modules in parallel
- Add `src/lib/planner-v2/model.ts` for theme/skill data model.
- Add `src/lib/planner-v2/engine.ts` for slot assignment and validation.
- Add `src/components/bridge-weekend-v2/PlannerV2Shell.tsx` for simplified UI.
- Add `src/components/bridge-weekend-v2/AgendaGrid.tsx` for day/slot rendering.

### 3. Route-level toggle for safe rollout
- Keep `/intensive` as canonical route.
- Add a temporary feature toggle at page level:
  - `?planner=v2` uses new slot selector.
  - default remains current planner until content and QA are complete.

### 4. Copy system updates
- Add a dedicated `fortyEightV2` section in `src/lib/copy/intensive.ts` for all visible strings.
- Keep all SEO strings only in `src/lib/seo/intensive.ts`.
- Remove inline copy from component internals where present (for example export labels).

### 5. Share and conversion compatibility
- Keep waitlist endpoint unchanged initially: `app/api/waitlist/route.ts`.
- Send a V2 summary payload with theme and skill totals.
- Keep short-link and share routes, but align share rendering to V2 structure.

## V2 data model proposal

```ts
export type AgendaDay = "day1" | "day2";
export type AgendaPeriod = "morning" | "afternoon" | "evening";

export type ThemeId =
  | "differentiation-of-self"
  | "managing-relational-tension"
  | "integrated-alignment"
  | "functional-autonomy";

export type SkillId =
  | "pattern-mapping"
  | "reactivity-pause"
  | "clear-request"
  | "boundary-language"
  | "repair-sequence"
  | "weekly-alignment-loop";

export type AgendaSlot = {
  id: string;
  day: AgendaDay;
  period: AgendaPeriod;
  themeId: ThemeId | null;
  skillIds: SkillId[];
  isExpertHeld: boolean;
};
```

## Interaction model for simpler slot selection
- User picks a slot card.
- User selects one theme (required).
- User selects 1-3 skills (required).
- Optional toggle for expert-held support in slot.
- Guardrails:
  - max expert-held slots per day
  - required distribution across both days
  - no duplicate theme in adjacent slots unless explicitly allowed

## Migration phases

### Phase 1: foundation
- Build V2 model + engine + copy keys.
- Build minimal slot selector UI with local state.
- Add unit tests for V2 engine.

### Phase 2: integration
- Integrate V2 planner into `/intensive` behind query toggle.
- Add V2 summary card and waitlist payload mapping.
- Add share rendering for V2 drafts.

### Phase 3: polish and cutover
- Finalize copy with narrative terms.
- Add Playwright coverage for V2 planner and conversion flow.
- Flip V2 as default and keep V1 accessible via internal flag.

## Immediate next implementation tasks
1. Create `src/lib/planner-v2/model.ts` and `src/lib/planner-v2/engine.ts` with tests.
2. Add `fortyEightV2` copy blocks in `src/lib/copy/intensive.ts`.
3. Scaffold `PlannerV2Shell` and mount it behind `?planner=v2` in `app/intensive/page.tsx`.
4. Keep all V1 files untouched to preserve full feature set for reuse.
