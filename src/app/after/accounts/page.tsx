import type { Metadata } from "next";
import { AccountsView } from "@/components/workspace/accounts";

export const metadata: Metadata = {
  title: "Accounts",
  description: "Searchable account book for the Relayboard sample data.",
};

export default function AccountsPage() {
  return <AccountsView />;
}
