import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const generatedDate = "2026-06-22";

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function ensureDir(relativePath) {
  mkdirSync(join(root, relativePath), { recursive: true });
}

function write(relativePath, content) {
  const absolutePath = join(root, relativePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content);
}

function copyIfChanged(sourceRelativePath, targetRelativePath) {
  const source = join(root, sourceRelativePath);
  if (!existsSync(source)) return;
  const target = join(root, targetRelativePath);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

function getQuotedStrings(value) {
  return [...value.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
}

function sectionSlug(number) {
  return number.replace(".", "-");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yamlString(value) {
  return JSON.stringify(value ?? "");
}

function parseSectionBlocks(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) return new Map();

  const nextExport = source.indexOf("\nexport ", start + 1);
  const chunk = source.slice(start, nextExport === -1 ? source.length : nextExport);
  const blocks = new Map();
  const blockRegex = /"?([a-z0-9-]+)"?:\s*\[([\s\S]*?)\n\s*\],/g;

  for (const block of chunk.matchAll(blockRegex)) {
    const chapterId = block[1];
    const body = block[2];
    const sections = [];

    for (const line of body.split(/\r?\n/)) {
      if (!line.includes("number:")) continue;
      const values = getQuotedStrings(line);
      if (values.length < 4) continue;
      sections.push({
        number: values[0],
        title: values[1],
        type: values[2],
        duration: values[3],
        artifact: values[4],
      });
    }

    blocks.set(chapterId, sections);
  }

  return blocks;
}

function parseRelatedLessons(source) {
  const related = new Map();
  const start = source.indexOf("export const SECTION_RELATED_LESSONS");
  if (start === -1) return related;

  const end = source.indexOf("};", start);
  const chunk = source.slice(start, end);
  const entryRegex = /"([^"]+)":\s*"([^"]+)"/g;

  for (const match of chunk.matchAll(entryRegex)) {
    related.set(match[1], match[2]);
  }

  return related;
}

function parseOts101() {
  const metadata = read("src/lib/metadata.ts");
  const book = read("src/lib/book.ts");
  const sectionBlocks = parseSectionBlocks(book, "CHAPTER_SECTIONS");
  const relatedLessons = parseRelatedLessons(book);
  const modules = [];
  const moduleRegex = /\{\s*id:\s*"([^"]+)",\s*number:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?buildArtifact:\s*"([^"]+)"/g;

  for (const match of metadata.matchAll(moduleRegex)) {
    const [, id, number, title, slug, buildArtifact] = match;
    modules.push({
      id,
      number,
      title,
      slug,
      buildArtifact,
      sections: (sectionBlocks.get(id) ?? []).map((section) => ({
        ...section,
        sourceLessonSlug: relatedLessons.get(section.number),
      })),
    });
  }

  return {
    code: "OTS-101",
    slug: "ots-101",
    title: "Teaching Teachers Foundations",
    owner: "dedicated",
    canonicalRoute: "/book/ots-101",
    sourceRegistry: "src/lib/book.ts",
    chapters: modules,
  };
}

function parseGenericCourses() {
  const source = read("src/lib/courseStructures.ts");
  const courses = [];
  let currentCourse;
  let currentChapter;

  for (const line of source.split(/\r?\n/)) {
    const codeMatch = line.match(/code:\s*"([^"]+)"/);
    if (codeMatch) {
      if (currentCourse) courses.push(currentCourse);
      currentCourse = {
        code: codeMatch[1],
        slug: "",
        title: "",
        owner: "generic",
        canonicalRoute: "",
        sourceRegistry: "src/lib/courseStructures.ts",
        chapters: [],
      };
      currentChapter = undefined;
      continue;
    }

    if (!currentCourse) continue;

    const courseSlugMatch = line.match(/slug:\s*"([^"]+)"/);
    if (courseSlugMatch && !currentChapter) {
      currentCourse.slug = courseSlugMatch[1];
      currentCourse.canonicalRoute = `/book/${currentCourse.slug}`;
      continue;
    }

    const titleMatch = line.match(/title:\s*"([^"]+)"/);
    if (titleMatch && !currentCourse.title) {
      currentCourse.title = titleMatch[1];
      continue;
    }

    if (line.includes("chapter(")) {
      const values = getQuotedStrings(line);
      if (values.length >= 6) {
        currentChapter = {
          number: values[0],
          title: values[1],
          slug: `${values[0]}-${values[2]}`,
          buildArtifact: values[5],
          sections: [],
        };
        currentCourse.chapters.push(currentChapter);
      }
      continue;
    }

    if (currentChapter && line.includes("section(")) {
      const values = getQuotedStrings(line);
      if (values.length >= 2) {
        currentChapter.sections.push({
          number: values[0],
          title: values[1],
          type: values[2] ?? "section",
          duration: values[3] ?? "20 minutes",
          artifact: values[4],
        });
      }
    }
  }

  if (currentCourse) courses.push(currentCourse);
  return courses.filter((course) => course.slug && course.code !== "OTS-101" && course.code !== "OTS-280");
}

