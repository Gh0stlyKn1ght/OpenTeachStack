interface CourseMetaProps {
  courseCode?: string;
  level?: string;
  format?: string;
  duration?: string;
  prerequisites?: string;
  license?: string;
  finalArtifact?: string;
}

const defaults: Required<CourseMetaProps> = {
  courseCode: "OTS-101",
  level: "Beginner",
  format: "Self-paced, asynchronous",
  duration: "10 modules / 10 weeks",
  prerequisites: "Basic Google Workspace familiarity",
  license: "CC BY-NC-SA 4.0",
  finalArtifact: "A verified mini-unit system",
};

export default function CourseMeta(props: CourseMetaProps) {
  const data = { ...defaults, ...props };

  const fields: { label: string; value: string }[] = [
    { label: "Course Code", value: data.courseCode },
    { label: "Level", value: data.level },
    { label: "Format", value: data.format },
    { label: "Duration", value: data.duration },
    { label: "Prerequisites", value: data.prerequisites },
    { label: "License", value: data.license },
    { label: "Final Artifact", value: data.finalArtifact },
  ];

  return (
    <aside className="border border-border rounded-sm bg-background">
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground/45 m-0 border-none">
          Course Information
        </h2>
      </div>
      <dl className="divide-y divide-border">
        {fields.map((field) => (
          <div key={field.label} className="px-5 py-3">
            <dt className="text-xs font-sans font-medium uppercase tracking-wider text-foreground/40 mb-1">
              {field.label}
            </dt>
            <dd className="text-sm text-foreground/80">{field.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
