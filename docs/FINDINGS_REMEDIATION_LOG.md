# Findings Remediation Log

Last updated: 2026-06-24

This log tracks audit findings that were remediated after `docs/CURRICULUM_MANAGER_AUDIT.md`. It is not a replacement for curriculum review; it records what changed, what passed validation, and what still needs a human-quality content pass.

## Remediation Batch 2026-06-24

| Finding | Priority | Affected files | Fix | Status |
| --- | --- | --- | --- | --- |
| OTS-201 Chapter 01 did not yet function as the model chapter for Workspace Systems. | P0 | `content/courses/ots-201/lessons/01-workspace-system-mindset/01-0.mdx` through `01-5.mdx` | Rewrote the six lesson bodies as concrete Workspace workflow audit lessons with classroom scenarios, model artifacts, learner tasks, verification checklists, and artifact handoff language. Preserved frontmatter and routes. | Fixed |
| Learner-facing checks did not block several generated phrases found by the curriculum audit. | P0 | `scripts/check-learner-facing-content.mjs` | Added bans for repeated audit phrases including `lesson work`, `working item`, `the item supports`, `keep the notes tied to`, `the selected item from this set`, and rendered `artifact update` collisions. | Fixed |
| OTS-220 through OTS-399 contained repeated generic generated wording. | P0 | `content/courses/ots-220/lessons/**/*.mdx`, `content/courses/ots-240/lessons/**/*.mdx`, `content/courses/ots-260/lessons/**/*.mdx`, `content/courses/ots-280/lessons/**/*.mdx`, `content/courses/ots-301/lessons/**/*.mdx`, `content/courses/ots-320/lessons/**/*.mdx`, `content/courses/ots-399/lessons/**/*.mdx`, `scripts/rewrite-remaining-course-lessons.mjs` | Replaced generic fallback language with course-task, classroom-material, teacher-decision, evidence, review, maintenance, and artifact-readiness wording. Regenerated 244 lesson files across the remaining OTS courses. | Fixed |
| Rendered lessons could join headings and body text into banned phrases such as `artifact update`. | P0 | `scripts/check-rendered-course-lessons.mjs`, `scripts/rewrite-remaining-course-lessons.mjs`, regenerated lesson MDX | Kept the rendered-output guard and adjusted generated artifact section wording so the built HTML no longer produces that phrase collision. | Fixed |

## Remediation Batch 2026-06-24 - OTS-201 Chapter 05

| Finding | Priority | Affected files | Fix | Status |
| --- | --- | --- | --- | --- |
| OTS-201 Chapter 05 operations examples were too abstract. | P1 | `content/courses/ots-201/lessons/05-forms-calendar-operations/05-0.mdx` through `05-5.mdx` | Rewrote the chapter around a concrete Forms plus Calendar operations workflow. Added sample exit-ticket questions, intake/reflection questions, response-driven teacher actions, Calendar launch/review/action/closeout events, a completed operations workflow map, peer review prompts, and a checkpoint using sample responses. Preserved frontmatter and routes. | Fixed |
| Chapter 05 needed stronger quality criteria for findability, permissions, versioning, and maintenance. | P1 | `content/courses/ots-201/lessons/05-forms-calendar-operations/05-4.mdx`, `05-5.mdx` | Added access-boundary checks, response Sheet naming, student-versus-teacher access separation, Calendar event link expectations, closeout rules, and status decisions for ready / needs revision / not ready. | Fixed |

## Remediation Batch 2026-06-24 - OTS-201 Chapter 06

| Finding | Priority | Affected files | Fix | Status |
| --- | --- | --- | --- | --- |
| OTS-201 Chapter 06 final artifact lacked a full command-center model. | P1 | `content/courses/ots-201/lessons/06-workspace-command-center/06-0.mdx` through `06-5.mdx` | Rewrote the chapter around a complete Workspace command center with current-unit links, active student links, evidence and tracker links, operations queue, maintenance checklist, revision log, access notes, and a teaching-week walkthrough. Preserved frontmatter and routes. | Fixed |
| Chapter 06 needed stronger review criteria for handoff, access, maintenance, and revision history. | P1 | `content/courses/ots-201/lessons/06-workspace-command-center/06-3.mdx`, `06-4.mdx`, `06-5.mdx` | Added peer-review task checks, status labels, live maintenance queue, access-boundary checks, revision-log expectations, final completion standard, and OTS-201 handoff statement. | Fixed |

## Remediation Batch 2026-06-24 - OTS-201 Chapter 02

