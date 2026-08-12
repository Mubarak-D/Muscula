export const BRAND = {
  name: "Muscula Nutrition",
  parent: "JNR Marketing (Pvt) Ltd",
  instagram: "muscula.nutrition",
  instagramUrl: "https://www.instagram.com/muscula.nutrition/",
} as const;

/** Placeholder. Swap for the real business number before this is shown to customers. */
export const WHATSAPP_NUMBER = "94770000000";

export type Macro = { value: number; unit: string; label: string };

/** From the wrapper claim on their own packaging. */
export const MACROS: Macro[] = [
  { value: 27, unit: "g", label: "Protein" },
  { value: 40, unit: "g", label: "Carbs" },
  { value: 450, unit: "kcal", label: "Energy" },
];

export type PurchaseOption = {
  id: string;
  name: string;
  bars: number;
  price: number;
  badge?: string;
};

/** Client-supplied placeholder pricing: LKR 6,000 for five bars was their own example. */
export const OPTIONS: PurchaseOption[] = [
  { id: "single", name: "Single bar", bars: 1, price: 1400 },
  { id: "bundle5", name: "5 bar pack", bars: 5, price: 6000, badge: "Best value" },
];

export const DEFAULT_OPTION_ID = "bundle5";

export function findOption(id: string): PurchaseOption | undefined {
  return OPTIONS.find((o) => o.id === id);
}

/** One entry today. A second flavour is one more object, no component changes. */
export const FLAVORS = [
  { id: "original", name: "Original cashew chocolate", available: true },
] as const;

/** Placeholder panel. Replace with the printed values off the wrapper. */
export const NUTRITION: { label: string; amount: string; indent?: boolean }[] = [
  { label: "Energy", amount: "450 kcal" },
  { label: "Protein", amount: "27 g" },
  { label: "Carbohydrate", amount: "40 g" },
  { label: "of which sugars", amount: "18 g", indent: true },
  { label: "Fat", amount: "16 g" },
  { label: "of which saturates", amount: "7 g", indent: true },
  { label: "Fibre", amount: "4 g" },
  { label: "Salt", amount: "0.4 g" },
];

export const INGREDIENTS =
  "Milk chocolate coating, whey protein blend, roasted cashew, oats, glucose syrup, cocoa butter, natural flavouring, sea salt.";

export const PARTNERS = [
  { name: "Tranzformers", note: "Gym event partner" },
  { name: "Vaaj", note: "Brand collaboration" },
];
