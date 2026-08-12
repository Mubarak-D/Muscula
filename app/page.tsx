import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { MacroBand } from "@/components/MacroBand";
import { PriceCards } from "@/components/PriceCards";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MacroBand />

      {/* Editorial split, deliberately a different layout family from the hero
          split above it: image left, copy right, and full width rather than
          contained. */}
      <Reveal className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="rounded-xs border border-line bg-surface p-2">
            <Image
              src={IMAGES.ambassador.src}
              width={IMAGES.ambassador.w}
              height={IMAGES.ambassador.h}
              alt={IMAGES.ambassador.alt}
              sizes="(max-width: 1024px) 92vw, 460px"
              className="h-auto w-full rounded-xs object-cover"
            />
          </div>

          <div>
            <h2 data-reveal className="t-display text-[clamp(2rem,4.5vw,3.25rem)] text-paper">
              Built for the gym floor,
              <br />
              not the wellness aisle
            </h2>
            <p data-reveal className="t-body mt-6 max-w-lg text-muted">
              Muscula started by supplying gyms directly. Trainers ate it, then asked
              where they could buy a box. That is the whole story, and it is why the
              bar is built around protein rather than a flavour list.
            </p>
            <p data-reveal className="t-body mt-4 max-w-lg text-muted">
              Imported bars cost more and taste like a compromise. This one is made
              here, and it tastes like a Snickers.
            </p>
            <Link
              data-reveal
              href="/about"
              className="t-label mt-8 inline-flex min-h-12 items-center border-b border-lime pb-1 text-xs text-lime hover:text-paper"
            >
              Read the brand story
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 data-reveal className="t-display text-[clamp(2rem,4.5vw,3.25rem)] text-paper">
            Buy by the pack
          </h2>
          <p data-reveal className="t-body mt-4 mb-10 max-w-lg text-muted">
            One bar to try it. Five if you already know. Placeholder pricing while the
            client settles the final numbers.
          </p>
          <div data-reveal>
            <PriceCards />
          </div>
        </div>
      </Reveal>

      <Marquee />

      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-24 sm:flex-row sm:items-center sm:justify-between">
          <h2 data-reveal className="t-display max-w-xl text-[clamp(2rem,4.5vw,3.25rem)] text-paper">
            27 grams. One bar. Done.
          </h2>
          <Link
            data-reveal
            href="/product"
            className="t-label inline-flex min-h-13 shrink-0 items-center rounded-xs bg-lime px-9 py-4 text-xs text-ink transition-colors hover:bg-paper active:translate-y-px"
          >
            Pick a pack
          </Link>
        </div>
      </Reveal>
    </>
  );
}
