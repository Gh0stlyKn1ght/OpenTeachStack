# Formatting Standard

Formatting is instruction.

OpenTeachStack pages should not ask a tired teacher to dig through a wall of text to find the problem, the action, the example, or the quality check. Structure is part of the teaching system.

## Core rule

Use formatting only when it helps the reader understand, act, compare, verify, or reuse the work.

Do not add fake formatting just to satisfy a check. A weak lesson with more headings is still a weak lesson.

## Required patterns

| Element | Use when | Avoid when |
| --- | --- | --- |
| `#` title | Naming the page clearly | Repeating the same title in every section |
| `##` major sections | Marking real shifts in the learning path | Decorating every paragraph |
| `###` subsections | Organizing examples, details, or variants | Creating fake depth |
| Numbered steps | Showing sequence, workflow, or process | Listing unrelated ideas |
| Bullets | Making checks, options, symptoms, or rules scannable | Hiding a full paragraph in every bullet |
| Tables | Comparing weak/better examples, audits, rubrics, or evidence | Forcing every idea into columns |
| Blockquotes | Highlighting a principle, warning, or hard-earned lesson | Making generic statements look important |
| Checklists | Verifying readiness, safety, accessibility, or quality | Adding busywork with no evidence target |
| Code blocks | Showing prompts, folder trees, commands, schemas, or exact examples | Styling ordinary prose |
| Bold text | Emphasizing key terms and decisions | Turning the whole page into emphasis soup |
| Short paragraphs | Reducing reading fatigue | Fragmenting every sentence into drama |
| Callouts | Naming warnings, teacher notes, safety notes, or source notes | Covering for unclear writing |

## Lesson format

A real lesson should usually include:

```md
# [Lesson Title]

## The Teacher Problem

## The Idea

## Classroom Scenario

## Weak Version

## Better Version

| Weak | Better | Why it works |
| --- | --- | --- |

## Build Step

1. First action
2. Second action
3. Third action

## Quality Check

- [ ] The artifact has a clear purpose.
- [ ] The example is specific.
- [ ] The output can be reviewed.
- [ ] Safety, source, accessibility, or privacy boundaries are named.

## Safety / Accessibility / Source Note

## Reflection

## Capstone Connection
```

Do not force this exact structure onto a page that already has a stronger route-specific pattern. The requirement is scannable instruction, not template compliance.

## Blog format

A founder-authored blog post should usually include:

```md
# [Post Title]

## What happened

## Why it bothered me

## What was really going on

## The lesson

## The fix

## What teachers can use

## Final thought
```

Build notes can be more technical, but every technical point should connect back to teaching, course quality, source of truth, or teacher workflow.

## Visual format

Use the clearest visual form for the job:

- Step cards for sequences and workflows.
- Tab/category cards for buckets and distinctions.
- Tables for weak/better comparisons, audits, rubrics, and evidence reviews.
- ASCII folder trees for architecture and source-of-truth explanations.
- Mermaid only when the relationship is genuinely graph-like and readable.

## Readability warning signs

A page needs review when it has:

- no `##` headings
- no bullets or numbered lists
- too many long paragraphs in a row
- no action section
- no quality check
- comparisons explained only in prose
- blog posts without sections
- lessons that read like essays instead of instructional pages

## Remediation rule

When improving formatting:

- preserve the meaning
- add headings where the idea actually shifts
- turn process prose into numbered steps
- turn grouped checks into bullets or checklists
- turn weak/better comparisons into tables
- split long paragraphs
- add code blocks only for exact prompts, commands, folder trees, schemas, or examples
- do not invent examples, citations, tasks, or readiness claims

No walls of text. No fake formatting. Structure must help the reader act.

## Reusable instructional block components

OpenTeachStack MDX can use these reusable components when a concept needs visual structure:

- `FrameworkBlock` for grouped concept cards inside a labeled teaching container.
- `ConceptCard` for one short concept, mistake, layer, or example.
- `TakeawayStrip` for concise principles beneath a visual block.
- `ComparisonBlock` for side-by-side distinctions.
- `WorkflowBlock` for numbered process steps.
- `ChecklistBlock` for quality gates and readiness checks.

OTS-101 also includes named preset visuals:

- `FakeCourseTrapVisual`
- `SourceTruthExportVisual`
- `CourseTruthStackVisual`
- `AICourseContentWorkflowVisual`
- `TiredTeacherTestVisual`

Use these when they teach the concept more clearly than a paragraph, table, or Mermaid diagram. Do not use them as decoration.

Example:

```mdx
<FrameworkBlock label="Framework" title="The Fake Course Trap">
  <ConceptCard title="Course Description">
    A summary of the course promise and audience.
  </ConceptCard>
  <TakeawayStrip>
    A folder full of files is not automatically a course.
  </TakeawayStrip>
</FrameworkBlock>
```

Detailed component guidance lives in docs/INSTRUCTIONAL_VISUAL_BLOCKS.md.


## Flexible Lesson Types

Every lesson needs instructional structure, but not every lesson needs the same structure.

Use the lesson shape that matches the purpose:

| Lesson type | Best use | Structure cue |
| --- | --- | --- |
| Concept Lesson | Teaching a core idea | Problem, concept, example, misunderstanding, takeaway |
| Framework Lesson | Teaching a named model | Framework, parts, how to use it, failure mode |
| Artifact Build Lesson | Creating a packet/template/checklist | Artifact, build step, example output, quality check |
| Comparison Lesson | Separating two ideas | Confusion, side-by-side comparison, decision rule |
| Workflow Lesson | Showing a process | Trigger, steps, example run, review gate |
| Case Study / Mistake Log | Learning from an error | What happened, what broke, root cause, fix, rule |
| Checkpoint / Review Lesson | Self-audit and revision | Criteria, checklist, revise/keep/remove, evidence |
| Capstone Assembly Lesson | Assembling final packet pieces | Required pieces, assembly steps, release check |

Do not force `The Teacher Problem`, `The Idea`, `Build Step`, `Quality Check`, `Reflection`, or `Capstone Connection` into every lesson. Those sections are useful when they fit the lesson type. Across a chapter, the learner still needs examples, non-examples, action, quality checks, safety/source/accessibility notes, and capstone relevance.
