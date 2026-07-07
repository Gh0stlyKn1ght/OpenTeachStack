import type { Metadata } from "next";
import CoursePacketOverviewTemplate from "@/components/course-packet/CoursePacketOverviewTemplate";
import { BOOK_COURSE_CODE } from "@/lib/book";
import { ots101PacketView } from "@/lib/course-packet-adapters";

export const metadata: Metadata = {
  title: `${BOOK_COURSE_CODE} Course Book — OpenTeachStack`,
  description:
    `${BOOK_COURSE_CODE} CourseOS packet for the OpenTeachStack course-content foundations sequence.`,
};

export default function Ots101BookPage() {
  return <CoursePacketOverviewTemplate course={ots101PacketView()} />;
}
