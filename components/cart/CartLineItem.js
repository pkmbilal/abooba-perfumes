"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/components/products/product-utils";
import { useCart } from "./CartProvider";

export default function CartLineItem({ item, eagerImage = false }) {
  const { removeItem, updateQuantity } = useCart();
  const lineSubtotal = item.price * item.quantity;

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_16px_45px_-30px_rgba(15,118,110,0.22)] backdrop-blur transition duration-300 sm:p-4 dark:border-stone-800 dark:bg-stone-900/85">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.10),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.08),_transparent_46%)]" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
        <div className="relative mx-auto h-24 w-full max-w-[120px] shrink-0 overflow-hidden rounded-[1.1rem] bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_48%),linear-gradient(180deg,_#fafaf9_0%,_#f1f5f9_100%)] sm:mx-0 sm:h-24 sm:max-w-[96px] sm:w-24 lg:h-28 lg:w-28 dark:bg-stone-800">
          {item.image ? (
            <Image
              src={item.image.image_url}
              alt={item.image.alt_text}
              fill
              loading={eagerImage ? "eager" : "lazy"}
              sizes="(max-width: 640px) 120px, (max-width: 1024px) 96px, 112px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="line-clamp-2 text-base font-semibold tracking-tight text-stone-950 transition hover:text-teal-700 sm:text-lg lg:text-[1.05rem] dark:text-white dark:hover:text-teal-300"
              >
                {item.name}
              </Link>

              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                {item.volumeMl
                  ? `Perfume · ${item.volumeMl}ml`
                  : "Signature perfume bottle"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-stone-200 bg-white/80 text-stone-400 transition hover:border-stone-300 hover:text-stone-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-500 dark:hover:text-white"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M9 3h6" />
                <path d="M4 7h16" />
                <path d="M7 7l1 13h8l1-13" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid gap-3 rounded-[1rem] bg-stone-50/90 p-3 sm:grid-cols-3 sm:items-center dark:bg-stone-950/70">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Unit Price
              </p>
              <p className="mt-1.5 text-lg font-semibold tracking-tight text-stone-950 sm:text-xl dark:text-white">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex w-fit items-center rounded-full border border-stone-200 bg-stone-100/90 p-1 dark:border-stone-800 dark:bg-stone-950">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-stone-700 transition hover:bg-white dark:text-stone-200 dark:hover:bg-stone-800"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  -
                </button>

                <span className="min-w-[2.5rem] text-center text-sm font-semibold text-teal-700 dark:text-teal-300">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-stone-700 transition hover:bg-white dark:text-stone-200 dark:hover:bg-stone-800"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Subtotal
              </p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-teal-700 sm:text-2xl dark:text-teal-300">
                {formatPrice(lineSubtotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
