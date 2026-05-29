import { cn } from "@/lib/utils";
import {
  btnPrimary,
  btnSecondary,
  btnTertiary,
  focusRing,
} from "@/lib/ui/classes";

export type CtaVariant = "primary" | "secondary" | "tertiary";

export const ctaClass = (
  variant: CtaVariant = "primary",
  className?: string,
) =>
  cn(
    "t-btn inline-flex items-center justify-center gap-2 whitespace-nowrap",
    focusRing,
    variant === "primary" && btnPrimary,
    variant === "secondary" && btnSecondary,
    variant === "tertiary" && btnTertiary,
    className,
  );
