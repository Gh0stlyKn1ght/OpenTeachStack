import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, resolve } from "node:path";

export const LOCK_REGISTRY_RELATIVE_PATH = "content/course-locks.yml";
export const LOCK_MANIFEST_FILE_NAME = ".course-lock.json";
export const DEFAULT_ALLOWED_CHANGES = ["typo", "broken-link", "metadata-only"];
export const DEFAULT_REQUIRES_UNLOCK_FOR = [
  "lesson-body",
  "lab-body",
  "assessment-body",
  "module-restructure",
  "title-change",
  "slug-change",
  "generated-remediation",
];

export class CourseLockError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "CourseLockError";
    this.details = details;
  }
}

export function registryPath(root = process.cwd()) {
  return join(root, LOCK_REGISTRY_RELATIVE_PATH);
}

export function courseRootPath(courseId, root = process.cwd()) {
  return join(root, "content", "courses", courseId);
}

export function manifestPathForCourse(courseId, root = process.cwd()) {
  return join(courseRootPath(courseId, root), LOCK_MANIFEST_FILE_NAME);
}

export function manifestRelativePath(courseId) {
  return posixPath(`content/courses/${courseId}/${LOCK_MANIFEST_FILE_NAME}`);
}

export function loadLockRegistry(root = process.cwd()) {
  const filePath = registryPath(root);
  if (!existsSync(filePath)) {
    return emptyRegistry();
  }

  const raw = readFileSync(filePath, "utf8");
  if (!raw.trim()) {
    return emptyRegistry();
  }

  return normalizeRegistry(parseRegistryYaml(raw));
}

export function saveLockRegistry(registry, root = process.cwd()) {
  writeFileSync(registryPath(root), stringifyRegistryYaml(normalizeRegistry(registry)), "utf8");
}

export function getCourseLock(courseId, root = process.cwd()) {
  return loadLockRegistry(root).courses[courseId];
}

export function isCourseLocked(courseId, root = process.cwd()) {
  return getCourseLock(courseId, root)?.status === "locked";
}

export function courseIdFromPath(targetPath, root = process.cwd()) {
  const relativePath = toRelativePosixPath(targetPath, root);
  const match = relativePath.match(/^content\/courses\/([^/]+)(?:\/|$)/);
  return match?.[1] ?? null;
}

export function toRelativePosixPath(targetPath, root = process.cwd()) {
  const text = String(targetPath);
  const absoluteRoot = resolve(root);
  const absoluteTarget = resolve(root, text);
  const relativePath = relative(absoluteRoot, absoluteTarget);

  if (!relativePath || relativePath === "") return "";
  return posixPath(relativePath);
}

export function assertCourseWriteAllowed(targetPath, options = {}) {
  const root = options.root ?? process.cwd();
  const relativePath = toRelativePosixPath(targetPath, root);
  const courseId = courseIdFromPath(relativePath, root);
  if (!courseId) return;

  const lock = getCourseLock(courseId, root);
  if (lock?.status !== "locked") return;

  if (options.allowManifestWrite && relativePath === manifestRelativePath(courseId)) {
    return;
  }

  const operation = options.operation ?? "write";
  const message = [
    "BLOCKED WRITE:",
    `Course: ${courseId}`,
    `File: ${relativePath}`,
    "Reason: course is locked",
    "Action: unlock the course or create an explicit change request before editing approved content.",
  ].join("\n");

  throw new CourseLockError(message, {
    courseId,
    file: relativePath,
    operation,
    status: lock.status,
  });
}

export function collectCourseFiles(courseId, root = process.cwd()) {
  const courseRoot = courseRootPath(courseId, root);
  if (!existsSync(courseRoot)) {
    throw new Error(`Course not found: content/courses/${courseId}`);
  }

  const packet = readCoursePacket(courseId, root);
  const protectedRoots = packetProtectedRoots(courseId, packet);
  const ignoredRoots = packetIgnoredRoots(courseId, packet);

  const files = walkFiles(courseRoot)
    .map((filePath) => posixPath(relative(courseRoot, filePath)))
    .filter((filePath) => filePath !== LOCK_MANIFEST_FILE_NAME)
    .filter((filePath) => !filePath.endsWith("/.DS_Store"))
    .filter((filePath) => filePath !== "Thumbs.db")
    .filter((filePath) => isProtectedCourseFile(filePath, protectedRoots))
    .filter((filePath) => !isIgnoredCourseFile(filePath, ignoredRoots))
    .sort((a, b) => a.localeCompare(b));

  return files;
}

