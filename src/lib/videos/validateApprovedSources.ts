import type {
  ApprovedVideoSources,
  VideoItem,
  VideoValidationReport,
} from "./types";

function normalize(value: string | undefined): string {
  return (value ?? "").trim().replace(/\/$/, "").toLowerCase();
}

export function validateApprovedSources(
  videos: VideoItem[],
  sources: ApprovedVideoSources,
  duplicates = 0,
): { videos: VideoItem[]; report: VideoValidationReport } {
  const approved = new Set(sources.approvedChannels.map(normalize));
  const blocked = new Set(sources.blockedChannels.map(normalize));

  const validated = videos.map((video) => {
    const channelUrl = normalize(video.channelUrl);
    const channelTitle = normalize(video.channelTitle);
    const isBlocked = blocked.has(channelUrl) || blocked.has(channelTitle);
    const isApproved = approved.has(channelUrl) || approved.has(channelTitle);

    if (video.status === "unavailable") return video;
    if (isBlocked) return { ...video, status: "blocked" as const };
    if (isApproved) return { ...video, status: "approved" as const };

    return {
      ...video,
      status: sources.allowUnlistedManualReview ? "needsReview" : "blocked",
    } as VideoItem;
  });

  const report = validated.reduce<VideoValidationReport>(
    (summary, video) => {
      summary.total += 1;
      summary[video.status] += 1;
      if (video.title === "Metadata unavailable" || video.channelTitle === "Unknown channel") {
        summary.missingMetadata += 1;
      }
      return summary;
    },
    {
      total: 0,
      approved: 0,
      needsReview: 0,
      blocked: 0,
      unavailable: 0,
      duplicates,
      missingMetadata: 0,
    },
  );

  return { videos: validated, report };
}
