export type VideoStatus = "approved" | "needsReview" | "blocked" | "unavailable";

export type VideoMetadataSource = "youtube-api" | "cache" | "fallback";

export interface VideoItem {
  videoId: string;
  url: string;
  title: string;
  channelTitle: string;
  channelId?: string;
  channelUrl?: string;
  thumbnail: string;
  duration?: string | null;
  publishedAt?: string | null;
  description?: string | null;
  category: string;
  section: string;
  tags: string[];
  level?: string | null;
  notes?: string | null;
  featured?: boolean;
  status: VideoStatus;
  metadataSource: VideoMetadataSource;
  lastCheckedAt: string;
}

export interface VideoLibraryIndex {
  title: string;
  description: string;
  page: string;
  generatedAt: string;
  videos: VideoItem[];
  report?: VideoValidationReport;
}

export interface ApprovedVideoSources {
  allowUnlistedManualReview: boolean;
  approvedChannels: string[];
  blockedChannels: string[];
  approvedDomains: string[];
}

export interface ParsedVideoLink {
  videoId: string;
  url: string;
  section: string;
  category: string;
  tags: string[];
  level?: string | null;
  notes?: string | null;
  featured?: boolean;
}

export interface VideoValidationReport {
  total: number;
  approved: number;
  needsReview: number;
  blocked: number;
  unavailable: number;
  duplicates: number;
  missingMetadata: number;
}
