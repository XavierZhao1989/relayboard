"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkspace } from "@/components/workspace/provider";
import { EmptyState, PageHeader } from "@/components/workspace/ui";
import { money } from "@/lib/format";
import { forecastMonths, stalledRenewals, summarize } from "@/lib/metrics";

type Phase = "ready" | "loading" | "error";

export function ReportsView() {
  const { accounts, deals } = useWorkspace();
  const [phase, setPhase] = useState<Phase>("ready");
  const summary = summarize(deals, accounts);
  const months = forecastMonths(deals);
  const stalled = stalledRenewals(deals);
  const max = Math.max(...summary.byStage.map((row) => row.amount), 1);
  const winRate =
    summary.winRate === null ? "No closed deals" : `${Math.round(summary.winRate * 100)}%`;

  function replayLoading() {
    setPhase("loading");
    window.setTimeout(() => {
      setPhase((current) => (current === "loading" ? "ready" : current));
    }, 800);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="Quarter report"
        description="The sample book is already local. Refresh replays the loading state a live fetch would show."
        actions={
          <>
            <Button type="button" variant="outline" onClick={replayLoading}>
              Refresh report
            </Button>
            <Button type="button" variant="outline" onClick={() => setPhase("error")}>
              Show error state
            </Button>
          </>
        }
      />

      <p className="sr-only" aria-live="polite">
        {phase === "loading"
          ? "Loading report"
          : phase === "error"
            ? "Report failed to load"
            : "Report ready"}
      </p>

      {phase === "loading" ? (
        <div className="grid gap-4" aria-busy="true">
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-64" />
          <Skeleton className="h-48" />
        </div>
      ) : null}

      {phase === "error" ? (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-card px-5 py-8"
        >
          <h2 className="font-heading text-2xl tracking-tight">The report did not load</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            This is a simulated failure. The sample figures are still on this page once you retry.
          </p>
          <Button type="button" className="mt-4" onClick={() => setPhase("ready")}>
            Retry
          </Button>
        </div>
      ) : null}

      {phase === "ready" ? (
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <h2 className="text-sm font-medium text-muted-foreground">Win rate</h2>
              <p className="mt-2 font-heading text-3xl tabular-nums">{winRate}</p>
              <p className="mt-2 text-sm text-muted-foreground">Closed deals in the sample book</p>
            </article>
            <article className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <h2 className="text-sm font-medium text-muted-foreground">Weighted forecast</h2>
              <p className="mt-2 font-heading text-3xl tabular-nums">{money(summary.weighted)}</p>
              <p className="mt-2 text-sm text-muted-foreground">Open deals only</p>
            </article>
            <article className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <h2 className="text-sm font-medium text-muted-foreground">At-risk ARR</h2>
              <p className="mt-2 font-heading text-3xl tabular-nums">
                {money(summary.atRisk.reduce((sum, account) => sum + account.arr, 0))}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {summary.atRisk.length} accounts marked at risk
              </p>
            </article>
          </div>

          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl tracking-tight">Value by stage</h2>
            <ul className="mt-4 grid gap-3">
              {summary.byStage.map((row) => (
                <li key={row.stage} className="grid grid-cols-[8rem_minmax(0,1fr)_6rem] items-center gap-3 text-sm">
                  <span className="font-medium">{row.stage}</span>
                  <span className="h-2 rounded-full bg-muted">
                    <span
                      className={
                        row.stage === "Won"
                          ? "block h-2 rounded-full bg-chart-2"
                          : row.stage === "Lost"
                            ? "block h-2 rounded-full bg-muted-foreground/50"
                            : "block h-2 rounded-full bg-primary"
                      }
                      style={{
                        width: row.amount === 0 ? "0%" : `${Math.max(4, (row.amount / max) * 100)}%`,
                      }}
                    />
                  </span>
                  <span className="text-right tabular-nums">{money(row.amount)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl tracking-tight">Forecast by close month</h2>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Open deals</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {months.map((month) => (
                    <TableRow key={month.label} className="hover:bg-muted/70">
                      <TableCell>{month.label}</TableCell>
                      <TableCell className="tabular-nums">{month.count}</TableCell>
                      <TableCell className="tabular-nums">{money(month.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section>
            {stalled.length === 0 ? (
              <EmptyState
                title="No stalled renewals"
                body="A renewal counts as stalled when it closes within 14 days and the next step is blank. District renewal closes soon, and it still has a next step."
              />
            ) : (
              <ul className="grid gap-2">
                {stalled.map((deal) => (
                  <li key={deal.id}>{deal.name}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
