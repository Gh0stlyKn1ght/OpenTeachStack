import BuildTask from "@/components/BuildTask";
import {
  AICourseContentWorkflowVisual,
  ChecklistBlock,
  ComparisonBlock,
  ConceptCard,
  CourseTruthStackVisual,
  FakeCourseTrapVisual,
  FrameworkBlock,
  SourceTruthExportVisual,
  TakeawayStrip,
  TiredTeacherTestVisual,
  WorkflowBlock,
} from "@/components/InstructionalBlocks";
import MDXPre from "@/components/MDXPre";
import MermaidBlock from "@/components/MermaidBlock";
import RealityCheck from "@/components/RealityCheck";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import TeacherNote from "@/components/TeacherNote";
import VideoEmbed from "@/components/VideoEmbed";

export const coursePacketMdxComponents = {
  pre: MDXPre,
  MermaidBlock,
  VideoEmbed,
  ReflectionPrompt,
  TeacherNote,
  RealityCheck,
  BuildTask,
  FrameworkBlock,
  ConceptCard,
  TakeawayStrip,
  ComparisonBlock,
  WorkflowBlock,
  ChecklistBlock,
  FakeCourseTrapVisual,
  SourceTruthExportVisual,
  CourseTruthStackVisual,
  AICourseContentWorkflowVisual,
  TiredTeacherTestVisual,
};
