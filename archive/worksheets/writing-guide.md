# One Page Worksheet Writing Guide

## Purpose
Create concise educational worksheets that support the resources page topics.

## Non negotiables
- Keep each worksheet to one page when exported.
- Use plain language and short sentences.
- Focus on education and self reflection.
- No clinical advice.
- No hype language.

## Layout
- Use a 4 row table.
- Rows 1 to 3 are two column bento rows with alternating icon and text.
- Row 4 is a full width pro tip row.
- Use three different icons for the first three rows.
- Keep each icon at 60px by 60px in the final design.

## Content blocks
| Box Name | Placeholder Tag | Content Type | Target Length |
| --- | --- | --- | --- |
| Hero Header | `{{HEADER}}` | Clear high level definition or What is it statement in 2 paragraphs | 60 to 70 words total |
| Hero Icon | `{{ICON_HERO}}` | One icon for row 1 in Thin or Light weight | 60px by 60px |
| Why Icon | `{{ICON_WHY}}` | One icon for row 2 in Thin or Light weight | 60px by 60px |
| How Icon | `{{ICON_HOW}}` | One icon for row 3 in Thin or Light weight | 60px by 60px |
| The Why | `{{WHY}}` | Three bullets on psychological or physiological benefit | 45 to 60 words total |
| The How | `{{HOW}}` | Numbered list from 1 to 4 with simple actions | 60 to 80 words total |
| The Pro Tip | `{{PRO_TIP}}` | Nugget, pitfall, or variation | 15 to 20 words |
| Footer/Source | `{{FOOTER}}` | Practice name, website, or crisis link | 10 words static text |

## Icon selection helper
- Source icon files from `public/icons`.
- Use the metadata helper workbook at `public/icons/Icon_Metadata_Subset_Phosphor.xlsx`.
- For each icon row, add a one word conceptual label that fits the topic closely.
- Suggested command:
  - `npm run worksheet:icons -- --topic "Narrative Therapy" --area "Pre-Commitment Counseling" --keyword story`
- Copy the selected icon filename into the template `- Filename:` field.
- Prefer `.svg` icons when available.

## Export flow
- Render html from draft:
  - `npm run worksheet:render -- --input worksheets/drafts/<file>.md --out exports/worksheets/<file>.html`
- Export pdf from html:
  - `npm run worksheet:pdf -- --input exports/worksheets/<file>.html --out public/downloads/resources/<resource-slug>/<name>.pdf`

## AI writer flow
- Generate draft content with the LLM writer:
  - `npm run worksheet:generate -- --input worksheets/drafts/<file>.md --model gpt-5-mini --write`
- Run deterministic checks after generation:
  - `npm run worksheet:lint`
  - `npm run worksheet:content-check -- --input worksheets/drafts/<file>.md`

## Voice and framing
- Keep language practical and neutral.
- Avoid developmental model jargon unless explicitly requested for that worksheet.

## Formatting rules
- Use markdown headings from the template.
- Keep The Why at exactly 3 bullets.
- Keep The How at exactly 4 numbered steps.
- Keep each list item to one sentence when possible.
- Start each The Why bullet with: supports, reduces, improves, or protects.
- Start each The How step with: name, pause, scan, state, ask, or close.
- Start each The Why bullet and The How step with a capitalized first word.
- Do not use these words in The Why, The How, or The Pro Tip: always, should, fix, heal, diagnose.
- Keep The Pro Tip non controversial and practical.

## Quality checklist
- Topic matches a resource slug.
- Terms are product focused and private.
- No references to therapy outcomes or treatment claims.
- Content remains useful when printed in black and white.
