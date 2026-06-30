# OTS-101 Curriculum Manager Audit

Date: 2026-06-20

Sequence update: 2026-06-28

This audit predates the OTS-000 teacher tech-stack orientation. Treat its release recommendation as stale until OTS-101 is reviewed as the next course after OTS-000. The current boundary source is `OTS_000_TO_OTS_101_ALIGNMENT.md`.

Course: OTS-101 Teaching Teachers Foundations

Audience: classroom teachers, CTE/STEM teachers, robotics and computer science educators, club advisors, department leads, and teacher-creators who want practical curriculum systems with AI, source verification, Google Workspace planning, assessment, and classroom delivery.

## Executive Summary

OTS-101 is a strong release candidate, not a finished v1. The course has a clear purpose, a practical teacher-builder voice, a scoped 10-module pathway, a useful capstone, a verified Source Bank, and a template system that produces real artifacts.

The main risk is not missing content volume. The main risk is reviewer evidence. A district, department, or program reviewer will look for standards-to-assessment traceability, performance-leveled rubric criteria, accessibility/UDL supports, and a maintenance workflow for source links.

Original recommendation: revise, then ship. Current sequence-aware recommendation: review OTS-101 as the sequel to OTS-000 before release. Do not expand OTS-101 into GitHub, Apps Script, domains, course-site publishing, or AI coding agents.

Original readiness score: 8.4 / 10. Current readiness is draft pending OTS-000 alignment review and human classroom review.

## Scorecard

| Category | Score | Rationale | Evidence | Priority Fix |
| --- | ---: | --- | --- | --- |
| Course purpose clarity | 9 | The course clearly defines itself as foundations, not a full technical pathway. | `src/lib/metadata.ts`, README scope section | Keep the purpose language consistent. |
| Audience fit | 8 | Strong fit for teacher-builders and CTE/STEM educators; some AI/tool comfort is assumed. | Syllabus audience and prerequisites | Add beginner fallback notes where tools appear. |
| Scope control | 8 | Advanced topics are correctly pushed to later pathway courses. | Capstone "What Is Not Required" section | Keep advanced content future/draft. |
| Standards alignment | 7 | Standards workflow is taught, but OTS-101 needs visible traceability evidence. | Standards lesson and syllabus table | Maintain the traceability table in syllabus/audit. |
| Learning outcomes quality | 7 | Outcomes are mostly measurable, but several are broad course-level statements. | Syllabus outcomes | Tie outcomes to module evidence. |
| Module sequencing | 8 | Sequence follows Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve. | 10-module metadata structure | Preserve the current order. |
| Lesson quality | 7 | Lessons have useful voice and artifacts; CFUs and non-examples are uneven. | Active MDX lessons | Add targeted checks in later polish passes. |
| Activity quality | 7 | Build tasks are practical and artifact-based. | Templates and lesson build prompts | Add more examples of finished artifacts. |
| Assessment quality | 7 | Capstone, peer review, and artifact checks exist. | Capstone and audit page | Add more explicit evidence expectations. |
| Rubric quality | 7 | Capstone rubric now has performance levels, but needs classroom trial feedback. | Capstone rubric | Revalidate after pilot use. |
| Resource quality | 8 | Source Bank is a major strength. | `src/lib/sourceBank.ts` and `/kb/source-bank` | Keep verification workflow current. |
| Accessibility | 7 | Accessibility is present in the release check, capstone checklist, and delivery expectations. | Syllabus, audit, capstone checks, accessibility release check | Re-run sequence-aware accessibility review before launch. |
| Differentiation | 6 | Beginner orientation exists, but accommodations and extensions are light. | Syllabus and templates | Add support/extension examples. |
| Safety/privacy/copyright | 8 | Strong throughline, especially AI verification, Source Bank, and licensing checks. | Safety guide, capstone, templates | Add lesson-level reminders where thin. |
| Technology fit | 8 | OTS-101 does not require coding, domains, GitHub, or automation. | Syllabus out-of-scope section | Keep device/account assumptions visible. |
| Teacher usability | 8 | Templates, release packet, source bank, and audit page are useful. | `/templates`, `/course/release`, `/course/audit` | Add sample completed packet links as examples grow. |
| Learner usability | 7 | Path is visible, but submission expectations need tightening. | Syllabus and capstone | Add a final submission checklist. |
| Engagement | 7 | Practical artifact-building is engaging for the right audience. | Module build artifacts | Add more real examples and non-examples. |
| Capstone quality | 8 | Right-sized, useful, and aligned to the course purpose. | Capstone lesson | Pilot and revise rubric language. |
| Sustainability | 7 | Source Bank and docs help; update rhythm must be enforced. | Source maintenance doc | Schedule link review cadence. |
| Overall readiness | 8.4 | Original audit saw the course as near release, but this score predates OTS-000. | Full course pass | Re-score after OTS-000 sequence and human review. |

## Curriculum Architecture

Strengths:

