import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Valid top-level content directories inside `content/`. */
export type ContentType =
  | "lessons"
  | "labs"
  | "field-notes"
  | "templates"
  | "case-studies";

/** Frontmatter schema shared by every content file. */
export interface ContentFrontmatter {
  title: string;
  module: string;
  type:
    | "lecture"
    | "lab"
    | "field-note"
    | "template"
    | "case-study"
    | "overview"
    | "section"
    | "concept"
    | "workflow"
    | "framework"
    | "comparison"
    | "practice"
    | "artifact"
    | "checkpoint"
    | "review"
    | "safety"
    | "source-check";
  order: number;
  week: number;
  duration: string;
  level: string;
  summary: string;
  outcomes: string[];
  tags: string[];
  date: string;
  draft: boolean;
  author?: string;
}

/** A fully-parsed content item returned by the helper functions. */
export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface CourseLessonItem extends ContentItem {
  frontmatter: ContentFrontmatter & {
    course: string;
    courseSlug: string;
    chapter: string;
    chapterSlug: string;
    sectionNumber: string;
    sectionSlug: string;
    canonicalRoute: string;
    migrationStatus: "scaffolded" | "generated" | "authored" | "reviewed";
    lessonType?: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Absolute path to the project-root `content/` directory. */
const CONTENT_ROOT = path.join(process.cwd(), "content");

const VALID_CONTENT_TYPES = new Set<ContentFrontmatter["type"]>([
  "lecture",
  "lab",
  "field-note",
  "template",
  "case-study",
  "overview",
  "section",
  "concept",
  "workflow",
  "framework",
  "comparison",
  "practice",
  "artifact",
  "checkpoint",
  "review",
  "safety",
  "source-check",
]);

const VALID_MIGRATION_STATUSES = new Set<CourseLessonItem["frontmatter"]["migrationStatus"]>([
  "scaffolded",
  "generated",
  "authored",
  "reviewed",
]);

function relativeContentPath(filePath: string) {
  return path.relative(process.cwd(), filePath);
}

function frontmatterError(filePath: string, key: string, message: string): never {
  throw new Error(`Invalid frontmatter in ${relativeContentPath(filePath)}: ${key} ${message}`);
}

function asFrontmatterRecord(data: unknown, filePath: string): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    frontmatterError(filePath, "frontmatter", "must be an object.");
  }

  return data as Record<string, unknown>;
}

function readString(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
  fallback: string,
) {
  const value = data[key];
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value !== "string") {
    frontmatterError(filePath, key, "must be a string.");
  }

  return value;
}

function readRequiredString(data: Record<string, unknown>, key: string, filePath: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    frontmatterError(filePath, key, "must be a non-empty string.");
  }

  return value;
}

function readRequiredStringWithFallback(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
  fallback: string,
) {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (fallback.trim().length === 0) {
      frontmatterError(filePath, key, "must be a non-empty string.");
    }

    return fallback;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    frontmatterError(filePath, key, "must be a non-empty string.");
  }

  return value;
}

function readNumber(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
  fallback: number,
) {
  const value = data[key];
  if (value === undefined || value === null) {
    return fallback;
  }

  const numericValue = typeof value === "string" ? Number(value) : value;
  if (typeof numericValue !== "number" || Number.isNaN(numericValue)) {
    frontmatterError(filePath, key, "must be a number.");
  }

  return numericValue;
}

function readBoolean(
  data: Record<string, unknown>,
  key: string,
  filePath: string,
  fallback: boolean,
) {
  const value = data[key];
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  frontmatterError(filePath, key, "must be a boolean.");
}

function readStringArray(data: Record<string, unknown>, key: string, filePath: string) {
  const value = data[key];
  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    frontmatterError(filePath, key, "must be an array of strings.");
  }

  return value;
}

function defaultContentType(filePath: string): ContentFrontmatter["type"] {
  const normalizedPath = filePath.replace(/\\/g, "/");
  if (normalizedPath.includes("/labs/")) {
    return "lab";
  }

  if (normalizedPath.includes("/field-notes/")) {
    return "field-note";
  }

  if (normalizedPath.includes("/templates/")) {
    return "template";
  }

  if (normalizedPath.includes("/case-studies/")) {
    return "case-study";
  }

  return "lecture";
}

