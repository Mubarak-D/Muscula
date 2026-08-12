"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { totalItems } from "@/lib/cart";
import { popCount } from "@/lib/motion";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/product", label: "The bar" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { lines, hydrated } = useCart();
  const pathname = usePathname();
  const count = totalItems(lines);
  const countRef = useRef<HTMLSpanElement>(null);
  const previous = useRef(count);

  useEffect(() => {
    if (hydrated && count > previous.current && countRef.current) {
      popCount(countRef.current);
    }
    previous.current = count;
  }, [count, hydrated]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
        <Link href="/" aria-label="Muscula Nutrition, home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`t-label text-[0.7rem] whitespace-nowrap transition-colors hover:text-lime sm:text-xs ${
                pathname === link.href ? "text-lime" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            className="t-label flex min-h-11 items-center gap-2 px-1 text-[0.7rem] whitespace-nowrap text-paper transition-colors hover:text-lime sm:text-xs"
          >
            Cart
            <span
              ref={countRef}
              aria-hidden="true"
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-xs px-1.5 text-xs tabular-nums ${
                count > 0 ? "bg-lime text-ink" : "bg-surface text-muted"
              }`}
            >
              {hydrated ? count : 0}
            </span>
            <span className="sr-only">
              {hydrated ? `${count} item${count === 1 ? "" : "s"} in cart` : "cart"}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