- The course title and subtitle are clear.
- The thesis is practical and distinct from generic ed-tech PD.
- The 10-module sequence is coherent.
- The capstone is correctly scoped as a mini-unit system.
- Advanced technical topics are separated into later pathway courses.

Weaknesses:

- The course still needs a final public-release readiness gate after accessibility and traceability checks.
- Module 07 introduces Google Workspace as infrastructure, but OTS-101 should keep this as planning, not automation.
- Some lessons rely on global safety language instead of local lesson-level checks.

Do not move into OTS-101:

- Apps Script implementation
- GitHub workflows
- Domains and DNS
- Next.js/Docusaurus publishing
- AI coding agents
- Full video production

## Standards Alignment Audit

OTS-101 does not claim alignment to a single state standard set. That is appropriate because the course serves educators across subjects and states. The course should instead maintain a course-outcome traceability model and teach users how to connect their own state, district, or subject standards to their mini-unit.

| Standard / Outcome | Learning Target | Lesson/Activity | Assessment Evidence | Alignment Strength | Fix Needed |
| --- | --- | --- | --- | --- | --- |
| OTS-101 outcome: build systems, not collect tools | Explain the difference between scattered tools and a curriculum workflow | Module 01 lessons and Teacher Workflow Audit | Completed workflow audit | Strong | Add more finished examples over time. |
| OTS-101 outcome: prompt responsibly | Write reusable prompts with context, constraints, and revision notes | Module 02 and Prompt Library | Prompt library with accepted/rejected output notes | Strong | Keep examples current as AI tools change. |
| OTS-101 outcome: verify AI output | Check AI claims, citations, bias, privacy, and standards claims | Module 03 and AI Verification Checklist | Documented review of one AI-assisted artifact | Strong | Add sample poor AI output and revised version. |
| OTS-101 outcome: unpack standards | Convert real standards into targets and assessment evidence | Module 04 and Standards Unpacking Sheet | Three unpacked standards or outcomes | Moderate | Require standard source link in final package. |
| OTS-101 outcome: design mini-unit architecture | Sequence 3 to 5 lessons with targets, activities, resources, and checks | Module 05 and Mini-Unit Map | Mini-unit map and lesson template | Strong | Add non-example of overstuffed mini-unit. |
| OTS-101 outcome: evaluate resources | Judge credibility, license, accessibility, privacy, and alignment | Module 06 and Resource Evaluation Sheet | Five reviewed resources | Strong | Keep Source Bank verification workflow current. |
| OTS-101 outcome: organize planning systems | Map Drive, Docs, Sheets, Forms, or Slides into a usable planning system | Module 07 and Workspace Planning Map | Workspace map for mini-unit artifacts | Moderate | Keep implementation lightweight. |
| OTS-101 outcome: assess learning | Draft an assessment and rubric tied to a target | Module 08 and Assessment/Rubric Template | One assessment task and rubric | Strong | Pilot rubric for clarity. |
| OTS-101 outcome: prepare delivery | Write student-facing directions, pacing, checks, feedback, and backup plan | Module 09 and Delivery Plan | Delivery plan and optional one-day lesson site plan | Strong | Add alternate submission options. |
| OTS-101 outcome: assemble capstone | Build and revise a complete mini-unit package | Module 10 and capstone rubric | Final package plus revision log | Strong | Use audit/release packet before publishing. |

## Learning Outcomes Audit

Strong outcomes:

- Verify AI output for accuracy, bias, privacy, citations, and standards claims.
- Unpack standards into learning targets and assessment evidence.
- Evaluate resources for quality, licensing, accessibility, and alignment.
- Draft assessments, rubrics, and feedback loops tied to learning targets.

Needs tightening:

- "Use Google Workspace as a planning system" should stay planning-focused in OTS-101 and move automation into OTS-201/OTS-220.
- "Assemble and revise a complete mini-unit capstone" should name required evidence: sources, assessment, safety, delivery, and revision.

## Lesson Quality Audit

| Lesson Type | Strength | Weakness | Missing Element | Revision Priority |
| --- | --- | --- | --- | --- |
| Mindset lessons | Clear voice and purpose | Can lean conceptual | More non-examples | P2 |
| Prompting lessons | Practical teacher workflow | Tool behavior can date quickly | Current official docs review cadence | P1 |
| Verification lessons | Strong safety purpose | Needs more sample bad output | Before/after examples | P1 |
| Standards lessons | Strong warning against standards-copy | No universal standard set, correctly | Traceability table | P0 complete |
| Resource lessons | Strongest evidence system | Requires maintenance | Update workflow | P0 complete |
| Workspace lessons | Practical organization | Risk of drifting into automation | Clear OTS-201 boundary | P2 |
| Assessment lessons | Observable criteria emphasized | Rubric levels need piloting | Example completed rubric | P1 |
| Delivery lessons | Good classroom-pressure voice | Needs alternate submission options | UDL delivery options | P1 |
| Capstone | Right scope | Needs pilot evidence | Student/teacher samples | P2 |

## Assessment and Capstone Audit

