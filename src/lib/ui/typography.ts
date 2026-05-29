export const h1Hero =
  "text-[34px] sm:text-[42px] leading-[1.08] font-display font-normal";
export const h1Page =
  "text-[30px] sm:text-[36px] leading-[1.12] font-display font-normal";
export const h2 =
  "text-[24px] sm:text-[30px] leading-[1.18] font-display font-normal";
export const h3 =
  "text-[20px] sm:text-[22px] leading-[1.22] font-display font-normal";
export const h4 =
  "text-[18px] sm:text-[20px] leading-[1.25] font-display font-normal";

export const body = "text-[17px] sm:text-[18px] leading-[1.65] font-sans font-normal";
export const bodySmall = "text-[16px] leading-[1.6] font-sans font-normal";
export const caption = "text-[15px] leading-[1.5] font-sans font-normal";
export const label = "text-[14px] leading-[1.4] font-sans font-medium";
export const fine = "text-[13px] leading-[1.4] font-sans font-normal";
export const eyebrow =
  "text-[12px] uppercase tracking-wider leading-[1.2] font-sans font-medium";
export const buttonText = "text-[16px] leading-[1.2] font-sans font-medium";

export const proseNarrow = "max-w-[65ch]";
export const proseTight = "max-w-[55ch]";

export const headingType = {
  h1Hero,
  h1Page,
  h2,
  h3,
  h4,
} as const;

export const textType = {
  body,
  bodySmall,
  caption,
  label,
  fine,
  eyebrow,
  buttonText,
} as const;
