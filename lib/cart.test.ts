import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addLine,
  cartTotal,
  formatLKR,
  lineTotal,
  pricePerBar,
  savingsVsSingles,
  setQty,
  totalBars,
  totalItems,
} from "./cart.ts";
import { OPTIONS, findOption } from "./products.ts";

const single = findOption("single")!;
const bundle = findOption("bundle5")!;

test("empty cart totals zero", () => {
  assert.equal(cartTotal([]), 0);
  assert.equal(totalBars([]), 0);
  assert.equal(totalItems([]), 0);
});

test("bundle is cheaper per bar than a single", () => {
  assert.equal(pricePerBar(single), 1400);
  assert.equal(pricePerBar(bundle), 1200);
  assert.ok(pricePerBar(bundle) < pricePerBar(single));
});

test("bundle saving matches the client's stated figure", () => {
  // Five singles at 1,400 is 7,000. The pack is 6,000.
  assert.equal(savingsVsSingles(bundle), 1000);
  assert.equal(savingsVsSingles(single), 0);
});

test("quantities multiply and sum across lines", () => {
  const lines = [
    { optionId: "bundle5", qty: 2 },
    { optionId: "single", qty: 3 },
  ];
  assert.equal(lineTotal(lines[0]), 12000);
  assert.equal(cartTotal(lines), 12000 + 4200);
  assert.equal(totalBars(lines), 13); // 2 packs of five, plus three singles
  assert.equal(totalItems(lines), 5);
});

test("unknown option ids contribute nothing rather than NaN", () => {
  const lines = [{ optionId: "does-not-exist", qty: 4 }];
  assert.equal(cartTotal(lines), 0);
  assert.equal(totalBars(lines), 0);
});

test("negative quantities never produce a credit", () => {
  assert.equal(cartTotal([{ optionId: "single", qty: -5 }]), 0);
  assert.equal(totalBars([{ optionId: "single", qty: -5 }]), 0);
});

test("adding the same option merges instead of duplicating the line", () => {
  let lines = addLine([], "bundle5", 1);
  lines = addLine(lines, "bundle5", 2);
  assert.equal(lines.length, 1);
  assert.equal(lines[0].qty, 3);
});

test("setting a quantity to zero removes the line", () => {
  const lines = setQty([{ optionId: "single", qty: 2 }], "single", 0);
  assert.deepEqual(lines, []);
});

test("prices format with thousands separators and no locale drift", () => {
  assert.equal(formatLKR(6000), "LKR 6,000");
  assert.equal(formatLKR(1400), "LKR 1,400");
  assert.equal(formatLKR(0), "LKR 0");
  assert.equal(formatLKR(1234567), "LKR 1,234,567");
});

test("every option carries a positive price and bar count", () => {
  for (const option of OPTIONS) {
    assert.ok(option.price > 0, `${option.id} price`);
    assert.ok(option.bars > 0, `${option.id} bars`);
  }
});
