import type { Metadata } from "next";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { ClosingCta } from "@/components/ClosingCta";
import { ArrowIcon } from "@/components/Icons";
import { Ph } from "@/components/Ph";
import { JobPhoto, PhotoSlot } from "@/components/PhotoSlot";
import { QuoteButton } from "@/components/Quote";
import { SectionHeading } from "@/components/SectionHeading";
import { SwatchDivider } from "@/components/SwatchDivider";
import { WorkStrip } from "@/components/WorkStrip";
import { QUOTE_LINE, site } from "@/lib/site";
import { slots, work } from "@/lib/work";

// Target keyword: "house painter Wyoming MI"
export const metadata: Metadata = {
  title: { absolute: `House Painter in Wyoming, MI | ${site.name}` },
  description: `${site.owner} is a house painter in Wyoming, MI doing interior and exterior painting. One painter, from the free quote to the last coat. Get a free quote.`,
  alternates: { canonical: "/" },
};

const STEPS = [
  {
    title: "Call or text",
    body: "Tell me what you want painted and where. A rough idea is plenty to start.",
  },
  {
    title: "Free walk-through and quote",
    body: "I come out, look at the job with you, answer questions and give you a quote. No charge for the visit.",
  },
  {
    title: "The job, done clean",
    body: "I do the prep and the painting myself, and I clean up before I leave.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="pb-16 pt-8 lg:pb-24 lg:pt-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 lg:pt-10">
            <p className="eyebrow mb-5">House painter · Wyoming, MI</p>
            <h1 id="hero-title" className="max-w-[12ch] text-display text-ink">
              One painter. Every job done right.
            </h1>
            <p className="mt-6 max-w-[34rem] text-body-lg text-stone">
              Interior and exterior house painting for{" "}
              <Ph confirmed={site.serviceAreaSummary.confirmed} note="Placeholder service area: confirm with Ted">
                {site.serviceAreaSummary.value}
              </Ph>
              . You deal with {site.owner} from the first call to the last coat.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton />
              <CallLink />
            </div>
            <p className="mt-12 max-w-[30rem] border-l-2 border-door pl-5 font-serif text-[1.375rem] leading-snug text-ink">
              {QUOTE_LINE}
            </p>
          </div>
          <div className="lg:col-span-5">
            {/*
              PLACEHOLDER HERO: an AI-generated sample, not one of Ted's jobs.
              Replace with a photo of a real job (same 4:5 framing), remove `sample`,
              and change the caption to the real town and job.
            */}
            <figure>
              <PhotoSlot
                src="/images/hero-sample-house.jpg"
                alt="Two-story house with fresh warm-white siding, white trim and a deep navy front door in late-afternoon light"
                label="Sample house exterior"
                sample
                priority
                sizes="(min-width: 1024px) 460px, 92vw"
              />
              <figcaption className="mt-3">
                <span className="eyebrow block">
                  <Ph note="Placeholder: replace the sample image with Ted's real job and its town">Wyoming</Ph>
                </span>
                <span className="mt-1 block text-small text-stone">Sample image. A photo of one of Ted&rsquo;s jobs goes here.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SwatchDivider />

      {/* ── Interior and exterior, side by side ──────────── */}
      <section aria-labelledby="services-title" className="section">
        <div className="wrap">
          <SectionHeading id="services-title" eyebrow="What I paint">
            Inside or out.
          </SectionHeading>

          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            <article>
              <JobPhoto item={slots.homeInterior} ratio="aspect-[3/2]" sizes="(min-width: 768px) 45vw, 92vw" />
              <p className="eyebrow mt-5">Interior</p>
              <h3 className="mt-2 text-h3">
                <Link href="/interior-painting" className="hover:underline">Walls, ceilings and trim</Link>
              </h3>
              <p className="mt-3 text-stone">Every room patched and prepped before any paint goes on, so the finish looks right up close.</p>
              
              <Link href="/interior-painting" className="link mt-5 inline-flex items-center gap-2 font-medium">
                Interior painting <ArrowIcon />
              </Link>
            </article>

            <article className="md:mt-24">
              <JobPhoto item={slots.homeExterior} ratio="aspect-[3/2]" sizes="(min-width: 768px) 45vw, 92vw" />
              <p className="eyebrow mt-5">Exterior</p>
              <h3 className="mt-2 text-h3">
                <Link href="/exterior-painting" className="hover:underline">Siding, trim and doors</Link>
              </h3>
              <p className="mt-3 text-stone">Scraped and primed where it needs it, and painted in the part of the year when paint cures properly.</p>
              
              <Link href="/exterior-painting" className="link mt-5 inline-flex items-center gap-2 font-medium">
                Exterior painting <ArrowIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── Recent work ───────────────────────────────────── */}
      <section aria-labelledby="work-title" className="section bg-linen">
        <div className="wrap mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading id="work-title" eyebrow="Recent work">
              Houses around town.
            </SectionHeading>
          </div>
          <p className="text-stone lg:col-span-5">Each photo is labeled with the town it&rsquo;s in. Swipe or scroll sideways to see more.</p>
        </div>
        <WorkStrip items={work} />
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section aria-labelledby="how-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="how-title" eyebrow="How it works">
                Three steps, one person.
              </SectionHeading>
              <p className="mt-4 max-w-sm text-stone">{QUOTE_LINE}</p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-rule py-8 last:border-b sm:grid-cols-[5rem_1fr]">
                <span className="font-serif text-[2.5rem] leading-none text-door tabular-nums sm:text-[3.25rem]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h3">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[32rem] text-stone">{s.body}</p>
                  {i === 0 ? <CallLink className="link mt-3 inline-flex items-center gap-2 font-medium" label="Call or text" /> : null}
                  {i === 1 ? <QuoteButton className="link mt-3 inline-flex font-medium">Or request a quote online</QuoteButton> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SwatchDivider />

      {/* ── Towns served + the "Plus" ─────────────────────── */}
      <section aria-labelledby="towns-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="towns-title" eyebrow="Service area">
              Where I work.
            </SectionHeading>
            <p className="mt-4 max-w-sm text-stone">
              Based in {site.baseCity.locality}, Michigan. If your town isn&rsquo;t listed, call and ask.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Ph as="div" block confirmed={site.towns.confirmed} note="Placeholder town list: confirm with Ted">
              <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
                {site.towns.value.map((t) => (
                  <li key={t} className="flex min-h-12 items-center gap-3 border-b border-rule font-serif text-[1.25rem]">
                    {t}
                  </li>
                ))}
              </ul>
            </Ph>
            <p className="mt-10 max-w-[36rem] text-body-lg">
              <span className="font-semibold">The &ldquo;Plus&rdquo;:</span>{" "}
              <Ph confirmed={site.otherServices.confirmed} note="Placeholder: what 'Plus' covers, confirm with Ted">
                {site.otherServices.value}
              </Ph>
              . Ask when you call.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