function parseOts280() {
  const cyber = read("src/lib/cyberSafety.ts");
  const sectionBlocks = parseSectionBlocks(cyber, "CYBER_CHAPTER_SECTIONS");
  const moduleIdsStart = cyber.indexOf("const CYBER_MODULE_IDS");
  const moduleIdsEnd = cyber.indexOf("];", moduleIdsStart);
  const moduleIds = getQuotedStrings(cyber.slice(moduleIdsStart, moduleIdsEnd));
  const modulesStart = cyber.indexOf("export const CYBER_SAFETY_MODULES");
  const modulesEnd = cyber.indexOf("export const CYBER_COURSE_CODE", modulesStart);
  const modulesChunk = cyber.slice(modulesStart, modulesEnd);
  const moduleRegex = /\{\s*number:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?buildArtifact:\s*"([^"]+)"/g;
  const chapters = [];
  let index = 0;

  for (const match of modulesChunk.matchAll(moduleRegex)) {
    const [, number, title, buildArtifact] = match;
    const id = moduleIds[index++] ?? slugify(title);
    chapters.push({
      id,
      number,
      title,
      slug: `${number}-${id}`,
      buildArtifact,
      sections: sectionBlocks.get(id) ?? [],
    });
  }

  return {
    code: "OTS-280",
    slug: "ots-280",
    title: "Cyber Safety for Educators",
    owner: "dedicated",
    canonicalRoute: "/book/ots-280",
    sourceRegistry: "src/lib/cyberSafety.ts",
    chapters,
  };
}

function readFrontmatterTitle(relativePath) {
  const raw = read(relativePath);
  const title = raw.match(/^title:\s*"([^"]+)"/m)?.[1] ?? raw.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  return title?.replace(/^"|"$/g, "");
}

function copyCourseDocs(course) {
  const docsDir = join(root, "docs");
  if (!existsSync(docsDir)) return [];

  const prefix = course.code.replace("-", "_");
  const copied = [];

  for (const name of readdirSync(docsDir)) {
    if (!name.startsWith(prefix) || !name.endsWith(".md")) continue;
    copyIfChanged(`docs/${name}`, `content/courses/${course.slug}/docs/${name}`);
    copied.push(`docs/${name}`);
  }

  return copied;
}

function copyCourseAssets(course) {
  const publicAssetDir = join(root, "public", "images", course.slug);
  if (!existsSync(publicAssetDir)) return [];

  const copied = [];
  for (const name of readdirSync(publicAssetDir)) {
    copyIfChanged(
      `public/images/${course.slug}/${name}`,
      `content/courses/${course.slug}/assets/images/${name}`,
    );
    copied.push(`assets/images/${name}`);
  }
  return copied;
}

function copyKnownLabs(course) {
  if (course.slug !== "ots-220") return [];

  const labSlugs = [
    "your-first-apps-script-custom-menu",
    "generate-unit-folders-with-apps-script",
    "generate-docs-from-sheet-rows",
    "create-google-form-quizzes-from-sheet",
    "send-reminder-emails-from-sheet",
  ];
  const copied = [];

  for (const slug of labSlugs) {
    const sourcePath = `content/labs/${slug}.mdx`;
    if (!existsSync(join(root, sourcePath))) continue;
    copyIfChanged(sourcePath, `content/courses/${course.slug}/labs/${slug}.mdx`);
    copied.push(slug);
  }

  return copied;
}

function buildCourseReadme(course) {
  return `# ${course.code} ${course.title}

Status: migration scaffold

Canonical route: \`${course.canonicalRoute}\`

Source registry: \`${course.sourceRegistry}\`

This folder is the course-owned content package for ${course.code}. It is designed so the course can be migrated, exported, or maintained without hunting through global content folders.

## Folders

- \`lessons/\` - chapter and section lesson source files
- \`labs/\` - hands-on labs, workshops, simulators, or build activities
- \`assets/\` - course-owned images, diagrams, downloads, and media
- \`docs/\` - planning, outlines, source queues, reviews, and release notes
- \`templates/\` - course-specific artifact templates
- \`references/\` - source queues, citation notes, and platform documentation notes

## Migration Rule

Keep the current app routes working until this course folder becomes the reader source. Do not delete global lesson or lab files until route parity, search, build, and representative probes pass.
`;
}

function buildDirectoryReadme(course, directory, description) {
  return `# ${course.code} ${directory}

${description}

This directory belongs to \`${course.slug}\` and should travel with the course during future migration or export work.
`;
}

function buildCourseJson(course, copiedDocs, copiedAssets, copiedLabs) {
  return `${JSON.stringify(
    {
      code: course.code,
      slug: course.slug,
      title: course.title,
      owner: course.owner,
      canonicalRoute: course.canonicalRoute,
      sourceRegistry: course.sourceRegistry,
      generatedAt: generatedDate,
      migrationStatus: "scaffolded",
      chapters: course.chapters.map((chapter) => ({
        number: chapter.number,
        slug: chapter.slug,
        title: chapter.title,
        buildArtifact: chapter.buildArtifact,
        lessonCount: chapter.sections.length,
      })),
      copiedDocs,
      copiedAssets,
      copiedLabs,
    },
    null,
    2,
  )}\n`;
}

