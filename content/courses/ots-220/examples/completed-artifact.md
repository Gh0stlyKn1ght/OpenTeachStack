# Completed Artifact

## Completed Teacher Automation Toolkit Sample

This sample shows the minimum evidence a teacher should collect before using an Apps Script automation with real classroom materials.

## Automation Summary

| Field | Completed example |
| --- | --- |
| Automation name | Sandbox unit folder setup |
| Classroom purpose | Prepare one reusable unit folder and teacher setup doc before launching a robotics mini-unit |
| Function tested | `createUnitFolderSafely(row)` |
| Fake data used | `Unit 03 - Lab Intro`, `Sample Robotics 8A`, `sample-teacher@example.edu` |
| Output created | One sandbox Drive folder and one setup document |
| Logger evidence | One `level: "info"` log with unit name, section name, folder id, and doc id |
| Failure tested | Missing `sectionName` produces a required-field error |
| Rollback | Delete sandbox folder and setup doc, then rerun with the same fake row |
| Privacy boundary | No real student names, grades, emails, or roster exports in script inputs or logs |

## Sample Logger Output

```json
{
  "level": "info",
  "unitName": "Unit 03 - Lab Intro",
  "sectionName": "Sample Robotics 8A",
  "folderId": "sandbox-folder-id",
  "docId": "sandbox-doc-id",
  "message": "Sandbox setup created"
}
```

## Reviewer Notes

- Ready: fake-data test creates exactly one folder and one document, then logs the expected output.
- Revise: rollback note exists, but the owner has not recorded when the script should be reviewed again.
- Blocked: script logs real student information or writes to a live course folder before sandbox testing is complete.

Use this as a minimum baseline before class launch. A stronger artifact can include a screenshot-free test log, a copy of the fake Sheet row, and a one-line revision history.
