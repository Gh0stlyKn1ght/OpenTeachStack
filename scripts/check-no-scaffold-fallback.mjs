import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SEARCH_ROOTS = ["src/app", "src/components", "src/lib"];

const forbiddenPatterns = [
  {
    pattern: /\bgetCourseSectionContent\b/,
    message:
      "Legacy generated course-section fallback must not be used in rendered code.",
  },
  {
    pattern: /\bCOURSE_CHAPTER_CONTENT_GUIDES\b/,
    message:
      "Legacy generated course content guides must not return to the runtime bundle.",
  },
  {
    pattern: /\bCourseSectionContent\b/,
    message:
      "Legacy scaffold content type must not return to the runtime bundle.",
  },
  {
    pattern:
      /components\/book\/(BookShell|CyberSafetyBookShell|CourseStructureBookShell|BookCanvas|MarginNotes|ChapterNav|SectionNav)/,
    message: "Removed duplicate book-shell components must not be reimported.",
  },
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return walk(fullPath);
    if (!/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) return [];

    return [fullPath];
  });
}

const files = SEARCH_ROOTS.flatMap((root) => walk(path.join(ROOT, root)));
const failures = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const normalized = file.replaceAll(path.sep, "/");

  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(source)) {
      failures.push(`${normalized}: ${message}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Scaffold fallback guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Scaffold fallback guard passed.");
