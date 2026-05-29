# Linen-Forward Color System

## Palette
- Canvas: `#FDFCFB`
- Primary: `#6B7F6D`
- Headings: `#2D3748`
- Accent: `#D4AF37`
- Body: `#718096`

## Tokens
Defined in `app/globals.css`.

Base tokens:
- `--canvas`
- `--primary`
- `--heading`
- `--text`
- `--accent`

Derived tokens:
- `--surface-1` (heading at 3%)
- `--surface-2` (primary at 8%)
- `--border` (heading at 12%)
- `--divider` (heading at 8%)
- `--focus` (accent at 40%)

## Shared UI Classes
Defined in `src/lib/ui/classes.ts`.

- Buttons: `btnPrimary`, `btnSecondary`, `btnTertiary`
- Link: `link`
- Surfaces: `card`, `cardEmphasis`, `sectionBand`
- Chips: `chip`, `chipSelected`, `chipAccent`
- Inputs: `input`, `inputLabel`, `inputHelp`
- Divider: `divider`
- Focus: `focusRing`

## Audit
Run:

```bash
npm run audit:colors
```

Strict mode:

```bash
RUN_COLOR_AUDIT_STRICT=true npm run audit:colors
```

Notes:
- The script scans `src/` for hex literals and reports values outside the approved palette.
