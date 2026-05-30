# Brand Brief — Close Cut

Fill this out before starting a new brand design session with an AI coding assistant or AI chat. It is the structured input that replaces brand-specific content across the codebase.

Paste the completed brief into Claude.ai or ChatGPT at the start of a copy session. The AI will use it to generate section copy for the `copy-drafts/` pipeline.

---

## Identity

**Brand name:** Close Cut

**Site URL:** <!-- TODO: confirm domain before launch -->

**Practitioner name and credentials:** N/A — this is a video game, not a practice

**Specialty (one line):** A knife-sharpening skill game where timing is everything and one slip costs you

**Practice type:** Indie game / Steam release

---

## What this site is

This is a marketing and press site for Close Cut, a Godot 4.6 knife-sharpening mini-game releasing on Steam. It is not a service business site — the therapy-practice fields above are filled with N/A or adapted equivalents.

**Game elevator pitch:**
Hold a button. Push the knife across the stone. Release at the right moment to score. Hold too long and the blade finds your fingers. Simple to learn, punishing to master — every stroke is a calculated risk.

**Core mechanic:** Single-button risk/reward timing. The player earns more points the longer they hold, but a danger window at the end of each stroke forces the cut. Releasing inside the greed window multiplies the payout. Holding through it ends the stroke and costs health.

**Knives (difficulty ladder):**
- Heavy Chef Knife — forgiving timing, wide greed window, entry point
- Chef Knife — tighter windows, shakier hand, mid-game
- Paring Knife — hardest timing, tight high-reward zone, endgame

**Platform:** PC (Steam). 9-language localization (EN, DE, ES, FR, JA, KO, PT-BR, RU, ZH-CN).

**Achievements:** 8 Steam achievements (first cut, first finish, streaks, cash milestones, close calls, living dangerously).

---

## Location and contact

**City and state:** N/A

**Full address:** N/A

**Phone:** N/A

**Session rate / Price:** TBD — Steam pricing not yet set

---

## Services (repurposed as site sections)

**Primary section:** Home — hero, mechanic hook, Steam wishlist CTA

**Secondary section:** Press Kit — screenshots, capsule art, factsheet, contact for press

**Who it is for:** Players who like arcade precision games, one-more-try loops, and games with strong tactile feedback. Fans of Nails, Surgeon Simulator, and tight timing mechanics.

**Who it is NOT for:** Players expecting a narrative, open world, or multiplayer experience. This is a focused, score-attack single-player game.

---

## Voice and tone

**Three adjectives that describe the voice:** Terse, precise, a little dangerous

**Language to avoid:**
- No "journey", "experience", "feel", "immersive"
- No exclamation points in hero copy
- No "roguelike" (it is not one)
- No healing/wellness language (the therapy template bleeds through — strip it completely)

**Terminology to use:**
- "stroke" = one pass of the knife across the stone
- "greed window" = the high-risk high-reward zone at the end of a stroke
- "close cut" = releasing inside the greed window without cutting yourself
- "pass" = synonym for stroke in casual copy
- "whetstone" or "stone" = the sharpening surface

---

## Brand colors

**Primary (dark background):** #1A1612 — near-black with warm undertone, matches the bench/stone aesthetic

**Accent (gold):** #D1AD70 — the warm amber pulled from the title screen accent line; used for highlights, CTAs

**Accent warm (danger/red):** #C0392B — danger red for cut indicators and high-tension UI moments

**Text / cream:** #D1C2AD — the soft ivory used for body text and labels in-game

---

## Pages included

- [x] Home (`/`) — hero, mechanic hook, screenshots, Steam wishlist CTA
- [ ] Therapy or primary service — NOT USED
- [ ] About — NOT USED (no practitioner)
- [ ] Contact — optional, press contact only
- [ ] Billing — NOT USED
- [ ] Resources — NOT USED
- [ ] Intensive / flagship service — NOT USED
- [ ] Workshops — NOT USED
- [x] Other: Press Kit (`/press`) — capsule art downloads, screenshots, factsheet, press contact

---

## Assets available

All assets are in `public/` (copied from Steam asset submission):

| File | Use |
|---|---|
| `public/images/hero.png` | 3840x1240 — full-width hero banner |
| `public/images/logo.png` | 1280x720 RGBA — game logo, transparent bg |
| `public/images/capsule.png` | 1232x706 — horizontal key art |
| `public/images/poster.png` | 748x896 RGBA — vertical poster/capsule |
| `public/images/background.png` | 1438x810 RGBA — page background |
| `public/icons/favicon.png` | 184x184 — source for favicon |
| `public/og/og-image.png` | 1232x706 — Open Graph image |

---

## Copy draft sections needed

This site uses two pages. Generate copy for each using the copy draft workflow:

```bash
npm run copy:schema home
npm run copy:schema about   # repurpose as /press factsheet
```

Paste each JSON template into Claude.ai with this brief and ask:
> "Fill in this JSON copy template for the brand described above. Keep all keys exactly as-is. Only change string values. Match the voice: terse, precise, a little dangerous. Strip any therapy or clinical language completely. This is a PC game marketing site."

Save the output to `copy-drafts/<section>.json`, then apply:

```bash
npm run copy:apply home
```

See `README.md` for the full copy draft workflow.
