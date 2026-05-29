"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import {
  LABEL_GAP,
  LABEL_HEIGHT,
  LABEL_POSITION_ORDER,
  LABEL_WIDTH,
  LAMP_GLOW_RECT,
  OFFICE_PLACEMENTS,
  SCENE_AVOID_RECTS,
  VIEWPORT_MARGIN,
  type LabelPosition,
  type OfficePlacementConfig,
  type RectPct,
} from "@/components/home/officeHeroConfig";
import { SITE_COPY } from "@/lib/copy";
import { focusRing } from "@/lib/ui/classes";

type OfficeHeroSceneProps = {
  title: string;
  subtitle: string;
};

type OfficePlacement = OfficePlacementConfig & {
  hotspot?: NonNullable<OfficePlacementConfig["hotspot"]> & {
    label: string;
    ariaLabel: string;
  };
};

const CORE_SCENE_IDS = new Set(["couch-center", "art-above-couch"]);
const HINT_PULSE_IDS = new Set(["lamp-right-of-couch"]);

function imageSizesForSpot(spotId: string) {
  if (spotId === "couch-center") {
    return "(min-width: 1280px) 33vw, (min-width: 640px) 42vw, 60vw";
  }

  if (spotId === "art-above-couch") {
    return "(min-width: 1280px) 16vw, (min-width: 640px) 22vw, 30vw";
  }

  return "(min-width: 1280px) 20vw, (min-width: 640px) 24vw, 40vw";
}

function intersects(a: RectPct, b: RectPct) {
  return a.left < b.left + b.width && a.left + a.width > b.left && a.top < b.top + b.height && a.top + a.height > b.top;
}

function isWithinViewport(rect: RectPct) {
  return (
    rect.left >= VIEWPORT_MARGIN &&
    rect.top >= VIEWPORT_MARGIN &&
    rect.left + rect.width <= 100 - VIEWPORT_MARGIN &&
    rect.top + rect.height <= 100 - VIEWPORT_MARGIN
  );
}

function buildLabelRect(visualRect: RectPct, position: LabelPosition): RectPct {
  const centerX = visualRect.left + visualRect.width / 2;
  if (position === "top-left") {
    return {
      left: visualRect.left,
      top: visualRect.top - LABEL_HEIGHT - LABEL_GAP,
      width: LABEL_WIDTH,
      height: LABEL_HEIGHT,
    };
  }
  return {
    left: centerX - LABEL_WIDTH / 2,
    top: visualRect.top - LABEL_HEIGHT - LABEL_GAP,
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
  };
}

function chooseLabelRect(visualRect: RectPct, occupiedRects: RectPct[]) {
  for (const position of LABEL_POSITION_ORDER) {
    const candidate = buildLabelRect(visualRect, position);
    if (!isWithinViewport(candidate)) continue;
    if (occupiedRects.some((rect) => intersects(candidate, rect))) continue;
    return candidate;
  }
  const fallback = buildLabelRect(visualRect, "top-center");
  return {
    left: Math.max(VIEWPORT_MARGIN, Math.min(fallback.left, 100 - VIEWPORT_MARGIN - LABEL_WIDTH)),
    top: Math.max(VIEWPORT_MARGIN, Math.min(fallback.top, 100 - VIEWPORT_MARGIN - LABEL_HEIGHT)),
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
  };
}

function rectStyle(rect: RectPct) {
  return {
    left: `${rect.left}%`,
    top: `${rect.top}%`,
    width: `${rect.width}%`,
    height: `${rect.height}%`,
  };
}

