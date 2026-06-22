import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "OTS-101 Course Book — Teaching Teachers",
  description:
    "Start the OTS-101 Teaching Teachers Foundations course book.",
  path: "/course",
});

export default function CoursePage() {
  redirect("/book/ots-101");
}
