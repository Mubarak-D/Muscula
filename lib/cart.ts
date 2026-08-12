// Explicit .ts extension so node --test can resolve this module directly,
// without a build step or a test framework in between.
import { OPTIONS, type PurchaseOption } from "./products.ts";

export type CartLine = { optionId: string; qty: number };

/** Hand-rolled rather than toLocaleString: Intl output can differ between the
 *  server and the browser, which would trip a hydration mismatch on every price. */
export function formatLKR(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}LKR ${digits}`;
}

export function optionById(
  id: string,
  options: PurchaseOption[] = OPTIONS,
): PurchaseOption | undefined {
  return options.find((o) => o.id === id);
}

export function lineTotal(line: CartLine, options: PurchaseOption[] = OPTIONS): number {
  const option = optionById(line.optionId, options);
  if (!option) return 0;
  return option.price * Math.max(0, line.qty);
}

export function cartTotal(lines: CartLine[], options: PurchaseOption[] = OPTIONS): number {
  return lines.reduce((sum, line) => sum + lineTotal(line, options), 0);
}

export function totalBars(lines: CartLine[], options: PurchaseOption[] = OPTIONS): number {
  return lines.reduce((sum, line) => {
    const option = optionById(line.optionId, options);
    return option ? sum + option.bars * Math.max(0, line.qty) : sum;
  }, 0);
}

export function totalItems(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + Math.max(0, line.qty), 0);
}

export function pricePerBar(option: PurchaseOption): number {
  return option.bars > 0 ? option.price / option.bars : 0;
}

/** What the customer keeps by taking this pack instead of the same number of singles. */
export function savingsVsSingles(
  option: PurchaseOption,
  options: PurchaseOption[] = OPTIONS,
): number {
  const single = options.find((o) => o.bars === 1);
  if (!single) return 0;
  return Math.max(0, single.price * option.bars - option.price);
}

/** Merges rather than appends, so adding the same pack twice bumps the quantity. */
export function addLine(lines: CartLine[], optionId: string, qty = 1): CartLine[] {
  if (qty <= 0) return lines;
  const existing = lines.find((l) => l.optionId === optionId);
  if (!existing) return [...lines, { optionId, qty }];
  return lines.map((l) => (l.optionId === optionId ? { ...l, qty: l.qty + qty } : l));
}

/** Setting a quantity to zero or below drops the line entirely. */
export function setQty(lines: CartLine[], optionId: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.optionId !== optionId);
  return lines.map((l) => (l.optionId === optionId ? { ...l, qty } : l));
}
