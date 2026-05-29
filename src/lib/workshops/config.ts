import { SITE_COPY } from "@/lib/copy";

const { workshops } = SITE_COPY;

export const WORKSHOP_TOPICS = workshops.topics;
export type WorkshopDate = {
  id: string;
  topicId: string;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  bookingUrl: string;
};

export const UPCOMING_DATES: WorkshopDate[] = workshops.upcomingDates as WorkshopDate[];

export type WorkshopTopic = (typeof WORKSHOP_TOPICS)[number];
