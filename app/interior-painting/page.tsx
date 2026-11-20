import type { Metadata } from "next";
import { CallLink } from "@/components/CallLink";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { Ph } from "@/components/Ph";
import { JobPhoto } from "@/components/PhotoSlot";
import { QuoteButton } from "@/components/Quote";
import { SectionHeading } from "@/components/SectionHeading";
import { SwatchDivider } from "@/components/SwatchDivider";
import { WorkStrip } from "@/components/WorkStrip";
import { serviceSchema } from "@/lib/schema";
import { QUOTE_LINE, site } from "@/lib/site";
import { slots, work } from "@/lib/work";

// Target keyword: "interior painting Grand Rapids"
const description = `Interior painting in Grand Rapids and Wyoming, MI: walls, ceilings and trim, prepped properly and painted by ${site.owner}. Get a free quote.`;

export const metadata: Metadata = {
  title: "Interior Painting in Grand Rapids",
  description,
  alternates: { canonical: "/interior-painting" },
};

const SURFACES = [
  {
    name: "Walls",
    body: "Living rooms, bedrooms, kitchens, hallways and stairwells. Holes and dings are filled and sanded first, so they don't show through the new color.",
  },
  {
    name: "Ceilings",
    body: "Flat ceilings, stairwell ceilings and repainting after a water stain or repair, with a straight line where the ceiling meets the wall.",
  },
  {
    name: "Trim",
    body: "Baseboards, door and window casings, crown moulding and interior doors, with the gaps caulked before painting.",
  },
];

const PREP = [
  "Move furniture to the middle of the room and cover it.",
  "Cover the floor with drop cloths.",
  "Take off switch plates and outlet covers.",
  "Fill nail holes and cracks, then sand them smooth.",
  "Caulk gaps along trim and around door frames.",
  "Spot-prime patches so they don't show through.",
  "Tape where a clean edge needs it.",
  "Wipe down walls and trim before the first coat.",
];

export default function InteriorPage() {
  return (
    <>
      <JsonLd data={serviceSchema("Interior painting", "/interior-painting", description)} />

      <section aria-labelledby="hero-title" className="pb-16 pt-8 lg:pb-24 lg:pt-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:pt-10">
            <p className="eyebrow mb-5">Interior painting · Grand Rapids area</p>
            <h1 id="hero-title" className="max-w-[14ch] text-display">Interior painting in Grand Rapids</h1>
            <p className="mt-6 max-w-[34rem] text-body-lg text-stone">
              Walls, ceilings and trim for homes in Grand Rapids, Wyoming and nearby. {QUOTE_LINE}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton jobType="Interior" />
              <CallLink />
            </div>
          </div>
          <div className="lg:col-span-5">
            <JobPhoto item={slots.interiorHero} priority sizes="(min-width: 1024px) 460px, 92vw" />
          </div>
        </div>
      </section>

      <SwatchDivider />

      {/* What I paint: set like a paint-card spec sheet, not icon cards */}
      <section aria-labelledby="surfaces-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="surfaces-title" eyebrow="What I paint">
              Walls, ceilings, trim.
            </SectionHeading>
          </div>
          <dl className="lg:col-span-8">
            {SURFACES.map((s) => (
              <div key={s.name} className="grid gap-2 border-t border-rule py-7 last:border-b sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="font-serif text-h3">{s.name}</dt>
                <dd className="text-stone">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How I prep a room */}
      <section aria-labelledby="prep-title" className="section bg-linen">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="prep-title" eyebrow="Before the first coat">
                How I prep a room.
              </SectionHeading>
              <p className="mt-4 max-w-sm text-stone">
                Prep is most of a good paint job. This is the routine before a brush touches the wall.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Ph as="div" block note="Draft checklist: Ted to confirm it matches how he works">
              <ol className="grid gap-0">
                {PREP.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 border-b border-rule py-4 first:border-t">
                    <span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-[1px] bg-door text-plaster">
                      <svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M2.5 6.2l2.2 2.2 4.8-4.8" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                    </span>
                    <span>
                      <span className="eyebrow mr-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Ph>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="section">
        <div className="wrap mb-10">
          <SectionHeading id="work-title" eyebrow="Recent interiors">
            Rooms around town.
          </SectionHeading>
        </div>
        <WorkStrip items={work.filter((w) => w.kind === "interior")} label="Recent interior work" />
      </section>

      <ClosingCta jobType="Interior" heading="Which rooms are we painting?" />
    </>
  );
}
