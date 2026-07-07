# OpenTeachStack Handoff

Date: 2026-07-06

Status: CourseOS architecture upgrades started. Content remediation should pause until the next architecture tranche is complete.

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

Last verified locally on 2026-07-06:

```bash
npm.cmd run check:course-packet
npm.cmd run report:course-health -- --course ots-101
npm.cmd run check:script-workflow
npm.cmd test
```

Result: passing.

Known non-blocking lint warnings remain in existing route/MDX component imports and `VideoCard.tsx`. They do not fail `npm test`.

## Next Safe Tranche

Do this before broad content work resumes:

1. Generate and review the all-course root health summary with `npm run report:course-health`.
2. Add a draft manifest schema and a safe OTS-101 draft workbench folder.
3. Write the reader-unification migration note for dedicated and generic book readers.
4. Add the first course-level runtime boundary only after the migration note is clear.
5. Keep packet manifests limited to OTS-000 and OTS-101 until the model proves stable.

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
npm.cmd run report:course-health -- --course ots-101 --report-only
npm.cmd test
```

If those are green, continue with the next safe CourseOS tranche above.
