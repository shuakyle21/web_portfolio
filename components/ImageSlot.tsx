/**
 * Stand-in for the design's <image-slot>: a styled placeholder box that
 * keeps the layout (and the intent) until the real screenshot exists.
 */
export function ImageSlot({
  placeholder,
  aspect = "16/9",
  radius,
}: {
  placeholder: string;
  aspect?: string;
  radius?: string;
}) {
  return (
    <div
      className="img-slot"
      style={{ aspectRatio: aspect, borderRadius: radius }}
      role="img"
      aria-label={`Placeholder: ${placeholder}`}
    >
      <span>{placeholder}</span>
    </div>
  );
}
