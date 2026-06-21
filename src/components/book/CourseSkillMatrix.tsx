import { COURSE_SKILL_MATRIX } from "@/lib/book";

export default function CourseSkillMatrix() {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="m-0 min-w-[760px]">
        <thead>
          <tr>
            <th>Course</th>
            <th>Transferable skill coverage</th>
            <th>Build artifacts</th>
          </tr>
        </thead>
        <tbody>
          {COURSE_SKILL_MATRIX.map((row) => (
            <tr key={row.code}>
              <td className="font-mono text-sm text-accent">{row.code}</td>
              <td>{row.skills.length > 0 ? row.skills.join(", ") : "Planned"}</td>
              <td>{row.artifacts.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
