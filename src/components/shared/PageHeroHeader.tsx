import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { HeroFurnitureImage } from "@/components/shared/HeroFurnitureImage";

type PageHeroHeaderProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  subtitleRole?: "body" | "bodySmall";
  subtitleMeasure?: "tight" | "narrow" | "none";
  className?: string;
  children?: React.ReactNode;
};

export function PageHeroHeader({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  subtitleRole = "body",
  subtitleMeasure = "narrow",
  className,
  children,
}: PageHeroHeaderProps) {
  return (
    <section className={`tf-hero mx-auto max-w-6xl px-6 pt-10 text-center sm:pt-14 ${className ?? ""}`.trim()}>
      <div className="mx-auto flex w-fit justify-center pb-6">
        <HeroFurnitureImage src={imageSrc} alt={imageAlt} />
      </div>
      <Heading role="h1Hero">{title}</Heading>
      <Text role={subtitleRole} measure={subtitleMeasure} className="mx-auto mt-4 text-body">
        {subtitle}
      </Text>
      {children}
    </section>
  );
}
