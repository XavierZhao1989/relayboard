"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspace } from "@/components/workspace/provider";
import { EmptyState, PageHeader } from "@/components/workspace/ui";
import { downloadCsv } from "@/lib/csv";
import { accountName, isStage, type Deal, type Stage } from "@/lib/data";
import { closeLabel, money } from "@/lib/format";
import { stageColumns } from "@/lib/metrics";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

export function DealsBoard() {
  const { deals, moveDeal, removeDeal } = useWorkspace();
  const [query, setQuery] = useState("");
  const [showClosed, setShowClosed] = useState(false);
  const [pending, setPending] = useState<Deal | null>(null);

  const columns = stageColumns(showClosed);
  const needle = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return deals.filter((deal) => {
      if (!showClosed && (deal.stage === "Won" || deal.stage === "Lost")) return false;
      if (!needle) return true;
      const haystack = `${deal.name} ${accountName(deal.accountId)}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [deals, needle, showClosed]);

  function exportRows() {
    if (visible.length === 0) {
      toast.error("Nothing to export in this view");
      return;
    }
    downloadCsv(
      "relayboard-deals.csv",
      ["Deal", "Account", "Amount", "Stage", "Close date", "Next step"],
      visible.map((deal) => [
        deal.name,
        accountName(deal.accountId),
        String(deal.amount),
        deal.stage,
        deal.closeDate,
        deal.nextStep,
      ]),
    );
    toast.success(`Exported ${visible.length} deals`);
  }

  function confirmRemove() {
    if (!pending) return;
    removeDeal(pending.id);
    toast.success(`Removed ${pending.name}`);
    setPending(null);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Deals"
        title="Pipeline"
        description="Move a card by changing its stage. Won and lost stay hidden until you ask for them."
        actions={
          <Button type="button" variant="outline" onClick={exportRows}>
            Export
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="grid flex-1 gap-1.5">
          <Label htmlFor="deal-search">Search deals</Label>
          <Input
            id="deal-search"
            type="search"
            value={query}
            autoComplete="off"
            placeholder="Deal or account name"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <label className="flex h-10 items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            className="size-4 accent-primary"
            checked={showClosed}
            onChange={(event) => setShowClosed(event.target.checked)}
          />
          Show won and lost
        </label>
      </div>

      <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} deals
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No deals match"
          body="Nothing on the board fits this search. Clear it to see the pipeline again."
          action={
            <Button type="button" variant="outline" onClick={() => setQuery("")}>
              Clear search
            </Button>
          }
        />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-3">
          {columns.map((stage) => {
            const cards = visible.filter((deal) => deal.stage === stage);
            return (
              <section
                key={stage}
                className="w-72 shrink-0 rounded-xl bg-muted/70 p-3"
                aria-label={stage}
              >
                <h2 className="px-1 font-heading text-xl tracking-tight">
                  {stage}
                  <span className="ml-2 text-sm font-sans text-muted-foreground">
                    {cards.length}
                  </span>
                </h2>
                {cards.length === 0 ? (
                  <p className="mt-3 rounded-lg border border-dashed border-border bg-card px-3 py-6 text-center text-sm text-muted-foreground">
                    Nothing in {stage}.
                  </p>
                ) : (
                  <ul className="mt-3 grid gap-3">
                    {cards.map((deal) => (
                      <li key={deal.id}>
                        <article className="rounded-xl bg-card p-3 ring-1 ring-foreground/10 transition hover:-translate-y-0.5 hover:ring-foreground/25">
                          <p className="font-medium leading-5">{deal.name}</p>
                          <Link
                            href={`/after/accounts/${deal.accountId}`}
                            className={cn(
                              "mt-1 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
                              focusRing,
                            )}
                          >
                            {accountName(deal.accountId)}
                          </Link>
                          <p className="mt-2 text-sm tabular-nums">{money(deal.amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {closeLabel(deal.closeDate, deal.stage)}
                          </p>
                          {deal.nextStep ? (
                            <p className="mt-2 text-sm leading-5">Next: {deal.nextStep}</p>
                          ) : null}
                          <div className="mt-3 grid gap-1.5">
                            <Label htmlFor={`stage-${deal.id}`}>Stage</Label>
                            <Select
                              value={deal.stage}
                              onValueChange={(value) => {
                                if (!isStage(value) || value === deal.stage) return;
                                moveDeal(deal.id, value as Stage);
                                toast.success(`${deal.name} moved to ${value}`);
                              }}
                            >
                              <SelectTrigger id={`stage-${deal.id}`} className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {stageColumns(true).map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            className="mt-2 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => setPending(deal)}
                          >
                            Remove
                          </Button>
                        </article>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}

      <Dialog open={Boolean(pending)} onOpenChange={(open) => !open && setPending(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove this deal?</DialogTitle>
            <DialogDescription>
              {pending
                ? `${pending.name} will leave the board for this session. The sample book reloads when you refresh the page.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setPending(null)}>
              Keep deal
            </Button>
            <Button type="button" variant="destructive" onClick={confirmRemove}>
              Remove deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
