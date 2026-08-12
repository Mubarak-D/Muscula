"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { cartTotal, formatLKR, optionById, totalBars } from "@/lib/cart";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const ORDER_KEY = "muscula.order.v1";

export type CheckoutMethod = "pay" | "whatsapp";

export type StoredOrder = {
  reference: string;
  name: string;
  address: string;
  phone: string;
  method: CheckoutMethod;
  total: number;
  bars: number;
};

/** Sri Lankan mobile numbers, written either 0771234567 or +94771234567. */
const PHONE_PATTERN = "(\\+94|0)[0-9]{9}";

const MESSAGES: Record<string, { valueMissing: string; patternMismatch?: string }> = {
  name: { valueMissing: "Please enter the recipient's name." },
  address: { valueMissing: "Please enter the delivery address." },
  phone: {
    valueMissing: "Please enter a phone number.",
    patternMismatch: "Use 07XXXXXXXX or +947XXXXXXXX.",
  },
};

function messageFor(el: HTMLInputElement | HTMLTextAreaElement): string {
  const copy = MESSAGES[el.name];
  if (!copy) return el.validationMessage;
  if (el.validity.valueMissing) return copy.valueMissing;
  if (el.validity.patternMismatch && copy.patternMismatch) return copy.patternMismatch;
  return el.validationMessage;
}

export function CheckoutForm() {
  const { lines, clear } = useCart();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState<CheckoutMethod>("pay");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = cartTotal(lines);
  const bars = totalBars(lines);
  const empty = lines.length === 0;

  function buildWhatsAppMessage(order: StoredOrder): string {
    const items = lines
      .map((line) => {
        const option = optionById(line.optionId);
        return option ? `- ${option.name} x${line.qty} (${formatLKR(option.price * line.qty)})` : null;
      })
      .filter(Boolean)
      .join("\n");

    return [
      `New Muscula order ${order.reference}`,
      "",
      items,
      "",
      `Total: ${formatLKR(order.total)} for ${order.bars} bars`,
      "",
      `Name: ${order.name}`,
      `Address: ${order.address}`,
      `Phone: ${order.phone}`,
    ].join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || empty) return;

    const fields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[name], textarea[name]"),
    );
    const next: Record<string, string> = {};
    for (const field of fields) {
      if (!field.checkValidity()) next[field.name] = messageFor(field);
    }
    setErrors(next);

    if (Object.keys(next).length > 0) {
      fields.find((field) => next[field.name])?.focus();
      return;
    }

    const data = new FormData(form);
    const order: StoredOrder = {
      reference: `MSC-${Math.floor(100000 + Math.random() * 900000)}`,
      name: String(data.get("name") ?? ""),
      address: String(data.get("address") ?? ""),
      phone: String(data.get("phone") ?? ""),
      method,
      total,
      bars,
    };

    try {
      window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      // Storage unavailable fallback
    }

    if (method === "whatsapp") {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        buildWhatsAppMessage(order),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }

    clear();
    router.push("/confirmation");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
      <fieldset className="space-y-5">
        <legend className="t-display mb-4 text-xl text-ink">Delivery details</legend>

        <Field
          name="name"
          label="Full name"
          error={errors.name}
          hint="The person receiving the order."
        >
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-describedby="name-hint"
            aria-invalid={errors.name ? true : undefined}
            className="input"
          />
        </Field>

        <Field
          name="address"
          label="Delivery address"
          error={errors.address}
          hint="Street, city, and district."
        >
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            autoComplete="street-address"
            aria-describedby="address-hint"
            aria-invalid={errors.address ? true : undefined}
            className="input resize-y"
          />
        </Field>

        <Field
          name="phone"
          label="Phone number"
          error={errors.phone}
          hint="07XXXXXXXX or +947XXXXXXXX."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern={PHONE_PATTERN}
            autoComplete="tel"
            inputMode="tel"
            aria-describedby="phone-hint"
            aria-invalid={errors.phone ? true : undefined}
            className="input"
          />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="t-display mb-2 text-xl text-ink">How to order</legend>
        <p className="t-body mb-4 text-sm text-muted">
          Both methods are presented for demo purposes.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <MethodOption
            value="pay"
            checked={method === "pay"}
            onChange={setMethod}
            title="Pay now"
            body="Simulated card payment."
          />
          <MethodOption
            value="whatsapp"
            checked={method === "whatsapp"}
            onChange={setMethod}
            title="Order via WhatsApp"
            body="Redirects to WhatsApp with order details."
          />
        </div>
      </fieldset>

      <div>
        <button
          type="submit"
          disabled={empty}
          className="t-label inline-flex min-h-13 w-full items-center justify-center rounded-xs bg-ink px-8 py-4 text-xs text-paper transition-opacity hover:opacity-88 active:translate-y-px disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted"
        >
          {method === "pay" ? `Pay ${formatLKR(total)}` : "Order via WhatsApp"}
        </button>
        <p className="t-body mt-3 text-xs text-muted">
          This is a demo. No charges will be made.
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: string;
  label: string;
  hint: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-label mb-2 block text-xs text-ink">
        {label}
      </label>
      {children}
      {/* Same id either way, so aria-describedby always resolves to whichever
          of the two is currently rendered. */}
      {error ? (
        <p id={`${name}-hint`} role="alert" className="t-body mt-2 text-xs text-alert">
          {error}
        </p>
      ) : (
        <p id={`${name}-hint`} className="t-body mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

function MethodOption({
  value,
  checked,
  onChange,
  title,
  body,
}: {
  value: CheckoutMethod;
  checked: boolean;
  onChange: (value: CheckoutMethod) => void;
  title: string;
  body: string;
}) {
  return (
    <label
      className={`cursor-pointer rounded-xs border p-5 transition-colors ${
        checked ? "border-ink bg-surface ring-1 ring-ink" : "border-line bg-paper hover:border-muted"
      }`}
    >
      <span className="flex items-center gap-3">
        <input
          type="radio"
          name="method"
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="h-4 w-4 shrink-0 accent-ink"
        />
        <span className="t-display text-base text-ink">{title}</span>
      </span>
      <span className="t-body mt-2 block text-xs text-muted">{body}</span>
    </label>
  );
}
