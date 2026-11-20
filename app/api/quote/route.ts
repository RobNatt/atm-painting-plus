import { NextResponse } from "next/server";

const JOB_TYPES = new Set(["Interior", "Exterior", "Both", "Other"]);
const BEST_TIMES = new Set(["", "Morning", "Afternoon", "Evening", "Anytime"]);

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/**
 * Receives quote requests from the "Get a free quote" form.
 *
 * DELIVERY PLACEHOLDER: set QUOTE_WEBHOOK_URL (see .env.example) to forward
 * each request as JSON to Zapier, Make, Formspree or an email function.
 * Without it, requests are only written to the server log and Ted never sees them.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on.
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: clip(body.name, 120),
    phone: clip(body.phone, 40),
    location: clip(body.location, 200),
    jobType: clip(body.jobType, 20),
    bestTime: clip(body.bestTime, 20),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10 || !lead.location || !JOB_TYPES.has(lead.jobType) || !BEST_TIMES.has(lead.bestTime)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[quote] QUOTE_WEBHOOK_URL is not set. Quote request NOT delivered:", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "atm-painting-plus-website", ...lead }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[quote] delivery failed", err);
    return NextResponse.json({ ok: false, error: "Could not deliver" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
