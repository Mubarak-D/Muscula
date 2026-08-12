"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_OPTION_ID, OPTIONS } from "@/lib/products";
import { formatLKR, pricePerBar, savingsVsSingles } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";

export function AddToCart() {
  const { add } = useCart();
  const router = useRouter();
  const [optionId, setOptionId] = useState(DEFAULT_OPTION_ID);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const selected = OPTIONS.find((o) => o.id === optionId) ?? OPTIONS[0];

  function handleAdd() {
    add(selected.id, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  }

  function handleBuyNow() {
    add(selected.id, 1);
    router.push("/cart");
  }

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="t-label mb-3 text-xs text-muted">Choose a pack</legend>
        <div className="space-y-3">
          {OPTIONS.map((option) => {
            const active = option.id === optionId;
            return (
              <label
                key={option.id}
                // ring rather than a second border pixel, so selecting a pack
                // does not reflow the stack.
                className={`flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-xs border px-4 py-4 transition-colors sm:px-5 ${
                  active
                    ? "border-ink bg-surface ring-1 ring-ink"
                    : "border-line bg-surface/50 hover:border-muted"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pack"
                    value={option.id}
                    checked={active}
                    onChange={() => setOptionId(option.id)}
                    className="h-4 w-4 shrink-0 accent-ink"
                  />
                  <span>
                    <span className="t-display block text-base text-ink">{option.name}</span>
                    <span className="t-body block text-xs text-muted">
                      {formatLKR(pricePerBar(option))} per bar
                      {option.bars > 1 && `, save ${formatLKR(savingsVsSingles(option))}`}
                    </span>
                  </span>
                </span>
                <span className="t-numeral shrink-0 text-xl whitespace-nowrap text-ink">
                  {formatLKR(option.price)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAdd}
          aria-live="polite"
          className="t-label inline-flex min-h-12 flex-1 items-center justify-center rounded-xs border border-ink px-6 text-xs text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="t-label inline-flex min-h-12 flex-1 items-center justify-center rounded-xs bg-ink px-6 text-xs text-paper transition-opacity hover:opacity-88 active:translate-y-px"
        >
          Buy now
        </button>
      </div>

      {/* Phone only. The pack picker scrolls out of the first viewport long
          before the decision is made, so the price and the action follow the
          thumb down the page. Lives here because this component already owns
          the selected option, so the bar needs no lifted state. */}
      <div className="buy-bar pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-3 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="min-w-0">
            <p className="t-label truncate text-[0.6rem] text-muted">{selected.name}</p>
            <p className="t-numeral text-xl text-ink">{formatLKR(selected.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleBuyNow}
            className="t-label ml-auto inline-flex min-h-12 shrink-0 items-center justify-center rounded-xs bg-ink px-7 text-xs text-paper active:translate-y-px"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
