import matter from "gray-matter";
import type { ParsedVideoLink } from "./types";
import { extractYouTubeId, isSupportedYouTubeUrl } from "./extractYouTubeId";

const urlPattern = /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s)]+/g;

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseBoolean(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

export function parseVideoMarkdown(source: string): {
  frontmatter: Record<string, unknown>;
  videos: ParsedVideoLink[];
  duplicates: string[];
  invalidUrls: string[];
} {
  const parsed = matter(source);
  const videos: ParsedVideoLink[] = [];
  const duplicates: string[] = [];
  const invalidUrls: string[] = [];
  const seen = new Set<string>();
  let section = "Uncategorized";
  let hints: Record<string, string> = {};

  for (const rawLine of parsed.content.split(/\r?\n/)) {
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

      if (!videoId || !isSupportedYouTubeUrl(cleanUrl)) {
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
    frontmatter: parsed.data,
    videos,
    duplicates,
    invalidUrls,
  };
}
