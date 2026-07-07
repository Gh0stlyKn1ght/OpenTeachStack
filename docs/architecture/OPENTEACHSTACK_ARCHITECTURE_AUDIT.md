# OpenTeachStack Architecture Audit

Date: 2026-07-06

Scope: read-only architecture audit for the first CourseOS implementation tranche.

This audit explains why the first upgrade adds packet manifests, a read-only registry, packet validation, and health reports before more course-content work.

## Summary

OpenTeachStack already has the right course philosophy:

- `content/courses/{course}` is the source of truth.
- `status.json` carries course readiness.
- root-level `teachable/` is export support, not course source.
- OTS-000 and OTS-101 have authored draft passes, but `humanReviewed` remains false.
- no course is currently locked, which is honest because human review is not complete.

The architecture risk is truth drift. Course identity, readiness, routes, reader ownership, checks, and release language are still spread across several files.

CourseOS should centralize that truth without rewriting lessons.

## Current Course Identity Surfaces

Course identity currently appears in:

- `content/courses/{course}/course.json`
- `content/courses/{course}/status.json`
- `src/lib/courseStructures.ts`
- `src/lib/book.ts`
- `src/lib/cyberSafety.ts`
- `src/lib/metadata.ts`
- `docs/ROUTE_CONTRACT.md`
- route-check scripts under `scripts/`

This works, but it lets course truth drift when one surface is updated and another is not.

## Current Readiness Surfaces

Course readiness currently depends on:

- `content/courses/{course}/status.json`
- `course.json` fields like `migrationStatus` and `courseReadiness`
- `docs/COURSE_STATUS.md`
- `README.md`
- `ROADMAP.md`
- `scripts/check-course-source-truth.mjs`
- `scripts/check-release-readiness.mjs`

The strongest rule is already correct:

> A course is not live until its status file says it is live and human-reviewed.

The first CourseOS layer should preserve that rule.

## Current Route And Reader Surfaces

The canonical route family is:

```txt
/book/{course}
/book/{course}/{chapter}
/book/{course}/{chapter}/{section}
```

Current reader ownership:

| Course | Reader owner | Source |
| --- | --- | --- |
| OTS-000 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-101 | Dedicated book reader | `src/lib/book.ts` and `src/app/book/ots-101` |
| OTS-201 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-220 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-240 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-260 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-280 | Dedicated book reader | `src/lib/cyberSafety.ts` and `src/app/book/ots-280` |
| OTS-301 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-320 | Generic book reader | `src/lib/courseStructures.ts` |
| OTS-399 | Generic book reader | `src/lib/courseStructures.ts` |

The first CourseOS upgrade should not force reader unification yet. It should add metadata that makes a later unification safer.

## Current Lock State

The lock registry is:

```txt
content/course-locks.yml
```

Current state:

```txt
courses: {}
```

That is correct for now. The lock system exists, but no course should be locked until human quality review is complete.

## Current Check Surfaces

Important architecture checks include:

- `npm run check:routes`
- `npm run check:content-layout`
- `npm run check:course-source-truth`
- `npm run check:blog-system`
- `npm run check:content-authoring-safety`
- `npm run check:release-readiness`
- `npm run verify:locks`

The new CourseOS checks should start as additive:

- `npm run check:course-packet`
- `npm run report:course-health`

Do not remove existing gates until the new control plane has proven itself.

## Risks Found

| Risk | Why it matters | First fix |
| --- | --- | --- |
| Hardcoded course truth appears in multiple scripts and docs | One update can make another surface stale | Add a read-only registry |
| `course.json` and `status.json` carry related but separate truth | Release state can be implied from the wrong file | Validate packet, course, and status agreement |
| Dedicated and generic readers use different data paths | Reader behavior can drift by course | Record reader ownership in packet manifests |
| Export folders can look like course roots | Agents may polish packaging before source | Keep export roots explicit in packet manifests |
| No health report exists per course packet | Readiness has to be inferred from several checks | Generate `reports/health.json` |
| Lock system is present but not packet-aware yet | Future reviewed source needs tighter protection | Document PacketLock roots and ignored work areas |

## First Upgrade Decision

Start with:

1. CourseOS docs.
2. Packet contract docs.
3. Packet manifests for OTS-000 and OTS-101.
4. Read-only Course Control Plane utilities.
5. `check:course-packet`.
6. `report:course-health`.

This gives the repo a clearer control plane without changing lesson bodies, route behavior, or course release status.

## What Stays Unchanged

- OTS-101 remains draft until human review.
- OTS-000 remains draft until human review.
- Later pathway courses are not mass-packetized yet.
- Existing course readers remain in place.
- Existing route contracts remain active.
- Existing lock scripts remain active.
- Existing release gates remain active.

## Next Safe Tranche

After this first tranche passes targeted checks, the next upgrade should be:

1. Add root all-course health summary generation with review of the generated output.
2. Add draft folder schema for OTS-101.
3. Draft the reader-unification migration note.
4. Only then consider wrapping course readers in a course-level runtime boundary.

Do not resume course-content rewrites until this architecture layer is stable.
