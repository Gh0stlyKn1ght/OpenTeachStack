import Link from "next/link";
import { OTS_101_STANDARDS_ASSESSMENT_MATRIX } from "@/lib/book";

export default function StandardsAssessmentMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[780px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left font-sans text-xs uppercase tracking-wider text-foreground/40 p-3">
              OTS-101 Module
            </th>
            <th className="text-left font-sans text-xs uppercase tracking-wider text-foreground/40 p-3">
              Standards Alignment
            </th>
            <th className="text-left font-sans text-xs uppercase tracking-wider text-foreground/40 p-3">
              Assessment Trace
            </th>
            <th className="text-left font-sans text-xs uppercase tracking-wider text-foreground/40 p-3">
              Evidence route
            </th>
          </tr>
        </thead>
        <tbody>
          {OTS_101_STANDARDS_ASSESSMENT_MATRIX.map((row) => (
            <tr key={row.module} className="border-b border-border">
              <td className="p-3 align-top text-sm">
                <p className="font-semibold text-foreground">{row.module}</p>
              </td>
              <td className="p-3 align-top text-sm text-foreground/72">
                {row.standards}
              </td>
              <td className="p-3 align-top text-sm text-foreground/72">
                {row.assessmentArtifact}
              </td>
              <td className="p-3 align-top text-sm">
                <p className="text-foreground/72">{row.sourceReference}</p>
                <Link
                  href={row.evidenceRoute}
                  className="mt-2 inline-flex text-sm font-semibold text-link no-underline hover:underline"
                >
                  Open evidence
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
