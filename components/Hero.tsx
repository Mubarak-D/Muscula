"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { IMAGES } from "@/lib/images";
import { MACROS } from "@/lib/products";
import { heroEntry } from "@/lib/motion";
import { Chevrons } from "./Chevrons";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Asymmetric split, weighted to the claim. The product sits inside a bordered
 *  panel at close to its native 470px rather than stretching across the viewport:
 *  the only photography that exists is 640px off Instagram, and a framed spec
 *  card stays sharp where a full bleed hero would go soft. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    return heroEntry(ref.current);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-line">
      {/* Phone screens have no margin to spare: the chevrons land on top of the
          lime kicker at 360px, lime on lime. Decoration loses that argument. */}
      <Chevrons className="absolute top-0 left-0 hidden h-28 sm:flex" count={3} />

      {/* Three grid children rather than two, so the phone order can be
          claim → product → copy → buttons while the desktop split stays a
          two-column with the panel spanning both text rows. No duplicated DOM. */}
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-10 pb-14 sm:pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-x-14 lg:gap-y-9 lg:pt-24 lg:pb-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <p data-hero-line className="mb-6">
            <span className="t-label inline-flex bg-lime px-2.5 py-1 text-[0.65rem] text-paper">
              Made in Sri Lanka
            </span>
          </p>

          {/* No nowrap below 640: at a 2rem floor these lines are wider than a
              360px phone, and the old nowrap put the overflow under the
              overflow-x:hidden on <html> where it read as a clipped headline. */}
          <h1 className="t-display text-[clamp(2rem,8.5vw,3.5rem)] text-ink">
            <span data-hero-line className="block sm:whitespace-nowrap">
              Sri Lanka&rsquo;s first
            </span>
            <span data-hero-line className="block sm:whitespace-nowrap">
              27g protein bar
            </span>
          </h1>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <p data-hero-line className="t-body max-w-lg text-lg text-muted">
            The taste of a Snickers, the nutrition of a premium protein bar.
          </p>

          {/* Stacked full width below 640. Side by side, the tracked labels wrap
              inside their own buttons at 360px. */}
          <div data-hero-cta className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/product"
              className="t-label inline-flex min-h-12 items-center justify-center rounded-xs bg-ink px-7 text-xs text-paper transition-opacity hover:opacity-88 active:translate-y-px"
            >
              Buy a 5 pack
            </Link>
            <Link
              href="/product"
              className="t-label inline-flex min-h-12 items-center justify-center rounded-xs border border-ink px-7 text-xs text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
            >
              See the numbers
            </Link>
          </div>
        </div>

        <figure
          data-hero-panel
          className="rounded-xs border border-line bg-surface lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <Image
            src={IMAGES.barHero.src}
            width={IMAGES.barHero.w}
            height={IMAGES.barHero.h}
            alt={IMAGES.barHero.alt}
            priority
            sizes="(max-width: 1024px) 92vw, 470px"
            className="h-auto w-full rounded-t-xs object-cover"
          />
          {/* Desktop only. On a phone the panel now sits directly above the lime
              macro plate, and printing 27 / 40 / 450 twice within one thumb-swipe
              spends the reveal before the big version lands. */}
          <figcaption className="hidden grid-cols-3 border-t border-line lg:grid">
            {MACROS.map((macro, i) => (
              <div
                key={macro.label}
                className={`px-4 py-4 ${i > 0 ? "border-l border-line" : ""}`}
              >
                <p className="t-numeral text-2xl text-ink">
                  {macro.value}
                  <span className="t-label ml-0.5 text-[0.42em] text-muted">{macro.unit}</span>
                </p>
                <p className="t-label mt-1.5 text-[0.6rem] text-muted">{macro.label}</p>
              </div>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
