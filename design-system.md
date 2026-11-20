# ATM Painting Plus — Design System

> One painter, Ted Martinez, working homes in Wyoming, MI and around Grand Rapids.
> His brief: **"simple, yet quality, to the point."**

---

## 1. Direction

**Feel:** calm, clean, confident. The site should read like someone who does careful work and doesn't need to shout about it.

**Two reference points. Hold every decision up to these:**

1. **A paint brand's color-card display.** Think of the fan deck and chip rack at a paint counter: flat color blocks, small labels set in a plain face, generous white margins, everything in neat rows. From this we take the **swatch strip**, the **small uppercase labels**, and the habit of showing color as clean rectangles, never gradients.
2. **A small architecture studio's portfolio page.** Big photos with a short caption under each (project, place, year), a lot of empty space, a serif headline, and a single way to get in touch. From this we take the **photo-first project strip**, **captions as metadata**, and the **restraint**: one accent, few elements, nothing decorative that doesn't carry meaning.

**What this is not:** a generic contractor template. So no stock photos of a smiling man holding a roller, no orange "FREE ESTIMATE!" starburst, no hero slideshow, no badge wall, no paint-splash graphics, no icons on every line.

**Rules of thumb**
- Every section gets one job and one heading. If a section needs two headings, split it or cut it.
- Photos of Ted's real work carry the proof. Copy stays short and plain.
- The phone number is the main call to action. Everything else comes second.

---

## 2. Color

### 2.1 Tokens

| Token | Hex | Name | Use |
|---|---|---|---|
| `--color-bg` | `#F7F4EE` | **Plaster** | Page background. Soft warm white, never pure white. |
| `--color-bg-alt` | `#EFEAE1` | **Linen** | Alternating section bands, card backgrounds. |
| `--color-paper` | `#FFFFFF` | **Paper** | Form fields and photo mats only. |
| `--color-ink` | `#2B2A28` | **Charcoal** | Body text, headings. |
| `--color-ink-muted` | `#5F5A53` | **Stone** | Captions, town labels, secondary text. |
| `--color-rule` | `#DCD5C8` | **Rule** | Hairlines and borders. Decorative only, never the only way to tell something apart. |
| `--color-accent` | `#1F3547` | **Front Door** | The one accent: call buttons, links, focus ring, sticky call pill. |
| `--color-accent-hover` | `#162838` | **Front Door, shaded** | Hover and pressed state. |

**Accent choice:** deep navy, like a freshly painted front door on a white Colonial. Navy keeps a calm, trustworthy feel against warm whites and doesn't clash with the green of lawns and trees in exterior photos. **Alternate**, if Ted prefers green: Forest Door `#2C4436`. Swap only `--color-accent` and `--color-accent-hover` (`#1F3328`). Use one accent, never both.

### 2.2 Swatch strip (decorative)

Five muted paint chips plus the accent, always in this order, left to right:

| Token | Hex | Name |
|---|---|---|
| `--swatch-1` | `#C7CCC5` | Fog |
| `--swatch-2` | `#A3AE94` | Sage |
| `--swatch-3` | `#DFC48C` | Wheat |
| `--swatch-4` | `#C4876A` | Clay |
| `--swatch-5` | `#7D97AB` | Harbor |
| `--swatch-6` | `var(--color-accent)` | Front Door |

**Use it sparingly.** It appears in only three places:
1. The **section divider** (see Motion, §6.3). Two or three on the whole homepage at most.
2. A **4px band** at the very top of the footer.
3. Optionally, as the **favicon / logo mark** (six thin vertical bars).

Never use swatch colors for text, buttons, backgrounds of content areas, or icons.

### 2.3 Contrast check (WCAG 2.2)

Computed with the WCAG relative-luminance formula:

