"use client";

import CourseUnavailableNotice from "./CourseUnavailableNotice";

interface CoursePacketBoundaryProps {
  courseSlug: string;
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function CoursePacketBoundary({
  courseSlug,
  error,
  unstable_retry,
}: CoursePacketBoundaryProps) {
  const failureCategory = error.digest
    ? "course-render-error"
    : "course-render-error-without-digest";

  return (
    <CourseUnavailableNotice
      courseSlug={courseSlug}
      failureCategory={failureCategory}
      suggestedCommand={`npm.cmd run report:course-health -- --course ${courseSlug} --report-only`}
      errorDigest={error.digest}
      onRetry={unstable_retry}
    />
  );
}
