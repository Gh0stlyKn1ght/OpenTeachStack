# OpenTeachStack

## North Star

OpenTeachStack teaches teachers how to use AI to build course content systems:
student-facing lessons, assignments, rubrics, verification routines, publishing
checks, and reusable course packets.

This repo is not a scaffold generator. A route is not a lesson. A generated MDX
file is not proof that the course teaches.

## Current Course Boundary

- The full pathway is visible as an active draft preview.
- OTS-000 and OTS-101 have authored lesson-body passes.
- Later pathway courses may be open for review before they have real lesson-body passes.
- Course source of truth: `content/courses/{course}`.
- Course release status comes from `content/courses/{course}/status.json`.
- No course is live until its status file says `humanReviewed: true`.

Do not mark courses live, reviewed, or release-ready just because their routes are visible.

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
- `node scripts/curriculum/archive-chats.mjs` — Archive chat logs and write handoff notes

## Activation Rules
- Immediately execute `node scripts/curriculum/archive-chats.mjs` on session activation to dump local transcripts and generate `docs/chat-archives/handoff-notes.md`.

## License
- Code: MIT
- Content: CC BY-NC-SA 4.0

@AGENTS.md
