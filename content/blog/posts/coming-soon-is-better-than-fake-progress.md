---
title: "Coming Soon Is Better Than Fake Progress"
slug: "coming-soon-is-better-than-fake-progress"
date: "2026-06-27"
status: published
author: JC
category: Build Note
section: author-blog
tags:
  - course-architecture
  - source-of-truth
  - openteachstack
summary: "Why OpenTeachStack stopped making unfinished courses clickable while OTS-101 is still being made honest."
sourceSession: "OTS-101 restart and course availability cleanup"
humanReviewed: true
published: true
---
## What happened

The site had a pathway problem.

Several courses were marked Coming Soon, but the interface still let people open them.

That sounds small until you click one. Then the promise breaks.

The contradiction is simple:

- the label says Coming Soon
- the button says open
- the route says trust me
- the content has not earned that trust yet

If a course is not ready, an open button is not harmless.

It tells the reader there is something there worth trusting.

In our case, too much of what was behind those buttons was placeholder-shaped course material.

## Why it bothered me

OpenTeachStack is supposed to help teachers avoid fake AI progress, so the site cannot model fake progress itself.

If OTS-101 is the course we are actively making honest, then the other courses need to be clear about their status. They can exist in the roadmap. They can show the future direction. They can help explain the pathway.

But they should not behave like finished learning experiences.

That was the boundary:

- future course, visible in the pathway
- unfinished course, not opened as a learning surface
- active course, held to the harder review standard

## The fix

The fix was not just a code cleanup.

It was a product decision:

- keep OTS-101 open because it is the active course
- mark the rest as Coming Soon
- remove open-course links from unfinished courses
- stop letting course shells pretend to be course content
- make the visible site match the actual source of truth

That feels slower.

It is more honest.

## What was really going on

This is the pattern we had to break:

| Fake progress | Honest progress |
| --- | --- |
| Every course has a button | Only ready courses open |
| Placeholder lessons render | Unfinished courses say Coming Soon |
| File existence implies readiness | Authored content determines readiness |
| Export folders look like source content | Source folders own the course |
| The roadmap feels complete | The learner path is trustworthy |

The difference is not cosmetic.

It changes what the site promises.

## The lesson

Coming Soon is not a failure state.

It is a trust state.

It tells the reader:

> We are not going to waste your time with a course-shaped shell.

That is important for teachers.

Teachers already have enough platforms asking them to click through half-built content. If OpenTeachStack is going to be useful, it has to protect their attention from the start.

## What teachers can use

The same rule works for classroom materials.

Before sharing AI-assisted course content, ask:

- Is this ready for students, or only ready for planning?
- Does the page give real directions, examples, and evidence?
- Is the teacher verification complete?
- Would another teacher understand what is finished and what is not?
- Is the draft stored somewhere that cannot be confused with the final version?

If the answer is unclear, label it honestly.

- Draft.
- Needs review.
- Coming Soon.
- Not ready for students.

Those labels are not embarrassing. They are part of the system.

## Final thought

The hard part of building with AI is not generating more pages. The hard part is refusing to call them finished too early.

For now, OTS-101 gets the attention.

The rest can wait their turn.

That leaves a plain rule:

- active course gets real authoring time
- unfinished courses stay visible but closed
- release labels wait for review evidence

That is not less progress.

That is how the progress stops lying.
