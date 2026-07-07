"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { animate } from "animejs";
import MermaidBlock from "@/components/MermaidBlock";
import Link from "next/link";

interface CourseHealthData {
  code: string;
  slug: string;
  title: string;
  status: string;
  releaseChannel: string;
  humanReviewed: boolean;
  packetized: boolean;
  lessonCountActual: number;
  lessonCountExpected: number;
  releaseReady: boolean;
  lockStatus: string;
}

interface AuditDashboardProps {
  initialCourses: CourseHealthData[];
}

interface AuditDetail {
  grade: string;
  score: number;
  phase: string;
  duplicationStatus: string;
  emptyStatus: string;
  bloatWarning: string;
  remediationSteps: string[];
  findingsDescription: string;
}

const AUDIT_DETAILS: Record<string, AuditDetail> = {
  "OTS-000": {
    grade: "A-",
    score: 92,
    phase: "Phase 1: Foundations Verification",
    duplicationStatus: "0% Duplication (Verified unique via Jaccard similarity)",
    emptyStatus: "0% Empty (84 lessons completed)",
    bloatWarning: "Low (Direct workstation on-ramp, but needs human verification to prevent CLI-phobia)",
    remediationSteps: [
      "Conduct final human classroom-pressure verification.",
      "Recheck terminal command sheets for Windows vs Mac shell differences.",
      "Add locked registry entry to content/course-locks.yml."
    ],
    findingsDescription: "A strong, complete draft. Avoids the fake-polish trap by focusing on plain-language vocabulary and actual VS Code/Git setups. Ready for release once human-reviewed."
  },
  "OTS-101": {
    grade: "B+",
    score: 88,
    phase: "Phase 1: Foundations Verification",
    duplicationStatus: "0% Duplication (Passed strict uniqueness check)",
    emptyStatus: "0% Empty (60 lessons completed)",
    bloatWarning: "Medium (Remediation headings applied, but needs manual checks for AI-style phrasing uniformity)",
    remediationSteps: [
      "Review the lesson-type mapping in docs/reports/OTS101_LESSON_TYPE_AUDIT.md.",
      "Rewrite chapters 08-10 by hand to maximize teacher-to-teacher voice and reduce AI-style generalities.",
      "Embed real classroom mini-unit examples rather than generic templates.",
      "Mark humanReviewed: true in status.json after testing."
    ],
    findingsDescription: "The flagship course. Fully structured, with completed templates and lesson shapes. However, AI-remediated phrasing can feel formulaic; it needs hand-polishing for real classroom-pressure."
  },
  "OTS-201": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 2: Core Workspace & Automation",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/36 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Unlock the course boundary in content/course-locks.yml.",
      "Generate the MDX files using scripts/scaffold-course-content.mjs (ensure safe prompts and --force options).",
      "Write Workspace-specific lessons (Drive maps, command centers) following VOICEPRINT.md."
    ],
    findingsDescription: "Structure is laid out in course.json and status.json, but there is no lesson content. This is intentional under our lock rule, preventing fake route-coverage."
  },
  "OTS-220": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 2: Core Workspace & Automation",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/31 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Unlock course and scaffold lesson placeholders.",
      "Write actual Apps Script code snippets (folder and doc generators).",
      "Model sheet automation testing with sandbox folders and fake row data only."
    ],
    findingsDescription: "Technical outline exists, but requires hands-on lesson authoring. Must avoid copy-pasting generic scripts; write lesson-specific sandbox automations."
  },
  "OTS-240": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 3: Repository & Media Integration",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/30 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Scaffold and unlock course.",
      "Draft licensing and open-source contribution steps.",
      "Model how teachers can reuse OER licenses responsibly."
    ],
    findingsDescription: "No lesson bodies. OER publishing and GitHub basics need real, inspectable repositories for teachers to review."
  },
  "OTS-260": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 3: Repository & Media Integration",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/30 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Scaffold and unlock course.",
      "Write media accessibility guidelines and slide system planning checks.",
      "Add visual style guide templates."
    ],
    findingsDescription: "Structure is defined. Media delivery guidelines must stay focused on practical teacher slide systems and video outlines rather than high-end production."
  },
  "OTS-280": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 4: Advanced Systems & Safety",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/63 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Unlock course and scaffold lessons.",
      "Draft threat modeling and account hygiene checklists.",
      "Use fictional safety examples to avoid leaking real credentials or school locations."
    ],
    findingsDescription: "Outline is present in cyberSafety.ts, but actual lesson files are empty. Cyber safety lessons are highly critical and must use sanitized, fictional examples."
  },
  "OTS-301": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 4: Advanced Systems & Safety",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/30 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Scaffold and unlock course.",
      "Author hosting comparison and domain configuration lessons.",
      "Create a site sitemap checklist."
    ],
    findingsDescription: "Structure defined. Lessons need to contrast Google Sites with static HTML and Next.js hosting."
  },
  "OTS-320": {
    grade: "F / Shell",
    score: 15,
    phase: "Phase 4: Advanced Systems & Safety",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/30 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Scaffold and unlock course.",
      "Write coding agent prompt boundaries and review routines.",
      "Provide diff examples showing how to protect authored lesson content from AI rewrites."
    ],
    findingsDescription: "Empty of lessons. Needs real git-diff, branch-and-merge, and rollback tutorials for educators using coding assistants."
  },
  "OTS-399": {
    grade: "F / Shell",
    score: 10,
    phase: "Phase 5: Capstone and Pathway Release",
    duplicationStatus: "0% Duplication (No content files)",
    emptyStatus: "100% Empty (0/30 lessons exist)",
    bloatWarning: "N/A (No content)",
    remediationSteps: [
      "Unlock and scaffold capstone lessons.",
      "Add review rubrics and draft peer feedback guides.",
      "Define requirements for the final Mini Course Content Packet."
    ],
    findingsDescription: "The capstone course. Must not ship with generated templates; requires highly structured guidance on packaging and evidence tracing."
  }
};

