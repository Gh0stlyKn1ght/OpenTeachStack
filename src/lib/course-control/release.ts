import type { CourseRegistryRecord } from "./types";

export function courseReleaseBlockers(record: CourseRegistryRecord): string[] {
  const blockers: string[] = [];
  const policy = record.packet?.releasePolicy;

  if (policy?.requiresHumanReview && record.status.humanReviewed !== true) {
    blockers.push("humanReviewed is not true");
  }

  if (policy?.requiresRealLessons && record.status.hasRealLessons !== true) {
    blockers.push("hasRealLessons is not true");
  }

  if (policy?.requiresTemplates && record.status.hasTemplates !== true) {
    blockers.push("hasTemplates is not true");
  }

  if (policy?.requiresSamplePacket && record.status.hasSamplePacket !== true) {
    blockers.push("hasSamplePacket is not true");
  }

  if (record.status.status !== "live") {
    blockers.push(`status is ${record.status.status}`);
  }

  return blockers;
}
