import Link from "next/link";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

export default function AfterNotFound() {
  return (
    <div className="mx-auto max-w-lg py-10">
      <h1 className="font-heading text-3xl tracking-tight">That account is not in the sample book</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The link does not match one of the twelve seeded accounts. Deals added in this session do
        not create new account pages.
      </p>
      <Link
        href="/after/accounts"
        className={cn(
          "mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          focusRing,
        )}
      >
        Back to accounts
      </Link>
    </div>
  );
}
