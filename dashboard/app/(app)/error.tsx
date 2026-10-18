"use client";

import { ErrorState } from "@/components/page-state";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState onRetry={reset} />;
}
