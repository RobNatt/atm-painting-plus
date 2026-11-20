# ATM Painting Plus website

Next.js 16 + Tailwind 4. Design rules live in [design-system.md](design-system.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before launch: placeholders to confirm with Ted

Anything unconfirmed shows on the site with a **dashed outline and a "TBC" tag**, and is
left out of the LocalBusiness schema. Fix it at the source and the marker disappears.

| What | Where | How to confirm |
|---|---|---|
| Phone number | `lib/site.ts` → `phone` | Set real number, `confirmed: true` |
| Service area (subhead) | `lib/site.ts` → `serviceAreaSummary` | Same |
| Towns served | `lib/site.ts` → `towns` | Same |
| Hours | `lib/site.ts` → `hours` | Same |
| Insurance | `lib/site.ts` → `insurance` | Same. No claim until Ted gives details. |
| What "Plus" covers | `lib/site.ts` → `otherServices` | Same |
| Logo | `lib/site.ts` → `logo`, and `components/Header.tsx` | Add file to `/public`, swap out `SwatchMark` |
| Domain | `.env.local` → `NEXT_PUBLIC_SITE_URL` | Setting it also turns indexing on (robots + meta) |
| Job photos + towns (strip, page heroes, service panels, About) | `lib/work.ts` → `work` and `slots` | Put images in `/public/work/`, set `src`, real `town` and `job`. Tags disappear once `src` is set. |
| Home hero image | `app/page.tsx` (hero `<figure>`) | Currently an **AI-generated sample** (`/public/images/hero-sample-house.jpg`), labeled "Sample image · not a job photo". Swap in a real job photo, remove `sample`, set the real town. |
| Analytics | `.env.local` → `NEXT_PUBLIC_GA_ID` | Optional. When set, a consent banner appears and GA loads only after "Accept". |
| Ted's bio | `app/about/page.tsx` → "Ted's story" | Replace bracketed text |
| Room prep checklist | `app/interior-painting/page.tsx` → `PREP` | Ted checks it matches how he works, then remove the `Ph` wrapper |
| Quote form delivery | `.env.local` → `QUOTE_WEBHOOK_URL` | **Until set, quote requests are only logged and Ted never receives them.** |

House rule: no prices, reviews, years in business or other claims until Ted confirms them.
