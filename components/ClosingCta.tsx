import { QUOTE_LINE, site } from "@/lib/site";
import { CallLink } from "./CallLink";
import { Ph } from "./Ph";
import { QuoteButton, type JobType } from "./Quote";
import { SectionHeading } from "./SectionHeading";

/** Closing call-to-action used at the bottom of every page. */
export function ClosingCta({ jobType, heading = "Tell me about the job." }: { jobType?: JobType; heading?: string }) {
  return (
    <section aria-labelledby="cta-title" className="section bg-linen">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionHeading id="cta-title" eyebrow="Free quote">
            {heading}
          </SectionHeading>
          <p className="mt-4 max-w-[34rem] text-body-lg text-stone">
            Call or text, or send the short form. I&rsquo;ll come out, walk the job with you and give you a quote.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <QuoteButton jobType={jobType} />
          <CallLink />
        </div>
        <p className="border-t border-rule pt-6 text-small text-stone lg:col-span-12">
          {QUOTE_LINE}{" "}
          <span>
            Hours:{" "}
            <Ph confirmed={site.hours.confirmed} note="Placeholder hours: confirm with Ted">
              {site.hours.value.map((h) => `${h.label} ${h.display}`).join(", ")}
            </Ph>
          </span>
        </p>
      </div>
    </section>
  );
}
