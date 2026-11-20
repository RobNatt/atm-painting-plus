import type { ReactNode } from "react";

/**
 * Wraps content that is still a PLACEHOLDER. Shows a dashed outline and a
 * "TBC" tag until the matching field in lib/site.ts is marked confirmed.
 */
export function Ph({
  confirmed = false,
  block = false,
  note = "Placeholder: confirm with Ted",
  as: Tag = "span",
  children,
}: {
  as?: "span" | "div";
  confirmed?: boolean;
  block?: boolean;
  note?: string;
  children: ReactNode;
}) {
  if (confirmed) return <>{children}</>;
  return (
    <Tag className={block ? "ph ph-block block w-fit" : "ph"} title={note} data-placeholder="">
      {children}
    </Tag>
  );
}