export function hashCourseFiles(courseId, root = process.cwd()) {
  const courseRoot = courseRootPath(courseId, root);
  return collectCourseFiles(courseId, root).map((filePath) => {
    const absolutePath = join(courseRoot, filePath);
    const buffer = readFileSync(absolutePath);
    return {
      path: filePath,
      sha256: createHash("sha256").update(buffer).digest("hex"),
      bytes: statSync(absolutePath).size,
    };
  });
}

export function readCourseManifest(courseId, root = process.cwd()) {
  const filePath = manifestPathForCourse(courseId, root);
  if (!existsSync(filePath)) {
    return null;
  }

  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function writeCourseManifest(courseId, manifest, root = process.cwd()) {
  writeFileSync(manifestPathForCourse(courseId, root), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

export function buildCourseManifest(courseId, options = {}) {
  const root = options.root ?? process.cwd();
  const lockedAt = options.lockedAt ?? new Date().toISOString();
  const files = hashCourseFiles(courseId, root);

  return {
    version: 1,
    courseId,
    status: "locked",
    lockedAt,
    lockedBy: options.lockedBy ?? "repo-maintainer",
    reason: options.reason ?? "Course passed review and is protected from accidental rewrites.",
    protectedPaths: protectedPathsForCourse(courseId, root),
    allowedChanges: [...DEFAULT_ALLOWED_CHANGES],
    requiresUnlockFor: [...DEFAULT_REQUIRES_UNLOCK_FOR],
    files,
  };
}

export function newRegistryEntry(courseId, manifest) {
  return {
    status: "locked",
    lockedAt: manifest.lockedAt,
    lockedBy: manifest.lockedBy,
    reason: manifest.reason,
    manifestPath: manifestRelativePath(courseId),
    protectedPaths: [...manifest.protectedPaths],
    allowedChanges: [...manifest.allowedChanges],
    requiresUnlockFor: [...manifest.requiresUnlockFor],
  };
}

export function isNewLessonOrLabFile(filePath) {
  return /^(lessons|labs)\//.test(posixPath(filePath));
}

export function posixPath(value) {
  return String(value).replaceAll("\\", "/");
}

function emptyRegistry() {
  return {
    version: 1,
    updatedAt: "",
    courses: {},
  };
}

function normalizeRegistry(registry) {
  return {
    version: Number(registry.version ?? 1),
    updatedAt: registry.updatedAt ?? "",
    courses: registry.courses && typeof registry.courses === "object" ? registry.courses : {},
  };
}

function walkFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(filePath));
    } else if (entry.isFile()) {
      files.push(filePath);
    }
  }
  return files;
}

function readCoursePacket(courseId, root = process.cwd()) {
  const packetPath = join(courseRootPath(courseId, root), "course.packet.json");
  if (!existsSync(packetPath)) return null;

  return JSON.parse(readFileSync(packetPath, "utf8"));
}

function protectedPathsForCourse(courseId, root = process.cwd()) {
  const packet = readCoursePacket(courseId, root);
  const roots = packetProtectedRoots(courseId, packet);

  return roots.map((filePath) => `content/courses/${courseId}/${filePath}${filePath.includes(".") ? "" : "/**"}`);
}

function packetProtectedRoots(courseId, packet) {
  const defaultRoots = [
    "README.md",
    "course.json",
    "status.json",
    "lessons",
    "labs",
    "assets",
    "docs",
    "templates",
    "references",
  ];

  if (!packet?.contentRoots || typeof packet.contentRoots !== "object") {
    return defaultRoots;
  }

  const packetRoots = Object.values(packet.contentRoots)
    .map((relativePath) => stripCourseRoot(courseId, relativePath))
    .filter(Boolean);

  return [
    "README.md",
    "course.json",
    "status.json",
    "course.packet.json",
    ...packetRoots,
  ];
}

