"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  if (pathname === "/cart") {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="fixed right-5 top-5 z-40 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/95 px-4 py-3 text-sm font-semibold text-stone-950 shadow-[0_24px_60px_-36px_rgba(28,25,23,0.55)] backdrop-blur transition hover:-translate-y-0.5 dark:border-stone-700 dark:bg-stone-950/95 dark:text-white"
    >
      <span>Cart</span>
      <span className="inline-flex min-w-7 justify-center rounded-full bg-teal-700 px-2 py-1 text-xs text-white">
        {itemCount}
      </span>
    </Link>
  );
}
