import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sectionBand } from "@/lib/ui/classes";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  band?: "none" | "soft";
  rule?: "auto" | "none";
};

export function Section({
  children,
  className,
  band = "none",
  rule = "auto",
  ...sectionProps
}: SectionProps) {
  return (
    <section
      {...sectionProps}
      className={cn(
        "py-14 sm:py-20",
        rule === "auto" && "tf-rule-section",
        rule === "none" && "tf-no-rule",
        band === "soft" && sectionBand,
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-6">{children}</div>
    </section>
  );
}
