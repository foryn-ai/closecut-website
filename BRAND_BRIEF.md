# Brand Brief

Fill this out before starting a new brand design session with an AI coding assistant or AI chat. It is the structured input that replaces brand-specific content across the codebase.

Paste the completed brief into Claude.ai or ChatGPT at the start of a copy session. The AI will use it to generate section copy for the `copy-drafts/` pipeline.

---

## Identity

**Brand name:**
<!-- The public-facing name shown in nav, footer, structured data -->


**Site URL:**
<!-- Full canonical URL including https:// and www if applicable -->


**Practitioner name and credentials:**
<!-- e.g. "Jane Smith, LMFT" — shown on About page, SEO titles -->


**Specialty (one line):**
<!-- e.g. "Couples therapy and private intensives" — used in SEO and AI discovery -->


**Practice type:**
<!-- e.g. Private practice, group practice, coaching, retreat center -->


---

## Location and contact

**City and state:**


**Full address:**


**Phone:**


**Session rate:**
<!-- e.g. "$200 per session" — shown on Billing page -->


---

## Services

**Primary service:**
<!-- The main thing clients come for. e.g. "Individual therapy" / "Couples therapy" -->


**Secondary service (if any):**
<!-- e.g. "Private two-day intensive" / "Workshops" -->


**Who it is for:**
<!-- Target audience in plain language. e.g. "Couples navigating major transitions" -->


**Who it is NOT for:**
<!-- Clear exclusions help the AI avoid overpromising -->


---

## Voice and tone

**Three adjectives that describe the voice:**
<!-- e.g. "Direct, precise, warm" -->


**Language to avoid:**
<!-- e.g. "No healing, no transformational, no life-changing" -->


**Terminology to use:**
<!-- Any preferred clinical or brand-specific terms -->


---

## Brand colors

**Primary (main brand color):**
<!-- Hex value — replaces --primary in globals.css -->


**Accent (highlight / gold):**
<!-- Hex value — replaces --accent -->


**Accent warm (secondary accent):**
<!-- Hex value — replaces --accent-warm -->


---

## Pages included

Check the pages this brand will use. Unchecked pages can be removed from `SITE_COPY.nav.links` and the sitemap.

- [ ] Home (`/`)
- [ ] Therapy or primary service (`/therapy`)
- [ ] About (`/about`)
- [ ] Contact (`/contact`)
- [ ] Billing (`/billing`)
- [ ] Resources (`/resources`)
- [ ] Intensive / flagship service (`/intensive`)
- [ ] Workshops (`/workshops`)
- [ ] Other: _______________

---

## Copy draft sections needed

After filling this brief, use the copy draft workflow to generate section copy:

```bash
npm run copy:schema home      # export home section template
npm run copy:schema about     # export about section template
# ... repeat for each section
```

Paste each JSON template into Claude.ai with this brief and ask:
> "Fill in this JSON copy template for the brand described above. Keep all keys exactly as-is. Only change string values. Do not invent clinical claims. Match the voice described."

Save the output to `copy-drafts/<section>.json`, then apply:

```bash
npm run copy:apply home
npm run copy:apply about
```

See `README.md` for the full copy draft workflow.
