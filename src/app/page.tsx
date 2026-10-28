import Image from "next/image";
import Link from "next/link";
import { checklist, fixCount } from "@/lib/checklist";
import { focusRing } from "@/lib/styles";
import { cn } from "cn";

const shots = [
  {
    src: "/shots/before-desktop.jpg",
    alt: "Rough prototype overview on a desktop width: purple gradient sidebar, uneven cards, a lorem panel, and a three-row table.",
    caption: "Rough prototype, desktop",
    width: 1440,
    height: 900,
  },
  {
    src: "/shots/after-desktop.jpg",
    alt: "Finished overview on a desktop width: paper background, four metric cards, pipeline bars, at-risk accounts, and an empty stalled-renewals panel.",
    caption: "Finished demo, desktop",
    width: 1440,
    height: 900,
  },
  {
    src: "/shots/before-mobile.jpg",
    alt: "Rough prototype on a phone width: the page is wider than the screen, so the sidebar eats the viewport and the rest of the dashboard sits off to the side.",
    caption: "Rough prototype, mobile",
    width: 390,
    height: 844,
  },
  {
    src: "/shots/after-mobile.jpg",
    alt: "Finished overview on a phone width: the navigation is collapsed, cards stack, and the page fits the screen.",
    caption: "Finished demo, mobile",
    width: 390,
    height: 844,
  },
];

const routes = [
  ["/", "Case study, punch list, and screenshots"],
  ["/before", "Rough overview. Buttons do nothing."],
  ["/before/reports", "Unfinished reports stub"],
  ["/after", "Finished overview"],
  ["/after/accounts", "Searchable account book"],
  ["/after/accounts/harbor-pine", "Account detail"],
  ["/after/deals", "Pipeline board"],
  ["/after/reports", "Report with loading, empty, and error states"],
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className={cn("rounded-md", focusRing)}>
            <span className="block font-heading text-2xl tracking-tight">Relayboard</span>
            <span className="block text-sm text-muted-foreground">Interface case study</span>
          </Link>
          <nav aria-label="Case study" className="flex gap-4 text-sm font-medium">
            <Link href="/before" className={cn("underline-offset-4 hover:underline", focusRing)}>
              Rough
            </Link>
            <Link href="/after" className={cn("underline-offset-4 hover:underline", focusRing)}>
              Finished
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-10 focus:outline-none sm:px-6 sm:py-14">
        <p className="text-sm font-medium text-muted-foreground">Fictional B2B pipeline desk</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl tracking-tight text-balance sm:text-5xl">
          Finish the last 20% of an AI-built demo.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Relayboard is a sample pipeline workspace for a sales team. The same product is shown
          twice. One route is the rough prototype: uneven type, dead buttons, thin data, and a
          page that stops halfway. The other is the finished demo a reviewer can click through.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/before"
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-medium hover:bg-muted",
              focusRing,
            )}
          >
            Open the rough prototype
          </Link>
          <Link
            href="/after"
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            Open the finished demo
          </Link>
        </div>

        <section className="mt-14" aria-labelledby="punch-list">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="punch-list" className="font-heading text-3xl tracking-tight">
              Punch list
            </h2>
            <p className="text-sm text-muted-foreground">{fixCount} fixes in the finished demo</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {checklist.map((group) => (
              <section key={group.group} className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
                <h3 className="font-heading text-2xl tracking-tight">{group.group}</h3>
                <ul className="mt-4 grid gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6">
                      <span
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="shots">
          <h2 id="shots" className="font-heading text-3xl tracking-tight">
            Side by side
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Same product, same overview. Desktop frames are 1440×900. Phone frames are 390×844.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {shots.map((shot) => (
              <figure key={shot.src} className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="px-4 py-3 text-sm font-medium">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="routes">
          <h2 id="routes" className="font-heading text-3xl tracking-tight">
            Routes
          </h2>
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
            {routes.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col gap-1 px-4 py-3 hover:bg-muted sm:flex-row sm:items-baseline sm:gap-6",
                    focusRing,
                  )}
                >
                  <span className="font-mono text-sm">{href}</span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm leading-6 text-muted-foreground sm:px-6">
          Mock data only. No accounts, no backend, and no model calls. Refreshing the browser
          restores the sample book.
        </p>
      </footer>
    </div>
  );
}
