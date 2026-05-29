"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroMediaBandProps = {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  showFade?: boolean;
  contentClassName?: string;
  imagePosition?: string;
  children: ReactNode;
};

export function HeroMediaBand({
  videoSrc,
  posterSrc,
  alt,
  className,
  overlayClassName,
  showFade = true,
  contentClassName,
  imagePosition,
  children,
}: HeroMediaBandProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        {videoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div
          className={cn(
            "absolute inset-0 bg-[linear-gradient(180deg,rgba(253,252,251,0.05),rgba(253,252,251,0.8))]",
            overlayClassName,
          )}
        />
        {showFade ? (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-canvas" />
        ) : null}
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
