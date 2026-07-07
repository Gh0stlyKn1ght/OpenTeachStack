# OpenTeachStack Handoff

Date: 2026-07-07

Status: CourseOS boilerplate/control-plane and shared reader-template tranche is functionally built and locally verified. Content remediation should still pause until a real reviewed OTS-101 draft exists.

## What Changed

- Published the author blog post: `content/blog/posts/what-my-platform-taught-me-about-course-architecture.md`.
- Added the CourseOS implementation plan: `docs/architecture/COURSEOS_IMPLEMENTATION_PLAN_2026-07-06.md`.
- Added the read-only architecture audit: `docs/architecture/OPENTEACHSTACK_ARCHITECTURE_AUDIT.md`.
- Added Phase 1 CourseOS docs:
  - `docs/architecture/COURSEOS.md`
  - `docs/architecture/COURSE_PACKET_CONTRACT.md`
  - `docs/architecture/PACKETLOCK.md`
  - `docs/architecture/DRAFT_PROMOTION_WORKFLOW.md`
- Added packet manifests for the first two migrated courses:
  - `content/courses/ots-000/course.packet.json`
  - `content/courses/ots-101/course.packet.json`
- Added read-only Course Control Plane utilities under `src/lib/course-control/`.
- Added script-side registry support at `scripts/lib/course-registry.mjs`.
- Added `npm run check:course-packet`.
- Added `npm run report:course-health`.
- Generated OTS-101 health evidence at `content/courses/ots-101/reports/health.json`.
- Wired `check:course-packet` into both `npm test` and `npm run verify:release`.
- Generated the all-course health summary at `content/course-health.json` plus per-course `reports/health.json` files.
- Added the draft manifest contract at `docs/architecture/DRAFT_MANIFEST_SCHEMA.md`.
- Added the OTS-101 draft workbench at `content/courses/ots-101/drafts/2026-07-07-ots101-review-workbench/`.
- Added the reader-unification migration note at `docs/architecture/COURSE_READER_UNIFICATION_MIGRATION.md`.
- Added the first course-level runtime boundary for OTS-101:
  - `src/components/course-packet/CoursePacketBoundary.tsx`
  - `src/components/course-packet/CourseUnavailableNotice.tsx`
  - `src/app/book/ots-101/error.tsx`
- Added draft promotion with dry-run reports and guarded apply mode:
  - `scripts/curriculum/promote-course-draft.mjs`
  - `npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench`
  - `npm.cmd run promote:course-draft -- --course ots-101 --draft <reviewed-draft-id> --apply --approved-by <reviewer-name> --write-report`
- Wrote the OTS-101 workbench dry-run report:
  - `content/courses/ots-101/drafts/2026-07-07-ots101-review-workbench/promotion-dry-run-report.json`
- Added promotion failure fixtures:
  - `content/courses/ots-101/drafts/fixture-outside-packet-target`
  - `content/courses/ots-101/drafts/fixture-missing-draft-file`
- Added the automated promotion fixture check:
  - `scripts/check-course-draft-promotion.mjs`
  - `npm.cmd run check:course-draft-promotion`
- Aligned PacketLock helper behavior with packet roots:
  - protected source files come from packet content roots and compatibility metadata
  - `draftRoot`, `reportsRoot`, `generatedRoot`, and `exportsRoot` are not hashed as approved source
- Added affected-course detection:
  - `scripts/affected-courses.mjs`
  - `npm.cmd run affected:courses`
- Replaced hardcoded course truth across the core boilerplate checks:
  - `scripts/verify-release.mjs` now gets course-book smoke routes from `scripts/lib/course-registry.mjs`
  - `scripts/check-course-source-truth.mjs` reads course directories and normalized records from the registry, while still failing unreadable course folders
  - `scripts/check-course-content-layout.mjs` reads course directories and normalized records from the registry, while still failing unreadable course folders
  - `scripts/check-route-contract.mjs` derives expected course slugs and dedicated/generic ownership from course records
  - `scripts/check-root-doc-truth.mjs` reads course codes/status through the registry
  - `scripts/check-prompt-library.mjs` validates related course codes against the registry
  - `scripts/check-course-packet.mjs` centralizes expected packetized courses through the script-side registry
- Added the shared CourseOS learning-template reader surface:
  - `src/components/course-packet/CoursePacketLearningShell.tsx`
  - `src/components/course-packet/CoursePacketSidebar.tsx`
  - `src/components/course-packet/CoursePacketOverviewTemplate.tsx`
  - `src/components/course-packet/CoursePacketChapterTemplate.tsx`
  - `src/components/course-packet/CoursePacketLessonTemplate.tsx`
  - `src/components/course-packet/CoursePacketUnavailableTemplate.tsx`
  - `src/components/course-packet/mdxComponents.ts`
  - `src/lib/course-packet-adapters.ts`
- Wired OTS-101, OTS-280, and generic `/book/[course]` routes through that shared CourseOS packet template instead of each route hand-building the old field-guide UI.
- Added PageOS route-template enforcement:
  - `docs/architecture/PAGEOS_TEMPLATE_REGISTRY.md`
  - `docs/architecture/page-template-registry.json`
  - `scripts/check-page-template-registry.mjs`
  - `npm.cmd run check:page-templates`
