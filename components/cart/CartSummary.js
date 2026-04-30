"use client";

import { formatPrice } from "@/components/products/product-utils";

export default function CartSummary({
  itemCount,
  subtotal,
  totalAmount,
  hasItems,
  onClearCart,
  onProceedToCheckout,
  checkoutDisabledReason,
}) {
  return (
    <aside className="xl:sticky xl:top-24 xl:self-start">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-5 shadow-[0_28px_90px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.14),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(12,109,96,0.14),_transparent_46%)]" />

        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Order Summary
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/8 bg-white/6 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Items
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {itemCount}
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/6 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Delivery
              </p>
              <p className="mt-1 text-lg font-semibold text-[#e3c995]">
                Free
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Subtotal</span>
              <span className="font-semibold text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Delivery fee</span>
              <span className="font-semibold text-[#e3c995]">
                Free
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-white/6 p-4">
            <p className="text-right text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Inclusive of taxes
            </p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <span className="text-sm font-semibold text-white sm:text-base">
                Total Amount
              </span>
              <span className="text-2xl font-semibold tracking-tight text-[#e3c995]">
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
