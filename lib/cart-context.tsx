"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { addLine, setQty, type CartLine } from "./cart";

const STORAGE_KEY = "muscula.cart.v1";

type CartState = {
  lines: CartLine[];
  hydrated: boolean;
  add: (optionId: string, qty?: number) => void;
  updateQty: (optionId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

function readStored(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Anything in localStorage is user-editable, so validate before trusting it.
    return parsed.filter(
      (l): l is CartLine =>
        typeof l === "object" &&
        l !== null &&
        typeof (l as CartLine).optionId === "string" &&
        Number.isFinite((l as CartLine).qty) &&
        (l as CartLine).qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  // Starts false on both server and client so the first paint matches, then
  // flips once localStorage has been read.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // A full or blocked storage quota should never break checkout.
    }
  }, [lines, hydrated]);

  const add = useCallback((optionId: string, qty = 1) => {
    setLines((current) => addLine(current, optionId, qty));
  }, []);

  const updateQty = useCallback((optionId: string, qty: number) => {
    setLines((current) => setQty(current, optionId, qty));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, hydrated, add, updateQty, clear }),
    [lines, hydrated, add, updateQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
