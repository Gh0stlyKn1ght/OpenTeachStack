---
title: "Batch the Polish or the Course Never Gets Better"
slug: "batch-the-polish-or-the-course-never-gets-better"
date: "2026-06-26"
status: published
author: JC
category: Build Log
section: author-blog
tags:
  - openteachstack
  - course-building
  - workflow
  - ai-agents
summary: "A build note on moving from tiny lesson edits to larger course-quality passes that actually change the learner experience."
sourceSession: "2026-06-26 OpenTeachStack course polish batching session"
humanReviewed: true
published: true
---
## What happened

At first, the work moved one lesson at a time.

Fix one missing section.

Run a check.

Fix another lesson.

## What This Exposed

The useful part is the pattern underneath the mistake.

Run a check.

That was safe, but it was also ridiculous for the size of the course problem.

The issue was not one broken lesson. The issue was that multiple courses needed the same kind of humanizing pass: fewer generic artifact wrappers, more filled examples, more ready/revise/blocked decisions, more concrete evidence, and better course-specific support files.

## What We Changed

The fix matters because it changes the system, not just the sentence.

So the workflow changed.

Instead of polishing one or two files, the session moved into larger batches:

- OTS-101 prompting, AI verification, standards, mini-unit maps, rubrics, delivery, and capstone
- OTS-220 Apps Script lessons with fake Sheet rows, Logger output, error paths, and rollback
- OTS-399 capstone studio lessons with technical evidence logs, release safety reviews, peer review, and publish decisions
- OTS-201 Workspace artifacts with Drive maps, delivery templates, trackers, and command centers
- OTS-240 open curriculum repository artifacts with README, source, license, contribution, and release checks
- OTS-280 teacher safety artifacts with risk maps, MFA checklists, phishing response, and incident plans

The work got better when the edits started matching the scale of the problem.

## Why it bothered me

Tiny fixes can create a false sense of discipline.

They feel careful. They are easy to review. They reduce the chance of breaking something.

But course quality is patterned. If ten lessons have the same vague artifact language, fixing one does not change the learner experience. It only makes one page less bad.

The course improves when the pattern changes.

> If the weakness is systemic, the repair has to be batched.

## What was really going on

The course needed two kinds of work:

| Work type | What it fixes | Risk |
| --- | --- | --- |
| Structural remediation | Missing required lesson elements | Can become formulaic if it only satisfies checks. |
| Hand polish | Course-specific examples, artifacts, decisions, and voice | Takes longer but changes the actual learner experience. |

The first pass made the instructional-depth gate pass.

The second pass made lessons feel less like they were repaired by a script.

That second pass mattered more.

It turned generic lesson language into things teachers can actually use:

- a fake Sheet row for Apps Script
- a completed Teacher Workflow Audit
- a source/license decision table
- a phishing response checklist
- a capstone release decision row
- a Workspace command center model
- a delivery plan with fallbacks

Those are the pieces a teacher can steal, adapt, and teach from.

## The lesson

Course polish should happen at the artifact-family level.

Do not only ask, "Which lesson is failing?"

Ask:

- Which artifact family is still generic?
- Which course needs stronger examples?
- Which support files still sound like placeholders?
- Which repeated pattern is weakening multiple lessons?
- Which batch would make the learner experience noticeably better?

That is how the work moved from compliance to usefulness.

## The fix

The batch rhythm became:

1. Pick a course or artifact family.
2. Read several related lessons and example files together.
3. Patch the lesson bodies and support examples in one pass.
4. Run focused gates once for the batch.
5. Fix any wording or render guard immediately.
6. Move to the next course family.

That rhythm kept the work reviewable without pretending every edit needed its own ceremony.

## What teachers can use

When using AI to revise course content, batch by teaching object:

- [ ] Prompt library entries
- [ ] AI verification checklists
- [ ] Standards unpacking rows
- [ ] Resource evaluation sheets
- [ ] Rubric rows
- [ ] Delivery plans
- [ ] Technical evidence logs
- [ ] Safety review checklists
- [ ] Capstone release decisions

Then ask the AI for a batch pass:

> Review these related lessons and examples together. Replace generic artifact language with course-specific samples, filled rows, privacy or source boundaries, and ready/revise/blocked decisions. Keep the learner level appropriate. Do not make release-ready claims without evidence.

That is a much better request than:

> Fix this lesson.

## Final thought

Small edits are useful when the problem is small.

This was not a small problem.

The course got better when the work stopped treating every missing section as an isolated bug and started treating the curriculum as a system of reusable artifacts.

That is the real OpenTeachStack move:

> Build the artifact family, not just the page.

## The Pattern We Are Trying to Break

The dangerous rhythm is not one bad draft. It is accepting a hundred tiny almost-right pages because each one feels too small to stop for.

## Practical Takeaways

- Batch the polish so the same issue is fixed everywhere it appears.
- Keep the change tied to a visible reader problem.
- Stop when the content is clearer, not when every page has the same shape.
