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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full border border-white/10 bg-white/8 text-slate-400 transition hover:border-[#d8bb82]/35 hover:text-white"
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

          <div className="theme-chip mt-4 grid gap-3 rounded-[1rem] border p-3 sm:grid-cols-3 sm:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Unit Price
              </p>
              <p className="theme-heading mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/8 p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-slate-200 transition hover:bg-white/10"
                  aria-label={`Decrease quantity for ${item.name}`}
                >
                  -
                </button>

                <span className="min-w-[2.5rem] text-center text-sm font-semibold text-[#e3c995]">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-slate-200 transition hover:bg-white/10"
                  aria-label={`Increase quantity for ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Subtotal
              </p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-[#e3c995] sm:text-2xl">
                {formatPrice(lineSubtotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
