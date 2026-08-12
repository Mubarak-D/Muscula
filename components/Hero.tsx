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
      <Chevrons className="absolute top-0 left-0 h-28 opacity-90" count={3} />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-14 lg:pt-24 lg:pb-20">
        <div>
          <p data-hero-line className="t-label mb-6 text-xs text-lime">
            Made in Sri Lanka
          </p>

          {/* Sized so each line holds on one row at every breakpoint. The
              expanded width axis eats horizontal space fast, so the ceiling is
              lower than it would be for a normal-width face. */}
          <h1 className="t-display text-[clamp(2rem,4.4vw,3.5rem)] text-paper">
            <span data-hero-line className="block whitespace-nowrap">
              Sri Lanka&rsquo;s first
            </span>
            <span data-hero-line className="block whitespace-nowrap">
              27g protein bar
            </span>
          </h1>

          <p data-hero-line className="t-body mt-6 max-w-lg text-lg text-muted">
            The taste of a Snickers, the nutrition of a premium protein bar.
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/product"
              className="t-label inline-flex min-h-12 items-center rounded-xs bg-lime px-7 text-xs text-ink transition-transform hover:bg-paper active:translate-y-px"
            >
              Buy a 5 pack
            </Link>
            <Link
              href="/product"
              className="t-label inline-flex min-h-12 items-center rounded-xs border border-line px-7 text-xs text-paper transition-colors hover:border-lime hover:text-lime"
            >
              See the numbers
            </Link>
          </div>
        </div>

        <figure data-hero-panel className="rounded-xs border border-line bg-surface">
          <Image
            src={IMAGES.barHero.src}
            width={IMAGES.barHero.w}
            height={IMAGES.barHero.h}
            alt={IMAGES.barHero.alt}
            priority
            sizes="(max-width: 1024px) 92vw, 470px"
            className="h-auto w-full rounded-t-xs object-cover"
          />
          <figcaption className="grid grid-cols-3 border-t border-line">
            {MACROS.map((macro, i) => (
              <div
                key={macro.label}
                className={`px-4 py-4 ${i > 0 ? "border-l border-line" : ""}`}
              >
                <p className="t-numeral text-2xl text-lime">
                  {macro.value}
                  <span className="t-label ml-0.5 text-[0.42em]">{macro.unit}</span>
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
