"use client";

import Link from "next/link";
import { formatPrice } from "@/components/products/product-utils";

function getAddressLabel(address) {
  return (
    address.label ||
    [
      address.recipient_name,
      address.city,
      address.region,
    ]
      .filter(Boolean)
      .join(" - ") ||
    "Saved address"
  );
}

function getAddressPreview(address) {
  return [
    address.address_line_1,
    address.address_line_2,
    [address.city, address.region, address.postal_code].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join(", ");
}

export default function CartSummary({
  itemCount,
  subtotal,
  totalAmount,
  hasItems,
  onClearCart,
  onProceedToCheckout,
  checkoutDisabledReason,
  isLoggedIn,
  savedAddresses,
  selectedAddressId,
  onSelectedAddressIdChange,
  guestAddress,
  onGuestAddressChange,
}) {
  const selectedAddress =
    savedAddresses.find((address) => address.id === selectedAddressId) ??
    savedAddresses[0];

  return (
    <aside className="xl:sticky xl:top-24 xl:self-start">
      <div className="theme-panel relative overflow-hidden rounded-[1.6rem] border p-5 backdrop-blur">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.14),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(12,109,96,0.14),_transparent_46%)]" />

        <div className="relative">
          <h2 className="theme-heading text-xl font-semibold tracking-tight sm:text-2xl">
            Order Summary
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="theme-chip rounded-xl border p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Items
              </p>
              <p className="theme-heading mt-1 text-lg font-semibold">
                {itemCount}
              </p>
            </div>
            <div className="theme-chip rounded-xl border p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Delivery
              </p>
              <p className="mt-1 text-lg font-semibold text-[#7a5525] dark:text-[#e3c995]">
                Free
              </p>
            </div>
          </div>

          <div className="theme-border mt-5 border-t pt-4">
            <p className="theme-heading text-sm font-semibold">
              Delivery address
            </p>

            {!isLoggedIn ? (
              <div className="mt-3">
                <textarea
                  value={guestAddress}
                  onChange={(event) => onGuestAddressChange(event.target.value)}
                  rows={4}
                  className="theme-input min-h-28 w-full resize-none rounded-[1rem] border px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#d8bb82]/45"
                  placeholder="Enter full delivery address"
                />
                <p className="theme-muted mt-2 text-xs leading-5">
                  This address will be included in your WhatsApp order message.
                </p>
              </div>
            ) : savedAddresses.length === 0 ? (
              <div className="theme-chip mt-3 rounded-[1rem] border p-3">
                <p className="text-sm font-medium">
                  Add a saved address before checkout.
                </p>
                <Link
                  href="/dashboard?tab=address"
                  className="mt-3 inline-flex rounded-full bg-[#7a5525] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#17130c] dark:bg-[#e3c995] dark:text-[#0f1720] dark:hover:bg-white"
                >
                  Add address
                </Link>
              </div>
            ) : (
              <div className="mt-3">
                <select
                  value={selectedAddress?.id ?? ""}
                  onChange={(event) => onSelectedAddressIdChange(event.target.value)}
                  className="theme-input w-full rounded-full border px-3 py-3 text-sm font-medium outline-none transition focus:border-[#d8bb82]/45"
                >
                  {savedAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {getAddressLabel(address)}
                      {address.is_default ? " (Default)" : ""}
                    </option>
                  ))}
                </select>
                {selectedAddress ? (
                  <p className="theme-muted mt-3 text-xs leading-6">
                    {getAddressPreview(selectedAddress)}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <div className="theme-border mt-5 flex flex-col gap-3 border-t pt-4">
            <div className="theme-muted flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="theme-heading font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="theme-muted flex items-center justify-between text-sm">
              <span>Delivery fee</span>
              <span className="font-semibold text-[#7a5525] dark:text-[#e3c995]">
                Free
              </span>
            </div>
          </div>

          <div className="theme-chip mt-6 rounded-[1.2rem] border p-4">
            <p className="text-right text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Inclusive of taxes
            </p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <span className="theme-heading text-sm font-semibold sm:text-base">
                Total Amount
              </span>
              <span className="text-2xl font-semibold tracking-tight text-[#7a5525] dark:text-[#e3c995]">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={onProceedToCheckout}
              disabled={!hasItems || Boolean(checkoutDisabledReason)}
              className="w-full rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-5 py-3.5 text-sm font-semibold tracking-[0.16em] text-[#0f1720] shadow-[0_18px_40px_-22px_rgba(216,187,130,0.85)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              PROCEED TO CHECKOUT
            </button>

            {checkoutDisabledReason ? (
              <p className="text-center text-xs leading-6 text-slate-400">
                {checkoutDisabledReason}
              </p>
            ) : null}

            <button
              type="button"
              onClick={onClearCart}
              disabled={!hasItems}
              className="w-full rounded-full text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
