/**
 * Photo slots for Ted's real jobs.
 *
 * PLACEHOLDERS: each entry is a slot waiting for one of Ted's real job photos.
 * To fill one, drop the image in /public/work/, set `src`
 * (e.g. "/work/wyoming-ranch-exterior.jpg"), and set the real `town` and `job`.
 * The "TBC" markers disappear once `src` is set.
 * Use daylight photos shot straight on: 4:5 portrait for the strip and heroes,
 * 3:2 landscape for the Home service panels. At least 1600px on the long side.
 */

export type WorkItem = {
  id: string;
  kind: "interior" | "exterior";
  town: string;
  job: string;
  /** What to shoot for this slot, shown until a photo exists. */
  shot: string;
  src?: string;
  alt?: string;
};

/** Recent-work strip. */
export const work: WorkItem[] = [
  { id: "w1", kind: "exterior", town: "Wyoming", job: "Exterior repaint, ranch house", shot: "Front of house, straight on, daylight" },
  { id: "w2", kind: "interior", town: "Grand Rapids", job: "Living room walls and trim", shot: "Wide shot showing the ceiling line" },
  { id: "w3", kind: "exterior", town: "Kentwood", job: "Front door and trim", shot: "Door close-up, crisp edges visible" },
  { id: "w4", kind: "interior", town: "Grandville", job: "Kitchen walls and ceiling", shot: "Corner where wall meets ceiling" },
  { id: "w5", kind: "exterior", town: "Byron Center", job: "Siding and shutters", shot: "Three-quarter view of the house" },
  { id: "w6", kind: "interior", town: "Jenison", job: "Bedroom, trim and doors", shot: "Window trim and baseboard detail" },
  { id: "w7", kind: "exterior", town: "Hudsonville", job: "Garage and trim", shot: "Garage door with fresh trim" },
  { id: "w8", kind: "interior", town: "Walker", job: "Stairway and hallway", shot: "Looking up the stairs" },
];

/** Single feature slots used on the page heroes and service panels. */
export const slots = {
  homeInterior: { id: "s-home-int", kind: "interior", town: "Grand Rapids", job: "Interior: a finished room", shot: "Wide, showing walls, ceiling line and trim" },
  homeExterior: { id: "s-home-ext", kind: "exterior", town: "Wyoming", job: "Exterior: a repainted house", shot: "Three-quarter view, siding and trim visible" },
  interiorHero: { id: "s-int-hero", kind: "interior", town: "Grand Rapids", job: "Living room, walls, ceiling and trim", shot: "Wall, ceiling line and trim in one frame" },
  exteriorHero: { id: "s-ext-hero", kind: "exterior", town: "Wyoming", job: "Full exterior repaint", shot: "Three-quarter view, sunny day, siding and trim visible" },
  aboutTed: { id: "s-about", kind: "exterior", town: "Kentwood", job: "Ted on a job", shot: "Ted mid-job, cutting in or on a ladder. Natural, not posed." },
} satisfies Record<string, WorkItem>;
