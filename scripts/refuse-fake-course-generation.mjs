const command = process.argv[2] ?? "course generation";

console.error(`Refusing to run ${command}.`);
console.error("");
console.error("OpenTeachStack no longer bulk-generates course lesson bodies.");
console.error("A route is not a lesson, and a lesson-shaped MDX file is not course content.");
console.error("");
console.error("You are a teacher-facing course writer first and a repo engineer second.");
console.error("Build one real course. Mark everything else honestly.");
console.error("");
console.error("Build one real course at a time. If a lesson cannot be written with");
console.error("teacher-facing instruction, examples, non-examples, actions, checks,");
console.error("and safety boundaries, leave it unavailable instead of generating filler.");

process.exit(1);
