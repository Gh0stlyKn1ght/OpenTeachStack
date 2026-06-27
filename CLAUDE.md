# OpenTeachStack

## North Star

OpenTeachStack teaches teachers how to use AI to build course content systems:
student-facing lessons, assignments, rubrics, verification routines, publishing
checks, and reusable course packets.

This repo is not a scaffold generator. A route is not a lesson. A generated MDX
file is not proof that the course teaches.

## Current Course Boundary

- Only OTS-101 is the active rebuild.
- OTS-101 title: AI Course Content Foundations for Teachers.
- OTS-101 source of truth: `content/courses/ots-101`.
- OTS-101 registry/header source: `src/lib/book.ts`.
- OTS-101 status: draft until `content/courses/ots-101/status.json` says `humanReviewed: true`.
- OTS-201 through OTS-399 stay Coming Soon until OTS-101 is reviewed and strong enough to guide the rest of the pathway.

Do not refill, mark live, or fake-complete the other pathway courses.

## Project Structure
- `src/app/` — Next.js App Router pages
- `src/components/` — React components
- `src/lib/` — content utilities, metadata constants, registries, and MDX helpers
- `content/courses/{course}` — course-owned source of truth
- `content/courses/ots-101/lessons` — active OTS-101 authored lesson source
- `teachable/` — legacy export support only; never proof that a course is live

## Lesson Writing Boundary

Use `VOICEPRINT.md` for lesson quality and tone.

Every real OTS-101 lesson must include a teacher problem, plain-language
explanation, classroom scenario, weak version, better version, build step,
quality check, safety/accessibility/source note, reflection, and capstone
connection.

If that cannot be written honestly, leave the route unavailable or create an
authoring note. Do not generate filler.

## Commands
- `npm run dev` — Start dev server
- `npm run test` — Non-mutating local quality gate
- `npm run verify:release` — Non-mutating release gate
- `npm run verify:release:write` — Explicitly refresh `docs/BUILD_VERIFICATION.md`

## License
- Code: MIT
- Content: CC BY-NC-SA 4.0

@AGENTS.md
