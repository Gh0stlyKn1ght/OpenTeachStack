const confidenceByModule: Record<string, { label: string; detail: string }> = {
  "teacher-builder-mindset": {
    label: "No Code",
    detail: "Read, map, reflect",
  },
  prompting: {
    label: "Copy/Edit",
    detail: "Revise prompts and templates",
  },
  "ai-literacy-verification": {
    label: "Copy/Edit",
    detail: "Check and revise AI output",
  },
  "standards-targets": {
    label: "No Code",
    detail: "Map standards to evidence",
  },
  "course-unit-architecture": {
    label: "Customize",
    detail: "Adapt unit and lesson structures",
  },
  "open-resources": {
    label: "No Code",
    detail: "Evaluate and cite sources",
  },
  "google-workspace-planning": {
    label: "Customize",
    detail: "Organize Workspace systems",
  },
  "assessment-feedback": {
    label: "Copy/Edit",
    detail: "Draft rubrics and feedback",
  },
  "delivery-planning": {
    label: "Customize",
    detail: "Prepare classroom routines",
  },
  "mini-unit-capstone": {
    label: "Customize",
    detail: "Assemble and audit artifacts",
  },
};

export default function TechConfidenceBadge({ moduleId }: { moduleId?: string }) {
  const confidence = moduleId
    ? confidenceByModule[moduleId]
    : undefined;

  if (!confidence) return null;

  return (
    <span className="inline-flex flex-col rounded-md border border-cyan/30 bg-cyan/10 px-3 py-2 text-left">
      <span className="font-mono text-[0.66rem] font-bold uppercase tracking-widest text-cyan">
        Tech Confidence
      </span>
      <span className="text-sm font-semibold text-foreground">
        {confidence.label}
      </span>
      <span className="text-xs text-slate">{confidence.detail}</span>
    </span>
  );
}
