# CourseOS Implementation Plan

Date: 2026-07-06

Status: active implementation plan. First tranche completed on 2026-07-06; next work should continue with the remaining unchecked phases before resuming broad content remediation.

This plan turns the OpenTeachStack architecture note into a scoped implementation path.

The goal is not to rebuild the site from scratch. The goal is to formalize the system OpenTeachStack is already trying to become:

```txt
OpenTeachStack = CourseOS
Course = isolated packet
Drafts = safe workspace
Status = release truth
Locks = source protection
Reader = reusable runtime
Health = control panel
```

## Boundaries

- No Aura mode.
- No Glyph mode.
- No accessibility content variants.
- No bulk lesson regeneration.
- No direct edits to locked course source.
- No fake completion for courses outside the active rebuild.
- No treating Teachable or other exports as source truth.
- No marking any course live because a route, file, or package exists.

The active course rebuild remains OTS-101: AI Course Content Foundations for Teachers.

All other courses stay honest in their current status until OTS-101 is reviewed strongly enough to guide the rest of the pathway.

## Current Truth

OpenTeachStack already has several correct instincts:

- `content/courses/{course}` is the source of truth.
- `status.json` carries release honesty.
- Teachable and other outputs are export support, not course source.
- The lock system exists and intentionally starts empty until human review.
- The repo already refuses fake bulk authoring commands.
- Blog and build-note publishing have a draft/review/publish boundary.
- OTS-101 has real draft lesson work, but is not release-ready because human review is still false.

The weak point is that architecture truth is still spread across too many places:

- root docs
- course metadata
- route checks
- content layout checks
- course reader code
- source truth checks
- lock scripts
- release readiness scripts

That makes drift too easy. A route can be green while the course truth is scattered.

## Architecture Principle

OpenTeachStack needs one course control plane that every runtime view, check, report, and future promotion workflow can read.

The control plane should not replace course authoring. It should protect it.

## Phase 0 - Read-Only Architecture Audit

Status: done.

- [x] Create:

```txt
docs/architecture/OPENTEACHSTACK_ARCHITECTURE_AUDIT.md
```

Audit these surfaces without changing course content:

- `content/courses/*/course.json`
- `content/courses/*/status.json`
- `content/course-locks.yml`
- `src/lib/book.ts`
- `src/lib/courseStructures.ts`
- `src/lib/metadata.ts`
- route files under `src/app`
- route and content checks under `scripts/`
- existing lock scripts
- blog/build-note docs for publication truth

The audit should answer:

- Which files currently define course identity?
- Which files currently define course readiness?
- Which checks hardcode course lists?
- Which route surfaces have dedicated reader logic?
- Which surfaces still risk treating exports as source?
- Which reports already exist and should be preserved?

Exit criteria:

- [x] A short evidence-backed audit exists.
- [x] No production course files changed.
- [x] The audit names the first two migration targets: OTS-000 and OTS-101.

## Phase 1 - CourseOS Docs

Status: done.

- [x] Create the core architecture docs:

```txt
docs/architecture/COURSEOS.md
docs/architecture/COURSE_PACKET_CONTRACT.md
docs/architecture/PACKETLOCK.md
docs/architecture/DRAFT_PROMOTION_WORKFLOW.md
```

These docs should define:

- course packet purpose
- source vs export boundary
- draft vs source boundary
- lock lifecycle
- release channel meanings
- health report expectations
- promotion safety rules
- why route existence is not course readiness

Exit criteria:

- [x] A new contributor can read the docs and understand where real course source lives.
- [x] The docs point back to existing systems instead of pretending nothing exists yet.

## Phase 2 - Course Control Plane Types And Registry

Status: first read-only pass done; keep route behavior unchanged.

- [x] Add:

```txt
src/lib/course-control/types.ts
src/lib/course-control/registry.ts
src/lib/course-control/status.ts
src/lib/course-control/packetResolver.ts
src/lib/course-control/health.ts
src/lib/course-control/release.ts
```

Start read-only.

The registry should normalize course records from:

- `content/courses/{course}/course.packet.json`, when present
- `content/courses/{course}/course.json`
- `content/courses/{course}/status.json`

