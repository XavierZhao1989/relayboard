import type { Metadata } from "next";
import { DealsBoard } from "@/components/workspace/deals";

export const metadata: Metadata = {
  title: "Deals",
  description: "Pipeline board for the Relayboard sample book. Stage changes stay in the session.",
};

export default function DealsPage() {
  return <DealsBoard />;
}
