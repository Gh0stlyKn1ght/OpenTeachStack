import { existsSync, unlinkSync } from "node:fs";
import {
  loadLockRegistry,
  manifestPathForCourse,
  manifestRelativePath,
  saveLockRegistry,
} from "../lib/course-locks.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const deleteManifest = args.includes("--delete-manifest");
const courseId = valueFor("--course");
const reason = valueFor("--reason");
const unlockedBy = valueFor("--unlocked-by") ?? process.env.USERNAME ?? process.env.USER ?? "repo-maintainer";
const nextStatus = valueFor("--status") ?? "maintenance";

if (!courseId || !reason) {
  fail("Usage: node scripts/curriculum/unlock-course.mjs --course <course-id> --reason \"change request\" [--status maintenance|unlocked] [--delete-manifest] [--force]");
}

if (!["maintenance", "unlocked"].includes(nextStatus)) {
  fail("--status must be either maintenance or unlocked.");
}

const root = process.cwd();
const registry = loadLockRegistry(root);
const current = registry.courses[courseId];
if (!current && !force) {
  fail(`Course ${courseId} is not present in content/course-locks.yml.`);
}

if (current?.status !== "locked" && !force) {
  fail(`Course ${courseId} is not locked. Use --force only if you need to record an unlock note anyway.`);
}

const unlockedAt = new Date().toISOString();
registry.version = 1;
registry.updatedAt = unlockedAt;
registry.courses[courseId] = {
  ...(current ?? {}),
  status: nextStatus,
  previousStatus: current?.status ?? "unknown",
  unlockedAt,
  unlockedBy,
  unlockReason: reason,
};

if (!registry.courses[courseId].manifestPath) {
  registry.courses[courseId].manifestPath = manifestRelativePath(courseId);
}

saveLockRegistry(registry, root);

if (deleteManifest) {
  const manifestPath = manifestPathForCourse(courseId, root);
  if (existsSync(manifestPath)) {
    unlinkSync(manifestPath);
  }
}

console.log(`Unlocked ${courseId} into ${nextStatus} status.`);
console.log(`Reason: ${reason}`);
console.log(deleteManifest ? "Lock manifest deleted by explicit request." : "Lock manifest preserved for audit history.");

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
