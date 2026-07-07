import type { Metadata } from "next";
import CoursePacketOverviewTemplate from "@/components/course-packet/CoursePacketOverviewTemplate";
import { CYBER_COURSE_CODE } from "@/lib/cyberSafety";
import { cyberSafetyPacketView } from "@/lib/course-packet-adapters";

export const metadata: Metadata = {
  title: `${CYBER_COURSE_CODE} Course Book — OpenTeachStack`,
  description:
    "OTS-280 CourseOS packet for Cyber Safety for Educators.",
};

export default function Ots280BookPage() {
  return <CoursePacketOverviewTemplate course={cyberSafetyPacketView()} />;
}
