---
name: ots-course-audit
description: Audit OpenTeachStack course content for scaffold masquerading as instruction, unresolved placeholders, unverified CLI claims, stale sources, and contradictory readiness metadata.
---

# OTS Course Audit

Use this skill before calling an OTS-320 chapter or course ready for human review.

## Content failure checks

Flag:

- `${richContent}` or unresolved placeholders
- `generationSource: scaffold` presented as authored content
- repeated generic lesson bodies
- activity without explanation/modeling
- unexplained command blocks
- copied template prose
- provider claims without source provenance
- commands not verified against official docs
- synthetic transcripts not labeled `emulated`
- release/readiness metadata that contradicts actual content

## Quality questions

1. What does the learner understand after reading this?
2. What mechanism is actually explained?
3. What evidence does the learner inspect?
4. What artifact does the learner create or improve?
5. Is provider behavior sourced?
6. Is the safety boundary specific?
7. Could this lesson work unchanged in any random course? If yes, it is probably too generic.

## Metadata rule

Do not mark human-reviewed, beta, release-ready, enriched, or public based on file count, route completeness, or passing structure checks.

## CI use

This audit may expose provider-agnostic CI checks for objective failures such as placeholders or missing provenance. Human instructional quality remains a human review decision. Do not implement GitHub Actions or Vercel automation.
