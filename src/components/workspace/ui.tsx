import type { ReactNode } from "react";
import { cn } from "cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        <h1 className="mt-1 font-heading text-3xl tracking-tight text-balance">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
  heading = "h2",
}: {
  title: string;
  body: string;
  action?: ReactNode;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-5 py-8 text-center">
      <Heading className="font-heading text-2xl tracking-tight">{title}</Heading>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {body}
      </p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

const healthClass = {
  Healthy: "bg-[#e5f0ea] text-[#1e4a38]",
  Watch: "bg-[#f8edd8] text-[#6b4510]",
  "At risk": "bg-[#f8e4e1] text-[#8f2d2d]",
} as const;

export function HealthBadge({ health }: { health: keyof typeof healthClass }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2 text-xs font-medium",
        healthClass[health],
      )}
    >
      {health}
    </span>
  );
}
