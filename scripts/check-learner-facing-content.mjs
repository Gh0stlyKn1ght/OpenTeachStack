import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const COURSES_DIR = path.join(ROOT, "content", "courses");
const CONTENT_DIR = path.join(ROOT, "content");
const APP_DIR = path.join(ROOT, "src", "app");
const BOOK_UI_FILES = [
  path.join(ROOT, "src", "app", "book", "[course]", "[chapter]", "[section]", "page.tsx"),
  path.join(ROOT, "src", "app", "book", "ots-101", "[chapter]", "[section]", "page.tsx"),
  path.join(ROOT, "src", "app", "book", "ots-280", "[chapter]", "[section]", "page.tsx"),
];

const forbiddenPatterns = [
  {
    pattern: /section-specific teaching notes/i,
    message: "internal section-note heading is visible to learners",
  },
  {
    pattern: /\bentry should\b/i,
    message: "editor guidance phrased as an authoring requirement is visible",
  },
  {
    pattern: /\buse these notes\b/i,
    message: "internal note-usage guidance is visible",
  },
  {
    pattern: /\bweak note\b/i,
    message: "editor contrast language is visible",
  },
  {
    pattern: /\bstronger note\b/i,
    message: "editor contrast language is visible",
  },
  {
    pattern: /fill-in-the-blank/i,
    message: "authoring-script warning is visible",
  },
  {
    pattern: /\bfor why teachers\b/i,
    message: "slug-specific authoring instruction is visible",
  },
  {
    pattern: /\bwhy-teachers-need\b/i,
    message: "slug-like authoring label is visible",
  },
  {
    pattern: /route reviewed for this lesson/i,
    message: "route QA note is visible",
  },
  {
    pattern: /open standalone lesson page/i,
    message: "internal route utility is visible",
  },
  {
    pattern: /\bgenerated draft\b/i,
    message: "generation status language is visible",
  },
  {
    pattern: /This page turns that pressure into a visible update/i,
    message: "self-referential generated page phrasing is visible",
  },
  {
    pattern: /Make this page concrete by writing three small decisions/i,
    message: "self-referential generated page task is visible",
  },
  {
    pattern: /^# (chapter plan|checkpoint review)$/m,
    message: "overview or checkpoint title is not title-cased",
  },
  {
    pattern: /\b(migration scaffold|status:\s*scaffolded|this section is scaffolded|scaffold status)\b/i,
    message: "scaffold status language is visible",
  },
  {
    pattern: /\bauthoring status\b/i,
    message: "authoring status language is visible",
  },
  {
    pattern: /\bmigration status\b/i,
    message: "migration status language is visible",
  },
  {
    pattern: /\bsource registry\b/i,
    message: "source registry metadata is visible",
  },
  {
    pattern: /\bsource lesson slug\b/i,
    message: "source lesson metadata is visible",
  },
  {
    pattern: /\bAdd a [a-z0-9 -]+ line to the capstone index\b/i,
    message: "awkward generated capstone-index wording is visible",
  },
  {
    pattern: /\blesson work\b/i,
    message: "generic generated lesson-work phrasing is visible",
  },
  {
    pattern: /\bworking item\b/i,
    message: "generic generated working-item phrasing is visible",
  },
  {
    pattern: /\bthe item supports\b/i,
    message: "generic generated item-support phrasing is visible",
  },
  {
    pattern: /\bkeep the notes tied to\b/i,
    message: "internal note-scoping guidance is visible",
  },
  {
    pattern: /\bthe selected item from this set\b/i,
    message: "generic generated selection-table phrasing is visible",
  },
  {
    pattern: /\bWrite the agent boundary for [a-z0-9 -]+ in practical terms\b/i,
    message: "awkward generated agent-boundary wording is visible",
  },
  {
    pattern: /\baccept no [a-z0-9 -]+ agent change until\b/i,
    message: "awkward generated diff-review wording is visible",
  },
  {
    pattern: /\bThis lesson helps\b/i,
    message: "generated lesson opener is visible",
  },
  {
    pattern: /The point is not to read a definition and move on/i,
    message: "repeated generated lesson framing is visible",
  },
  {
    pattern: /does not read like a generic template/i,
    message: "template-avoidance authoring note is visible",
  },
  {
    pattern: /Use this three-step workflow/i,
    message: "repeated generated workflow shell is visible",
  },
  {
    pattern: /Applied to \*\*/i,
    message: "repeated generated application shell is visible",
  },
  {
    pattern: /For the \d{2}-\d .* response/i,
    message: "slug-specific generated response prompt is visible",
  },
  {
    pattern: /turns? this .* into one practical teacher move/i,
    message: "repeated generated teacher-move shell is visible",
  },
  {
    pattern: /Use this section to apply the chapter logic/i,
    message: "internal chapter-logic guidance is visible",
  },
  {
    pattern: /Record what a colleague could inspect next/i,
    message: "repeated generated inspection prompt is visible",
  },
  {
    pattern: /A privacy and safety note is attached/i,
    message: "repeated generated safety-note phrasing is visible",
  },
  {
    pattern: /one concrete teacher-owned action with visibility for peers and future maintenance/i,
    message: "repeated generated action phrasing is visible",
  },
  {
    pattern: /Use official references before making platform, workflow, or release claims/i,
    message: "repeated generated source-rule phrasing is visible",
  },
  {
    pattern: /what avoids [a-z]/i,
    message: "awkward generated after-class phrasing is visible",
  },
  {
    pattern: /without asking for a translation/i,
    message: "internal translation metaphor is visible",
  },
  {
    pattern: /not proving technical mastery for its own sake/i,
    message: "repeated generated scenario aside is visible",
  },
  {
    pattern: /not trying to collect one more tool or checklist/i,
    message: "repeated generated course opener is visible",
  },
  {
    pattern: /rather than left as a loose note/i,
    message: "awkward generated quality-check phrasing is visible",
  },
  {
    pattern: /teacher is making a durable classroom move/i,
    message: "repeated generated scenario phrasing is visible",
  },
  {
    pattern: /## Lesson Move/i,
    message: "template-style lesson heading is visible",
  },
  {
    pattern: /Add a short entry with these parts/i,
    message: "template-style artifact prompt is visible",
  },
  {
    pattern: /handoff note/i,
    message: "internal handoff-note label is visible",
  },
  {
    pattern: /peer handoff/i,
    message: "internal peer-handoff label is visible",
  },
  {
    pattern: /artifact update/i,
    message: "internal artifact-update wording is visible",
  },
  {
    pattern: /add a \d{2}\.\d+ entry/i,
    message: "section-number artifact entry is visible",
  },
];

function walkLessonFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walkLessonFiles(fullPath);
    if (!entry.name.endsWith(".mdx")) return [];
    if (!fullPath.includes(`${path.sep}lessons${path.sep}`)) return [];

    return [fullPath];
  });
}

function walkCourseSupportFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "templates") return walkMarkdownFiles(fullPath);
      return [];
    }

    if (entry.name === "README.md") return [fullPath];
    return [];
  });
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walkMarkdownFiles(fullPath);
    if (/\.(md|mdx)$/i.test(entry.name)) return [fullPath];
    return [];
  });
}

function walkPublishedContentFiles() {
  const publicContentDirs = ["lessons", "labs", "field-notes"].map((folder) =>
    path.join(CONTENT_DIR, folder),
  );

  return publicContentDirs.flatMap((dir) => walkMarkdownFiles(dir)).filter((file) => {
    const source = fs.readFileSync(file, "utf8");
    return !/^draft:\s*true\s*$/im.test(source);
  });
}

function walkAppMdxFiles(dir = APP_DIR) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walkAppMdxFiles(fullPath);
    if (entry.name.endsWith(".mdx")) return [fullPath];
    return [];
  });
}

function visibleBody(source) {
  if (!source.startsWith("---")) return source;

  const closingFence = source.indexOf("\n---", 3);
  if (closingFence === -1) return source;

  return source.slice(closingFence + 4);
}

const lessonFiles = walkLessonFiles(COURSES_DIR);
const supportFiles = fs.existsSync(COURSES_DIR)
  ? fs
      .readdirSync(COURSES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((entry) => walkCourseSupportFiles(path.join(COURSES_DIR, entry.name)))
  : [];
const publishedContentFiles = walkPublishedContentFiles();
const appMdxFiles = walkAppMdxFiles();
const uiFiles = BOOK_UI_FILES.filter((file) => fs.existsSync(file));
const failures = [];

for (const file of [...lessonFiles, ...supportFiles, ...publishedContentFiles, ...appMdxFiles]) {
  const source = fs.readFileSync(file, "utf8");
  const body = visibleBody(source);
  const normalized = path.relative(ROOT, file).replaceAll(path.sep, "/");

  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(body)) {
      failures.push(`${normalized}: ${message} (${pattern})`);
    }
  }
}

for (const file of uiFiles) {
  const source = fs.readFileSync(file, "utf8");
  const normalized = path.relative(ROOT, file).replaceAll(path.sep, "/");

  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(source)) {
      failures.push(`${normalized}: ${message} (${pattern})`);
    }
  }
}

if (failures.length > 0) {
  console.error("Learner-facing content check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Learner-facing content check passed for ${lessonFiles.length} course lesson files, ${supportFiles.length} course support files, ${publishedContentFiles.length} published content files, ${appMdxFiles.length} app MDX files, and ${uiFiles.length} book UI files.`,
);
