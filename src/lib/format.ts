export const AS_OF = "2026-10-28";

const asOfTime = Date.parse(`${AS_OF}T00:00:00Z`);

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function shortDate(iso: string) {
  if (iso === "session") return "This session";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function monthLabel(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function daysUntil(iso: string) {
  const target = Date.parse(`${iso}T00:00:00Z`);
  return Math.round((target - asOfTime) / 86_400_000);
}

export function closeLabel(iso: string, stage: string) {
  if (stage === "Won" || stage === "Lost") return shortDate(iso);
  const days = daysUntil(iso);
  if (days < 0) return `Overdue ${Math.abs(days)} days`;
  if (days === 0) return "Closes today";
  if (days === 1) return "Closes tomorrow";
  return `Closes in ${days} days`;
}
