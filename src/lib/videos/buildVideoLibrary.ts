import type {
  ApprovedVideoSources,
  VideoItem,
  VideoLibraryIndex,
} from "./types";
import { validateApprovedSources } from "./validateApprovedSources";

export function buildVideoLibraryIndex({
  title,
  description,
  page,
  videos,
  approvedSources,
  duplicates = 0,
}: {
  title: string;
  description: string;
  page: string;
  videos: VideoItem[];
  approvedSources: ApprovedVideoSources;
  duplicates?: number;
}): VideoLibraryIndex {
  const validated = validateApprovedSources(videos, approvedSources, duplicates);

  return {
    title,
    description,
    page,
    generatedAt: new Date().toISOString(),
    videos: validated.videos,
    report: validated.report,
  };
}
