export const STAGES = [
  "Qualified",
  "Discovery",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
] as const;

export type Stage = (typeof STAGES)[number];

export const OPEN_STAGES: Stage[] = [
  "Qualified",
  "Discovery",
  "Proposal",
  "Negotiation",
];

export const STAGE_WEIGHT: Record<Stage, number> = {
  Qualified: 0.2,
  Discovery: 0.4,
  Proposal: 0.6,
  Negotiation: 0.8,
  Won: 1,
  Lost: 0,
};

export type Health = "Healthy" | "Watch" | "At risk";

export type Account = {
  id: string;
  name: string;
  industry: string;
  region: string;
  arr: number;
  health: Health;
  desk: string;
  employees: string;
  lastTouch: string;
  summary: string;
};

export type Deal = {
  id: string;
  accountId: string;
  name: string;
  amount: number;
  stage: Stage;
  closeDate: string;
  nextStep: string;
};

export type Activity = {
  id: string;
  accountId: string;
  title: string;
  detail: string;
  at: string;
};

export const accounts: Account[] = [
  {
    id: "harbor-pine",
    name: "Harbor & Pine Logistics",
    industry: "Freight",
    region: "Northeast",
    arr: 186000,
    health: "Healthy",
    desk: "East desk",
    employees: "200–500",
    lastTouch: "2026-10-27",
    summary:
      "Regional carrier adding a second desk for yard check-in. Procurement is in the room and the security review is already scheduled.",
  },
  {
    id: "kiln-co",
    name: "Kiln & Co. Ceramics",
    industry: "Manufacturing",
    region: "Midwest",
    arr: 42400,
    health: "Watch",
    desk: "Central desk",
    employees: "20–50",
    lastTouch: "2026-10-20",
    summary:
      "Showroom reorder volume is seasonal. The buyer wants a smaller first desk before the spring line locks.",
  },
  {
    id: "brightwater",
    name: "Brightwater Clinics",
    industry: "Healthcare",
    region: "Southeast",
    arr: 128000,
    health: "Healthy",
    desk: "East desk",
    employees: "500–1,000",
    lastTouch: "2026-10-14",
    summary:
      "Three clinics want a shared intake desk. Legal has the data-processing note and is not blocking the proposal.",
  },
  {
    id: "paperplane",
    name: "Paperplane Schools",
    industry: "Education",
    region: "West",
    arr: 67500,
    health: "At risk",
    desk: "West desk",
    employees: "50–200",
    lastTouch: "2026-10-26",
    summary:
      "District renewal is close, and the champion has been quiet since the budget hearing. The next step is a written scope cut.",
  },
  {
    id: "redcedar",
    name: "Redcedar Outdoor",
    industry: "Retail",
    region: "Mountain",
    arr: 91200,
    health: "Healthy",
    desk: "West desk",
    employees: "50–200",
    lastTouch: "2026-10-16",
    summary:
      "Wholesale desk for the seasonal book. A spring catalog deal was lost earlier; the remaining work is narrower and still active.",
  },
  {
    id: "sable",
    name: "Sable Municipal Utilities",
    industry: "Public sector",
    region: "Midwest",
    arr: 210000,
    health: "Watch",
    desk: "Public sector desk",
    employees: "1,000+",
    lastTouch: "2026-10-07",
    summary:
      "Outage notice desk is through discovery. Purchasing will not issue paper until the council packet is on the December agenda.",
  },
  {
    id: "marlowe",
    name: "Marlowe & Bright Legal",
    industry: "Professional services",
    region: "Northeast",
    arr: 54800,
    health: "Healthy",
    desk: "East desk",
    employees: "20–50",
    lastTouch: "2026-10-11",
    summary:
      "Matter intake is early. The office manager is mapping the current inbox before a second conversation.",
  },
  {
    id: "lowcountry",
    name: "Lowcountry Fisheries",
    industry: "Food",
    region: "Southeast",
    arr: 33600,
    health: "At risk",
    desk: "East desk",
    employees: "20–50",
    lastTouch: "2026-10-09",
    summary:
      "The dock office went quiet after a site visit. There is no open deal until someone answers the last note.",
  },
  {
    id: "aster",
    name: "Aster Transit Authority",
    industry: "Transportation",
    region: "West",
    arr: 246000,
    health: "Healthy",
    desk: "Public sector desk",
    employees: "1,000+",
    lastTouch: "2026-10-24",
    summary:
      "Depot scheduling is the largest open negotiation. Pricing questions are logged and a revised sheet is due this week.",
  },
  {
    id: "fieldglass",
    name: "Fieldglass Instruments",
    industry: "Manufacturing",
    region: "Midwest",
    arr: 77900,
    health: "Watch",
    desk: "Central desk",
    employees: "50–200",
    lastTouch: "2026-10-18",
    summary:
      "Service-contract desk is in discovery. The operations lead wants the dispatch board before they will look at price.",
  },
  {
    id: "northglass",
    name: "Northglass Windows",
    industry: "Construction",
    region: "Northeast",
    arr: 112400,
    health: "Healthy",
    desk: "East desk",
    employees: "200–500",
    lastTouch: "2026-10-22",
    summary:
      "Installer portal proposal is with the owner group. They asked for a phased rollout, starting with two branches.",
  },
  {
    id: "copperline",
    name: "Copperline Credit Union",
    industry: "Financial services",
    region: "Mountain",
    arr: 158000,
    health: "Healthy",
    desk: "West desk",
    employees: "200–500",
    lastTouch: "2026-10-22",
    summary:
      "Branch queue is in negotiation. Member onboarding already closed earlier this month and is the reference site.",
  },
];

