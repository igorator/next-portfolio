"use client";

import { ErrorSection } from "@/shared/components/pages/Error/ErrorSection";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorSection reset={reset} />;
}
