import {
  OPEN_STAGES,
  STAGES,
  STAGE_WEIGHT,
  type Account,
  type Deal,
  type Stage,
} from "@/lib/data";
import { daysUntil, monthLabel } from "@/lib/format";

export function isOpen(stage: Stage) {
  return stage !== "Won" && stage !== "Lost";
}

export function summarize(deals: Deal[], accountList: Account[]) {
  const open = deals.filter((deal) => isOpen(deal.stage));
  const openPipeline = open.reduce((sum, deal) => sum + deal.amount, 0);
  const weighted = open.reduce(
    (sum, deal) => sum + deal.amount * STAGE_WEIGHT[deal.stage],
    0,
  );
  const atRisk = accountList.filter((account) => account.health === "At risk");
  const closingSoon = open.filter((deal) => {
    const days = daysUntil(deal.closeDate);
    return days >= 0 && days <= 30;
  });
  const won = deals.filter((deal) => deal.stage === "Won").length;
  const lost = deals.filter((deal) => deal.stage === "Lost").length;
  const winRate = won + lost === 0 ? null : won / (won + lost);
  const byStage = STAGES.map((stage) => {
    const rows = deals.filter((deal) => deal.stage === stage);
    return {
      stage,
      count: rows.length,
      amount: rows.reduce((sum, deal) => sum + deal.amount, 0),
    };
  });

  return { open, openPipeline, weighted, atRisk, closingSoon, winRate, byStage };
}

export function forecastMonths(deals: Deal[]) {
  const buckets = new Map<string, { label: string; count: number; amount: number }>();
  for (const deal of deals) {
    if (!isOpen(deal.stage)) continue;
    const label = monthLabel(deal.closeDate);
    const current = buckets.get(label) ?? { label, count: 0, amount: 0 };
    current.count += 1;
    current.amount += deal.amount;
    buckets.set(label, current);
  }
  return [...buckets.values()];
}

export function stalledRenewals(deals: Deal[]) {
  return deals.filter((deal) => {
    const renewal = deal.name.toLowerCase().includes("renewal");
    const days = daysUntil(deal.closeDate);
    return renewal && isOpen(deal.stage) && days <= 14 && deal.nextStep.trim() === "";
  });
}

export function stageColumns(showClosed: boolean): Stage[] {
  return showClosed ? [...STAGES] : [...OPEN_STAGES];
}
