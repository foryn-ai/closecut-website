export type RectPct = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type LabelPosition = "top-center" | "top-left";

export type OfficeHotspotConfig = {
  href: string;
  label?: string;
  visualRect: RectPct;
  hitRect: RectPct;
  labelPosition?: LabelPosition;
};

export type OfficePlacementConfig = {
  id: string;
  imageSrc: string;
  imageClass: string;
  hotspotClass: string;
  hotspot?: OfficeHotspotConfig;
  z: number;
};

export const LABEL_WIDTH = 12;
export const LABEL_HEIGHT = 4;
export const LABEL_GAP = 1.4;
export const VIEWPORT_MARGIN = 1;

export const LABEL_POSITION_ORDER: LabelPosition[] = ["top-center"];

export const SCENE_AVOID_RECTS: RectPct[] = [
  { left: 22.5, top: 54, width: 20, height: 30 },
  { left: 33.2, top: 50, width: 33, height: 36 },
  { left: 56.6, top: 24, width: 15, height: 60 },
  { left: 64, top: 54, width: 15, height: 30 },
  { left: 75, top: 57, width: 13, height: 28 },
  { left: 70.2, top: 41.1, width: 14, height: 18 },
  { left: 77.5, top: 48, width: 9, height: 11 },
  { left: 79.5, top: 24, width: 5, height: 18 },
  { left: 20, top: 46, width: 10, height: 19 },
  { left: 30, top: 30, width: 8, height: 10 },
  { left: 16, top: 7, width: 68, height: 16 },
];

export const LAMP_GLOW_RECT: RectPct = {
  left: 56.2,
  top: 24,
  width: 16.5,
  height: 56,
};

