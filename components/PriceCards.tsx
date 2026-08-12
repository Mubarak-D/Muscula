"use client";

import { useRouter } from "next/navigation";
import { OPTIONS } from "@/lib/products";
import { formatLKR, pricePerBar, savingsVsSingles } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";

/** The two cards are deliberately unequal. Bundle pricing is the client's stated
 *  growth lever, so the pack occupies more of the row than the single, rather
 *  than the two sitting in a neutral even grid. */
export function PriceCards() {
  const { add } = useCart();
  const router = useRouter();
  const bundle = OPTIONS.find((o) => o.id === "bundle5");
  const single = OPTIONS.find((o) => o.id === "single");
  if (!bundle || !single) return null;

  function buy(optionId: string) {
    add(optionId, 1);
    router.push("/cart");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:items-stretch">
      {/* The recommended card is marked by weight, not by hue: a 2px ink edge
          against the single's 1px hairline. Lime is left to carry the badge,
          where it has ink on top of it. */}
      <article className="relative flex flex-col justify-between rounded-xs border-2 border-ink bg-surface p-6 sm:p-8 lg:p-10">
        <span className="t-label absolute -top-2.5 left-6 bg-lime px-2.5 py-1 text-[0.6rem] text-paper sm:left-8">
          {bundle.badge}
        </span>

        <div>
          <h3 className="t-display mt-1 text-3xl text-ink lg:text-4xl">{bundle.name}</h3>
          <p className="t-numeral mt-4 text-[clamp(2.5rem,11vw,5rem)] whitespace-nowrap text-ink">
            {formatLKR(bundle.price)}
          </p>
          <p className="t-body mt-3 text-sm text-muted">
            That&rsquo;s {formatLKR(pricePerBar(bundle))} per bar. Save{" "}
            <span className="text-ink">{formatLKR(savingsVsSingles(bundle))}</span> vs buying singles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => buy(bundle.id)}
          className="t-label mt-7 inline-flex min-h-12 items-center justify-center rounded-xs bg-ink px-7 text-xs text-paper transition-opacity hover:opacity-88 active:translate-y-px lg:mt-9"
        >
          Buy the 5 pack
        </button>
      </article>

      <article className="flex flex-col justify-between rounded-xs border border-line bg-surface p-6 sm:p-8">
        <div>
          <h3 className="t-display text-2xl text-ink">{single.name}</h3>
          <p className="t-numeral mt-4 text-3xl whitespace-nowrap text-ink sm:text-4xl">
            {formatLKR(single.price)}
          </p>
          <p className="t-body mt-3 text-sm text-muted">One bar, {formatLKR(single.price)} per bar.</p>
        </div>

        <button
          type="button"
          onClick={() => buy(single.id)}
          className="t-label mt-7 inline-flex min-h-12 items-center justify-center rounded-xs border border-ink px-7 text-xs text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px lg:mt-9"
        >
          Buy a single bar
        </button>
      </article>
    </div>
  );
}
