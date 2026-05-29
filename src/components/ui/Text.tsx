import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { proseNarrow, proseTight, textType } from "@/lib/ui/typography";

type TextRole = keyof typeof textType;
type TextMeasure = "none" | "narrow" | "tight";

const measureClass: Record<TextMeasure, string> = {
  none: "",
  narrow: proseNarrow,
  tight: proseTight,
};

type TextProps = {
  role: TextRole;
  as?: "p" | "span" | "div" | "label";
  className?: string;
  measure?: TextMeasure;
  children: ReactNode;
};

export function Text({
  role,
  as = "p",
  className,
  measure = "none",
  children,
}: TextProps) {
  const Tag = as;
  return (
    <Tag className={cn(textType[role], measureClass[measure], className)}>
      {children}
    </Tag>
  );
}
