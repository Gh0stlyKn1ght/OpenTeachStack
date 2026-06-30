import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Start OpenTeachStack — Course Book",
  description:
    "Start the OpenTeachStack course book with OTS-000.",
  path: "/course",
});

export default function CoursePage() {
  redirect("/book/ots-000");
}
