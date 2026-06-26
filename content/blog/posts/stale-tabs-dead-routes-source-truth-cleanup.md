---
title: "Stale Tabs, Dead Routes, and Source-of-Truth Cleanup"
slug: "stale-tabs-dead-routes-source-truth-cleanup"
date: "2026-06-26"
status: published
author: JC
category: Build Note
section: build-notes
tags:
  - source-of-truth
  - course-architecture
  - cleanup
summary: "How stale editor tabs and legacy folders exposed the need to delete old course paths instead of letting them haunt the rebuild."
sourceSession: "OTS-101 legacy folder cleanup"
humanReviewed: true
published: true
---

## What happened

The editor kept showing old paths.

One tab pointed at:

```txt
content/courses/ots-101/lessons/01-teacher-builder-mindset/01-0.mdx
```

But the active rebuilt course used:

```txt
content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-0.mdx
```

That mismatch made the project feel broken even after the new course structure existed.

It was not just annoying.

It was a source-of-truth problem.

## Why it bothered me

Old folders are not harmless when AI agents are working in the repo.

A stale folder is a prompt.

A stale tab is a prompt.

A stale audit report is a prompt.

If old paths still exist, the system may keep trying to repair, read, rewrite, or revive them.

That is how fake course content comes back from the dead.

## What was really going on

The repo had two course histories sitting beside each other:

| Legacy shape | Active rebuild shape |
| --- | --- |
| `01-teacher-builder-mindset` | `01-curriculum-vs-course-content` |
| `02-prompting` | `02-standards-goals-to-lessons` |
| `03-ai-literacy-verification` | `03-prompting-without-garbage` |
| `10-mini-unit-capstone` | `10-mini-course-content-packet` |

Both looked plausible.

Only one was true.

<SourceTruthExportVisual />

## The lesson

Do not leave retired course architecture sitting around as if it might still be valid.

If a folder is legacy, mark it or delete it.

If an audit references dead routes, mark it obsolete.

If an export outline points to retired slugs, update it.

If scripts can recreate the old course shape, remove them.

## The fix

We cleaned the active OTS-101 source area.

The old lesson folders were deleted.

The active lessons README now documents the real chapter structure:

```txt
01-curriculum-vs-course-content
02-standards-goals-to-lessons
03-prompting-without-garbage
04-verify-ai-before-students
05-student-facing-lessons
06-assignments-labs-rubrics-feedback
07-organizing-course-content-system
08-safety-accessibility-copyright-source-quality
09-publishing-to-platform
10-mini-course-content-packet
```

We also removed stale authoring scripts that could recreate the old shape.

## What teachers can use

This applies outside code too.

Course folders in Google Drive, Canvas, or a shared team folder need the same cleanup habit:

- [ ] Archive old versions clearly.
- [ ] Delete fake placeholder copies.
- [ ] Label exports as exports.
- [ ] Keep the source course separate.
- [ ] Write a small README or map.
- [ ] Remove duplicate folders that imply two sources of truth.

If two folders look like the course, people will eventually use the wrong one.

## Final thought

A messy source of truth creates messy teaching work.

The fix is not more polish.

The fix is honesty:

> This is the source. That is legacy. This is export. That is archive.

Name the truth, or the folder structure will name it for you.
