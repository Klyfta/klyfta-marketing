// PLACEHOLDER — replace with a real EU map visualisation showing
// data centre locations (Hetzner Falkenstein DE, Mollie Amsterdam NL,
// etc.). The component reserves the visual real estate and reads as
// an obvious WIP marker until the real graphic ships.

export function EuMapPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Map of Verkio's EU data centres — placeholder"
      className="relative flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gray-700 bg-gray-900/40 text-center"
    >
      <div className="text-gray-400">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
          Placeholder
        </p>
        <p className="mt-2 text-sm font-medium text-white">
          EU map — data centres in Falkenstein, Amsterdam, Paris
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Replace with a real SVG/animated visualisation.
        </p>
      </div>
    </div>
  );
}
