import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function fail(message) {
  console.error(`Route contract violation: ${message}`);
  process.exitCode = 1;
}

const expectedCourseSlugs = new Map([
  ["OTS-101", "ots-101"],
  ["OTS-201", "ots-201"],
  ["OTS-220", "ots-220"],
  ["OTS-240", "ots-240"],
  ["OTS-260", "ots-260"],
  ["OTS-280", "ots-280"],
  ["OTS-301", "ots-301"],
  ["OTS-320", "ots-320"],
  ["OTS-399", "ots-399"],
]);

const dedicatedCourseCodes = new Set(["OTS-101", "OTS-280"]);
const genericCourseCodes = new Set(
  [...expectedCourseSlugs.keys()].filter(
    (code) => !dedicatedCourseCodes.has(code),
  ),
);

const courseStructures = read("src/lib/courseStructures.ts");
const genericCourses = [
  ...courseStructures.matchAll(
    /code:\s*"(?<code>OTS-\d{3})"[\s\S]*?slug:\s*"(?<slug>[^"]+)"/g,
  ),
].map((match) => match.groups);

const seenGenericCodes = new Set();
const seenGenericSlugs = new Set();

for (const course of genericCourses) {
  if (!course?.code || !course?.slug) continue;

  seenGenericCodes.add(course.code);
  seenGenericSlugs.add(course.slug);

  if (dedicatedCourseCodes.has(course.code)) {
    fail(`${course.code} is dedicated and must not appear in COURSE_STRUCTURES.`);
  }

  if ([...dedicatedCourseCodes].some((code) => expectedCourseSlugs.get(code) === course.slug)) {
    fail(`${course.slug} is reserved for a dedicated course route.`);
  }

  const expectedSlug = expectedCourseSlugs.get(course.code);
  if (!expectedSlug) {
    fail(`${course.code} is not listed in docs/ROUTE_CONTRACT.md.`);
  } else if (course.slug !== expectedSlug) {
    fail(`${course.code} must use slug "${expectedSlug}", found "${course.slug}".`);
  }
}

for (const code of genericCourseCodes) {
  if (!seenGenericCodes.has(code)) {
    fail(`${code} is a generic course but is missing from COURSE_STRUCTURES.`);
  }
}

for (const code of genericCourseCodes) {
  const slug = expectedCourseSlugs.get(code);
  const forbiddenRouteFiles = [
    `src/app/book/${slug}/page.tsx`,
    `src/app/book/${slug}/[chapter]/page.tsx`,
    `src/app/book/${slug}/[chapter]/[section]/page.tsx`,
  ];

  for (const routeFile of forbiddenRouteFiles) {
    if (existsSync(join(root, routeFile))) {
      fail(`${code} must use generic /book/[course] routes; remove ${routeFile}.`);
    }
  }
}

if (seenGenericSlugs.size !== genericCourses.length) {
  fail("COURSE_STRUCTURES contains duplicate course slugs.");
}

const metadata = read("src/lib/metadata.ts");
const pathwayCodes = [
  ...metadata.matchAll(/code:\s*"(?<code>OTS-\d{3})"/g),
].map((match) => match.groups?.code).filter(Boolean);
const uniquePathwayCodes = new Set(pathwayCodes);

for (const code of expectedCourseSlugs.keys()) {
  if (!uniquePathwayCodes.has(code)) {
    fail(`${code} is missing from PATHWAY_COURSES metadata.`);
  }
}

if (uniquePathwayCodes.size !== pathwayCodes.length) {
  fail("PATHWAY_COURSES contains duplicate course codes.");
}

const architectureDoc = read("docs/COURSE_BOOK_ARCHITECTURE.md");
const routeContractDoc = read("docs/ROUTE_CONTRACT.md");

if (architectureDoc.includes("tt-101") || routeContractDoc.includes("tt-101")) {
  fail("stale tt-101 slug appears in route documentation.");
}

const legacyCourseRoute = read("src/app/course/[module]/page.tsx");
if (!legacyCourseRoute.includes('redirect(`/book/ots-101/${module}`)')) {
  fail("legacy /course/[module] must redirect to /book/ots-101/${module}.");
}

const bookIndex = read("src/app/book/page.tsx");
if (!bookIndex.includes('href="/book/ots-101"')) {
  fail("book index must link to dedicated OTS-101 route.");
}

if (!bookIndex.includes('href="/book/ots-280"')) {
  fail("book index must link to dedicated OTS-280 route.");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Route contract check passed.");
