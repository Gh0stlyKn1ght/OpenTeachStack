# Strong Version

## Strong Apps Script Artifact

| Artifact part | Strong example |
| --- | --- |
| Fake input | One Sheet row with `unitName`, `sectionName`, `ownerEmail`, and no real student data |
| Function contract | Required fields are validated before Drive, Docs, or email actions run |
| Logger evidence | JSON log includes status, created id or draft-review row, and rollback note |
| Error path | Missing field throws a readable error before touching live files |
| Permission boundary | Sandbox folder and template ids are used until teacher review is complete |
| Rollback | Delete sandbox output before retesting; never delete live class folders from a test |
| Review status | Ready, revise, or blocked based on fake-data test evidence |

## Strong Pattern

```javascript
function validateRequiredFields(row, requiredFields) {
  const missing = requiredFields.filter((field) => !row[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required field(s): ${missing.join(", ")}`);
  }
}
```

Use this pattern before folder creation, Doc generation, or reminder drafting. A strong automation artifact proves the script can stop safely before it can act on live classroom data.
