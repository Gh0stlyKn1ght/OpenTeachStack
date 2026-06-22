# OTS-320 Diff Review Checklist

Use this checklist after an AI coding agent changes files.

## Changed Files

- [ ] I reviewed every changed file.
- [ ] I understand why each file changed.
- [ ] No unrelated files were reformatted, renamed, deleted, or moved.
- [ ] Authored course content was not overwritten with generic generated text.

## Content Review

- [ ] Teacher voice, instructions, and source notes still make sense.
- [ ] No student-identifiable information appears in code, content, logs, examples, screenshots, or public files.
- [ ] Examples use fake or teacher-created data.
- [ ] Accessibility text, alt text, captions, labels, and safety notes were preserved or improved.

## Code Review

- [ ] The change is small enough to explain.
- [ ] The agent did not add hidden network calls, credential handling, tracking, or data collection.
- [ ] Error, empty, and duplicate states were considered.
- [ ] Rollback is possible through a branch, copy, commit, or file history.

## Verification

- [ ] Required commands passed or failures are documented.
- [ ] Representative routes or tool paths were probed.
- [ ] Manual UI review was completed when the change affects a page or tool.
- [ ] Final decision is recorded as accepted, revised, or rejected.
