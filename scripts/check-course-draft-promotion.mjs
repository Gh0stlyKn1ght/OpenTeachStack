import { execFileSync } from "node:child_process";

const root = process.cwd();
const failures = [];

const checks = [
  {
    name: "active workbench dry run passes",
    args: [
      "scripts/curriculum/promote-course-draft.mjs",
      "--course",
      "ots-101",
      "--draft",
      "2026-07-07-ots101-review-workbench",
      "--simulate-unlocked",
    ],
    expectFailure: false,
    expectedText: "Draft manifest has no targetPaths",
  },
  {
    name: "apply refuses unreviewed active workbench",
    args: [
      "scripts/curriculum/promote-course-draft.mjs",
      "--course",
      "ots-101",
      "--draft",
      "2026-07-07-ots101-review-workbench",
      "--apply",
      "--approved-by",
      "fixture",
      "--simulate-unlocked",
    ],
    expectFailure: true,
    expectedText: "promotion.allowed must be true",
  },
  {
    name: "apply refuses outside-packet target",
    args: [
      "scripts/curriculum/promote-course-draft.mjs",
      "--course",
      "ots-101",
      "--draft",
      "fixture-outside-packet-target",
      "--apply",
      "--approved-by",
      "fixture",
      "--simulate-unlocked",
    ],
    expectFailure: true,
    expectedText: "points outside content/courses/ots-101",
  },
  {
    name: "apply refuses missing draft file",
    args: [
      "scripts/curriculum/promote-course-draft.mjs",
      "--course",
      "ots-101",
      "--draft",
      "fixture-missing-draft-file",
      "--apply",
      "--approved-by",
      "fixture",
      "--simulate-unlocked",
    ],
    expectFailure: true,
    expectedText: "has no matching draft file",
  },
  {
    name: "apply refuses locked course",
    args: [
      "scripts/curriculum/promote-course-draft.mjs",
      "--course",
      "ots-101",
      "--draft",
      "2026-07-07-ots101-review-workbench",
      "--apply",
      "--approved-by",
      "fixture",
      "--simulate-locked",
    ],
    expectFailure: true,
    expectedText: "ots-101 is locked",
  },
];

for (const check of checks) {
  const result = runNode(check.args);
  const failed = result.status !== 0;
  const output = `${result.stdout}\n${result.stderr}`;

  if (failed !== check.expectFailure) {
    failures.push(`${check.name}: expected ${check.expectFailure ? "failure" : "success"}, got ${failed ? "failure" : "success"}.`);
    continue;
  }

  if (!output.includes(check.expectedText)) {
    failures.push(`${check.name}: output did not include expected text: ${check.expectedText}`);
  }
}

if (failures.length > 0) {
  console.error("Course draft promotion check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Course draft promotion check passed for ${checks.length} command paths.`);

function runNode(args) {
  try {
    const stdout = execFileSync(process.execPath, args, {
      cwd: root,
      encoding: "utf8",
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: 0, stdout, stderr: "" };
  } catch (error) {
    return {
      status: error.status ?? 1,
      stdout: String(error.stdout ?? ""),
      stderr: String(error.stderr ?? ""),
    };
  }
}
