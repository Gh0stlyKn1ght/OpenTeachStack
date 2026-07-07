export type CourseStatus = "planned" | "draft" | "review" | "live" | "archived";

export type ReleaseChannel =
  | "planned"
  | "draft"
  | "internal-review"
  | "public-preview"
  | "release-candidate"
  | "stable"
  | "archived";

export type CourseOwner = "dedicated" | "generic";

export type CourseReader = "course-book" | "course-packet";

export interface CourseContentRoots {
  lessons: string;
  labs: string;
  templates: string;
  references: string;
  assets: string;
  docs: string;
}

export interface CourseReleasePolicy {
  requiresHumanReview: boolean;
  requiresRealLessons: boolean;
  requiresTemplates: boolean;
  requiresSamplePacket: boolean;
}

export interface CoursePacketManifest {
  schemaVersion: number;
  code: string;
  slug: string;
  title: string;
  owner: CourseOwner;
  canonicalRoute: string;
  reader: CourseReader;
  sourceRegistry: string;
  sourceRoot: string;
  contentRoots: CourseContentRoots;
  draftRoot: string;
  exportsRoot: string;
  reportsRoot: string;
  generatedRoot: string;
  requiredChecks: string[];
  releasePolicy: CourseReleasePolicy;
}

export interface CourseJsonChapter {
  number: string;
  slug: string;
  title: string;
  buildArtifact?: string;
  lessonCount?: number;
}

export interface CourseJson {
  code: string;
  slug: string;
  title: string;
  owner?: CourseOwner;
  canonicalRoute: string;
  sourceRegistry?: string;
  migrationStatus?: string;
  courseReadiness?: string;
  chapters?: CourseJsonChapter[];
}

export interface CourseStatusRecord {
  status: CourseStatus;
  sourceOfTruth: string;
  releaseChannel?: ReleaseChannel;
  exportTargets?: string[];
  hasRealLessons?: boolean;
  hasTemplates?: boolean;
  hasSamplePacket?: boolean;
  humanReviewed?: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  lastValidatedAt?: string;
  releaseReadiness?: string;
  notes?: string;
}

export interface CourseRegistryRecord {
  code: string;
  slug: string;
  title: string;
  owner: CourseOwner;
  canonicalRoute: string;
  reader: CourseReader;
  sourceRoot: string;
  sourceRegistry: string;
  packetized: boolean;
  packet?: CoursePacketManifest;
  course: CourseJson;
  status: CourseStatusRecord;
}
