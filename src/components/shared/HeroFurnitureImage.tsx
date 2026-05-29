import Image from "next/image";

type HeroFurnitureImageProps = {
  src: string;
  alt: string;
};

export function HeroFurnitureImage({ src, alt }: HeroFurnitureImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={480}
      height={180}
      className="h-20 w-auto object-contain sm:h-24"
      sizes="(min-width: 640px) 420px, 360px"
      priority
    />
  );
}
