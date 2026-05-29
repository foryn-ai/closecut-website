"use client";

import { useState } from "react";
import { card, focusRing } from "@/lib/ui/classes";

type ExpandableCardProps = {
  title: string;
  children: string;
  className?: string;
};

export function ExpandableCard({
  title,
  children,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        `${card} p-5 ` +
        (className ?? "")
      }
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-4 text-left ${focusRing}`}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-heading">{title}</span>
        <span
          className={
            "flex h-8 w-8 items-center justify-center rounded-full bg-canvas text-lg text-heading shadow-[0_6px_16px_var(--color-shadow)] transition " +
            (open ? "rotate-45" : "")
          }
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open ? (
        <p className="mt-3 text-sm leading-relaxed text-body">{children}</p>
      ) : null}
    </div>
  );
}
