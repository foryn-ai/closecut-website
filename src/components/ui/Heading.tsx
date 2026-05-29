import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { headingType } from "@/lib/ui/typography";

type HeadingRole = keyof typeof headingType;

const headingTagByRole: Record<HeadingRole, "h1" | "h2" | "h3" | "h4"> = {
  h1Hero: "h1",
  h1Page: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

type HeadingProps = {
  role: HeadingRole;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Heading({ role, as, className, style, children }: HeadingProps) {
  const Tag = as ?? headingTagByRole[role];
  return (
    <Tag
      className={cn(headingType[role], "text-heading", className)}
      style={{ fontFamily: "var(--font-playfair), Georgia, serif", ...style }}
    >
      {children}
    </Tag>
  );
}
