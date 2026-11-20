import Image from "next/image";
import type { WorkItem } from "@/lib/work";
import { Ph } from "./Ph";

/**
 * A photo, or (until Ted supplies one) a clearly labeled PLACEHOLDER slot
 * saying which job photo goes here, which town it's from, and what to shoot.
 * Keeps the final aspect ratio so nothing shifts when the real photo lands.
 */
export function PhotoSlot({
  src,
  alt,
  label,
  town,
  shot,
  sample = false,
  ratio = "aspect-[4/5]",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className = "",
}: {
  src?: string;
  alt?: string;
  label: string;
  town?: string;
  shot?: string;
  /** A stand-in image that is not Ted's work: shows a visible "Sample image" tag. */
  sample?: boolean;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-md bg-linen ${ratio} ${className}`}>
        <Image src={src} alt={alt ?? label} fill sizes={sizes} priority={priority} className="object-cover" />
        {sample ? (
          <span
            className="absolute left-3 top-3 rounded-sm bg-plaster/95 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink"
            title="Placeholder: replace with a photo of one of Ted's real jobs"
          >
            Sample image · not a job photo
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo slot for Ted's job photo: ${label}${town ? `, ${town}` : ""}`}
      title="Placeholder: add a photo of Ted's real job"
      className={`relative flex flex-col justify-between overflow-hidden rounded-md border border-dashed border-stone bg-linen p-4 ${ratio} ${className}`}
    >
      {/* Crop marks, like a print waiting for its photo */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-3">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-stone/60" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-stone/60" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-stone/60" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-stone/60" />
      </span>

      <span className="relative inline-flex w-fit items-center rounded-sm bg-wheat px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
        Ted&rsquo;s job photo · TBC
      </span>

      <span className="relative grid gap-0.5">
        {town ? <span className="eyebrow text-ink">{town}</span> : null}
        <span className="text-small font-semibold text-ink">{label}</span>
        {shot ? <span className="text-small text-stone">Shoot: {shot}</span> : null}
      </span>
    </div>
  );
}

/** Photo slot plus the studio-style caption underneath: town label, then the job. */
export function JobPhoto({
  item,
  ratio,
  priority,
  sizes,
  className = "",
}: {
  item: WorkItem;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const real = Boolean(item.src);
  return (
    <figure className={className}>
      <PhotoSlot
        src={item.src}
        alt={item.alt ?? `${item.job} in ${item.town}, Michigan`}
        label={item.job}
        shot={item.shot}
        ratio={ratio}
        priority={priority}
        sizes={sizes}
      />
      <figcaption className="mt-3">
        <span className="eyebrow block">
          <Ph confirmed={real} note="Placeholder town: set it to where this job really was">
            {item.town}
          </Ph>
        </span>
        <span className="mt-1 block text-small text-ink">{item.job}</span>
      </figcaption>
    </figure>
  );
}
