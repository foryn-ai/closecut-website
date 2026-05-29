import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { card } from "@/lib/ui/classes";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function SurfaceCard({
  children,
  className,
  interactive = false,
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        card,
        "tf-accent-card p-6",
        interactive &&
          "transition-all duration-200 hover:scale-[1.02] hover:border-primary/60 hover:bg-surface-2 hover:shadow-[0_22px_55px_var(--color-shadow)] active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </div>
  );
}
