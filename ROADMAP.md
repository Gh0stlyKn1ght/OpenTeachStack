# Roadmap

## Current Status: v2.0 — Full Pathway Release

All nine pathway courses are authored, reader-migrated, and passing lint/build/route checks.
Roadmap currently has no blocked required items in v0.6, v1.1, v1.2, v1.3, v1.4, v1.5, or v2.0.
Full-course browser print/PDF exports are available at `/book/print/[course]` for every structured pathway course.

## v0.2 — OTS-101 Foundations Complete

- [x] Finish all 10 foundations modules
- [x] Keep advanced content marked as future/draft pathway material
- [x] Complete the mini-unit capstone workflow
- [x] Thread safety checks into every major artifact
- [x] Add peer review and self-audit guidance
- [x] Add OTS-101 release packet
- [x] Add sample mini-unit artifact set
- [x] Add Source Bank as the shared verified-link system
- [x] Thread Source Bank evidence into Module 06, Module 09, capstone, audit, release packet, and templates

## v0.3 — v1 Template System

Required v1 templates:

- [x] Teacher Workflow Audit
- [x] Standards Unpacking Sheet
- [x] Mini-Unit Map
- [x] Lesson Template
- [x] Prompt Library
- [x] Resource Evaluation Sheet
- [x] AI Verification Checklist
- [x] Assessment/Rubric Template
- [x] Delivery Plan
- [x] Reflection and Revision Log

All v1 templates are available as site pages and Markdown downloads. Do not add fake Google Doc/Sheet download links unless the actual files exist.

## v0.4 — Foundations Polish

- [x] Search functionality
- [x] Reading progress indicator
- [x] Mobile navigation pass
- [x] Accessibility release check completed
- [x] Formal browser accessibility audit (WCAG 2.1 AA target)
- [x] PDF/export strategy for syllabus and templates
- [x] Social metadata for core pages
- [x] Source Bank update workflow documentation for contributors

## v0.5 — Pathway Course Extraction

- [x] OTS-201 Google Workspace Systems outline
- [x] OTS-220 Apps Script course outline from existing draft labs
- [x] OTS-240 Open Resources & GitHub outline
- [x] OTS-260 AI Media & Lesson Delivery outline
- [x] OTS-280 Cyber Safety for Educators outline
- [x] OTS-301 Teacher Course Sites outline
- [x] OTS-320 AI Coding Agents outline
- [x] OTS-399 Capstone Studio outline

## v0.6 — Pathway Course Authoring

Done means for every course tranche:

- [x] Authored content is visible in book routes
- [x] Templates or artifacts are listed or added
- [x] Source Bank references are attached or queued
- [x] Privacy, accessibility, and safety review is complete
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Representative route probes return `200`

### OTS-280 Cyber Safety for Educators

- [x] Chapter 01 Teacher Threat Model authored sections
- [x] Chapter 02 Account Hygiene and MFA authored sections
- [x] Chapter 03 Usernames and Identity Separation authored sections
- [x] Chapter 04 Email, Phishing, and Impersonation authored sections
- [x] Chapter 05 Social Media and Doxxing Risk authored sections
- [x] Chapter 06 VPNs, Wi-Fi, and Location Privacy authored sections
- [x] Chapter 07 Browser, Device, and File Safety authored sections
- [x] Chapter 08 Website Safety for Teacher Sites authored sections
- [x] Chapter 09 GitHub, Domains, and Public Repos authored sections
- [x] Chapter 10 Incident Response for Teachers authored sections
- [x] Private-use templates avoid collecting sensitive values in the repo
- [x] FTC, NIST, GitHub secret scanning, and platform references attached or queued
- [x] Escalation notes added for district IT, administration, and law enforcement boundaries
- [x] Privacy review completed for every example

### OTS-260 AI Media and Lesson Delivery

