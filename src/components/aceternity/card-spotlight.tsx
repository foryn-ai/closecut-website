"use client";

import { card, focusRing } from "@/lib/ui/classes";

type CardSpotlightProps = {
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
};

export function CardSpotlight({
  title,
  description,
  onClick,
  className,
  selected = false,
}: CardSpotlightProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        `group relative w-full overflow-hidden ${card} border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_var(--color-shadow)] ${focusRing} ` +
        (selected ? "border-primary bg-surface-2 " : "border-border ") +
        (className ?? "")
      }
    >
      {selected ? (
        <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-canvas text-sm font-semibold text-primary">
          ✓
        </span>
      ) : null}
      <span className="relative flex flex-col gap-2">
        <span className="text-sm font-semibold text-heading">{title}</span>
        <span className="text-sm leading-relaxed text-body">{description}</span>
      </span>
    </button>
  );
}
