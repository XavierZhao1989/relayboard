"use client";

import Link from "next/link";
import { useWorkspace } from "@/components/workspace/provider";
import { EmptyState, HealthBadge, PageHeader } from "@/components/workspace/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { accountName } from "@/lib/data";
import { closeLabel, money, shortDate } from "@/lib/format";
import { stalledRenewals, summarize } from "@/lib/metrics";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

export function Overview() {
  const { accounts, deals, activities } = useWorkspace();
  const summary = summarize(deals, accounts);
  const stalled = stalledRenewals(deals);
  const openStages = summary.byStage.filter(
    (row) => row.stage !== "Won" && row.stage !== "Lost",
  );
  const max = Math.max(...openStages.map((row) => row.amount), 1);

  const kpis = [
    {
      label: "Open pipeline",
      value: money(summary.openPipeline),
      hint: `${summary.open.length} deals still open`,
    },
    {
      label: "Weighted forecast",
      value: money(summary.weighted),
      hint: "Qualified 20% through negotiation 80%",
    },
    {
      label: "At-risk accounts",
      value: String(summary.atRisk.length),
      hint: money(summary.atRisk.reduce((sum, account) => sum + account.arr, 0)) + " ARR",
    },
    {
      label: "Closing in 30 days",
      value: String(summary.closingSoon.length),
      hint: "Open deals dated from Oct 28, 2026",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Pipeline desk"
        description="Open work for the sample sales book. Dates are fixed to October 28, 2026 so the figures do not drift."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="font-heading text-3xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{kpi.hint}</CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:col-span-3">
          <h2 className="font-heading text-2xl tracking-tight">Open pipeline by stage</h2>
          <ul className="mt-4 grid gap-4">
            {openStages.map((row) => (
              <li key={row.stage}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">
                    {row.stage}
                    <span className="ml-2 text-muted-foreground">{row.count}</span>
                  </span>
                  <span className="tabular-nums">{money(row.amount)}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.max(4, (row.amount / max) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:col-span-2">
          <h2 className="font-heading text-2xl tracking-tight">At-risk accounts</h2>
          <ul className="mt-4 grid gap-3">
            {summary.atRisk.map((account) => (
              <li key={account.id}>
                <Link
                  href={`/after/accounts/${account.id}`}
                  className={cn(
                    "block rounded-lg px-2 py-2 hover:bg-muted active:bg-secondary",
                    focusRing,
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-medium">{account.name}</span>
                    <HealthBadge health={account.health} />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {money(account.arr)} ARR · last touch {shortDate(account.lastTouch)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl tracking-tight">Recent activity</h2>
          <ol className="mt-4 grid gap-4">
            {activities.slice(0, 6).map((activity) => (
              <li key={activity.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground">{shortDate(activity.at)}</p>
                <p className="mt-1 font-medium">{activity.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {activity.detail} {accountName(activity.accountId)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="stalled-heading">
          <h2 id="stalled-heading" className="sr-only">
            Stalled renewals
          </h2>
          {stalled.length === 0 ? (
            <EmptyState
              title="No stalled renewals"
              body="A renewal counts as stalled when it closes within 14 days and the next step is blank. District renewal closes soon, and it still has a next step."
            />
          ) : (
            <ul className="grid gap-2">
              {stalled.map((deal) => (
                <li key={deal.id} className="rounded-lg bg-card p-4 ring-1 ring-foreground/10">
                  <p className="font-medium">{deal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {accountName(deal.accountId)} · {closeLabel(deal.closeDate, deal.stage)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
