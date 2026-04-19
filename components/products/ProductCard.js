import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  buildMeta,
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";

export default function ProductCard({ product }) {
  const meta = buildMeta(product);
  const primaryImage = getPrimaryImage(product);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,118,110,0.28)] transition-transform duration-300 hover:-translate-y-1 dark:border-stone-800 dark:bg-stone-950">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-950"
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.38),_transparent_48%),linear-gradient(135deg,_#134e4a_0%,_#0c0a09_52%,_#1c1917_100%)] dark:border-stone-800">
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.05)_0%,rgba(12,10,9,0.2)_35%,rgba(12,10,9,0.88)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-6 py-6 text-stone-50">
            <p className="relative text-xs uppercase tracking-[0.35em] text-teal-200">
              {product.gender ?? "Signature scent"}
            </p>
            <h2 className="relative mt-3 text-2xl font-semibold tracking-tight">
              {product.name}
            </h2>
            <p className="relative mt-4 max-w-xs text-sm leading-6 text-stone-200">
              {product.short_description ??
                "A refined fragrance built for daily wear and special evenings."}
            </p>
          </div>
        </div>
      </Link>

      <div className="space-y-5 px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {meta.length > 0 ? (
            meta.map((item) => (
              <span
                key={item}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium tracking-wide text-stone-700 dark:bg-stone-900 dark:text-stone-200"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium tracking-wide text-stone-700 dark:bg-stone-900 dark:text-stone-200">
              Eau de parfum
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-stone-100 pt-5 dark:border-stone-800">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">
              Price
            </p>
            <div className="mt-2 flex items-center gap-3">
              <p className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
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
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">
              Stock
            </p>
            <p className="mt-2 text-sm font-medium text-stone-700 dark:text-stone-200">
              {product.stock_quantity > 0
                ? `${product.stock_quantity} available`
                : "Out of stock"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-5 dark:border-stone-800">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm font-medium text-stone-600 transition hover:text-stone-950 dark:text-stone-300 dark:hover:text-white"
          >
            View details
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
