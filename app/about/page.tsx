import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Chevrons } from "@/components/Chevrons";
import { IMAGES } from "@/lib/images";
import { BRAND, PARTNERS } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muscula Nutrition is a product of JNR Marketing, delivered direct to gyms.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <Chevrons className="absolute top-0 right-8 h-24 opacity-80" count={2} />
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="t-display max-w-3xl text-[clamp(2.25rem,6vw,4.25rem)] text-paper">
            We started on the gym floor
          </h1>
          <p className="t-body mt-6 max-w-xl text-lg text-muted">
            {BRAND.name} is a product of {BRAND.parent}. Before it hit shelves, it went straight to Sri Lanka&rsquo;s leading gym floors.
          </p>
        </div>
      </section>

      <Reveal className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-5">
            <h2 data-reveal className="t-display text-3xl text-paper">
              Get it where you use it
            </h2>
            <p data-reveal className="t-body text-muted">
              Most imported protein bars come at a premium. Muscula was built to deliver high protein with great chocolate and cashew taste, right where athletes need it.
            </p>
            <p data-reveal className="t-body text-muted">
              Our distribution runs through gyms. This site is the first step in reaching consumers directly.
            </p>
          </div>

          <div data-reveal className="rounded-xs border border-line bg-surface p-2">
            <Image
              src={IMAGES.gymBags.src}
              width={IMAGES.gymBags.w}
              height={IMAGES.gymBags.h}
              alt={IMAGES.gymBags.alt}
              sizes="(max-width: 1024px) 92vw, 620px"
              className="h-auto w-full rounded-xs object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 data-reveal className="t-display text-3xl text-paper">
            Our partners
          </h2>
          <p data-reveal className="t-body mt-4 mb-10 max-w-lg text-muted">
            Gym events and local brand collaborations.
          </p>

          <ul className="grid gap-5 sm:grid-cols-2">
            {PARTNERS.map((partner, i) => (
              <li
                data-reveal
                key={partner.name}
                className="rounded-xs border border-line bg-surface"
              >
                <Image
                  src={i === 0 ? IMAGES.partnerTranzformers.src : IMAGES.partnerVaaj.src}
                  width={i === 0 ? IMAGES.partnerTranzformers.w : IMAGES.partnerVaaj.w}
                  height={i === 0 ? IMAGES.partnerTranzformers.h : IMAGES.partnerVaaj.h}
                  alt={i === 0 ? IMAGES.partnerTranzformers.alt : IMAGES.partnerVaaj.alt}
                  sizes="(max-width: 640px) 92vw, 460px"
                  className="h-56 w-full object-cover"
                />
                <div className="px-5 py-4">
                  <h3 className="t-display text-lg text-paper">{partner.name}</h3>
                  <p className="t-label mt-1 text-[0.6rem] text-muted">{partner.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-24 sm:flex-row sm:items-center sm:justify-between">
          <h2 data-reveal className="t-display max-w-xl text-[clamp(2rem,4.5vw,3rem)] text-paper">
            Try the protein bar the gyms are talking about
          </h2>
          <Link
            data-reveal
            href="/product"
            className="t-label inline-flex min-h-13 shrink-0 items-center rounded-xs bg-lime px-9 py-4 text-xs text-white transition-colors hover:opacity-90 active:translate-y-px"
          >
            Choose a pack
          </Link>
        </div>
      </Reveal>
    </>
  );
}
