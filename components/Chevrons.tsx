/** The brand's own marketing graphics stack hard-edged angular slashes in two
 *  greens. That is reused here as the only decorative device on the site, which
 *  is also why there are no glows: their vocabulary is flat and cut, not soft. */
export function Chevrons({
  className = "",
  count = 3,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex items-start gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="clip-slash block w-6"
          style={{
            // Stepping the heights makes the group read as a stacked cut, the
            // way their own graphics use it, rather than as even stripes.
            height: `${100 - i * 22}%`,
            // Solid, alternating between the two greens. Fading them worked on
            // black; on paper a 56% moss just reads as a rendering mistake.
            backgroundColor: i % 2 === 0 ? "var(--color-lime)" : "var(--color-moss)",
          }}
        />
      ))}
    </div>
  );
}
