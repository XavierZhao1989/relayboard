"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  accounts,
  seedActivities,
  seedDeals,
  type Activity,
  type Deal,
  type Stage,
} from "@/lib/data";

type Note = {
  id: string;
  text: string;
};

type WorkspaceValue = {
  accounts: typeof accounts;
  deals: Deal[];
  activities: Activity[];
  notes: Record<string, Note[]>;
  addDeal: (deal: Omit<Deal, "id">) => void;
  moveDeal: (id: string, stage: Stage) => void;
  removeDeal: (id: string) => void;
  addNote: (accountId: string, text: string) => void;
};

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>(seedDeals);
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [notes, setNotes] = useState<Record<string, Note[]>>({});

  const value = useMemo<WorkspaceValue>(() => {
    function log(accountId: string, title: string, detail: string) {
      setActivities((current) => [
        {
          id: `session-${crypto.randomUUID()}`,
          accountId,
          title,
          detail,
          at: "session",
        },
        ...current,
      ]);
    }

    return {
      accounts,
      deals,
      activities,
      notes,
      addDeal: (deal) => {
        const id = `deal-${crypto.randomUUID()}`;
        setDeals((current) => [{ ...deal, id }, ...current]);
        log(deal.accountId, "Deal added", deal.name);
      },
      moveDeal: (id, stage) => {
        const deal = deals.find((item) => item.id === id);
        if (!deal || deal.stage === stage) return;
        setDeals((current) =>
          current.map((item) => (item.id === id ? { ...item, stage } : item)),
        );
        log(deal.accountId, `Stage set to ${stage}`, deal.name);
      },
      removeDeal: (id) => {
        const deal = deals.find((item) => item.id === id);
        if (!deal) return;
        setDeals((current) => current.filter((item) => item.id !== id));
        log(deal.accountId, "Deal removed", deal.name);
      },
      addNote: (accountId, text) => {
        setNotes((current) => ({
          ...current,
          [accountId]: [
            { id: `note-${crypto.randomUUID()}`, text },
            ...(current[accountId] ?? []),
          ],
        }));
        log(accountId, "Note saved", text);
      },
    };
  }, [activities, deals, notes]);

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return value;
}
