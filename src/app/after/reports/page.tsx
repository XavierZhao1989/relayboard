import type { Metadata } from "next";
import { ReportsView } from "@/components/workspace/reports";

export const metadata: Metadata = {
  title: "Reports",
  description: "Quarter report for the Relayboard sample book, with loading, error, and empty states.",
};

export default function ReportsPage() {
  return <ReportsView />;
}
