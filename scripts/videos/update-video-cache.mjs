import { parseApprovedVideos, refreshVideoCache } from "./lib/video-library.mjs";

const parsed = parseApprovedVideos();
await refreshVideoCache(parsed.videos);

console.log(`Video cache updated for ${parsed.videos.length} video(s).`);
