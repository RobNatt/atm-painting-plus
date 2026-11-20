"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Analytics consent.
 *
 * Nothing analytics-related (no script tag, no cookie, no network request) is
 * loaded until the visitor clicks "Accept". The choice is stored in this
 * browser only. If NEXT_PUBLIC_GA_ID isn't set, there is no analytics at all,
 * so no banner is shown either.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const KEY = "atm-analytics-consent-v1";
const REOPEN_EVENT = "atm:open-consent";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

function loadAnalytics() {
  if (!GA_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  s.dataset.analytics = "ga4";
  document.head.appendChild(s);
}

/** Stop sending data and remove GA cookies after a visitor withdraws consent. */
function stopAnalytics() {
  if (!GA_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const choice = readChoice();
    if (choice === "granted") loadAnalytics();
    else if (choice === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((c: Choice) => {
    saveChoice(c);
    if (c === "granted") loadAnalytics();
    else stopAnalytics();
    setOpen(false);
  }, []);

  if (!GA_ID || !open) return null;

  return (
    <section
      role="region"
      aria-label="Cookie choice"
      className="consent fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-plaster shadow-[0_-8px_24px_-16px_rgb(43_42_40/0.35)] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-[420px] sm:rounded-md sm:border"
    >
      <div className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5">
        <p className="eyebrow mb-1.5 hidden sm:block">Cookies</p>
        <p className="text-small text-ink">
          OK to use analytics cookies? <span className="hidden sm:inline">They show me which pages people find useful. </span>Nothing loads unless you say yes.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => decide("denied")}>
            No thanks
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => decide("granted")}>
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}

/** Footer link that reopens the banner so visitors can change their mind. */
export function ConsentSettingsLink({ className = "" }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
