import { existsSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import {
  collectCourseFiles,
  courseRootPath,
  isNewLessonOrLabFile,
  loadLockRegistry,
  readCourseManifest,
} from "../lib/course-locks.mjs";

const root = process.cwd();
const registry = loadLockRegistry(root);
const lockedCourses = Object.entries(registry.courses)
  .filter(([, entry]) => entry.status === "locked")
  .sort(([a], [b]) => a.localeCompare(b));

const failures = [];
const reports = [];

for (const [courseId, entry] of lockedCourses) {
  const manifest = readCourseManifest(courseId, root);
  if (!manifest) {
    failures.push(`${courseId}: missing ${entry.manifestPath ?? `content/courses/${courseId}/.course-lock.json`}`);
    continue;
  }

  if (manifest.courseId !== courseId) {
    failures.push(`${courseId}: manifest courseId is ${manifest.courseId}.`);
  }

  if (manifest.status !== "locked") {
    failures.push(`${courseId}: manifest status is ${manifest.status}, expected locked.`);
  }

  const courseRoot = courseRootPath(courseId, root);
  const manifestFiles = new Map((manifest.files ?? []).map((file) => [file.path, file]));
  const currentFiles = new Set(collectCourseFiles(courseId, root));
  let changed = 0;
  let deleted = 0;
  let newLessonOrLabFiles = 0;

  for (const [filePath, file] of manifestFiles) {
    const absolutePath = join(courseRoot, filePath);
    if (!existsSync(absolutePath)) {
      failures.push(`${courseId}: protected file deleted: ${filePath}`);
      deleted += 1;
      continue;
    }

    const sha256 = createHash("sha256").update(readFileSync(absolutePath)).digest("hex");
    if (sha256 !== file.sha256) {
      failures.push(`${courseId}: protected file changed: ${filePath}`);
      changed += 1;
    }

    if (typeof file.bytes === "number" && statSync(absolutePath).size !== file.bytes) {
      failures.push(`${courseId}: protected file size changed: ${filePath}`);
    }
  }

  for (const filePath of currentFiles) {
    if (manifestFiles.has(filePath)) continue;
    if (isNewLessonOrLabFile(filePath)) {
      failures.push(`${courseId}: new lesson/lab file appeared after lock: ${filePath}`);
      newLessonOrLabFiles += 1;
    }
  }

  reports.push(
    `${courseId}: ${manifestFiles.size} protected files, ${changed} changed, ${deleted} deleted, ${newLessonOrLabFiles} new lesson/lab files.`,
  );
}

if (lockedCourses.length === 0) {
  console.log("Course lock verification passed: no locked courses in content/course-locks.yml.");
  process.exit(0);
}

if (reports.length > 0) {
  for (const report of reports) console.log(report);
}

if (failures.length > 0) {
  console.error("Course lock verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Course lock verification passed for ${lockedCourses.length} locked course(s).`);
