import { execFileSync } from "node:child_process";
import { readCourseRecord } from "./lib/course-registry.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const explicitFiles = valuesFor("--file");
const changedFiles = explicitFiles.length > 0 ? explicitFiles : gitChangedFiles();
const affectedCourseSlugs = [...new Set(changedFiles.map(courseSlugForPath).filter(Boolean))].sort((a, b) =>
  a.localeCompare(b),
);
const affectedCourses = affectedCourseSlugs.map((slug) => courseReport(slug));

const report = {
  generatedAt: new Date().toISOString(),
  changedFiles,
  affectedCourses: affectedCourses.map((course) => course.slug),
  courses: affectedCourses,
  nonCourseFiles: changedFiles.filter((filePath) => !courseSlugForPath(filePath)),
};

console.log(JSON.stringify(report, null, 2));

function gitChangedFiles() {
  const output = execFileSync("git", ["status", "--porcelain"], {
    cwd: root,
    encoding: "utf8",
  });

  return output
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .flatMap(parseStatusLine)
    .map(normalizePath)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function parseStatusLine(line) {
  const body = line.slice(3);
  if (!body) return [];

  if (body.includes(" -> ")) {
    const [fromPath, toPath] = body.split(" -> ");
    return [fromPath, toPath];
  }

  return [body];
}

function courseSlugForPath(filePath) {
  return normalizePath(filePath).match(/^content\/courses\/([^/]+)(?:\/|$)/)?.[1] ?? null;
}

function courseReport(slug) {
  const record = readCourseRecord(slug, root);
  const changedCourseFiles = changedFiles.filter((filePath) => courseSlugForPath(filePath) === slug);

  return {
    slug,
    code: record?.code ?? slug.toUpperCase(),
    title: record?.title ?? "",
    packetized: record?.packetized ?? false,
    changedFiles: changedCourseFiles,
    requiredChecks: requiredChecksFor(slug, record),
  };
}

function requiredChecksFor(slug, record) {
  const checks = [
    `npm.cmd run report:course-health -- --course ${slug} --report-only`,
    "npm.cmd run verify:locks",
  ];

  if (record?.packetized) {
    checks.unshift(`npm.cmd run check:course-packet -- --course ${slug}`);
  } else {
    checks.unshift("npm.cmd run check:course-packet");
  }

  if (slug === "ots-101") {
    checks.push("npm.cmd run check:ots101-reader");
    checks.push("npm.cmd run check:ots101-book-titles");
  }

  return checks;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === flag && args[index + 1]) {
      values.push(args[index + 1]);
      index += 1;
    }
  }
  return values;
}

function normalizePath(filePath) {
  return String(filePath).replaceAll("\\", "/").replace(/^"|"$/g, "");
}
