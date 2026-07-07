---
title: "What My Platform Taught Me About Course Architecture"
slug: "what-my-platform-taught-me-about-course-architecture"
date: "2026-07-06"
status: published
author: JC
category: Field Note
section: author-blog
tags:
  - openteachstack
  - course-architecture
  - courseos
  - source-of-truth
summary: "A field note on realizing OpenTeachStack needs a CourseOS layer, not just more course folders."
sourceSession: "2026-07-06 CourseOS architecture planning from OpenTeachStack platform review"
humanReviewed: true
published: true
---

## What happened

I looked at OpenTeachStack and realized the platform was telling me something I needed to hear.

It was not asking for:

- more pages
- another export folder
- a prettier pathway map

It was asking for a course operating system.

That sounds bigger than it is. I do not mean some dramatic rebuild where everything gets thrown away and renamed. I mean the boring, necessary architecture that keeps a course platform from lying to itself.

OpenTeachStack already had the right instincts:

- course source belongs in `content/courses/{course}`
- Teachable is an export target, not the course
- a route is not a lesson
- a generated MDX file is not automatically course content
- OTS-101 is the active rebuild
- other courses should stay honest until they are real
- locks should protect reviewed course source, not bless unfinished work

That is good.

But good instincts are not the same thing as a system.

## Why it bothered me

The part that bothered me was how easy it still was for truth to drift.

Course truth was spread across docs, route checks, metadata files, reader code, status files, package scripts, lock scripts, and old export assumptions.

That is how a platform starts doing the same thing I tell teachers to avoid:

- It starts confusing a container with a course.
- It starts treating structure as readiness.
- It starts letting green checks stand in for teaching quality.

I do not need OpenTeachStack to look complete. I need it to stay honest when the work is messy.

## What was really going on

The platform had a source-of-truth problem hiding inside an architecture problem.

Not because everything was broken.

Because too many pieces were allowed to know partial truth.

| What looked true | What could still be wrong | Why it matters |
| --- | --- | --- |
| The route loads | The lesson may not teach | A page render is not instructional evidence |
| The file exists | The body may be scaffold text | A lesson-shaped file can still be fake-complete |
| The course has exports | The source may not be reviewed | Packaging is not curriculum |
| The status file says draft | Other surfaces may imply ready | Mixed signals break trust |
| The lock system exists | No course may be locked yet | Protection only matters after review |
| The checks pass | The platform may still have scattered truth | CI can validate structure and miss the real course promise |

That is the thing I learned.

The folder structure was basically a prompt.

If the repo gives an agent five places that look like authority, the agent will eventually believe the wrong one.

## The lesson

OpenTeachStack needs a CourseOS layer.

Not as branding.

Not as polish.

As a safety system.

> A course platform needs one place where course identity, status, source, route, review state, exports, locks, and health agree.

That is the control plane.

Once that exists, the rest of the work gets less slippery.

The question changes from:

> Did we make enough files?

to:

> What does the course packet say is true, and what evidence backs it up?

That is a much better question.

## The fix

The fix is not to mass-migrate every course.

That would be the exact fake-a** completeness trap again.

The fix is to add the architecture in small, reviewable layers.

1. Write a read-only architecture audit.
2. Define the CourseOS docs.
3. Add a course packet contract.
4. Add a read-only course registry.
5. Packetize OTS-000 and OTS-101 first.
6. Add course health reports.
7. Add packet validation.
8. Add course-level failure boundaries.
9. Add draft workbench folders.
10. Add explicit draft promotion.
11. Harden locks around reviewed source.
12. Gradually remove hardcoded course truth from scattered scripts.

That is the sequence.

Not everything at once. No course-content rewrite just to make the architecture feel done.

## What teachers can use

This is not only a repo lesson. This is a teacher workflow lesson.

If you are building course materials with AI, you need the same boundaries.

Use this quick check:

- Where is the real course source?
- Where do drafts go?
- Where do exports go?
- What tells you whether the course is ready?
- Who reviewed it?
- What evidence proves the lesson teaches?
- What should happen when a draft is wrong?
- What should never be overwritten automatically?

If those answers are scattered, the system is going to drift.

A simple course packet model helps:

```txt
my-course/
  source/
    lessons/
    assignments/
    rubrics/
    examples/
    references/
  drafts/
  exports/
    canvas/
    google-classroom/
    teachable/
    pdf/
  reports/
    health.json
    validation.json
    release.json
```

The names can change.

The boundary should not.

## The rule I am keeping

One real course beats nine fake ones. That rule still holds.

For OpenTeachStack, that means OTS-101 is the active rebuild. The other courses can stay visible as the future pathway, but they do not get to pretend they are ready just because the platform can route to them.

That means:

- draft courses stay draft
- export folders stay downstream
- health reports say what is missing
- promotion is explicit
- locks wait for human review
- route success does not equal course success
- the platform fails locally instead of globally when one course breaks

That is not slowing down.

That is building a platform that can survive real use.

## Final thought

What I learned about my platform is that architecture is part of the teaching system.

That gives me three rules:

- If the architecture is vague, the course gets vague.
- If the source of truth is scattered, the work starts lying.
- If drafts and exports look like source, AI will eventually treat them like source.

So the next move is CourseOS: course packets, honest status, safe drafts, explicit promotion, health reports, and locks that protect reviewed work.

Not because it sounds fancy.

Because teachers do not need prettier folders. They need systems that keep the course honest when the pressure hits.
