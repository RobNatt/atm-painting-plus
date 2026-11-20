/**
 * Business details for ATM Painting Plus.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ PLACEHOLDERS: anything with `confirmed: false` is NOT real yet.      │
 * │ On the site it shows with a dashed outline and a "TBC" tag, and it   │
 * │ is left OUT of the LocalBusiness schema. When Ted confirms a value,  │
 * │ update it here and flip `confirmed` to true. Nothing else changes.   │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * House rule from the brief: no prices, no reviews and no claims
 * (insured, licensed, years in business, guarantees) until Ted confirms them.
 */

export type Field<T> = { value: T; confirmed: boolean };

export type Town = string;

export const site = {
  name: "ATM Painting Plus",
  owner: "Ted Martinez",
  ownerFirstName: "Ted",

  /** Confirmed by the brief: based in Wyoming, Michigan. */
  baseCity: { locality: "Wyoming", region: "MI", country: "US" },

  url: {
    value: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
    confirmed: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  } satisfies Field<string>,

  /** 555-01XX is reserved for fiction, so this can never ring a real person. */
  phone: {
    value: { display: "(616) 555-0100", tel: "+16165550100" },
    confirmed: false,
  } satisfies Field<{ display: string; tel: string }>,

  /** Short form used in the Home subhead. */
  serviceAreaSummary: {
    value: "Wyoming, Grand Rapids and nearby towns",
    confirmed: false,
  } satisfies Field<string>,

  /** Towns listed on Home and used as photo labels. Ted to confirm the real list. */
  towns: {
    value: [
      "Wyoming",
      "Grand Rapids",
      "Kentwood",
      "Grandville",
      "Byron Center",
      "Jenison",
      "Hudsonville",
      "Walker",
    ],
    confirmed: false,
  } satisfies Field<Town[]>,

  hours: {
    value: [
      { label: "Mon–Fri", open: "08:00", close: "18:00", display: "8 am – 6 pm" },
      { label: "Sat", open: "09:00", close: "14:00", display: "9 am – 2 pm" },
    ],
    confirmed: false,
  } satisfies Field<{ label: string; open: string; close: string; display: string }[]>,

  insurance: {
    value: "Insurance details to come",
    confirmed: false,
  } satisfies Field<string>,

  /** What the "Plus" in the name covers. */
  otherServices: {
    value: "drywall patching, deck and fence staining, and small repairs",
    confirmed: false,
  } satisfies Field<string>,

  /** Path under /public once a real logo exists, e.g. "/logo.svg". */
  logo: { value: "", confirmed: false } satisfies Field<string>,
} as const;

/** Schema.org day codes for the hours labels above. */
export const hoursToDays: Record<string, string[]> = {
  "Mon–Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Sat: ["Saturday"],
  Sun: ["Sunday"],
};

export const nav = [
  { href: "/interior-painting", label: "Interior" },
  { href: "/exterior-painting", label: "Exterior" },
  { href: "/about", label: "About" },
] as const;

export const QUOTE_LINE = "The person who quotes your job is the person who paints it.";
