import { cn } from "@/lib/utils";

type IconBadgeProps = {
  src: string;
  size?: number;
  variant?: "primary" | "accent" | "soft";
  className?: string;
};

export function IconBadge({
  src,
  size = 44,
  variant = "primary",
  className,
}: IconBadgeProps) {
  const iconSize = Math.round(size * 0.88);
  const iconToneClass =
    variant === "accent"
      ? "bg-[var(--accent-warm)]"
      : variant === "soft"
        ? "bg-primary/85"
        : "bg-primary";
  const shellClass =
    variant === "soft"
      ? "rounded-full border border-border/70 bg-surface-2 shadow-[0_12px_30px_var(--color-shadow)]"
      : "";

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center",
        shellClass,
        className,
      )}
      style={{ height: size, width: size }}
    >
      <span
        className={iconToneClass}
        style={{
          height: iconSize,
          width: iconSize,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}
