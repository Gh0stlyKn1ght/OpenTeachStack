"use client";

import CoursePacketBoundary from "@/components/course-packet/CoursePacketBoundary";

export default function Ots101CourseError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <CoursePacketBoundary
      courseSlug="ots-101"
      error={error}
      unstable_retry={unstable_retry}
    />
  );
}