- Wired `check:page-templates` into both `npm test` and `npm run verify:release` so every `src/app/**/page.tsx` must declare and use an approved template family.

## Current Course Status

OTS-000 and OTS-101 have authored draft lesson passes and packet manifests.

They are not live courses.

OTS-101 health currently reports:

- `status: draft`
- `humanReviewed: false`
- `lessonCountExpected: 60`
- `lessonCountActual: 60`
- `releaseReady: false`
- release blockers: `status is draft`, `humanReviewed is not true`

That is correct. Do not mark either course live until human review is complete and `status.json` is intentionally updated.

## Verification

Last verified locally on 2026-07-07:

```bash
npm.cmd run check:course-packet
npm.cmd run check:page-templates
npm.cmd run report:course-health -- --course ots-101
npm.cmd run check:script-workflow
npm.cmd test
npm.cmd run build
npm.cmd run verify:release
```

Result: passing.

PageOS verification now also requires every page route to be registered as one of the approved template families: CourseOS packet, field guide, learning resource, template detail, video library, redirect, re-export, or home.

Latest full gate results:

```bash
npm.cmd test
npm.cmd run verify:release
```

Result: passing. `verify:release` passed all checks plus production route smoke for `/`, `/pathway`, `/book`, `/book/ots-000`, `/book/ots-101`, every pathway course route through `/book/ots-399`, `/courses/ots-280`, `/prompts`, `/evidence`, `/robots.txt`, and `/sitemap.xml`.

Browser verification after the reader-template migration:

- `/book/ots-101` returned `200`, rendered `.course-packet-page`, and did not render `.field-guide-page`.
- `/book/ots-101/01-curriculum-vs-course-content/01-0` returned `200`, rendered `.course-packet-page`, and did not render `.field-guide-page`.
- `/book/ots-201` returned `200`, rendered `.course-packet-page`, and did not render `.field-guide-page`.
- `/book/ots-280` returned `200`, rendered `.course-packet-page`, and did not render `.field-guide-page`.
- `/book/ots-280/01-teacher-threat-model/01-0` returned `200`, rendered `.course-packet-page`, and did not render `.field-guide-page`.

Additional focused checks passed:

```bash
npm.cmd run check:course-packet -- --course ots-101
npm.cmd run report:course-health -- --course ots-101 --report-only
npm.cmd run check:ots101-reader
npm.cmd run check:ots101-book-titles
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench --write-report
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench --apply --approved-by codex
npm.cmd run promote:course-draft -- --course ots-101 --draft fixture-outside-packet-target --apply --approved-by fixture
npm.cmd run promote:course-draft -- --course ots-101 --draft fixture-missing-draft-file --apply --approved-by fixture
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench --apply --approved-by fixture --simulate-locked
npm.cmd run check:course-draft-promotion
npm.cmd run affected:courses -- --file content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-0.mdx
npm.cmd run affected:courses
```

The `--apply` checks above are expected to fail safely with `copiedFiles: 0`; the locked-course path uses `--simulate-locked` so the check does not temporarily lock OTS-101.

Current release verification includes `npm run check:course-draft-promotion` and passed on 2026-07-07.

Local server verification:

- Started `npm.cmd run start` on `http://localhost:4000`.
- `GET /book/ots-101` returned `200` and included the OTS-101 title plus chapter table of contents.
- `GET /book/ots-101/01-curriculum-vs-course-content/01-0` returned `200` and included OTS-101/course-owned lesson markers.
- `agent-browser` was not available on PATH, so verification used HTTP route checks instead of visual browser automation.

No current lint warnings are expected after the CourseOS reader migration cleanup and `VideoCard.tsx` image fix.

## Next Safe Tranche

Do this before broad content work resumes:

1. Build the first real reviewed OTS-101 draft only after a human review names specific target files.
2. Promote only through `npm.cmd run promote:course-draft -- --course ots-101 --draft <reviewed-draft-id> --apply --approved-by <reviewer-name> --write-report`.
3. Keep packet manifests limited to OTS-000 and OTS-101 until the model proves stable.

## Do Not Do Yet

- Do not mass-packetize all courses.
- Do not rewrite lesson bodies as part of architecture work.
- Do not mark OTS-000 or OTS-101 live.
- Do not lock courses before human review.
- Do not remove existing reader routes.
- Do not treat Teachable exports as source.

## Restart Command Set

Use this when resuming:

```bash
git status --short
npm.cmd run check:course-packet
npm.cmd run check:page-templates
npm.cmd run report:course-health -- --course ots-101 --report-only
npm.cmd run check:ots101-reader
npm.cmd run promote:course-draft -- --course ots-101 --draft 2026-07-07-ots101-review-workbench
npm.cmd run check:course-draft-promotion
npm.cmd run affected:courses -- --file content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-0.mdx
npm.cmd test
```

If those are green, continue with the reviewed copy phase for draft promotion. Do not rewrite production lessons from the draft folder until promotion has explicit approval flags, target-path validation, lock checks, diff reporting, copying, and post-copy validation.
