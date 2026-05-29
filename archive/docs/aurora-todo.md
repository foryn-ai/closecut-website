# Aurora Stub TODO

Status: Stubbed aurora background is active when NEXT_PUBLIC_ENABLE_AURORA is true.
Current stub: layered gradients with local keyframe drift and opacity pulse.

## Replace Stub With Verified Aurora
- Confirm the official AuroraBackground component source and copy it into `src/components/aceternity/aurora-background.tsx`.
- Preserve the feature flag check in the Home hero so Aurora can be toggled on or off.
- Match the official demo behavior in the homepage hero before using it in production pages.
- Keep prefers-reduced-motion support for any animation changes.
