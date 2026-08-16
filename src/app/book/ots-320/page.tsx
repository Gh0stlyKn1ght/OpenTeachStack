import type { Metadata } from "next";
import CoursePacketOverviewTemplate from "@/components/course-packet/CoursePacketOverviewTemplate";
import { courseStructurePacketView } from "@/lib/course-packet-adapters";
import { OTS320_COURSE } from "@/lib/ots320Course";

export const metadata: Metadata = {
  title: "OTS-320 Command Line AI for Teacher Builders — OpenTeachStack",
  description:
    "Use command-line AI agents with bounded context, explicit permissions, Git evidence, verification, and human review.",
};

export default function Ots320BookPage() {
  return <CoursePacketOverviewTemplate course={courseStructurePacketView(OTS320_COURSE)} />;
}
