"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground text-sm">
        A temporary error occurred. You can try again or return to the homepage.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
      >
        Try again
      </button>
    </div>
  );
}
