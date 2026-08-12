import type { Metadata } from "next";
import { CartLines } from "@/components/CartLines";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your order details and delivery information.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <h1 className="t-display text-[clamp(2.25rem,5vw,3.5rem)] text-balance text-ink">Your order</h1>
      <p className="t-body mt-4 max-w-lg text-muted">
        Review your order details and delivery information.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <section aria-labelledby="lines-heading">
          <h2 id="lines-heading" className="t-label mb-4 text-xs text-muted">
            Items
          </h2>
          <CartLines />
        </section>

        <section aria-labelledby="checkout-heading">
          <h2 id="checkout-heading" className="sr-only">
            Checkout
          </h2>
          <CheckoutForm />
        </section>
      </div>
    </div>
  );
}
