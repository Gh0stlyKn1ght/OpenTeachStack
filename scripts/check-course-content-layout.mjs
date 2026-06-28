import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const courseRoot = join(root, "content", "courses");
const requiredCourses = [
  "ots-000",
  "ots-101",
  "ots-201",
  "ots-220",
  "ots-240",
  "ots-260",
  "ots-280",
  "ots-301",
  "ots-320",
  "ots-399",
];
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
const noLessonReadiness = new Set(["coming-soon", "planned"]);

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
  for (const course of requiredCourses) {
    const base = join(courseRoot, course);
    if (!existsSync(base)) {
      fail(`${course} folder is missing.`);
      continue;
    }

    for (const entry of requiredEntries) {
      if (!existsSync(join(base, entry))) {
        fail(`${course}/${entry} is missing.`);
      }
    }

    const courseJsonPath = join(base, "course.json");
    if (existsSync(courseJsonPath)) {
      const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
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
    }

    const lessonFiles = walkFiles(join(base, "lessons"), (file) => file.endsWith(".mdx"));
    if (lessonFiles.length === 0 && existsSync(join(base, "course.json"))) {
      const courseJson = JSON.parse(readFileSync(join(base, "course.json"), "utf8"));
      if (!noLessonReadiness.has(courseJson.courseReadiness ?? "internal")) {
        fail(`${course} has no course-owned lesson files.`);
      }
    } else if (lessonFiles.length === 0) {
      fail(`${course} has no course-owned lesson files.`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Course content layout check passed.");
