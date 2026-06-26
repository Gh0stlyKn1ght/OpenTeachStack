---
title: "Formatting Is Instruction"
slug: "formatting-is-instruction"
date: "2026-06-26"
status: published
author: JC
category: Build Note
section: build-notes
tags:
  - formatting
  - course-quality
  - openteachstack
summary: "Why OpenTeachStack treats headings, lists, tables, checks, and visual structure as part of the teaching, not decoration."
sourceSession: "OTS-101 formatting and readability cleanup"
humanReviewed: true
published: true
---

## What happened

The content started sounding more human, but some pages still felt hard to use.

That was the next problem.

A lesson can have better voice and still read like a wall of text. A blog post can be honest and still make the reader dig for the point.

That matters because OpenTeachStack is not only explaining course design.

It has to model it.

## Why it bothered me

Teachers skim under pressure.

Students skim because they are trying to figure out what to do next.

If a page hides the action inside long paragraphs, the writing may be thoughtful, but the teaching is still weak.

A good course page should show the reader:

- what matters
- what comes first
- what the example is
- what the mistake is
- what to build
- what to check
- what evidence proves the work is usable

> Formatting is not decoration. Formatting is instruction.

## What was really going on

The repo had checks for routes, frontmatter, and content existence, but it did not have enough pressure on readability.

That meant a page could be technically valid while still being difficult to teach from.

| Weak page behavior | Better instructional structure |
| --- | --- |
| Long essay blocks | Short sections with clear headings |
| Vague process | Numbered build steps |
| Hidden checks | Visible checklist |
| Weak vs better explained in prose | Comparison table |
| Folder architecture described loosely | Code block folder tree |
| Complex flow squeezed into Mermaid | Cards or workflow blocks |

## The lesson

OpenTeachStack needs structure that helps teachers act.

That does not mean every page should follow a dead template.

It means the shape of the page should reveal the thinking.

A strong lesson page needs scannable teaching moves:

1. name the teacher problem
2. explain the idea
3. show a realistic scenario
4. compare weak and better versions
5. give a build step
6. include a quality check
7. name safety, accessibility, or source boundaries
8. connect back to the capstone

## The fix

We added formatting standards and a readability audit.

The new rule is simple:

- no walls of text
- no fake formatting
- no headings that only decorate weak content
- no visuals that make concepts harder to read
- structure must help the reader act

We also added a reusable template for blog posts so public writing does not drift back into blob mode.

## What teachers can use

Use this quick check on any lesson or course page:

- [ ] Can I find the learning target quickly?
- [ ] Can I find the student task quickly?
- [ ] Is there an example before the task?
- [ ] Is the weak version or common mistake visible?
- [ ] Is the quality check scannable?
- [ ] Does the page use a table, list, or visual block where comparison matters?
- [ ] Are long paragraphs split into teaching moves?

If the answer is no, the content may be written, but it is not shaped for learning yet.

## Final thought

A course page is not a transcript of what the teacher knows.

It is a tool that helps someone move.

If the page does not help the reader move, keep shaping it.
