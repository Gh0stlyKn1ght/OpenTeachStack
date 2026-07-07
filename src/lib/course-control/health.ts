import type { CourseRegistryRecord } from "./types";

export interface CourseHealthSummary {
  slug: string;
  title: string;
  status: string;
  humanReviewed: boolean;
  packetized: boolean;
  releaseReady: boolean;
  notes: string;
}

export function summarizeCourseHealth(record: CourseRegistryRecord): CourseHealthSummary {
  return {
    slug: record.slug,
    title: record.title,
    status: record.status.status,
    humanReviewed: record.status.humanReviewed === true,
    packetized: record.packetized,
    releaseReady: record.status.status === "live" && record.status.humanReviewed === true,
    notes: record.status.releaseReadiness ?? record.status.notes ?? "",
  };
}
