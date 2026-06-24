# OTS-399 Capstone Studio Outline

Date: 2026-06-22

Status: authored course tranche

Course path: Modern Teacher Systems

Prerequisite: OTS-101 and at least two intermediate or advanced pathway courses

## Course Thesis

The pathway capstone should prove that a teacher can assemble a curriculum system that is usable, maintainable, source-aware, accessible, and safe to share.

OTS-399 should not reward size for its own sake. The finished system should be small enough to understand, complete enough to teach or publish, and documented enough for another educator to review.

## Course Source Material

This outline is backed by the foundations capstone and pathway course outlines:

- `content/lessons/capstone-build-your-mini-course.mdx`
- `docs/OTS_201_COURSE_OUTLINE.md`
- `docs/OTS_220_COURSE_OUTLINE.md`
- `docs/OTS_240_COURSE_OUTLINE.md`
- `docs/OTS_260_COURSE_OUTLINE.md`
- `docs/OTS_280_COURSE_OUTLINE.md`
- `docs/OTS_301_COURSE_OUTLINE.md`
- `docs/OTS_320_COURSE_OUTLINE.md`

## Final Artifact

Published curriculum system

The final artifact should include:

- capstone proposal
- curriculum system map
- artifact index
- technical evidence log
- source and license review
- privacy and accessibility review
- presentation and peer review log
- final release checklist
- maintenance and revision plan

## Chapter Outline

| Chapter | Focus | Source material | Build artifact |
| --- | --- | --- | --- |
| 01. Capstone Scope | Choose a right-sized teaching need and define the evidence required. | `capstone-build-your-mini-course.mdx` | Capstone proposal |
| 02. Curriculum System Assembly | Connect lessons, resources, assessment, delivery, templates, and revision history. | OTS-101 capstone, OTS-201 outline | System map |
| 03. Automation and Tool Evidence | Document what tools and automations do, why they help, and how they were verified. | OTS-220, OTS-320 outlines | Technical evidence log |
| 04. Publishing and Safety Review | Review sources, licenses, privacy, accessibility, public links, and maintenance risks. | OTS-240, OTS-280, OTS-301 outlines | Release safety review |
| 05. Presentation and Peer Review | Explain the system to another teacher and revise from feedback. | OTS-101 peer review and release practices | Presentation and peer review log |
| 06. Published Curriculum System | Assemble the final package with release notes and maintenance plan. | All completed pathway artifacts | Published curriculum system |

## Safety Rules

- Do not include student-identifiable data, private school files, live credentials, or private internal links in the capstone.
- Every borrowed resource needs source, license or terms, and usage notes.
- Every AI-assisted artifact needs prompt, verification, and revision evidence.
- Public sites, repositories, and downloads must pass privacy, accessibility, link, and source checks before sharing.
- Capstone evidence should be reviewable without exposing private teacher or student information.

## Current Route Coverage

The authored course is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-399`
- `/book/ots-399/01-capstone-scope`
- `/book/ots-399/06-published-curriculum-system/06-3`

## Next Content Tasks

1. Keep course-owned lesson bodies aligned with the shared book route and release checks.
2. Keep the capstone proposal, artifact index, technical evidence log, peer review protocol, and final release checklist inside `content/courses/ots-399/templates/`.
3. Keep source references and pathway traceability notes inside the OTS-399 course folder.
4. Use the final release checklist before calling an individual capstone project complete.
