"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
  dotColor = "#6b7f6d",
  dotSize = 14,
  dotRadius = 2.2,
  showLinen = false,
  hideDots = false,
  showFade = false,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  dotColor?: string;
  dotSize?: number;
  dotRadius?: number;
  showLinen?: boolean;
  hideDots?: boolean;
  showFade?: boolean;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotPattern = (opacity: number) =>
    `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='${dotSize}' height='${dotSize}' fill='none'><circle fill='${dotColor}' fill-opacity='${opacity}' id='pattern-circle' cx='10' cy='10' r='${dotRadius}'></circle></svg>`,
    )}")`;

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      className={cn(
        "group relative flex h-[40rem] w-full items-center justify-center bg-canvas",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      {hideDots ? null : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: dotPattern(0.4) }}
        />
      )}
      {showLinen ? (
        <div className="pointer-events-none absolute inset-0 bg-canvas/70" />
      ) : null}
      {showLinen ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(253,252,251,0.65), rgba(253,252,251,0.65)), repeating-linear-gradient(45deg, rgba(107,127,109,0.08) 0 1px, rgba(253,252,251,0) 1px 6px)",
          }}
        />
      ) : null}
      {showLinen ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(107,127,109,0.12) 0.6px, transparent 0.6px)",
            backgroundSize: "6px 6px",
          }}
        />
      ) : null}
      {showFade ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-canvas" />
      ) : null}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: hideDots ? "none" : dotPattern(0.85),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              240px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              240px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        "relative inline-block rounded-lg bg-gradient-to-r from-[rgba(212,175,55,0.35)] to-[rgba(107,127,109,0.35)] px-1 pb-1",
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
