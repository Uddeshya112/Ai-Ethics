"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { href: string; label: string };

export default function SiteNavigation({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
    <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>
      <span>{open ? "Close" : "Menu"}</span><span aria-hidden="true" className="nav-toggle-icon">{open ? "−" : "+"}</span>
    </button>
    <div className="nav-links" id="primary-navigation">{items.map((item) => {
      const current = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
      return <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>{item.label}</Link>;
    })}</div>
  </nav>;
}

