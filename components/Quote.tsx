"use client";

import { createContext, useCallback, useContext, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/site";
import { CallLink } from "./CallLink";

type Ctx = { open: (jobType?: JobType) => void };
const QuoteContext = createContext<Ctx>({ open: () => {} });

export const JOB_TYPES = ["Interior", "Exterior", "Both", "Other"] as const;
export type JobType = (typeof JOB_TYPES)[number];
export const BEST_TIMES = ["Morning", "Afternoon", "Evening", "Anytime"] as const;

export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [preset, setPreset] = useState<JobType | undefined>();
  const [formKey, setFormKey] = useState(0);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((jobType?: JobType) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setPreset(jobType);
    setFormKey((k) => k + 1); // fresh form each time it opens
    requestAnimationFrame(() => {
      const dlg = dialogRef.current;
      if (!dlg) return;
      dlg.showModal();
      dlg.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    });
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <QuoteContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="quote-title"
        onClose={() => openerRef.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // click on the backdrop
        }}
        className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[560px] overflow-y-auto rounded-md bg-plaster p-0 text-ink shadow-[0_24px_60px_-20px_rgb(43_42_40/0.45)] backdrop:bg-ink/55"
      >
        <QuoteForm key={formKey} preset={preset} onClose={close} />
      </dialog>
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}

/** The main button on every page. */
export function QuoteButton({
  className = "btn btn-primary",
  jobType,
  children = "Get a free quote",
}: {
  className?: string;
  jobType?: JobType;
  children?: ReactNode;
}) {
  const { open } = useQuote();
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={() => open(jobType)}>
      {children}
    </button>
  );
}

type Errors = Partial<Record<"name" | "phone" | "location" | "jobType", string>>;

function QuoteForm({ preset, onClose }: { preset?: JobType; onClose: () => void }) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [bestTime, setBestTime] = useState<string>("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      location: String(fd.get("location") ?? "").trim(),
      jobType: String(fd.get("jobType") ?? ""),
      bestTime: String(fd.get("bestTime") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    const next: Errors = {};
    if (!data.name) next.name = "Please add your name.";
    if (data.phone.replace(/\D/g, "").length < 10) next.phone = "Please add a 10-digit phone number.";
    if (!data.location) next.location = "Please add your address or ZIP code.";
    if (!data.jobType) next.jobType = "Please pick the kind of job.";
    setErrors(next);
    if (Object.keys(next).length) {
      const firstBad = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      firstBad?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="p-6 sm:p-8" role="status">
        <span className="mb-4 block h-0.5 w-8 bg-door" aria-hidden="true" />
        <h2 id="quote-title" className="text-h3">Thanks. I&rsquo;ve got your details.</h2>
        <p className="mt-3 text-stone">
          I&rsquo;ll reach out {bestTime && bestTime !== "Anytime" ? `in the ${bestTime.toLowerCase()}` : "soon"} to set up a time to come look at the job.
        </p>
        <p className="mt-1 text-stone">&mdash; {site.ownerFirstName}</p>
        <button type="button" className="btn btn-secondary mt-6" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-small text-ink">
        <span aria-hidden="true">⚠ </span>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Free quote</p>
          <h2 id="quote-title" className="text-h3">Tell me about the job.</h2>
        </div>
        <button type="button" onClick={onClose} className="-mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-sm text-stone hover:bg-linen hover:text-ink" aria-label="Close">
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
      <p className="mt-2 text-small text-stone">Five quick questions. I&rsquo;ll call or text you back to set up a walk-through.</p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-small font-medium">Name</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
          {err("name")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-small font-medium">Phone</label>
            <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor={`${uid}-location`} className="mb-1.5 block text-small font-medium">Address or ZIP</label>
            <input id={`${uid}-location`} name="location" autoComplete="street-address" className="field" aria-invalid={!!errors.location} aria-describedby={errors.location ? `${uid}-location-err` : undefined} />
            {err("location")}
          </div>
        </div>

        <fieldset aria-describedby={errors.jobType ? `${uid}-jobType-err` : undefined}>
          <legend className="mb-1.5 text-small font-medium">Type of job</legend>
          <div className="grid grid-cols-2 gap-2">
            {JOB_TYPES.map((t) => (
              <label key={t} className="chip relative">
                <input type="radio" name="jobType" value={t} defaultChecked={preset === t} />
                <span>{t}</span>
              </label>
            ))}
          </div>
          {err("jobType")}
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-small font-medium">
            Best time to reach you <span className="font-normal text-stone">(optional)</span>
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {BEST_TIMES.map((t) => (
              <label key={t} className="chip relative">
                <input type="radio" name="bestTime" value={t} onChange={() => setBestTime(t)} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Honeypot for bots: hidden from people and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-5 text-small" role="alert">
          <span aria-hidden="true">⚠ </span>
          That didn&rsquo;t send. Please try again, or call me instead.
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send my quote request"}
        </button>
        <p className="text-small text-stone">
          Prefer to talk?{" "}
          <CallLink className="link inline-flex items-center gap-1 font-medium" />
        </p>
      </div>
    </form>
  );
}
