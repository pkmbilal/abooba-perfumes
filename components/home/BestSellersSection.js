import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";
import { montserrat } from "./home-fonts";
import SectionHeading from "./SectionHeading";

function buildProductNote(product) {
  return (
    product.top_notes ||
    product.middle_notes ||
    product.base_notes ||
    product.fragrance_family ||
    product.gender ||
    "Signature scent"
  );
}

export default function BestSellersSection({ products = [] }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,73,66,0.18),_transparent_26%),linear-gradient(180deg,_rgba(8,17,25,0)_0%,_rgba(7,18,27,0.7)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Best Sellers"
          title="Popular fragrances chosen for presence, character, and effortless sophistication"
          description="Our most-loved perfumes balance refined notes, modern luxury, and elegant presentation for gifting or personal signature wear."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const primaryImage = getPrimaryImage(product);
            const productHref = `/products/${product.slug}`;

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d8bb82]/35"
              >
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,19,29,0.08)_0%,rgba(7,19,29,0.12)_35%,rgba(7,19,29,0.55)_100%)]" />
                  {primaryImage ? (
                    <Image
                      src={primaryImage.image_url}
                      alt={primaryImage.alt_text ?? product.name}
                      width={700}
                      height={900}
                      className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.22),_transparent_45%),linear-gradient(135deg,_#11313b_0%,_#07131d_65%,_#0f1720_100%)] px-8 text-center text-sm font-medium uppercase tracking-[0.24em] text-[#d8bb82]">
                      No image
                    </div>
                  )}
                </div>

                <div className="px-2 pb-2 pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d8bb82]">
                    {buildProductNote(product)}
                  </p>
                  <h3
                    className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-white`}
                  >
                    {product.name}
                  </h3>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
                        Price
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={productHref}
                        className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        View
                      </Link>
                      <Link
                        href={productHref}
                        className="rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-4 py-2 text-sm font-semibold text-[#0f1720] transition hover:brightness-105"
                      >
                        Add
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {products.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-sm leading-6 text-slate-300 md:col-span-2 xl:col-span-4">
              Best seller products will appear here when active products are
              available in the catalog.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
