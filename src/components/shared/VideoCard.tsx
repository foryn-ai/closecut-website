import { card, cardEmphasis } from "@/lib/ui/classes";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type VideoCardProps = {
  title: string;
  description?: string;
  posterSrc?: string;
  caption?: string;
  videoSrc?: string;
};

export function VideoCard({
  title,
  description,
  posterSrc,
  caption,
  videoSrc,
}: VideoCardProps) {
  return (
    <div className={`tf-accent-card ${card} p-6 shadow-[0_20px_50px_var(--color-shadow)]`}>
      <div className="space-y-3">
        <Heading role="h3">{title}</Heading>
        {description ? (
          <Text role="bodySmall" measure="narrow" className="text-body">
            {description}
          </Text>
        ) : null}
      </div>
      <div className={`mt-4 aspect-video overflow-hidden rounded-lg ${cardEmphasis} shadow-[0_12px_30px_var(--color-shadow)]`}>
        <video
          controls
          preload="metadata"
          poster={posterSrc}
          className="h-full w-full"
        >
          {videoSrc ? <source src={videoSrc} /> : null}
        </video>
      </div>
      {caption ? (
        <Text role="fine" className="mt-3 text-body">
          {caption}
        </Text>
      ) : null}
    </div>
  );
}
