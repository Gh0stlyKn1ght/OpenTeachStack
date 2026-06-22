# Roadmap

## Current Status: v0.1 — Pathway Reframe

Teaching Teachers has been reframed from one overloaded OTS-101 course into an open-source pathway. OTS-101 is now the required foundations course.

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

Done means for every authored course tranche:

- [ ] Authored content is visible in book routes
- [ ] Templates or artifacts are listed or added
- [ ] Source Bank references are attached or queued
- [ ] Privacy, accessibility, and safety review is complete
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Representative route probes return `200`

### Course Content Packaging

- [x] Course-owned folders created under `content/courses/{courseSlug}`
- [x] Each course folder includes `course.json`, `lessons`, `labs`, `assets`, `docs`, `templates`, and `references`
- [x] Section-level lesson files scaffolded inside each course folder
- [x] Existing OTS-220 labs copied into the OTS-220 course folder
- [x] Existing OTS-101 image assets copied into the OTS-101 course folder
- [x] Existing course docs copied into matching course folders
- [x] `npm run check:content-layout` added and passing

### OTS-101 Course-Owned Reader Migration

- [x] OTS-101 section files authored in `content/courses/ots-101/lessons`
- [x] OTS-101 section route reads course-owned MDX instead of global lesson bodies
- [x] Generic section fallback removed from visible OTS-101 section routes
- [x] `npm run author:ots101` added for controlled course-local authoring refreshes
- [x] `npm run check:ots101-reader` added and passing
- [x] Representative OTS-101 route probes return `200` without fallback text

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

Course-owned reader migration:

- [x] OTS-280 section files authored in `content/courses/ots-280/lessons`
- [x] OTS-280 section route reads course-owned MDX instead of `src/lib/cyberSafety.ts` section body rendering
- [x] Registry/fallback rendering removed from visible OTS-280 section routes
- [x] `npm run author:ots280` added for controlled course-local authoring refreshes
- [x] `npm run check:ots280-reader` added and passing
- [x] Representative OTS-280 route probes return `200` without fallback text

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

Course-owned reader migration:

- [x] OTS-260 section files authored in `content/courses/ots-260/lessons`
- [x] OTS-260 section route reads course-owned MDX instead of generic `src/lib/courseStructures.ts` section body rendering
- [x] Registry/fallback rendering removed from visible OTS-260 section routes
- [x] `npm run author:ots260` added for controlled course-local authoring refreshes
- [x] `npm run check:ots260-reader` added and passing
- [x] Representative OTS-260 route probes return `200` without fallback text

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

Done means evidence:

- [x] Authored content is visible in book routes
- [x] Templates or artifacts are listed or added
- [x] Source Bank references are attached or queued
- [x] Privacy, accessibility, and safety review is complete
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Representative route probes return `200`

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

Done means evidence:

- [x] Authored content is visible in book routes
- [x] Templates or artifacts are listed or added
- [x] Source Bank references are attached or queued
- [x] Privacy, accessibility, and safety review is complete
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Representative route probes return `200`

## v1.0 — Foundations Release

- [x] OTS-101 curriculum-manager audit completed
- [x] OTS-101 final release readiness approved after traceability, rubric, accessibility, and maintenance checks
- [x] All v1 templates available as site pages or downloadable files
- [x] No broken template/download links
- [x] Lint and build pass
- [x] Content safety rules documented for contributors
- [x] Release announcement focused on OTS-101 Foundations

## Future Ideas

- Video companion series for each foundations module
- Downloadable Google Docs/Sheets template pack
- Community examples of mini-unit capstones
- GitHub Discussions after the foundations course is stable
- Certification or micro-credential pathway after advanced tracks exist
