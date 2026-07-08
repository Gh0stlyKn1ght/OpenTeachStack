import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { isCourseLocked, posixPath } from "../lib/course-locks.mjs";
import { readCourseRecord, walkFiles } from "../lib/course-registry.mjs";

const args = process.argv.slice(2);
const shouldWriteReport = process.argv.includes("--write-report");
const shouldApply = process.argv.includes("--apply");
const simulateLocked = process.argv.includes("--simulate-locked");
const simulateUnlocked = process.argv.includes("--simulate-unlocked");
const root = process.cwd();
const courseSlug = valueFor("--course");
const draftId = valueFor("--draft");
const approvedBy = valueFor("--approved-by");
const failures = [];
const warnings = [];
const copiedTargets = [];
let postCopyValidation = [];

if (!courseSlug || !draftId) {
  fail("Usage: npm run promote:course-draft -- --course <course> --draft <draft-id> [--write-report] [--apply --approved-by <name>]");
}

const record = readCourseRecord(courseSlug, root);
if (!record) fail(`Unknown course: ${courseSlug}`);
if (!record.packet) fail(`${courseSlug} is not packetized. Draft promotion is only enabled for packetized courses.`);

const sourceRoot = normalizeRelative(record.packet.sourceRoot);
const draftRoot = normalizeRelative(record.packet.draftRoot);
const draftDir = join(root, draftRoot, draftId);
const manifestPath = join(draftDir, "draft.manifest.json");
const reportPath = join(draftDir, shouldApply ? "promotion-apply-report.json" : "promotion-dry-run-report.json");

if (!isInside(join(root, draftRoot), draftDir)) {
  fail(`Draft directory must stay inside ${draftRoot}.`);
}

if (!existsSync(draftDir)) fail(`Draft not found: ${display(draftDir)}`);
if (!existsSync(manifestPath)) fail(`Missing draft manifest: ${display(manifestPath)}`);
if ((simulateLocked || isCourseLocked(courseSlug, root)) && !simulateUnlocked) {
  fail(`${courseSlug} is locked. Draft promotion requires an explicit unlock workflow first.`);
}

const manifest = readJson(manifestPath);
validateManifest(manifest);

const targetPaths = Array.isArray(manifest.targetPaths) ? manifest.targetPaths : [];
const targets = targetPaths.map((targetPath) => inspectTarget(targetPath));
const draftFiles = walkFiles(draftDir, (filePath) => {
  const name = basename(filePath);
  return ![
    "draft.manifest.json",
    "notes.md",
    "README.md",
    "validation-report.json",
    "promotion-dry-run-report.json",
    "promotion-apply-report.json",
    ".gitkeep",
  ].includes(name);
});

const mappedDraftFiles = new Set(targets.filter((target) => target.draftRelativePath).map((target) => target.draftRelativePath));
const unmappedDraftFiles = draftFiles
  .map((filePath) => normalizeRelative(relative(draftDir, filePath)))
  .filter((filePath) => !mappedDraftFiles.has(filePath))
  .sort((a, b) => a.localeCompare(b));

if (manifest.promotion?.allowed === true) {
  warnings.push("Manifest promotion.allowed is true. This command will still copy files only when --apply and --approved-by are supplied.");
}

if (targetPaths.length === 0) {
  warnings.push("Draft manifest has no targetPaths. Nothing is ready to compare or promote.");
}

if (shouldApply) {
  validateApplyRequest();
}

