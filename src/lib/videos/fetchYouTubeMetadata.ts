import type { VideoItem, VideoMetadataSource } from "./types";

export interface VideoMetadata {
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
  metadataSource: VideoMetadataSource;
  lastCheckedAt: string;
}

export function fallbackMetadata(videoId: string, url: string): VideoMetadata {
  return {
    videoId,
    url,
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    title: "Metadata unavailable",
    channelTitle: "Unknown channel",
    duration: null,
    publishedAt: null,
    description: null,
    metadataSource: "fallback",
    lastCheckedAt: new Date().toISOString(),
  };
}

export async function fetchYouTubeMetadata(
  videoId: string,
  url: string,
): Promise<VideoMetadata> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return fallbackMetadata(videoId, url);
  }

  try {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
    endpoint.searchParams.set("part", "snippet,contentDetails,status");
    endpoint.searchParams.set("id", videoId);
    endpoint.searchParams.set("key", apiKey);

    const response = await fetch(endpoint);
    if (!response.ok) return fallbackMetadata(videoId, url);

    const data = (await response.json()) as {
      items?: {
        snippet?: {
          title?: string;
          channelTitle?: string;
          channelId?: string;
          thumbnails?: { high?: { url?: string }; medium?: { url?: string } };
          publishedAt?: string;
          description?: string;
        };
        contentDetails?: { duration?: string };
      }[];
    };

    const item = data.items?.[0];
    if (!item?.snippet) return fallbackMetadata(videoId, url);

    return {
      videoId,
      url,
      title: item.snippet.title ?? "Metadata unavailable",
      channelTitle: item.snippet.channelTitle ?? "Unknown channel",
      channelId: item.snippet.channelId,
      thumbnail:
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: item.contentDetails?.duration ?? null,
      publishedAt: item.snippet.publishedAt ?? null,
      description: item.snippet.description ?? null,
      metadataSource: "youtube-api",
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return fallbackMetadata(videoId, url);
  }
}

export function mergeVideoMetadata(
  parsed: Omit<VideoItem, "title" | "channelTitle" | "thumbnail" | "status" | "metadataSource" | "lastCheckedAt">,
  metadata: VideoMetadata,
): VideoItem {
  return {
    ...parsed,
    title: metadata.title,
    channelTitle: metadata.channelTitle,
    channelId: metadata.channelId,
    channelUrl: metadata.channelUrl,
    thumbnail: metadata.thumbnail,
    duration: metadata.duration ?? null,
    publishedAt: metadata.publishedAt ?? null,
    description: metadata.description ?? null,
    status: metadata.title === "Metadata unavailable" ? "needsReview" : "needsReview",
    metadataSource: metadata.metadataSource,
    lastCheckedAt: metadata.lastCheckedAt,
  };
}
