# OpenTeachStack Route Contract

Date: 2026-06-22

Status: active contract

This file is the route and slug source of truth for course-book work. Do not add new course authoring, search records, sitemap behavior, or compatibility redirects without checking this contract.

## Canonical Course Book Routes

| Course | Owner | Canonical route | Notes |
| --- | --- | --- | --- |
| OTS-000 | Generic pathway routes | `/book/ots-000` | Teacher Tech Stack Orientation uses `COURSE_STRUCTURES` and is the on-ramp before OTS-101. |
| OTS-101 | Dedicated book routes | `/book/ots-101` | Foundations has custom data in `src/lib/book.ts` and dedicated routes under `src/app/book/ots-101`. |
| OTS-201 | Generic pathway routes | `/book/ots-201` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-220 | Generic pathway routes | `/book/ots-220` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-240 | Generic pathway routes | `/book/ots-240` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-260 | Generic pathway routes | `/book/ots-260` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-280 | Dedicated book routes | `/book/ots-280` | Cyber Safety has custom data in `src/lib/cyberSafety.ts` and dedicated routes under `src/app/book/ots-280`. |
| OTS-301 | Generic pathway routes | `/book/ots-301` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-320 | Generic pathway routes | `/book/ots-320` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |
| OTS-399 | Generic pathway routes | `/book/ots-399` | Uses `COURSE_STRUCTURES` and `src/app/book/[course]`. |

## Ownership Rules

- `COURSE_STRUCTURES` must not include `ots-101` or `ots-280`; those courses are owned by dedicated route trees.
- Dedicated courses may still appear in pathway metadata and search, but their route generation must come from their dedicated data modules.
- Generic pathway courses must use `/book/{courseSlug}/{chapterSlug}/{sectionSlug}`.
- OTS-101 legacy `/course` and `/course/{moduleSlug}` routes redirect to `/book/ots-101`.
- The book index starts with OTS-000 as the teacher tech-stack orientation, then points to OTS-101 as the authored draft sequel. The rest of the pathway is visible as draft preview content. OTS-280 keeps its dedicated route ownership.
- Do not use TT-prefixed or alternate public course-code slugs.
- Do not add compatibility links that point from a canonical page back to itself.

## Content Ownership

- Every course must have a folder at `content/courses/{courseSlug}`.
- Course-owned folders must include `course.json`, `lessons`, `labs`, `assets`, `docs`, `templates`, and `references`.
- Global `content/lessons` and `content/labs` remain compatibility sources until readers migrate.
- Do not delete global content until the matching course-owned reader, search records, route probes, lint, and build all pass.

## Check Command

Run this after route, search, roadmap, or course registry changes:

```bash
npm run test
npm run verify:release
npm run verify:release:write
```

`npm run test` is the non-mutating local gate: typecheck, lint, script-workflow safety, route contract, content layout, source-truth checks, blog-system checks, scaffold-fallback protection, content-authoring overwrite protection, learner-facing content checks, doc-staleness checks, course learner-sense checks, uniqueness checks, instructional-depth checks, format/readability checks, release-readiness checks, prompt-library checks, source-bank link validation, OTS-101 book-title sync, and the OTS-101 course-reader migration check. `npm run verify:release` adds the production build, rendered lesson checks, and route smoke without modifying tracked files. Use `npm run verify:release:write` only when intentionally refreshing `docs/BUILD_VERIFICATION.md`.

The release verifier runs typecheck, lint, build, script-workflow safety, route-contract checks, content-layout checks, source-truth checks, blog-system checks, scaffold-fallback protection, content-authoring overwrite protection, learner-facing content checks, doc-staleness checks, course learner-sense checks, uniqueness checks, instructional-depth checks, format/readability checks, release-readiness checks, source-bank link validation, prompt-library checks, OTS-101 reader checks, OTS-101 book-title sync checks, rendered lesson checks, and production route smoke. The route-contract check fails if canonical course ownership drifts, if reserved dedicated slugs are added to the generic registry, if stale hard-coded generic course route files return, or if stale TT-prefixed guidance returns. The scaffold-fallback guard fails if removed generated section fallbacks or duplicate book-shell imports return to runtime code. The content-authoring safety guard fails if course authoring scripts lose their `--force` gates or no-overwrite checks for existing authored content. The learner-facing content guard fails if internal authoring-script or route-QA wording appears in visible lesson bodies or book page UI. The script-workflow guard fails if a default check mutates tracked files or if test and release gates drift apart. The production smoke starts the app on a temporary local port, derives course-book routes from `PATHWAY_COURSES`, and probes representative public routes for HTTP 200 responses.