if (failures.length === 0 && shouldApply) {
  copyApprovedTargets();
  postCopyValidation = runPostCopyValidation();
}

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  mode: shouldApply ? "apply" : "dry-run",
  course: courseSlug,
  courseCode: record.code,
  draftId,
  draftRoot: normalizeRelative(relative(root, draftDir)),
  sourceRoot,
  approvedBy: approvedBy ?? "",
  copiedFiles: copiedTargets.length,
  promotionAllowedByScript: shouldApply && failures.length === 0,
  failures,
  warnings,
  summary: {
    targetCount: targets.length,
    changedTargets: targets.filter((target) => target.changeType === "changed").length,
    unchangedTargets: targets.filter((target) => target.changeType === "unchanged").length,
    newTargets: targets.filter((target) => target.changeType === "new").length,
    missingDraftFiles: targets.filter((target) => target.changeType === "missing-draft").length,
    unmappedDraftFileCount: unmappedDraftFiles.length,
  },
  targets,
  copiedTargets,
  unmappedDraftFiles,
  postCopyValidation,
  requiredChecks: [
    `npm.cmd run check:course-packet -- --course ${courseSlug}`,
    `npm.cmd run report:course-health -- --course ${courseSlug} --report-only`,
    "npm.cmd run verify:locks",
  ],
};

if (shouldWriteReport) {
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(report, null, 2));

if (failures.length > 0) {
  process.exit(1);
}

if (shouldWriteReport) {
  console.error(`${shouldApply ? "Promotion apply" : "Dry-run"} report written: ${display(reportPath)}`);
} else if (shouldApply) {
  console.error("Promotion apply completed. Re-run with --write-report to save promotion-apply-report.json.");
} else {
  console.error("Dry-run only. Re-run with --write-report to save promotion-dry-run-report.json.");
}

function validateApplyRequest() {
  if (!approvedBy) {
    failures.push("--apply requires --approved-by <name>.");
  }

  if (manifest.status !== "review") {
    failures.push("Draft status must be review before --apply can copy files.");
  }

  if (manifest.promotion?.allowed !== true) {
    failures.push("draft.manifest.json promotion.allowed must be true before --apply can copy files.");
  }

  if (targets.length === 0) {
    failures.push("--apply requires at least one targetPath.");
  }

  if (unmappedDraftFiles.length > 0) {
    failures.push("--apply refuses unmapped draft files. Add targetPaths or remove the extra draft files.");
  }

  for (const target of targets) {
    if (!["changed", "new", "unchanged"].includes(target.changeType)) {
      failures.push(`--apply cannot copy target with changeType ${target.changeType}: ${target.targetPath}`);
    }
  }
}

function copyApprovedTargets() {
  for (const target of targets) {
    if (target.changeType === "unchanged") continue;

    const sourcePath = join(draftDir, target.draftRelativePath);
    const destinationPath = join(root, target.targetPath);
    mkdirSync(dirname(destinationPath), { recursive: true });
    copyFileSync(sourcePath, destinationPath);
    copiedTargets.push({
      targetPath: target.targetPath,
      draftRelativePath: target.draftRelativePath,
      changeType: target.changeType,
    });
  }
}

function runPostCopyValidation() {
  const validations = [
    {
      label: `check:course-packet ${courseSlug}`,
      command: [npmCommand(), "run", "check:course-packet", "--", "--course", courseSlug],
    },
    {
      label: `report:course-health ${courseSlug}`,
      command: [npmCommand(), "run", "report:course-health", "--", "--course", courseSlug, "--report-only"],
    },
    {
      label: "verify:locks",
      command: [npmCommand(), "run", "verify:locks"],
    },
  ];

  if (courseSlug === "ots-101") {
    validations.push(
      {
        label: "check:ots101-reader",
        command: [npmCommand(), "run", "check:ots101-reader"],
      },
      {
        label: "check:ots101-book-titles",
        command: [npmCommand(), "run", "check:ots101-book-titles"],
      },
    );
  }

  return validations.map((validation) => {
    const [command, ...commandArgs] = validation.command;
    try {
      const output = execFileSync(command, commandArgs, {
        cwd: root,
        encoding: "utf8",
        windowsHide: true,
        shell: process.platform === "win32",
      });
      return {
        label: validation.label,
        result: "pass",
        output: output.trim().split(/\r?\n/).slice(-4),
      };
    } catch (error) {
      failures.push(`Post-copy validation failed: ${validation.label}.`);
      return {
        label: validation.label,
        result: "fail",
        output: String(error.stdout ?? error.message).trim().split(/\r?\n/).slice(-8),
      };
    }
  });
}

