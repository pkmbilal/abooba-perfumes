"use client";

import Link from "next/link";

export default function EmptyCartState() {
  return (
    <div className="theme-panel rounded-[1.5rem] border border-dashed p-8 text-center backdrop-blur">
      <p className="theme-heading text-xl font-semibold sm:text-2xl">
        Your cart is empty
      </p>
      <p className="theme-muted mt-3 text-sm leading-7">
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
