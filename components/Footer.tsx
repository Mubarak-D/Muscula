import Link from "next/link";
import { BRAND } from "@/lib/products";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="t-body max-w-xs text-sm text-muted">
            A product of {BRAND.parent}. Made in Sri Lanka, delivered to gyms island-wide.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-12">
          <div className="space-y-2">
            <h2 className="t-label text-xs text-paper">Shop</h2>
            <Link href="/product" className="t-body block text-sm text-muted hover:text-lime">
              The bar
            </Link>
            <Link href="/cart" className="t-body block text-sm text-muted hover:text-lime">
              Cart
            </Link>
          </div>
          <div className="space-y-2">
            <h2 className="t-label text-xs text-paper">Brand</h2>
            <Link href="/about" className="t-body block text-sm text-muted hover:text-lime">
              About
            </Link>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="t-body block text-sm text-muted hover:text-lime"
            >
              Instagram
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="t-label mx-auto max-w-6xl px-5 py-5 text-[0.65rem] text-muted">
          Demo site. Ordering and payments are simulated.
        </p>
      </div>
    </footer>
  );
}
