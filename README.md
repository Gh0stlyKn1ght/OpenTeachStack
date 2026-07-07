# OpenTeachStack

[![CI Build Status](https://github.com/Gh0stlyKn1ght/OpenTeachStack/actions/workflows/ci.yml/badge.svg)](https://github.com/Gh0stlyKn1ght/OpenTeachStack/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Pathway: 10/10 Enriched](https://img.shields.io/badge/Pathway-10%2F10%20Enriched-green?style=flat-square)](#course-path-model)
[![Code: MIT](https://img.shields.io/badge/Code-MIT-blue?style=flat-square)](LICENSE)
[![Content: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)](CONTENT_LICENSE.md)
[![Built with Next.js 16](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript 5.x](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Content: MDX](https://img.shields.io/badge/Content-MDX-FCB32C?style=flat-square&logo=mdx&logoColor=black)](https://mdxjs.com)
[![GitHub repository](https://img.shields.io/badge/GitHub-OpenTeachStack-181717?style=flat-square&logo=github)](https://github.com/Gh0stlyKn1ght/OpenTeachStack)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=github)](https://github.com/Gh0stlyKn1ght/OpenTeachStack/pulls)

**A field guide for educators entering the tech world.**

OpenTeachStack is an open-source pathway for educators building curriculum
systems with AI, open resources, Google Workspace, and practical classroom
workflows.

OpenTeachStack is not one giant course. It is a course path. The full pathway is
currently open as an active draft preview so the courses can be reviewed in one
pass. The first two authored draft courses are:

1. **OTS-000 — Teacher Tech Stack Orientation**
2. **OTS-101 — AI Course Content Foundations for Teachers**

`OTS` stands for **Open Teacher Stack**. Keep course codes in the `OTS-###`
format across the project.

The signature workflow is:

**Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve**

Start with the learning need. Gather trusted sources. Let AI help draft or
structure the work. Verify it before students see it. Teach it, save it, and
improve it after class.

## Current Architecture Status

CourseOS architecture work is now active before the next broad content pass.

Current completed tranche:

- CourseOS plan and architecture audit are in `docs/architecture/`
- OTS-000 and OTS-101 have `course.packet.json`
- `npm run check:course-packet` validates the packet contract
- `npm run report:course-health -- --course ots-101` generates OTS-101 health evidence
- `check:course-packet` is part of `npm test` and `npm run verify:release`

Current handoff:

- [CourseOS handoff](docs/architecture/HANDOFF.md)
- [CourseOS implementation plan](docs/architecture/COURSEOS_IMPLEMENTATION_PLAN_2026-07-06.md)
- [CourseOS overview](docs/architecture/COURSEOS.md)

Do not resume broad course-content remediation until the next CourseOS tranche is complete. The next safe architecture work is the all-course health summary, draft workbench schema, and reader-unification migration note.

## OTS-000 — Teacher Tech Stack Orientation

**Build the plain-language tool and safety vocabulary teachers need before deeper course-content work.**

OTS-000 is a 14-chapter draft on-ramp for teachers who need practical grounding
in files, folders, IDEs, terminals, GitHub, documentation, AI assistants,
project stacks, backups, secrets, permissions, and safe builder habits.

Current OTS-000 source-of-truth status:

- Source of truth: `content/courses/ots-000`
- Registry and reader metadata: `src/lib/courseStructures.ts`
- Status: draft active on-ramp
- Lesson bodies: 84 real teacher-facing lesson sections across chapters 00-13
- Human classroom review: not complete
- Release rule: not live until `content/courses/ots-000/status.json` says `humanReviewed: true`

## OTS-101 — AI Course Content Foundations for Teachers

**Use AI to build student-facing course content teachers can verify, revise, and reuse.**

OTS-101 is a 10-chapter draft foundations course for teachers who want practical
control over AI-assisted course content without pretending a platform export,
outline, or generated file is the course.

Current OTS-101 source-of-truth status:

- Source of truth: `content/courses/ots-101`
- Registry and reader metadata: `src/lib/book.ts`
- Status: draft active rebuild
- Lesson bodies: 60 real teacher-facing lesson sections across chapters 01-10
- Human classroom review: not complete
- Release rule: not live until `content/courses/ots-101/status.json` says `humanReviewed: true`

## OTS-101 Scope

| # | Chapter |
|---|--------|
| 01 | Curriculum vs Course Content |
| 02 | From Standards or Goals to Lessons |
| 03 | Prompting AI Without Generic Garbage |
| 04 | Verifying AI Before Students See It |
| 05 | Building Real Student-Facing Lessons |
| 06 | Assignments, Labs, Rubrics, and Feedback |
| 07 | Organizing the Course Content System |
| 08 | Safety, Accessibility, Copyright, and Source Quality |
| 09 | Publishing to a Platform |
| 10 | Capstone: Build a Mini Course Content Packet |

The OTS-101 capstone is a **mini course content packet**, not a full published
course site.

## Intentionally Out of Scope for OTS-101

These topics belong in later course path courses:

- Apps Script implementation
- GitHub workflows
- Codex, Claude Code, and AI coding agents
- Next.js and Docusaurus
- DNS, domains, hosting, and live course-site publishing
- AI image generation deep dives
- OBS and full video production
- full automation capstone

## Course Path Model

| Code | Course | Level | Status |
|---|---|---:|---|
| OTS-000 | Teacher Tech Stack Orientation | Beginner | Draft active on-ramp |
| OTS-101 | AI Course Content Foundations for Teachers | Beginner | Draft active rebuild |
| OTS-201 | Google Workspace Systems for Teachers | Beginner/Intermediate | Draft active preview |
| OTS-220 | Apps Script for Teacher Automation | Intermediate | Draft active preview |
| OTS-240 | Open Resources & GitHub for Educators | Intermediate | Draft active preview |
| OTS-260 | AI Media & Lesson Delivery | Intermediate | Draft active preview |
| OTS-280 | Cyber Safety for Educators | Intermediate | Draft active preview |
| OTS-301 | Teacher Course Sites | Advanced | Draft active preview |
| OTS-320 | AI Coding Agents for Educators | Advanced | Draft active preview |
| OTS-399 | Capstone Studio | Advanced | Draft active preview |

No course should be treated as release-ready until its
`content/courses/{course}/status.json` record says `humanReviewed: true` and the locks are verified.
Currently, OTS-201 through OTS-399 are open in `Draft active preview` status, meaning they are ready for manual review and validation of their generated lesson structures, Mermaid flowcharts, Comparison/Workflow/Checklist blocks, and GSAP/Anime.js page animations.

## Content Safety Rules

- Do not overwrite authored lesson bodies with templates.
- Do not regenerate lessons just to make them look uniform.
- Do not delete advanced content; mark it future, draft, optional, or move it into the right pathway category.
- Keep OTS-101 beginner-friendly and shippable.
- Add safety checks to major artifacts: privacy, copyright/licensing, AI verification, standards alignment, accessibility, and revision logs.
- Do not add fake resource citations or broken download links.
- Keep the voice practical, human, teacher-to-teacher, and built from classroom pressure. See [VOICEPRINT.md](VOICEPRINT.md).

## Start Here

Teachers do not need GitHub, Next.js, DNS, or automation on day one.

Start with the site's **Start Here If You Are Not Technical** page, then move into OTS-000 Orientation and OTS-101 Foundations.

Useful course entry points:

- `/start` — non-technical starting path
- `/book/ots-000` — OTS-000 orientation course book
- `/book/ots-101` — OTS-101 course book
- `/course` — compatibility redirect to the OTS-101 course book
- `/kb/source-bank` — verified links and official resources
- `/templates` — OTS-101 artifact templates
- `/course/audit` — mini-unit self-audit
- `/course/release` — release packet and final checks

Reviewer and maintenance docs:

- [CourseOS Handoff](docs/architecture/HANDOFF.md)
- [CourseOS Implementation Plan](docs/architecture/COURSEOS_IMPLEMENTATION_PLAN_2026-07-06.md)
- [OTS-101 Curriculum Manager Audit](docs/OTS_101_CURRICULUM_MANAGER_AUDIT.md)
- [OTS-101 Accessibility Release Check](docs/OTS_101_ACCESSIBILITY_RELEASE_CHECK.md)
- [OTS-101 Release Announcement](docs/RELEASE_ANNOUNCEMENT_OTS_101.md)
- [Source Bank Maintenance Workflow](docs/SOURCE_BANK_MAINTENANCE.md)
- [Lesson Quality Rubric](docs/LESSON_QUALITY_RUBRIC.md)
- [Content Depth Remediation Report](docs/CONTENT_DEPTH_REMEDIATION_REPORT.md)

## Quick Start

```bash
git clone https://github.com/Gh0stlyKn1ght/OpenTeachStack.git
cd OpenTeachStack
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) to view the site.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX with next-mdx-remote
- **Diagrams:** Mermaid
- **Fonts:** IBM Plex Sans, Source Sans 3, IBM Plex Mono

## Roadmap

Current priority: review the full active draft pathway without confusing draft
visibility for release readiness. The old v2.0 full-pathway checklist is
historical only and must not be used to claim current course readiness.

- Use `npm run verify:release` for a non-mutating release gate; use `npm run verify:release:write` only when intentionally refreshing `docs/BUILD_VERIFICATION.md`
- Use `npm run check:course-packet` after packet, status, route, or course-control changes
- Use `npm run report:course-health -- --course ots-101` after OTS-101 packet/status changes
- Preserve the canonical `/book/{course}` route contract
- Keep README, roadmap, course metadata, and live navigation in sync
- Keep `npm run typecheck` and `npm run test` passing before release; the test gate covers script-workflow safety, route contracts, content layout, course packet validation, source-bank links, scaffold-fallback protection, content-authoring overwrite protection, learner-facing content checks, uniqueness checks, instructional-depth checks, format/readability checks, release-readiness checks, prompt-library checks, OTS-101 title sync, and course-reader migration checks.
- Add future improvements only when the real artifact or workflow exists

See [ROADMAP.md](ROADMAP.md) for the current OTS-101 priority and historical
planning notes.

## License

- **Code:** [MIT License](LICENSE)
- **Content:** [CC BY-NC-SA 4.0](CONTENT_LICENSE.md)

## Author

**JC Nevarez** — [LinkedIn](https://www.linkedin.com/in/gh0stly/)

Related projects:

- [robotnix.dev](https://robotnix.dev)
- [team2180.dev](https://team2180.dev)

Video walkthroughs and additional companion content are coming soon.
