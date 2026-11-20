import type { Metadata } from "next";
import { CallLink } from "@/components/CallLink";
import { ClosingCta } from "@/components/ClosingCta";
import { Ph } from "@/components/Ph";
import { JobPhoto } from "@/components/PhotoSlot";
import { slots } from "@/lib/work";
import { SectionHeading } from "@/components/SectionHeading";
import { SwatchDivider } from "@/components/SwatchDivider";
import { QUOTE_LINE, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.owner}`,
  description: `${site.name} is ${site.owner}, a one-man house painting company in Wyoming, MI. ${QUOTE_LINE}`,
  alternates: { canonical: "/about" },
};

const HOW_I_WORK = [
  { title: "You talk to me.", body: "Not a sales rep or an office. The number on this site rings Ted." },
  { title: "I see the job before I quote it.", body: "Every quote comes from a walk-through at your house, not a guess over the phone." },
  { title: "I do the work myself.", body: "Prep, painting and cleanup. No crew you haven't met." },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="hero-title" className="pb-16 pt-8 lg:pb-24 lg:pt-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:order-2">
            <JobPhoto item={slots.aboutTed} priority sizes="(min-width: 1024px) 460px, 92vw" />
          </div>
          <div className="lg:col-span-7 lg:order-1 lg:pt-10">
            <p className="eyebrow mb-5">About</p>
            <h1 id="hero-title" className="max-w-[14ch] text-display">The painter is the owner.</h1>
            <p className="mt-6 max-w-[34rem] text-body-lg text-stone">
              {site.name} is {site.owner}, a house painter based in {site.baseCity.locality}, Michigan. When you call, you get Ted. When the job starts, you get Ted.
            </p>
            <p className="mt-10 max-w-[30rem] border-l-2 border-door pl-5 font-serif text-[1.375rem] leading-snug">{QUOTE_LINE}</p>
          </div>
        </div>
      </section>

      <SwatchDivider />

      <section aria-labelledby="story-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="story-title" eyebrow="Ted's story">
              How I got here.
            </SectionHeading>
          </div>
          <div className="max-w-[40rem] lg:col-span-7 lg:col-start-6">
            <Ph as="div" block note="Placeholder bio: Ted to supply in his own words">
              <div className="grid gap-4 p-1 text-stone">
                <p>
                  [Ted&rsquo;s story, two or three short paragraphs in his own words: how he got into painting, what kind of work he likes best, and why he runs it as a one-man company.]
                </p>
                <p>
                  [No years in business, job counts or credentials here until Ted confirms them.]
                </p>
              </div>
            </Ph>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="section bg-linen">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="work-title" eyebrow="How I work">
              Simple, start to finish.
            </SectionHeading>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {HOW_I_WORK.map((item) => (
              <li key={item.title} className="border-t border-rule py-7 last:border-b">
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-2 text-stone">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="details-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="details-title" eyebrow="The details">
              Good to know.
            </SectionHeading>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {[
              { k: "Based in", v: <>{site.baseCity.locality}, Michigan</> },
              {
                k: "Service area",
                v: <Ph confirmed={site.serviceAreaSummary.confirmed} note="Placeholder service area: confirm with Ted">{site.serviceAreaSummary.value}</Ph>,
              },
              {
                k: "Hours",
                v: <Ph confirmed={site.hours.confirmed} note="Placeholder hours: confirm with Ted">{site.hours.value.map((h) => `${h.label} ${h.display}`).join(", ")}</Ph>,
              },
              {
                k: "Insurance",
                v: <Ph confirmed={site.insurance.confirmed} note="Placeholder: no insurance claim until Ted confirms details">{site.insurance.value}</Ph>,
              },
              { k: "Phone", v: <CallLink className="link inline-flex items-center gap-2" label="" /> },
            ].map((row) => (
              <div key={row.k} className="grid gap-1 border-t border-rule py-5 last:border-b sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="eyebrow pt-1">{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta heading="Let's look at your house." />
    </>
  );
}
