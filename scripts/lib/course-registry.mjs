import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

export const COURSES_RELATIVE_ROOT = "content/courses";

export function listCourseRecords(root = process.cwd()) {
  const coursesRoot = join(root, COURSES_RELATIVE_ROOT);
  if (!existsSync(coursesRoot)) return [];

  return readdirSync(coursesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readCourseRecord(entry.name, root))
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function readCourseRecord(slug, root = process.cwd()) {
  const courseRoot = join(root, COURSES_RELATIVE_ROOT, slug);
  const courseJsonPath = join(courseRoot, "course.json");
  const statusJsonPath = join(courseRoot, "status.json");
  const packetJsonPath = join(courseRoot, "course.packet.json");

  if (!existsSync(courseJsonPath) || !existsSync(statusJsonPath)) return null;

  const course = readJson(courseJsonPath);
  const status = readJson(statusJsonPath);
  const packet = existsSync(packetJsonPath) ? readJson(packetJsonPath) : null;

  return {
    code: packet?.code ?? course.code,
    slug: packet?.slug ?? course.slug,
    title: packet?.title ?? course.title,
    owner: packet?.owner ?? course.owner ?? "generic",
    canonicalRoute: packet?.canonicalRoute ?? course.canonicalRoute,
    reader: packet?.reader ?? "course-book",
    sourceRoot: packet?.sourceRoot ?? `content/courses/${course.slug}`,
    sourceRegistry: packet?.sourceRegistry ?? course.sourceRegistry ?? "",
    packetized: Boolean(packet),
    packet,
    course,
    status,
    paths: {
      root: courseRoot,
      courseJson: courseJsonPath,
      statusJson: statusJsonPath,
      packetJson: packetJsonPath,
    },
  };
}

export function walkFiles(directory, predicate = () => true) {
  if (!existsSync(directory)) return [];
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, predicate));
    } else if (entry.isFile() && predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

export function displayPath(filePath, root = process.cwd()) {
  return relative(root, filePath).replaceAll("\\", "/");
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}
