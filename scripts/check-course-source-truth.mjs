import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");
const allowedStatuses = new Set(["live", "draft", "planned", "archived"]);
const failures = [];

function fail(message) {
  failures.push(message);
}

if (!existsSync(coursesRoot)) {
  fail("content/courses is missing.");
} else {
  const courses = readdirSync(coursesRoot, { withFileTypes: true }).filter((entry) =>
    entry.isDirectory(),
  );

  for (const course of courses) {
    const courseSlug = course.name;
    const base = join(coursesRoot, courseSlug);
    const statusPath = join(base, "status.json");

    if (!existsSync(statusPath)) {
      fail(`${courseSlug} is missing status.json.`);
      continue;
    }

    const status = JSON.parse(readFileSync(statusPath, "utf8"));

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