export default function AuditDashboard({ initialCourses }: AuditDashboardProps) {
  const [courses] = useState<CourseHealthData[]>(initialCourses);
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>("OTS-101");
  const [filter, setFilter] = useState<"all" | "completed" | "empty">("all");

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  // GSAP animation on mount - Staggered fade in of cards
  useEffect(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".audit-card");
      gsap.killTweensOf(cards);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [filter]);

  // GSAP animation when selected course changes
  useEffect(() => {
    if (detailPanelRef.current) {
      gsap.fromTo(
        detailPanelRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }

    // Anime.js animation for the radial progress circle
    const details = AUDIT_DETAILS[selectedCourseCode];
    if (details && progressCircleRef.current) {
      const strokeDashoffset = 251.2 - (251.2 * details.score) / 100;
      
      // Reset first
      progressCircleRef.current.style.strokeDashoffset = "251.2";

      animate(progressCircleRef.current, {
        strokeDashoffset: strokeDashoffset,
        duration: 800,
        easing: "easeOutQuad",
      });
    }
  }, [selectedCourseCode]);

  const filteredCourses = courses.filter((course) => {
    if (filter === "completed") {
      return course.lessonCountActual > 0;
    }
    if (filter === "empty") {
      return course.lessonCountActual === 0;
    }
    return true;
  });

  const selectedDetails = AUDIT_DETAILS[selectedCourseCode];
  const selectedCourse = courses.find((c) => c.code === selectedCourseCode);

  // Determine course grade colors
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green stroke-green";
    if (score >= 80) return "text-blue stroke-blue";
    if (score >= 50) return "text-amber stroke-amber";
    return "text-pink stroke-pink";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green/10 border-green/20 text-green";
    if (score >= 80) return "bg-blue/10 border-blue/20 text-blue";
    if (score >= 50) return "bg-amber/10 border-amber/20 text-amber";
    return "bg-pink/10 border-pink/20 text-pink";
  };

  return (
    <div className="space-y-12">
      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Audit summary metrics">
        <div className="rounded-md border border-border bg-surface p-4 text-center">
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Total Courses</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground" id="metric-total">{courses.length}</p>
        </div>
        <div className="rounded-md border border-border bg-surface p-4 text-center">
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Authored Drafts</p>
          <p className="mt-2 text-3xl font-extrabold text-green" id="metric-drafted">
            {courses.filter((c) => c.lessonCountActual > 0).length}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-4 text-center">
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Empty Shells</p>
          <p className="mt-2 text-3xl font-extrabold text-pink" id="metric-empty">
            {courses.filter((c) => c.lessonCountActual === 0).length}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-4 text-center">
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Duplication Rate</p>
          <p className="mt-2 text-3xl font-extrabold text-blue" id="metric-dup">0%</p>
        </div>
      </section>

      {/* Filter and Content layout split */}
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        {/* Left Side: Filter & Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="m-0 font-heading text-xl font-bold text-foreground">Course Status & Scores</h2>
            <div className="flex gap-1 rounded bg-surface-alt/40 p-1 text-xs font-mono">
              <button
                id="filter-all"
                onClick={() => setFilter("all")}
                className={`rounded px-3 py-1 cursor-pointer transition-colors ${
                  filter === "all" ? "bg-surface text-accent font-semibold shadow-sm" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                id="filter-completed"
                onClick={() => setFilter("completed")}
                className={`rounded px-3 py-1 cursor-pointer transition-colors ${
                  filter === "completed" ? "bg-surface text-green font-semibold shadow-sm" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Authored ({courses.filter((c) => c.lessonCountActual > 0).length})
              </button>
              <button
                id="filter-empty"
                onClick={() => setFilter("empty")}
                className={`rounded px-3 py-1 cursor-pointer transition-colors ${
                  filter === "empty" ? "bg-surface text-pink font-semibold shadow-sm" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Empty ({courses.filter((c) => c.lessonCountActual === 0).length})
              </button>
            </div>
          </div>

          <div
            ref={cardsContainerRef}
            className="grid gap-4 sm:grid-cols-2"
          >
            {filteredCourses.map((course) => {
              const details = AUDIT_DETAILS[course.code];
              const isSelected = selectedCourseCode === course.code;
              const hasLessons = course.lessonCountActual > 0;

              return (
                <button
                  key={course.code}
                  id={`card-${course.code.toLowerCase()}`}
                  onClick={() => setSelectedCourseCode(course.code)}
                  className={`audit-card text-left p-5 rounded-md border transition-all cursor-pointer bg-surface/40 hover:bg-surface hover:shadow-sm ${
                    isSelected
                      ? "border-accent ring-1 ring-accent bg-surface shadow-sm"
                      : "border-border/60 hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-accent">
                        {course.code}
                      </span>
                      <h3 className="mt-1 font-heading text-base font-bold text-foreground leading-snug">
                        {course.title}
                      </h3>
                    </div>
                    {details && (
                      <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-sm border ${getScoreBg(details.score)}`}>
                        {details.grade}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] text-foreground/50">
                    <span>Lessons: {course.lessonCountActual} / {course.lessonCountExpected}</span>
                    <span>Status: {hasLessons ? "Draft Authored" : "Empty Shell"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Dynamic Audit Details Panel */}
        <div
          ref={detailPanelRef}
          className="rounded-md border border-border bg-surface p-6 shadow-sm flex flex-col justify-between"
          id="audit-details-panel"
        >
          {selectedCourse && selectedDetails ? (
            <div className="space-y-6">
              {/* Card Header inside panel */}
              <div className="border-b border-border pb-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                    Course Audit Details
                  </span>
                  <h3 className="m-0 mt-1 font-heading text-2xl font-bold text-foreground">
                    {selectedCourse.code}
                  </h3>
                  <p className="m-0 mt-1 text-sm text-foreground/60 leading-tight">
                    {selectedCourse.title}
                  </p>
                </div>

                {/* Anime.js Target circular badge */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-surface-alt stroke-[10] fill-none"
                    />
                    <circle
                      ref={progressCircleRef}
                      cx="50"
                      cy="50"
                      r="40"
                      className={`stroke-[10] fill-none transition-all ${getScoreColor(selectedDetails.score)}`}
                      strokeDasharray="251.2"
                      strokeDashoffset="251.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-mono text-sm font-bold text-foreground">
                    {selectedDetails.grade}
                  </span>
                </div>
              </div>

              {/* Stance explanation */}
              <div className="space-y-2">
                <h4 className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Findings Stance</h4>
                <p className="m-0 text-sm text-foreground/75 leading-relaxed italic">
                  &ldquo;{selectedDetails.findingsDescription}&rdquo;
                </p>
              </div>

              {/* Status parameters */}
              <div className="grid grid-cols-1 gap-4 rounded-md bg-surface-alt/25 p-4 border border-border/30 text-xs">
                <div>
                  <span className="font-semibold block text-foreground">Duplication Status:</span>
                  <span className="text-foreground/70">{selectedDetails.duplicationStatus}</span>
                </div>
                <div>
                  <span className="font-semibold block text-foreground">Completeness:</span>
                  <span className="text-foreground/70">{selectedDetails.emptyStatus}</span>
                </div>
                <div>
                  <span className="font-semibold block text-foreground">AI Boilerplate Risk:</span>
                  <span className={`font-semibold ${
                    selectedDetails.bloatWarning.startsWith("Low") ? "text-green" :
                    selectedDetails.bloatWarning.startsWith("Medium") ? "text-amber" : "text-foreground/70"
                  }`}>
                    {selectedDetails.bloatWarning}
                  </span>
                </div>
              </div>

              {/* Remediation Checklist */}
              <div className="space-y-3">
                <h4 className="m-0 font-mono text-xs uppercase tracking-wider text-foreground/45">Action Phase Checklist</h4>
                <p className="m-0 font-semibold text-xs text-accent">
                  Target: {selectedDetails.phase}
                </p>
                <ul className="m-0 p-0 pl-4 space-y-2 text-sm text-foreground/70">
                  {selectedDetails.remediationSteps.map((step, idx) => (
                    <li key={idx} className="list-disc leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation button inside detail */}
              <div className="pt-4 border-t border-border/60">
                {selectedCourse.lessonCountActual > 0 ? (
                  <Link
                    href={`/book/${selectedCourse.code.toLowerCase()}`}
                    className="book-action w-full text-center inline-block"
                  >
                    Open Course Book
                  </Link>
                ) : (
                  <span className="book-action-secondary w-full text-center inline-block cursor-not-allowed opacity-50">
                    Empty (Unlock Pending)
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-foreground/50">Select a course to inspect audit results.</p>
          )}
        </div>
      </div>

      {/* Mermaid Diagram section */}
      <section className="rounded-md border border-border bg-surface p-6 space-y-4" aria-labelledby="roadmap-heading">
        <div>
          <p className="m-0 font-mono text-xs uppercase tracking-wider text-accent">Pathways Blueprint</p>
          <h2 id="roadmap-heading" className="m-0 mt-1 font-heading text-2xl font-bold text-foreground">
            Remediation Phase Roadmaps
          </h2>
          <p className="m-0 mt-2 text-sm text-foreground/60 max-w-4xl">
            This flowchart maps the sequential dependencies of the course fixes. To prevent fake content and empty shells, we enforce the rule that course authoring moves strictly in sequence. Later phases remain locked until earlier phases are validated.
          </p>
        </div>

        <div className="flex justify-center bg-background/50 rounded p-4 overflow-x-auto">
          <MermaidBlock
            chart={`graph TD
              P1["Phase 1: Foundations Verification<br/>(OTS-000 & OTS-101)<br/>Grade: A- / B+"] --> P2["Phase 2: Core Workspace & Automation<br/>(OTS-201 & OTS-220)<br/>Grade: F / Shell"]
              P2 --> P3["Phase 3: Repository & Media Integration<br/>(OTS-240 & OTS-260)<br/>Grade: F / Shell"]
              P3 --> P4["Phase 4: Advanced Systems & Safety<br/>(OTS-280 & OTS-320)<br/>Grade: F / Shell"]
              P4 --> P5["Phase 5: Capstone and Pathway Release<br/>(OTS-399)<br/>Grade: F / Shell"]

              style P1 fill:#33635c,stroke:#e2d7c7,stroke-width:2px,color:#fff
              style P2 fill:#34548a,stroke:#e2d7c7,stroke-width:2px,color:#fff
              style P3 fill:#965027,stroke:#e2d7c7,stroke-width:2px,color:#fff
              style P4 fill:#5a4a78,stroke:#e2d7c7,stroke-width:2px,color:#fff
              style P5 fill:#8c4351,stroke:#e2d7c7,stroke-width:2px,color:#fff
            `}
            caption="Sequential course remediation logic based on foundations."
          />
        </div>
      </section>

      {/* Remediation Phase Walkthrough */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl font-bold text-foreground border-b border-border pb-3">
          Remediation Phases Description
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-md border border-border/80 bg-surface/50">
            <h3 className="font-heading text-lg font-bold text-green flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-green/10 border border-green/20">Phase 1</span>
              Foundations Verification & Lock
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
              Target: <strong>OTS-000 Teacher Tech Stack Orientation</strong> and <strong>OTS-101 AI Course Content Foundations</strong>.
            </p>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              We verify the drafted material against real teacher classroom pressure. We inspect and rewrite sections containing generic AI patterns. Once confirmed as highly useful and verified, these courses are marked as <code>humanReviewed: true</code> and locked in <code>content/course-locks.yml</code>.
            </p>
          </div>

          <div className="p-5 rounded-md border border-border/80 bg-surface/50">
            <h3 className="font-heading text-lg font-bold text-blue flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue/10 border border-blue/20">Phase 2</span>
              Core Workspace & Automation Authoring
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
              Target: <strong>OTS-201 Google Workspace Systems</strong> and <strong>OTS-220 Apps Script Automation</strong>.
            </p>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              Unlock the courses. Scaffold placeholders and write Workspace lessons by hand. Write custom Google Apps Script lessons focusing on safe sandbox environments (testing with fake data Sheets first) to build secure automations.
            </p>
          </div>

          <div className="p-5 rounded-md border border-border/80 bg-surface/50">
            <h3 className="font-heading text-lg font-bold text-orange flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-orange/10 border border-orange/20">Phase 3</span>
              Repository & Media Integration
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
              Target: <strong>OTS-240 Open Resources & GitHub</strong> and <strong>OTS-260 AI Media</strong>.
            </p>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              Build OER licensing lessons, teaching educators how to use Creative Commons licenses and attribute sources properly. Integrate visual and audio delivery notes (slide templates, lesson videos).
            </p>
          </div>

          <div className="p-5 rounded-md border border-border/80 bg-surface/50">
            <h3 className="font-heading text-lg font-bold text-purple flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple/10 border border-purple/20">Phase 4</span>
              Advanced Systems & Safety
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
              Target: <strong>OTS-280 Cyber Safety</strong>, <strong>OTS-301 Teacher Course Sites</strong>, and <strong>OTS-320 Coding Agents</strong>.
            </p>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              Introduce advanced safety systems. Write threat modeling lessons with fictional examples to protect actual student data and credentials. Establish coding agent prompts and acceptance rules that protect authored files.
            </p>
          </div>

          <div className="p-5 rounded-md border border-border/80 bg-surface/50">
            <h3 className="font-heading text-lg font-bold text-pink flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink/10 border border-pink/20">Phase 5</span>
              Capstone Assembly
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
              Target: <strong>OTS-399 Capstone Studio</strong>.
            </p>
            <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
              Unlock the final studio course. Guide teachers in compiling all artifacts (workstation configuration, prompts, templates, automations, site blueprints) into one inspectable, review-ready Mini Course Content Packet with a revision log.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
