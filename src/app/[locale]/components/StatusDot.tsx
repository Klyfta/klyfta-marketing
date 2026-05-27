// Tiny live-status indicator next to the logo. Static green for
// now; can be wired to a real `/status` poll later. The pulse
// animation makes the page feel alive without being noisy.

export function StatusDot() {
  return (
    <span
      className="relative inline-flex h-2 w-2"
      aria-label="All systems EU"
      title="All systems EU"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
    </span>
  );
}
