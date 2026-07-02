# OTS-101 AI Course Content Foundations for Teachers

Status: Draft active rebuild.

Canonical route: `/book/ots-101`

Reader source: `src/lib/book.ts`

This folder is the course-owned content package for OTS-101. It contains learner-facing lesson source, course artifacts, review notes, and release materials for the book route.

OTS-101 is active as the foundations course after OTS-000. The job is to help teachers use AI to build a small student-facing course content packet that is teachable, verified, safe, accessible, and reusable.

## Course boundary

OTS-101 owns:

- curriculum vs course content distinctions
- learning targets and lesson sequence planning
- reusable AI prompts for course-content drafting
- AI draft verification before students see the work
- student-facing lesson, assignment, lab, rubric, and feedback artifacts
- platform publishing decisions at a non-technical level
- Mini Course Content Packet capstone

OTS-101 may reference basic tool vocabulary when it supports a course-content artifact, but it should not become a tool-orientation course. Deeper GitHub, course-site publishing, automation, and coding-agent workflows belong in later pathway courses.

## Review Before Release

Before marking OTS-101 public-facing or release-ready, confirm:

- every lesson solves a real teacher problem
- every build step produces inspectable course-content evidence
- every AI draft is checked before students see it
- safety, accessibility, copyright, source quality, and revision triggers are visible
- later-course topics stay out of OTS-101 unless they directly support the Mini Course Content Packet

## Folders

- `lessons/` - chapter and section lesson source files
- `labs/` - hands-on labs, workshops, simulators, or build activities
- `assets/` - course-owned images, diagrams, downloads, and media
- `docs/` - planning, outlines, source queues, reviews, and release notes
- `templates/` - course-specific artifact templates
- `references/` - source queues, citation notes, and platform documentation notes

## Maintenance Rule

Keep the book route, search metadata, source notes, build checks, and representative probes aligned whenever lesson content changes.

Before marking OTS-101 public-facing or release-ready, review it against the active OTS-000-to-OTS-101 sequence so it stays focused on course content foundations instead of re-teaching the tool stack.

## Reader Map

For quick review, this README should answer three questions:

- What is OTS-101 responsible for?
- What is intentionally outside this course?
- What evidence shows the course is ready for teachers?
