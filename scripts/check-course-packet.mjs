import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  EXPECTED_PACKETIZED_COURSE_SLUGS,
  listCourseRecords,
  readCourseRecord,
} from "./lib/course-registry.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const courseArg = valueAfter("--course");
const allowedStatuses = new Set(["planned", "draft", "review", "live", "archived"]);
const requiredPacketKeys = [
  "schemaVersion",
  "code",
  "slug",
  "title",
  "owner",
  "canonicalRoute",
  "reader",
  "sourceRegistry",
  "sourceRoot",
  "contentRoots",
  "draftRoot",
  "exportsRoot",
  "reportsRoot",
  "generatedRoot",
  "requiredChecks",
  "releasePolicy",
];
const migratedCourses = new Set(EXPECTED_PACKETIZED_COURSE_SLUGS);
const failures = [];

function valueAfter(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

function fail(message) {
  failures.push(message);
}

const records = courseArg
  ? [readCourseRecord(courseArg, root)].filter(Boolean)
  : listCourseRecords(root);

if (courseArg && records.length === 0) {
  fail(`Unknown course: ${courseArg}`);
}

for (const record of records) {
  validateRecord(record);
}

function validateRecord(record) {
  const { slug, course, status, packet } = record;

  if (!allowedStatuses.has(status.status)) {
    fail(`${slug}/status.json has unsupported status ${status.status}.`);
  }

  if (status.sourceOfTruth !== `content/courses/${slug}`) {
    fail(`${slug}/status.json sourceOfTruth must be content/courses/${slug}.`);
  }

  if (course.slug !== slug) {
    fail(`${slug}/course.json slug is ${course.slug}.`);
  }

  if (course.canonicalRoute !== `/book/${slug}`) {
    fail(`${slug}/course.json canonicalRoute must be /book/${slug}.`);
  }

  if (!packet) {
    if (migratedCourses.has(slug)) {
      fail(`${slug} is migrated and must include course.packet.json.`);
    }
    return;
  }

  for (const key of requiredPacketKeys) {
    if (!(key in packet)) fail(`${slug}/course.packet.json missing ${key}.`);
  }

  if (packet.schemaVersion !== 1) {
    fail(`${slug}/course.packet.json schemaVersion must be 1.`);
  }

  if (packet.slug !== slug) {
    fail(`${slug}/course.packet.json slug is ${packet.slug}.`);
  }

  if (packet.code !== course.code) {
    fail(`${slug}/course.packet.json code does not match course.json.`);
  }

  if (packet.title !== course.title) {
    fail(`${slug}/course.packet.json title does not match course.json.`);
  }

  if (packet.canonicalRoute !== course.canonicalRoute) {
    fail(`${slug}/course.packet.json canonicalRoute does not match course.json.`);
  }

  if (packet.sourceRoot !== `content/courses/${slug}`) {
    fail(`${slug}/course.packet.json sourceRoot must be content/courses/${slug}.`);
  }

  for (const [name, relativePath] of Object.entries(packet.contentRoots ?? {})) {
    if (!relativePath.startsWith(`content/courses/${slug}/`)) {
      fail(`${slug}/course.packet.json contentRoots.${name} points outside the course packet.`);
      continue;
    }

    if (!existsSync(join(root, relativePath))) {
      fail(`${slug}/course.packet.json contentRoots.${name} path does not exist: ${relativePath}.`);
    }
  }

  for (const field of ["draftRoot", "exportsRoot", "reportsRoot", "generatedRoot"]) {
    if (!String(packet[field] ?? "").startsWith(`content/courses/${slug}/`)) {
      fail(`${slug}/course.packet.json ${field} points outside the course packet.`);
    }
  }

  if (!Array.isArray(packet.requiredChecks) || packet.requiredChecks.length === 0) {
    fail(`${slug}/course.packet.json requiredChecks must list at least one check.`);
  }

  if (packet.releasePolicy?.requiresHumanReview !== true) {
    fail(`${slug}/course.packet.json releasePolicy must require human review.`);
  }

  if (status.status === "live" && status.humanReviewed !== true) {
    fail(`${slug} cannot be live without humanReviewed true.`);
  }
}

if (failures.length > 0) {
  console.error("Course packet check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const scope = courseArg ? courseArg : `${records.length} courses`;
console.log(`Course packet check passed for ${scope}.`);