function buildSectionMdx(course, chapter, section) {
  const slug = sectionSlug(section.number);
  const canonicalRoute = `${course.canonicalRoute}/${chapter.slug}/${slug}`;
  const sourceLessonSlug = section.sourceLessonSlug;
  const sourceLessonTitle = sourceLessonSlug && existsSync(join(root, "content", "lessons", `${sourceLessonSlug}.mdx`))
    ? readFrontmatterTitle(`content/lessons/${sourceLessonSlug}.mdx`)
    : undefined;

  return `---
course: ${yamlString(course.code)}
courseSlug: ${yamlString(course.slug)}
chapter: ${yamlString(chapter.title)}
chapterSlug: ${yamlString(chapter.slug)}
sectionNumber: ${yamlString(section.number)}
sectionSlug: ${yamlString(slug)}
title: ${yamlString(section.title)}
type: ${yamlString(section.type)}
duration: ${yamlString(section.duration)}
artifact: ${yamlString(section.artifact ?? chapter.buildArtifact)}
canonicalRoute: ${yamlString(canonicalRoute)}
sourceRegistry: ${yamlString(course.sourceRegistry)}
sourceLessonSlug: ${yamlString(sourceLessonSlug ?? "")}
sourceLessonTitle: ${yamlString(sourceLessonTitle ?? "")}
migrationStatus: "scaffolded"
---

# ${section.title}

This is the course-owned source file for **${course.code} / ${chapter.title} / ${section.number}**.

## Authoring Status

- Migration status: scaffolded
- Canonical route: \`${canonicalRoute}\`
- Current registry source: \`${course.sourceRegistry}\`
${sourceLessonSlug ? `- Related global lesson: \`content/lessons/${sourceLessonSlug}.mdx\`${sourceLessonTitle ? ` (${sourceLessonTitle})` : ""}` : "- Related global lesson: none mapped yet"}

## Section Purpose

Use this file for the permanent lesson body when ${course.code} moves from registry-driven rendering to course-folder rendering.

## Authoring Checklist

- [ ] Replace scaffold text with authored lesson content.
- [ ] Add source notes or references needed for this section.
- [ ] Add artifacts, labs, templates, or assets in this course folder when needed.
- [ ] Confirm privacy, accessibility, and safety review.
- [ ] Verify the canonical route after reader migration.
`;
}

function scaffoldCourse(course) {
  const base = `content/courses/${course.slug}`;
  ensureDir(base);
  const copiedDocs = copyCourseDocs(course);
  const copiedAssets = copyCourseAssets(course);
  const copiedLabs = copyKnownLabs(course);

  write(`${base}/README.md`, buildCourseReadme(course));
  write(`${base}/course.json`, buildCourseJson(course, copiedDocs, copiedAssets, copiedLabs));

  const directories = [
    ["lessons", "Chapter and section lesson files for this course."],
    ["labs", "Course-owned labs, workshops, simulations, and build activities."],
    ["assets", "Images, diagrams, downloads, media, and other course-owned assets."],
    ["docs", "Outlines, source queues, review notes, roadmap support, and release evidence."],
    ["templates", "Artifact templates and reusable course documents."],
    ["references", "Primary sources, citation notes, platform docs, and source-bank queues."],
  ];

  for (const [directory, description] of directories) {
    write(`${base}/${directory}/README.md`, buildDirectoryReadme(course, directory, description));
  }

  for (const chapter of course.chapters) {
    const chapterDir = `${base}/lessons/${chapter.slug}`;
    write(
      `${chapterDir}/README.md`,
      `# ${course.code} ${chapter.number} ${chapter.title}\n\nBuild artifact: ${chapter.buildArtifact}\n\nCanonical chapter route: \`${course.canonicalRoute}/${chapter.slug}\`\n`,
    );

    for (const section of chapter.sections) {
      write(`${chapterDir}/${sectionSlug(section.number)}.mdx`, buildSectionMdx(course, chapter, section));
    }
  }
}

const courses = [parseOts101(), ...parseGenericCourses(), parseOts280()].sort((a, b) =>
  a.code.localeCompare(b.code),
);

write(
  "content/courses/README.md",
  `# Course-Owned Content\n\nDate: ${generatedDate}\n\nThis directory is the migration-ready home for course-owned lessons, labs, assets, docs, templates, and references.\n\nCurrent courses:\n\n${courses.map((course) => `- [${course.code} ${course.title}](./${course.slug}/README.md)`).join("\n")}\n\nCurrent app routes still read from their existing registries. Move one reader at a time and verify route parity before deleting global content.\n`,
);

for (const course of courses) {
  scaffoldCourse(course);
}

console.log(`Scaffolded ${courses.length} course folders in content/courses.`);