Do not change route behavior in this phase.

Exit criteria:

- [x] The registry can list known courses.
- [x] It can identify course code, slug, title, status, source path, route, release channel, and review state.
- [x] Existing checks still run from their current sources.

## Phase 3 - Packet Manifests For OTS-000 And OTS-101

Status: done for OTS-000 and OTS-101 only.

- [x] Add:

```txt
content/courses/ots-000/course.packet.json
content/courses/ots-101/course.packet.json
```

Keep existing `course.json` files for compatibility.

The packet manifest should define:

- schema version
- course code
- slug
- title
- source root
- canonical route
- reader type
- content roots
- draft root
- export root
- report root
- generated root
- required checks
- release policy

Exit criteria:

- [x] OTS-000 and OTS-101 have packet manifests.
- [x] The manifests agree with current source folders and status files.
- [x] No other courses are mass-migrated yet.

## Phase 4 - Course Health Report

Status: first scoped report command done for OTS-101; all-course summary remains next.

- [x] Add:

```txt
scripts/reports/report-course-health.mjs
```

Package script:

```json
"report:course-health": "node scripts/reports/report-course-health.mjs"
```

Commands:

```bash
npm run report:course-health
npm run report:course-health -- --course ots-101
```

Write:

```txt
content/courses/{course}/reports/health.json
content/course-health.json
```

The report should include:

- course code
- slug
- title
- status
- release channel
- humanReviewed
- expected lesson count
- actual lesson count
- missing lesson files
- likely scaffold/generated lesson count
- authored/reviewed lesson count where detectable
- template presence
- sample packet presence
- export target presence
- lock status
- route availability
- source truth validity
- content layout validity
- release readiness
- last validation date

Exit criteria:

- [x] `npm run report:course-health -- --course ots-101` writes a readable health report.
- [x] Reports do not mark a course live automatically.
- [ ] Generate and review a root `content/course-health.json` all-course summary intentionally.

## Phase 5 - Course Packet Validation

Status: done for the first contract gate; now wired into `npm test` and `npm run verify:release`.

- [x] Add:

```txt
scripts/check-course-packet.mjs
```

Package script:

```json
"check:course-packet": "node scripts/check-course-packet.mjs"
```

Commands:

```bash
npm run check:course-packet
npm run check:course-packet -- --course ots-101
```

Validate:

- `course.packet.json` exists for migrated courses
- `course.json` still exists
- `status.json` exists
- `sourceOfTruth` matches `content/courses/{course}`
- canonical route matches the expected book route
- export folders are not treated as source
- missing lessons are only acceptable for non-live states
- live courses require real lesson bodies
- lock status agrees with `content/course-locks.yml`
- status and release readiness do not overclaim

Exit criteria:

- [x] OTS-000 and OTS-101 pass packet validation.
- [x] Non-migrated courses are reported as not yet packetized, not silently failed as broken.
- [x] `check:course-packet` is part of `npm test` and release verification.

## Phase 6 - Course-Level Runtime Boundary

Status: not started.

Add:

```txt
src/components/course-packet/CoursePacketBoundary.tsx
src/components/course-packet/CourseUnavailableNotice.tsx
```

The boundary should contain failures inside the course surface.

If one course cannot load, the user should see a course-level unavailable notice instead of a full site crash.

The notice should include:

- course slug
- failure category
- suggested local command
- link back to `/book`

Exit criteria:

- A broken draft course can fail without taking down the whole pathway.
- OTS-101 route behavior remains unchanged except for safer failure handling.

## Phase 7 - Reader Unification Plan

Status: not started.

Do not force reader unification immediately.

Create a migration note that maps the current reader surfaces into:

```txt
CoursePacketReader
CoursePacketSidebar
CoursePacketRouteResolver
CoursePacketHealthGate
```

Exit criteria:

- Dedicated reader behavior is documented.
- Generic reader behavior is documented.
- The convergence path is clear before code is moved.

## Phase 8 - Draft Workbench

Status: not started.

Add course-local draft support:

```txt
content/courses/{course}/drafts/
```

Draft folder example:

