# Course Lock System

OpenTeachStack course content is authored source, not disposable build output.

The lock system protects a course after it has passed human review. It does not decide that a course is good. It only records the decision and prevents later agents, scaffolds, remediation scripts, or bulk cleanup passes from rewriting approved work by accident.

## Lifecycle

Use this path for course content:

```txt
draft -> review -> promoted -> locked -> maintenance
```

- `draft`: work can change freely, preferably in `.generated/drafts/<course-id>` or a clearly scoped branch.
- `review`: humans check voice, usefulness, safety, sources, accessibility, route behavior, and repeated-language risk.
- `promoted`: the approved files live in `content/courses/<course-id>`.
- `locked`: `npm run lock:course -- --course <course-id> --reason "<review note>"` writes hashes and updates `content/course-locks.yml`.
- `maintenance`: a locked course is explicitly unlocked for a small change, then reviewed and locked again.

Do not lock a course because files exist. A route, folder, scaffold, Teachable package, or passing build does not prove the lessons are useful to a real teacher.

## Files

- `content/course-locks.yml`: central registry of locked, unlocked, or maintenance-state courses.
- `content/courses/<course-id>/.course-lock.json`: generated manifest with SHA-256 hashes for protected files.
- `scripts/lib/course-locks.mjs`: shared lock helper used by curriculum scripts.
- `scripts/curriculum/lock-course.mjs`: creates or refreshes a lock manifest.
- `scripts/curriculum/unlock-course.mjs`: records a maintenance unlock with a required reason.
- `scripts/curriculum/verify-locks.mjs`: verifies locked-course hashes.
- `scripts/curriculum/check-locked-write.mjs`: checks whether one write target is allowed.

## Lock A Course

Only lock after review.

```bash
npm run lock:course -- --course ots-101 --reason "Passed voice, safety, source, accessibility, route, and build review."
```

The command:

- computes SHA-256 hashes for protected source files under `content/courses/<course-id>`, except `.course-lock.json`,
- writes `content/courses/<course-id>/.course-lock.json`,
- updates `content/course-locks.yml`,
- records `lockedAt`, `lockedBy`, `reason`, `protectedPaths`, allowed change categories, and unlock-required categories.

For packetized courses, protected files come from `course.packet.json`:

- compatibility metadata: `README.md`, `course.json`, `status.json`, and `course.packet.json`
- authored content roots listed in `contentRoots`

PacketLock does not hash `draftRoot`, `reportsRoot`, `generatedRoot`, or `exportsRoot`. Drafts, health reports, generated files, and export packages are review/work areas, not approved source.

Use `--force` only when intentionally refreshing a lock after a reviewed maintenance change.

## Verify Locks

```bash
npm run verify:locks
```

Verification fails when:

- a locked course manifest is missing,
- a protected file changed after lock,
- a protected file was deleted,
- a new lesson or lab file appears inside a locked course after lock.

If there are no locked courses yet, verification passes and says so. That is the honest starting state.

## Unlock For Maintenance

Unlocks require a reason.

```bash
npm run unlock:course -- --course ots-101 --reason "Fix two broken links found during review."
```

By default, unlock moves the registry entry to `maintenance` and preserves the old `.course-lock.json` for audit history.

After the maintenance change:

```bash
npm run verify:locks
npm run lock:course -- --course ots-101 --reason "Broken-link fix reviewed and accepted." --force
```

For a typo fix, do the same thing. Small edits are still edits to approved content. The point is not bureaucracy; the point is to keep later scripts from silently rewriting lessons that already passed review.

## Script Behavior

Write-capable curriculum scripts now call `assertCourseWriteAllowed(...)` before writing into `content/courses`.

Guarded scripts include:

- `scripts/scaffold-course-content.mjs`
- `scripts/remediate-educator-learner-audit.mjs`
- `scripts/complete-course-lessons.mjs`
- `scripts/rewrite-remaining-course-lessons.mjs`
- `scripts/rewrite-ots201-real-lessons.mjs`
- `scripts/author-ots*-course-lessons.mjs`

If a course is locked, those scripts fail with a `BLOCKED WRITE` report that names the course, file, reason, and next action.

## Generated Drafts

Generated drafts belong under:

```txt
.generated/drafts/<course-id>/
```

Production course folders are not scratch space. A generator can create drafts, reports, backups, or proposed changes under `.generated`, but promotion into `content/courses/<course-id>` must be explicit and reviewable.

## Build Tooling Rule

Build tooling may read `content/courses`. It must not rewrite it.

Derived files, caches, route maps, reports, previews, and exports should be written outside authored course source unless a command is explicitly a reviewed promotion or lock/unlock operation. This keeps a good Markdown lesson from being overwritten by a route repair, schema normalizer, or bulk remediation pass.

## GitHub Protection

`.github/CODEOWNERS` marks the lock registry, course folders, lock manifests, and curriculum writer scripts for owner review.

GitHub still needs branch protection or rulesets configured in the repository settings for CODEOWNERS to enforce reviews before merge.
