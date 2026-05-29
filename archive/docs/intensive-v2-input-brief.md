# Intensive V2 Input Brief

Use this to provide direction for the next version of `/intensive` and the 48 hour planner.

## 1. Strategic intent
- Primary page goal:
- Primary conversion event:
- Secondary conversion event:
- What must stay unchanged from V1:

## 2. Audience and entry points
- Who this version is for first:
- Main objection to resolve on page:
- Main question users must answer before joining waitlist:
- Traffic source priorities:

## 3. Narrative and terminology
- Required narrative phrases to include:
- Phrases to remove from V1:
- Required terminology replacements:
- Words that should never appear:

## 4. Page architecture
Choose one.
- Option A: Keep current structure (hero -> sell -> planner -> share -> conversion)
- Option B: Story first (hero -> model -> outcomes -> planner -> conversion)
- Option C: Planner first above the fold
- Choice:
- Why:

## 5. Planner scope
- Keep drag and drop timeline: yes or no
- Keep starter drafts: yes or no
- Keep category library: yes or no
- Keep organize action: yes or no
- Keep clear all action: yes or no
- Add new planner constraints:
- Remove current planner constraints:

## 6. Planner content model
- Keep current categories: yes or no
- New categories to add:
- Categories to remove:
- Moments to add (id, label, minutes, category):
- Moments to remove (id):
- Default starter draft id:

## 7. Shareable output
- Keep short link flow: yes or no
- Keep PDF export flow: yes or no
- Share output should include:
- Share output should exclude:
- Should share view be printable by default: yes or no

## 8. Conversion and waitlist
- Required fields:
- Optional fields:
- Confirmation message tone:
- Should planner summary be sent with waitlist: yes or no
- Any CRM or routing changes:

## 9. Visual and motion
- Visual direction keywords:
- Sections that need highest emphasis:
- Motion to keep:
- Motion to remove:
- Mobile behavior constraints:

## 10. SEO and indexing
- Keep `/intensive` canonical target: yes or no
- Additional SEO sections to include:
- FAQ topics to add:
- Should share URLs be blocked from indexing: yes or no

## 11. Analytics
- Required events to track:
- Required event properties:
- Funnel checkpoints:

## 12. Acceptance criteria for V2
- Top 5 functional acceptance checks:
- Top 5 content acceptance checks:
- Top 5 visual acceptance checks:

## Current implementation anchors
- Route: `app/intensive/page.tsx`
- Legacy redirect: `app/48-hours/page.tsx`
- Planner UI: `src/components/bridge-weekend/PlannerShell.tsx`
- Planner engine: `src/lib/pricing/intensive.ts`
- Planner copy: `src/lib/copy/intensive.ts`
- Intensive SEO: `src/lib/seo/intensive.ts`
- Share API: `app/api/share/route.ts`
- Waitlist API: `app/api/waitlist/route.ts`
