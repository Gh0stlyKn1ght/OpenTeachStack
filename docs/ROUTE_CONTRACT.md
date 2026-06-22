# Teaching Teachers Route Contract

Date: 2026-06-22

Status: active contract

This file is the route and slug source of truth for course-book work. Do not add new course authoring, search records, sitemap behavior, or compatibility redirects without checking this contract.

## Canonical Course Book Routes

| Course | Owner | Canonical route | Notes |
| --- | --- | --- | --- |
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
npm run check:routes
npm run check:content-layout
```

The check fails if canonical course ownership drifts, if reserved dedicated slugs are added to the generic registry, or if stale TT-prefixed guidance returns.
