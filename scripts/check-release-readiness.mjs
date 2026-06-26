import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";
import {
  GENERATED_STATUSES,
  PUBLIC_RELEASE_STATUSES,
  RELEASE_COURSE_STATUSES,
} from "./lib/content-fingerprints.mjs";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");

function fail(message) {
  console.error(`Release readiness violation: ${message}`);
  process.exitCode = 1;
}

function walkMdx(directory) {
  const result = [];
  if (!existsSync(directory)) return result;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMdx(filePath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      result.push(filePath);
    }
  }
  return result;
}

function display(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

for (const courseSlug of readdirSync(coursesRoot).sort()) {
  const courseRoot = join(coursesRoot, courseSlug);
  const courseJsonPath = join(courseRoot, "course.json");
  if (!existsSync(courseJsonPath)) continue;

  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  const courseReadiness = courseJson.courseReadiness ?? "internal";
  const releasedCourse =
    PUBLIC_RELEASE_STATUSES.has(courseJson.migrationStatus) ||
    RELEASE_COURSE_STATUSES.has(courseReadiness);

  if (!releasedCourse) continue;

  const generatedLessons = [];
  for (const filePath of walkMdx(join(courseRoot, "lessons"))) {
    const parsed = matter(readFileSync(filePath, "utf8"));
    if (GENERATED_STATUSES.has(parsed.data.migrationStatus)) {
      generatedLessons.push(display(filePath));
    }
  }

  if (generatedLessons.length > 0) {
    fail(
      `${courseSlug} is marked release-ready but still has generated/scaffolded lessons:\n${generatedLessons
        .slice(0, 20)
        .map((item) => `  - ${item}`)
        .join("\n")}${generatedLessons.length > 20 ? `\n  ...and ${generatedLessons.length - 20} more` : ""}`,
    );
  }

  console.log(`${courseSlug}: release-ready lesson status check passed.`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Release readiness check passed.");
