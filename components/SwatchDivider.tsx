"use client";

import type { CSSProperties } from "react";
import { useInViewOnce } from "@/lib/useInView";

const SWATCHES = [
  { name: "Fog", cls: "bg-fog" },
  { name: "Sage", cls: "bg-sage" },
  { name: "Wheat", cls: "bg-wheat" },
  { name: "Clay", cls: "bg-clay" },
  { name: "Harbor", cls: "bg-harbor" },
  { name: "Front Door", cls: "bg-door" },
];

/** Paint-chip row that fills left to right once it scrolls into view. */
export function SwatchDivider() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.6 });
  return (
    <div ref={ref} aria-hidden="true" className={`swatch wrap py-2 ${inView ? "is-filled" : ""}`}>
      <div className="flex gap-0.5">
        {SWATCHES.map((s, i) => (
          <div key={s.name} className="swatch-seg">
            <div className={`swatch-fill ${s.cls}`} style={{ "--i": i } as CSSProperties} />
          </div>
        ))}
      </div>
      <div className="swatch-names mt-2 hidden gap-0.5 md:flex">
        {SWATCHES.map((s) => (
          <span key={s.name} className="eyebrow flex-1">
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
