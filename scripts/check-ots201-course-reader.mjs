import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const courseRoot = join(root, "content", "courses", "ots-201");
const forbiddenFragments = [
  "This is the course-owned source file",
  "Use this file for the permanent lesson body",
  "Migration status: scaffolded",
  "Authoring Status",
  "This section is scaffolded",
  "Add source notes",
];
const routeForbiddenFragments = [
  "This section uses the existing authored lesson body instead of the generic",
  "getCourseSectionContent",
  "Course-section fallback",
  "Core Idea",
  "Do This",
];

function fail(message) {
  console.error(`OTS-201 reader migration violation: ${message}`);
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
  fail("content/courses/ots-201/course.json is missing.");
} else {
  const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
  if (courseJson.migrationStatus !== "authored") {
    fail(`course.json migrationStatus is ${courseJson.migrationStatus}, expected authored.`);
  }
}

const chapterRoutePath = join(root, "src", "app", "book", "ots-201", "[chapter]", "page.tsx");
if (!existsSync(chapterRoutePath)) {
  fail("OTS-201 chapter route file is missing.");
} else {
  const routeSource = readFileSync(chapterRoutePath, "utf8");
  for (const fragment of ["CourseStructureChapterNav"]) {
    if (routeSource.includes(fragment)) {
      fail(`OTS-201 chapter route still references removed component: ${fragment}`);
    }
  }
}

const sectionRoutePath = join(root, "src", "app", "book", "ots-201", "[chapter]", "[section]", "page.tsx");
if (!existsSync(sectionRoutePath)) {
  fail("OTS-201 section route is missing.");
} else {
  const routeSource = readFileSync(sectionRoutePath, "utf8");
  for (const fragment of routeForbiddenFragments) {
    if (routeSource.includes(fragment)) {
      fail(`OTS-201 section route still contains invalid fallback or scaffold text: ${fragment}`);
    }
  }
}

const lessonRoot = join(courseRoot, "lessons");
if (!existsSync(lessonRoot)) {
  fail("content/courses/ots-201/lessons is missing.");
} else {
  for (const filePath of walkMdx(lessonRoot)) {
    const raw = readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const relative = filePath.replace(`${courseRoot}\\`, "").replaceAll("\\", "/");

    if (parsed.data.migrationStatus !== "authored") {
      fail(`${relative} is not authored.`);
    }

    if (!parsed.data.canonicalRoute?.startsWith("/book/ots-201/")) {
      fail(`${relative} has invalid canonical route.`);
    }

    if (parsed.content.trim().length < 500) {
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

console.log("OTS-201 course reader migration check passed.");
