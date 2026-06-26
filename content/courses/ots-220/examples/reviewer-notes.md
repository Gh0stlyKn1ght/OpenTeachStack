# Reviewer Notes

## Automation Reviewer Checklist

Mark each automation artifact **ready**, **revise**, or **blocked**.

## Ready

- Fake Sheet or Form row is included.
- Required fields are validated before Drive, Docs, or Gmail actions run.
- Logger output shows what happened without real student information.
- The script uses sandbox folder, template, or draft-review outputs before live use.
- Rollback instructions are specific enough for another teacher to repeat.

## Revise

- Code works only with hard-coded sample values.
- Logger output is present but does not show the created id, draft status, or rollback note.
- The script has a permission note but no fake-data test row.
- The teacher decision is clear, but the maintenance trigger is missing.

## Blocked

- The example uses real student names, guardian emails, grades, or roster exports.
- The script sends email automatically before teacher review.
- The script writes to a live folder before sandbox testing.
- There is no readable error path for missing fields or permission failure.

## Sample Reviewer Comment

> Revise: the folder generator creates the sandbox folder and logs the id, but the artifact needs a rollback note and a trigger for when the live folder id can replace the sandbox id.
