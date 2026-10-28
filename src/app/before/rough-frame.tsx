import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/before", label: "Dashboard", id: "home" },
  { href: "/before/reports", label: "Reports", id: "reports" },
] as const;

export function RoughFrame({
  active,
  children,
}: {
  active: "home" | "reports";
  children: ReactNode;
}) {
  return (
    <div>
      <div className="rough-banner">
        Rough prototype. Spacing, type, and controls are unfinished.{" "}
        <Link href="/after">Open the finished demo</Link>
      </div>
      <div className="rough-frame">
        <aside className="rough-sidebar">
          <p className="rough-brand">Relayboard</p>
          <p className="rough-brandSub">ai draft v0.3</p>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`rough-navLink${active === link.id ? " rough-navLinkActive" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button type="button" className="rough-navButton">
            Settings
          </button>
          <a className="rough-navLink" href="#">
            Users
          </a>
        </aside>
        <div className="rough-main">{children}</div>
      </div>
    </div>
  );
}
