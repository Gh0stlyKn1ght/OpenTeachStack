import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import {
  findGenericAuthoringFragments,
  GENERATED_STATUSES,
  KNOWN_CONTENT_STATUSES,
  RELEASE_CONTENT_STATUSES,
} from "./content-fingerprints.mjs";

const root = process.cwd();

export function checkCourseReader({
  courseSlug,
  label,
  forbiddenFragments,
  routeForbiddenFragments,
  minContentLength = 500,
  sectionRoutePath = join(
    root,
    "src",
    "app",
    "book",
    "[course]",
    "[chapter]",
    "[section]",
    "page.tsx",
  ),
  requiredSectionRouteFragments = [
    "getCourseLessonBySlugs",
    "FieldGuidePage",
    "MDXRemote",
  ],
}) {
  const courseRoot = join(root, "content", "courses", courseSlug);
  let generatedCount = 0;
  let releaseReadyCount = 0;

  function fail(message) {
    console.error(`${label} reader migration violation: ${message}`);
    process.exitCode = 1;
  }

  const courseJsonPath = join(courseRoot, "course.json");
  if (!existsSync(courseJsonPath)) {
    fail(`content/courses/${courseSlug}/course.json is missing.`);
  } else {
    const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
    if (!KNOWN_CONTENT_STATUSES.has(courseJson.migrationStatus)) {
      fail(
        `course.json migrationStatus is ${courseJson.migrationStatus}, expected a known content status.`,
      );
    }
  }

  if (!existsSync(sectionRoutePath)) {
    fail(`canonical section route is missing: ${relativeToRoot(sectionRoutePath)}`);
  } else {
    const routeSource = readFileSync(sectionRoutePath, "utf8");
    for (const fragment of routeForbiddenFragments) {
      if (routeSource.includes(fragment)) {
        fail(`section route still contains fallback/rendering fragment: ${fragment}`);
      }
    }
    for (const fragment of requiredSectionRouteFragments) {
      if (!routeSource.includes(fragment)) {
        fail(`section route missing required implementation fragment: ${fragment}`);
      }
    }
  }

  const lessonRoot = join(courseRoot, "lessons");
  if (!existsSync(lessonRoot)) {
    fail(`content/courses/${courseSlug}/lessons is missing.`);
  } else {
    for (const filePath of walkMdx(lessonRoot)) {
      const raw = readFileSync(filePath, "utf8");
      const parsed = matter(raw);
      const relative = relativeToCourse(courseRoot, filePath);

      const status = parsed.data.migrationStatus;
      if (!KNOWN_CONTENT_STATUSES.has(status)) {
        fail(`${relative} has unknown migrationStatus: ${status}.`);
      }

      if (GENERATED_STATUSES.has(status)) {
        generatedCount++;
      }

      if (RELEASE_CONTENT_STATUSES.has(status)) {
        releaseReadyCount++;
      }

      if (!parsed.data.canonicalRoute?.startsWith(`/book/${courseSlug}/`)) {
        fail(`${relative} has invalid canonical route.`);
      }

      if (
        RELEASE_CONTENT_STATUSES.has(status) &&
        parsed.content.trim().length < minContentLength
      ) {
        fail(`${relative} content is too short to be a real section body.`);
      }

      const genericFragments = findGenericAuthoringFragments(parsed.content);
      if (RELEASE_CONTENT_STATUSES.has(status) && genericFragments.length > 0) {
        fail(
          `${relative} is ${status} but contains generic author-script fingerprints: ${genericFragments.join("; ")}`,
        );
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

  console.log(
    `${label} course reader migration check passed. Release-ready lessons: ${releaseReadyCount}; generated/scaffolded lessons: ${generatedCount}.`,
  );
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

function relativeToCourse(courseRoot, filePath) {
  return filePath
    .replace(`${courseRoot}\\`, "")
    .replace(`${courseRoot}/`, "")
    .replaceAll("\\", "/");
}

function relativeToRoot(filePath) {
  return filePath
    .replace(`${root}\\`, "")
    .replace(`${root}/`, "")
    .replaceAll("\\", "/");
}
