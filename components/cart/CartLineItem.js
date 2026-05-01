"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/components/products/product-utils";
import { useCart } from "./CartProvider";

export default function CartLineItem({ item, eagerImage = false }) {
  const { removeItem, updateQuantity } = useCart();
  const lineSubtotal = item.price * item.quantity;

  return (
    <article className="theme-panel group relative overflow-hidden rounded-[1.5rem] border p-4 backdrop-blur transition duration-300 sm:p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top_left,_rgba(216,187,130,0.12),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(12,109,96,0.14),_transparent_46%)]" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
        <div className="theme-image-bg relative mx-auto h-24 w-full max-w-[120px] shrink-0 overflow-hidden rounded-[1.1rem] sm:mx-0 sm:h-24 sm:max-w-[96px] sm:w-24 lg:h-28 lg:w-28">
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
          <div className="flex flex-col gap-3 pr-10 sm:flex-row sm:items-start sm:justify-between sm:pr-0">
            <div className="min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="theme-heading line-clamp-2 text-base font-semibold tracking-tight transition hover:text-[#e3c995] sm:text-lg lg:text-[1.05rem]"
              >
                {item.name}
              </Link>

              <p className="theme-muted mt-1 text-xs">
                {item.volumeMl
                  ? `Perfume · ${item.volumeMl}ml`
                  : "Signature perfume bottle"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="absolute right-0 top-0 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7a5525]/25 bg-[#7a5525]/10 text-[#7a5525] shadow-[0_10px_24px_-18px_rgba(122,85,37,0.85)] transition hover:border-[#7a5525]/40 hover:bg-[#7a5525]/15 hover:text-[#17130c] dark:border-white/10 dark:bg-white/8 dark:text-slate-400 dark:hover:border-[#d8bb82]/35 dark:hover:text-white sm:static sm:self-start"
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

          <div className="theme-chip mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-[1rem] border p-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Unit Price
              </p>
              <p className="theme-heading mt-1.5 text-base font-semibold tracking-tight sm:text-xl">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex w-fit items-center rounded-full border border-[#7a5525]/20 bg-[#7a5525]/8 p-1 dark:border-white/10 dark:bg-white/8">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-[#7a5525] transition hover:bg-[#7a5525]/10 dark:text-[#e3c995] dark:hover:bg-white/10 sm:h-9 sm:w-9"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  -
                </button>

                <span className="min-w-6 text-center text-sm font-semibold text-[#7a5525] dark:text-[#e3c995] sm:min-w-[2.5rem]">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-[#7a5525] transition hover:bg-[#7a5525]/10 dark:text-[#e3c995] dark:hover:bg-white/10 sm:h-9 sm:w-9"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Subtotal
              </p>
              <p className="mt-1.5 text-base font-semibold tracking-tight text-[#7a5525] dark:text-[#e3c995] sm:text-2xl">
                {formatPrice(lineSubtotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
