# OpenTeachStack Educator Learner Audit

Date: 2026-06-24

Status: Historical pre-remediation snapshot. Use this audit to understand the
original learner-facing issues; use `docs/STUDENT_LEARNER_FACING_AUDIT.md`,
`docs/COURSE_LEARNER_FACING_REVIEW.md`, and the current verification commands
for the active release state.

Audit stance: educator learner, curriculum reviewer, and instructional coach. This first pass checks whether the courses teach a real teacher enough to complete the promised artifact, not just whether routes render.

Scope audited:

- Course book structure for all nine pathway courses.
- `content/courses/*/course.json` for thesis, chapters, lesson counts, and artifacts.
- `content/courses/*/lessons/**/*.mdx` for lesson status, body pattern, example density, checkpoints, artifact connection, and generated/scaffolded indicators.
- Repeated generated-language markers requested in the brief.

This pass does not modify course content.

## Executive Summary

- Overall pathway grade: 68/100.
- Strongest course: OTS-260 AI Media and Lesson Delivery. It is fully authored, coherent, practical, and close to release-ready.
- Weakest course: OTS-399 Capstone Studio. It is 100 percent `migrationStatus: generated`, has no example count signal, and is the final course in the pathway, so the risk is amplified.
- Biggest content risk: The public roadmap says all courses are fully authored, but the course lesson files show many visible lessons still marked `generated`.
- Biggest delivery risk: Several courses use repeated "Core Idea / Do This / Evidence / Checkpoint" shells that tell teachers to act but do not model the action enough.
- Biggest enrichment opportunity: Add concrete teacher examples, filled artifacts, before/after revisions, and decision rules to the generated-heavy courses.

## Course Grade Table

| Course | Overall | Enrichment | Delivery | Artifact Quality | Release Readiness | Verdict |
|---|---:|---:|---:|---:|---:|---|
| OTS-101 Teaching Teachers Foundations | 62 | 58 | 62 | 70 | 55 | Not release-ready as a full course; only Chapter 01 has authored depth. |
| OTS-201 Google Workspace Systems for Teachers | 73 | 68 | 72 | 76 | 70 | Usable shell with one strong authored chapter; needs enrichment for Ch. 02-06. |
| OTS-220 Apps Script for Teacher Automation | 78 | 72 | 78 | 82 | 76 | Stronger because workshops are authored; generated concept lessons need examples/code. |
| OTS-240 Open Resources and GitHub for Educators | 76 | 70 | 76 | 80 | 74 | Practical workshop spine, but generated concept lessons weaken trust and depth. |
| OTS-260 AI Media and Lesson Delivery | 86 | 82 | 86 | 88 | 86 | Strong but still needs more filled examples and media artifacts before excellent. |
| OTS-280 Cyber Safety for Educators | 66 | 62 | 66 | 72 | 58 | Important and useful, but mostly generated except account hygiene chapter. |
| OTS-301 Teacher Course Sites | 82 | 78 | 82 | 84 | 82 | Coherent and fully authored, though examples need to become less generic. |
| OTS-320 AI Coding Agents for Educators | 80 | 72 | 80 | 84 | 80 | Strong safety/workflow spine, but repetitive phrasing and no example signal hurt enrichment. |
| OTS-399 Capstone Studio | 55 | 50 | 55 | 62 | 45 | Final capstone should not ship while every lesson is generated. |

## Course-by-Course Findings

### OTS-101 - Teaching Teachers Foundations

Overall grade: 62
Enrichment: 58
Delivery: 62
Release readiness: 55
Verdict: Structurally present, but not instructionally release-ready as the flagship foundations course.

Evidence:

- Lesson files: 89 total.
- Status: 3 authored, 86 generated, 0 scaffolded.
- Average lesson length: about 342 words.
- Example signal: only 1 detected example/scenario term across the course body scan.
- Strong authored island: `/book/ots-101/01-teacher-builder-mindset/01-3`, `/01-4`, `/01-5`.

