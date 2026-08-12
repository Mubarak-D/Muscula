"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { cartTotal, formatLKR, lineTotal, optionById, totalBars } from "@/lib/cart";

export function CartLines() {
  const { lines, hydrated, updateQty } = useCart();

  if (!hydrated) {
    return <p className="t-body py-10 text-sm text-muted">Loading your cart.</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-xs border border-line bg-surface px-6 py-12 text-center">
        <p className="t-display text-xl text-paper">Nothing in the cart yet</p>
        <p className="t-body mt-2 text-sm text-muted">
          The 5 pack works out at {formatLKR(1200)} a bar.
        </p>
        <Link
          href="/product"
          className="t-label mt-7 inline-flex min-h-12 items-center rounded-xs bg-lime px-7 text-xs text-ink hover:bg-paper"
        >
          Pick a pack
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-line rounded-xs border border-line bg-surface">
        {lines.map((line) => {
          const option = optionById(line.optionId);
          if (!option) return null;
          return (
            <li key={line.optionId} className="flex flex-wrap items-center gap-4 px-5 py-5">
              <div className="min-w-40 flex-1">
                <p className="t-display text-base text-paper">{option.name}</p>
                <p className="t-label mt-1 text-[0.6rem] text-muted">
                  {option.bars} {option.bars === 1 ? "bar" : "bars"} a pack
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateQty(line.optionId, line.qty - 1)}
                  aria-label={`Reduce ${option.name} quantity`}
                  className="t-display h-11 w-11 rounded-xs border border-line text-paper transition-colors hover:border-lime hover:text-lime"
                >
                  &minus;
                </button>
                <span
                  aria-label={`${option.name} quantity`}
                  className="t-numeral w-12 text-center text-lg text-paper tabular-nums"
                >
                  {line.qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(line.optionId, line.qty + 1)}
                  aria-label={`Increase ${option.name} quantity`}
                  className="t-display h-11 w-11 rounded-xs border border-line text-paper transition-colors hover:border-lime hover:text-lime"
                >
                  +
                </button>
              </div>

              <p className="t-numeral ml-auto text-right text-lg whitespace-nowrap text-paper tabular-nums">
                {formatLKR(lineTotal(line))}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xs border border-line bg-ink px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="t-label text-xs whitespace-nowrap text-muted">
            Total, {totalBars(lines)} bars
          </span>
          <span className="t-numeral text-2xl whitespace-nowrap text-lime tabular-nums sm:text-3xl">
            {formatLKR(cartTotal(lines))}
          </span>
        </div>
        <p className="t-body mt-2 text-xs text-muted">
          Delivery is arranged by phone after you order, so no shipping is added here.
        </p>
      </div>
    </div>
  );
}
