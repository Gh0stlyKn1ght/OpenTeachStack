import { assertCourseWriteAllowed, CourseLockError } from "../lib/course-locks.mjs";

const args = process.argv.slice(2);
const targetPath = valueFor("--path") ?? args[0];
const operation = valueFor("--operation") ?? "write";

if (!targetPath) {
  console.error("Usage: node scripts/curriculum/check-locked-write.mjs --path <path> [--operation write]");
  process.exit(1);
}

try {
  assertCourseWriteAllowed(targetPath, { operation });
  console.log(`Allowed ${operation}: ${targetPath}`);
} catch (error) {
  if (error instanceof CourseLockError) {
    console.error(error.message);
    process.exit(1);
  }

  throw error;
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}
