---
title: "Welcome to OpenTeachStack Field Notes"
slug: "welcome-to-openteachstack-field-notes"
date: "2026-06-26"
status: published
author: JC
category: Introduction
section: author-blog
tags:
  - field-notes
  - build-log
  - openteachstack
summary: "A first note on why OpenTeachStack is documenting the messy work of building real AI-assisted course content."
sourceSession: "Blog voice and build journal setup"
humanReviewed: true
published: true
---
`r`nOpenTeachStack exists because AI can make teaching work look finished before it is actually teachable.

That sentence is doing a lot of work.

## What happened

I started building OpenTeachStack and ran straight into the thing this project is supposed to warn teachers about.

The repo looked busy. The folders looked official. Routes loaded. Course shells existed. Some checks passed.

But then I opened the actual lesson bodies and saw the problem:

- lesson-shaped files
- generic paragraphs
- placeholder examples
- course indexes that sounded polished but did not teach
- exported-looking material that was not source-of-truth course content

That is a nasty kind of fake progress.

> A course can look organized before it is actually teachable.

## Why it bothered me

Because this is exactly what teachers are about to experience with AI.

Ask an AI tool to make a course and it may hand you a neat pile of assets:

| What AI may generate | Why it can fool us |
| --- | --- |
| Course description | It sounds like a plan. |
| Lesson outline | It looks like structure. |
| Quiz plan | It feels like assessment. |
| Download list | It looks like materials. |
| Video notes | It feels production-ready. |
| Final project | It gives the course an ending. |

None of that proves students can learn from it.

None of that proves a tired teacher can teach it tomorrow.

## What was really going on

The system was confusing containers with course content.

A route is not a lesson.
A folder is not a course.
A platform export is not the source of truth.
A generated MDX file is not proof that learning exists.

<SourceTruthExportVisual />

That distinction became the first real OpenTeachStack rule:

> The course comes first. The export comes last. The container is not the course.

## The lesson

OpenTeachStack has to model the behavior it teaches.

If we tell teachers to verify AI output, then our course files need verification.

If we tell teachers to avoid fake completeness, then our own routes cannot pretend unfinished content is ready.

If we tell teachers that formatting is instruction, then the blog and lessons cannot be walls of text.

## What This Exposed

The useful part is the pattern underneath the mistake.

That last one matters more than it sounds.

A teacher-facing page should show the reader:

1. what happened
2. why it matters
3. what went wrong
4. what changed
5. what they can reuse

If the reader has to hunt for the point, the page failed.

## The fix

The rebuild now has a different bar.

OpenTeachStack is not trying to make every course look complete at once. That was the trap.

The current rule is simple:

- build OTS-101 first
- mark everything else honestly
- delete fake placeholders
- keep source content in `content/courses/{course}`
- treat platform exports as downstream packaging
- use visual blocks when structure teaches better than paragraphs
- publish only what has been reviewed by a human

<FakeCourseTrapVisual />

## What teachers can use

Here is the first reusable test from this mess.

<ChecklistBlock
  title="The Tired Teacher Test"
  intro="Before calling a course page ready, ask whether it survives a real school week."
  items={[
    "Can a tired teacher use this tomorrow?",
    "Can a student tell what to do?",
    "Is there a real example?",
    "Is there a task?",
    "Is there evidence of learning?",
    "Is there a safety, privacy, or source boundary?",
    "Is the source of truth clear?",
  ]}
  takeaway="If the answer is no, the page is not done yet."
/>

Use that test on anything AI helps create:

- a lesson
- a rubric
- a project brief
- a quiz
- a course outline
- a student-facing page
- an LMS module

If it only looks complete, keep working.

## What Field Notes will document

These posts are not here to pretend the build was clean.

They are here because the mistakes are useful.

Expect notes on:

- fake-complete course folders
- AI-generated placeholder traps
- source-of-truth architecture
- lesson formatting as instruction
- course review checks
- visual teaching blocks
- what changed after something broke

Some of that will be practical. Some of it will be uncomfortable.

Good.

A site about AI-assisted course building should be honest about what AI gets wrong and what teachers still need to own.

## Final thought

The main course work starts with OTS-101: **AI Course Content Foundations for Teachers**.

The promise is not “generate a course.”

The promise is better than that:

> Build a small student-facing course content packet that is teachable, verified, safe, accessible, and reusable.

Not fake-complete.

Not just uploaded.

Not just routed.

Teachable.

## What We Changed

The fix matters because it changes the system, not just the sentence.

That is the bar these notes are here to protect.

## What This Blog Is For

These notes are the shop floor. They document what broke, what we misunderstood, and what we changed while building OpenTeachStack in public.

## What It Is Not

This is not a polished marketing channel pretending the process was clean. The useful part is the repair work.
