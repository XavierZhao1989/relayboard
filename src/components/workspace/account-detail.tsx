"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewDealDialog } from "@/components/workspace/new-deal-dialog";
import { useWorkspace } from "@/components/workspace/provider";
import { EmptyState, HealthBadge } from "@/components/workspace/ui";
import { getAccount } from "@/lib/data";
import { closeLabel, money, shortDate } from "@/lib/format";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

export function AccountDetail({ id }: { id: string }) {
  const found = getAccount(id);
  const { deals, activities, notes, addNote } = useWorkspace();
  const [draft, setDraft] = useState("");
  const [noteError, setNoteError] = useState("");

  if (!found) {
    notFound();
  }

  const account = found;

  const accountDeals = deals.filter((deal) => deal.accountId === account.id);
  const accountActivity = activities.filter((item) => item.accountId === account.id);
  const sessionNotes = notes[account.id] ?? [];

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (text.length < 2) {
      setNoteError("Write a note before saving.");
      return;
    }
    addNote(account.id, text);
    setDraft("");
    setNoteError("");
    toast.success("Note saved in this session");
  }

  const facts = [
    ["Industry", account.industry],
    ["Region", account.region],
    ["ARR", money(account.arr)],
    ["Desk", account.desk],
    ["Employees", account.employees],
    ["Last touch", shortDate(account.lastTouch)],
  ];

  return (
    <div>
      <Link
        href="/after/accounts"
        className={cn(
          "inline-flex items-center gap-1 rounded-md text-sm font-medium underline-offset-4 hover:underline",
          focusRing,
        )}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Accounts
      </Link>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl tracking-tight">{account.name}</h1>
            <HealthBadge health={account.health} />
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{account.summary}</p>
        </div>
        <NewDealDialog lockedAccountId={account.id} label="Add deal" />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10 sm:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl tracking-tight">Deals</h2>
          {accountDeals.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                heading="h3"
                title="No deals yet"
                body="This account is in the book, and nothing is open or closed against it."
              />
            </div>
          ) : (
            <ul className="mt-4 grid gap-3">
              {accountDeals.map((deal) => (
                <li key={deal.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{deal.name}</p>
                    <p className="tabular-nums">{money(deal.amount)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {deal.stage} · {closeLabel(deal.closeDate, deal.stage)}
                  </p>
                  {deal.nextStep ? (
                    <p className="mt-2 text-sm leading-6">Next step: {deal.nextStep}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl tracking-tight">Notes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Notes stay in this browser session.
          </p>
          <form onSubmit={saveNote} className="mt-4 grid gap-2" noValidate>
            <Label htmlFor="account-note">Add a note</Label>
            <Textarea
              id="account-note"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-invalid={Boolean(noteError)}
              aria-describedby={noteError ? "account-note-error" : undefined}
              rows={3}
            />
            {noteError ? (
              <p id="account-note-error" className="text-sm text-destructive" role="alert">
                {noteError}
              </p>
            ) : null}
            <div>
              <Button type="submit">Save note</Button>
            </div>
          </form>
          {sessionNotes.length > 0 ? (
            <ul className="mt-4 grid gap-3">
              {sessionNotes.map((note) => (
                <li key={note.id} className="rounded-lg bg-muted px-3 py-2 text-sm leading-6">
                  {note.text}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      <section className="mt-6 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
        <h2 className="font-heading text-2xl tracking-tight">Activity</h2>
        {accountActivity.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              heading="h3"
              title="No activity yet"
              body="Nothing has been logged for this account in the sample book."
            />
          </div>
        ) : (
          <ol className="mt-4 grid gap-4">
            {accountActivity.map((item) => (
              <li key={item.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground">{shortDate(item.at)}</p>
                <p className="mt-1 font-medium">{item.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
