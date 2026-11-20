export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.6 2.5H4.3a1.3 1.3 0 0 0-1.3 1.4 14 14 0 0 0 13.1 13.1 1.3 1.3 0 0 0 1.4-1.3v-2.3a1 1 0 0 0-.7-1l-2.6-.9a1 1 0 0 0-1.1.3l-1 1.2a10.6 10.6 0 0 1-4.7-4.7l1.2-1a1 1 0 0 0 .3-1.1l-.9-2.6a1 1 0 0 0-1-.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ dir = "right", className = "h-4 w-4" }: { dir?: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/** Six-bar swatch mark used beside the wordmark until a real logo exists. */
export function SwatchMark({ className = "h-6 w-6" }: { className?: string }) {
  const fills = ["#C7CCC5", "#A3AE94", "#DFC48C", "#C4876A", "#7D97AB", "#1F3547"];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {fills.map((f, i) => (
        <rect key={f} x={i * 4} y="2" width="3" height="20" fill={f} />
      ))}
    </svg>
  );
}
