import { existsSync } from "node:fs";
import { join } from "node:path";
import { listCourseDirectories, listCourseRecords, readCourseRecord } from "./lib/course-registry.mjs";

const root = process.cwd();
const allowedStatuses = new Set(["planned", "draft", "review", "live", "archived"]);
const failures = [];

function fail(message) {
  failures.push(message);
}

const records = listCourseRecords(root);
const courseDirectories = listCourseDirectories(root);

if (courseDirectories.length === 0) {
  fail("content/courses is missing.");
} else {
  const readableRecords = new Set(records.map((record) => record.slug));

  for (const courseSlug of courseDirectories) {
    if (!readableRecords.has(courseSlug) || !readCourseRecord(courseSlug, root)) {
      fail(`${courseSlug} is missing readable course.json or status.json.`);
    }
  }

  for (const record of records) {
    const courseSlug = record.slug;
    const status = record.status;

    if (!allowedStatuses.has(status.status)) {
      fail(`${courseSlug}/status.json has invalid status ${status.status}.`);
    }

    if (status.sourceOfTruth !== `content/courses/${courseSlug}`) {
      fail(`${courseSlug}/status.json has invalid sourceOfTruth ${status.sourceOfTruth}.`);
    }

    const rootTeachable = join(root, "teachable", courseSlug);
    if (existsSync(rootTeachable) && !status.exportTargets?.includes("teachable")) {
      fail(`${courseSlug} has root Teachable export support but status.json does not list teachable.`);
    }

    if (status.status === "live") {
      if (!status.hasRealLessons) fail(`${courseSlug} is live without hasRealLessons.`);
      if (!status.hasTemplates) fail(`${courseSlug} is live without hasTemplates.`);
      if (!status.hasSamplePacket) fail(`${courseSlug} is live without hasSamplePacket.`);
      if (!status.humanReviewed) fail(`${courseSlug} is live without humanReviewed.`);
    }

    if (!status.hasRealLessons && status.status === "live") {
      fail(`${courseSlug} cannot be live with hasRealLessons=false.`);
    }
  }
}

if (failures.length > 0) {
  console.error("Course source-truth check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Course source-truth check passed.");
