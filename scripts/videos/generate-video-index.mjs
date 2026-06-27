import { generateVideoIndex } from "./lib/video-library.mjs";

const { index } = generateVideoIndex();

console.log(`Generated data/video-index.json with ${index.videos.length} video(s).`);
