import Image from "next/image";
import Link from "next/link";
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader";
import { HeartOff } from "lucide-react";
import {
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";

function EmptyState() {
  return (
    <div className="theme-panel rounded-[1.75rem] border border-dashed px-6 py-12 text-center">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#d8bb82] text-[#0f1720] shadow-sm">
        <HeartOff size={22} />
      </div>
      <h3 className="theme-heading mt-5 font-[family:var(--font-dashboard-heading)] text-xl font-semibold">
        No favorites saved yet
      </h3>
      <p className="theme-muted mx-auto mt-3 max-w-md text-sm leading-7">
        When you save fragrances you love, they will appear here for quicker
        browsing and buying later.
      </p>
    </div>
  );
}

export default function FavoritesTab({
  favorites,
  errorMessage,
  removeFavoriteAction,
}) {
  return (
    <section className="theme-panel rounded-[1.75rem] border p-6 sm:p-8">
      <DashboardSectionHeader
        eyebrow="Favorites"
        title="Your saved fragrances"
        description="Keep track of the scents you are considering and jump back into product details whenever you are ready."
      />

      {errorMessage ? (
        <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We could not load your favorites right now. Please try again in a
          moment.
        </div>
      ) : null}

      <div className="mt-6">
        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {favorites.map(({ id, product }) => {
              const image = getPrimaryImage(product);

              return (
                <article
                  key={id}
                  className="theme-chip overflow-hidden rounded-[1.6rem] border transition hover:border-[#d8bb82]/30"
                >
                  <div className="relative aspect-[4/3] border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.3),_transparent_45%),linear-gradient(135deg,_#134e4a_0%,_#0f172a_100%)]">
                    {image ? (
                      <Image
                        src={image.image_url}
                        alt={image.alt_text ?? product.name}
                        fill
                        sizes="(min-width: 1536px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.02)_0%,rgba(12,10,9,0.16)_35%,rgba(12,10,9,0.56)_100%)]" />
                  </div>

                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <h3 className="theme-heading text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-base font-semibold text-[#e3c995]">
                        {formatPrice(product.price)}
                      </p>
                      <p className="theme-muted mt-3 line-clamp-3 text-sm leading-6">
                        {product.short_description ||
                          "A refined fragrance from the Abooba Perfumes collection."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-4 py-2 text-sm font-semibold text-[#0f1720] transition hover:brightness-105"
                      >
                        View Product
                      </Link>

                      <form action={removeFavoriteAction}>
                        <input type="hidden" name="productId" value={id} />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-rose-300/40 hover:bg-rose-400/10"
                        >
                          Remove from Favorites
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
