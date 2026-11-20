"use client";

import { useEffect, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/useInView";

/**
 * Section <h2> with the "cut-in" reveal: a short rule draws, then the heading
 * is uncovered left to right like a brush cutting in along trim.
 * Headings stay fully visible without JavaScript.
 */
export function SectionHeading({
  eyebrow,
  children,
  id,
  className = "",
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  // Drop the clip-path once the wipe finishes so serif overhangs are never clipped.
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const h = el.querySelector(".cut-in");
    const finish = () => el.classList.add("is-done");
    h?.addEventListener("transitionend", finish, { once: true });
    const fallback = window.setTimeout(finish, 1400);
    return () => {
      h?.removeEventListener("transitionend", finish);
      window.clearTimeout(fallback);
    };
  }, [inView, ref]);

  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`}>
      <span className="cut-rule mb-4" aria-hidden="true" />
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 id={id} className="cut-in text-h2 text-ink">
        {children}
      </h2>
    </div>
  );
}
