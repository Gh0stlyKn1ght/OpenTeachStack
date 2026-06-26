# OpenTeachStack Content Depth Remediation Report

Date: 2026-06-26  
Owner: Content remediation pass requested from full content audit notes

## Executive summary

The platform is structurally strong and release-ready at the route/content architecture level.
Current highest impact risk is content tone and instructional depth consistency across lesson bodies.

## Weakness pattern observed

The largest issue is repeated lesson-shell language that sounds reusable and generated instead of classroom-specific.

Common repeated phrasing clusters to remove include:

- the decision, the classroom use, the evidence, and the next review step
- another educator can inspect it, reuse it, or challenge it
- choose one concrete classroom material or teacher decision
- created, revised, tested, credited, restricted, published, or archived
- Use one short classroom-safe example

## Courses most affected

1. `ots-101` — required highest priority; front door course needs strongest specificity.
2. `ots-280` — safety playbook is currently too abstract.
3. `ots-301` — needs stronger web publishing case examples.
4. `ots-320` — needs stronger practical AI-agent workflow and review examples.
5. `ots-399` — capstone should force portfolio-level evidence and review.

## Preserved direction

- Keep frontmatter, routes, and module shape unchanged.
- Keep section structure where it already works.
- Rewrite only for teacher-facing specificity and evidence quality.
- Avoid fake depth: every lesson must include concrete context and action.

## Recommended rewrite order

### P0

- `content/courses/ots-101/lessons/**/**/*.mdx`  
  (highest-priority course, foundation quality baseline)

### P1

- `ots-280`, `ots-301`, `ots-320`, `ots-399` lesson sets with strongest repetitive phrasing

### P2

- Add example packets per course in `content/examples/*` for weak/improved/reviewer-note patterns

## Quality standard applied

Apply `docs/LESSON_QUALITY_RUBRIC.md` for each lesson:

- Specificity
- Classroom scenario
- Concrete example + non-example
- Fast teacher action
- Inspectable evidence
- Safety/copyright/accessibility note where relevant
- Reflection tied to artifact

## Blocked items

No full automated scan output was executed in this pass.
Prioritize this after the initial rewrite wave so the report can be replaced with measured counts.