function inspectTarget(targetPath) {
  const targetRelativePath = normalizeRelative(targetPath);

  if (!targetRelativePath.startsWith(`${sourceRoot}/`)) {
    failures.push(`${targetRelativePath} points outside ${sourceRoot}.`);
    return {
      targetPath: targetRelativePath,
      changeType: "invalid-target",
      draftRelativePath: "",
      sourceExists: false,
      draftExists: false,
    };
  }

  if (targetRelativePath.startsWith(`${sourceRoot}/drafts/`)) {
    failures.push(`${targetRelativePath} points at draft space, not production source.`);
  }

  const draftRelativePath = normalizeRelative(relative(sourceRoot, targetRelativePath));
  const sourcePath = join(root, targetRelativePath);
  const draftPath = join(draftDir, draftRelativePath);
  const sourceExists = existsSync(sourcePath);
  const draftExists = existsSync(draftPath);

  if (!isInside(join(root, sourceRoot), sourcePath)) {
    failures.push(`${targetRelativePath} resolved outside the course source root.`);
  }

  if (!isInside(draftDir, draftPath)) {
    failures.push(`${draftRelativePath} resolved outside the draft directory.`);
  }

  if (!draftExists) {
    failures.push(`${targetRelativePath} has no matching draft file at ${display(draftPath)}.`);
    return {
      targetPath: targetRelativePath,
      draftRelativePath,
      sourceExists,
      draftExists,
      changeType: "missing-draft",
    };
  }

  if (!sourceExists) {
    return {
      targetPath: targetRelativePath,
      draftRelativePath,
      sourceExists,
      draftExists,
      changeType: "new",
      draft: fileSummary(draftPath),
    };
  }

  const source = fileSummary(sourcePath);
  const draft = fileSummary(draftPath);

  return {
    targetPath: targetRelativePath,
    draftRelativePath,
    sourceExists,
    draftExists,
    changeType: source.sha256 === draft.sha256 ? "unchanged" : "changed",
    source,
    draft,
  };
}

function validateManifest(manifest) {
  const allowedStatuses = new Set(["open", "review", "promoted", "abandoned"]);

  if (manifest.schemaVersion !== 1) failures.push("draft.manifest.json schemaVersion must be 1.");
  if (manifest.draftId !== draftId) failures.push(`draft.manifest.json draftId must be ${draftId}.`);
  if (manifest.course !== courseSlug) failures.push(`draft.manifest.json course must be ${courseSlug}.`);
  if (manifest.courseCode !== record.code) failures.push(`draft.manifest.json courseCode must be ${record.code}.`);
  if (!allowedStatuses.has(manifest.status)) failures.push(`draft.manifest.json status is unsupported: ${manifest.status}.`);
  if (!String(manifest.sourcePolicy ?? "").toLowerCase().includes("not be treated as source")) {
    failures.push("draft.manifest.json sourcePolicy must state that drafts are not source.");
  }
  if (!Array.isArray(manifest.targetPaths)) failures.push("draft.manifest.json targetPaths must be an array.");
}

function fileSummary(filePath) {
  const buffer = readFileSync(filePath);
  const text = buffer.toString("utf8");
  return {
    bytes: statSync(filePath).size,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    lines: text.length === 0 ? 0 : text.split(/\r?\n/).length,
  };
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function normalizeRelative(value) {
  return posixPath(String(value)).replace(/^\.?\//, "");
}

function isInside(parentPath, childPath) {
  const parent = resolve(parentPath);
  const child = resolve(childPath);
  return child === parent || child.startsWith(`${parent}\\`) || child.startsWith(`${parent}/`);
}

function display(filePath) {
  return normalizeRelative(relative(root, filePath));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
