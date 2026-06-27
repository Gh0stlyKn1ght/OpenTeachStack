---
title: "Format Audits Should Protect Voice, Not Flatten It"
slug: "format-audits-should-protect-voice-not-flatten-it"
date: "2026-06-27"
status: published
author: JC
category: Build Note
section: author-blog
tags:
  - content-quality
  - readability
  - openteachstack
summary: "What OpenTeachStack learned when a helpful readability audit started pushing the course toward another kind of template."
sourceSession: "OTS-101 readability audit cleanup"
humanReviewed: true
published: true
---
## What happened

We built a readability audit because the course pages were getting too hard to scan.

That part was right.

Teachers do not need another wall of text.

They need visible structure:

- headings that show the work path
- bullets where choices or checks matter
- examples that show what done looks like
- visible next actions

If a lesson is supposed to help someone build real course content with AI, the page shape has to support that work.

Then the audit started revealing a second problem.

It was not wrong exactly. It was just too blunt.

It wanted the same signals everywhere:

- same headings
- same checks
- same rhythm
- same kind of proof

## Why it bothered me

The first version of the check was useful because it caught real issues:

- too many uninterrupted paragraphs
- lessons with no clear section breaks
- support files listing items without bullets
- blog posts explaining a process without scannable structure
- course pages that looked polished but did not help the reader move

But a course can fail in two directions.

It can be too loose, where every page feels like a draft.

It can also be too rigid, where every page has the same manufactured rhythm.

That second failure is sneakier because it passes more checks.

## What was really going on

The bad fix would have been simple:

> Add the same headings to every lesson until the audit goes green.

That would have made the report happier and the course worse.

Not every lesson is doing the same job.

| Lesson type | What it needs | What would feel fake |
| --- | --- | --- |
| Concept lesson | Problem, misconception, example, quick check | A forced build step |
| Workflow lesson | When to use it, steps, next action | A loose reflection prompt |
| Artifact-build lesson | Build steps, quality check, capstone connection | Pure explanation |
| Checkpoint lesson | Self-audit, evidence to save, next step | More theory |
| Blog post | Human narrative with scannable breaks | Course-template sections |

That table became the real lesson.

Readability is not sameness.

## The fix

The audit needed to understand lesson purpose before judging lesson shape.

So the better move was to make the checker type-aware.

Instead of asking every page to contain the same sections, the audit now looks for the signals that belong to the kind of content it is reading:

- chapter overviews need exit criteria and a clear build target
- checkpoints need self-audit and evidence
- workflows need numbered steps
- comparisons need decision rules or tables
- artifact builds need build steps and quality checks
- blogs need readable human structure without becoming lesson templates
- support files need clarity, not full instructional scaffolding

That is a much better contract.

The checker still protects the reader, but it stops punishing the writer for not sounding like a template.

## The lesson

> A format audit should catch friction, not manufacture voice.

That distinction matters for OpenTeachStack because the whole project is about helping teachers use AI without losing the teaching decision.

If the audit turns every page into the same shape, we have recreated the fake course problem with better headings.

## What teachers can use

If you are reviewing AI-generated teaching material, do not only ask whether it is formatted.

Ask what kind of page it is supposed to be.

Use this quick check:

- Is this page explaining an idea?
- Is it walking through a process?
- Is it asking the teacher to build something?
- Is it helping the teacher compare choices?
- Is it checking readiness before moving on?
- Is it a human note about the build process?

Then judge the page by that job.

A good checklist protects the reader.

A bad checklist erases the reason the page exists.

## Final thought

The point was never to make the audit happy.

The point was to make the course easier to teach from.

That is the line I want OpenTeachStack to keep: structured enough to be usable, human enough to be trusted.
