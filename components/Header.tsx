"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { CallLink } from "./CallLink";
import { SwatchMark } from "./Icons";
import { Ph } from "./Ph";
import { QuoteButton } from "./Quote";

/**
 * Sticky header that shrinks after 24px of scroll. Tap-to-call stays visible
 * at every scroll position and screen size, and never drops below 44px tall.
 */
export function Header() {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* 1px marker 24px down the page; when it leaves view, the header shrinks. */}
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-6 h-px w-px" />

      <header data-scrolled={scrolled || menuOpen} className="site-header fixed inset-x-0 top-0 z-40">
        <div className="wrap flex h-full items-center justify-between gap-3">
          <Link href="/" className="wordmark flex min-h-11 items-center gap-2.5" aria-label={`${site.name}, home`}>
            {/* LOGO PLACEHOLDER: swap SwatchMark for Ted's logo when it exists (set site.logo). */}
            <span className="max-[399px]:hidden">
            <Ph confirmed={site.logo.confirmed} block note="Placeholder logo mark: replace with Ted's logo">
              <SwatchMark className="h-6 w-6" />
            </Ph>
            </span>
            <span className="font-serif whitespace-nowrap text-[1rem] min-[400px]:text-[1.0625rem] font-semibold leading-none tracking-[-0.005em] sm:text-[1.3rem]">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="text-[0.9375rem] font-medium text-ink underline-offset-[6px] hover:underline aria-[current=page]:underline aria-[current=page]:decoration-door aria-[current=page]:decoration-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <CallLink short className="btn btn-secondary btn-sm max-[359px]:px-2.5 lg:hidden" />
            <CallLink className="btn btn-secondary btn-sm hidden lg:inline-flex" />
            <QuoteButton className="btn btn-primary btn-sm hidden sm:inline-flex" />
            <button
              type="button"
              className="btn btn-sm px-3 max-[359px]:px-2 text-ink hover:bg-linen lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="border-t border-rule bg-plaster shadow-[0_12px_24px_-16px_rgb(43_42_40/0.35)] lg:hidden"
        >
          <nav aria-label="Main" className="wrap flex flex-col py-3">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="flex min-h-12 items-center border-b border-rule font-serif text-h3 aria-[current=page]:text-door">
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex min-h-12 items-center border-b border-rule font-serif text-h3 aria-[current=page]:text-door"
              >
                {item.label === "Interior" ? "Interior painting" : item.label === "Exterior" ? "Exterior painting" : item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 py-5">
              <QuoteButton className="btn btn-primary w-full" />
              <CallLink className="btn btn-secondary w-full" />
            </div>
          </nav>
        </div>
      </header>
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
}
