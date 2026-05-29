"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { ctaClass } from "@/components/shared/cta";
import { INTENSIVE_COPY } from "@/lib/copy/intensive";
import { SITE_COPY } from "@/lib/copy";
import { getCampaignAttribution } from "@/lib/marketing/attribution";
import {
  btnSecondary,
  card,
  cardEmphasis,
  divider,
  focusRing,
  input,
  link as linkClass,
} from "@/lib/ui/classes";
import {
  computeShareSummary,
  SHARE_CATEGORY_ORDER,
} from "@/lib/fortyEight/shareSummary";
import { decodeSharePlan, encodeSharePlan } from "@/lib/fortyEight/sharePlan";
import {
  applyStarterDraft,
  computeTotals,
  createPlannerState,
  deriveInvestment,
  getCatalog,
  getMomentById,
  moveBlock,
  organizeTimeline,
  placeItemAtSlot,
  placeItemNextAvailable,
  removeBlock,
  SLOTS_PER_DAY,
  type PlannerDay,
  type PlannerState,
  type TimelineBlock,
  type ValidationError,
} from "@/lib/pricing/intensive";

const SLOT_HEIGHT = 32;
const MIN_PERIOD_SLOTS = 6;
const LABEL_OFFSET = 18;
const DRAG_SNAP_BIAS_PX = 10;
const DRAG_PREVIEW_EASE_MS = 90;

const PERIODS = [
  { key: "morning", startSlot: 0, slotCount: 16 },
  { key: "afternoon", startSlot: 16, slotCount: 16 },
  { key: "evening", startSlot: 32, slotCount: 16 },
] as const;

type PeriodLayout = {
  key: (typeof PERIODS)[number]["key"];
  startSlot: number;
  slotCount: number;
  heightPx: number;
  offsetPx: number;
};

type DragState = {
  blockId: string;
  offsetY: number;
};
type DragPreview = {
  day: PlannerDay;
  startSlot: number;
};

type WaitlistSubmitState = "idle" | "submitting" | "success" | "error" | "spam";
type ShareLinkState = "idle" | "creating";

function formatDuration(minutes: number) {
  if (minutes % 60 === 0) {
    const hours = minutes / 60;
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  }
  if (minutes >= 120) {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return `${hours} hrs ${remaining} mins`;
  }
  return `${minutes} mins`;
}

