import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadLockRegistry } from "../lib/course-locks.mjs";
import {
  displayPath,
  listCourseRecords,
  readCourseRecord,
  walkFiles,
} from "../lib/course-registry.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const reportOnly = args.includes("--report-only");
const courseArg = valueAfter("--course");
const generatedLessonStatuses = new Set(["generated", "scaffolded"]);

function valueAfter(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

const records = courseArg
  ? [readCourseRecord(courseArg, root)].filter(Boolean)
  : listCourseRecords(root);

if (courseArg && records.length === 0) {
  console.error(`Unknown course: ${courseArg}`);
  process.exit(1);
}

const lockRegistry = loadLockRegistry(root);
const reports = records.map((record) => buildHealthReport(record));
const summary = {
  generatedAt: new Date().toISOString(),
  courseCount: reports.length,
  courses: reports.map((report) => ({
    code: report.code,
    slug: report.slug,
    title: report.title,
    status: report.status,
    releaseChannel: report.releaseChannel,
    humanReviewed: report.humanReviewed,
    packetized: report.packetized,
    lessonCountActual: report.lessonCountActual,
    lessonCountExpected: report.lessonCountExpected,
    releaseReady: report.releaseReady,
    lockStatus: report.lockStatus,
  })),
};

if (reportOnly) {
  console.log(JSON.stringify({ summary, reports }, null, 2));
} else {
  for (const report of reports) {
    const reportsRoot = join(root, "content", "courses", report.slug, "reports");
    mkdirSync(reportsRoot, { recursive: true });
    writeFileSync(join(reportsRoot, "health.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }

  if (!courseArg) {
    writeFileSync(join(root, "content", "course-health.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  }

  console.log(`Course health report written for ${reports.length} course(s).`);
}

function buildHealthReport(record) {
  const courseRoot = join(root, "content", "courses", record.slug);
  const lessonRoot = join(courseRoot, "lessons");
  const lessonFiles = walkFiles(lessonRoot, (file) => file.endsWith(".mdx"));
  const lessonCountExpected = (record.course.chapters ?? []).reduce(
    (total, chapter) => total + Number(chapter.lessonCount ?? 0),
    0,
  );
  const missingLessonFiles = expectedLessonPaths(record)
    .filter((relativePath) => !existsSync(join(root, relativePath)));
  const generatedLessonFiles = lessonFiles.filter((filePath) => {
    const frontmatter = readFrontmatter(filePath);
    return generatedLessonStatuses.has(frontmatter.migrationStatus);
  });
  const lock = lockRegistry.courses[record.slug];
  const releaseBlockers = releaseBlockersFor(record);

  return {
    generatedAt: new Date().toISOString(),
    code: record.code,
    slug: record.slug,
    title: record.title,
    status: record.status.status,
    releaseChannel: record.status.releaseChannel ?? record.status.status,
    humanReviewed: record.status.humanReviewed === true,
    reviewedBy: record.status.reviewedBy ?? "",
    reviewedAt: record.status.reviewedAt ?? "",
    packetized: record.packetized,
    sourceRoot: record.sourceRoot,
    canonicalRoute: record.canonicalRoute,
    lessonCountExpected,
    lessonCountActual: lessonFiles.length,
    missingLessonFiles,
    generatedOrScaffoldedLessonFiles: generatedLessonFiles.map((filePath) => displayPath(filePath, root)),
    authoredOrReviewedLessonCount: Math.max(0, lessonFiles.length - generatedLessonFiles.length),
    templatesPresent: existsSync(join(courseRoot, "templates")),
    samplePacketPresent: record.status.hasSamplePacket === true,
    exportTargets: record.status.exportTargets ?? [],
    exportTargetsPresent: (record.status.exportTargets ?? []).filter((target) =>
      target === "teachable"
        ? existsSync(join(root, "teachable", record.slug)) || existsSync(join(courseRoot, "exports"))
        : existsSync(join(courseRoot, "exports", target)),
    ),
    lockStatus: lock?.status ?? "not-locked",
    routeAvailable: record.canonicalRoute.startsWith(`/book/${record.slug}`),
    sourceTruthValid: record.status.sourceOfTruth === `content/courses/${record.slug}`,
    contentLayoutValid: existsSync(join(courseRoot, "course.json")) && existsSync(join(courseRoot, "status.json")),
    releaseReady: releaseBlockers.length === 0,
    releaseBlockers,
    releaseReadiness: record.status.releaseReadiness ?? "",
    notes: record.status.notes ?? "",
  };
}

function expectedLessonPaths(record) {
  const paths = [];

  for (const chapter of record.course.chapters ?? []) {
    const count = Number(chapter.lessonCount ?? 0);
    for (let index = 0; index < count; index += 1) {
      paths.push(`content/courses/${record.slug}/lessons/${chapter.slug}/${chapter.number}-${index}.mdx`);
    }
  }

  return paths;
}

function readFrontmatter(filePath) {
  const source = readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n(?<body>[\s\S]*?)\r?\n---/);
  if (!match?.groups?.body) return {};

  const data = {};
  for (const line of match.groups.body.split(/\r?\n/)) {
    const field = line.match(/^(?<key>[A-Za-z][A-Za-z0-9_-]*):\s*(?<value>.*)$/);
    if (!field?.groups) continue;
    data[field.groups.key] = field.groups.value.replace(/^"|"$/g, "");
  }
  return data;
}

function releaseBlockersFor(record) {
  const blockers = [];
  const policy = record.packet?.releasePolicy;

  if (record.status.status !== "live") blockers.push(`status is ${record.status.status}`);
  if (policy?.requiresHumanReview && record.status.humanReviewed !== true) {
    blockers.push("humanReviewed is not true");
  }
  if (policy?.requiresRealLessons && record.status.hasRealLessons !== true) {
    blockers.push("hasRealLessons is not true");
  }
  if (policy?.requiresTemplates && record.status.hasTemplates !== true) {
    blockers.push("hasTemplates is not true");
  }
  if (policy?.requiresSamplePacket && record.status.hasSamplePacket !== true) {
    blockers.push("hasSamplePacket is not true");
  }

  return blockers;
}