| Pair | Ratio | Result |
|---|---|---|
| Charcoal on Plaster | 13.06 : 1 | AAA |
| Charcoal on Linen | 11.97 : 1 | AAA |
| Stone on Plaster | 6.22 : 1 | AA (AAA for large text) |
| Stone on Linen | 5.70 : 1 | AA |
| Front Door on Plaster (links) | 11.53 : 1 | AAA |
| Plaster on Front Door (button text) | 11.53 : 1 | AAA |
| Plaster on Front Door, shaded (hover) | 13.72 : 1 | AAA |
| Rule on Plaster | 1.33 : 1 | Decorative only. Inputs also get a Stone border (see §5.5). |

All text pairings pass AA. Stone is the lightest text color you may use. Don't make captions any lighter.

### 2.4 CSS

```css
:root {
  --color-bg: #F7F4EE;
  --color-bg-alt: #EFEAE1;
  --color-paper: #FFFFFF;
  --color-ink: #2B2A28;
  --color-ink-muted: #5F5A53;
  --color-rule: #DCD5C8;
  --color-accent: #1F3547;
  --color-accent-hover: #162838;

  --swatch-1: #C7CCC5;
  --swatch-2: #A3AE94;
  --swatch-3: #DFC48C;
  --swatch-4: #C4876A;
  --swatch-5: #7D97AB;
  --swatch-6: var(--color-accent);
}
```

No dark mode. It's a small brochure site, and the warm paper feel is the brand.

---

## 3. Typography

### 3.1 Pairing

| Role | Family | Why |
|---|---|---|
| Headings | **Source Serif 4** (600, optical sizing on) | A sturdy, upright serif with real weight. It looks like a studio's printed portfolio title without being fussy or old-timey. Free and variable on Google Fonts. |
| Body & UI | **Public Sans** (400, 500, 600) | Plain, neutral, very readable at small sizes on a phone. It was built for U.S. government sites, so it reads as straightforward rather than trendy. |

**Why the pair works:** Source Serif 4 has strong, slightly wedge-shaped serifs and a large x-height, and Public Sans has a similar x-height and open shapes, so the two sit well on one line (for example a serif heading next to a sans caption). The contrast comes from serif versus sans, not from size or weight tricks. Both are workhorse faces with no novelty in them, which suits "to the point."

