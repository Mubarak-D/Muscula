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
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
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
            <h2
              data-reveal
              className="t-display text-[clamp(2rem,4.5vw,3.25rem)] text-balance text-ink"
            >
              Built for the people who actually train
            </h2>
            <p data-reveal className="t-body mt-6 max-w-lg text-muted">
              Muscula started by going direct to gyms. Trainers and athletes tried it and asked how to get a box. Our focus has always been high protein count over artificial flavouring.
            </p>
            <p data-reveal className="t-body mt-4 max-w-lg text-muted">
              Imported protein bars come at a premium. Made right here in Sri Lanka, this one delivers great chocolate taste.
            </p>
            <Link
              data-reveal
              href="/about"
              className="t-label mt-8 inline-flex min-h-12 items-center border-b-2 border-lime pb-1 text-xs text-ink hover:opacity-70"
            >
              Read our story
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <h2 data-reveal className="t-display text-[clamp(2rem,4.5vw,3.25rem)] text-balance text-ink">
            Buy by the pack
          </h2>
          <p data-reveal className="t-body mt-4 mb-10 max-w-lg text-muted">
            Grab a single bar to try, or save with the 5 bar pack.
          </p>
          <div data-reveal>
            <PriceCards />
          </div>
        </div>
      </Reveal>

      <Marquee />

      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:py-24 sm:flex-row sm:items-center sm:justify-between">
          <h2 data-reveal className="t-display max-w-xl text-[clamp(2rem,4.5vw,3.25rem)] text-balance text-ink">
            27 grams. One bar.
          </h2>
          <Link
            data-reveal
            href="/product"
            className="t-label inline-flex min-h-13 shrink-0 items-center rounded-xs bg-ink px-9 py-4 text-xs text-paper transition-opacity hover:opacity-88 active:translate-y-px"
          >
            Choose a pack
          </Link>
        </div>
      </Reveal>
    </>
  );
}
