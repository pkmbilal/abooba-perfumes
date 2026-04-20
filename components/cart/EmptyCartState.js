"use client";

import Link from "next/link";

export default function EmptyCartState() {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-white/80 p-8 text-center shadow-[0_20px_60px_-45px_rgba(15,118,110,0.25)] dark:border-stone-700 dark:bg-stone-900/60">
      <p className="text-xl font-semibold text-stone-950 sm:text-2xl dark:text-white">
        Your cart is empty
      </p>
      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
        Add a fragrance from the collection to start building your order.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-teal-800 dark:bg-teal-500 dark:text-stone-950 dark:hover:bg-teal-400"
      >
        Browse products
      </Link>
    </div>
  );
}
