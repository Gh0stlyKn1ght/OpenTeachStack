# OpenTeachStack Curriculum Manager Audit

Staleness note, 2026-06-28: this audit predates the OTS-000 on-ramp decision and the OTS-101 retargeting to AI Course Content Foundations for Teachers. Treat the old OTS-101 title, old chapter slugs, mini-unit framing, and release-readiness claims as historical evidence only.

## Executive Summary

Overall pathway grade: **68/100**

Strongest course: **OTS-101 — Teaching Teachers Foundations**. It has the clearest learner purpose and the most concrete early-course examples, especially Chapter 01.

Weakest course: **OTS-399 — Capstone Studio**. It should be the strongest proof of the pathway, but the current lesson bodies lean on abstract artifact language and do not yet give enough capstone-specific models, examples, rubrics, or review protocols.

Biggest content risk: **technical checks now pass while the curriculum still reads too generated in many places**. The repo correctly reports 369 release-ready lessons and 0 generated/scaffolded lessons, but curriculum review found repeated learner-visible phrases such as "lesson work," "working item," and "the item supports..." across many lessons.

Biggest delivery risk: **lessons are structurally organized but not consistently self-study-ready**. Most courses include Why This Matters, Core Idea, an example, a task table, quality check, and reflection. However, the required learner standard is not consistently met by named or equivalent sections for Classroom Scenario, Model Artifact, Common Mistake, Verification Checklist, and Artifact Connection.

Biggest enrichment opportunity: **replace generic artifact-update tables with real teacher artifacts**. Each course needs model rows, before/after examples, realistic mistakes, completed sample artifacts, and decision rules that are unique to the course.

Release readiness verdict: **Do not publish all courses as final professional-learning curriculum yet.** The platform is technically releasable, but the course content needs P0/P1 curriculum remediation before being presented as fully authored educator training.

Validation run:

- `npm.cmd run typecheck` passed.
- `npm.cmd run lint` passed.
- `npm.cmd run test` passed.
- `npm.cmd run build` passed.

## Course Grade Table

| Course | Overall | Purpose | Lesson Quality | Enrichment | Delivery | Artifact Alignment | Assessment | Safety | Authenticity | Release Readiness | Verdict |
| ------ | ------: | ------: | -------------: | ---------: | -------: | -----------------: | ---------: | -----: | -----------: | ----------------: | ------- |
| OTS-101 | 78 | 86 | 76 | 74 | 78 | 82 | 70 | 76 | 74 | 72 | Usable, needs enrichment |
| OTS-201 | 70 | 80 | 68 | 64 | 70 | 76 | 64 | 68 | 60 | 64 | Structurally present, revise |
| OTS-220 | 65 | 78 | 61 | 58 | 66 | 70 | 60 | 70 | 52 | 58 | Heavy revision needed |
| OTS-240 | 67 | 80 | 63 | 61 | 68 | 72 | 61 | 76 | 54 | 60 | Heavy revision needed |
| OTS-260 | 66 | 78 | 62 | 60 | 67 | 72 | 60 | 78 | 53 | 60 | Heavy revision needed |
| OTS-280 | 72 | 84 | 68 | 66 | 72 | 74 | 68 | 84 | 58 | 66 | Revise before release |
| OTS-301 | 67 | 80 | 63 | 60 | 68 | 72 | 62 | 76 | 54 | 60 | Heavy revision needed |
| OTS-320 | 68 | 82 | 64 | 61 | 69 | 72 | 64 | 78 | 55 | 61 | Heavy revision needed |
| OTS-399 | 62 | 76 | 58 | 55 | 62 | 66 | 58 | 68 | 48 | 54 | Not release-ready |

## Course-by-Course Findings

### OTS-101 — Teaching Teachers Foundations

Overall grade: **78/100**

Release readiness: **Usable but not final.**

Verdict: OTS-101 is the best current model. Chapter 01 reads closest to real professional learning. Later chapters are coherent but often too uniform.

Strengths:

- Clear thesis: teachers need inspectable systems, not just tools.
- Strong artifact arc from workflow audit to mini-unit capstone.
- Early lessons include concrete robotics examples and hidden-decision framing.
- AI verification, standards, resources, assessment, and delivery are all appropriate foundation topics.

Major weaknesses:

- Chapters 03-10 are structurally consistent but too templated.
- Most lessons do not explicitly include Common Mistake, Verification Checklist, or Artifact Connection sections.
- Model artifacts are often described, not shown as completed examples.
- Checkpoints tend to ask for ready/revise/block status without enough quality criteria.

Top 5 fixes:

1. Use Chapter 01 as the prose model for all later chapters.
2. Add a named Common Mistake section to every lesson.
3. Add completed artifact examples for each chapter artifact.
4. Add verification checklists that differ by topic.
5. Add a final mini-unit sample showing all artifacts connected.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-101/01-teacher-builder-mindset/*` | Chapter 01 lessons | strong | Strongest learner-facing set, but still missing named Common Mistake and Artifact Connection sections. | Add standard sections without flattening the prose. |
| `/book/ots-101/02-prompting/*` | Chapter 02 lessons | usable | Solid course fit, but prompt examples need more before/after contrast. | Add weak prompt, revised prompt, and teacher review notes. |
| `/book/ots-101/03-ai-literacy-verification/*` | Chapter 03 lessons | usable | Important topic, but repeated structure reduces authenticity. | Add concrete AI output examples and verification failures. |
| `/book/ots-101/04-standards-to-learning-targets/*` | Chapter 04 lessons | usable | Correct sequence, needs deeper standards unpacking examples. | Add a fully worked standard-to-target-to-evidence sample. |
| `/book/ots-101/05-course-and-unit-architecture/*` | Chapter 05 lessons | usable | Coherent, but mini-unit examples are thin. | Add a complete 3-5 lesson map. |
| `/book/ots-101/06-resource-discovery-open-resources/*` | Chapter 06 lessons | usable | Needs more source/license decision modeling. | Add keep/reject/resource-replace examples. |
| `/book/ots-101/07-google-workspace-planning-systems/*` | Chapter 07 lessons | usable | Good bridge to OTS-201, but overlaps with OTS-201. | Clarify that this is planning-level, not workspace mastery. |
| `/book/ots-101/08-assessment-rubrics-feedback/*` | Chapter 08 lessons | usable | Assessment logic is present but needs sample rubric rows. | Add a model rubric and bad rubric contrast. |
| `/book/ots-101/09-delivery-planning/*` | Chapter 09 lessons | usable | Delivery work is relevant but not vivid enough. | Add one full one-day lesson delivery plan. |
| `/book/ots-101/10-mini-unit-capstone/*` | Chapter 10 lessons | usable | Capstone checklist exists conceptually but needs a model submission. | Add a completed capstone index and reviewer rubric. |

Artifact audit:

- Final artifact clarity: Strong conceptually, but sample capstone evidence is missing.
- Chapter artifact quality: Strongest in Chapters 01-02; thinner in later chapters.
- Missing artifact support: Completed examples, non-examples, and rubrics.

Assessment/checkpoint audit:

- What works: Checkpoint placement is logical.
- What is weak: Checkpoints often verify completion more than quality.
- What needs to be added: Topic-specific readiness checklists.

Learner-facing rewrite needs:

- Lessons that need full rewrite: None in Chapter 01; selective rewrites in Chapters 03-10.
- Lessons that need light revision: Most lessons.
- Lessons that should be downgraded from authored: None if revised promptly; otherwise Chapters 03-10 should be marked reviewed-draft rather than final.

### OTS-201 — Google Workspace Systems for Teachers

Overall grade: **70/100**

Release readiness: **Structurally present but instructionally weak.**

Verdict: Course purpose is strong, but lessons still feel like systematic notes rather than lived Google Workspace training.

Strengths:

- Strong final artifact: Workspace command center.
- Logical progression from system mindset to Drive, Docs/Slides, Sheets, Forms/Calendar, and command center.
- Clear teacher use case.

Major weaknesses:

- Lessons need screenshots, folder maps, sample file names, and permission examples.
- Current examples rely too much on a generic robotics scenario.
- Checkpoints need actual findability and permission tests.
- The course does not yet show enough realistic Google Workspace artifacts.

Top 5 fixes:

1. Rewrite Chapter 01 as the model for the rest of the course.
2. Add sample Drive folder trees and file naming examples.
3. Add a completed curriculum tracker Sheet example.
4. Add permission mistake scenarios.
5. Add command center before/after examples.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-201/01-workspace-system-mindset/*` | Chapter 01 lessons | usable | Good thesis but still generic. | Add concrete school-year workflow examples. |
| `/book/ots-201/02-drive-architecture/*` | Chapter 02 lessons | usable | Needs actual folder tree models. | Add course/unit/year folder examples and archive rules. |
| `/book/ots-201/03-docs-slides-delivery/*` | Chapter 03 lessons | usable | Templates are described, not modeled. | Add Doc and Slide template samples. |
| `/book/ots-201/04-sheets-curriculum-trackers/*` | Chapter 04 lessons | usable | Tracker needs sample columns and filled rows. | Add a completed mini tracker. |
| `/book/ots-201/05-forms-calendar-operations/*` | Chapter 05 lessons | weak | Operations examples are too abstract. | Add sample Form questions, response Sheet, and Calendar workflow. |
| `/book/ots-201/06-workspace-command-center/*` | Chapter 06 lessons | usable | Final artifact lacks a full model. | Add command center mock content and review checklist. |

Artifact audit:

- Final artifact clarity: Good.
- Chapter artifact quality: Logical but under-modeled.
- Missing artifact support: Screenshots or text equivalents of folders, trackers, templates, and command center sections.

Assessment/checkpoint audit:

- What works: Checkpoints match chapter artifacts.
- What is weak: Quality criteria are too general.
- What needs to be added: Findability, permission, version, and maintenance tests.

Learner-facing rewrite needs:

- Lessons that need full rewrite: OTS-201 Chapter 05.
- Lessons that need light revision: All chapters.
- Lessons that should be downgraded from authored: Chapter 05 until operations examples are added.

### OTS-220 — Apps Script for Teacher Automation

Overall grade: **65/100**

Release readiness: **Heavy revision needed.**

Verdict: The sequence is right, but the lessons do not yet teach Apps Script enough. They frame automation decisions but avoid the concrete code, logs, errors, and test cases educators need.

Strengths:

- Good course concept and chapter order.
- Safety boundaries are included.
- Automation candidate list and toolkit are appropriate artifacts.

Major weaknesses:

- Too little actual Apps Script instruction.
- Workshop lessons lack concrete code examples in the lesson bodies.
- "Lesson work" language appears repeatedly and feels generated.
- Verification does not include enough run/test/debug evidence.

Top 5 fixes:

1. Add code snippets for custom menus, Drive folder creation, Doc generation, and reminders.
2. Add sample Sheet schemas.
3. Add error examples and debugging steps.
4. Add safe sample data policies.
5. Replace generic artifact rows with real automation logs.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-220/01-automation-mindset/*` | Chapter 01 lessons | weak | Decision framing exists, but examples are generic. | Add automation/non-automation classroom cases. |
| `/book/ots-220/02-apps-script-basics/*` | Chapter 02 lessons | weak | Does not teach Apps Script enough. | Add editor walkthrough, function, log, and permission examples. |
| `/book/ots-220/03-folder-file-generators/*` | Chapter 03 lessons | weak | Folder generator needs concrete script logic. | Add sample `DriveApp` flow and idempotency test. |
| `/book/ots-220/04-docs-from-sheet-rows/*` | Chapter 04 lessons | weak | Sheet-to-Doc workflow is described, not demonstrated. | Add sample row, placeholders, and generated output. |
| `/book/ots-220/05-forms-email-reminders/*` | Chapter 05 lessons | weak | Email safety is present but needs rate/recipient examples. | Add draft-only reminder workflow and review gate. |
| `/book/ots-220/06-teacher-automation-toolkit/*` | Chapter 06 lessons | weak | Toolkit is not yet a complete portfolio. | Add script review rubric and documentation sample. |

Artifact audit:

- Final artifact clarity: Reasonable.
- Chapter artifact quality: Underdeveloped.
- Missing artifact support: Code samples, test data, logs, error examples.

Assessment/checkpoint audit:

- What works: Safety emphasis is appropriate.
- What is weak: Checkpoints do not require runnable evidence.
- What needs to be added: Sample-run proof and failure handling.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapters 02-05.
- Lessons that need light revision: Chapters 01 and 06.
- Lessons that should be downgraded from authored: All OTS-220 lessons until code/workshop examples are added.

### OTS-240 — Open Resources & GitHub for Educators

Overall grade: **67/100**

Release readiness: **Heavy revision needed.**

Verdict: The course belongs in the pathway, but it needs real GitHub and open-license examples to become teachable.

Strengths:

- Strong topic fit.
- Good attention to open vs free vs allowed.
- Repository, README, contribution, attribution, and release structure is logical.

Major weaknesses:

- Lessons need sample repository files.
- License decisions are described, not practiced with examples.
- GitHub workflow needs screenshots or command-free UI walkthroughs.
- Contribution review needs an actual diff/review scenario.

Top 5 fixes:

1. Add a sample curriculum repository structure.
2. Add README before/after examples.
3. Add Creative Commons and source attribution examples.
4. Add a small pull request review simulation.
5. Add release checklist with pass/fail examples.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-240/01-open-resource-mindset/*` | Chapter 01 lessons | usable | Good concept, needs real licensing examples. | Add free/open/allowed comparison table. |
| `/book/ots-240/02-github-foundations/*` | Chapter 02 lessons | weak | GitHub is not concretely taught. | Add repo/file/commit/branch examples. |
| `/book/ots-240/03-writing-readmes/*` | Chapter 03 lessons | usable | README advice needs model text. | Add weak and strong README samples. |
| `/book/ots-240/04-contribution-review/*` | Chapter 04 lessons | weak | Contribution process lacks realistic review task. | Add issue/PR/review scenario. |
| `/book/ots-240/05-publishing-attribution/*` | Chapter 05 lessons | usable | Needs source and attribution models. | Add attribution file examples. |
| `/book/ots-240/06-open-curriculum-repository/*` | Chapter 06 lessons | weak | Final repo artifact not fully modeled. | Add release-ready repo checklist and sample tree. |

Artifact audit:

- Final artifact clarity: Good.
- Chapter artifact quality: Conceptually aligned.
- Missing artifact support: Real repository examples.

Assessment/checkpoint audit:

- What works: License/source checks are relevant.
- What is weak: Checkpoints lack practical GitHub review evidence.
- What needs to be added: PR review and release readiness rubric.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapters 02, 04, and 06.
- Lessons that need light revision: Chapters 01, 03, and 05.
- Lessons that should be downgraded from authored: Chapters 02, 04, and 06.

### OTS-260 — AI Media & Lesson Delivery

Overall grade: **66/100**

Release readiness: **Heavy revision needed.**

Verdict: The safety/accessibility instincts are good, but the media lessons need actual visual, caption, transcript, and delivery examples.

Strengths:

- Strong course purpose.
- Accessibility and review are present.
- Artifact sequence is coherent.

Major weaknesses:

- Does not include enough concrete media examples.
- AI image review needs actual prompt/output/revision logs.
- Diagram and slide chapters need model artifacts.
- Video chapter needs sample script, caption, and transcript excerpts.

Top 5 fixes:

1. Add model media purpose map.
2. Add AI image prompt and review examples.
3. Add diagram examples and common diagram mistakes.
4. Add delivery deck sample slide sequence.
5. Add caption/transcript verification checklist.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-260/01-media-with-purpose/*` | Chapter 01 lessons | usable | Purpose is clear, examples are thin. | Add media/non-media decision examples. |
| `/book/ots-260/02-ai-image-workflows/*` | Chapter 02 lessons | weak | AI review is described but not modeled. | Add prompt, generated risk, and revision log. |
| `/book/ots-260/03-diagrams-visual-explanations/*` | Chapter 03 lessons | weak | Diagram set needs actual diagrams or text equivalents. | Add flowchart/timeline/system map examples. |
| `/book/ots-260/04-slides-delivery-routines/*` | Chapter 04 lessons | weak | Delivery deck needs slide-by-slide model. | Add deck outline with teacher moves. |
| `/book/ots-260/05-short-video-screen-recording/*` | Chapter 05 lessons | weak | Video plan lacks script/caption/transcript model. | Add a 60-second script and caption checklist. |
| `/book/ots-260/06-accessible-media-packet/*` | Chapter 06 lessons | usable | Final packet needs a complete sample. | Add packet index and peer review rubric. |

Artifact audit:

- Final artifact clarity: Good.
- Chapter artifact quality: Under-modeled.
- Missing artifact support: Actual media artifacts or text equivalents.

Assessment/checkpoint audit:

- What works: Accessibility is correctly foregrounded.
- What is weak: Review criteria are too broad.
- What needs to be added: Modality-specific checks.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapters 02-05.
- Lessons that need light revision: Chapters 01 and 06.
- Lessons that should be downgraded from authored: Chapters 02-05.

### OTS-280 — Cyber Safety for Educators

Overall grade: **72/100**

Release readiness: **Revise before release.**

Verdict: Strong relevance and safety purpose, but it needs calmer, more concrete teacher scenarios and checklists.

Strengths:

- The course belongs strongly in the pathway.
- Safety/privacy risks are addressed across the sequence.
- Chapters cover account hygiene, identity, phishing, profiles, connection safety, devices, websites, repos/domains, and incident response.

Major weaknesses:

- Lessons are still repetitive.
- Safety advice needs more specific examples and boundaries.
- Incident response needs a more complete, calm action plan.
- Public-profile and doxxing chapters need careful language and examples.

Top 5 fixes:

1. Add realistic but fictional teacher safety scenarios.
2. Add step-by-step account inventory and MFA models.
3. Add phishing examples with reporting decisions.
4. Add public profile audit examples.
5. Add incident response script and contact tree.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-280/01-teacher-threat-model/*` | Chapter 01 lessons | usable | Good framing, needs more realistic risk categories. | Add sample risk map. |
| `/book/ots-280/02-account-hygiene-mfa/*` | Chapter 02 lessons | usable | Needs account inventory example. | Add password/MFA checklist model. |
| `/book/ots-280/03-usernames-identity-separation/*` | Chapter 03 lessons | usable | Needs public/private identity examples. | Add discoverability audit sample. |
| `/book/ots-280/04-email-phishing-impersonation/*` | Chapter 04 lessons | usable | Needs email examples and reporting workflow. | Add fictional phishing examples. |
| `/book/ots-280/05-social-media-doxxing/*` | Chapter 05 lessons | usable | Sensitive topic needs careful scenario design. | Add public-profile audit with fictional data. |
| `/book/ots-280/06-vpns-wifi-location/*` | Chapter 06 lessons | usable | Needs clearer VPN limits examples. | Add what VPN helps/does not help table. |
| `/book/ots-280/07-browser-device-file-safety/*` | Chapter 07 lessons | usable | Needs device/browser checklist model. | Add hardening checklist. |
| `/book/ots-280/08-website-safety/*` | Chapter 08 lessons | usable | Needs website audit examples. | Add public contact/form examples. |
| `/book/ots-280/09-github-domains-repos/*` | Chapter 09 lessons | usable | Needs repo/domain exposure examples. | Add secrets/WHOIS/repo audit sample. |
| `/book/ots-280/10-incident-response/*` | Chapter 10 lessons | weak | Incident response plan is too generic. | Add calm first-hour plan and contact tree. |

Artifact audit:

- Final artifact clarity: Good.
- Chapter artifact quality: Relevant but needs examples.
- Missing artifact support: Completed safety checklists and sample decisions.

Assessment/checkpoint audit:

- What works: Safety checkpoints are important.
- What is weak: They do not yet require enough evidence.
- What needs to be added: Concrete pass/fail criteria.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapter 10.
- Lessons that need light revision: All chapters.
- Lessons that should be downgraded from authored: Chapter 10 until incident plan is concrete.

### OTS-301 — Teacher Course Sites

Overall grade: **67/100**

Release readiness: **Heavy revision needed.**

Verdict: Course idea is strong, but it does not yet teach enough site-building, publishing, and maintenance through real page examples.

Strengths:

- Clear course site final artifact.
- Accessibility, privacy, deployment, and maintenance are included.
- Sequence is appropriate.

Major weaknesses:

- Needs actual site maps and page examples.
- Web basics are too conceptual.
- Deployment options need clearer comparison.
- Course hub release needs a full model.

Top 5 fixes:

1. Add a complete course hub sitemap.
2. Add simple HTML/CSS/static hosting examples.
3. Add privacy/accessibility page review examples.
4. Add broken-link and update routine examples.
5. Add a published course hub sample.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-301/01-course-site-strategy/*` | Chapter 01 lessons | usable | Strategy is clear but needs audience examples. | Add parent/student/colleague use cases. |
| `/book/ots-301/02-web-basics/*` | Chapter 02 lessons | weak | Web basics are not concrete enough. | Add static page, domain, DNS, hosting examples. |
| `/book/ots-301/03-course-hub-structure/*` | Chapter 03 lessons | usable | Sitemap needs model pages. | Add course hub tree and page content examples. |
| `/book/ots-301/04-accessibility-safety/*` | Chapter 04 lessons | usable | Good topic, needs checklist examples. | Add readable-link/privacy examples. |
| `/book/ots-301/05-deployment-maintenance/*` | Chapter 05 lessons | weak | Deployment/maintenance lacks practical routine. | Add hosting comparison and update calendar. |
| `/book/ots-301/06-published-course-hub/*` | Chapter 06 lessons | weak | Final hub not modeled. | Add release-ready hub sample and review rubric. |

Artifact audit:

- Final artifact clarity: Good.
- Chapter artifact quality: Conceptually clear.
- Missing artifact support: Site examples and review evidence.

Assessment/checkpoint audit:

- What works: Safety/accessibility are present.
- What is weak: Checkpoints lack real page tests.
- What needs to be added: Navigation, link, privacy, and accessibility QA.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapters 02, 05, and 06.
- Lessons that need light revision: Chapters 01, 03, and 04.
- Lessons that should be downgraded from authored: Chapters 02, 05, and 06.

### OTS-320 — AI Coding Agents for Educators

Overall grade: **68/100**

Release readiness: **Heavy revision needed.**

Verdict: The course addresses an important modern workflow, but it needs authentic prompt/diff/test examples and stronger teacher review routines.

Strengths:

- Excellent pathway fit.
- Safety boundaries are appropriate.
- Prompt, diff, test, and reviewed build sequence is logical.

Major weaknesses:

- Agent prompts are described more than demonstrated.
- Diff review needs actual examples.
- Testing needs realistic outputs and manual QA tasks.
- Tool-building needs a complete small tool example.

Top 5 fixes:

1. Add safe agent prompt examples.
2. Add a real small diff review.
3. Add test output and manual QA examples.
4. Add authored-content protection examples.
5. Add a complete reviewed classroom tool portfolio.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-320/01-agent-safety-mindset/*` | Chapter 01 lessons | usable | Good boundary topic, needs concrete agent failure cases. | Add safe/unsafe agent tasks. |
| `/book/ots-320/02-repo-branch-workflow/*` | Chapter 02 lessons | weak | Branch/diff workflow needs examples. | Add sample branch, commit, and diff review. |
| `/book/ots-320/03-prompting-coding-agents/*` | Chapter 03 lessons | usable | Needs full prompt examples. | Add context/constraints/acceptance criteria prompt. |
| `/book/ots-320/04-testing-verification/*` | Chapter 04 lessons | usable | Needs test/manual QA evidence. | Add sample lint/build/manual QA report. |
| `/book/ots-320/05-building-teacher-tools/*` | Chapter 05 lessons | weak | Tool scope and build are too abstract. | Add small classroom tool example. |
| `/book/ots-320/06-reviewed-agent-build/*` | Chapter 06 lessons | weak | Final portfolio not modeled. | Add reviewed agent-build packet. |

Artifact audit:

- Final artifact clarity: Strong idea.
- Chapter artifact quality: Under-modeled.
- Missing artifact support: Prompts, diffs, test logs, review notes.

Assessment/checkpoint audit:

- What works: Review and testing are included.
- What is weak: Evidence examples are missing.
- What needs to be added: Diff, test, and QA rubrics.

Learner-facing rewrite needs:

- Lessons that need full rewrite: Chapters 02, 05, and 06.
- Lessons that need light revision: Chapters 01, 03, and 04.
- Lessons that should be downgraded from authored: Chapters 02, 05, and 06.

### OTS-399 — Capstone Studio

Overall grade: **62/100**

Release readiness: **Not release-ready.**

Verdict: The capstone should prove the pathway. Right now it reads like a generalized artifact checklist and does not yet feel like a real studio experience.

Strengths:

- Capstone sequence is sensible.
- It names proposal, system map, technical evidence, release safety, presentation, and final publication.
- It reflects the pathway's major strands.

Major weaknesses:

- Too much abstract "lesson work" language.
- No full sample capstone.
- Peer review protocol is thin.
- Release safety and technical evidence need real examples.
- Final presentation expectations are not concrete enough.

Top 5 fixes:

1. Add a complete sample capstone.
2. Add proposal examples and scope boundaries.
3. Add technical evidence log samples.
4. Add peer review protocol with rubric.
5. Add final release checklist with pass/fail examples.

Lesson-level red flags:

| Route | Lesson | Status | Problem | Recommended Fix |
| ----- | ------ | ------ | ------- | --------------- |
| `/book/ots-399/01-capstone-scope/*` | Chapter 01 lessons | weak | Capstone scope needs examples. | Add strong/weak proposal samples. |
| `/book/ots-399/02-curriculum-system-assembly/*` | Chapter 02 lessons | weak | System map needs a full model. | Add linked artifact map. |
| `/book/ots-399/03-automation-tool-evidence/*` | Chapter 03 lessons | weak | Technical evidence is abstract. | Add code/test/log evidence examples. |
| `/book/ots-399/04-publishing-safety-review/*` | Chapter 04 lessons | weak | Safety review needs concrete checks. | Add privacy/license/accessibility pass-fail examples. |
| `/book/ots-399/05-presentation-peer-review/*` | Chapter 05 lessons | weak | Peer review protocol is too thin. | Add reviewer roles, questions, and rubric. |
| `/book/ots-399/06-published-curriculum-system/*` | Chapter 06 lessons | generated-feeling | Final system reads like a generic release task. | Add final capstone packet and publication decision rubric. |

Artifact audit:

- Final artifact clarity: Clear in name, weak in model.
- Chapter artifact quality: Present but too abstract.
- Missing artifact support: Complete sample capstone and review rubric.

Assessment/checkpoint audit:

- What works: The course has checkpoints.
- What is weak: They do not yet prove capstone quality.
- What needs to be added: Peer-review rubric, capstone defense criteria, and publication decision criteria.

Learner-facing rewrite needs:

- Lessons that need full rewrite: All chapters.
- Lessons that need light revision: None; this needs a capstone-level rewrite.
- Lessons that should be downgraded from authored: All OTS-399 lessons until rewritten.

## Pathway-Level Findings

- The pathway sequence is coherent: foundations, workspace, automation, open resources, media, safety, course sites, coding agents, capstone.
- The platform navigation path is clear: Pathway Portal -> Course Book -> Chapter -> Lesson -> Artifact.
- The current content passes technical gates but does not consistently meet the curriculum manager lesson standard.
- A repeated generated pattern remains visible in OTS-220 through OTS-399: "lesson work," "working item," "the item supports...", and similar phrases.
- Several courses need stronger Knowledge Base links at the point of need, especially OTS-220, OTS-240, OTS-301, and OTS-320.
- Checkpoints are frequent but often too generic.
- Support material should move into Knowledge Base only after course lessons contain enough context to stand alone.
- The main missing bridge is from "artifact row" to "completed educator artifact." Learners need to see what good work looks like.

## Generated/Internal Language Findings

These are learner-visible or docs-visible signals found during audit. Severity reflects curriculum risk, not build risk.

| File | Phrase | Severity | Recommendation |
| ---- | ------ | -------- | -------------- |
| `content/courses/ots-220/lessons/**/*.mdx` | "lesson work" | High | Replace with lesson-specific nouns such as custom menu, folder generator, response row, reminder draft. |
| `content/courses/ots-240/lessons/**/*.mdx` | "lesson work" | High | Replace with repository, README, attribution, PR review, release decision language. |
| `content/courses/ots-260/lessons/**/*.mdx` | "lesson work" | High | Replace with media-specific decisions such as image review, diagram purpose, caption check. |
| `content/courses/ots-280/lessons/**/*.mdx` | "lesson work" | Medium | Replace with risk, account, profile, connection, website, repo, or response-plan language. |
| `content/courses/ots-301/lessons/**/*.mdx` | "lesson work" | High | Replace with page, hub, route, link, deployment, accessibility, or maintenance language. |
| `content/courses/ots-320/lessons/**/*.mdx` | "lesson work" | High | Replace with prompt, branch, diff, test, tool, review log language. |
| `content/courses/ots-399/lessons/**/*.mdx` | "lesson work" | Critical | Replace with proposal, system map, evidence log, safety review, peer review, final release language. |
| `docs/EDUCATOR_LEARNER_REMEDIATION.md` | "section-specific teaching notes" | Low | Historical remediation doc; acceptable if not learner-facing, but should not be reused as lesson language. |
| `docs/LEARNER_FACING_CONTENT_AUDIT.md` | "entry should", "weak note", "stronger note" | Low | Audit vocabulary only; acceptable in docs. |
| `docs/EDUCATOR_LEARNER_AUDIT.md` | prior generated phrase findings | Low | Historical audit; keep as evidence or archive. |

## Priority Fix Plan

### P0 — Release Blockers

- Generated-feeling lessons are presented as `authored`, especially OTS-220 through OTS-399.
- OTS-399 is not capstone-ready and should not be presented as final.
- Repeated "lesson work" language appears across released lessons.
- Most lessons lack the required Common Mistake and Verification Checklist elements.
- Many artifact instructions ask learners to update a row but do not show a completed model artifact.

### P1 — Course Quality Fixes

- Add classroom scenarios to every lesson.
- Add model artifacts or examples to every chapter.
- Add common mistakes and decision rules.
- Replace generic build tables with topic-specific tasks.
- Add meaningful verification checklists.
- Add stronger checkpoint rubrics.

### P2 — Delivery and Enrichment Polish

- Improve pacing notes by chapter.
- Add better teacher examples and grade-band/context variations.
- Clarify terminology for nontechnical educators.
- Add Knowledge Base links where learners need extra help.
- Add source bank links inside resource, safety, media, and open-publishing lessons.

### P3 — Platform Polish

- Check whether navigation labels match lesson titles after content rewrites.
- Add clearer artifact download/link affordances from lessons.
- Improve course book progress cues around chapter artifacts.
- Ensure print views carry the same learner-facing structure.

## Recommendations

- Keep OTS-101 visible as a beta/reviewed course after targeted enrichment.
- Keep OTS-201 visible only after Chapter 01 is rewritten as a model and concrete Workspace artifacts are added.
- Downgrade OTS-220, OTS-240, OTS-260, OTS-301, OTS-320, and OTS-399 from final authored status until their applied examples are rewritten.
- Keep OTS-280 in review status; it is important and coherent but needs safety-specific examples.
- Fix OTS-399 before claiming full-pathway completion.

Ideal remediation order:

1. Remove repeated "lesson work" and generic artifact-row language from OTS-220 through OTS-399.
2. Rewrite OTS-201 Chapter 01 as the durable model for lesson quality.
3. Remediate OTS-201 chapter by chapter with real Workspace artifacts.
4. Enrich OTS-101 Chapters 03-10 with common mistakes, model artifacts, and verification checklists.
5. Rewrite OTS-220 with code, logs, errors, and sample data.
6. Rewrite OTS-399 as a true capstone studio with a full sample capstone.
7. Continue through OTS-240, OTS-260, OTS-280, OTS-301, and OTS-320.

## Top 10 Fixes

1. Replace "lesson work" everywhere in learner-facing lesson bodies.
2. Add Common Mistake sections or equivalents to all 369 lessons.
3. Add Verification Checklist sections or equivalents to all 369 lessons.
4. Add completed model artifacts for every chapter artifact.
5. Rewrite OTS-220 with actual Apps Script examples.
6. Rewrite OTS-399 with a complete sample capstone.
7. Add real GitHub/repository examples to OTS-240.
8. Add media examples, captions, transcripts, and diagram models to OTS-260.
9. Add site maps, page examples, and deployment maintenance evidence to OTS-301.
10. Add prompt/diff/test examples to OTS-320.

## Courses Requiring Immediate Rewrite

- **Immediate full rewrite:** OTS-399.
- **Immediate major rewrite:** OTS-220.
- **Immediate focused rewrite:** OTS-201 Chapter 01, then OTS-201 Chapter 05.
- **Next major rewrites:** OTS-240 Chapters 02/04/06, OTS-260 Chapters 02-05, OTS-301 Chapters 02/05/06, OTS-320 Chapters 02/05/06.

## Authored Status Recommendations

- OTS-101: keep authored with enrichment backlog.
- OTS-201: keep authored only after Chapter 01 and Chapter 05 are remediated; otherwise mark as draft/review.
- OTS-220: downgrade from authored to draft/review until code examples and workshops are real.
- OTS-240: downgrade GitHub workflow chapters until repository examples are real.
- OTS-260: downgrade media production chapters until examples are real.
- OTS-280: keep reviewed/draft until incident response and safety examples are concrete.
- OTS-301: downgrade web/deployment/final hub chapters until examples are real.
- OTS-320: downgrade branch/tool/final build chapters until prompt/diff/test evidence exists.
- OTS-399: downgrade all lessons until capstone studio is rewritten.