export const seedDeals: Deal[] = [
  {
    id: "deal-fleet",
    accountId: "harbor-pine",
    name: "Regional fleet rollout",
    amount: 86000,
    stage: "Negotiation",
    closeDate: "2026-11-18",
    nextStep: "Send the security appendix",
  },
  {
    id: "deal-yard",
    accountId: "harbor-pine",
    name: "Yard sensor add-on",
    amount: 24000,
    stage: "Proposal",
    closeDate: "2026-12-02",
    nextStep: "Confirm sensor count with the yard lead",
  },
  {
    id: "deal-showroom",
    accountId: "kiln-co",
    name: "Showroom reorder desk",
    amount: 18000,
    stage: "Discovery",
    closeDate: "2026-11-30",
    nextStep: "Map the spring reorder calendar",
  },
  {
    id: "deal-intake",
    accountId: "brightwater",
    name: "Clinic intake desk",
    amount: 64000,
    stage: "Proposal",
    closeDate: "2026-11-12",
    nextStep: "Walk the proposal with clinic operations",
  },
  {
    id: "deal-referral",
    accountId: "brightwater",
    name: "Referral routing",
    amount: 22000,
    stage: "Qualified",
    closeDate: "2027-01-20",
    nextStep: "Wait for the intake desk decision",
  },
  {
    id: "deal-district",
    accountId: "paperplane",
    name: "District renewal",
    amount: 41000,
    stage: "Negotiation",
    closeDate: "2026-11-06",
    nextStep: "Send a written scope cut",
  },
  {
    id: "deal-wholesale",
    accountId: "redcedar",
    name: "Seasonal wholesale desk",
    amount: 27500,
    stage: "Discovery",
    closeDate: "2026-12-15",
    nextStep: "Review last season order spikes",
  },
  {
    id: "deal-catalog",
    accountId: "redcedar",
    name: "Spring catalog",
    amount: 12000,
    stage: "Lost",
    closeDate: "2026-09-19",
    nextStep: "",
  },
  {
    id: "deal-outage",
    accountId: "sable",
    name: "Outage notice desk",
    amount: 120000,
    stage: "Proposal",
    closeDate: "2026-12-09",
    nextStep: "Add the desk to the December council packet",
  },
  {
    id: "deal-meter",
    accountId: "sable",
    name: "Meter reading follow-up",
    amount: 28000,
    stage: "Qualified",
    closeDate: "2027-02-03",
    nextStep: "Hold until the outage desk is scheduled",
  },
  {
    id: "deal-matter",
    accountId: "marlowe",
    name: "Matter intake",
    amount: 31000,
    stage: "Qualified",
    closeDate: "2027-01-08",
    nextStep: "Collect a week of inbox samples",
  },
  {
    id: "deal-depot",
    accountId: "aster",
    name: "Depot scheduling",
    amount: 142000,
    stage: "Negotiation",
    closeDate: "2026-11-21",
    nextStep: "Revise the pricing sheet",
  },
  {
    id: "deal-service",
    accountId: "fieldglass",
    name: "Service contract desk",
    amount: 36000,
    stage: "Discovery",
    closeDate: "2026-12-18",
    nextStep: "Shadow one dispatch morning",
  },
  {
    id: "deal-installer",
    accountId: "northglass",
    name: "Installer portal",
    amount: 54000,
    stage: "Proposal",
    closeDate: "2026-11-27",
    nextStep: "Price a two-branch first phase",
  },
  {
    id: "deal-branch",
    accountId: "copperline",
    name: "Branch queue",
    amount: 72000,
    stage: "Negotiation",
    closeDate: "2026-11-14",
    nextStep: "Answer the security review",
  },
  {
    id: "deal-onboarding",
    accountId: "copperline",
    name: "Member onboarding",
    amount: 19000,
    stage: "Won",
    closeDate: "2026-10-02",
    nextStep: "",
  },
];

