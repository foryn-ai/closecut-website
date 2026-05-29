"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  showBottomFade?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  showBottomFade = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div>
      <div
        className={cn(
          "transition-bg relative flex min-h-[60vh] flex-col items-center justify-center bg-canvas text-heading",
          className,
        )}
        {...props}
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .aurora-animate::after {
              animation: none !important;
            }
          }
        `}</style>
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,rgba(107,127,109,0.92)_10%,rgba(107,127,109,0.5)_15%,rgba(253,252,251,0.7)_20%,rgba(212,175,55,0.45)_25%,rgba(45,55,72,0.7)_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,rgba(45,55,72,0.9)_0%,rgba(45,55,72,0.9)_7%,transparent_10%,transparent_12%,rgba(45,55,72,0.9)_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,rgba(253,252,251,0.98)_0%,rgba(253,252,251,0.98)_7%,transparent_10%,transparent_12%,rgba(253,252,251,0.98)_16%)",
              "--blue-300": "rgba(253,252,251,0.7)",
              "--blue-400": "rgba(107,127,109,0.5)",
              "--blue-500": "rgba(107,127,109,0.9)",
              "--indigo-300": "rgba(212,175,55,0.5)",
              "--violet-200": "rgba(45,55,72,0.7)",
              "--black": "rgba(45,55,72,0.9)",
              "--white": "rgba(253,252,251,0.98)",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `aurora-animate after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-60 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
          {showBottomFade ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(253,252,251,0), rgba(253,252,251,1))",
              }}
            />
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};
