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
      <article className="relative flex flex-col justify-between rounded-xs border border-lime bg-surface p-8 lg:p-10">
        <span className="t-label absolute -top-2.5 left-8 rounded-xs bg-lime px-2.5 py-1 text-[0.6rem] text-ink">
          {bundle.badge}
        </span>

        <div>
          <h3 className="t-display text-3xl text-paper lg:text-4xl">{bundle.name}</h3>
          <p className="t-numeral mt-5 text-[clamp(2.25rem,7vw,5rem)] whitespace-nowrap text-lime">
            {formatLKR(bundle.price)}
          </p>
          <p data-reveal className="t-body mt-3 text-sm text-muted">
            That&rsquo;s {formatLKR(pricePerBar(bundle))} per bar. Save{" "}
            <span className="text-paper">{formatLKR(savingsVsSingles(bundle))}</span> vs buying singles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => buy(bundle.id)}
          className="t-label mt-9 inline-flex min-h-12 items-center justify-center rounded-xs bg-lime px-7 text-xs text-white transition-colors hover:opacity-90 active:translate-y-px"
        >
          Buy the 5 pack
        </button>
      </article>

      <article className="flex flex-col justify-between rounded-xs border border-line bg-surface p-8">
        <div>
          <h3 className="t-display text-2xl text-paper">{single.name}</h3>
          <p className="t-numeral mt-5 text-3xl whitespace-nowrap text-paper sm:text-4xl">
            {formatLKR(single.price)}
          </p>
          <p className="t-body mt-3 text-sm text-muted">One bar, {formatLKR(single.price)} per bar.</p>
        </div>

        <button
          type="button"
          onClick={() => buy(single.id)}
          className="t-label mt-9 inline-flex min-h-12 items-center justify-center rounded-xs border border-line px-7 text-xs text-paper transition-colors hover:border-lime hover:text-lime active:translate-y-px"
        >
          Buy a single bar
        </button>
      </article>
    </div>
  );
}