**Fallbacks**
```css
--font-serif: "Source Serif 4", "Iowan Old Style", Georgia, serif;
--font-sans: "Public Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

Load from Google Fonts with `display=swap`, subset Latin, and only these weights: Serif 600 (plus 400 italic for one pull quote, if needed), Sans 400/500/600.

### 3.2 Scale

A fluid scale that shrinks on phones. Line lengths stay at 60–70 characters for body text.

| Token | Size (mobile → desktop) | Line height | Family / weight | Use |
|---|---|---|---|---|
| `--text-display` | 40 → 64px | 1.05 | Serif 600, `-0.01em` | Hero headline only |
| `--text-h2` | 30 → 40px | 1.15 | Serif 600 | Section headings |
| `--text-h3` | 22 → 26px | 1.25 | Serif 600 | Service names, card titles |
| `--text-body-lg` | 18 → 20px | 1.55 | Sans 400 | Hero subline, intro paragraphs |
| `--text-body` | 17px | 1.6 | Sans 400 | Body copy |
| `--text-small` | 15px | 1.5 | Sans 400 | Captions, form help |
| `--text-label` | 13px | 1.3 | Sans 600, uppercase, `+0.08em` | Town labels, eyebrows, swatch names (the "paint chip label") |

```css
--text-display: clamp(2.5rem, 1.6rem + 3.6vw, 4rem);
--text-h2:      clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
--text-h3:      clamp(1.375rem, 1.25rem + 0.5vw, 1.625rem);
--text-body-lg: clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem);
--text-body:    1.0625rem;
--text-small:   0.9375rem;
--text-label:   0.8125rem;
```

**Rules**
- Use the serif only for headings, and never in bold body text or buttons.
- No all-caps headings. Uppercase is only for `--text-label`.
- Body text never goes below 16px on mobile.
- Phone numbers use tabular numerals: `font-variant-numeric: tabular-nums;`.

---

## 4. Space, layout, shape

### 4.1 Spacing (8px base)

`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 24px` · `--space-6: 32px` · `--space-7: 48px` · `--space-8: 64px` · `--space-9: 96px` · `--space-10: 128px`

- Section padding (top and bottom): `--space-8` on mobile, `--space-10` on desktop. Be generous with white space, as in the studio reference.
- Heading to body: `--space-4`. Body to CTA: `--space-6`.

### 4.2 Grid

- Max content width **1200px**; prose max width **680px**.
- Side gutters: **16px** on phones, **24px** on tablets, **40px** on desktop.
- 12-column grid on desktop with a 24px gap, 4 columns on mobile. Most sections use a simple asymmetric split (5 columns of text, 7 of photo), like a portfolio page.
- No horizontal page scroll at 320px. The work strip scrolls inside its own container (§6.2).

### 4.3 Shape and depth

- **Radius:** `--radius-sm: 2px` (inputs, chips), `--radius-md: 4px` (buttons, photos). Corners stay nearly square, like paint chips and architectural prints. No pills except the mobile call button.
- **Borders:** 1px `--color-rule`.
- **Shadows:** none on content. One soft shadow is allowed on the sticky header once it's scrolled: `0 1px 0 var(--color-rule), 0 6px 16px -12px rgb(43 42 40 / 0.25)`.

---

## 5. Components

### 5.1 Sticky header

**Default (top of page), height 88px desktop / 72px mobile:**
- Left: wordmark "ATM Painting Plus" in Serif 600, 22px, with the six-bar swatch mark to its left (optional).
- Center or right (desktop): 3–4 text links (Work, Services, About, Contact) in Sans 500, 15px.
- Right: **call button** "Call Ted · (616) XXX-XXXX" (filled Front Door, Plaster text).
- Background: `--color-bg` at 92% opacity with `backdrop-filter: blur(8px)`.

**Scrolled (after 24px), height 60px desktop / 56px mobile:** see §6.1.

**Mobile:** the nav links collapse into a "Menu" text button (no hamburger icon on its own; the word stays visible). The call button **stays visible in the header at all times**, shortened to a phone icon plus "Call", at least 44×44px.

### 5.2 Buttons

| Variant | Style | Use |
|---|---|---|
| **Primary (Call)** | Front Door fill, Plaster text, Sans 600 16px, padding 14×22, radius 4px | `tel:` links. One per viewport at most. |
| **Secondary** | Transparent, 1px Charcoal border, Charcoal text | "Request an estimate" (goes to the form) |
| **Text link** | Front Door, underline offset 3px, 1px thickness; thickens to 2px on hover | Inline links |

- Hover: background goes to `--color-accent-hover`, 150ms.
- Focus: `outline: 2px solid var(--color-accent); outline-offset: 3px;` on every interactive element, including on the accent buttons (the offset puts the ring on Plaster, where it shows clearly).
- Minimum target size: 44×44px.

### 5.3 Recent-work card (inside the strip)

- Photo at 4:5 portrait aspect ratio, radius 4px, `object-fit: cover`. Real job photos only.
- Caption underneath, studio-style, on two lines:
  - Line 1: **Town label** in `--text-label`, Stone, e.g. `WYOMING`, `GRANDVILLE`, `KENTWOOD`, `BYRON CENTER`, `JENISON`, `GRAND RAPIDS`.
  - Line 2: short project description in `--text-small`, Charcoal, e.g. "Exterior repaint, 1950s ranch". Optionally followed by a color name if Ted knows it.
- Optional before/after: a small `BEFORE / AFTER` label toggle beneath the caption. No slider widgets.

### 5.4 Service list

Set it like a price list or a paint-card spec sheet, not as icon cards:
- A row per service: serif name on the left, a one-line description on the right, 1px Rule hairline between rows.
- Services to cover: Interior painting, Exterior painting, Cabinets & trim, Drywall repair, Deck & fence staining. Adjust to what Ted actually does.

### 5.5 Estimate form

- Fields: Name, Phone, Town (text input), What needs painting (textarea). Four fields at most.
- Inputs: Paper fill, 1px **Stone** border (meets the 3:1 non-text contrast rule), radius 2px, 48px tall, 16px text (stops iOS from zooming in).
- Labels sit above the fields, in Sans 500 15px. Don't use placeholder text as a label.
- Errors: Charcoal text plus an inline "⚠" and the message. Don't rely on red alone.
- Next to the form: "Prefer to talk? Call Ted at (616) XXX-XXXX."

### 5.6 Trust row

A single line of plain facts, separated by Rule dots: `Owner-operated · Licensed & insured · Serving Wyoming & Grand Rapids since 20XX`. No badge graphics. If there are reviews, show one or two pull quotes in Serif 400 italic with the reviewer's first name and town.

### 5.7 Footer

- A 4px swatch band at the top (the six swatch colors in equal-width segments).
- Linen background. Wordmark, phone, service area towns as plain text, hours, and a copyright line.

---

## 6. Motion

Motion should feel like careful work: short, smooth, and never showy. **Only four things move.**

**Shared tokens**
```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);  /* settles gently */
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast: 150ms;   /* hover, focus */
--dur-base: 240ms;   /* header shrink */
--dur-reveal: 600ms; /* header reveals */
--dur-fill: 900ms;   /* swatch fill */
```

### 6.1 Sticky header that shrinks on scroll

- **Trigger:** `scrollY > 24px`. Watch a 1px sentinel element at the top of the page with `IntersectionObserver` rather than a scroll listener. Toggle `.is-scrolled` on `<header>`.
- **Changes (240ms, `--ease-out`):**
  - Height 88 → 60px (desktop), 72 → 56px (mobile).
  - Wordmark scales 1 → 0.85 via `transform: scale()` with `transform-origin: left center`.
  - Background opacity 92% → 97%, and the scrolled shadow from §4.3 fades in.
- **The call button never moves out of view, never hides, and never shrinks below 44px tall.** On mobile it shrinks only by dropping the number text and keeping "Call".
- The header does **not** hide when you scroll down. Being always there is the point.
- Animate `transform`, `opacity` and `box-shadow` only. To change height without layout jank, use a fixed-height outer bar whose inner content scales, or animate `padding-block` on the inner row only.

### 6.2 Recent-work strip (sideways scroll)

- A horizontal row of work cards (§5.3) inside its own `overflow-x: auto` container. The page itself never scrolls sideways.
- `scroll-snap-type: x mandatory`; each card `scroll-snap-align: start`.
- Card width: 78vw on mobile (so the next card peeks in, which shows there's more), 360px on desktop. Gap is 16px on mobile, 24px on desktop.
- Hide the scrollbar visually but keep it usable: thin 4px Rule-colored scrollbar on desktop.
- **Desktop controls:** two small square buttons (← →) to the right of the section heading, outlined in Charcoal. They scroll by one card width with `scrollBy({ behavior: 'smooth' })`. Disable each at its end.
- Touch and trackpad swiping work natively. **No autoplay, no marquee, no infinite loop.**
- A small counter (`03 / 12`) in `--text-label` under the strip, updated on `scrollend` (fall back to a debounced `scroll` handler).
- Accessibility: the container gets `role="region"`, `aria-label="Recent work"` and `tabindex="0"` so keyboard users can scroll it with the arrow keys. Each photo has alt text that names the job and the town.
- Images: `loading="lazy"` from the third card on, with fixed `width`/`height` attributes to prevent layout shift; serve AVIF/WebP via `<picture>`.

### 6.3 Paint-swatch divider that fills in

- Placed between two or three main sections. It's a 100%-wide, 8px-tall row of six equal segments (the swatch colors, in order), with 2px Plaster gaps between them, like chips on a card.
- **Resting state (before it's seen):** each segment is an empty outline, 1px Rule border, no fill.
- **On entering view** (`IntersectionObserver`, `threshold: 0.6`, runs once): each segment fills left to right using `transform: scaleX(0 → 1)` on a colored inner bar with `transform-origin: left`, over **900ms** `--ease-inout`, staggered by **80ms** per segment. That's about 1.3s total, like a brush stroke along the row.
- Optional: on desktop, the swatch names (`FOG · SAGE · WHEAT · CLAY · HARBOR · FRONT DOOR`) in `--text-label` Stone fade in under the segments 200ms after the fill ends. Hide them on mobile.
- It runs once and doesn't reverse on scroll-up.
- Mark the divider `aria-hidden="true"`. It's decoration.

### 6.4 Subtle reveals: section headers only

- **Only section `<h2>` headings (and their small label above, if any) animate.** Body text, photos, cards, buttons and forms never animate in. They're simply there.
- Effect: `opacity 0 → 1` and `translateY(12px → 0)`, 600ms `--ease-out`. The label leads, and the heading follows 60ms later.
- Trigger: `IntersectionObserver`, `threshold: 0.2`, `rootMargin: "0px 0px -10% 0px"`. It runs once.
- Headings must be visible without JavaScript. Add the hidden starting state only after JS adds a `.js-reveal` class to `<html>`.
- The hero headline does **not** animate. It must be visible on first paint (it's the LCP element).

### 6.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
- Header: the height still changes, but instantly.
- Swatch divider: shows already filled.
- Heading reveals: appear right away, with no movement.
- Work strip arrow buttons jump instead of scrolling smoothly.

### 6.6 Things that never move

Hero slideshows, parallax, scroll-jacking, cursor effects, counters that tick upward, bouncing call buttons, and anything that loops.

---

## 7. Imagery and copy

**Photos**
- Ted's own job photos only. Shoot in daylight, straight on, with the horizon level. Show crisp cut-in lines along trim and ceilings, because they show the quality of the work.
- Use one consistent light edit across all photos (slight warmth, no heavy filters).
- An optional photo of Ted working (not posed with a thumbs-up) in the About section.

**Copy voice:** short sentences, first person where it fits ("I"), plain words. Lead with the outcome and the town.
- Hero, as an example: **"Careful painting for Wyoming and Grand Rapids homes."** Subline: "Interior and exterior. One painter, start to finish. Call Ted for a free estimate."
- Avoid: "premier," "top-notch," "your one-stop shop," exclamation points.

---

## 8. Page structure (homepage)

1. **Header** (sticky, §5.1)
2. **Hero:** headline + subline + Call button + Secondary "Request an estimate." One large real photo on the right (desktop) or below (mobile).
3. **Trust row** (§5.6)
4. *Swatch divider*
5. **Recent work** strip (§6.2)
6. **Services** list (§5.4)
7. *Swatch divider*
8. **About Ted:** short paragraph + photo
9. **Reviews:** one or two quotes
10. **Estimate form + call** (§5.5)
11. **Footer** with swatch band (§5.7)

Alternate Plaster and Linen backgrounds between sections to separate them without using lines.

---

## 9. Accessibility and performance checklist

- [ ] All text meets the AA contrast pairs in §2.3. No text lighter than Stone.
- [ ] A visible 2px Front Door focus ring on every interactive element.
- [ ] The call button is in the header at every scroll position and screen size, and is at least 44×44px.
- [ ] Phone links use `tel:+1616XXXXXXX`.
- [ ] The work strip can be scrolled by keyboard, and every photo has descriptive alt text.
- [ ] `prefers-reduced-motion` is respected (§6.5).
- [ ] No horizontal page scroll at 320px wide.
- [ ] Fonts: two families, at most five weight files, `font-display: swap`, preload the Serif 600 file.
- [ ] The hero image is preloaded and sized. Don't lazy-load anything above the fold.
- [ ] Only `transform` and `opacity` are animated (plus `box-shadow` on the header).
- [ ] LocalBusiness / HousePainter schema with name, phone, and service-area towns.