- [x] Chapter 01 Media With Purpose authored sections
- [x] Chapter 02 AI Image Workflows authored sections
- [x] Chapter 03 Diagrams and Visual Explanations authored sections
- [x] Chapter 04 Slides and Delivery Routines authored sections
- [x] Chapter 05 Short Video and Screen Recording authored sections
- [x] Chapter 06 Accessible Lesson Media Packet authored sections
- [x] Visual style guide template added
- [x] Accessibility checklist added for alt text, captions, transcripts, and readable slides
- [x] OBS, image-tool terms, and copyright references attached or queued
- [x] Projector and mobile readability pass completed

### OTS-301 Teacher Course Sites

- [x] Chapter 01 Course Site Strategy authored sections
- [x] Chapter 02 Web Basics for Teachers authored sections
- [x] Chapter 03 Course Hub Structure authored sections
- [x] Chapter 04 Accessibility and Safety authored sections
- [x] Chapter 05 Deployment and Maintenance authored sections
- [x] Chapter 06 Published Course Hub authored sections
- [x] Course hub sitemap template added
- [x] Domain and DNS examples use safe placeholder domains
- [x] MDN, CommonMark, GitHub Pages, Vercel, Cloudflare Pages, and DNS references attached or queued
- [x] Live-site privacy, accessibility, and broken-link checks completed

### OTS-320 AI Coding Agents

- [x] Chapter 01 Agent Safety Mindset authored sections
- [x] Chapter 02 Repo and Branch Workflow authored sections
- [x] Chapter 03 Prompting Coding Agents authored sections
- [x] Chapter 04 Testing and Verification authored sections
- [x] Chapter 05 Building Teacher Tools authored sections
- [x] Chapter 06 Reviewed Agent Build authored sections
- [x] Safe agent prompt template added
- [x] Diff review checklist added
- [x] Fake-data testing protocol added
- [x] Codex, Claude Code, VS Code, GitHub, and Apps Script references attached or queued

### OTS-399 Capstone Studio

- [x] Chapter 01 Capstone Scope authored sections
- [x] Chapter 02 Curriculum System Assembly authored sections
- [x] Chapter 03 Automation and Tool Evidence authored sections
- [x] Chapter 04 Publishing and Safety Review authored sections
- [x] Chapter 05 Presentation and Peer Review authored sections
- [x] Chapter 06 Published Curriculum System authored sections
- [x] Capstone proposal and artifact index templates added
- [x] Technical evidence log template added
- [x] Peer review protocol added
- [x] Final release checklist added
- [x] Full pathway traceability check completed

### OTS-101 course-owned reader migration completed (v0.5 artifact preserved)

- [x] OTS-101 section files authored in `content/courses/ots-101/lessons`
- [x] OTS-101 route reads course-owned MDX instead of fallback lesson bodies
- [x] Generic fallback removed from visible OTS-101 section routes
- [x] `npm run author:ots101` added for controlled course-local authoring refreshes
- [x] `npm run check:ots101-reader` added and passing
- [x] Representative OTS-101 route probes return `200` without fallback text

## v1.0 — Foundations Release

- [x] OTS-101 curriculum-manager audit completed
- [x] OTS-101 final release readiness approved after traceability, rubric, accessibility, and maintenance checks
- [x] All v1 templates available as site pages or downloadable files
- [x] No broken template/download links
- [x] Lint and build pass
- [x] Content safety rules documented for contributors
- [x] Release announcement focused on OTS-101 Foundations

## v1.1 — Platform Consolidation

Priority: stabilize the platform identity before adding new content.

### P0 — Content Safety

- [x] Add no-overwrite guard to `scaffold:courses` — skip files that already exist by default
- [x] Add no-overwrite guard to `author:ots101`, `author:ots260`, `author:ots280` scripts
- [x] Add `--force` flag to scaffold/author scripts for intentional overwrites only
- [x] Add `--dry-run` flag that prints planned writes without touching disk
- [x] Add generated-file headers to scaffolded files so authored vs generated is clear

### P0 — Build Verification

- [x] Add `docs/BUILD_VERIFICATION.md` with date, commit SHA, lint result, build result, route probe result, known failures
- [x] Add `npm run verify:release` script that generates `BUILD_VERIFICATION.md` from actual outputs
- [x] Run and commit first verified release report

