import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
export const root = join(scriptDir, "..", "..", "..");
export const approvedVideosPath = join(root, "content", "videos", "approved-videos.md");
export const approvedChannelsPath = join(root, "content", "videos", "approved-channels.json");
export const videoCachePath = join(root, "content", "videos", "video-cache.json");
export const videoIndexPath = join(root, "data", "video-index.json");

const urlPattern = /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s)]+/g;
const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

export function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

export function extractYouTubeId(input) {
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const watchId = parsed.searchParams.get("v");
      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) return watchId;
      const pathMatch = parsed.pathname.match(/^\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
      return pathMatch?.[1] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

function parseFrontmatter(source) {
  if (!source.startsWith("---")) return { data: {}, body: source };
  const end = source.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: source };

  const raw = source.slice(3, end).trim();
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) data[match[1].trim()] = match[2].trim();
  }

  return { data, body: source.slice(end + 4) };
}

function parseTags(value) {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseBoolean(value) {
  return value?.trim().toLowerCase() === "true";
}

export function parseApprovedVideos() {
  const source = readFileSync(approvedVideosPath, "utf8");
  const parsed = parseFrontmatter(source);
  const videos = [];
  const duplicates = [];
  const invalidUrls = [];
  const seen = new Set();
  let section = "Uncategorized";
  let hints = {};

  for (const rawLine of parsed.body.split(/\r?\n/)) {
    const line = rawLine.trim();
    const heading = line.match(/^##+\s+(.+)$/);

    if (heading) {
      section = heading[1].trim();
      hints = {};
      continue;
    }

    const hint = line.match(/^(tags|category|level|notes|featured):\s*(.+)$/i);
    if (hint) {
      hints[hint[1].toLowerCase()] = hint[2].trim();
      continue;
    }

    const urls = line.match(urlPattern) ?? [];
    for (const url of urls) {
      const cleanUrl = url.replace(/[),.]+$/, "");
      const videoId = extractYouTubeId(cleanUrl);

      if (!videoId) {
        invalidUrls.push(cleanUrl);
        continue;
      }

      if (seen.has(videoId)) {
        duplicates.push(cleanUrl);
        continue;
      }

      seen.add(videoId);
      videos.push({
        videoId,
        url: cleanUrl,
        section,
        category: hints.category ?? section,
        tags: parseTags(hints.tags),
        level: hints.level ?? null,
        notes: hints.notes ?? null,
        featured: parseBoolean(hints.featured) || section.toLowerCase() === "featured",
      });
    }
  }

  return {
    title: parsed.data.title ?? "OpenTeachStack Video Library",
    description: parsed.data.description ?? "Curated educational videos for teachers.",
    page: parsed.data.page ?? "/videos",
    videos,
    duplicates,
    invalidUrls,
  };
}

function fallbackMetadata(video) {
  return {
    videoId: video.videoId,
    url: video.url,
    title: "Metadata unavailable",
    channelTitle: "Unknown channel",
    thumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
    duration: null,
    publishedAt: null,
    description: null,
    metadataSource: "fallback",
    lastCheckedAt: new Date().toISOString(),
  };
}

async function fetchApiMetadata(video) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
  endpoint.searchParams.set("part", "snippet,contentDetails,status");
  endpoint.searchParams.set("id", video.videoId);
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint);
  if (!response.ok) return null;
  const data = await response.json();
  const item = data.items?.[0];
  if (!item?.snippet) return null;

  return {
    videoId: video.videoId,
    url: video.url,
    title: item.snippet.title ?? "Metadata unavailable",
    channelTitle: item.snippet.channelTitle ?? "Unknown channel",
    channelId: item.snippet.channelId,
    thumbnail:
      item.snippet.thumbnails?.high?.url ??
      item.snippet.thumbnails?.medium?.url ??
      `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
    duration: item.contentDetails?.duration ?? null,
    publishedAt: item.snippet.publishedAt ?? null,
    description: item.snippet.description ?? null,
    metadataSource: "youtube-api",
    lastCheckedAt: new Date().toISOString(),
  };
}

async function fetchOEmbedMetadata(video) {
  try {
    const endpoint = new URL("https://www.youtube.com/oembed");
    endpoint.searchParams.set("url", video.url);
    endpoint.searchParams.set("format", "json");
    const response = await fetch(endpoint);
    if (!response.ok) return null;
    const data = await response.json();

    return {
      videoId: video.videoId,
      url: video.url,
      title: data.title ?? "Metadata unavailable",
      channelTitle: data.author_name ?? "Unknown channel",
      channelUrl: data.author_url,
      thumbnail: data.thumbnail_url ?? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
      duration: null,
      publishedAt: null,
      description: null,
      metadataSource: "fallback",
      lastCheckedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function refreshVideoCache(parsedVideos) {
  const existing = readJson(videoCachePath, {});
  const next = { ...existing };

  for (const video of parsedVideos) {
    const cached = existing[video.videoId];
    const cachedAt = cached?.lastCheckedAt ? Date.parse(cached.lastCheckedAt) : 0;
    if (cached && Date.now() - cachedAt < sevenDaysMs) continue;

    next[video.videoId] =
      (await fetchApiMetadata(video)) ??
      (await fetchOEmbedMetadata(video)) ??
      fallbackMetadata(video);
  }

  writeJson(videoCachePath, next);
  return next;
}

function normalize(value) {
  return (value ?? "").trim().replace(/\/$/, "").toLowerCase();
}

export function buildIndex({ parsed, cache, approvedSources }) {
  const approved = new Set((approvedSources.approvedChannels ?? []).map(normalize));
  const blocked = new Set((approvedSources.blockedChannels ?? []).map(normalize));

  const videos = parsed.videos.map((video) => {
    const metadata = cache[video.videoId] ?? fallbackMetadata(video);
    const channelUrl = normalize(metadata.channelUrl);
    const channelTitle = normalize(metadata.channelTitle);
    const unavailable = metadata.title === "Metadata unavailable";
    const isBlocked = blocked.has(channelUrl) || blocked.has(channelTitle);
    const isApproved = approved.has(channelUrl) || approved.has(channelTitle);
    const status = unavailable
      ? "needsReview"
      : isBlocked
        ? "blocked"
        : isApproved
          ? "approved"
          : approvedSources.allowUnlistedManualReview
            ? "needsReview"
            : "blocked";

    return {
      ...metadata,
      category: video.category,
      section: video.section,
      tags: video.tags,
      level: video.level,
      notes: video.notes,
      featured: video.featured,
      status,
    };
  });

  const report = videos.reduce(
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
      duplicates: parsed.duplicates.length,
      missingMetadata: 0,
    },
  );

  return {
    title: parsed.title,
    description: parsed.description,
    page: parsed.page,
    generatedAt: new Date().toISOString(),
    videos,
    report,
  };
}

export function generateVideoIndex() {
  const parsed = parseApprovedVideos();
  const cache = readJson(videoCachePath, {});
  const approvedSources = readJson(approvedChannelsPath, {
    allowUnlistedManualReview: true,
    approvedChannels: [],
    blockedChannels: [],
    approvedDomains: ["youtube.com", "youtu.be"],
  });
  const index = buildIndex({ parsed, cache, approvedSources });
  writeJson(videoIndexPath, index);
  return { parsed, index };
}

export function printReport(index, parsed) {
  const report = index.report;
  console.log(`Video validation report`);
  console.log(`total videos: ${report.total}`);
  console.log(`approved: ${report.approved}`);
  console.log(`needs review: ${report.needsReview}`);
  console.log(`blocked: ${report.blocked}`);
  console.log(`unavailable: ${report.unavailable}`);
  console.log(`duplicate links: ${report.duplicates}`);
  console.log(`missing metadata: ${report.missingMetadata}`);

  if (parsed.invalidUrls.length) {
    console.log(`invalid urls: ${parsed.invalidUrls.join(", ")}`);
  }
}
