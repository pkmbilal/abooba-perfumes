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
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/92 p-5 shadow-[0_22px_60px_-40px_rgba(15,118,110,0.28)] backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_46%)]" />

        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl dark:text-white">
            Order Summary
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-900/90">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Items
              </p>
              <p className="mt-1 text-lg font-semibold text-stone-950 dark:text-white">
                {itemCount}
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-900/90">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Delivery
              </p>
              <p className="mt-1 text-lg font-semibold text-teal-700 dark:text-teal-300">
                Free
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 border-t border-stone-200 pt-4 dark:border-stone-800">
            <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-950 dark:text-white">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
              <span>Delivery fee</span>
              <span className="font-semibold text-teal-700 dark:text-teal-300">
                Free
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[1.2rem] bg-stone-50 p-4 dark:bg-stone-900/90">
            <p className="text-right text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
              Inclusive of taxes
            </p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <span className="text-sm font-semibold text-stone-950 sm:text-base dark:text-white">
                Total Amount
              </span>
              <span className="text-2xl font-semibold tracking-tight text-teal-700 dark:text-teal-300">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={onProceedToCheckout}
              disabled={!hasItems || Boolean(checkoutDisabledReason)}
              className="w-full rounded-full bg-teal-700 px-5 py-3.5 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-500 dark:text-stone-950 dark:hover:bg-teal-400"
            >
              PROCEED TO CHECKOUT
            </button>

            {checkoutDisabledReason ? (
              <p className="text-center text-xs leading-6 text-stone-500 dark:text-stone-400">
                {checkoutDisabledReason}
              </p>
            ) : null}

            <button
              type="button"
              onClick={onClearCart}
              disabled={!hasItems}
              className="w-full rounded-full text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 transition hover:text-stone-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-stone-500 dark:hover:text-stone-300"
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
