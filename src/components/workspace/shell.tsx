"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { NewDealDialog } from "@/components/workspace/new-deal-dialog";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

const links = [
  { href: "/after", label: "Overview" },
  { href: "/after/accounts", label: "Accounts" },
  { href: "/after/deals", label: "Deals" },
  { href: "/after/reports", label: "Reports" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Workspace" className="grid gap-1">
      {links.map((link) => {
        const active =
          link.href === "/after"
            ? pathname === "/after"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted active:bg-secondary",
              focusRing,
              active
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <aside className="hidden border-r border-border bg-card lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:gap-6 lg:p-4">
        <Link href="/after" className={cn("rounded-md px-2 py-1", focusRing)}>
          <span className="block font-heading text-3xl tracking-tight">Relayboard</span>
          <span className="mt-1 block text-sm text-muted-foreground">Pipeline desk</span>
        </Link>
        <NavLinks />
        <div className="mt-auto grid gap-3 px-2">
          <p className="text-xs leading-5 text-muted-foreground">
            Sample book for Q4 2026. Figures stay in this browser session.
          </p>
          <Link
            href="/"
            className={cn(
              "text-sm font-medium underline-offset-4 hover:underline",
              focusRing,
            )}
          >
            Case study
          </Link>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-card">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Relayboard</SheetTitle>
                <SheetDescription>Pages in the sample book.</SheetDescription>
              </SheetHeader>
              <div className="px-4">
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
              <div className="mt-auto p-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={cn("text-sm font-medium underline-offset-4 hover:underline", focusRing)}
                >
                  Case study
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <p className="font-heading text-xl tracking-tight lg:hidden">Relayboard</p>
          <p className="hidden text-sm text-muted-foreground lg:block">
            Sample book · Q4 2026
          </p>
          <div className="ml-auto">
            <NewDealDialog />
          </div>
        </header>
        <main id="main" tabIndex={-1} className="px-4 py-6 focus:outline-none lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
