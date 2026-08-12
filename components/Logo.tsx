/** The wordmark is set in the site's own display face with a bolt glyph standing
 *  in for the L, which is how the real lockup is built. Keeping it as live text
 *  plus one SVG path means it stays crisp at any size and recolours with the
 *  theme, unlike the 150px JPEG the brand currently has. */
export function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      {/* Chunky enough to hold its own beside 900 weight letterforms. A thinner
          bolt reads as a dagger at wordmark size. */}
      <path d="M11.6 0H4.3L0 13.2h4.8L3.2 24 16 8.9h-6.1z" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="t-display flex items-center text-[1.15rem] text-paper">
        MUSCU
        <Bolt className="mx-[0.02em] h-[0.86em] w-[0.58em] text-lime" />
        A
        <span className="t-label ml-[0.25em] self-start text-[0.4em] text-muted">®</span>
      </span>
      <span className="t-label text-[0.5rem] text-muted">Nutrition</span>
    </span>
  );
}