Strengths:

- Course purpose is correct: teachers need systems, prompts, verification, resources, assessment, delivery, and a capstone.
- Chapter sequence is logical for a beginner.
- Artifact sequence is good: workflow audit, prompt library, verification checklist, standards sheet, mini-unit map, resource sheet, delivery plan, capstone.
- The authored Chapter 01 sections show the voice the whole course should use.

Major weaknesses:

- Most public lessons are marked `migrationStatus: generated`.
- The generated lessons often explain the section as "one concrete teacher move" but do not show the move with a classroom example.
- The foundations course should be the most teacher-friendly course, but many lessons are thin and procedural.
- Build tasks exist in title but often need filled sample artifacts and teacher-facing criteria.

Top 5 fixes:

1. Author OTS-101 Chapters 02-10 by hand before calling the foundations course released.
2. Add one filled teacher example to every concept lesson.
3. Add a visible "what you should have after this lesson" artifact box to every build-task lesson.
4. Replace generic chapter checkpoints with artifact-specific self-checks.
5. Add before/after examples for prompt revision, standards unpacking, rubric criteria, and delivery planning.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-101/01-teacher-builder-mindset/01-0` to `/01-2` and `/01-6` | generated-feeling | Chapter framing and checkpoint are still generated while nearby sections are authored. | Rewrite to match the authored 01-3 to 01-5 voice. |
| `/book/ots-101/02-prompting/*` | generated-feeling | Whole prompting chapter is generated, including the prompt library build task. | Add bad/good prompt examples, revision notes, and a completed five-prompt library. |
| `/book/ots-101/03-ai-literacy-verification/*` | generated-feeling | Important safety chapter is all generated. | Add AI output samples, hallucination checks, bias checks, privacy examples, and a completed checklist. |
| `/book/ots-101/04-standards-to-learning-targets/*` | generated-feeling | Standards lessons need concrete standards examples and unpacking demonstrations. | Use one real or sample standard across the chapter and show each transformation. |
| `/book/ots-101/05-course-and-unit-architecture/*` | generated-feeling | Architecture concepts are named but not modeled enough. | Add mini-unit examples, non-examples, sequence map, and one completed lesson outline. |
| `/book/ots-101/06-resource-discovery-open-resources/*` | generated-feeling | Resource literacy needs source comparison and licensing examples. | Add side-by-side official/OER/blog/resource checks and attribution examples. |
| `/book/ots-101/07-google-workspace-planning-systems/*` | generated-feeling | Workspace planning belongs in foundations but is thin. | Add a sample folder map, Docs template, Sheet tracker, and Form use case. |
| `/book/ots-101/08-assessment-rubrics-feedback/*` | generated-feeling | Assessment needs observable criteria examples. | Add weak vs strong rubric rows and formative check examples. |
| `/book/ots-101/09-delivery-planning/*` | generated-feeling | Delivery planning needs real classroom timing and backup plans. | Add 45-minute and block-period variants plus tech-failure alternatives. |
| `/book/ots-101/10-mini-unit-capstone/*` | generated-feeling | Capstone is generated, so the final integration does not yet prove mastery. | Add a complete sample capstone packet and review rubric. |

Recommended next action: Fix OTS-101 after OTS-399 if the priority is launch integrity; otherwise fix it first if the homepage points new users straight into foundations.

### OTS-201 - Google Workspace Systems for Teachers

Overall grade: 73
Enrichment: 68
Delivery: 72
Release readiness: 70
Verdict: Usable but uneven. Chapter 01 is strong; Chapters 02-06 read generated.

Evidence:

- Lesson files: 36 total.
- Status: 6 authored, 30 generated.
- Repeated phrase hits include "turns this architecture focus into one practical teacher move", "Identify the concrete teacher problem connected to", and "Record what a colleague could inspect next".
- Chapter 01 has a clear teacher problem and practical workflow audit.

Strengths:

- The course has a strong purpose: turn Google Workspace into an operating system, not a tool pile.
- Artifacts are practical and teacher-owned.
- Chapter 01 models the right instructional voice.

Major weaknesses:

- Drive, Docs/Slides, Sheets, Forms/Calendar, and Command Center chapters are generated.
- Teachers need visual examples of folders, trackers, templates, naming conventions, and permissions.
- The repeated generated language makes the later chapters feel like placeholders.

Top 5 fixes:

1. Author Chapters 02-06.
2. Add screenshots or text mockups for folder trees, trackers, and command centers.
3. Add privacy/permission scenarios for shared drives and student files.
4. Add a completed Workspace command center example.
5. Replace generic checkpoints with inspectable artifact criteria.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-201/01-workspace-system-mindset/*` | strong | Authored, clear, teacher-problem based. | Use as the model for the rest of the course. |
| `/book/ots-201/02-drive-architecture/*` | generated-feeling | Repeated architecture phrasing; not enough folder examples. | Add sample Drive hierarchy, naming rules, and permission mistakes. |
| `/book/ots-201/03-docs-slides-delivery/*` | generated-feeling | Needs real reusable Docs/Slides template examples. | Add completed teacher directions doc and slide routine. |
| `/book/ots-201/04-sheets-curriculum-trackers/*` | generated-feeling | Does not show enough sheet structure. | Add sample columns, formulas-lite, filters, and review routine. |
| `/book/ots-201/05-forms-calendar-operations/*` | generated-feeling | Needs operational scenarios. | Add quiz/intake/reflection form examples and calendar maintenance routine. |
| `/book/ots-201/06-workspace-command-center/*` | generated-feeling | Final artifact needs more specificity. | Add a complete command center checklist and peer review. |

Recommended next action: Author one chapter at a time, starting with Drive Architecture.

### OTS-220 - Apps Script for Teacher Automation

Overall grade: 78
Enrichment: 72
Delivery: 78
Release readiness: 76
Verdict: Stronger than most because workshops are authored, but generated concept lessons weaken the learning bridge.

Evidence:

- Lesson files: 31 total.
- Status: 18 authored, 13 generated.
- Repeated phrase hits include "Use this section to apply the chapter logic".
- Workshop/build sections are authored and create a usable backbone.

Strengths:

- The artifact path is practical: candidate list, custom menu, folder generator, docs from rows, reminder emails, automation toolkit.
- The course respects safety boundaries and rollback.
- Workshops make the course feel usable.

Major weaknesses:

- Some concept lessons introduce Apps Script ideas without enough code examples or teacher-friendly mental models.
- Generated lessons tell teachers to apply logic but do not always explain the logic.
- It needs more "read this code" moments before "build this script" moments.

Top 5 fixes:

1. Author all generated concept lessons.
2. Add minimal runnable code snippets for each Apps Script concept.
3. Add "what can go wrong" boxes for permissions, triggers, quotas, and bad data.
4. Add fake-data test cases for every automation.
5. Add one completed automation toolkit example.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-220/*/*-0`, workshop routes, and checkpoints | usable to strong | Authored spine is present. | Keep structure, enrich with examples. |
| `/book/ots-220/01-automation-mindset/01-1` to `/01-2` | generated-feeling | Foundational safety concepts are generated. | Add concrete examples of bad process vs automatable routine. |
| `/book/ots-220/02-apps-script-basics/02-1` to `/02-3` | generated-feeling | Basics need explicit code and screenshots/steps. | Add editor walkthrough, function/log/error examples, and permission explanation. |
| `/book/ots-220/03-folder-file-generators/03-1` to `/03-2` | generated-feeling | DriveApp and idempotency need examples. | Add sample folder script and duplicate-prevention rule. |
| `/book/ots-220/04-docs-from-sheet-rows/04-1` to `/04-2` | generated-feeling | Sheets/templates need concrete schema. | Add sample row, placeholder document, and generated output. |
| `/book/ots-220/05-forms-email-reminders/05-1` to `/05-2` | generated-feeling | Forms/email safety needs policy detail. | Add safe reminder example and rate-limit/privacy checks. |
| `/book/ots-220/06-teacher-automation-toolkit/06-1` to `/06-2` | generated-feeling | Review/handoff needs an example checklist. | Add a completed script review and handoff note. |

Recommended next action: Keep release label as "beta" until generated concept lessons have code examples.

### OTS-240 - Open Resources and GitHub for Educators

Overall grade: 76
Enrichment: 70
Delivery: 76
Release readiness: 74
Verdict: Practical and coherent, but concept lessons need stronger examples and less generated phrasing.

Evidence:

- Lesson files: 30 total.
- Status: 18 authored, 12 generated.
- Repeated phrase hits include "Use this section to apply the chapter logic".
- Authored workshops are the strongest parts.

Strengths:

- Course belongs in the pathway.
- Teacher artifacts are useful: decision log, curriculum repo, README, review log, attribution/license file, release checklist.
- GitHub is framed as documentation and sharing, not developer cosplay.

Major weaknesses:

- Generated concept lessons cover the exact topics where teachers need clarity: free/open/allowed, repos/commits/branches, licenses, README setup, PR review.
- Needs sample repository files and bad/good attribution examples.
- GitHub vocabulary needs more beginner scaffolding.

Top 5 fixes:

1. Author all generated vocabulary/concept lessons.
2. Add a sample curriculum repository tree.
3. Add weak vs strong README examples.
4. Add license/attribution decision scenarios.
5. Add a mock pull request review with comments.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-240/*/*-0`, workshops, and checkpoints | usable | Authored spine is practical. | Add more filled examples. |
| `/book/ots-240/01-open-resource-mindset/01-1` to `/01-2` | generated-feeling | License concepts need concrete cases. | Add "free but not open", "open but attribution required", and "not allowed" examples. |
| `/book/ots-240/02-github-foundations/02-1` to `/02-2` | generated-feeling | GitHub vocabulary can confuse teachers. | Add repo/file/commit/branch diagram and teacher analogy. |
| `/book/ots-240/03-writing-readmes/03-1` to `/03-2` | generated-feeling | README lessons need before/after models. | Add sample README sections. |
| `/book/ots-240/04-contribution-review/04-1` to `/04-2` | generated-feeling | PR/review is abstract. | Add mock issue and PR review. |
| `/book/ots-240/05-publishing-attribution/05-1` to `/05-2` | generated-feeling | Attribution/licensing needs decision rules. | Add citation/license examples. |
| `/book/ots-240/06-open-curriculum-repository/06-1` to `/06-2` | generated-feeling | Release/maintenance planning needs a finished checklist. | Add sample release packet and maintenance rhythm. |

