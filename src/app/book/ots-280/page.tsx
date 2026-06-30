import type { Metadata } from "next";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { CYBER_COURSE_CODE, CYBER_COURSE_PATH } from "@/lib/cyberSafety";

export const metadata: Metadata = {
  title: `${CYBER_COURSE_CODE} Course Book — OpenTeachStack`,
  description:
    "OTS-280 book-style table of contents for Cyber Safety for Educators.",
};

export default function Ots280BookPage() {
  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} Coming Soon`}
      title="Cyber Safety for Educators"
      subtitle="This course is intentionally unavailable until OTS-000 and OTS-101 are rebuilt, reviewed, and strong enough to guide the rest of the pathway."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Course path", value: CYBER_COURSE_PATH },
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Status", value: "Coming Soon" },
        { label: "Boundary", value: "Frozen until OTS-000/101 is right" },
      ]}
    >
      <ArticleBody>
        <section className="book-spread">
          <div>
            <h2>Why this course is not open yet</h2>
            <p>
              OpenTeachStack is rebuilding one real course first. We are not
              publishing placeholder chapter pages, fake lesson bodies, or
              scaffolded course content just to make the pathway look full.
            </p>
            <p>
              Finish the OTS-000 on-ramp and OTS-101 foundations sequence first.
              After that sequence proves the content model, OTS-280 can be
              rebuilt intentionally.
            </p>
          </div>
          <ArtifactCard
            title="Coming Soon"
            description="This course stays frozen until OTS-000 and OTS-101 have real, reviewed, teacher-useful lesson content."
          />
        </section>

        <Link href="/book/ots-000" className="book-action">
          Return to OTS-000
        </Link>
      </ArticleBody>
    </FieldGuidePage>
  );
}

