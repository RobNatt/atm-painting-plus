"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkItem } from "@/lib/work";
import { ArrowIcon } from "./Icons";
import { JobPhoto } from "./PhotoSlot";

/** Sideways-scrolling recent-work strip with town labels. No autoplay, no loop. */
export function WorkStrip({ items, label = "Recent work" }: { items: WorkItem[]; label?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = () => {
    const el = scroller.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 16);
  };

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const s = step() || el.clientWidth;
    const lastVisible = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIndex(lastVisible ? items.length - 1 : Math.min(items.length - 1, Math.round(el.scrollLeft / s)));
    setAtStart(el.scrollLeft < 4);
    setAtEnd(lastVisible);
  }, [items.length]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
  };

  const arrowCls =
    "grid h-11 w-11 place-items-center rounded-sm border border-ink text-ink transition-colors hover:bg-linen disabled:cursor-default disabled:border-rule disabled:text-rule disabled:hover:bg-transparent";

  return (
    <div>
      <div ref={scroller} className="work-strip" role="region" aria-label={label} tabIndex={0}>
        {items.map((item) => (
          <JobPhoto key={item.id} item={item} ratio="aspect-square sm:aspect-[4/5]" sizes="(min-width: 640px) 360px, 78vw" />
        ))}
      </div>

      <div className="wrap mt-4 flex items-center justify-between">
        <p className="eyebrow tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous photos" className={arrowCls}>
            <ArrowIcon dir="left" />
          </button>
          <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next photos" className={arrowCls}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