```txt
content/courses/ots-101/drafts/2026-07-06-content-fix/
  draft.manifest.json
  lessons/
  labs/
  templates/
  notes.md
  validation-report.json
```

Drafts are not source. They are proposed work.

Exit criteria:

- Draft manifest schema exists.
- Docs explain that AI and scripts write drafts by default.
- Source files are not rewritten by draft creation.

## Phase 9 - Promotion Pipeline

Status: not started.

Add:

```txt
scripts/curriculum/promote-course-draft.mjs
```

Package script:

```json
"promote:course-draft": "node scripts/curriculum/promote-course-draft.mjs"
```

Command:

```bash
npm run promote:course-draft -- --course ots-101 --draft 2026-07-06-content-fix
```

Promotion must:

1. Locate the draft manifest.
2. Validate target paths.
3. Reject writes outside the course packet.
4. Reject locked source writes unless the course is in maintenance unlock.
5. Compare draft files against source.
6. Generate a diff report.
7. Run packet validation.
8. Copy approved files only after validation passes.
9. Write a promotion report.
10. Never mark a course live automatically.

Exit criteria:

- Promotion is explicit.
- Promotion is reviewable.
- Promotion writes reports.
- Promotion respects locks.

## Phase 10 - PacketLock Hardening

Status: not started.

Keep:

```txt
scripts/curriculum/lock-course.mjs
scripts/curriculum/unlock-course.mjs
scripts/curriculum/verify-locks.mjs
scripts/lib/course-locks.mjs
content/course-locks.yml
```

Align the lock system with course packets.

Lock source files only after human review.

Do not lock:

- drafts
- generated route maps
- health reports
- validation reports
- local workbench output

Exit criteria:

- Lock readiness appears in course health reports.
- Lock scripts understand packet roots.
- Empty lock registry remains valid and honest until review is complete.

## Phase 11 - Affected Course Detection

Status: not started.

Add:

```txt
scripts/affected-courses.mjs
```

Package script:

```json
"affected:courses": "node scripts/affected-courses.mjs"
```

The command should map changed files to course packets and list required checks.

Example output:

```json
{
  "changedFiles": [
    "content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-1.mdx"
  ],
  "affectedCourses": ["ots-101"],
  "requiredChecks": [
    "npm run check:course-packet -- --course ots-101",
    "npm run report:course-health -- --course ots-101",
    "npm run verify:locks"
  ]
}
```

Exit criteria:

- A single course edit no longer creates full-pathway confusion.
- Required checks are course-scoped when safe.

## Phase 12 - Replace Hardcoded Course Truth Gradually

Status: not started.

Refactor checks one at a time to read from the control plane or packet manifests.

Likely candidates:

- route contract checks
- content layout checks
- source truth checks
- reader migration checks
- release readiness checks

Exit criteria:

- No large-bang rewrite.
- Each refactor preserves the existing check intent.
- Course truth lives in packets and normalized registry records, not scattered arrays.

## First Execution Tranche

Do this first:

1. [x] Write `OPENTEACHSTACK_ARCHITECTURE_AUDIT.md`.
2. [x] Write `COURSEOS.md`.
3. [x] Write `COURSE_PACKET_CONTRACT.md`.
4. [x] Add read-only course-control types and registry utilities.
5. [x] Add `course.packet.json` for OTS-000 and OTS-101.
6. [x] Add `check:course-packet` for those two migrated courses.
7. [x] Add `report:course-health -- --course ots-101`.
8. [x] Publish the CourseOS field-note blog post.
9. [x] Run `npm test` with the new packet gate included.

Stop there and review.

That tranche gives OpenTeachStack a control plane without touching lesson bodies or pretending every course is ready.

## Success Standard

This work is successful when:

- course truth is easier to find
- draft work cannot be confused with approved source
- exports cannot masquerade as courses
- OTS-101 stays the active rebuild
- non-active courses remain honestly labeled
- health reports expose readiness without inflating it
- a broken course can fail locally without breaking the whole platform
- future agents have fewer places to invent truth

The platform should become harder to lie to.

That is the point.

## Current Handoff

See `docs/architecture/HANDOFF.md` for the latest restart point, verification status, and next safe tranche.