function readContentType(data: Record<string, unknown>, filePath: string) {
  const value = data.type;
  if (value === undefined || value === null) {
    return defaultContentType(filePath);
  }

  if (typeof value !== "string" || !VALID_CONTENT_TYPES.has(value as ContentFrontmatter["type"])) {
    frontmatterError(filePath, "type", "must be a supported content or course-section type.");
  }

  return value as ContentFrontmatter["type"];
}

function normalizeContentFrontmatter(data: unknown, filePath: string): ContentFrontmatter {
  const frontmatter = asFrontmatterRecord(data, filePath);
  const title = readRequiredString(frontmatter, "title", filePath);

  return {
    title,
    module: readString(frontmatter, "module", filePath, "uncategorized"),
    type: readContentType(frontmatter, filePath),
    order: readNumber(frontmatter, "order", filePath, 0),
    week: readNumber(frontmatter, "week", filePath, 0),
    duration: readString(frontmatter, "duration", filePath, "self-paced"),
    level: readString(frontmatter, "level", filePath, "beginner"),
    summary: readString(frontmatter, "summary", filePath, title),
    outcomes: readStringArray(frontmatter, "outcomes", filePath),
    tags: readStringArray(frontmatter, "tags", filePath),
    date: readString(frontmatter, "date", filePath, ""),
    draft: readBoolean(frontmatter, "draft", filePath, false),
    author: readString(frontmatter, "author", filePath, ""),
  };
}

function normalizeCourseLessonFrontmatter(
  data: unknown,
  filePath: string,
): CourseLessonItem["frontmatter"] {
  const frontmatter = asFrontmatterRecord(data, filePath);
  const migrationStatus = readRequiredString(frontmatter, "migrationStatus", filePath);
  const normalizedPath = filePath.replace(/\\/g, "/");
  const coursePathMatch = normalizedPath.match(
    /content\/courses\/([^/]+)\/lessons\/([^/]+)\/([^/.]+)\.mdx$/,
  );
  const inferredCourseSlug = coursePathMatch?.[1] ?? "";
  const inferredChapterSlug = coursePathMatch?.[2] ?? "";
  const inferredSectionSlug = coursePathMatch?.[3] ?? "";
  const inferredSectionNumber = inferredSectionSlug.replace("-", ".");

  if (!VALID_MIGRATION_STATUSES.has(migrationStatus as CourseLessonItem["frontmatter"]["migrationStatus"])) {
    frontmatterError(filePath, "migrationStatus", "must be scaffolded, generated, authored, or reviewed.");
  }

  return {
    ...normalizeContentFrontmatter(frontmatter, filePath),
    course: readRequiredString(frontmatter, "course", filePath),
    courseSlug: readRequiredStringWithFallback(
      frontmatter,
      "courseSlug",
      filePath,
      inferredCourseSlug,
    ),
    chapter: readRequiredString(frontmatter, "chapter", filePath),
    chapterSlug: readRequiredStringWithFallback(
      frontmatter,
      "chapterSlug",
      filePath,
      inferredChapterSlug,
    ),
    sectionNumber: readRequiredStringWithFallback(
      frontmatter,
      "sectionNumber",
      filePath,
      inferredSectionNumber,
    ),
    sectionSlug: readRequiredStringWithFallback(
      frontmatter,
      "sectionSlug",
      filePath,
      inferredSectionSlug,
    ),
    canonicalRoute: readRequiredString(frontmatter, "canonicalRoute", filePath),
    migrationStatus: migrationStatus as CourseLessonItem["frontmatter"]["migrationStatus"],
  };
}

/**
 * Resolve the directory for a given content type.
 * Throws if the directory does not exist.
 */
function contentDir(type: ContentType | string): string {
  return path.join(CONTENT_ROOT, type);
}

/**
 * List every `.mdx` file in a content-type directory and return the slugs
 * (filenames without the extension).
 */
