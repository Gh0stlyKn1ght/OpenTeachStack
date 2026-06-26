---
title: "The Fake Course Trap"
slug: "the-fake-course-trap"
date: "2026-06-26"
status: published
author: JC
category: Build Note
section: author-blog
tags:
  - fake-completeness
  - course-architecture
  - openteachstack
summary: "How OpenTeachStack caught the difference between course-shaped assets and a course that actually teaches."
sourceSession: "OTS-101 rebuild and placeholder cleanup"
humanReviewed: true
published: true
---

## What happened

I thought the project was farther along than it was.

There were course folders. There were lesson files. There were routes. There were indexes. Some of it even rendered cleanly.

Then we opened the actual lesson bodies.

That is where the lie showed up.

The files looked like course content, but too many of them were just generic scaffold text wearing course clothes.

- the wording was interchangeable
- the examples were vague
- the actions were not classroom-real
- the pages had structure without teaching
- the route looked complete while the lesson was not

<FakeCourseTrapVisual />

## Why it bothered me

Because this is not just a repo mistake.

This is exactly what AI can do to teachers.

AI can generate a pile of course-shaped assets so quickly that the work feels complete before anyone checks whether students can learn from it.

| Course-shaped asset | Why it feels real | What it still needs |
| --- | --- | --- |
| Course description | It sounds official. | Real lessons and evidence. |
| Lesson outline | It gives sequence. | Student-facing instruction. |
| Quiz plan | It suggests assessment. | Questions tied to learning targets. |
| Downloads index | It looks organized. | Actual usable materials. |
| Video notes | It feels production-ready. | A teachable lesson underneath. |
| Final project | It gives an ending. | Scaffolds, criteria, examples, and feedback. |

That is the fake course trap:

> The shell looks complete before the learning is real.

## What was really going on

The system was treating file existence as content truth.

That was the architecture problem.

A route can load and still not teach.
A lesson file can exist and still be fake.
A platform export can be polished and still not be the course.

<SourceTruthExportVisual />

Once we named that, the fix became obvious: stop letting downstream containers define the course.

The source of truth has to be the authored course content itself.

## The lesson

The first question is not, “Does the course route work?”

The first question is:

> Can a tired teacher use this tomorrow, and can a student tell what to do?

That changed the standard.

A real course page needs more than a heading and a promise. It needs the pieces a teacher can actually inspect:

1. a learning target
2. a concrete explanation
3. a real example
4. a weak or risky non-example
5. a student task
6. assessment evidence
7. safety, privacy, accessibility, or source boundaries
8. a revision path after teaching

<CourseTruthStackVisual />

## The fix

We stopped pretending all courses were equally alive.

The rebuild rule became:

- OTS-101 is the active course.
- The rest stay Coming Soon until OTS-101 is honest.
- Placeholder MDX gets deleted instead of polished.
- Missing lessons render as intentionally unavailable.
- Export folders are treated as packaging, not source content.
- Blog/build notes document the mistakes so the system gets smarter.

That is not glamorous work.

It is better than fake progress.

## What teachers can use

Use this check before trusting AI-generated course material.

<ChecklistBlock
  title="Fake Course Trap Check"
  intro="If the page passes these checks, it is closer to real course content. If not, it may only be course-shaped."
  items={[
    "Can students tell what to do next?",
    "Is there a real example?",
    "Is there a weak or risky example?",
    "Is there a task students can submit?",
    "Is there evidence a teacher can review?",
    "Are safety, privacy, accessibility, or source boundaries named?",
    "Is the source of truth separate from the export platform?",
  ]}
  takeaway="A course is not real because it has files. It is real when the learning path can be taught, used, reviewed, and revised."
/>

You can also use this prompt when reviewing AI output:

```txt
Review this course material for fake completeness.
Do not praise the structure unless the body actually teaches.
Flag any section that has headings without examples, tasks, evidence, safety boundaries, or student-facing directions.
Separate course content from platform packaging.
Tell me what a tired teacher could use tomorrow and what still needs authoring.
```

## Final thought

The fake course trap is seductive because it gives you the feeling of progress.

But OpenTeachStack cannot be a pile of course-shaped files.

It has to teach.

So the rule is simple:

> If the page only looks complete, keep building.
