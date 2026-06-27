import { generateVideoIndex, printReport } from "./lib/video-library.mjs";

const { parsed, index } = generateVideoIndex();
printReport(index, parsed);

if (index.report.blocked > 0 || index.report.unavailable > 0) {
  process.exitCode = 1;
}
