# PacketLock

PacketLock aligns the existing OpenTeachStack lock system with CourseOS.

The lock system protects reviewed source from accidental rewrites. It does not decide that a course is good.

## Current Rule

Do not lock a course until it has passed human quality review.

That means an empty `content/course-locks.yml` registry can be the honest state while OTS-000 and OTS-101 remain draft courses.

## Protected Source

PacketLock should protect source roots such as:

```txt
content/courses/{course}/lessons
content/courses/{course}/labs
content/courses/{course}/templates
content/courses/{course}/references
```

PacketLock should not treat generated reports as reviewed course source.

## Ignored Work Areas

These should stay writable unless a future release process intentionally says otherwise:

```txt
content/courses/{course}/drafts
content/courses/{course}/reports
content/courses/{course}/generated
content/courses/{course}/exports
```

Drafts and reports help review the course. They are not the approved course body.

## Lifecycle

```txt
draft -> review -> promoted -> locked -> maintenance unlock -> relock
```

Unlocks should be explicit and narrow. Even small fixes to reviewed source should leave a reason.

## CourseOS Integration

Course health reports should show lock state:

- not locked
- locked
- maintenance
- missing manifest
- hash mismatch

The lock registry should eventually read packet roots, but the current lock scripts must remain compatible while migration is in progress.
