# Learner-Facing Content Audit

Date: 2026-06-24

## Finding

Some generated OpenTeachStack lesson bodies exposed authoring-script language to learners. The visible lesson content included phrases such as:

- `Section-Specific Teaching Notes`
- `Use these notes`
- `entry should`
- `weak note`
- `stronger note`
- slug-like labels such as `why-teachers-need`

That wording reads like curriculum-editor guidance, not a teacher-facing lesson task.

## Fix

The course remediation generator now writes the reusable section as:

```md
## Turn the Idea Into a Real Teaching Moment
```

The section now gives direct learner instructions:

- choose a real classroom lesson, mini-unit, artifact, or safety scenario;
- write what the teacher keeps organized;
- name what students see or use;
- include evidence another teacher can inspect;
- improve vague responses by naming the student task, source, product, review step, and revision decision.

The remediation pass refreshed 309 course lesson bodies across:

- `ots-101`
- `ots-201`
- `ots-220`
- `ots-240`
- `ots-280`
- `ots-320`
- `ots-399`

Seven high-risk `ots-101` sections were also re-specificized after regeneration so they do not collapse back into generic robotics examples:

- `content/courses/ots-101/lessons/02-prompting/02-4.mdx`
- `content/courses/ots-101/lessons/02-prompting/02-6.mdx`
- `content/courses/ots-101/lessons/05-course-and-unit-architecture/05-2.mdx`
- `content/courses/ots-101/lessons/05-course-and-unit-architecture/05-3.mdx`
- `content/courses/ots-101/lessons/08-assessment-rubrics-feedback/08-3.mdx`
- `content/courses/ots-101/lessons/08-assessment-rubrics-feedback/08-5.mdx`
- `content/courses/ots-101/lessons/08-assessment-rubrics-feedback/08-6.mdx`

## Regression Guard

`scripts/check-learner-facing-content.mjs` scans lesson MDX body text and the book section UI files that render learner-facing status notices. It fails if internal/editorial phrases return. It intentionally ignores frontmatter metadata so source registry fields remain machine-readable without appearing as learner content.

The guard is wired into:

```bash
npm run test
```

It can also be run directly:

```bash
npm run check:learner-facing-content
```

## Remaining Editorial Risk

This audit removes visible internal/editor language and protects against the same class of regression. It does not claim every generated lesson is fully human-authored or final. The next content pass should continue improving specificity, examples, and teacher voice course by course.
