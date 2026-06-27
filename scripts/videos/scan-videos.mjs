import { parseApprovedVideos } from "./lib/video-library.mjs";

const parsed = parseApprovedVideos();

console.log(`Video scan found ${parsed.videos.length} unique video(s).`);
if (parsed.duplicates.length) {
  console.log(`Duplicate links: ${parsed.duplicates.join(", ")}`);
}
if (parsed.invalidUrls.length) {
  console.log(`Invalid URLs: ${parsed.invalidUrls.join(", ")}`);
}
