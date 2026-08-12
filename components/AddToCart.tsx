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
                className={`flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-xs border px-5 py-4 transition-colors ${
                  active ? "border-lime bg-surface" : "border-line bg-surface/50 hover:border-muted"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pack"
                    value={option.id}
                    checked={active}
                    onChange={() => setOptionId(option.id)}
                    className="h-4 w-4 accent-lime"
                  />
                  <span>
                    <span className="t-display block text-base text-paper">{option.name}</span>
                    <span className="t-body block text-xs text-muted">
                      {formatLKR(pricePerBar(option))} per bar
                      {option.bars > 1 && `, save ${formatLKR(savingsVsSingles(option))}`}
                    </span>
                  </span>
                </span>
                <span className="t-numeral shrink-0 text-xl whitespace-nowrap text-paper">
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
          className="t-label inline-flex min-h-12 flex-1 items-center justify-center rounded-xs border border-line px-6 text-xs text-paper transition-colors hover:border-lime hover:text-lime active:translate-y-px"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="t-label inline-flex min-h-12 flex-1 items-center justify-center rounded-xs bg-lime px-6 text-xs text-white transition-colors hover:opacity-90 active:translate-y-px"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
