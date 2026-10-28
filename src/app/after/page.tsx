import type { Metadata } from "next";
import { Overview } from "@/components/workspace/overview";

export const metadata: Metadata = {
  title: "Overview",
  description: "Open pipeline, forecast, at-risk accounts, and recent activity in the Relayboard sample book.",
};

export default function AfterPage() {
  return <Overview />;
}
