import Link from "next/link";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6">
      <p className="text-sm font-medium text-muted-foreground">Relayboard</p>
      <h1 className="mt-2 font-heading text-4xl tracking-tight">This page is not in the demo</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The case study, the rough prototype, and the finished pipeline desk are the only routes.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className={cn(
            "inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
            focusRing,
          )}
        >
          Case study
        </Link>
        <Link
          href="/after"
          className={cn(
            "inline-flex h-10 items-center rounded-lg border border-border bg-card px-3.5 text-sm font-medium hover:bg-muted",
            focusRing,
          )}
        >
          Finished demo
        </Link>
      </div>
    </main>
  );
}
