type Aspect = "video" | "4-3" | "square" | "wide";

const aspectClasses: Record<Aspect, string> = {
  video: "aspect-video",
  "4-3": "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function ImagePlaceholder({
  caption,
  aspect = "video",
  className = "",
}: {
  caption: string;
  aspect?: Aspect;
  className?: string;
}) {
  return (
    <div
      className={`${aspectClasses[aspect]} relative overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-2">
            Image placeholder
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">{caption}</p>
        </div>
      </div>
    </div>
  );
}
