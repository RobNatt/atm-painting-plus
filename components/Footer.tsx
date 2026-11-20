import Link from "next/link";
import { nav, site } from "@/lib/site";
import { CallLink } from "./CallLink";
import { ConsentSettingsLink } from "./Consent";
import { Ph } from "./Ph";

const BAND = ["bg-fog", "bg-sage", "bg-wheat", "bg-clay", "bg-harbor", "bg-door"];

export function Footer() {
  return (
    <footer className="bg-linen">
      <div className="flex h-1" aria-hidden="true">
        {BAND.map((c) => (
          <div key={c} className={`flex-1 ${c}`} />
        ))}
      </div>

      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-h3">{site.name}</p>
          <p className="mt-2 max-w-sm text-small text-stone">
            House painting by {site.owner}. Based in {site.baseCity.locality}, Michigan.
          </p>
          <CallLink className="link mt-4 inline-flex items-center gap-2 font-medium" />
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-3">Pages</p>
          <ul className="grid gap-2 text-small">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:underline">{n.label === "About" ? "About Ted" : `${n.label} painting`}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Hours</p>
          <Ph as="div" confirmed={site.hours.confirmed} block note="Placeholder hours: confirm with Ted">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-small">
              {site.hours.value.map((h) => (
                <div key={h.label} className="contents">
                  <dt className="text-stone">{h.label}</dt>
                  <dd className="tabular-nums">{h.display}</dd>
                </div>
              ))}
            </dl>
          </Ph>
          <p className="eyebrow mb-2 mt-6">Insurance</p>
          <p className="text-small">
            <Ph confirmed={site.insurance.confirmed} note="Placeholder: no insurance claim until Ted confirms details">
              {site.insurance.value}
            </Ph>
          </p>
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-rule py-6 text-small text-stone">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <ConsentSettingsLink className="min-h-11 underline underline-offset-4 hover:text-ink" />
      </div>
    </footer>
  );
}
