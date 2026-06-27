---
title: "Source of Truth vs Export Target"
slug: "source-of-truth-vs-export-target"
date: "2026-06-26"
status: published
author: JC
category: Build Note
section: author-blog
tags:
  - source-of-truth
  - course-architecture
  - openteachstack
summary: "Why OpenTeachStack treats course content as the source and platforms like Teachable as downstream packaging."
sourceSession: "OTS-101 source-of-truth architecture cleanup"
humanReviewed: true
published: true
---
## What happened

The project had two kinds of course folders that looked important.

- One lived where the course actually belongs:

```txt
content/courses/{course}/
```

- The other lived near export and upload support:

```txt
teachable/{course}/
```

That was enough to confuse the whole system.

If both folders look like course homes, an AI agent can start treating either one as the truth. Then it starts making decisions from the wrong place.

## What Broke

The breakage was useful because it exposed the system underneath the content.

That is how export packaging quietly becomes curriculum architecture.

## Why it bothered me

Because teachers deal with this all the time.

A platform starts to feel like the course because it is where students click.

## What Fixed It

The repair had to change the source of truth, not just the visible page.

Canvas feels like the course.
Google Classroom feels like the course.
Teachable feels like the course.
A website feels like the course.

## What We Carry Forward

The next build gets easier when the mistake becomes a rule we can reuse.

But those are containers.

## What This Exposed

The useful part is the pattern underneath the mistake.

They matter, but they are not the source of instructional truth.

<SourceTruthExportVisual />

## What was really going on

The repo architecture was acting like a prompt.

When the folder structure says, “Here are several places that might be the course,” the agent guesses.

## What Broke 2

The breakage was useful because it exposed the system underneath the content.

And when the agent guesses, it may do the wrong kind of work:

| If the agent treats this as truth | It may accidentally do this |
| --- | --- |
| Export folder | Polish packaging before lessons are real. |
| Route registry | Make pages load instead of making lessons teach. |
| Course index | Treat metadata as authored instruction. |
| Placeholder MDX | Rewrite scaffold text instead of deleting it. |
| Platform copy | Optimize upload format before learning evidence exists. |

The mistake was not only bad content.

The mistake was giving the system too many places to believe.

## The lesson

A course needs one source of truth.

Everything else should point downstream.

## What Fixed It 2

The repair had to change the source of truth, not just the visible page.

For OpenTeachStack, the rule is:

```txt
content/courses/{course}/
  source lessons
  templates
  examples
  assessments
  sample packets
  revision notes

exports / platform folders
  packaging only
  upload support only
  never the authored source
```

> The course comes first. The export comes last. The container is not the course.

## The fix

We made the architecture more honest.

1. `content/courses/{course}` became the canonical source.
2. `teachable/` became legacy export support, not course truth.
3. Non-OTS-101 courses were marked Coming Soon instead of pretending to be ready.
4. Missing lessons render as unavailable instead of being filled with placeholders.
5. Documentation now says where authored course content must live.

That does not magically write the course.

It prevents the system from lying about where the course is.

## What teachers can use

Use this test when building any AI-assisted course system.

<ChecklistBlock
  title="Source of Truth Check"
  intro="Before exporting to an LMS or course platform, make sure the real course has one home."
  items={[
    "Can I point to the folder or document where the real lesson lives?",
    "Are student-facing lessons separate from teacher-only notes?",
    "Are templates and examples stored with the course, not only in the platform?",
    "Can I revise the source without editing five platform copies?",
    "Is the export clearly labeled as packaging?",
    "Would another teacher know which file to trust?",
  ]}
  takeaway="If the source of truth is unclear, the platform will start making instructional decisions for you."
/>

A simple folder model is enough:

```txt
my-course/
  lessons/
  templates/
  examples/
  assessments/
  teacher-notes/
  exports/
    canvas/
    google-classroom/
    pdf/
```

The exact names do not matter as much as the boundary.

Source first.

## What We Carry Forward 2

The next build gets easier when the mistake becomes a rule we can reuse.

Export second.

## Final thought

A platform can deliver a course, but it should not define the course.

If you let the container become the source of truth, every future revision gets harder.

## What Broke 3

The breakage was useful because it exposed the system underneath the content.

OpenTeachStack needs the opposite:

> One real course source, many possible exports.

## The Mistake

The export target is where content travels. The source of truth is where content is maintained. Confusing those two is how old drafts keep coming back from the dead.

## What We Changed

OpenTeachStack needs one maintained content home, then controlled exports out to whatever platform needs the material next.
