import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "OTS-101 Course Book — OpenTeachStack",
  description:
    "Start the OTS-101 foundations course book.",
  path: "/course",
});

export default function CoursePage() {
  redirect("/book/ots-101");
}
