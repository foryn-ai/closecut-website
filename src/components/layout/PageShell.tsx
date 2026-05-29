import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  tone?: "home" | "interior";
};

export function PageShell({ children, tone = "interior" }: PageShellProps) {
  const toneClass = tone === "home" ? "page-shell--home" : "page-shell--interior";
  return <div className={`page-shell ${toneClass} w-full`}>{children}</div>;
}
