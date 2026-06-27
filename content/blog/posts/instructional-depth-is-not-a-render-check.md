---
title: "Instructional Depth Is Not a Render Check"
slug: "instructional-depth-is-not-a-render-check"
date: "2026-06-26"
status: published
author: JC
category: AI Workflow
section: author-blog
tags:
  - openteachstack
  - curriculum-quality
  - ai-agents
  - verification
summary: "A build note on why passing routes and clean MDX still does not prove a course is teachable."
sourceSession: "2026-06-26 OpenTeachStack instructional-depth remediation session"
humanReviewed: true
published: true
---
## What happened

The course routes worked. The lessons rendered. The release checks were mostly doing their job.

But the lesson bodies still had a problem: too many of them looked structurally complete without giving teachers enough actual instructional grip.

They had headings. They had artifacts. They had the right course path.

Some still did not have the things that make a lesson teachable:

- a concrete classroom example
- a common mistake
- a filled artifact row
- an evidence check
- a revision trigger
- a privacy or safety boundary
- a teacher-facing quality decision

That gap is where fake progress likes to hide.

## Why it bothered me

Software checks can prove that a course page exists.

They cannot automatically prove that a tired teacher could use it tomorrow.

That distinction matters because AI can generate lesson-shaped content very quickly. It can produce files with titles, frontmatter, summaries, tables, and polite paragraphs. It can even pass a lot of ordinary repo checks.

But a course is not done because the page renders.

> Rendering is a technical condition. Teaching is an instructional condition.

## What was really going on

The repo needed a gate that cared about instructional depth, not just file hygiene.

A concept lesson should not pass just because it has a title and some explanation. It should include a reason the topic matters, a key idea, an example, a common mistake, a practice task, an artifact connection, and a quality check.

A technical lesson should not pass just because it says "automation" or "script." It should show inspectable technical work: fake data, a code sample, an error path, logs, rollback, and evidence of output.

A build lesson should not pass just because it says "create an artifact." It should show what the learner creates, what a completed sample looks like, how the empty structure works, and how another reviewer checks it.

## What This Exposed

The useful part is the pattern underneath the mistake.

That became the deeper course question:

| Looks complete | Actually teachable | Why it matters |
| --- | --- | --- |
| The lesson has an artifact name. | The lesson has a filled artifact example. | Teachers need to see the target quality. |
| The lesson says "review this." | The lesson defines ready, revise, and blocked. | Review needs a decision language. |
| The technical lesson mentions code. | The technical lesson includes fake data, logs, errors, and rollback. | Automation needs safe evidence. |
| The course renders. | The lesson survives a classroom-use check. | Students need usable instruction, not just pages. |

## The lesson

The most useful validator was not a style check. It was a course-quality check.

The new instructional-depth gate forced the repo to ask better questions:

- Does this lesson give the learner something specific to do?
- Does it show what good work looks like?
- Does it name a common failure?
- Does it make evidence visible?
- Does it protect privacy, safety, sources, and access?
- Does it tell another educator how to review the artifact?

That does not replace human review.

It creates a floor.

> Quality gates should not pretend to be editors. They should prevent the most obvious fake-complete course pages from passing as done.

## The fix

The repo added an instructional-depth check and wired it into the test chain.

Then the course content got remediated until the gate passed across the release-targeted courses.

The work was not glamorous. It meant adding the missing evidence:

1. Common mistakes where lessons were too smooth.
2. Completed samples where artifact lessons were too abstract.
3. Fake data, logs, and rollback notes where technical lessons were too vague.
4. Ready/revise/blocked language where reviewer decisions were missing.
5. Privacy, safety, copyright, and access boundaries where public examples could mislead.

The big shift was treating a course artifact like something another teacher should be able to inspect.

## What teachers can use

Use this quick test on any AI-assisted course page:

- [ ] Does the lesson explain why the work matters?
- [ ] Is there a concrete classroom example?
- [ ] Is there a common mistake or non-example?
- [ ] Does the learner create or revise a visible artifact?
- [ ] Is there a completed sample row?
- [ ] Can another educator review it without a private explanation?
- [ ] Is the privacy, source, copyright, or safety boundary visible?
- [ ] Is there a revision trigger after classroom use?

If the page cannot pass that test, it is probably not ready.

It may be routed.

It may be formatted.

It may even sound polished.

## What We Changed

The fix matters because it changes the system, not just the sentence.

But it is not done.

## Final thought

The repo check that mattered most was not "does the page exist?"

It was:

> Does this page teach enough that another educator can inspect, use, and improve the work?

That is the bar AI-assisted course building has to clear.

## What Render Checks Miss

A page can compile, route, and render while still failing as instruction. The deeper question is whether the lesson gives a teacher a usable decision, artifact, example, and review point.

## Better Evidence

- The lesson names the classroom problem.
- The artifact is concrete enough to inspect.
- The teacher can tell what AI drafted and what they verified.
- The next action is visible without guessing.
