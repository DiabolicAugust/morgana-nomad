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
      <h1 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-headline-lg">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted-foreground text-sm">
        A temporary error occurred. You can try again or return to the homepage.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
      >
        Try again
      </button>
    </div>
  );
}
