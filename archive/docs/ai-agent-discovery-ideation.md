# AI Agent Discovery Pass for Intensive Traffic

## Goal
- Drive qualified discovery traffic to `/intensive`.
- Give AI agents direct, structured answers about fit, process, and next step.
- Keep copy aligned with the Therafox Intensive brand.

## Current Launch Mode Decisions
- Workshops are shelved and routed to `/intensive`.
- V1 planner is shelved. `/intensive` defaults to planner v2.
- V1 resources are shelved. `/resources` resolves to v2 only.
- A machine-readable discovery endpoint now exists at `/llms.txt`.

## AI Discovery Priorities
- Keep one dominant conversion surface: `/intensive`.
- Use consistent phrasing across metadata, FAQ, and structured data.
- Answer decision-intent questions with short, concrete language.
- Keep canonical paths clean and avoid split intent across duplicate variants.

## Content Ideation for AI and Search

### Cluster 1: Positioning and Fit
- Page type: intensive overview sections on `/intensive`.
- Intent examples:
  - "Is a couples intensive right for us"
  - "Difference between weekly therapy and couples intensive"
  - "Private couples intensive"
- Content blocks:
  - Who this is for
  - Who this is not for
  - What changes after 48 hours
  - How Functional Autonomy is defined

### Cluster 2: Process and Structure
- Page type: conversion support sections on `/intensive`.
- Intent examples:
  - "What happens during a two day intensive"
  - "How expert-held sessions are scheduled"
  - "What happens after joining intensive waitlist"
- Content blocks:
  - Timeline of Day 1 and Day 2
  - Expert-held vs on-your-own time
  - Waitlist to scheduling workflow
  - Follow-through plan for Monday

### Cluster 3: Cost and Decision Readiness
- Page type: practical decision section on `/intensive` and `/billing`.
- Intent examples:
  - "How much does a couples intensive cost"
  - "Is a couples intensive worth it"
  - "Private pay intensive"
- Content blocks:
  - Pricing model by expert-held time
  - What is included
  - What is not included
  - Clear next step CTA

### Cluster 4: Comparative Queries
- Page type: tightly scoped supporting pages that canonicalize to themselves and cross-link to `/intensive`.
- Intent examples:
  - "Private couples intensive format"
  - "Discernment counseling vs couples intensive"
  - "Marriage intensive vs weekly therapy"
- Content blocks:
  - Side-by-side comparison table
  - Best-fit decision criteria
  - Cases where intensive is not the right move
  - One CTA: join intensive waitlist

## Recommended New Pages for MVP Plus
- `/intensive/fit`
- `/intensive/process`
- `/intensive/pricing`
- `/intensive/alternatives`

## Structured Data Additions
- Keep `Service` and `FAQPage` on `/intensive`.
- Add `WebPage` with clear `about` and `mainEntity`.
- Add `BreadcrumbList` for any new supporting pages.
- Ensure each supporting page references `/intensive` as the main next step.

## On-Page Copy Pattern for AI Parsing
- Use short heading plus direct answer format.
- Keep each answer block under 70 words.
- Start each answer with a decisive first sentence.
- Avoid abstract framing language and avoid mixed intent CTAs.

## Measurement Plan
- Track source and medium into waitlist events.
- Track landing path to waitlist submit rate by page.
- Track assisted conversions from supporting pages to `/intensive`.
- Review query data monthly and prune low-intent pages.

## First 3 Content Briefs

### Brief 1: "Before we commit"
- Primary keyword intent: pre-commitment intensive fit.
- Angle: intensive as a structured 48 hour decision container.
- Must include:
  - before-we-commit fit criteria
  - expert-held schedule clarity
  - conversion CTA to waitlist

### Brief 2: "Weekly therapy vs intensive"
- Primary keyword intent: format comparison.
- Angle: pace, scope, and decision timeline.
- Must include:
  - decision matrix
  - when weekly is better
  - when intensive is better

### Brief 3: "What happens after waitlist"
- Primary keyword intent: process clarity.
- Angle: reduce uncertainty before submit.
- Must include:
  - exact sequence after waitlist
  - timelines and communication expectations
  - clear non-commitment statement
