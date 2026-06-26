---
title: "When Visual Blocks Beat Mermaid"
slug: "when-visual-blocks-beat-mermaid"
date: "2026-06-26"
status: published
author: JC
category: Build Note
section: build-notes
tags:
  - visual-design
  - instructional-ui
  - openteachstack
summary: "Why OpenTeachStack moved from tiny Mermaid diagrams toward reusable instructional card blocks for course concepts."
sourceSession: "OTS-101 visual block system design"
humanReviewed: true
published: true
---

## What happened

We tried using Mermaid diagrams to explain course workflows.

The idea was good.

The result was not always good.

Some diagrams rendered too small. Some were hard to read in the course viewport. Some made simple processes feel more technical than they needed to be.

The visual was supposed to help.

Sometimes it became the obstacle.

## Why it bothered me

OpenTeachStack is for teachers building real course content, not engineers admiring diagrams.

A visual should make the idea easier to understand at a glance.

If the reader has to zoom, squint, decode a tiny flowchart, or mentally rebuild the sequence, the visual failed.

That was the turning point.

> The best visual is the one that helps the teacher make the next decision.

## What was really going on

We were using one visual tool for too many jobs.

Mermaid is good when the relationship is genuinely graph-like.

But many course concepts are not graph problems. They are teaching problems.

| Concept type | Better visual pattern |
| --- | --- |
| Step-by-step workflow | Workflow cards |
| Weak vs better | Comparison table or cards |
| Course architecture | Folder tree or framework block |
| Quality gate | Checklist block |
| Concept buckets | Category cards |
| Actual graph relationship | Mermaid, if readable |

## The lesson

Instructional UI is not dashboard UI.

It should not exist to look fancy.

It should help teachers understand concepts like:

- fake course trap
- source of truth vs export target
- course truth stack
- AI course content workflow
- tired teacher test
- publishing checklist

Those ideas need chunking, hierarchy, and short language.

## The fix

We added reusable instructional visual blocks:

```txt
FrameworkBlock
ConceptCard
TakeawayStrip
ComparisonBlock
WorkflowBlock
ChecklistBlock
```

Then we added preset visuals for common OTS-101 concepts:

```txt
FakeCourseTrapVisual
SourceTruthExportVisual
CourseTruthStackVisual
AICourseContentWorkflowVisual
TiredTeacherTestVisual
```

The blocks use framed containers, cards, labels, short text, and takeaway strips.

They are meant to feel like structured teaching graphics, not decoration.

## What teachers can use

Pick the visual format based on the learning job:

1. Use cards when students or teachers need to compare pieces.
2. Use numbered cards when sequence matters.
3. Use tables when the difference between weak and better work matters.
4. Use checklists when the reader must verify readiness.
5. Use folder trees when architecture matters.
6. Use Mermaid only when a graph is genuinely clearer than cards.

## Final thought

A visual should earn its place on the page.

If it makes the idea harder to read, replace it.

Pretty is not the goal.

Readable is the goal.
