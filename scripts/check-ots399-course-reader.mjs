import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const courseRoot = join(root, "content", "courses", "ots-399");
const forbiddenFragments = [
  "This is the course-owned source file",
  "Use this file for the permanent lesson body",
  "Migration status: scaffolded",
  "Authoring Status",
  "Section Purpose",
  "Authoring Checklist",
];
const routeForbiddenFragments = [
  "Course-section fallback",
  "getCourseSectionContent",
  "This section uses",
  "Source and Template References",
];

function fail(message) {
  console.error(`OTS-399 reader migration violation: ${message}`);
  process.exitCode = 1;
}

function walkMdx(directory) {
  const result = [];
  if (!existsSync(directory)) {
    return result;
  }
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkMdx(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      result.push(fullPath);
    }
  }
  return result;
}

const courseJsonPath = join(courseRoot, "course.json");
if (!existsSync(courseJsonPath)) {
  fail("content/courses/ots-399/course.json is missing.");
} else {
  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  if (courseJson.migrationStatus !== "authored") {
    fail(`course.json migrationStatus is ${courseJson.migrationStatus}, expected authored.`);
  }
}

const pageRoutePath = join(root, "src", "app", "book", "ots-399", "page.tsx");
if (!existsSync(pageRoutePath)) {
  fail("OTS-399 book page route is missing.");
}

const chapterRoutePath = join(root, "src", "app", "book", "ots-399", "[chapter]", "page.tsx");
if (!existsSync(chapterRoutePath)) {
  fail("OTS-399 chapter route is missing.");
}

const sectionRoutePath = join(root, "src", "app", "book", "ots-399", "[chapter]", "[section]", "page.tsx");
if (!existsSync(sectionRoutePath)) {
  fail("OTS-399 section route is missing.");
} else {
  const routeSource = readFileSync(sectionRoutePath, "utf8");
  for (const fragment of routeForbiddenFragments) {
    if (routeSource.includes(fragment)) {
      fail(`OTS-399 section route still contains fallback/rendering fragment: ${fragment}`);
    }
  }
  for (const fragment of ["getCourseLessonBySlugs", "CourseStructureBookShell", "MDXRemote"]) {
    if (!routeSource.includes(fragment)) {
      fail(`OTS-399 section route missing required implementation fragment: ${fragment}`);
    }
  }
}

const lessonRoot = join(courseRoot, "lessons");
if (!existsSync(lessonRoot)) {
  fail("content/courses/ots-399/lessons is missing.");
} else {
  for (const filePath of walkMdx(lessonRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const relative = filePath
      .replace(`${courseRoot}\\`, "")
      .replaceAll("\\", "/");

    if (parsed.data.migrationStatus !== "authored") {
      fail(`${relative} is not authored.`);
    }

    if (!parsed.data.canonicalRoute?.startsWith("/book/ots-399/")) {
      fail(`${relative} has invalid canonical route.`);
    }

    if (!parsed.content.trim() || parsed.content.length < 700) {
      fail(`${relative} content is too short to be a real section body.`);
    }

    for (const fragment of forbiddenFragments) {
      if (raw.includes(fragment)) {
        fail(`${relative} still contains scaffold/fallback text: ${fragment}`);
      }
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("OTS-399 course reader migration check passed.");
