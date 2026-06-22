import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const courseRoot = join(root, "content", "courses", "ots-101");
const forbiddenFragments = [
  "This is the course-owned source file",
  "Use this file for the permanent lesson body",
  "Migration status: scaffolded",
  "This section takes one part of",
  "This section uses the existing authored lesson body instead of the generic course-book scaffold.",
];
const routeForbiddenFragments = [
  "getContentBySlug",
  "Authored Lesson",
  "generic course-book scaffold",
  "This section takes one part of",
  "Name the teacher problem this section helps you solve.",
];

function fail(message) {
  console.error(`OTS-101 reader migration violation: ${message}`);
  process.exitCode = 1;
}

function walkMdx(directory) {
  const entries = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      entries.push(...walkMdx(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      entries.push(fullPath);
    }
  }
  return entries;
}

const courseJsonPath = join(courseRoot, "course.json");
if (!existsSync(courseJsonPath)) {
  fail("content/courses/ots-101/course.json is missing.");
} else {
  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  if (courseJson.migrationStatus !== "authored") {
    fail(`course.json migrationStatus is ${courseJson.migrationStatus}, expected authored.`);
  }
}

const routePath = join(root, "src", "app", "book", "ots-101", "[chapter]", "[section]", "page.tsx");
if (!existsSync(routePath)) {
  fail("OTS-101 section route is missing.");
} else {
  const routeSource = readFileSync(routePath, "utf8");
  for (const fragment of routeForbiddenFragments) {
    if (routeSource.includes(fragment)) {
      fail(`OTS-101 section route still contains fallback/global-reader text: ${fragment}`);
    }
  }
}

const lessonRoot = join(courseRoot, "lessons");
if (!existsSync(lessonRoot)) {
  fail("content/courses/ots-101/lessons is missing.");
} else {
  for (const filePath of walkMdx(lessonRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const relative = filePath.replace(`${courseRoot}\\`, "").replaceAll("\\", "/");

    if (parsed.data.migrationStatus !== "authored") {
      fail(`${relative} is not authored.`);
    }

    if (!parsed.data.canonicalRoute?.startsWith("/book/ots-101/")) {
      fail(`${relative} has invalid canonical route.`);
    }

    if (parsed.content.trim().length < 700) {
      fail(`${relative} content is too short to be a real section body.`);
    }

    for (const fragment of forbiddenFragments) {
      if (raw.includes(fragment)) {
        fail(`${relative} still contains forbidden scaffold/fallback text: ${fragment}`);
      }
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("OTS-101 course reader migration check passed.");
