import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const appRoot = join(root, "src", "app");
const registryPath = join(root, "docs", "architecture", "page-template-registry.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const failures = [];

const families = {
  "courseos-packet": {
    markers: [
      /CoursePacketOverviewTemplate/,
      /CoursePacketChapterTemplate/,
      /CoursePacketLessonTemplate/,
      /CoursePacketUnavailableTemplate/,
    ],
  },
  "field-guide": { markers: [/FieldGuidePage/] },
  "learning-resource": {
    markers: [/LessonLayout/, /LabLayout/, /FieldNoteLayout/],
  },
  "template-detail": { markers: [/getFoundationTemplate/] },
  "video-library": { markers: [/VideoLibraryPage/] },
  "redirect": { markers: [/redirect\(/] },
  "re-export": { markers: [/export\s+\{\s*default\s*\}\s+from/] },
  "home": { markers: [/export\s+default\s+function\s+HomePage/] },
};

function toRepoPath(path) {
  return relative(root, path).split(sep).join("/");
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      pages.push(toRepoPath(fullPath));
    }
  }

  return pages.sort((a, b) => a.localeCompare(b));
}

function fail(message) {
  failures.push(message);
}

if (registry.schemaVersion !== 1) {
  fail("page-template-registry.json must use schemaVersion 1.");
}

const actualPages = walk(appRoot);
const registeredPages = Object.keys(registry.routes ?? {}).sort((a, b) => a.localeCompare(b));
const actualSet = new Set(actualPages);
const registeredSet = new Set(registeredPages);

for (const page of actualPages) {
  if (!registeredSet.has(page)) {
    fail(`${page} is missing from docs/architecture/page-template-registry.json.`);
  }
}

for (const page of registeredPages) {
  if (!actualSet.has(page)) {
    fail(`${page} is registered but no page.tsx exists at that path.`);
  }
}

for (const page of actualPages) {
  const entry = registry.routes?.[page];
  if (!entry) continue;

  const family = entry.family;
  const familyRule = families[family];
  if (!familyRule) {
    fail(`${page} declares unknown template family "${family}".`);
    continue;
  }

  const source = readFileSync(join(root, page), "utf8");
  const hasMarker = familyRule.markers.some((marker) => marker.test(source));
  if (!hasMarker) {
    fail(`${page} declares family "${family}" but does not use its required template marker.`);
  }

  if (page.startsWith("src/app/book/") && page !== "src/app/book/page.tsx" && family !== "courseos-packet") {
    fail(`${page} is a course reader route and must use the courseos-packet family.`);
  }

  if (family === "courseos-packet" && !page.startsWith("src/app/book/")) {
    fail(`${page} uses courseos-packet outside src/app/book/.`);
  }
}

if (failures.length > 0) {
  console.error("Page template registry check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Page template registry check passed: ${actualPages.length} page routes are registered and template-backed.`);
