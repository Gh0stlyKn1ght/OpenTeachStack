import { existsSync } from "node:fs";
import {
  buildCourseManifest,
  courseRootPath,
  loadLockRegistry,
  manifestRelativePath,
  newRegistryEntry,
  saveLockRegistry,
  writeCourseManifest,
} from "../lib/course-locks.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const courseId = valueFor("--course");
const reason = valueFor("--reason") ?? "Course passed review and is protected from accidental rewrites.";
const lockedBy = valueFor("--locked-by") ?? process.env.USERNAME ?? process.env.USER ?? "repo-maintainer";

if (!courseId) {
  fail("Usage: node scripts/curriculum/lock-course.mjs --course <course-id> --reason \"review note\" [--locked-by <name>] [--force]");
}

const root = process.cwd();
const courseRoot = courseRootPath(courseId, root);
if (!existsSync(courseRoot)) {
  fail(`Cannot lock missing course: content/courses/${courseId}`);
}

const registry = loadLockRegistry(root);
const current = registry.courses[courseId];
if (current?.status === "locked" && !force) {
  fail(`Course ${courseId} is already locked. Use --force only after reviewing the intended relock.`);
}

const lockedAt = new Date().toISOString();
const manifest = buildCourseManifest(courseId, {
  root,
  lockedAt,
  lockedBy,
  reason,
});

writeCourseManifest(courseId, manifest, root);

registry.version = 1;
registry.updatedAt = lockedAt;
registry.courses[courseId] = newRegistryEntry(courseId, manifest);
saveLockRegistry(registry, root);

console.log(`Locked ${courseId}.`);
console.log(`Manifest: ${manifestRelativePath(courseId)}`);
console.log(`Protected files: ${manifest.files.length}`);
console.log(`Reason: ${reason}`);

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
