# Worksheet Production Project

This project creates one page educational worksheets for the site resources library.

## Scope
- Draft worksheet content in Markdown.
- Enforce a one page 4 row bento table structure through a writing guide.
- Keep worksheet files organized by resource topic.
- Prepare content that can be exported to PDF for `/downloads/resources/...` assets.

## Workflow
1. Create a draft with the generator.
2. Fill in the worksheet content from the writing guide.
3. Run the worksheet linter to confirm structure and length.
4. Export approved drafts to PDF and place final files in `public/downloads/resources/...`.

## Commands
- `npm run worksheet:new -- --resource attachment-theory --title "Secure Base Map"`
- `npm run worksheet:lint`
- `npm run worksheet:icons -- --topic "Narrative Therapy" --area "Pre-Commitment Counseling" --keyword story`
- `npm run worksheet:generate -- --input worksheets/drafts/polyvagal-theory_worksheet.md --model gpt-5-mini --write`
- `npm run worksheet:content-check -- --input worksheets/drafts/polyvagal-theory_worksheet.md`
- `npm run worksheet:review-bundle`
- `npm run worksheet:render -- --input worksheets/drafts/polyvagal-theory_worksheet.md --out exports/worksheets/polyvagal-theory_worksheet.html`
- `npm run worksheet:pdf -- --input exports/worksheets/polyvagal-theory_worksheet.html --out public/downloads/resources/polyvagal-theory/polyvagal-theory-worksheet.pdf`
  - PDF export fails if output is not exactly one page.

## Files
- `worksheets/writing-guide.md`
- `worksheets/templates/one-page-worksheet.md`
- `worksheets/drafts/*.md`
- `scripts/worksheet/new.cjs`
- `scripts/worksheet/lint.cjs`
- `scripts/worksheet/icons.py`
- `scripts/worksheet/generate.cjs`
- `scripts/worksheet/content-check.cjs`
- `scripts/worksheet/review-bundle.cjs`
- `scripts/worksheet/render.cjs`
- `scripts/worksheet/pdf.cjs`

## Environment
- Set `OPENAI_API_KEY` before running `worksheet:generate`.