function packetIgnoredRoots(courseId, packet) {
  const defaults = ["drafts", "reports", "generated", "exports"];
  if (!packet || typeof packet !== "object") return defaults;

  return [
    packet.draftRoot,
    packet.reportsRoot,
    packet.generatedRoot,
    packet.exportsRoot,
  ]
    .map((relativePath) => stripCourseRoot(courseId, relativePath))
    .filter(Boolean);
}

function stripCourseRoot(courseId, relativePath) {
  const normalized = posixPath(relativePath);
  const prefix = `content/courses/${courseId}/`;
  if (!normalized.startsWith(prefix)) return "";
  return normalized.slice(prefix.length);
}

function isProtectedCourseFile(filePath, protectedRoots) {
  return protectedRoots.some((rootPath) => filePath === rootPath || filePath.startsWith(`${rootPath}/`));
}

function isIgnoredCourseFile(filePath, ignoredRoots) {
  return ignoredRoots.some((rootPath) => filePath === rootPath || filePath.startsWith(`${rootPath}/`));
}

function parseRegistryYaml(source) {
  const registry = emptyRegistry();
  let inCourses = false;
  let currentCourse = null;
  let currentListKey = null;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const rootMatch = line.match(/^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/);
    if (rootMatch && !line.startsWith(" ")) {
      const [, key, rawValue = ""] = rootMatch;
      if (key === "courses") {
        inCourses = true;
        currentCourse = null;
        currentListKey = null;
        if (rawValue.trim() === "{}") registry.courses = {};
        continue;
      }

      registry[key] = parseScalar(rawValue);
      inCourses = false;
      continue;
    }

    if (!inCourses) continue;

    const courseMatch = line.match(/^  ([A-Za-z0-9_-]+):\s*$/);
    if (courseMatch) {
      currentCourse = courseMatch[1];
      registry.courses[currentCourse] = {};
      currentListKey = null;
      continue;
    }

    const fieldMatch = line.match(/^    ([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/);
    if (fieldMatch && currentCourse) {
      const [, key, rawValue = ""] = fieldMatch;
      if (rawValue.trim() === "") {
        registry.courses[currentCourse][key] = [];
        currentListKey = key;
      } else {
        registry.courses[currentCourse][key] = parseScalar(rawValue);
        currentListKey = null;
      }
      continue;
    }

    const listMatch = line.match(/^      -\s*(.*)$/);
    if (listMatch && currentCourse && currentListKey) {
      registry.courses[currentCourse][currentListKey].push(parseScalar(listMatch[1]));
    }
  }

  return registry;
}

function parseScalar(value) {
  const trimmed = String(value ?? "").trim();
  if (trimmed === "") return "";
  if (trimmed === "[]") return [];
  if (trimmed === "{}") return {};
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (/^".*"$/.test(trimmed)) return JSON.parse(trimmed);
  return trimmed;
}

function stringifyRegistryYaml(registry) {
  const lines = [
    "# OpenTeachStack course lock registry.",
    "# Do not mark a course locked until it has passed human quality review.",
    `version: ${registry.version}`,
    `updatedAt: ${yamlScalar(registry.updatedAt || new Date().toISOString())}`,
  ];

  const courseEntries = Object.entries(registry.courses).sort(([a], [b]) => a.localeCompare(b));
  if (courseEntries.length === 0) {
    lines.push("courses: {}");
    return `${lines.join("\n")}\n`;
  }

  lines.push("courses:");
  for (const [courseId, entry] of courseEntries) {
    lines.push(`  ${courseId}:`);
    for (const [key, value] of Object.entries(entry)) {
      if (Array.isArray(value)) {
        lines.push(`    ${key}:`);
        for (const item of value) {
          lines.push(`      - ${yamlScalar(item)}`);
        }
      } else {
        lines.push(`    ${key}: ${yamlScalar(value)}`);
      }
    }
  }

  return `${lines.join("\n")}\n`;
}

function yamlScalar(value) {
  if (value === null || value === undefined) return "\"\"";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(String(value));
}
