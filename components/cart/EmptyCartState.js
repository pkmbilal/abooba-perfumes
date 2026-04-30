"use client";

import Link from "next/link";

export default function EmptyCartState() {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-white/20 bg-white/6 p-8 text-center shadow-[0_24px_80px_-55px_rgba(0,0,0,0.85)] backdrop-blur">
      <p className="text-xl font-semibold text-white sm:text-2xl">
        Your cart is empty
      </p>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Add a fragrance from the collection to start building your order.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-6 py-3 text-sm font-semibold tracking-[0.16em] text-[#0f1720] transition hover:brightness-105"
      >
        Browse products
      </Link>
    </div>
  );
}