export const seedActivities: Activity[] = [
  {
    id: "act-1",
    accountId: "harbor-pine",
    title: "Proposal pack sent",
    detail: "Regional fleet rollout, including the yard map.",
    at: "2026-10-27",
  },
  {
    id: "act-2",
    accountId: "paperplane",
    title: "Close date confirmed",
    detail: "District renewal stays on the November board.",
    at: "2026-10-26",
  },
  {
    id: "act-3",
    accountId: "aster",
    title: "Pricing questions logged",
    detail: "Depot scheduling needs a revised sheet this week.",
    at: "2026-10-24",
  },
  {
    id: "act-4",
    accountId: "copperline",
    title: "Security review requested",
    detail: "Branch queue questionnaire is with the west desk.",
    at: "2026-10-22",
  },
  {
    id: "act-5",
    accountId: "northglass",
    title: "Phased rollout requested",
    detail: "Installer portal should start with two branches.",
    at: "2026-10-22",
  },
  {
    id: "act-6",
    accountId: "kiln-co",
    title: "Discovery notes filed",
    detail: "Showroom reorder desk, spring calendar still open.",
    at: "2026-10-20",
  },
  {
    id: "act-7",
    accountId: "fieldglass",
    title: "Dispatch visit proposed",
    detail: "Service contract desk wants a morning on the floor.",
    at: "2026-10-18",
  },
  {
    id: "act-8",
    accountId: "redcedar",
    title: "Scope trimmed",
    detail: "Spring catalog was marked lost. Wholesale desk remains.",
    at: "2026-10-16",
  },
  {
    id: "act-9",
    accountId: "brightwater",
    title: "Intake workshop held",
    detail: "Clinic intake desk, three sites on one queue.",
    at: "2026-10-14",
  },
  {
    id: "act-10",
    accountId: "marlowe",
    title: "Inbox sample requested",
    detail: "Matter intake is waiting on a week of examples.",
    at: "2026-10-11",
  },
  {
    id: "act-11",
    accountId: "lowcountry",
    title: "No reply logged",
    detail: "Dock office has not answered since the site visit.",
    at: "2026-10-09",
  },
  {
    id: "act-12",
    accountId: "sable",
    title: "Requirements received",
    detail: "Outage notice desk, council packet still ahead.",
    at: "2026-10-07",
  },
  {
    id: "act-13",
    accountId: "copperline",
    title: "Onboarding marked won",
    detail: "Member onboarding is the reference for branch queue.",
    at: "2026-10-02",
  },
];

export function isStage(value: string): value is Stage {
  return (STAGES as readonly string[]).includes(value);
}

export function getAccount(id: string) {
  return accounts.find((account) => account.id === id);
}

export function accountName(id: string) {
  return getAccount(id)?.name ?? "Unknown account";
}
