# Codex Web Session Runbook

## Goal
Give Codex enough context to make safe, fast edits without re-discovery.

## Start of session checklist
1. Confirm branch: `main` for launch work, feature branch for experiments.
2. Confirm scope for this session:
   - `copy`
   - `seo`
   - `ui`
   - `api`
   - `deploy`
3. Confirm release target date.
4. Confirm whether CMS is enabled:
   - default: disabled
   - set `ENABLE_CMS=true` only when needed

## Canonical files
- Visible copy: `src/lib/copy/intensive.ts`
- SEO copy: `src/lib/seo/intensive.ts`
- Theme content source: `src/lib/copy/therafoxWebsite.ts`
- Clinician request intake: `docs/clinician-copy-request-template.md`
- Review workflow: `docs/review-workflow.md`

## Required checks before commit
```bash
npm run lint
npm run typecheck
```

## Optional checks before deploy
```bash
npm run build
npm run review:export
```

## Commit rules
- Keep commits scoped and readable.
- Use imperative commit messages.
- Do not batch unrelated refactors with copy updates.

## Deploy notes
- Repo-first launch mode works with CMS off by default.
- If forms are needed in production, set SMTP env vars.
- If SMTP is missing, form APIs return `email_not_configured`.