function formatHours(minutes: number) {
  const hours = minutes / 60;
  if (Number.isInteger(hours)) return `${hours}`;
  return hours.toFixed(1);
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

function formatGeneratedTimestamp(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getErrorMessage(error: ValidationError) {
  const template = INTENSIVE_COPY.errors;

  switch (error.code) {
    case "total-cap":
      return template.totalCap;
    case "overlap":
      return template.overlap;
    case "day-hours-cap": {
      const dayLabel =
        error.context?.day === "day2"
          ? INTENSIVE_COPY.planner.day2Title
          : INTENSIVE_COPY.planner.day1Title;
      return template.dayHoursCap.replace("{dayLabel}", dayLabel);
    }
    case "major-exclusive":
      return template.majorExclusive;
    case "conflict":
      return template.conflict;
    case "unknown-item":
    default:
      return template.unknownItem;
  }
}

function buildPeriodLayout(blocks: TimelineBlock[]) {
  let offsetPx = 0;
  const layouts: PeriodLayout[] = PERIODS.map((period) => {
    const periodBlocks = blocks.filter(
      (block) =>
        block.startSlot >= period.startSlot &&
        block.startSlot < period.startSlot + period.slotCount,
    );
    const lastSlotUsed = periodBlocks.reduce((max, block) => {
      const relativeEnd = block.startSlot - period.startSlot + block.slotLength;
      return Math.max(max, relativeEnd);
    }, 0);
    const heightSlots = Math.max(MIN_PERIOD_SLOTS, lastSlotUsed);
    const contentHeightPx = heightSlots * SLOT_HEIGHT;
    const heightPx = contentHeightPx + LABEL_OFFSET;
    const layout = {
      key: period.key,
      startSlot: period.startSlot,
      slotCount: period.slotCount,
      heightPx,
      offsetPx,
    };
    offsetPx += heightPx;
    return layout;
  });

  return { layouts, totalHeight: offsetPx };
}

function getBlockTop(block: TimelineBlock, layout: PeriodLayout) {
  const localStart = block.startSlot - layout.startSlot;
  return layout.offsetPx + LABEL_OFFSET + localStart * SLOT_HEIGHT;
}

function getBlockHeight(block: TimelineBlock) {
  return block.slotLength * SLOT_HEIGHT;
}

function getPeriodForSlot(layouts: PeriodLayout[], startSlot: number) {
  return layouts.find(
    (layout) =>
      startSlot >= layout.startSlot &&
      startSlot < layout.startSlot + layout.slotCount,
  );
}

function getSlotFromPointer(layouts: PeriodLayout[], y: number) {
  const period = layouts.find(
    (layout) => y >= layout.offsetPx && y <= layout.offsetPx + layout.heightPx,
  );
  const target = period ?? layouts[layouts.length - 1];
  const relativeY = Math.max(
    0,
    y - target.offsetPx - LABEL_OFFSET * 0.35,
  );
  const scaledSlot = Math.floor((relativeY + DRAG_SNAP_BIAS_PX) / SLOT_HEIGHT);
  const rawSlot = target.startSlot + scaledSlot;
  return Math.max(0, Math.min(rawSlot, target.startSlot + target.slotCount - 1));
}

function groupBlocksByPeriod(
  blocks: TimelineBlock[],
  layouts: PeriodLayout[],
) {
  return layouts.map((layout) => {
    const items = blocks
      .filter(
        (block) =>
          block.startSlot >= layout.startSlot &&
          block.startSlot < layout.startSlot + layout.slotCount,
      )
      .sort((a, b) => a.startSlot - b.startSlot);
    return { ...layout, items };
  });
}

type PlannerShellProps = {
  initialPlanToken: string | null;
  initialIsShareView: boolean;
};

export function PlannerShell({
  initialPlanToken,
  initialIsShareView,
}: PlannerShellProps) {
  const sharedPlan = useMemo(
    () => (initialPlanToken ? decodeSharePlan(initialPlanToken) : null),
    [initialPlanToken],
  );
  const isSharePage = initialIsShareView && sharedPlan !== null;

  const [state, setState] = useState<PlannerState>(() => {
    if (sharedPlan) {
      return sharedPlan.state;
    }

    const initialState = createPlannerState();
    const drafted = applyStarterDraft(initialState, "more-calm");
    if (drafted.errors.length > 0) return initialState;
    const organized = organizeTimeline(drafted.state);
    if (organized.errors.length > 0) return drafted.state;
    return organized.state;
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [selectedStarterDraftId, setSelectedStarterDraftId] =
    useState<string | null>("more-calm");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistWebsite, setWaitlistWebsite] = useState("");
  const [waitlistSubmitState, setWaitlistSubmitState] =
    useState<WaitlistSubmitState>("idle");
  const [waitlistStartedAt] = useState(() => Date.now());
  const [shareLinkState, setShareLinkState] = useState<ShareLinkState>("idle");
  const [shortShareUrl, setShortShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [generatedAt] = useState(() => sharedPlan?.generatedAt ?? new Date());
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [ghostPlacement, setGhostPlacement] = useState<{
    day: PlannerDay;
    startSlot: number;
  } | null>(null);
  const catalog = useMemo(() => getCatalog(), []);
  const [expandedCategories, setExpandedCategories] = useState(
    () => new Set(["expert-held"]),
  );

  const day1Ref = useRef<HTMLDivElement | null>(null);
  const day2Ref = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<DragPreview | null>(null);
  const pendingDragPreviewRef = useRef<DragPreview | null>(null);
  const dragPreviewFrameRef = useRef<number | null>(null);
  const totals = useMemo(() => computeTotals(state), [state]);
  const investment = deriveInvestment(totals.clinicianMinutes);
  const shareSummary = useMemo(() => computeShareSummary(state), [state]);
  const shareCopy = SITE_COPY.fortyEight.share;

  const day1Blocks = state.blocks.filter((block) => block.day === "day1");
  const day2Blocks = state.blocks.filter((block) => block.day === "day2");

  const day1Layout = useMemo(() => buildPeriodLayout(day1Blocks), [day1Blocks]);
  const day2Layout = useMemo(() => buildPeriodLayout(day2Blocks), [day2Blocks]);
  const draggedBlock = useMemo(
    () =>
      dragState
        ? state.blocks.find((item) => item.id === dragState.blockId) ?? null
        : null,
    [dragState, state.blocks],
  );

  const day1Periods = useMemo(
    () => groupBlocksByPeriod(day1Blocks, day1Layout.layouts),
    [day1Blocks, day1Layout.layouts],
  );
  const day2Periods = useMemo(
    () => groupBlocksByPeriod(day2Blocks, day2Layout.layouts),
    [day2Blocks, day2Layout.layouts],
  );
  const hasDraft = totals.totalPlannedMinutes > 0;
  const expertHeldHours = formatHours(totals.clinicianMinutes);
  const togetherHours = formatHours(totals.totalPlannedMinutes);
  const waitlistSubmitLabel =
    waitlistSubmitState === "submitting"
      ? INTENSIVE_COPY.waitlist.submittingLabel
      : INTENSIVE_COPY.waitlist.submitLabel;
  const waitlistStatusMessage =
    waitlistSubmitState === "success"
      ? INTENSIVE_COPY.waitlist.successMessage
      : waitlistSubmitState === "spam"
        ? INTENSIVE_COPY.waitlist.spamBlockedMessage
        : waitlistSubmitState === "error"
          ? INTENSIVE_COPY.waitlist.errorMessage
          : "";

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const day1Rect = day1Ref.current?.getBoundingClientRect();
      const day2Rect = day2Ref.current?.getBoundingClientRect();
      if (!day1Rect || !day2Rect) return;
      if (!draggedBlock) return;

      const isOverDay1 =
        event.clientX >= day1Rect.left && event.clientX <= day1Rect.right;
      const isOverDay2 =
        event.clientX >= day2Rect.left && event.clientX <= day2Rect.right;

      const targetDay: PlannerDay = isOverDay2
        ? "day2"
        : isOverDay1
          ? "day1"
          : dragPreviewRef.current?.day ?? draggedBlock.day;

      const rect = targetDay === "day1" ? day1Rect : day2Rect;
      const layout = targetDay === "day1" ? day1Layout.layouts : day2Layout.layouts;

      const start = getSlotFromPointer(
        layout,
        event.clientY - rect.top - dragState.offsetY,
      );
      const clamped = Math.max(
        0,
        Math.min(start, SLOTS_PER_DAY - draggedBlock.slotLength),
      );
      const preview = { day: targetDay, startSlot: clamped };
      dragPreviewRef.current = preview;
      pendingDragPreviewRef.current = preview;
      if (dragPreviewFrameRef.current === null) {
        dragPreviewFrameRef.current = window.requestAnimationFrame(() => {
          if (pendingDragPreviewRef.current) {
            setDragPreview(pendingDragPreviewRef.current);
          }
          dragPreviewFrameRef.current = null;
        });
      }
    };

    const handlePointerUp = () => {
      if (draggedBlock && dragPreviewRef.current) {
        const result = moveBlock(
          state,
          draggedBlock.id,
          dragPreviewRef.current.day,
          dragPreviewRef.current.startSlot,
        );
        if (result.errors.length > 0) {
          setErrors(result.errors);
        } else {
          setErrors([]);
          setState(result.state);
        }
      }
      setDragState(null);
      dragPreviewRef.current = null;
      pendingDragPreviewRef.current = null;
      if (dragPreviewFrameRef.current !== null) {
        window.cancelAnimationFrame(dragPreviewFrameRef.current);
        dragPreviewFrameRef.current = null;
      }
      setDragPreview(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (dragPreviewFrameRef.current !== null) {
        window.cancelAnimationFrame(dragPreviewFrameRef.current);
        dragPreviewFrameRef.current = null;
      }
    };
  }, [
    dragState,
    draggedBlock,
    state,
    day1Layout.layouts,
    day2Layout.layouts,
  ]);

  useEffect(() => {
    if (!dragState && !draggingItemId) return;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = previousUserSelect;
    };
  }, [dragState, draggingItemId]);

  useEffect(() => {
    if (!draggingItemId) return;

    const handlePointerMove = (event: PointerEvent) => {
      setGhostPosition({ x: event.clientX, y: event.clientY });
      const day1Rect = day1Ref.current?.getBoundingClientRect();
      const day2Rect = day2Ref.current?.getBoundingClientRect();
      const isOverDay1 = day1Rect
        ? event.clientX >= day1Rect.left && event.clientX <= day1Rect.right
        : false;
      const isOverDay2 = day2Rect
        ? event.clientX >= day2Rect.left && event.clientX <= day2Rect.right
        : false;

      if (isOverDay1 && day1Rect) {
        const slot = getSlotFromPointer(
          day1Layout.layouts,
          event.clientY - day1Rect.top,
        );
        setGhostPlacement({ day: "day1", startSlot: slot });
      } else if (isOverDay2 && day2Rect) {
        const slot = getSlotFromPointer(
          day2Layout.layouts,
          event.clientY - day2Rect.top,
        );
        setGhostPlacement({ day: "day2", startSlot: slot });
      } else {
        setGhostPlacement(null);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const day1Rect = day1Ref.current?.getBoundingClientRect();
      const day2Rect = day2Ref.current?.getBoundingClientRect();
      const isOverDay1 = day1Rect
        ? event.clientX >= day1Rect.left && event.clientX <= day1Rect.right
        : false;
      const isOverDay2 = day2Rect
        ? event.clientX >= day2Rect.left && event.clientX <= day2Rect.right
        : false;

      if (isOverDay1 && day1Rect) {
        const slot = getSlotFromPointer(
          day1Layout.layouts,
          event.clientY - day1Rect.top,
        );
        const result = placeItemAtSlot(state, draggingItemId, "day1", slot);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        } else {
          setErrors([]);
          setState(result.state);
        }
      } else if (isOverDay2 && day2Rect) {
        const slot = getSlotFromPointer(
          day2Layout.layouts,
          event.clientY - day2Rect.top,
        );
        const result = placeItemAtSlot(state, draggingItemId, "day2", slot);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        } else {
          setErrors([]);
          setState(result.state);
        }
      } else {
        const result = placeItemNextAvailable(state, draggingItemId);
        if (result.errors.length > 0) {
          setErrors(result.errors);
        } else {
          setErrors([]);
          setState(result.state);
        }
      }

      setDraggingItemId(null);
      setGhostPosition(null);
      setGhostPlacement(null);
      setLibraryOpen(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingItemId, state, day1Layout.layouts, day2Layout.layouts]);

  const handleStarterDraft = (draftId: string) => {
    if (selectedStarterDraftId === draftId) return;
    const result = applyStarterDraft(state, draftId);
    if (result.errors.length > 0) {
      setErrors(result.errors);
      return;
    }
    const organized = organizeTimeline(result.state);
    if (organized.errors.length > 0) {
      setErrors(organized.errors);
      setState(result.state);
      return;
    }
    setErrors([]);
    setSelectedStarterDraftId(draftId);
    setState(organized.state);
  };

  const handleOrganize = () => {
    const result = organizeTimeline(state);
    if (result.errors.length > 0) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setState(result.state);
  };

  const handleLibraryPlacement = (itemId: string) => {
    const result = placeItemNextAvailable(state, itemId);
    if (result.errors.length > 0) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setState(result.state);
    setLibraryOpen(false);
  };

  const handleRemoveBlock = (blockId: string) => {
    setState((prev) => removeBlock(prev, blockId));
  };

  const shareTargetPath = useMemo(() => {
    if (typeof window === "undefined" || !hasDraft) return "";
    const plan = encodeSharePlan(state, new Date());
    return `/intensive?plan=${encodeURIComponent(plan)}&view=share#shareable`;
  }, [state, hasDraft]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !shareTargetPath) return "";
    return `${window.location.origin}${shareTargetPath}`;
  }, [shareTargetPath]);

  useEffect(() => {
    setShortShareUrl("");
  }, [shareTargetPath]);

  const createShortShareUrl = async () => {
    if (!shareTargetPath || shareLinkState === "creating") return "";
    if (shortShareUrl) return shortShareUrl;

    setShareLinkState("creating");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetPath: shareTargetPath }),
      });
      const payload = (await response.json()) as { ok?: boolean; shortUrl?: string };
      if (response.ok && payload.ok && payload.shortUrl) {
        setShortShareUrl(payload.shortUrl);
        return payload.shortUrl;
      }
      return "";
    } catch {
      return "";
    } finally {
      setShareLinkState("idle");
    }
  };

  const handleOpenShareDraft = async () => {
    const targetUrl = (await createShortShareUrl()) || shareUrl;
    if (!targetUrl || typeof window === "undefined") return;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    const targetUrl = (await createShortShareUrl()) || shareUrl;
    if (!targetUrl) return;
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const exportHtml = () => {
    const timestamp = formatGeneratedTimestamp(generatedAt);
    const itineraryHtml = [
      { day: "day1", periods: day1Periods },
      { day: "day2", periods: day2Periods },
    ]
      .map((dayGroup) => {
        const dayLabel =
          dayGroup.day === "day1"
            ? INTENSIVE_COPY.planner.day1Title
            : INTENSIVE_COPY.planner.day2Title;
        const periodsHtml = dayGroup.periods
          .map((period) => {
            const periodItems =
              period.items.length === 0
                ? `<p class="muted">${escapeHtml(INTENSIVE_COPY.planner.noItemsLabel)}</p>`
                : `<ul class="row-list">${period.items
                    .map((block) => {
                      const copy =
                        INTENSIVE_COPY.catalogCopy[
                          block.itemId as keyof typeof INTENSIVE_COPY.catalogCopy
                        ];
                      const label = copy?.label ?? block.itemId;
                      const minutes = getMomentById(block.itemId)?.durationMinutes ?? 0;
                      return `<li><span>${escapeHtml(label)}</span><span>${escapeHtml(
                        formatDuration(minutes),
                      )}</span></li>`;
                    })
                    .join("")}</ul>`;
            return `<div class="period"><p class="eyebrow">${escapeHtml(
              INTENSIVE_COPY.planner.periodLabels[period.key],
            )}</p>${periodItems}</div>`;
          })
          .join("");
        return `<div class="day"><p class="day-label">${escapeHtml(dayLabel)}</p>${periodsHtml}</div>`;
      })
      .join("");

    const summaryRows = SHARE_CATEGORY_ORDER.map((category) => {
      const minutes = shareSummary.minutesByCategory[category];
      const percent = shareSummary.percentsByCategory[category];
      const label = INTENSIVE_COPY.planner.categoryLabels[category];
      return `<li><span>${escapeHtml(label)}</span><span>${escapeHtml(formatDuration(minutes))} ${escapeHtml(
        `${percent}%`,
      )}</span></li>`;
    }).join("");

    return `<!doctype html><html><head><meta charset="utf-8" />
      <title>${escapeHtml(shareCopy.wordmark)}</title>
      <style>
        *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
        body{font-family:Inter,system-ui,sans-serif;background:#fdfcfb;color:#718096;padding:16px}
        h1,h2,h3{font-family:Playfair Display,serif;color:#2d3748}
        .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .wordmark{font-family:Inter,system-ui,sans-serif;font-size:12px;letter-spacing:.25em;color:#2d3748}
        .muted{font-size:12px;color:#718096}
        .summary{background:#fdfcfb;border:1px solid rgba(45,55,72,0.08);border-radius:10px;padding:12px;margin-bottom:10px}
        .summary ul{margin:8px 0 0;padding:0;list-style:none;display:grid;gap:6px}
        .summary li{display:flex;justify-content:space-between;padding:5px 8px;border-radius:6px;border:1px solid rgba(45,55,72,0.12);background:#fdfcfb}
        .itinerary{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .day{background:#fdfcfb;border:1px solid rgba(45,55,72,0.10);border-radius:10px;padding:8px}
        .day-label{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#6b7f6d;background:rgba(107,127,109,0.12);padding:6px 8px;border-radius:6px;display:inline-block}
        .period{margin-top:7px}
        .eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.2em;color:#718096}
        .row-list{margin:5px 0 0;padding:0;list-style:none;display:grid;gap:4px}
        .row-list li{display:flex;justify-content:space-between;padding:5px 8px;border-radius:6px;border:1px solid rgba(45,55,72,0.12);background:#fdfcfb}
        .totals{margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
        .totals-card{border:1px solid rgba(45,55,72,0.12);border-radius:8px;padding:8px;background:#fdfcfb}
        .totals-label{font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:#6b7f6d}
        .totals-value{margin-top:4px;font-size:16px;font-weight:600;color:#2d3748}
        .print-cta{border:1px solid rgba(45,55,72,0.18);background:#6b7f6d;color:#fdfcfb;border-radius:8px;padding:8px 12px;font-weight:600;cursor:pointer}
        @media print {.print-cta{display:none}}
      </style></head><body>
      <div class="header"><p class="wordmark">${escapeHtml(
        shareCopy.wordmark,
      )}</p><div style="display:flex;gap:10px;align-items:center"><p class="muted">${escapeHtml(
      shareCopy.generatedLabel,
    )} ${escapeHtml(timestamp)}</p><button class="print-cta" onclick="window.print()">Print or Save PDF</button></div></div>
      <div class="summary">
        <p><strong>${escapeHtml(shareCopy.expertHeldLabel)}</strong> ${escapeHtml(
      formatDuration(shareSummary.expertHeldMinutes),
    )}</p>
        <p><strong>${escapeHtml(shareCopy.togetherByCategoryTitle)}</strong></p>
        <ul class="summary-list">${summaryRows}</ul>
      </div>
      <div class="itinerary">${itineraryHtml}</div>
      <div class="totals">
        <div class="totals-card">
          <p class="totals-label">${escapeHtml(INTENSIVE_COPY.investment.expertHeldLabel)}</p>
          <p class="totals-value">${escapeHtml(`${expertHeldHours} hrs`)}</p>
        </div>
        <div class="totals-card">
          <p class="totals-label">${escapeHtml(INTENSIVE_COPY.investment.togetherLabel)}</p>
          <p class="totals-value">${escapeHtml(`${togetherHours} hrs`)}</p>
        </div>
        <div class="totals-card">
          <p class="totals-label">${escapeHtml(INTENSIVE_COPY.investment.totalLabel)}</p>
          <p class="totals-value">${escapeHtml(formatCurrency(investment ?? 0))}</p>
        </div>
      </div>
      </body></html>`;
  };

  const handleExportPdf = () => {
    const html = exportHtml();
    const frame = document.createElement("iframe");
    frame.style.position = "fixed";
    frame.style.right = "0";
    frame.style.bottom = "0";
    frame.style.width = "0";
    frame.style.height = "0";
    frame.style.border = "0";
    frame.srcdoc = html;
    frame.onload = () => {
      const printWindow = frame.contentWindow;
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
      }
      setTimeout(() => {
        frame.remove();
      }, 1000);
    };
    document.body.appendChild(frame);
  };

  const handleWaitlistSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitlistSubmitState("submitting");

    try {
      const shareUrlForEmail = (await createShortShareUrl()) || shareUrl;
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: waitlistEmail,
          website: waitlistWebsite,
          startedAt: waitlistStartedAt,
          source: "intensive",
          campaignAttribution: getCampaignAttribution(),
          shareUrl: shareUrlForEmail,
          plannerSummary: hasDraft
            ? JSON.stringify({
                expertHeldMinutes: shareSummary.expertHeldMinutes,
                togetherMinutes: shareSummary.togetherMinutes,
                minutesByCategory: shareSummary.minutesByCategory,
                percentsByCategory: shareSummary.percentsByCategory,
                clinicianMinutes: totals.clinicianMinutes,
                plannedMinutes: totals.totalPlannedMinutes,
                investment,
              })
            : "",
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; code?: string };
      if (!response.ok || !payload.ok) {
        if (response.status === 429 || payload.code === "spam_blocked") {
          setWaitlistSubmitState("spam");
          return;
        }
        setWaitlistSubmitState("error");
        return;
      }

      setWaitlistSubmitState("success");
      setWaitlistEmail("");
      setWaitlistWebsite("");
    } catch {
      setWaitlistSubmitState("error");
    }
  };

  const renderBlock = (block: TimelineBlock, layouts: PeriodLayout[]) => {
    const item = getMomentById(block.itemId);
    const copy =
      INTENSIVE_COPY.catalogCopy[
        block.itemId as keyof typeof INTENSIVE_COPY.catalogCopy
      ];
    const layout = getPeriodForSlot(layouts, block.startSlot);
    if (!layout) return null;

    return (
      <div
        key={block.id}
        className="absolute left-2 right-2 overflow-hidden rounded-md border border-border bg-surface-2 px-4 py-2 text-[11px] font-semibold text-heading transition-[top,height] duration-150 ease-out will-change-[top,height]"
        style={{
          top: getBlockTop(block, layout),
          height: getBlockHeight(block),
        }}
        onPointerDown={(event) => {
          event.preventDefault();
          const offsetY = getBlockHeight(block) / 2;
          const preview = { day: block.day, startSlot: block.startSlot };
          setDragState({ blockId: block.id, offsetY });
          dragPreviewRef.current = preview;
          setDragPreview(preview);
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="whitespace-nowrap">
            {copy?.label ?? block.itemId}
            {item?.durationMinutes ? ` | ${formatDuration(item.durationMinutes)}` : ""}
          </p>
          <button
            type="button"
            className={`text-xs font-semibold ${linkClass} ${focusRing}`}
            aria-label={INTENSIVE_COPY.planner.removeLabel}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              handleRemoveBlock(block.id);
            }}
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  const renderDayColumn = (
    day: PlannerDay,
    blocks: TimelineBlock[],
    layout: { layouts: PeriodLayout[]; totalHeight: number },
  ) => (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">
        {day === "day1"
          ? INTENSIVE_COPY.planner.day1Title
          : INTENSIVE_COPY.planner.day2Title}
      </p>
      <div
        ref={day === "day1" ? day1Ref : day2Ref}
        className="relative rounded-md border border-border bg-canvas"
        style={{ height: layout.totalHeight }}
      >
        {layout.layouts.map((period, index) => (
          <div
            key={`${day}-${period.key}`}
            className={`absolute left-0 right-0 border-b ${divider}`}
            style={{
              top: period.offsetPx,
              height: period.heightPx,
              backgroundColor:
                index % 2 === 0 ? "rgba(45,55,72,0.03)" : "transparent",
            }}
          >
            <span className="absolute left-3 top-2 z-10 bg-canvas px-1 text-[10px] uppercase tracking-[0.2em] text-body">
              {INTENSIVE_COPY.planner.periodLabels[period.key]}
            </span>
          </div>
        ))}
        {blocks
          .filter((block) => block.id !== dragState?.blockId)
          .map((block) => renderBlock(block, layout.layouts))}
        {dragState && dragPreview && draggedBlock && dragPreview.day === day ? (
          <div
            className="absolute left-2 right-2 overflow-hidden rounded-md border border-border bg-surface-2 px-4 py-2 text-[11px] font-semibold text-heading opacity-90 shadow-[0_10px_26px_var(--color-shadow)] transition-[top] ease-out will-change-[top]"
            style={{
              top: getBlockTop(
                {
                  ...draggedBlock,
                  day: dragPreview.day,
                  startSlot: dragPreview.startSlot,
                },
                layout.layouts.find(
                  (period) =>
                    dragPreview.startSlot >= period.startSlot &&
                    dragPreview.startSlot < period.startSlot + period.slotCount,
                ) ?? layout.layouts[0],
              ),
              height: getBlockHeight(draggedBlock),
              transitionDuration: `${DRAG_PREVIEW_EASE_MS}ms`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="whitespace-nowrap">
                {INTENSIVE_COPY.catalogCopy[
                  draggedBlock.itemId as keyof typeof INTENSIVE_COPY.catalogCopy
                ]?.label ?? draggedBlock.itemId}
                {getMomentById(draggedBlock.itemId)?.durationMinutes
                  ? ` | ${formatDuration(getMomentById(draggedBlock.itemId)?.durationMinutes ?? 0)}`
                  : ""}
              </p>
            </div>
          </div>
        ) : null}
        {draggingItemId && ghostPlacement?.day === day ? (
          <div
            className="absolute left-2 right-2 rounded-md border border-border bg-surface-2"
            style={{
              top: getBlockTop(
                {
                  id: "ghost",
                  itemId: draggingItemId,
                  day,
                  startSlot: ghostPlacement.startSlot,
                  slotLength:
                    (getMomentById(draggingItemId)?.durationMinutes ?? 30) / 30,
                },
                layout.layouts.find(
                  (period) =>
                    ghostPlacement.startSlot >= period.startSlot &&
                    ghostPlacement.startSlot < period.startSlot + period.slotCount,
                ) ?? layout.layouts[0],
              ),
              height: getBlockHeight({
                id: "ghost",
                itemId: draggingItemId,
                day,
                startSlot: ghostPlacement.startSlot,
                slotLength:
                  (getMomentById(draggingItemId)?.durationMinutes ?? 30) / 30,
              } as TimelineBlock),
            }}
          />
        ) : null}
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className={`${card} rounded-md border border-border p-5`}>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">
          {INTENSIVE_COPY.planner.libraryTitle}
        </p>
        <p className="text-sm text-body">
          {INTENSIVE_COPY.planner.libraryNote}
        </p>
      </div>
      <div className="mt-4 space-y-6">
        {catalog.categories.map((category) => {
          const isExpanded = expandedCategories.has(category);
          const toggleCategory = () => {
            setExpandedCategories((prev) => {
              const next = new Set(prev);
              if (next.has(category)) {
                next.delete(category);
              } else {
                next.add(category);
              }
              return next;
            });
          };
          return (
            <div key={category} className="space-y-2">
              <button
                type="button"
                className={`flex w-full items-center justify-between text-left ${focusRing}`}
                aria-label={
                  isExpanded
                    ? INTENSIVE_COPY.planner.collapseLabel
                    : INTENSIVE_COPY.planner.expandLabel
                }
                onClick={toggleCategory}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-heading">
                  {INTENSIVE_COPY.planner.categoryLabels[category]}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>
              {isExpanded ? (
                <div className="space-y-2">
                  {catalog.moments
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const copy =
                        INTENSIVE_COPY.catalogCopy[
                          item.id as keyof typeof INTENSIVE_COPY.catalogCopy
                        ];
                      return (
                        <div
                          key={item.id}
                          role="button"
                          tabIndex={0}
                          onPointerDown={(event) => {
                            event.preventDefault();
                            setDraggingItemId(item.id);
                            setGhostPosition(null);
                          }}
                          className="select-none flex w-full items-center justify-between gap-4 rounded-md border border-border bg-canvas px-4 py-3 text-left text-sm transition hover:bg-surface-1"
                        >
                          <p className="truncate font-semibold text-heading">
                            {copy?.label ?? item.id}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-body">
                              {formatDuration(item.durationMinutes)}
                            </span>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleLibraryPlacement(item.id);
                              }}
                              onPointerDown={(event) => event.stopPropagation()}
                              className={`flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs font-semibold text-heading ${focusRing}`}
                              aria-label={INTENSIVE_COPY.planner.includeLabel}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-16 font-sans [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans">
      {!isSharePage ? (
        <section id="planner" className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-heading">
              {INTENSIVE_COPY.planner.title}
            </h2>
            <p className="text-sm text-body">{INTENSIVE_COPY.planner.subtitle}</p>
            <p className="text-sm text-body">{INTENSIVE_COPY.planner.note}</p>
          </div>

        <section className={`${card} space-y-4 rounded-xl border border-border p-6`}>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-heading">
              {INTENSIVE_COPY.planner.starterDraftsTitle}
            </h3>
            <p className="text-sm text-body">
              {INTENSIVE_COPY.planner.starterDraftsHelper}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {INTENSIVE_COPY.planner.starterDrafts.map((draft) => (
              <CardSpotlight
                key={draft.id}
                title={draft.label}
                description={draft.description}
                selected={selectedStarterDraftId === draft.id}
                onClick={() => handleStarterDraft(draft.id)}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <section className="space-y-4">
            <div className={`${card} rounded-md border border-border p-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-heading">
                  {INTENSIVE_COPY.planner.timelineTitle}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOrganize}
                    className={`text-xs font-semibold ${linkClass} ${focusRing}`}
                  >
                    {INTENSIVE_COPY.planner.organizeLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setState(createPlannerState());
                      setSelectedStarterDraftId(null);
                    }}
                    className={`text-xs font-semibold ${linkClass} ${focusRing}`}
                  >
                    {INTENSIVE_COPY.planner.clearAllLabel}
                  </button>
                </div>
              </div>
              {errors.length > 0 ? (
                <div className="mt-3 rounded-md border border-border bg-[rgba(212,175,55,0.12)] px-4 py-3 text-sm text-heading">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">
                    {INTENSIVE_COPY.planner.errorIntro}
                  </p>
                  <p>{getErrorMessage(errors[0])}</p>
                </div>
              ) : null}

              <div className="mt-4 overflow-hidden rounded-md bg-canvas p-0">
                <div className="w-full min-w-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {renderDayColumn("day1", day1Blocks, day1Layout)}
                    {renderDayColumn("day2", day2Blocks, day2Layout)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="hidden lg:block">{renderLibrary()}</div>

            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setLibraryOpen(true)}
                className={`${btnSecondary} w-full rounded-md px-4 py-2 text-sm font-semibold ${focusRing}`}
              >
                {INTENSIVE_COPY.planner.openLibraryLabel}
              </button>
            </div>
          </aside>
        </div>

        {libraryOpen ? (
          <div className="fixed inset-0 z-50 flex items-end bg-[rgba(45,55,72,0.35)] lg:hidden">
            <div className={`${card} w-full rounded-t-2xl p-4 shadow-lg`}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-heading">
                  {INTENSIVE_COPY.planner.libraryTitle}
                </p>
                <button
                  type="button"
                  className={`text-sm font-semibold ${linkClass} ${focusRing}`}
                  onClick={() => setLibraryOpen(false)}
                >
                  {INTENSIVE_COPY.planner.closeLibraryLabel}
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto pb-6">
                {renderLibrary()}
              </div>
            </div>
          </div>
        ) : null}

        {draggingItemId && ghostPosition ? (
          <div
            className="pointer-events-none fixed z-50 rounded-md border border-border bg-canvas px-3 py-2 text-xs text-heading shadow-md"
            style={{
              left: ghostPosition.x + 12,
              top: ghostPosition.y + 12,
            }}
          >
            {INTENSIVE_COPY.catalogCopy[
              draggingItemId as keyof typeof INTENSIVE_COPY.catalogCopy
            ]?.label ?? draggingItemId}
          </div>
        ) : null}
        </section>
      ) : null}

      <section
        id="shareable"
        className={`space-y-8 border-t ${divider} pt-12`}
        aria-label={INTENSIVE_COPY.zones.shareable}
      >
        {!isSharePage ? (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-heading">
              {INTENSIVE_COPY.shareable.title}
            </h2>
            <p className="text-sm text-body">
              {INTENSIVE_COPY.shareable.helper}
            </p>
          </div>
        ) : null}

        {isSharePage ? (
          <div className="rounded-2xl border border-border bg-canvas shadow-[0_18px_45px_var(--color-shadow)]">
            <div className="border-b border-border px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-heading">
                    {shareCopy.wordmark}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-heading">
                    {INTENSIVE_COPY.shareable.reportTitle}
                  </p>
                </div>
                <p className="text-xs text-body">
                  {shareCopy.generatedLabel} {formatGeneratedTimestamp(generatedAt)}
                </p>
              </div>
            </div>

            <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-6">
                {[
                  { day: "day1", periods: day1Periods },
                  { day: "day2", periods: day2Periods },
                ].map((dayGroup) => (
                  <section key={dayGroup.day} className="rounded-xl border border-border">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">
                        {dayGroup.day === "day1"
                          ? INTENSIVE_COPY.planner.day1Title
                          : INTENSIVE_COPY.planner.day2Title}
                      </p>
                    </div>
                    <div className="space-y-3 px-4 py-4">
                      {dayGroup.periods.map((period) => (
                        <div key={`${dayGroup.day}-${period.key}`} className="space-y-2">
                          <p className="text-[11px] uppercase tracking-[0.2em] text-body">
                            {INTENSIVE_COPY.planner.periodLabels[period.key]}
                          </p>
                          {period.items.length === 0 ? (
                            <p className="text-xs text-body">
                              {INTENSIVE_COPY.planner.noItemsLabel}
                            </p>
                          ) : (
                            <div className="overflow-hidden rounded-md border border-border">
                              {period.items.map((block, index) => {
                                const copy =
                                  INTENSIVE_COPY.catalogCopy[
                                    block.itemId as keyof typeof INTENSIVE_COPY.catalogCopy
                                  ];
                                return (
                                  <div
                                    key={block.id}
                                    className={`flex items-center justify-between px-3 py-2 text-sm ${index > 0 ? "border-t border-border" : ""}`}
                                  >
                                    <span className="font-semibold text-heading">
                                      {copy?.label ?? block.itemId}
                                    </span>
                                    <span className="text-xs text-body">
                                      {formatDuration(
                                        getMomentById(block.itemId)?.durationMinutes ?? 0,
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                  {shareCopy.togetherByCategoryTitle}
                </p>
                {SHARE_CATEGORY_ORDER.map((category) => {
                  const minutes = shareSummary.minutesByCategory[category];
                  const percent = shareSummary.percentsByCategory[category];
                  const label = INTENSIVE_COPY.planner.categoryLabels[category];
                  return (
                    <div key={category} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-heading">{label}</span>
                        <span className="font-semibold text-heading">
                          {formatDuration(minutes)} {percent}%
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-divider">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${Math.max(percent, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="space-y-2 rounded-lg border border-border bg-surface-1 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">{shareCopy.expertHeldLabel}</span>
                    <span className="font-semibold text-heading">
                      {formatDuration(shareSummary.expertHeldMinutes)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">
                      {INTENSIVE_COPY.investment.togetherLabel}
                    </span>
                    <span className="font-semibold text-heading">{togetherHours} hrs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-body">
                      {INTENSIVE_COPY.investment.totalLabel}
                    </span>
                    <span className="font-semibold text-heading">
                      {formatCurrency(investment ?? 0)}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={`${card} space-y-6 rounded-xl border border-border p-6`}>
              {hasDraft ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { day: "day1", periods: day1Periods },
                    { day: "day2", periods: day2Periods },
                  ].map((dayGroup) => (
                    <div key={dayGroup.day}>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">
                        {dayGroup.day === "day1"
                          ? INTENSIVE_COPY.planner.day1Title
                          : INTENSIVE_COPY.planner.day2Title}
                      </p>
                      <div className="mt-2 space-y-3 text-sm text-body">
                        {dayGroup.periods.map((period) => (
                          <div key={`${dayGroup.day}-${period.key}`}>
                            <p className="text-xs uppercase tracking-[0.2em] text-body">
                              {INTENSIVE_COPY.planner.periodLabels[period.key]}
                            </p>
                            {period.items.length === 0 ? (
                              <p className="text-xs text-body">
                                {INTENSIVE_COPY.planner.noItemsLabel}
                              </p>
                            ) : (
                              <ul className="mt-1 space-y-1">
                                {period.items.map((block) => {
                                  const copy =
                                    INTENSIVE_COPY.catalogCopy[
                                      block.itemId as keyof typeof INTENSIVE_COPY.catalogCopy
                                    ];
                                  return (
                                    <li
                                      key={block.id}
                                      className="flex items-center justify-between"
                                    >
                                      <span>{copy?.label ?? block.itemId}</span>
                                      <span className="text-xs text-body">
                                        {formatDuration(
                                          getMomentById(block.itemId)?.durationMinutes ?? 0,
                                        )}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-body">
                  {INTENSIVE_COPY.shareable.emptyState}
                </div>
              )}
            </div>

            <aside className={`${card} space-y-4 rounded-xl border border-border p-6`}>
              <div className={`${cardEmphasis} space-y-4 rounded-lg p-4`}>
                <div className="flex items-center justify-between text-sm text-body">
                  <span>{shareCopy.expertHeldLabel}</span>
                  <span className="font-semibold text-heading">
                    {formatDuration(shareSummary.expertHeldMinutes)}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">
                    {shareCopy.togetherByCategoryTitle}
                  </p>
                  {SHARE_CATEGORY_ORDER.map((category) => {
                    const minutes = shareSummary.minutesByCategory[category];
                    const percent = shareSummary.percentsByCategory[category];
                    const label = INTENSIVE_COPY.planner.categoryLabels[category];
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex items-center justify-between text-sm text-body">
                          <span>{label}</span>
                          <span className="font-semibold text-heading">
                            {formatDuration(minutes)} {percent}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-divider">
                          <div
                            className="h-1.5 rounded-full bg-primary"
                            style={{ width: `${Math.max(percent, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        )}

        <div className={`flex flex-col gap-3 border-t ${divider} pt-4 md:flex-row md:items-center md:justify-between`}>
          <p className="text-sm text-body">
            {INTENSIVE_COPY.shareable.actionsHelper}
          </p>
          <div className="flex flex-wrap justify-end gap-3">
            {!isSharePage ? (
              <button
                type="button"
                className={ctaClass("primary")}
                onClick={handleOpenShareDraft}
                disabled={!hasDraft || shareLinkState === "creating"}
              >
                {INTENSIVE_COPY.shareable.shareDraftLabel}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={ctaClass("primary")}
                  onClick={handleCopyLink}
                  disabled={!hasDraft || shareLinkState === "creating"}
                >
                  {copied ? `${shareCopy.copyLinkLabel} ✓` : shareCopy.copyLinkLabel}
                </button>
                <button
                  type="button"
                  className={ctaClass("primary")}
                  onClick={handleExportPdf}
                  disabled={!hasDraft}
                >
                  {shareCopy.exportPdfLabel}
                </button>
                <Link href="/intensive#conversion" className={ctaClass("primary")}>
                  {INTENSIVE_COPY.shareable.joinWaitlistLabel}
                </Link>
              </>
            )}
          </div>
        </div>
        {isSharePage ? (
          <div className={`${card} space-y-4 rounded-xl border border-border p-6`}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {SITE_COPY.fortyEight.includedTitle}
            </h3>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {SITE_COPY.fortyEight.includedItems.map((item) => (
                <div key={item.text} className="rounded-lg border border-border bg-surface-1 p-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
                    {SITE_COPY.fortyEight.includedBadgeLabel}
                  </span>
                  <p className="mt-1 text-xs text-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {!isSharePage ? (
      <section
        id="conversion"
        className={`space-y-10 border-t ${divider} pt-12`}
        aria-label={INTENSIVE_COPY.zones.conversion}
      >
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-heading">
            {INTENSIVE_COPY.investment.title}
          </h2>
          <p className="text-sm text-body">{INTENSIVE_COPY.investment.subhead}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`${card} space-y-4 rounded-xl border border-border p-6`}>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-body">
                <span>{INTENSIVE_COPY.investment.expertHeldLabel}</span>
                <span className="text-right font-semibold text-heading">
                  {expertHeldHours} hrs
                </span>
              </div>
              <div className="flex items-center justify-between text-body">
                <span>{INTENSIVE_COPY.investment.togetherLabel}</span>
                <span className="text-right font-semibold text-heading">
                  {togetherHours} hrs
                </span>
              </div>
            </div>
            <div className={`${cardEmphasis} rounded-lg border border-border p-4`}>
              <div className="flex items-center justify-between text-body">
                <span>{INTENSIVE_COPY.investment.totalLabel}</span>
                <span className="text-right text-xl font-semibold text-heading">
                  {formatCurrency(investment ?? 0)}
                </span>
              </div>
            </div>
            <div className={`space-y-2 border-t ${divider} pt-3`}>
              <div className="text-xs text-body">
                {INTENSIVE_COPY.investment.trustLine}
              </div>
              <div className="text-xs text-body">
                {INTENSIVE_COPY.investment.guardrailLine}
              </div>
            </div>
          </div>

          <div className={`${card} space-y-4 rounded-xl border border-border p-6`}>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-heading">
                {INTENSIVE_COPY.waitlist.heading}
              </h3>
              <p className="text-sm text-body">{INTENSIVE_COPY.waitlist.helper}</p>
            </div>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleWaitlistSubmit}
            >
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(event) => setWaitlistEmail(event.target.value)}
                placeholder={INTENSIVE_COPY.waitlist.inputPlaceholder}
                className={`w-full ${input} ${focusRing} transition focus:border-primary`}
                maxLength={320}
              />
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={waitlistWebsite}
                onChange={(event) => setWaitlistWebsite(event.target.value)}
                className="hidden"
              />
              <button
                type="submit"
                disabled={waitlistSubmitState === "submitting"}
                className={ctaClass("primary")}
              >
                {waitlistSubmitLabel}
              </button>
              <p className="text-xs text-body">{INTENSIVE_COPY.waitlist.microline}</p>
              {waitlistStatusMessage ? (
                <p className="text-xs text-body">{waitlistStatusMessage}</p>
              ) : null}
            </form>
          </div>
        </div>

      </section>
      ) : null}
    </div>
  );
}
