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
  type: "lecture" | "lab" | "field-note" | "template" | "case-study";
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
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Absolute path to the project-root `content/` directory. */
const CONTENT_ROOT = path.join(process.cwd(), "content");

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
    frontmatter: data as ContentFrontmatter,
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

  return parseFile(filePath, sectionSlug) as CourseLessonItem;
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
