# Lesson Quality Rubric

Use this rubric before treating any lesson text as ready for release.

## Primary checks

| Category    | Check |
| --- | --- |
| Specificity | Does the lesson teach this exact topic, not only artifact process? |
| Scenario | Is there a realistic teacher or classroom situation? |
| Example | Is there a concrete example of good work? |
| Non-example | Is there a weak, risky, or incomplete example shown? |
| Action | Can a teacher do one useful action in 10 to 30 minutes? |
| Evidence | Is the output inspectable by another educator? |
| Safety | Are privacy, copyright, accessibility, or verification boundaries named where relevant? |
| Voice | Does it sound human and teacher-to-teacher, not generated polish? |
| Capstone | Does it connect the work to the final mini course content packet? |
| Visual clarity | Does the lesson use a readable visual pattern when the concept is easier to understand visually? |

## Lesson minimum standard

A lesson is ready when:

- It solves a real teacher problem.
- It explains the concept in plain language.
- It includes a concrete classroom scenario.
- It includes weak and stronger examples.
- It tells the teacher exactly what to build, test, or revise next.
- It includes a quality check.
- It includes a relevant safety, privacy, accessibility, copyright, or source-verification note.
- It includes a reflection question tied to the artifact.
- It explains how the work connects to the capstone packet.
- It preserves course-specific voice and avoids generic reuse patterns.
- It uses visuals intentionally: step cards for sequences, tab/category cards for distinctions, tables for audits, and Mermaid only when a real graph is clearer than cards.

## Automatic failure

A lesson fails the rubric if it mainly contains authoring instructions, scaffold language, or route-filling prose.

Examples of failure language:

- `A focused pass on`
- `Improve this section and make it cleaner`
- `Use one short classroom-safe example`
- `Choose one concrete classroom material`
- `This section helps teachers understand`
- `The core idea is to make teaching artifacts visible`
- `another educator can inspect it, reuse it, or challenge it`
- `the decision, the classroom use, the evidence, and the next review step`
- `created, revised, tested, credited, restricted, published, or archived`
- `The artifact should include labels, examples, status, review notes`
- `The goal is not to make a perfect document in one pass`

Delete or rewrite the lesson. Do not mark it authored.

## OpenTeachStack role check

Before writing or approving a lesson, answer:

- Who is the teacher-learner?
- What classroom pressure are they under?
- What are they trying to build?
- What confusion will they probably have?
- What mistake will AI probably cause?
- What example makes the idea concrete?
- What should the teacher create, revise, verify, or submit?
- What evidence proves the work is usable?
- What safety, privacy, copyright, accessibility, or source-quality boundary matters?
- How does this prepare them for the next lesson?

If those answers are not clear, stop and create an authoring note instead of fake content.

## Visual explanation rule

Use one strong visual when it makes the teaching clearer.

- Use step cards for sequences, workflows, and before/after process moves.
- Use tab/category cards for distinctions, buckets, and comparison sets.
- Use tables for audits, checklists, rubrics, and evidence reviews.
- Use Mermaid only when relationships are genuinely graph-like and still readable in the course page.
- Do not add visuals as decoration or to make weak content look polished.

If a Mermaid diagram becomes tiny, dense, or harder to read than the text, replace it with cards or a table.

## Review result format

Use:

- `ready` when the lesson clearly supports use in class.
- `needs-example-pass` when missing realistic examples.
- `needs-rewrite` when it reads like a template.

## Related policy

Lesson quality is distinct from structure checks.
Passing route checks, lint checks, or frontmatter checks is not enough if the lesson does not sound practical and teacher-facing.

## Formatting Is Instruction

A lesson is not ready if it is a wall of text.

A ready lesson uses formatting to guide action:

- headings show the learning path
- numbered lists show process
- bullets make checks scannable
- tables compare weak and better examples
- code blocks show exact prompts, folders, commands, or templates
- short paragraphs reduce reading fatigue

Formatting should make the lesson easier to teach, not just prettier.


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
