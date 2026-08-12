import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { PARTNERS } from "@/lib/products";

const BASE = [
  { ...PARTNERS[0], image: IMAGES.partnerTranzformers },
  { ...PARTNERS[1], image: IMAGES.partnerVaaj },
];

// There are only two real partners, so the base pair repeats until the run is
// wider than any viewport. Inventing a third partner would be a lie on a page
// whose whole job is credibility.
const RUN = [...BASE, ...BASE, ...BASE, ...BASE];

/** The only marquee on the site. CSS keyframes on a track holding two identical
 *  runs, translated by exactly half its width, so the loop is seamless with no
 *  scroll listener and no JS. */
export function Marquee() {
  return (
    <section aria-labelledby="partners-heading" className="border-y border-line py-12">
      <h2 id="partners-heading" className="t-label mx-auto max-w-6xl px-5 pb-8 text-xs text-muted">
        Collaborations &amp; events
      </h2>

      <div className="flex overflow-hidden">
        <ul className="marquee-track flex shrink-0 items-stretch gap-4 pr-4">
          {[...RUN, ...RUN].map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= RUN.length}
              className="w-64 shrink-0 rounded-xs border border-line bg-surface"
            >
              <Image
                src={item.image.src}
                width={item.image.w}
                height={item.image.h}
                alt={i < RUN.length ? item.image.alt : ""}
                sizes="256px"
                className="h-40 w-full object-cover"
              />
              <div className="px-4 py-3">
                <p className="t-display text-sm text-paper">{item.name}</p>
                <p className="t-label mt-1 text-[0.6rem] text-muted">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
