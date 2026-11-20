import type { Metadata } from "next";
import { CallLink } from "@/components/CallLink";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { JobPhoto } from "@/components/PhotoSlot";
import { QuoteButton } from "@/components/Quote";
import { SectionHeading } from "@/components/SectionHeading";
import { SwatchDivider } from "@/components/SwatchDivider";
import { WorkStrip } from "@/components/WorkStrip";
import { serviceSchema } from "@/lib/schema";
import { QUOTE_LINE, site } from "@/lib/site";
import { slots, work } from "@/lib/work";

// Target keyword: "exterior house painting Grand Rapids"
const description = `Exterior house painting in Grand Rapids and Wyoming, MI: siding, trim and doors, painted by ${site.owner}. When to book in Michigan, and a free quote.`;

export const metadata: Metadata = {
  title: "Exterior House Painting in Grand Rapids",
  description,
  alternates: { canonical: "/exterior-painting" },
};

const SURFACES = [
  {
    name: "Siding",
    body: "Washed, scraped and primed where the wood is bare, then painted. The prep is what keeps it from peeling again.",
  },
  {
    name: "Trim",
    body: "Fascia, soffits, window and corner trim. Trim takes the most weather, so it gets the most attention.",
  },
  {
    name: "Doors",
    body: "Front doors, side doors and garage doors. A new front door color is the quickest way to change how a house looks from the street.",
  },
];

/* Paintable season around Grand Rapids: 0 = off, 1 = possible / shoulder, 2 = main season. */
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SEASON = [0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0];
const BOOK = [false, true, true, true, false, false, false, false, false, false, false, false];

export default function ExteriorPage() {
  return (
    <>
      <JsonLd data={serviceSchema("Exterior house painting", "/exterior-painting", description)} />

      <section aria-labelledby="hero-title" className="pb-16 pt-8 lg:pb-24 lg:pt-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:pt-10">
            <p className="eyebrow mb-5">Exterior painting · Grand Rapids area</p>
            <h1 id="hero-title" className="max-w-[16ch] text-display">Exterior house painting in Grand Rapids</h1>
            <p className="mt-6 max-w-[34rem] text-body-lg text-stone">
              Siding, trim and doors for houses in Grand Rapids, Wyoming and nearby. {QUOTE_LINE}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton jobType="Exterior" />
              <CallLink />
            </div>
          </div>
          <div className="lg:col-span-5">
            <JobPhoto item={slots.exteriorHero} priority sizes="(min-width: 1024px) 460px, 92vw" />
          </div>
        </div>
      </section>

      <SwatchDivider />

      <section aria-labelledby="surfaces-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="surfaces-title" eyebrow="What I paint">
              Siding, trim, doors.
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

      {/* Best time to book in Michigan */}
      <section aria-labelledby="season-title" className="section bg-linen">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="season-title" eyebrow="Michigan note">
              Best time to book.
            </SectionHeading>
            <div className="mt-5 grid max-w-[32rem] gap-4 text-stone">
              <p>
                Exterior paint needs dry weather and mild temperatures to cure. Most paints ask for about 50°F or warmer for a day or two after they go on. Check the can, since some are rated lower.
              </p>
              <p>
                Around Grand Rapids that usually means <strong className="font-semibold text-ink">late May through early October</strong>. Summer weeks fill up first, so the best time to get on the schedule is <strong className="font-semibold text-ink">late winter or early spring</strong>.
              </p>
              <p>Fall works too, as long as the job is done before the nights turn cold.</p>
            </div>
          </div>

          {/* Season chart: a row of paint chips, one per month */}
          <figure className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <div className="grid grid-cols-12 gap-1" role="img" aria-label="Painting season around Grand Rapids: main season June through September, possible in May and October. Best months to book: February through April.">
              {MONTHS.map((m, i) => (
                <div key={MONTH_NAMES[i]} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-24 w-full rounded-[1px] sm:h-32 ${SEASON[i] === 2 ? "bg-door" : SEASON[i] === 1 ? "bg-harbor" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-rule)]"}`}
                  />
                  <div className={`h-1.5 w-full rounded-[1px] ${BOOK[i] ? "bg-clay" : "bg-transparent"}`} />
                  <span className="eyebrow">{m}</span>
                </div>
              ))}
            </div>
            <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-small text-stone">
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-[1px] bg-door" aria-hidden="true" />Main painting season</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-[1px] bg-harbor" aria-hidden="true" />Weather permitting</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-3 rounded-[1px] bg-clay" aria-hidden="true" />Best time to book</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="work-title" className="section">
        <div className="wrap mb-10">
          <SectionHeading id="work-title" eyebrow="Recent exteriors">
            Houses around town.
          </SectionHeading>
        </div>
        <WorkStrip items={work.filter((w) => w.kind === "exterior")} label="Recent exterior work" />
      </section>

      <ClosingCta jobType="Exterior" heading="Get on this season's schedule." />
    </>
  );
}
