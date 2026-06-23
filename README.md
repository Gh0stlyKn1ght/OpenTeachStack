# Teaching Teachers

[![Code: MIT](https://img.shields.io/badge/Code-MIT-blue?style=flat-square)](LICENSE)
[![Content: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)](CONTENT_LICENSE.md)
[![Built with Next.js 16](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript 5.x](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Content: MDX](https://img.shields.io/badge/Content-MDX-FCB32C?style=flat-square&logo=mdx&logoColor=black)](https://mdxjs.com)
[![GitHub repository](https://img.shields.io/badge/GitHub-Teaching%20Teachers-181717?style=flat-square&logo=github)](https://github.com/Gh0stlyKn1ght/Teacher-techops)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=github)](https://github.com/Gh0stlyKn1ght/Teacher-techops/pulls)
[![OTS-101: 10 Chapters](https://img.shields.io/badge/OTS--101-10%20Chapters-0969DA?style=flat-square)](#ots-101--teaching-teachers-foundations)

**A field guide for educators entering the tech world.**

Teaching Teachers is an open-source pathway for educators building curriculum
systems with AI, open resources, Google Workspace, and practical classroom
workflows.

Teaching Teachers is not one giant course. It is a course path. The first course is:

**OTS-101 — Teaching Teachers Foundations**

`OTS` stands for **Open Teacher Stack**. Keep course codes in the `OTS-###`
format across the project.

The signature workflow is:

**Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve**

Start with the learning need. Gather trusted sources. Let AI help draft or
structure the work. Verify it before students see it. Teach it, save it, and
improve it after class.

## OTS-101 — Teaching Teachers Foundations

**Prompting, Standards, Resource Literacy, and Curriculum Systems for Educators**

OTS-101 is a 10-chapter foundations course for teachers who want practical control over curriculum design without being forced into code, domains, GitHub, or publishing workflows on day one.

Current OTS-101 release shape:

- 10 foundations chapters
- 89 chapter section pages
- 17 active section/source pages
- 11 foundation artifact templates with Markdown downloads
- 31 verified Source Bank links
- mini-unit capstone, course audit, release packet, and sample robotics mini-unit

## OTS-101 Scope

| # | Chapter |
|---|--------|
| 01 | Teacher Builder Mindset |
| 02 | Prompting for Teachers |
| 03 | AI Literacy and Verification |
| 04 | Standards to Learning Targets |
| 05 | Course and Unit Architecture |
| 06 | Resource Discovery and Open Resources |
| 07 | Google Workspace Planning Systems |
| 08 | Assessment, Rubrics, and Feedback |
| 09 | Delivery Planning |
| 10 | Mini-Unit Capstone |

The OTS-101 capstone is a **mini-unit system**, not a full published course site.

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
| OTS-101 | Teaching Teachers Foundations | Beginner | Released |
| OTS-201 | Google Workspace Systems for Teachers | Beginner/Intermediate | Released |
| OTS-220 | Apps Script for Teacher Automation | Intermediate | Released |
| OTS-240 | Open Resources & GitHub for Educators | Intermediate | Released |
| OTS-260 | AI Media & Lesson Delivery | Intermediate | Released |
| OTS-280 | Cyber Safety for Educators | Intermediate | Released |
| OTS-301 | Teacher Course Sites | Advanced | Released |
| OTS-320 | AI Coding Agents for Educators | Advanced | Released |
| OTS-399 | Capstone Studio | Advanced | Released |

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

Start with the site's **Start Here If You Are Not Technical** page, then move into OTS-101 Foundations.

Useful course entry points:

- `/start` — non-technical starting path
- `/book/ots-101` — OTS-101 course book
- `/course` — compatibility redirect to the OTS-101 course book
- `/library/source-bank` — verified links and official resources
- `/templates` — OTS-101 artifact templates
- `/course/audit` — mini-unit self-audit
- `/course/release` — release packet and final checks

Reviewer and maintenance docs:

- [OTS-101 Curriculum Manager Audit](docs/OTS_101_CURRICULUM_MANAGER_AUDIT.md)
- [OTS-101 Accessibility Release Check](docs/OTS_101_ACCESSIBILITY_RELEASE_CHECK.md)
- [OTS-101 Release Announcement](docs/RELEASE_ANNOUNCEMENT_OTS_101.md)
- [Source Bank Maintenance Workflow](docs/SOURCE_BANK_MAINTENANCE.md)

## Quick Start

```bash
git clone https://github.com/Gh0stlyKn1ght/Teacher-techops.git
cd Teacher-techops
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

v2.0 shipped — OTS-101 through OTS-399 are authored, reader-migrated, and passing
lint/build/route checks. The current maintenance priority is release hygiene:

- Keep `docs/BUILD_VERIFICATION.md` current with `npm run verify:release`
- Preserve the canonical `/book/{course}` route contract
- Keep README, roadmap, course metadata, and live navigation in sync
- Keep `npm run typecheck` and `npm run test` passing before release; the test gate covers route contracts, content layout, source-bank links, scaffold-fallback protection, content-authoring overwrite protection, and course-reader migration checks.
- Add future improvements only when the real artifact or workflow exists

See [ROADMAP.md](ROADMAP.md) for full phases through v2.0.

## License

- **Code:** [MIT License](LICENSE)
- **Content:** [CC BY-NC-SA 4.0](CONTENT_LICENSE.md)

## Author

**JC Nevarez** — [nevarez.dev](https://nevarez.dev) — [jc@nevarez.dev](mailto:jc@nevarez.dev)
