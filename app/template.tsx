/** template.tsx remounts on every navigation, so this lime bar wipes across
 *  once per route change. Pure CSS: nothing to schedule, nothing to get stuck
 *  mid-animation, and it disappears entirely under reduced motion. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="route-wipe pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-lime"
      />
      {children}
    </>
  );
}