export function OfficeHeroScene({ title, subtitle }: OfficeHeroSceneProps) {
  const [hintActive, setHintActive] = useState(true);
  const dismissHints = useCallback(() => {
    setHintActive(false);
  }, []);

  const navLabelByHref = Object.fromEntries(SITE_COPY.nav.links.map((link) => [link.href, link.label]));
  const placements = OFFICE_PLACEMENTS.map((spot) => {
    if (!spot.hotspot) return spot;
    const label = spot.hotspot.label ?? navLabelByHref[spot.hotspot.href] ?? "Page";
    return {
      ...spot,
      hotspot: {
        ...spot.hotspot,
        label,
        ariaLabel: `Open ${label} page`,
      },
    };
  }) as OfficePlacement[];

  const hotspotPlacements = placements.filter((spot) => spot.hotspot);
  const occupiedLabelRects = [...SCENE_AVOID_RECTS];
  const labelRectsById = new Map<string, RectPct>();

  hotspotPlacements.forEach((spot) => {
    const hotspot = spot.hotspot;
    if (!hotspot?.label) return;
    const preferredRect = hotspot.labelPosition ? buildLabelRect(hotspot.visualRect, hotspot.labelPosition) : null;
    const labelRect =
      preferredRect &&
      isWithinViewport(preferredRect) &&
      !occupiedLabelRects.some((rect) => intersects(preferredRect, rect))
        ? preferredRect
        : chooseLabelRect(hotspot.visualRect, occupiedLabelRects);
    labelRectsById.set(spot.id, labelRect);
    occupiedLabelRects.push(labelRect);
  });

  return (
    <section className="pb-8 sm:pb-14">
      <div className="relative h-[42vh] min-h-[280px] max-h-[620px] w-full overflow-hidden bg-canvas sm:h-[54vh] sm:min-h-[380px]">
        <p id="office-scene-hotspot-help" className="sr-only">
          Interactive office scene. Use tab to move through page links.
        </p>

        <div className="absolute inset-0">
          <Image src="/scene/room-wall.svg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[32%]">
          <Image src="/scene/room-floor.svg" alt="" fill className="object-cover" sizes="100vw" />
        </div>

        {placements.map((spot) => (
          <div key={spot.id}>
            {/*
              Keep the full object layout on wide desktop. Below xl, simplify to couch + art + hero text.
            */}
            {spot.id === "lamp-right-of-couch" ? (
              <div
                className={`pointer-events-none absolute max-sm:hidden ${CORE_SCENE_IDS.has(spot.id) ? "" : "max-xl:hidden"}`}
                style={{ ...rectStyle(LAMP_GLOW_RECT), zIndex: spot.z - 1 }}
              >
                <div className="h-full w-full opacity-0" />
              </div>
            ) : null}
            <div
              className={`absolute ${spot.imageClass} ${CORE_SCENE_IDS.has(spot.id) ? "" : "max-xl:hidden"}`}
              style={{ zIndex: spot.z }}
            >
              <Image
                src={spot.imageSrc}
                alt=""
                fill
                priority={CORE_SCENE_IDS.has(spot.id)}
                className="object-contain"
                sizes={imageSizesForSpot(spot.id)}
              />
            </div>
          </div>
        ))}

        {hotspotPlacements.map((spot) => {
          const hotspot = spot.hotspot;
          if (!hotspot) return null;
          const labelRect = labelRectsById.get(spot.id);
          const showHintPulse = hintActive && HINT_PULSE_IDS.has(spot.id);
          return (
            <div
              key={`${spot.id}-hotspot`}
              className={`pointer-events-none absolute inset-0 group ${CORE_SCENE_IDS.has(spot.id) ? "" : "max-xl:hidden"}`}
              style={{ zIndex: spot.z + 1 }}
            >
              <Link
                href={hotspot.href}
                aria-label={hotspot.ariaLabel}
                aria-describedby="office-scene-hotspot-help"
                className={`pointer-events-auto absolute min-h-10 min-w-10 rounded-xl transition-all duration-200 hover:scale-[1.02] focus-visible:bg-primary/10 ${spot.hotspotClass} ${focusRing}`}
                style={rectStyle(hotspot.hitRect)}
                onMouseEnter={dismissHints}
                onFocus={dismissHints}
                onTouchStart={dismissHints}
                onClick={dismissHints}
              >
                <span className="sr-only">{hotspot.label}</span>
              </Link>
              {hotspot.label && labelRect ? (
                <span
                  className="pointer-events-none absolute flex flex-col items-center"
                  style={{ left: `${labelRect.left + labelRect.width / 2}%`, top: `${hotspot.hitRect.top}%` }}
                >
                  <span className="inline-flex flex-col items-center gap-1 -translate-y-full">
                    <span
                      className={`translate-y-1 text-[13px] font-light tracking-[0.1em] text-heading/70 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${showHintPulse ? "translate-y-0 opacity-75 animate-[pulse_2s_ease-in-out_2]" : ""}`}
                    >
                      {hotspot.label}
                    </span>
                    <span
                      className={`h-0 w-px bg-heading/60 transition-[height] duration-200 ease-out group-hover:h-6 group-focus-within:h-6 ${showHintPulse ? "h-5" : ""}`}
                    />
                  </span>
                </span>
              ) : null}
            </div>
          );
        })}

        <div className="absolute left-1/2 top-[8%] z-20 w-[92%] -translate-x-1/2 text-center sm:top-[12%] sm:w-[68%]">
          {title ? (
            <Heading role="h1Hero" className="sr-only">
              {title}
            </Heading>
          ) : null}
          <Text role="body" measure="tight" className="mx-auto mt-2 text-body sm:mt-3">
            {subtitle}
          </Text>
          {hintActive ? (
            <Text role="fine" className="mx-auto mt-2 hidden text-body/70 sm:mt-3 sm:block">
              Explore the room.
            </Text>
          ) : null}
        </div>
      </div>
    </section>
  );
}
