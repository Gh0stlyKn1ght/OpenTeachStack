# OTS-101 AI Course Content Foundations for Teachers

Status: Draft - needs sequence alignment after OTS-000.

Canonical route: `/book/ots-101`

Reader source: `src/lib/book.ts`

This folder is the course-owned content package for OTS-101. It contains learner-facing lesson source, course artifacts, review notes, and release materials for the book route.

OTS-101 now follows OTS-000. It should assume teachers have already built basic vocabulary around files, folders, VS Code, GitHub, Markdown, hosting, documentation, AI assistants, coding agents, MCP, backups, secrets, and safe project habits.

The job of OTS-101 is not to reteach the tool stack. The job is to help teachers use AI to build a small student-facing course content packet that is teachable, verified, safe, accessible, and reusable.

## Course boundary

OTS-101 owns:

- curriculum vs course content distinctions
- learning targets and lesson sequence planning
- reusable AI prompts for course-content drafting
- AI draft verification before students see the work
- student-facing lesson, assignment, lab, rubric, and feedback artifacts
- platform publishing decisions at a non-technical level
- Mini Course Content Packet capstone

OTS-101 should only reference OTS-000 tool vocabulary when it supports the course-content artifact. Deeper GitHub, course-site publishing, automation, and coding-agent workflows belong in later pathway courses.

See `docs/OTS_000_TO_OTS_101_ALIGNMENT.md` before revising OTS-101 lessons.

## Folders

- `lessons/` - chapter and section lesson source files
- `labs/` - hands-on labs, workshops, simulators, or build activities
- `assets/` - course-owned images, diagrams, downloads, and media
- `docs/` - planning, outlines, source queues, reviews, and release notes
- `templates/` - course-specific artifact templates
- `references/` - source queues, citation notes, and platform documentation notes

## Maintenance Rule

Keep the book route, search metadata, source notes, build checks, and representative probes aligned whenever lesson content changes.

Before marking OTS-101 public-facing or release-ready, review it against the OTS-000 sequence boundary so it reads like the next course after orientation, not a duplicate first course.

## Reader Map

For quick review, this README should answer three questions:

- What is OTS-101 responsible for?
- What is intentionally outside this course?
- What evidence shows the course is ready for teachers?