Capstone readiness score: 8 / 10

Strengths:

- The capstone is small enough to finish.
- It produces artifacts teachers can reuse.
- It requires sources, standards, assessment, delivery, safety, and revision evidence.
- It does not require a public website or coding.

Risks:

- Rubric needs classroom trial feedback.
- Final submission expectations should be more explicit for independent learners.
- Peer review will work best with an example packet.

Recommended rubric categories:

- Standards alignment
- Curriculum architecture
- Resource literacy
- AI workflow
- Assessment quality
- Delivery readiness
- Safety and accessibility
- Reflection and revision

## Resource Quality Audit

| Resource System | Use | Credibility | License/Terms Known? | Risk | Action |
| --- | --- | --- | --- | --- | --- |
| Source Bank | Shared verified link inventory | Strong | Mixed by item; notes included | Links can drift | Recheck on release and quarterly. |
| Official Sources page | Software/platform docs inventory | Strong | Official docs | Docs change over time | Keep per-course sources updated. |
| Templates | Capstone artifacts | Strong | Project content license | Future Google Doc links could be fake if added early | Keep only real downloads. |
| Safety Guide | Privacy/copyright/AI guardrails | Strong | Original course content | Needs periodic policy review | Revisit during v1. |
| Sample robotics mini-unit | Example artifact | Useful | Needs ongoing review | Could become stale | Keep labeled as sample. |

## Accessibility and UDL Audit

Strengths:

- Accessibility is named in syllabus, capstone, audit, templates, and source evaluation.
- The site uses semantic headings and readable lesson pages.
- The capstone requires accessibility/privacy/copyright checks.

Barriers:

- Alternate submission methods are not yet explicit enough.
- Captions/transcripts expectations for media should be named.
- Image/diagram alt-text expectations should be tied to final package review.
- UDL supports and extension paths should be more visible in lesson templates and delivery planning.

Required fixes before v1:

- Run a WCAG 2.1 AA audit.
- Add alternate submission expectations to delivery/capstone materials.
- Add captions/transcripts and alt-text language where media appears.

## Safety, Privacy, Copyright, and Ethics Audit

Strengths:

- AI output is treated as draft material, not authority.
- Student-identifiable information warnings are present.
- Source Bank requires privacy and age notes.
- Copyright/licensing appears in resource and capstone work.

Remaining risks:

| Risk | Likelihood | Impact | Evidence | Mitigation | Priority |
| --- | --- | --- | --- | --- | --- |
| AI hallucinated citations | Medium | High | AI verification lessons and capstone warn about this | Require source checks in every final artifact. | P1 |
| Weak standards alignment | Medium | High | Standards-copy warning exists | Maintain traceability table. | P0 |
| Tool privacy/account risk | Medium | High | Source Bank notes account/privacy | Require district policy check before student use. | P1 |
| Copyright misuse | Medium | Medium | CC lesson exists | Require license/terms note in resource sheet. | P1 |
| Broken links | Medium | Medium | Source Bank is link-heavy | Run link check before release and quarterly. | P1 |
| Teacher overwhelm | Medium | Medium | Course covers many workflow domains | Keep capstone small and advanced topics out. | P1 |

## Revision Roadmap

P0 complete in this pass:

- Add curriculum-manager audit artifact.
- Add Source Bank maintenance workflow.
- Add standards/outcome traceability table.
- Upgrade capstone rubric to leveled criteria.
- Remove overclaim that OTS-101 is fully finalized.

P1 before any public release:

- Run formal browser-based WCAG 2.1 AA accessibility audit or equivalent internal browser pass.
- Add one completed example packet or annotated exemplar.
- Add more alternate submission examples after pilot feedback.

P2 polish:

- Add non-examples for weak prompts, weak standards alignment, weak resource selection, and weak rubrics.
- Add reading progress and mobile navigation pass.
- Add social metadata for core pages.

P3 future:

- Google Docs/Sheets template pack after real files exist.
- Community capstone gallery.
- Course-specific advanced pathway extraction.

## Final Recommendation

Original recommendation: ship the first public foundations release, then continue polish.

Current sequence-aware recommendation: keep OTS-101 in draft until the OTS-000-to-OTS-101 alignment review confirms the course no longer acts like the first orientation course.

Top 5 fixes:

- Keep OTS-101 scoped as foundations.
- Maintain the standards/outcomes traceability table.
- Keep the capstone rubric leveled.
- Run accessibility/UDL audit before v1.
- Maintain Source Bank verification on a schedule.

Do not change:

- The 10-module foundations structure.
- The mini-unit capstone.
- The Source -> Prompt -> Build -> Verify -> Teach -> Archive -> Improve method.
- The beginner boundary that keeps GitHub, domains, Apps Script, publishing, and coding agents out of OTS-101.

What makes this a 9/10 course:

- A completed sample capstone packet.
- Formal browser accessibility audit evidence.
- One or two classroom-tested examples.
- Maintained Source Bank verification logs.
- More non-examples showing what weak curriculum artifacts look like.

