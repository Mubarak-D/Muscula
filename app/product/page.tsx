import type { Metadata } from "next";
import Image from "next/image";
import { AddToCart } from "@/components/AddToCart";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/images";
import { FLAVORS, INGREDIENTS, MACROS, NUTRITION } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Protein Bar",
  description:
    "27g protein, 40g carbs, 450 kcal. Cashew and chocolate. Sri Lanka's first 27g protein bar.",
};

const GALLERY = [IMAGES.barHero, IMAGES.ambassador, IMAGES.gymFloor];

export default function ProductPage() {
  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-3">
          <div className="rounded-xs border border-line bg-surface p-2">
            <Image
              src={IMAGES.barHero.src}
              width={IMAGES.barHero.w}
              height={IMAGES.barHero.h}
              alt={IMAGES.barHero.alt}
              priority
              sizes="(max-width: 1024px) 92vw, 600px"
              className="h-auto w-full rounded-xs object-cover"
            />
          </div>

          <ul className="grid grid-cols-3 gap-3">
            {GALLERY.map((image) => (
              <li key={image.src} className="rounded-xs border border-line bg-surface p-1.5">
                <Image
                  src={image.src}
                  width={image.w}
                  height={image.h}
                  alt={image.alt}
                  sizes="200px"
                  className="h-24 w-full rounded-xs object-cover sm:h-32"
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="t-label text-xs text-lime">{FLAVORS[0].name}</p>
          <h1 className="t-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] text-paper">
            Muscula Protein Bar
          </h1>
          <p className="t-body mt-5 text-lg text-muted">
            Great taste meets premium nutrition. Chocolate-coated, packed with cashew, and loaded with 27g of protein.
          </p>

          <dl className="mt-8 grid grid-cols-3 rounded-xs border border-line bg-surface/50">
            {MACROS.map((macro, i) => (
              <div key={macro.label} className={`px-4 py-5 ${i > 0 ? "border-l border-line" : ""}`}>
                <dd className="t-numeral text-3xl text-lime">
                  {macro.value}
                  <span className="t-label ml-0.5 text-[0.38em]">{macro.unit}</span>
                </dd>
                <dt className="t-label mt-2 text-[0.6rem] text-muted">{macro.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <AddToCart />
          </div>
        </div>
      </div>

      <Reveal className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 className="t-display text-2xl text-paper">Nutrition per bar</h2>
            <p className="t-body mt-2 mb-6 text-xs text-muted">
              Nutrition facts panel.
            </p>
            <table className="w-full border-collapse text-left">
              <tbody>
                {NUTRITION.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th
                      scope="row"
                      className={`t-body py-3 text-sm font-normal ${
                        row.indent ? "pl-5 text-muted" : "text-paper"
                      }`}
                    >
                      {row.label}
                    </th>
                    <td className="t-numeral py-3 text-right text-sm text-paper tabular-nums">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div data-reveal>
            <h2 className="t-display text-2xl text-paper">Ingredients</h2>
            <p className="t-body mt-6 text-muted">{INGREDIENTS}</p>

            <h3 className="t-display mt-10 text-xl text-paper">Flavours</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {FLAVORS.map((flavor) => (
                <li
                  key={flavor.id}
                  className="t-label rounded-xs border border-lime px-4 py-2 text-xs text-lime"
                >
                  {flavor.name}
                </li>
              ))}
              <li className="t-label rounded-xs border border-line px-4 py-2 text-xs text-muted">
                More flavours coming soon
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </>
  );
}