export const OFFICE_PLACEMENTS: OfficePlacementConfig[] = [
  {
    id: "bookcase-left",
    imageSrc: "/furniture/bookcase-elevation-color.png",
    imageClass: "left-[11%] top-[28%] h-[56%] w-[20%] max-sm:hidden",
    hotspotClass: "left-[13%] top-[32%] h-[46%] w-[16%] max-sm:hidden",
    hotspot: {
      href: "/resources",
      visualRect: { left: 11, top: 32, width: 16, height: 46 },
      hitRect: { left: 13, top: 28.5, width: 16, height: 55 },
    },
    z: 12,
  },
  {
    id: "small-plant-pot-bookcase",
    imageSrc: "/furniture/small-plant-pot.svg",
    imageClass: "left-[20%] top-[46%] h-[19%] w-[10%] max-sm:hidden",
    hotspotClass: "left-[20.4%] top-[46.3%] h-[18%] w-[9.2%] max-sm:hidden",
    z: 13,
  },
  {
    id: "bedside-table-between",
    imageSrc: "/furniture/bedside-table-elevation-color.png",
    imageClass: "left-[22.5%] top-[54%] h-[30%] w-[20%] max-sm:hidden",
    hotspotClass: "left-[23%] top-[63.5%] h-[20%] w-[12%] max-sm:hidden",
    z: 23,
  },
  {
    id: "couch-center",
    imageSrc: "/furniture/couch-elevation-color.png",
    imageClass:
      "left-[33.2%] top-[50%] h-[36%] w-[33%] max-sm:left-[19.2%] max-sm:top-[52%] max-sm:h-[34%] max-sm:w-[60%]",
    hotspotClass:
      "left-[35.2%] top-[57%] h-[24%] w-[28%] max-sm:left-[23.2%] max-sm:top-[57%] max-sm:h-[26%] max-sm:w-[52%]",
    hotspot: {
      href: "/therapy",
      visualRect: { left: 33, top: 29, width: 31, height: 53.5 },
      hitRect: { left: 37.5, top: 29, width: 24, height: 53.5 },
      labelPosition: "top-center",
    },
    z: 22,
  },
  {
    id: "lamp-right-of-couch",
    imageSrc: "/furniture/lamp-2-elevation-color.png",
    imageClass: "left-[56.6%] top-[24%] h-[60%] w-[15%] max-sm:hidden",
    hotspotClass: "left-[57.4%] top-[28%] h-[50%] w-[13.2%] max-sm:hidden",
    hotspot: {
      href: "/intensive",
      visualRect: { left: 57.4, top: 28, width: 13.2, height: 50 },
      hitRect: { left: 56.6, top: 24, width: 15.4, height: 60 },
    },
    z: 11,
  },
  {
    id: "art-above-couch",
    imageSrc: "/furniture/frame-2-elevation-color.png",
    imageClass:
      "left-[42%] top-[29%] h-[18%] w-[16%] max-sm:left-[35%] max-sm:top-[28%] max-sm:h-[14%] max-sm:w-[30%]",
    hotspotClass:
      "left-[43%] top-[30%] h-[16%] w-[14%] max-sm:left-[37%] max-sm:top-[29%] max-sm:h-[12%] max-sm:w-[26%]",
    z: 6,
  },
  {
    id: "clock-left-of-couch-above-table",
    imageSrc: "/furniture/clock-elevation-color.png",
    imageClass: "left-[30%] top-[30%] h-[10%] w-[8%] max-sm:hidden",
    hotspotClass: "left-[30.5%] top-[30.5%] h-[9%] w-[7%] max-sm:hidden",
    hotspot: {
      href: "/intensive",
      label: "Two day agenda",
      visualRect: { left: 28.5, top: 30.5, width: 7, height: 9 },
      hitRect: { left: 29.5, top: 29.5, width: 9, height: 11 },
    },
    z: 6,
  },
  {
    id: "office-chair-between",
    imageSrc: "/furniture/office-chair-2.svg",
    imageClass:
      "left-[64%] top-[54%] h-[30%] w-[15%] max-sm:left-[63%] max-sm:top-[60%] max-sm:h-[24%] max-sm:w-[16%]",
    hotspotClass:
      "left-[65%] top-[60%] h-[24%] w-[13%] max-sm:left-[64%] max-sm:top-[62%] max-sm:h-[20%] max-sm:w-[14%]",
    hotspot: {
      href: "/about",
      visualRect: { left: 65, top: 60, width: 13, height: 24 },
      hitRect: { left: 68.5, top: 53.5, width: 6, height: 34 },
    },
    z: 21,
  },
  {
    id: "desk-right",
    imageSrc: "/furniture/desk-back-view.svg",
    imageClass: "left-[75%] top-[57%] h-[28%] w-[13%] max-sm:hidden",
    hotspotClass: "left-[75.5%] top-[59%] h-[24%] w-[11.5%] max-sm:hidden",
    z: 12,
  },
  {
    id: "plant-pot-on-desk",
    imageSrc: "/furniture/plant-pot.svg",
    imageClass: "left-[70.2%] top-[41.1%] h-[18%] w-[14%] max-sm:hidden",
    hotspotClass: "left-[70.6%] top-[41.5%] h-[16.8%] w-[12.8%] max-sm:hidden",
    hotspot: {
      href: "/billing",
      visualRect: { left: 70.6, top: 41.5, width: 12.8, height: 16.8 },
      hitRect: { left: 74.2, top: 40.7, width: 10.8, height: 18.4 },
    },
    z: 14,
  },
  {
    id: "computer-on-desk",
    imageSrc: "/furniture/computer-back-view.svg",
    imageClass: "left-[77.5%] top-[48%] h-[11%] w-[9%] max-sm:hidden",
    hotspotClass: "left-[77.5%] top-[48%] h-[11%] w-[9%] max-sm:hidden",
    z: 13,
  },
  {
    id: "calendar-right-of-computer",
    imageSrc: "/furniture/calendar.svg",
    imageClass: "left-[79.5%] top-[24%] h-[18%] w-[5%] max-sm:hidden",
    hotspotClass: "left-[79.8%] top-[24.5%] h-[17%] w-[4.5%] max-sm:hidden",
    hotspot: {
      href: "/contact",
      visualRect: { left: 78.8, top: 24.5, width: 4.5, height: 17 },
      hitRect: { left: 79, top: 24, width: 6, height: 18.5 },
    },
    z: 6,
  },
];
