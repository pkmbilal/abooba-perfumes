"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/components/products/product-utils";
import { useCart } from "./CartProvider";

function CartLineItem({ item }) {
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

function EmptyCartState() {
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

export default function CartPageClient() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const deliveryFee = 0;
  const totalAmount = subtotal + deliveryFee;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_24%),linear-gradient(180deg,_#f8fbfb_0%,_#f5f7f7_52%,_#f7faf9_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 dark:bg-[linear-gradient(180deg,_#0c0a09_0%,_#111827_100%)]">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <div className="space-y-5">
            {items.length > 0 ? (
              items.map((item) => <CartLineItem key={item.id} item={item} />)
            ) : (
              <EmptyCartState />
            )}
          </div>

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
                    disabled={items.length === 0}
                    className="w-full rounded-full bg-teal-700 px-5 py-3.5 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-500 dark:text-stone-950 dark:hover:bg-teal-400"
                  >
                    PROCEED TO CHECKOUT
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={items.length === 0}
                    className="w-full rounded-full text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 transition hover:text-stone-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-stone-500 dark:hover:text-stone-300"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}