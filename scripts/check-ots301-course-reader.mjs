import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const courseRoot = join(root, "content", "courses", "ots-301");
const forbiddenFragments = [
  "This is the course-owned source file",
  "Course-owned source file",
  "Section Purpose",
  "Authoring Status",
  "Authoring Checklist",
  "Migration status: scaffolded",
];
const routeForbiddenFragments = [
  "getCourseSectionContent",
  "Course-section fallback",
  "This is the course section body",
  "Source and Template References",
  "This section uses",
];

function fail(message) {
  console.error(`OTS-301 reader migration violation: ${message}`);
  process.exitCode = 1;
}

function walkMdx(directory) {
  const result = [];
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
  fail("content/courses/ots-301/course.json is missing.");
} else {
  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  if (courseJson.migrationStatus !== "authored") {
    fail(`course.json migrationStatus is ${courseJson.migrationStatus}, expected authored.`);
  }
}

const pageRoutePath = join(root, "src", "app", "book", "ots-301", "page.tsx");
if (!existsSync(pageRoutePath)) {
  fail("OTS-301 book page route is missing.");
} else {
  const routeSource = readFileSync(pageRoutePath, "utf8");
  if (!routeSource.includes("CourseStructureBookShell")) {
    fail("OTS-301 book page route is not using course structure reader wrapper.");
  }
}

const chapterRoutePath = join(root, "src", "app", "book", "ots-301", "[chapter]", "page.tsx");
if (!existsSync(chapterRoutePath)) {
  fail("OTS-301 chapter route is missing.");
} else {
  const routeSource = readFileSync(chapterRoutePath, "utf8");
  for (const fragment of ["CourseStructureBookShell", "getCourseStructure", "getChapterHref", "getSectionHref"]) {
    if (!routeSource.includes(fragment)) {
      fail(`OTS-301 chapter route missing required implementation fragment: ${fragment}`);
    }
  }
}

const sectionRoutePath = join(root, "src", "app", "book", "ots-301", "[chapter]", "[section]", "page.tsx");
if (!existsSync(sectionRoutePath)) {
  fail("OTS-301 section route is missing.");
} else {
  const routeSource = readFileSync(sectionRoutePath, "utf8");
  for (const fragment of routeForbiddenFragments) {
    if (routeSource.includes(fragment)) {
      fail(`OTS-301 section route still contains fallback/rendering fragment: ${fragment}`);
    }
  }
  for (const fragment of ["getCourseLessonBySlugs", "CourseStructureBookShell", "MDXRemote"]) {
    if (!routeSource.includes(fragment)) {
      fail(`OTS-301 section route missing required implementation fragment: ${fragment}`);
    }
  }
}

const lessonRoot = join(courseRoot, "lessons");
if (!existsSync(lessonRoot)) {
  fail("content/courses/ots-301/lessons is missing.");
} else {
  for (const filePath of walkMdx(lessonRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const relative = filePath.replace(`${courseRoot}\\`, "").replaceAll("\\", "/");

    if (parsed.data.migrationStatus !== "authored") {
      fail(`${relative} is not authored.`);
    }

    if (!parsed.data.canonicalRoute?.startsWith("/book/ots-301/")) {
      fail(`${relative} has invalid canonical route.`);
    }

    if (parsed.content.trim().length < 450) {
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

console.log("OTS-301 course reader migration check passed.");
