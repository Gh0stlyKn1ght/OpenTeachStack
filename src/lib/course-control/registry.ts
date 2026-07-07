import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import type {
  CourseJson,
  CoursePacketManifest,
  CourseReader,
  CourseRegistryRecord,
  CourseStatusRecord,
} from "./types";

const COURSES_ROOT = join(process.cwd(), "content", "courses");

export function listCourseRecords(): CourseRegistryRecord[] {
  if (!existsSync(COURSES_ROOT)) return [];

  return readdirSync(COURSES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readCourseRecord(entry.name))
    .filter((record): record is CourseRegistryRecord => Boolean(record))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function readCourseRecord(slug: string): CourseRegistryRecord | null {
  const courseRoot = join(COURSES_ROOT, slug);
  const courseJsonPath = join(courseRoot, "course.json");
  const statusJsonPath = join(courseRoot, "status.json");
  const packetJsonPath = join(courseRoot, "course.packet.json");

  if (!existsSync(courseJsonPath) || !existsSync(statusJsonPath)) return null;

  const course = readJson<CourseJson>(courseJsonPath);
  const status = readJson<CourseStatusRecord>(statusJsonPath);
  const packet = existsSync(packetJsonPath)
    ? readJson<CoursePacketManifest>(packetJsonPath)
    : undefined;

  return {
    code: packet?.code ?? course.code,
    slug: packet?.slug ?? course.slug,
    title: packet?.title ?? course.title,
    owner: packet?.owner ?? course.owner ?? "generic",
    canonicalRoute: packet?.canonicalRoute ?? course.canonicalRoute,
    reader: packet?.reader ?? defaultReader(course.owner),
    sourceRoot: packet?.sourceRoot ?? `content/courses/${course.slug}`,
    sourceRegistry: packet?.sourceRegistry ?? course.sourceRegistry ?? "",
    packetized: Boolean(packet),
    packet,
    course,
    status,
  };
}

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function defaultReader(owner: string | undefined): CourseReader {
  return owner === "dedicated" ? "course-book" : "course-book";
}