Recommended next action: Author concept lessons and add a full sample repo artifact.

### OTS-260 - AI Media and Lesson Delivery

Overall grade: 86
Enrichment: 82
Delivery: 86
Release readiness: 86
Verdict: Strong and close to release-ready.

Evidence:

- Lesson files: 30 total.
- Status: 30 authored, 0 generated.
- No requested repeated phrase hits.
- Good practical focus: media purpose, accessibility, AI image review, diagrams, slides, video, packet.

Strengths:

- Clear teacher judgment: media as explanation, not decoration.
- Strong artifact progression.
- Accessibility is present early and repeatedly.
- Lessons feel teachable and self-study friendly.

Major weaknesses:

- Needs more actual visual examples or linked sample artifacts.
- Example/scenario signal is still low for a media course.
- Some lessons may still be too short for teachers who have never built diagrams or video scripts.

Top 5 fixes:

1. Add one filled media purpose map.
2. Add one reviewed AI image prompt log.
3. Add one diagram set example.
4. Add one delivery deck outline.
5. Add one short video script with caption/transcript example.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-260/*` | usable to strong | Fully authored and coherent. | Enrich with visible sample artifacts. |
| `/book/ots-260/02-ai-image-workflows/*` | usable | Needs stronger bias/accuracy examples. | Add prompt/output/review comparison. |
| `/book/ots-260/03-diagrams-visual-explanations/*` | usable | Needs actual diagram examples. | Add Mermaid/text diagram examples. |
| `/book/ots-260/05-short-video-screen-recording/*` | usable | Needs sample script/caption/transcript. | Add complete short video plan. |

Recommended next action: Keep as a model course, then add exemplar artifacts.

### OTS-280 - Cyber Safety for Educators

Overall grade: 66
Enrichment: 62
Delivery: 66
Release readiness: 58
Verdict: High-value course, but not release-ready as a teacher-facing safety course because most lessons are generated.

Evidence:

- Lesson files: 63 total.
- Status: 7 authored, 56 generated.
- Only Chapter 02 Account Hygiene and MFA is authored.
- Average lesson length: about 328 words.

Strengths:

- The course belongs in the pathway and addresses real educator risk.
- Chapter list is practical and well sequenced.
- Chapter 02 shows that the course can work when authored.
- Artifacts are relevant: risk map, MFA checklist, identity map, profile audit, website audit, incident plan.

Major weaknesses:

- Cyber safety requires precision, examples, and boundaries; generated lessons are not enough.
- Important topics like doxxing, phishing, VPNs, public repos, domain privacy, and incident response need concrete scenarios.
- Lessons need stronger "what not to do" and escalation guidance.
- A generated cyber lesson can sound confident while omitting policy nuance.

Top 5 fixes:

1. Author all generated chapters, starting with threat modeling and phishing.
2. Add teacher-specific incident scenarios.
3. Add redacted examples of risky public profiles, repo leaks, and unsafe contact patterns.
4. Add district escalation boundaries and "do not investigate alone" notes.
5. Add completed private-use checklists with fake data.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-280/02-account-hygiene-mfa/*` | strong | Authored and practical. | Use as voice model. |
| `/book/ots-280/01-teacher-threat-model/*` | generated-feeling | Core safety framing is generated. | Add realistic teacher threat model examples. |
| `/book/ots-280/03-usernames-identity-separation/*` | generated-feeling | Needs real discoverability examples. | Add username reuse audit and separation map. |
| `/book/ots-280/04-email-phishing-impersonation/*` | generated-feeling | Phishing needs examples and escalation flow. | Add sample phishing messages and reporting routine. |
| `/book/ots-280/05-social-media-doxxing/*` | generated-feeling | Doxxing risk needs nuance and caution. | Add public-profile audit examples and safe redaction guidance. |
| `/book/ots-280/06-vpns-wifi-location/*` | generated-feeling | VPN lesson risks oversimplification. | Add "VPN does/does not protect" table. |
| `/book/ots-280/07-browser-device-file-safety/*` | generated-feeling | Device/browser safety needs screenshots/checklists. | Add extension permission and metadata examples. |
| `/book/ots-280/08-website-safety/*` | generated-feeling | Website risks need concrete teacher-site examples. | Add unsafe/safe contact, form, embed, analytics patterns. |
| `/book/ots-280/09-github-domains-repos/*` | generated-feeling | Public repo/domain exposure needs precision. | Add secret scanning, commit history, WHOIS privacy examples. |
| `/book/ots-280/10-incident-response/*` | generated-feeling | Incident response must not be generic. | Add escalation roles, documentation boundaries, and safety-first steps. |

Recommended next action: Treat as not release-ready until the generated safety chapters are authored.

### OTS-301 - Teacher Course Sites

Overall grade: 82
Enrichment: 78
Delivery: 82
Release readiness: 82
Verdict: Coherent and usable, but still needs exemplar site artifacts.

Evidence:

- Lesson files: 30 total.
- Status: 30 authored, 0 generated.
- No requested repeated phrase hits.
- Strong source/reference signal.

Strengths:

- Course belongs naturally after OTS-240.
- Good sequence: strategy, web basics, hub structure, accessibility/safety, deployment, maintenance, published hub.
- Artifacts are practical and inspectable.
- Safety and accessibility are included.

Major weaknesses:

- The course needs more actual sample pages, sitemap examples, and publishing screenshots.
- Teachers new to web concepts may need slower "what is happening" explanations.
- DNS/domain/hosting concepts can still be intimidating without diagrams.

Top 5 fixes:

1. Add a complete sample course hub sitemap.
2. Add one sample homepage, course page, and resource page.
3. Add a DNS/domain concept diagram.
4. Add broken-link and privacy QA examples.
5. Add a published hub release checklist example.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-301/*` | usable to strong | Fully authored and coherent. | Add exemplars and diagrams. |
| `/book/ots-301/02-web-basics/*` | usable | Hard concepts need more beginner scaffolding. | Add diagrams for static files, hosting, DNS, and domains. |
| `/book/ots-301/05-deployment-maintenance/*` | usable | Needs deployment-specific walkthrough examples. | Add GitHub Pages/Vercel/Cloudflare comparison and maintenance routine. |

Recommended next action: Add exemplar artifacts after generated-heavy courses are fixed.

### OTS-320 - AI Coding Agents for Educators

Overall grade: 80
Enrichment: 72
Delivery: 80
Release readiness: 80
Verdict: Strong structure and safety framing, but it reads formulaic and lacks enough concrete examples.

Evidence:

- Lesson files: 30 total.
- Status: 30 authored, 0 generated.
- Repeated phrase hits: "A privacy and safety note is attached" appears across many lessons.
- Example signal: 0 detected example/scenario terms in the scan.

Strengths:

- The course has the right safety posture: agents do not own teacher judgment.
- The artifact path is practical: safety checklist, diff review, safe prompt, test checklist, small tool, reviewed build.
- It teaches version control, scope, testing, and review as professional habits.

Major weaknesses:

- "Authored" status does not fully remove generated feel; repeated safety-note phrasing appears across the course.
- Needs prompt examples, bad agent instructions, diff examples, test examples, and rollback examples.
- Teachers need to see what a safe agent interaction looks like.

Top 5 fixes:

1. Add a full safe-agent prompt example.
2. Add bad vs good agent task prompts.
3. Add a sample diff review with comments.
4. Add fake-data test case examples.
5. Replace repeated safety-note phrasing with lesson-specific guidance.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-320/*` | usable but formulaic | Authored status, but repeated safety phrasing and low example density. | Add concrete examples and vary lesson voice. |
| `/book/ots-320/02-repo-branch-workflow/*` | usable | Branch/commit/diff concepts need visual examples. | Add sample diff and review comments. |
| `/book/ots-320/03-prompting-coding-agents/*` | usable | Needs bad/good prompts. | Add prompt transformations and acceptance criteria. |
| `/book/ots-320/04-testing-verification/*` | usable | Needs actual check outputs and manual QA examples. | Add sample test plan and failed/passed checks. |
| `/book/ots-320/05-building-teacher-tools/*` | usable | Tool scope can drift without examples. | Add small teacher tool case study. |

Recommended next action: Keep structure, add examples, then remove repeated safety boilerplate.

### OTS-399 - Capstone Studio

Overall grade: 55
Enrichment: 50
Delivery: 55
Release readiness: 45
Verdict: Not release-ready. A capstone cannot be entirely generated because it is supposed to synthesize the pathway.

Evidence:

- Lesson files: 30 total.
- Status: 0 authored, 30 generated.
- Example signal: 0 detected example/scenario terms.
- Repeated phrase hits include "applies that intent to one concrete teacher-owned action with visibility for peers and future maintenance" and "Use official references before making platform, workflow, or release claims".

Strengths:

- The chapter sequence makes sense for a capstone.
- Artifacts are correct: proposal, system map, technical evidence log, safety review, peer review log, published curriculum system.
- The course knows what it should ask learners to assemble.

Major weaknesses:

- Every lesson is generated.
- The course asks for final evidence without showing what good evidence looks like.
- No sample capstone, no example proposal, no sample artifact index, no finished release review.
- The repeated phrasing makes the final course feel like an index, not a studio.

Top 5 fixes:

1. Author the entire course before calling the pathway complete.
2. Add a sample capstone proposal.
3. Add a sample curriculum system map and artifact index.
4. Add a completed technical evidence log.
5. Add a peer review protocol with sample feedback and revision decisions.

Lesson-level red flags:

| Route pattern | Status | Issue summary | Suggested fix |
|---|---|---|---|
| `/book/ots-399/01-capstone-scope/*` | generated-feeling | Capstone framing is generated. | Add examples of too-small, right-sized, and too-large capstone scopes. |
| `/book/ots-399/02-curriculum-system-assembly/*` | generated-feeling | Assembly is abstract. | Add sample artifact index and handoff notes. |
| `/book/ots-399/03-automation-tool-evidence/*` | generated-feeling | Technical evidence lacks examples. | Add fake-data evidence log and verification notes. |
| `/book/ots-399/04-publishing-safety-review/*` | generated-feeling | Release safety needs concrete review criteria. | Add redaction/accessibility/license checklist examples. |
| `/book/ots-399/05-presentation-peer-review/*` | generated-feeling | Peer review needs modeled feedback. | Add sample presentation outline and peer comments. |
| `/book/ots-399/06-published-curriculum-system/*` | generated-feeling | Final release checklist is generated. | Add finished release packet and maintenance plan example. |

Recommended next action: Make OTS-399 the first remediation target if the site claims "full pathway release".

## Pathway-Level Issues

- Release-state mismatch: The roadmap says all nine courses are authored, but the content files show 227 generated lessons out of 369 total course lesson files.
- The strongest courses are not the first and last courses. OTS-260, OTS-301, and parts of OTS-320 are stronger than the flagship OTS-101 and final OTS-399.
- Generated content is visible as normal course material. Even if route checks pass, a learner will feel the difference.
- Assessment/checkpoints are structurally present but often generic.
- Artifact descriptions exist, but many courses lack completed examples.
- Example density is too low across the pathway. Teachers need to see actual classroom-facing artifacts.
- Courses often tell teachers to "record", "identify", or "review" without enough modeling of what a strong answer looks like.
- Navigation is structurally usable through book routes, but learning support links to templates, KB articles, source bank entries, and examples need to appear closer to the lesson tasks.

## Generated/Repetitive Content Evidence

Content status counts from lesson frontmatter:

| Course | Total Lessons | Authored | Generated | Scaffolded |
|---|---:|---:|---:|---:|
| OTS-101 | 89 | 3 | 86 | 0 |
| OTS-201 | 36 | 6 | 30 | 0 |
| OTS-220 | 31 | 18 | 13 | 0 |
| OTS-240 | 30 | 18 | 12 | 0 |
| OTS-260 | 30 | 30 | 0 | 0 |
| OTS-280 | 63 | 7 | 56 | 0 |
| OTS-301 | 30 | 30 | 0 | 0 |
| OTS-320 | 30 | 30 | 0 | 0 |
| OTS-399 | 30 | 0 | 30 | 0 |
| Total | 369 | 142 | 227 | 0 |

Repeated or generated-feeling patterns found:

- OTS-201: "turns this architecture focus into one practical teacher move"; "Identify the concrete teacher problem connected to"; "Record what a colleague could inspect next".
- OTS-220 and OTS-240: "Use this section to apply the chapter logic".
- OTS-320: "A privacy and safety note is attached" repeated across many lessons.
- OTS-399: "applies that intent to one concrete teacher-owned action with visibility for peers and future maintenance"; "Use official references before making platform, workflow, or release claims".

## Missing Examples

High-priority examples to add:

1. Completed OTS-101 mini-unit capstone packet.
2. Bad vs good prompt examples and revised prompt library.
3. Standards-to-learning-target transformation using one sample standard.
4. Completed Google Drive folder map and Workspace command center.
5. Apps Script code snippets with fake-data tests.
6. Sample curriculum GitHub repository tree and README.
7. Cyber safety profile audit, phishing scenario, and incident response plan.
8. Teacher course site sitemap and sample published page set.
9. AI coding agent prompt, diff review, test evidence, and rollback note.
10. Capstone proposal, artifact index, technical evidence log, and peer review example.

## Missing Artifacts and Checkpoints

- OTS-101: Needs completed examples for every major artifact.
- OTS-201: Needs filled Workspace command center and folder/tracker examples.
- OTS-220: Needs runnable code examples and test records.
- OTS-240: Needs sample repo, README, license, attribution, and contribution review.
- OTS-260: Needs media packet exemplars.
- OTS-280: Needs private-use safety checklists with fake data and escalation examples.
- OTS-301: Needs sample hub pages and maintenance checklist.
- OTS-320: Needs safe-agent prompt portfolio and diff/test examples.
- OTS-399: Needs complete capstone exemplar set.

## Priority Fix Plan

### P0 - Blocks release readiness

- Stop calling the full pathway "fully authored" until generated lesson counts are resolved or publicly labeled.
- Author OTS-399 completely, because it is the final capstone and currently 30/30 generated.
- Author OTS-101 Chapters 02-10, because it is the entry course and currently 86/89 generated.
- Author OTS-280 generated chapters or mark the course as beta/draft, because cyber safety needs precision.
- Add an automated release-readiness check that fails when a course marked released contains generated lessons above an accepted threshold.

### P1 - Strong launch polish

- Finish OTS-201 generated chapters.
- Finish OTS-220 and OTS-240 generated concept lessons.
- Add exemplar artifacts for OTS-101, OTS-201, OTS-280, and OTS-399.
- Add lesson-local links to related templates, prompt library entries, source bank entries, and KB support.
- Rewrite generic checkpoints into artifact-specific quality checks.

### P2 - Enrichment

- Add scenario boxes, common mistakes, decision rules, and before/after examples.
- Add "teacher time reality" notes: what can be done in 15 minutes, one prep period, or one week.
- Add peer review examples and sample feedback language.
- Add accessibility and privacy checks to artifact rubrics in more concrete language.

### P3 - Nice next version

- Add video companions.
- Add downloadable Google Docs/Sheets template pack after real files exist.
- Add community examples and showcase pages.
- Add certification/micro-credential pathway only after artifact rubrics are mature.

## Recommended Next Action

Do not remediate everything at once. Fix one course at a time.

Recommended order:

1. OTS-399 Capstone Studio - because it is the weakest and final pathway proof.
2. OTS-101 Teaching Teachers Foundations - because it is the entry experience.
3. OTS-280 Cyber Safety for Educators - because generated safety content has higher consequence.
4. OTS-201 Google Workspace Systems - because it is likely a high-use practical course.
5. OTS-220 and OTS-240 - finish remaining generated concept lessons.
6. OTS-320 - remove repetitive phrasing and add examples.
7. OTS-260 and OTS-301 - add exemplar artifacts and polish.

## Short Verdict

OpenTeachStack is structurally impressive but instructionally uneven. The platform, route model, templates, KB direction, and pathway architecture are much farther along than the learner-facing course depth. The main job now is not more routing or more indexes. The job is course authoring: replace generated lesson shells with teacher-tested examples, practice, artifacts, and checkpoints.
