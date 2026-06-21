import SkillBadge from "./SkillBadge";
import { TRANSFERABLE_SKILLS } from "@/lib/book";

export default function TransferableSkillsMap() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {TRANSFERABLE_SKILLS.map((node) => (
        <article
          key={node.skill}
          className="rounded-sm border border-border bg-surface/65 p-4"
        >
          <h3 className="m-0 border-none font-sans text-base font-semibold text-foreground">
            {node.skill}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/58">
            {node.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {node.courses.map((course) => (
              <SkillBadge key={`${node.skill}-${course}`}>{course}</SkillBadge>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
