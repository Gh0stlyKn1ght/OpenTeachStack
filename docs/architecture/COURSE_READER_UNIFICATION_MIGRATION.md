# Course Reader Unification Migration

Date: 2026-07-07

Status: planning note. Do not move reader code yet.

OpenTeachStack currently has three course-reader shapes:

- OTS-101 dedicated reader routes.
- OTS-280 dedicated reader routes.
- Generic pathway reader routes for the remaining course structures.

That split is workable during migration, but it should not become permanent architecture truth. CourseOS should eventually let packetized courses use one reader contract without flattening OTS-101's reviewed content model.

## Current Reader Surfaces

| Surface | Route family | Data source | Components | Notes |
| --- | --- | --- | --- | --- |
| OTS-101 dedicated book | `/book/ots-101`, `/book/ots-101/[chapter]`, `/book/ots-101/[chapter]/[section]` | `src/lib/book.ts` plus MDX from `content/courses/ots-101/lessons` | `BookSidebar`, `CourseTOC`, section page components | This is the active rebuild surface. Preserve behavior first. |
| Generic pathway book | `/book/[course]`, `/book/[course]/[chapter]`, `/book/[course]/[chapter]/[section]` | `src/lib/courseStructures.ts` plus MDX from `content/courses/{course}/lessons` | `CourseStructureSidebar`, `CourseStructureTOC`, generic route components | Useful model for packet-driven routing, but not enough release truth by itself. |
| OTS-280 dedicated book | `/book/ots-280`, `/book/ots-280/[chapter]`, `/book/ots-280/[chapter]/[section]` | `src/lib/cyberSafety.ts` | `CyberSafetySidebar`, `CyberSafetyTOC`, dedicated route components | Keep as a dedicated draft course until the packet model proves itself. |
| Legacy OTS-101 redirects | `/course`, `/course/[module]` | redirect-only | route files under `src/app/course` | Compatibility surface. Do not treat as source. |

## Target Shape

The eventual CourseOS reader should be composed from four parts:

```txt
CoursePacketReader
CoursePacketSidebar
CoursePacketRouteResolver
CoursePacketHealthGate
```

### CoursePacketRouteResolver

Reads a normalized course record from the Course Control Plane.

Responsibilities:

- resolve `course`, `chapter`, and `section` route params
- read the packet manifest when present
- reject routes that point outside the course packet
- preserve `notFound()` behavior for missing course/chapter/section records
- keep legacy redirects outside the packet reader

### CoursePacketHealthGate

Checks course availability before rendering the reader.

Responsibilities:

- distinguish missing course, missing packet, missing content, and draft/unreviewed states
- allow draft courses to render when intentionally exposed as draft previews
- avoid marking draft courses as live
- provide failure information to the future course-level runtime boundary

### CoursePacketSidebar

Replaces the duplicated sidebar shapes once data is normalized.

Responsibilities:

- render chapter and section navigation from a course packet record
- keep search records scoped to the current course
- preserve active chapter and active section styling
- keep mobile course-index behavior

### CoursePacketReader

Owns the shared shell for the course page, chapter page, and section page.

Responsibilities:

- render course title, route facts, thesis/problem text, and artifact metadata
- load MDX lesson bodies only from the course source root
- render empty or unavailable states without crashing the whole pathway
- keep OTS-101's teacher-facing lesson quality visible instead of reducing the route to headings

## Migration Order

1. Add a course-level runtime boundary before moving reader code.
2. Wrap OTS-101 with the boundary without changing its route output.
3. Add resolver helpers that can read OTS-101 from `src/lib/book.ts` and generic courses from `src/lib/courseStructures.ts`.
4. Extract shared sidebar rendering only after the resolver can produce one normalized chapter/section shape.
5. Move generic `/book/[course]` routes to the packet reader first.
6. Move OTS-101 only after screenshots or rendered checks prove the dedicated surface did not lose content, navigation, metadata, or search behavior.
7. Leave OTS-280 dedicated until it has a packet manifest and a course-status review path.

## Do Not Move Yet

- Do not delete `/book/ots-101` dedicated routes.
- Do not delete `/book/[course]` generic routes.
- Do not packetize every course just to make the reader abstraction look complete.
- Do not use route availability as release readiness.
- Do not let the future reader load from `teachable/` or another export folder.

## Verification For Future Code Work

After each reader move, run:

```bash
npm.cmd run check:routes
npm.cmd run check:course-packet -- --course ots-101
npm.cmd run report:course-health -- --course ots-101 --report-only
npm.cmd run check:ots101-reader
npm.cmd run check:ots101-book-titles
npm.cmd test
```

For any runtime component changes, inspect `/book/ots-101`, one chapter route, and one section route in the browser before calling the tranche done.

## Success Standard

Reader unification succeeds only if it makes course truth easier to inspect without weakening the teacher-facing course.

The OTS-101 reader must still help a teacher understand the problem, build the artifact, verify the work, and keep the Mini Course Content Packet connected. A generic route that merely renders headings is a regression, even if every test passes.
