"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkspace } from "@/components/workspace/provider";
import { EmptyState, HealthBadge, PageHeader } from "@/components/workspace/ui";
import { downloadCsv } from "@/lib/csv";
import type { Health } from "@/lib/data";
import { money, shortDate } from "@/lib/format";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

const healthOptions = ["All", "Healthy", "Watch", "At risk"] as const;
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "arr", label: "ARR" },
  { value: "touch", label: "Last touch" },
] as const;

export function AccountsView() {
  const { accounts } = useWorkspace();
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState<(typeof healthOptions)[number]>("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("name");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = accounts.filter((account) => {
      const matchesHealth = health === "All" || account.health === health;
      const haystack = `${account.name} ${account.industry} ${account.region}`.toLowerCase();
      return matchesHealth && (needle.length === 0 || haystack.includes(needle));
    });
    return filtered.sort((a, b) => {
      if (sort === "arr") return b.arr - a.arr;
      if (sort === "touch") return b.lastTouch.localeCompare(a.lastTouch);
      return a.name.localeCompare(b.name);
    });
  }, [accounts, health, query, sort]);

  function exportRows() {
    if (rows.length === 0) {
      toast.error("Nothing to export in this view");
      return;
    }
    downloadCsv(
      "relayboard-accounts.csv",
      ["Account", "Industry", "Region", "ARR", "Health", "Desk", "Last touch"],
      rows.map((account) => [
        account.name,
        account.industry,
        account.region,
        String(account.arr),
        account.health,
        account.desk,
        account.lastTouch,
      ]),
    );
    toast.success(`Exported ${rows.length} accounts`);
  }

  function clearFilters() {
    setQuery("");
    setHealth("All");
    setSort("name");
  }

  const filtered = query.trim().length > 0 || health !== "All";

  return (
    <div>
      <PageHeader
        eyebrow="Accounts"
        title="Account book"
        description="Twelve fictional companies. Search and health filters apply to the list and to the export."
        actions={
          <Button type="button" variant="outline" onClick={exportRows}>
            Export
          </Button>
        }
      />

      <div className="mb-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
        <div className="grid gap-1.5">
          <Label htmlFor="account-search">Search accounts</Label>
          <Input
            id="account-search"
            type="search"
            value={query}
            autoComplete="off"
            placeholder="Name, industry, or region"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="account-health">Health</Label>
          <Select
            value={health}
            onValueChange={(value) => setHealth(value as (typeof healthOptions)[number])}
          >
            <SelectTrigger id="account-health" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {healthOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="account-sort">Sort by</Label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as (typeof sortOptions)[number]["value"])}
          >
            <SelectTrigger id="account-sort" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
        Showing {rows.length} of {accounts.length} accounts
      </p>

      {rows.length === 0 ? (
        <EmptyState
          title="No accounts match"
          body="Nothing in the sample book fits this search and health filter."
          action={
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>ARR</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Last touch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((account) => (
                  <TableRow key={account.id} className="hover:bg-muted/70">
                    <TableCell>
                      <Link
                        href={`/after/accounts/${account.id}`}
                        className={cn("font-medium underline-offset-4 hover:underline", focusRing)}
                      >
                        {account.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">{account.region}</div>
                    </TableCell>
                    <TableCell>{account.industry}</TableCell>
                    <TableCell className="tabular-nums">{money(account.arr)}</TableCell>
                    <TableCell>
                      <HealthBadge health={account.health as Health} />
                    </TableCell>
                    <TableCell>{shortDate(account.lastTouch)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <ul className="grid gap-3 md:hidden">
            {rows.map((account) => (
              <li key={account.id}>
                <Link
                  href={`/after/accounts/${account.id}`}
                  className={cn(
                    "block rounded-xl bg-card p-4 ring-1 ring-foreground/10 hover:bg-muted/60 active:bg-muted",
                    focusRing,
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-medium">{account.name}</span>
                    <HealthBadge health={account.health} />
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground">
                    {account.industry} · {account.region}
                  </span>
                  <span className="mt-1 block text-sm tabular-nums">
                    {money(account.arr)} ARR · {shortDate(account.lastTouch)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {filtered ? (
            <div className="mt-4">
              <Button type="button" variant="ghost" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
