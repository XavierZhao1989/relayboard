"use client";

import { Button } from "@/components/ui/button";

export default function AfterError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="mx-auto max-w-lg py-10">
      <h1 className="font-heading text-3xl tracking-tight">This view failed to load</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The page hit an unexpected error. Retry the view, or go back to the overview.
      </p>
      <div className="mt-5 flex gap-2">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href="/after">Overview</a>
        </Button>
      </div>
    </div>
  );
}
