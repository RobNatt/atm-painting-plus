import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";
import { Ph } from "./Ph";

/** tel: link. Shows the number; `short` shows only "Call". */
export function CallLink({
  className = "btn btn-secondary",
  short = false,
  label,
}: {
  className?: string;
  short?: boolean;
  label?: string;
}) {
  const { phone } = site;
  return (
    <a href={`tel:${phone.value.tel}`} className={className} aria-label={`Call ${site.ownerFirstName} at ${phone.value.display}`}>
      <PhoneIcon />
      {short ? (
        <span>Call</span>
      ) : (
        <span>
          {label ?? "Call"}
          <span className="inline-block w-1.5" aria-hidden="true" />
          <Ph confirmed={phone.confirmed} note="Placeholder phone number: confirm with Ted">
            {phone.value.display}
          </Ph>
        </span>
      )}
    </a>
  );
}
