import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCRIPTS_DIR = path.join(ROOT, "scripts");

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

const authorScripts = fs
  .readdirSync(SCRIPTS_DIR)
  .filter((name) => /^author-ots\d+-course-lessons\.mjs$/.test(name))
  .sort();

if (authorScripts.length === 0) {
  fail("No course authoring scripts found.");
}

for (const script of authorScripts) {
  const relativePath = `scripts/${script}`;
  const source = read(relativePath);

  if (!source.includes('const force = args.includes("--force");')) {
    fail(`${relativePath}: missing explicit --force flag parsing.`);
  }

  if (!/!force\s*&&\s*parsed\.data\.migrationStatus\s*!==\s*"scaffolded"/.test(source)) {
    fail(
      `${relativePath}: missing guard that preserves non-scaffolded authored content unless --force is used.`,
    );
  }

  if (!/writeFileSync\(filePath,/.test(source)) {
    fail(`${relativePath}: expected section file writes were not found.`);
  }

  if (/parsed\.data\.migrationStatus\s*=\s*"authored"/.test(source)) {
    fail(
      `${relativePath}: generated section bodies must not be marked migrationStatus authored.`,
    );
  }

  if (!/parsed\.data\.migrationStatus\s*=\s*"generated"/.test(source)) {
    fail(
      `${relativePath}: generated section bodies must be marked migrationStatus generated.`,
    );
  }

  if (!/courseJson\.migrationStatus\s*!==\s*"generated"/.test(source)) {
    fail(
      `${relativePath}: missing guard that avoids rewriting generated course.json unless --force is used.`,
    );
  }
}

const scaffoldSource = read("scripts/scaffold-course-content.mjs");

if (!scaffoldSource.includes('const force = args.includes("--force");')) {
  fail("scripts/scaffold-course-content.mjs: missing explicit --force flag parsing.");
}

for (const requiredGuard of [
  /!force\s*&&\s*existsSync\(absolutePath\)/,
  /!force\s*&&\s*existsSync\(target\)/,
]) {
  if (!requiredGuard.test(scaffoldSource)) {
    fail(
      "scripts/scaffold-course-content.mjs: missing no-overwrite guard for existing generated targets.",
    );
  }
}

if (process.exitCode) process.exit(process.exitCode);

console.log(
  `Content authoring safety check passed for ${authorScripts.length} authoring scripts and scaffold-course-content.mjs.`,
);
