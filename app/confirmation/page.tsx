"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ORDER_KEY, type StoredOrder } from "@/components/CheckoutForm";
import { formatLKR } from "@/lib/cart";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [ready, setReady] = useState(false);

  // Read after mount: sessionStorage does not exist during the server render,
  // and the reference number must not differ between the two passes.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(ORDER_KEY);
      if (raw) setOrder(JSON.parse(raw) as StoredOrder);
    } catch {
      setOrder(null);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24" />;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24 text-center">
        <h1 className="t-display text-3xl text-ink">No order to display</h1>
        <p className="t-body mt-4 text-muted">
          This page shows a summary after placing an order.
        </p>
        <Link
          href="/product"
          className="t-label mt-8 inline-flex min-h-12 items-center rounded-xs bg-ink px-7 text-xs text-paper hover:opacity-88"
        >
          Choose a pack
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      <p>
        <span className="t-label inline-flex bg-lime px-2.5 py-1 text-[0.65rem] text-paper">
          Order confirmed
        </span>
      </p>
      <h1 className="t-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] text-balance text-ink">
        Thanks, {order.name.split(" ")[0]}
      </h1>

      <div className="mt-10 rounded-xs border border-line bg-surface">
        <dl className="divide-y divide-line">
          <Row label="Order reference" value={order.reference} mono />
          <Row label="Total" value={`${formatLKR(order.total)} for ${order.bars} bars`} mono />
          <Row
            label="Method"
            value={order.method === "pay" ? "Simulated card payment" : "Via WhatsApp"}
          />
          <Row label="Phone" value={order.phone} />
          <Row label="Delivery address" value={order.address} />
        </dl>
      </div>

      <div className="mt-8 rounded-xs border border-line bg-surface p-6">
        <h2 className="t-display text-lg text-ink">What happens next?</h2>
        <p className="t-body mt-3 text-sm text-muted">
          The Muscula team will call {order.phone} to confirm the address and coordinate delivery.
        </p>
        <p className="t-body mt-4 text-sm text-muted">
          This is a demo. No charges have been made.
        </p>
      </div>

      <Link
        href="/"
        className="t-label mt-10 inline-flex min-h-12 items-center border-b-2 border-lime pb-1 text-xs text-ink hover:opacity-70"
      >
        Back to home
      </Link>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
      <dt className="t-label text-xs text-muted">{label}</dt>
      <dd className={`${mono ? "t-numeral tabular-nums" : "t-body"} max-w-sm text-right text-sm text-ink`}>
        {value}
      </dd>
    </div>
  );
}
