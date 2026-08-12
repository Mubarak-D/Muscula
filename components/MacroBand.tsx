"use client";

import { useEffect, useRef } from "react";
import { MACROS } from "@/lib/products";
import { countUp } from "@/lib/motion";

function Numeral({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return countUp(ref.current, value);
  }, [value]);

  // The server renders the real figure, so the number is correct with no JS.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

/** The signature element. Oversized figures on lime hairlines, set like the
 *  markings stamped into a weight plate. Column widths follow digit count
 *  rather than being an even split, so 450 gets the room it needs. */
export function MacroBand() {
  return (
    <section aria-labelledby="macros-heading" className="border-y border-lime/35 bg-ink">
      <h2 id="macros-heading" className="sr-only">
        Nutrition per bar
      </h2>
      <dl className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-[1fr_1fr_1.25fr]">
        {MACROS.map((macro, i) => (
          <div
            key={macro.label}
            className={`flex flex-col justify-between gap-3 px-5 py-10 sm:py-14 ${
              i > 0 ? "border-t border-lime/35 sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <dd className="t-numeral flex items-baseline text-[clamp(4rem,11vw,8.5rem)] text-paper">
              <Numeral value={macro.value} />
              <span className="t-label ml-2 text-[0.16em] text-lime sm:text-[0.18em]">
                {macro.unit}
              </span>
            </dd>
            <dt className="t-label text-xs text-muted">{macro.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
