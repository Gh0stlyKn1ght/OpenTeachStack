export const GENERIC_AUTHORING_FRAGMENTS = [
  "turns this architecture focus into one practical teacher move",
  "Identify the concrete teacher problem connected to",
  "Use this section to apply the chapter logic",
  "Attach a short source note and route decision",
  "Record what a colleague could inspect next",
  "How does this section support a cleaner",
  "turns that larger chapter focus into one concrete teacher move",
  "Name the immediate teacher problem connected to",
  "Record the decision you made about",
  "Any AI-assisted language has been reviewed, revised, or rejected by the teacher.",
  "Keep the artifact small enough that another teacher could review it without hidden context.",
  "turns that chapter focus into one practical safety habit",
  "Name the specific safety problem connected to",
  "Use this section to apply the safety habit to one real account, device, profile, site, repo, message, or workflow.",
  "The goal is not to make teachers paranoid or technical for its own sake.",
  "applies that intent to one concrete teacher-owned action with visibility for peers and future maintenance",
  "Use this section to apply one concrete task that improves reviewability and student-facing usability.",
  "Collect one reusable review note that another teacher could check without external explanation.",
  "Evidence connects this section to the chapter artifact and pathway context.",
];

export const GENERATED_STATUSES = new Set(["generated", "scaffolded"]);

// Authoring stages for lesson-level and course-level `migrationStatus`.
// - scaffolded: route/file placeholder only.
// - generated: raw generated content.
// - remediated: generated content cleaned for learner-facing use.
// - draft: human-started but incomplete.
// - authored: human-authored and structurally complete.
// - reviewed: authored content checked against a rubric.
// - teachable-ready: reviewed content with exportability and artifact support.
export const KNOWN_CONTENT_STATUSES = new Set([
  ...GENERATED_STATUSES,
  "remediated",
  "draft",
  "authored",
  "reviewed",
  "teachable-ready",
]);

// Release behavior: authored content can be shown internally but only reviewed or better
// should be treated as publicly releasable for learner surfaces.
export const RELEASE_CONTENT_STATUSES = new Set(["authored", "reviewed", "teachable-ready"]);
export const PUBLIC_RELEASE_STATUSES = new Set(["reviewed", "teachable-ready"]);

// Course-level release targeting statuses used by route/readiness checks.
export const RELEASE_COURSE_STATUSES = new Set([
  "release",
  "public-beta",
  "teachable-ready",
]);

export function findGenericAuthoringFragments(content) {
  return GENERIC_AUTHORING_FRAGMENTS.filter((fragment) =>
    content.includes(fragment),
  );
}

export function hasGenericAuthoringFragments(content) {
  return findGenericAuthoringFragments(content).length > 0;
}

export function normalizeLessonBody(content) {
  return content
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/\bOTS-\d{3}\b/g, "COURSE_CODE")
    .replace(/\b\d{2}\.\d+\b/g, "SECTION_NUMBER")
    .replace(/\b\d{2}-[a-z0-9-]+\b/g, "CHAPTER_SLUG")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "LINK")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\b[A-Z][A-Za-z0-9'/-]+(?:\s+[A-Z][A-Za-z0-9'/-]+){1,8}\b/g, "TITLE")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function shingleSet(text, size = 8) {
  const words = text.split(/\s+/).filter(Boolean);
  const shingles = new Set();
  if (words.length < size) {
    if (words.length > 0) shingles.add(words.join(" "));
    return shingles;
  }

  for (let index = 0; index <= words.length - size; index += 1) {
    shingles.add(words.slice(index, index + size).join(" "));
  }

  return shingles;
}

export function jaccardSimilarity(left, right) {
  if (left.size === 0 && right.size === 0) return 1;

  let intersection = 0;
  for (const item of left) {
    if (right.has(item)) intersection += 1;
  }

  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
