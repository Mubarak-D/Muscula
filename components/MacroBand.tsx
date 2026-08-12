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

/** The signature element, and the one place the brand lime covers real area: a
 *  full-bleed plate that hits hardest here because it is the only light thing on
 *  a black page. The figures are stamped into it in the ground colour, the way
 *  markings are cast into a weight — 15.7:1. Never `ink` on this plate: white on
 *  lime is 1.4:1.
 *
 *  Column widths follow digit count rather than an even split, so 450 gets the
 *  room it needs. On a phone the three stay in one row: stacked, they were three
 *  screens of scrolling to deliver three numbers, and the comparison between them
 *  is the point. */
export function MacroBand() {
  return (
    <section aria-labelledby="macros-heading" className="bg-lime">
      <h2 id="macros-heading" className="sr-only">
        Nutrition per bar
      </h2>
      <dl className="mx-auto grid max-w-6xl grid-cols-[1fr_1fr_1.35fr] sm:grid-cols-[1fr_1fr_1.25fr]">
        {MACROS.map((macro, i) => (
          <div
            key={macro.label}
            className={`flex flex-col justify-between gap-2 px-3 py-8 sm:gap-3 sm:px-5 sm:py-14 ${
              i > 0 ? "border-l border-paper/15" : ""
            }`}
          >
            <dd className="t-numeral flex items-baseline text-[clamp(2.1rem,10.5vw,8.5rem)] text-paper">
              <Numeral value={macro.value} />
              <span className="t-label ml-1 text-[0.2em] text-paper/70 sm:ml-2 sm:text-[0.18em]">
                {macro.unit}
              </span>
            </dd>
            <dt className="t-label text-[0.6rem] text-paper/70 sm:text-xs">{macro.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