| Finding | Priority | Affected files | Fix | Status |
| --- | --- | --- | --- | --- |
| OTS-201 Chapter 02 Drive Architecture needed deeper Workspace-specific examples. | P1 | `content/courses/ots-201/lessons/02-drive-architecture/02-0.mdx` through `02-5.mdx` | Rewrote the chapter around a concrete robotics Drive architecture with course root, active unit, student-facing folder, teacher planning folder, evidence folder, team templates, archive folder, naming patterns, permission rules, archive/version rules, completed map, peer-review prompts, and checkpoint walkthrough. Preserved frontmatter and routes. | Fixed |
| Chapter 02 needed stronger quality criteria for findability, permissions, versioning, and archive behavior. | P1 | `content/courses/ots-201/lessons/02-drive-architecture/02-2.mdx`, `02-3.mdx`, `02-4.mdx`, `02-5.mdx` | Added student-versus-teacher access boundaries, shared-drive responsibility rules, closeout triggers, archive destinations, active/ready/revise/closed/archive labels, and a permission-risk scenario. | Fixed |

## Validation

Commands run after remediation:

| Command | Result |
| --- | --- |
| `npm.cmd run lint` | Passed |
| `npm.cmd run typecheck` | Passed |
| `npm.cmd run check:learner-facing-content` | Passed for 369 course lesson files, 45 course support files, 21 published content files, 25 app MDX files, and 3 book UI files |
| `node scripts/check-course-learner-sense.mjs` | Passed for all 369 lessons |
| `node scripts/check-course-content-uniqueness.mjs` | Passed; 369 release-ready lessons, 0 generated/scaffolded lessons |
| `npm.cmd run check:ots201-reader` | Passed; OTS-201 has 36 release-ready lessons and 0 generated/scaffolded lessons |
| `npm.cmd run build` | Passed; 591 static pages generated |
| `node scripts/check-rendered-course-lessons.mjs` | Passed for 369 rendered lesson routes |
| `npm.cmd run test` | Passed full release check chain |
| `npm.cmd run check:learner-facing-content` after OTS-201 Chapter 05 rewrite | Passed |
| `node scripts/check-course-learner-sense.mjs` after OTS-201 Chapter 05 rewrite | Passed for all 369 lessons |
| `node scripts/check-course-content-uniqueness.mjs` after OTS-201 Chapter 05 rewrite | Passed |
| `npm.cmd run check:ots201-reader` after OTS-201 Chapter 05 rewrite | Passed |
| `npm.cmd run check:learner-facing-content` after OTS-201 Chapter 06 rewrite | Passed |
| `node scripts/check-course-learner-sense.mjs` after OTS-201 Chapter 06 rewrite | Passed for all 369 lessons |
| `node scripts/check-course-content-uniqueness.mjs` after OTS-201 Chapter 06 rewrite | Passed |
| `npm.cmd run check:ots201-reader` after OTS-201 Chapter 06 rewrite | Passed |
| `npm.cmd run check:learner-facing-content` after OTS-201 Chapter 02 rewrite | Passed |
| `node scripts/check-course-learner-sense.mjs` after OTS-201 Chapter 02 rewrite | Passed for all 369 lessons |
| `node scripts/check-course-content-uniqueness.mjs` after OTS-201 Chapter 02 rewrite | Passed |
| `npm.cmd run check:ots201-reader` after OTS-201 Chapter 02 rewrite | Passed |

## Remaining Findings

These items were not completed in this batch and should remain visible for the next remediation pass.

| Finding | Priority | Recommended next action | Status |
| --- | --- | --- | --- |
| OTS-201 Chapters 03-04 still need deeper Workspace-specific examples, especially Docs/Slides delivery and Sheets trackers. | P1 | Continue chapter-by-chapter authoring. Chapters 02, 05, and 06 have been rewritten in this remediation log. | Open |
| OTS-220 needs richer code examples and teacher-safe Apps Script practice. | P1 | Add small, inspectable Apps Script examples with setup, expected output, failure handling, and permissions notes. | Open |
| OTS-399 needs stronger capstone specificity. | P1 | Replace generic capstone language with proposal, system map, evidence log, safety review, peer review, and final release examples. | Open |
| Later courses pass automated gates but still need human curriculum review for depth, pacing, and authenticity. | P2 | Review each course against `docs/CURRICULUM_MANAGER_AUDIT.md` and promote fixes in bounded batches with validation after each batch. | Open |
