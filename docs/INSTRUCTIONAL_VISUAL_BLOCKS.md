# Instructional Visual Blocks

OpenTeachStack uses reusable instructional blocks for lesson graphics that need more structure than prose, tables, or Mermaid diagrams.

These are not decorative cards. They are teaching surfaces.

## Available components

| Component | Use for |
| --- | --- |
| `FrameworkBlock` | A labeled container with an inner title, intro, concept cards, and takeaways. |
| `ConceptCard` | One concept, layer, mistake, example, or decision point. |
| `TakeawayStrip` | A concise principle or warning beneath a card set. |
| `ComparisonBlock` | Side-by-side distinctions such as source of truth vs export target. |
| `WorkflowBlock` | Numbered process cards for authoring, verification, publishing, or revision. |
| `ChecklistBlock` | Quality gates and readiness checks. |

## Preset OTS-101 visuals

Use these when a lesson teaches the matching concept:

```mdx
<FakeCourseTrapVisual />
<SourceTruthExportVisual />
<CourseTruthStackVisual />
<AICourseContentWorkflowVisual />
<TiredTeacherTestVisual />
```

## Authoring example

```mdx
<FrameworkBlock
  label="Framework"
  title="The Fake Course Trap"
  intro="These pieces can make a course look complete before the learning exists."
>
  <ConceptCard title="Course Description">
    A promise about audience and topic. Useful, but not a lesson.
  </ConceptCard>

  <ConceptCard title="Lesson Outline">
    A map of sections. It does not prove any section teaches.
  </ConceptCard>

  <TakeawayStrip>
    Packaging assets are not proof that a course exists.
  </TakeawayStrip>
</FrameworkBlock>
```

## Rules

- Use blocks when the visual structure makes the idea easier to understand.
- Keep card text short, direct, and concept-first.
- Prefer `WorkflowBlock` over Mermaid for linear processes.
- Prefer `ComparisonBlock` over paragraphs for two-column distinctions.
- Prefer `ChecklistBlock` for quality gates and readiness tests.
- Do not use blocks to make weak content look finished.
- Do not invent examples just to fill cards.

## Good fit examples

- curriculum vs course content
- source of truth vs export target
- fake course trap
- AI course content workflow
- verification checklist
- lesson anatomy
- publishing pipeline
- tired teacher test

## Bad fit examples

- decorative summaries
- generic inspiration quotes
- filler cards with repeated phrasing
- long essay text inside cards
- visuals that duplicate the paragraph above without adding clarity
