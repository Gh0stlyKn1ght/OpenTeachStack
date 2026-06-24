# OTS-260 AI Media and Lesson Delivery Outline

Date: 2026-06-22

Status: release-ready outline

Course path: Modern Teacher Systems

Prerequisite: OTS-101 delivery plan

## Course Thesis

Media improves instruction only when it clarifies the learning path. Images, slides, diagrams, video, and AI-generated visuals should reduce confusion, support accessibility, and make delivery easier to repeat.

OTS-260 should help teachers build a small media packet for one lesson without turning the work into decoration, production theater, or unverified visuals.

## Course Source Lessons

This outline is backed by course-owned delivery and media lesson files:

- `content/lessons/delivery-planning-foundations.mdx`
- `content/lessons/one-day-lesson-site-workflow.mdx`
- `content/lessons/ai-image-generation-for-curriculum.mdx`
- `content/lessons/video-delivery-and-presentation.mdx`
- `content/field-notes/how-i-built-one-day-lesson-sites.mdx`

## Final Artifact

Accessible lesson media packet

The final artifact should include:

- media purpose map
- image prompt and review log
- visual style guide
- diagram set or visual explanation
- delivery slide deck
- short video or screen-recording plan
- alt text, captions, transcripts, and source notes
- peer-review revision note

## Chapter Outline

| Chapter | Focus | Source material | Build artifact |
| --- | --- | --- | --- |
| 01. Media With Purpose | Decide whether a visual, slide, diagram, or video actually helps the lesson. | `delivery-planning-foundations.mdx`, `one-day-lesson-site-workflow.mdx` | Media purpose map |
| 02. AI Image Workflows | Prompt, generate, review, and document AI visuals without using them as factual diagrams. | `ai-image-generation-for-curriculum.mdx` | Image prompt and review log |
| 03. Diagrams and Visual Explanations | Use diagrams when precision and structure matter more than atmosphere. | `one-day-lesson-site-workflow.mdx`, Source Bank workflow docs | Diagram set |
| 04. Slides and Delivery Routines | Build slides as signposts for pacing, transitions, and student-facing directions. | `video-delivery-and-presentation.mdx`, `delivery-planning-foundations.mdx` | Delivery deck |
| 05. Short Video and Screen Recording | Plan short recordings that help absent or stuck students without overproducing. | `video-delivery-and-presentation.mdx` | Short video plan |
| 06. Accessible Lesson Media Packet | Assemble media, source notes, alternatives, and revision evidence. | OTS-260 course lessons and templates | Accessible lesson media packet |

## Safety Rules

- Do not use AI images as factual diagrams unless every detail is verified against a reliable source.
- Avoid generated images of real people, real events, students, or sensitive scenarios.
- Keep text out of generated images; use real page or slide text instead.
- Add alt text, captions, transcripts, or text alternatives for required media.
- Check image, video, and music licenses before publishing or sharing outside class.
- Keep student data and student faces out of examples unless school policy and consent allow it.

## Current Route Coverage

The outline is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-260`
- `/book/ots-260/01-media-with-purpose`
- `/book/ots-260/02-ai-image-workflows/02-3`

## Next Content Tasks

1. Continue expanding section-level examples as needed. Chapters 01-06 now have authored section content through the shared course content guide.
2. Reusable visual style guide template is documented in `docs/OTS_260_VISUAL_STYLE_GUIDE_TEMPLATE.md`.
3. Accessibility checklist for alt text, captions, transcripts, and readable slides is documented in `docs/OTS_260_ACCESSIBILITY_CHECKLIST.md`.
4. OBS, image-tool terms, copyright, Creative Commons, YouTube, Canva, and Unsplash references are attached or queued in `docs/OTS_260_SOURCE_REFERENCES.md`.
5. Projector/mobile readability pass is documented in `docs/OTS_260_READABILITY_PASS.md`.
