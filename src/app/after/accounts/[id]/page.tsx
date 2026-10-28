import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountDetail } from "@/components/workspace/account-detail";
import { accounts, getAccount } from "@/lib/data";

export function generateStaticParams() {
  return accounts.map((account) => ({ id: account.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const account = getAccount(id);
  if (!account) return { title: "Account not found" };
  return {
    title: account.name,
    description: account.summary,
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getAccount(id)) notFound();
  return <AccountDetail id={id} />;
}