### P0 — KB Architecture Decision

- [x] Decide: Nextra-owned `/kb` or custom-owned `/kb` (not both halfway)
- [x] If custom: remove `nextra` and `nextra-theme-docs` from dependencies, remove `withNextra` wrapper
- [x] Nextra path closed as not applicable after choosing custom `/kb`; continue KB work on the custom stack
- [x] Document the decision in `docs/KB_ARCHITECTURE.md`

### P1 — Brand Cleanup

- [x] Decide whether to keep `OTS-###` course codes or migrate to `TT-###`
- [x] Update GitHub repo badge in README from `OpenTeachStack` to match chosen brand
- [x] Audit all README/doc references — resolve "Teaching Teachers" vs "OpenTeachStack" vs "Open Teacher Stack"
- [x] Replace tagline "Willing to learn for the future" with a stronger line (candidate: "A field guide for educators entering the tech world")
- [x] Update `Quick Start` clone URL if/when repo is renamed

### P1 — UI Consistency

- [x] Define one design language across courses, KB, and library (Field Manual style)
- [x] Ensure `/book` and `/kb` share visual tokens — typography, spacing, sidebar patterns
- [x] Remove or heavily theme Nextra default CSS so it does not conflict with custom styles
- [x] Add homepage split: Courses (learn in order), Knowledge Base (solve today), Library (copy the artifact)

### P1 — KB Maintainability

- [x] Generate KB sidebar categories from filesystem or frontmatter instead of hardcoded array in `kb/layout.tsx`
- [x] Derive `getKnowledgeBaseSearchRecords()` from filesystem/frontmatter scan instead of manual list

## v1.2 — Evidence and Data Layer

- [x] Build transferable skills map with source-backed claims
- [x] Add `/evidence` page with real cited data (not placeholder graphs)
- [x] Add "last verified" metadata to EvidencePanel components
- [x] Add standards-to-assessment traceability matrix for OTS-101

## v1.3 — OTS-201 Full Authoring

- [x] Author OTS-201 Google Workspace Systems chapters from existing outline
- [x] Course-owned reader migration for OTS-201
- [x] Templates and Source Bank references attached
- [x] Privacy, accessibility, and safety review
- [x] Lint checks pass
- [x] Build passes (via webpack build path; release verification now uses successful `npm run build`)
- [x] Route probes passing

## v1.4 — OTS-220 Full Authoring

- [x] Author OTS-220 Apps Script chapters from existing outline and draft labs
- [x] Course-owned reader migration for OTS-220
- [x] Templates and Source Bank references attached
- [x] Privacy, accessibility, and safety review
- [x] Lint checks pass
- [x] Build passes (via webpack build path; release verification now uses successful `npm run build`)
- [x] Route probes returning `200` for representative OTS-220 routes

## v1.5 — OTS-240 Full Authoring

- [x] Author OTS-240 Open Resources & GitHub chapters from existing outline
- [x] Course-owned reader migration for OTS-240
- [x] Templates and Source Bank references attached
- [x] Privacy, accessibility, and safety review
- [x] Build passes (via webpack build path; release verification now uses successful `npm run build`)
- [x] Lint checks pass
- [x] Representative route probes returning `200`

## v2.0 — Full Pathway Release

- [x] All nine pathway courses fully authored and reader-migrated
- [x] Transferable skills evidence page live with cited sources
- [x] Homepage clearly routes users to Courses, Knowledge Base, and Library
- [x] Build verification report committed and current
- [x] Brand identity resolved — one name, one tagline, consistent badges
- [x] Community contribution guide published
- [x] Release announcement for full pathway
- [x] Full-course browser print/PDF export route published for structured course books

## Future Ideas

- Video companion series for each course
- Downloadable Google Docs/Sheets template pack
- Community examples of mini-unit capstones
- GitHub Discussions after pathway is stable
- Certification or micro-credential pathway
- Contributor leaderboard or showcase page
