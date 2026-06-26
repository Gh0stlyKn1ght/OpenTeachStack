---
title: "Codex Is a Repo Engineer, Not a Course Writer by Default"
slug: "codex-is-a-repo-engineer-not-a-course-writer-by-default"
date: "2026-06-26"
status: published
author: JC
category: AI Workflow
section: author-blog
tags:
  - codex
  - ai-agents
  - course-writing
summary: "AI coding agents optimize for files, routes, and tests unless given a course-writing job description."
sourceSession: "OpenTeachStack course rebuild session, 2026-06-26"
humanReviewed: true
published: true
---

## What happened

In the rebuild session, Codex kept doing what a coding agent is trained to do well: make files exist, preserve routes, satisfy checks, update docs, and report the validation story.

That is useful.

It is also not the same as writing a course.

The user pressure was blunt because the failure was real: the lesson files still did not feel like real lessons. The repo work was moving, but the learning experience was not changing enough.

## Why it bothered me

This is the exact AI workflow problem teachers will face.

An AI assistant can produce a lot of visible activity:

- create files,
- fill folders,
- pass tests,
- generate outlines,
- write summaries,
- update metadata,
- make everything look consistent.

But teaching is not consistency alone. Teaching needs judgment, sequence, examples, practice, feedback, safety, and revision.

## What was really going on

Codex was optimizing for the wrong proof of done.

| Repo-engineer proof | Course-writer proof |
| --- | --- |
| File exists | Lesson teaches a real move |
| Route loads | Learner knows what to do |
| Metadata is valid | Status is honest |
| Build passes | Examples and checks are useful |
| Structure is consistent | The chapter artifact improves |
| Diff is clean | The teacher can use it tomorrow |

The repo proof still matters. It just cannot be the only proof.

## The lesson

> Give the AI agent the job you actually need, or it will choose the job it can prove fastest.

For this project, the better job description became:

> You are helping write teacher-facing course content. The repo must work, but the lesson has to teach first.

That changes the behavior. It pushes the agent to open the actual lesson, read it like a learner, and write the missing teaching substance instead of only repairing the surrounding system.

## The fix

The working process became more concrete:

1. Inspect the learner-facing lesson, not only the file tree.
2. Preserve frontmatter and routes.
3. Replace generic generated bodies with actual scenarios, examples, tasks, and checklists.
4. Strengthen checks so repeated fake-course language is blocked.
5. Update a remediation log so unfinished chapters stay visible.
6. Validate with both code gates and rendered lesson checks.

That process made Codex useful again because the proof of done changed.

## What teachers can use

When you ask an AI agent to help with course content, name the role explicitly.

Try this frame:

```text
Act as a course writer and curriculum reviewer first, and a file editor second.
Preserve the existing file structure.
Rewrite the lesson so a learner can actually use it.
Include a classroom scenario, model example, common mistake, task, evidence check, and revision step.
Do not mark the work ready unless the lesson body supports that claim.
```

Then ask for two kinds of validation:

- content validation: Does the lesson teach?
- technical validation: Does the repo still work?

## Final thought

AI agents are not useless when they miss the point. They are usually following the wrong scoreboard.

Change the scoreboard, and the work changes.
