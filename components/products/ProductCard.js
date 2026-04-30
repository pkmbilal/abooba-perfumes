import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { montserrat } from "@/components/home/home-fonts";
import FavoriteButton from "@/components/products/FavoriteButton";
import {
  buildMeta,
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";

export default function ProductCard({ product }) {
  const meta = buildMeta(product);
  const primaryImage = getPrimaryImage(product);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d8bb82]/35">
      <div className="relative">
        <FavoriteButton
          productId={product.id}
          initialIsFavorite={Boolean(product.is_favorite)}
        />
        <Link
          href={`/products/${product.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bb82] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131d]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.2),_transparent_44%),linear-gradient(135deg,_#11313b_0%,_#07131d_65%,_#0f1720_100%)]">
          {primaryImage ? (
            <Image
              src={primaryImage.image_url}
              alt={primaryImage.alt_text ?? product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_35%,transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,29,0.08)_0%,rgba(7,19,29,0.18)_35%,rgba(7,19,29,0.78)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 py-6 text-stone-50">
            <p className="relative text-xs uppercase tracking-[0.35em] text-[#d8bb82]">
              {product.gender ?? "Signature scent"}
            </p>
            <h2
              className={`${montserrat.className} relative mt-3 text-2xl font-semibold tracking-tight`}
            >
              {product.name}
            </h2>
            <p className="relative mt-4 max-w-xs text-sm leading-6 text-stone-200">
              {product.short_description ??
                "A refined fragrance built for daily wear and special evenings."}
            </p>
          </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-2 pb-2 pt-6">
        <div className="flex flex-wrap gap-2">
          {meta.length > 0 ? (
            meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium tracking-wide text-slate-200"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
              Eau de parfum
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Price
            </p>
            <div className="mt-2 flex items-center gap-3">
              <p className="text-2xl font-semibold tracking-tight text-white">
                {formatPrice(product.price)}
              </p>
              {product.compare_at_price ? (
                <p className="text-sm text-stone-400 line-through">
                  {formatPrice(product.compare_at_price)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Stock
            </p>
            <p className="mt-2 text-sm font-medium text-slate-200">
              {product.stock_quantity > 0
                ? `${product.stock_quantity} available`
                : "Out of stock"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-slate-300 transition hover:text-[#e3c995]"
          >
            View details
          </Link>
          <AddToCartButton product={product} tone="luxury" />
        </div>
      </div>
    </article>
  );
}
