import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { listCourseDirectories, listCourseRecords } from "./lib/course-registry.mjs";

const root = process.cwd();
const courseRoot = join(root, "content", "courses");
const requiredEntries = [
  "README.md",
  "course.json",
  "status.json",
  "lessons",
  "labs",
  "assets",
  "docs",
  "templates",
  "references",
];
const strictReadiness = new Set(["release", "public-beta", "teachable-ready"]);
const noLessonReadiness = new Set(["coming-soon", "planned", "active-preview"]);

function fail(message) {
  console.error(`Course content layout violation: ${message}`);
  process.exitCode = 1;
}

function walkFiles(directory, predicate) {
  if (!existsSync(directory)) return [];
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath, predicate));
    } else if (!predicate || predicate(fullPath)) {
      result.push(fullPath);
    }
  }
  return result;
}

if (!existsSync(courseRoot)) {
  fail("content/courses is missing.");
} else {
  const courseDirectories = listCourseDirectories(root);
  const records = listCourseRecords(root);
  const recordsBySlug = new Map(records.map((record) => [record.slug, record]));

  if (courseDirectories.length === 0) {
    fail("content/courses has no course directories.");
  }

  for (const course of courseDirectories) {
    const record = recordsBySlug.get(course);
    const base = record?.paths.root ?? join(courseRoot, course);
    if (!existsSync(base)) {
      fail(`${course} folder is missing.`);
      continue;
    }

    for (const entry of requiredEntries) {
      if (!existsSync(join(base, entry))) {
        fail(`${course}/${entry} is missing.`);
      }
    }

    if (!record) {
      fail(`${course} is missing readable course.json or status.json.`);
      continue;
    }

    const courseJson = record.course;
    if (courseJson.slug !== course) {
      fail(`${course}/course.json has slug ${courseJson.slug}.`);
    }
    if (!courseJson.canonicalRoute?.startsWith(`/book/${course}`)) {
      fail(`${course}/course.json has invalid canonical route ${courseJson.canonicalRoute}.`);
    }

    const courseReadiness = courseJson.courseReadiness ?? "internal";
    const requiresCompleteLessons = strictReadiness.has(courseReadiness);

    for (const chapter of courseJson.chapters ?? []) {
      if (!chapter.lessonCount || chapter.lessonCount < 1) {
        fail(`${course}/${chapter.slug} has no manifest lesson count.`);
      }

      const chapterLessonPath = join(base, "lessons", chapter.slug);
      const chapterLessonFiles = walkFiles(chapterLessonPath, (file) => file.endsWith(".mdx"));
      if (requiresCompleteLessons && chapterLessonFiles.length !== chapter.lessonCount) {
        fail(
          `${course}/${chapter.slug} has ${chapterLessonFiles.length} lesson files but manifest expects ${chapter.lessonCount}.`,
        );
      }
    }

    const lessonFiles = walkFiles(join(base, "lessons"), (file) => file.endsWith(".mdx"));
    if (lessonFiles.length === 0 && !noLessonReadiness.has(courseReadiness)) {
      fail(`${course} has no course-owned lesson files.`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Course content layout check passed.");
