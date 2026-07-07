import type { CourseRegistryRecord } from "./types";

export function isCourseLive(record: CourseRegistryRecord): boolean {
  return record.status.status === "live" && record.status.humanReviewed === true;
}

export function releaseChannelFor(record: CourseRegistryRecord): string {
  return record.status.releaseChannel ?? record.status.status;
}

export function releaseReadinessNote(record: CourseRegistryRecord): string {
  return record.status.releaseReadiness ?? "No release readiness note recorded.";
}