function listSlugs(type: ContentType | string): string[] {
  const dir = contentDir(type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Parse a single MDX file and return its frontmatter, raw content body, and
 * computed reading-time statistics.
 */
function parseFile(filePath: string, slug: string): ContentItem {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: normalizeContentFrontmatter(data, filePath),
    content,
    readingTime: {
      text: stats.text,
      minutes: stats.minutes,
      time: stats.time,
      words: stats.words,
    },
  };
}

function parseCourseLessonFile(filePath: string, slug: string): CourseLessonItem {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: normalizeCourseLessonFrontmatter(data, filePath),
    content,
    readingTime: {
      text: stats.text,
      minutes: stats.minutes,
      time: stats.time,
      words: stats.words,
    },
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Retrieve a single content item by its type directory and slug.
 *
 * @example
 * const lesson = getContentBySlug("lessons", "intro-to-techops");
 */
export function getContentBySlug(
  type: ContentType | string,
  slug: string,
): ContentItem {
  const filePath = path.join(contentDir(type), `${slug}.mdx`);
  return parseFile(filePath, slug);
}

export function getCourseLessonBySlugs(
  courseSlug: string,
  chapterSlug: string,
  sectionSlug: string,
): CourseLessonItem | undefined {
  const filePath = path.join(
    CONTENT_ROOT,
    "courses",
    courseSlug,
    "lessons",
    chapterSlug,
    `${sectionSlug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return parseCourseLessonFile(filePath, sectionSlug);
}

/**
 * Retrieve every content item inside a type directory, sorted first by the
 * `order` frontmatter field (ascending) and then by `date` (newest first).
 *
 * Items with `draft: true` are excluded in production builds.
 */
export function getAllContent(type: ContentType | string): ContentItem[] {
  const slugs = listSlugs(type);

  const items = slugs.map((slug) => getContentBySlug(type, slug));

  // Filter out drafts in production
  const filtered =
    process.env.NODE_ENV === "production"
      ? items.filter((item) => !item.frontmatter.draft)
      : items;

  return filtered.sort((a, b) => {
    // Primary: order (ascending)
    const orderDiff = (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0);
    if (orderDiff !== 0) return orderDiff;

    // Secondary: date (newest first)
    const dateA = a.frontmatter.date
      ? new Date(a.frontmatter.date).getTime()
      : 0;
    const dateB = b.frontmatter.date
      ? new Date(b.frontmatter.date).getTime()
      : 0;
    return dateB - dateA;
  });
}

/**
 * Return all content items whose `module` frontmatter field matches the
 * supplied module identifier.
 *
 * @example
 * const items = getContentByModule("lessons", "02-digital-home");
 */
export function getContentByModule(
  type: ContentType | string,
  module: string,
): ContentItem[] {
  return getAllContent(type).filter(
    (item) => item.frontmatter.module === module,
  );
}

/**
 * Build and return the full module structure for the course by scanning every
 * content type and grouping items by their `module` frontmatter field.
 *
 * Each entry in the returned array contains the module identifier and the
 * content items that belong to it, partitioned by type.
 */
export function getAllModules(): {
  module: string;
  lessons: ContentItem[];
  labs: ContentItem[];
  fieldNotes: ContentItem[];
  templates: ContentItem[];
  caseStudies: ContentItem[];
}[] {
  const contentTypes: {
    key: keyof Omit<
      ReturnType<typeof getAllModules>[number],
      "module"
    >;
    dir: ContentType;
  }[] = [
    { key: "lessons", dir: "lessons" },
    { key: "labs", dir: "labs" },
    { key: "fieldNotes", dir: "field-notes" },
    { key: "templates", dir: "templates" },
    { key: "caseStudies", dir: "case-studies" },
  ];

  // Collect every unique module identifier across all content types.
  const moduleMap = new Map<
    string,
    {
      module: string;
      lessons: ContentItem[];
      labs: ContentItem[];
      fieldNotes: ContentItem[];
      templates: ContentItem[];
      caseStudies: ContentItem[];
    }
  >();

  for (const { key, dir } of contentTypes) {
    const items = getAllContent(dir);

    for (const item of items) {
      const mod = item.frontmatter.module ?? "uncategorized";

      if (!moduleMap.has(mod)) {
        moduleMap.set(mod, {
          module: mod,
          lessons: [],
          labs: [],
          fieldNotes: [],
          templates: [],
          caseStudies: [],
        });
      }

      moduleMap.get(mod)![key].push(item);
    }
  }

  // Sort modules by their identifier (which typically starts with a number).
  return Array.from(moduleMap.values()).sort((a, b) =>
    a.module.localeCompare(b.module),
  );
}
