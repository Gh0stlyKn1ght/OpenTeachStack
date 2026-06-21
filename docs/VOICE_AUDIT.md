# Teaching Teachers Voice Audit

Date: 2026-06-20

## Summary

Teaching Teachers has the right structure: a pathway, not one overloaded course. The next improvement is voice and experience. The site should sound less like polished professional development and more like a field-tested teacher-builder system.

Core direction:

**Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve**

This pass did not rewrite lesson bodies. It focused on the safest high-impact surfaces:

- homepage hero and opening promise
- one-day lesson workflow visibility
- non-technical teacher entry point
- About page opening voice
- voice guide for contributors
- light theme warmth
- roadmap priority order

## Area Ratings

| Area | Voice Rating | Notes |
|---|---:|---|
| Homepage | 8/10 | Stronger after this pass. It now names the real problem earlier and elevates the one-day workflow. |
| About page | 8/10 | More human opening. Still could use one or two concrete classroom examples later. |
| Course page | 7/10 | Clear scope, but could use stronger "build this today" cards. |
| Syllabus | 7/10 | Solid and clear, but still reads formal in places. |
| Pathway page | 7/10 | Accurate structure. Needs more "what can wait" reassurance. |
| Safety page | 7/10 | Serious and useful. Next pass should make checks shorter and more classroom-direct. |
| Prompts page | 7/10 | Useful library. Needs more voice around "AI can draft; you still decide." |
| Templates page | 8/10 | Strong infrastructure. Examples will make it more convincing. |
| Resources page | 8/10 | Official source inventory is a major strength. |
| Field notes | 9/10 | Best voice in the repo. The one-day lesson site note is the signature model. |
| OTS-101 lessons | 7/10 | Good structure, uneven voice. Avoid mass rewrite; improve lesson by lesson. |
| Capstone content | 7/10 | Coherent, but should feel more like a teacher assembling proof, not a formal package. |
| README | 8/10 | Stronger after adding signature method and voice guardrail. |

## What Already Sounds Human

- "Built from classroom pressure, not conference theory."
- "This is not a generic ed-tech course."
- The one-day lesson site field note.
- The OTS-101 scope boundary that says code, GitHub, domains, and publishing can wait.
- Template names and evidence requirements.

## What Still Sounds Too Polished

- Some homepage and course sections still summarize the system more than they invite teachers into a first action.
- Some lesson intros sound like clean curriculum copy instead of "here is the real classroom problem."
- The syllabus and pathway pages are accurate but formal.
- Safety guidance is thorough, but several sections could be shorter and sharper.

## Safe Edits Completed

### Homepage Hero

Before direction:

> Willing to learn for the future.

After direction:

> Open-source systems for teachers who need the work to actually hold together.

### Homepage Opening Promise

Added a new early section that names the real problem:

> teachers are expected to build modern curriculum from scattered files, random links, half-remembered templates, AI chats, standards PDFs, and platform logins that do not talk to each other.

### Signature Workflow

Added a homepage section for:

**The One-Day Lesson Site Workflow**

It makes the source-backed survival loop visible before the broader pathway.

### Start Page

Added:

`/start` - Start Here If You Are Not Technical

This page explicitly tells teachers they do not need GitHub, Next.js, DNS, or automation on day one.

### Voice Guide

Added:

`VOICEPRINT.md`

This gives contributors a clear voice standard and a list of phrases to avoid.

## Remaining Pages for Next Voice Pass

1. `src/app/course/page.tsx`
2. `src/app/syllabus/page.tsx`
3. `src/app/pathway/page.tsx`
4. `src/app/safety/page.tsx`
5. `src/app/prompts/page.tsx`
6. `src/app/templates/page.tsx`
7. `content/lessons/what-teaching-teachers-is.mdx`
8. `content/lessons/prompting-for-teachers.mdx`
9. `content/lessons/capstone-build-your-mini-course.mdx`

## Recommended Next Voice Pass

Do one narrow tranche:

1. Add a "Build this today" block to the course/module experience.
2. Add a "Reality check" block to the three highest-traffic lessons.
3. Make the safety page shorter and more classroom-direct.
4. Add one complete sample mini-unit artifact set.

Do not mass-rewrite all lessons. Preserve authored content and improve the voice in small, reviewable passes.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- `/start` returned `200` locally.
- Two sample template downloads returned `200` locally:
  - `/templates/teacher-workflow-audit/download`
  - `/templates/one-day-lesson-site-planner/download`

