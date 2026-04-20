import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  buildMeta,
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import Header from "@/components/common/Header";

function splitNotes(notes) {
  if (!notes) {
    return [];
  }

  return notes
    .split(",")
    .map((note) => note.trim())
    .filter(Boolean);
}

function DetailSection({ label, value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 backdrop-blur dark:border-stone-800 dark:bg-stone-900/70">
      <p className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
        {label}
      </p>
      <p className="mt-3 text-base leading-7 text-stone-700 dark:text-stone-200">
        {value}
      </p>
    </div>
  );
}

export async function generateMetadata(props) {
  const { slug } = await props.params;
  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, short_description")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.name} | Abooba Perfumes`,
    description:
      product.short_description ??
      "Discover fragrance details from the Abooba Perfumes collection.",
  };
}

export default async function ProductDetailsPage(props) {
  const { slug } = await props.params;
  const supabase = await createSupabaseServerClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "*, product_images(image_url, alt_text, is_primary, sort_order)",
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    return <div>Failed to load product: {error.message}</div>;
  }

  if (!product) {
    notFound();
  }

  const primaryImage = getPrimaryImage(product);
  const meta = buildMeta(product);
  const topNotes = splitNotes(product.top_notes);
  const middleNotes = splitNotes(product.middle_notes);
  const baseNotes = splitNotes(product.base_notes);

  return (
    <>
    <Header />
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_22%),linear-gradient(180deg,_#f2fbf9_0%,_#f5f5f4_52%,_#fafaf9_100%)] px-6 py-14 dark:bg-[linear-gradient(180deg,_#0c0a09_0%,_#111827_100%)]">
      <section className="mx-auto max-w-6xl">
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_90px_-36px_rgba(15,118,110,0.28)] dark:border-stone-800 dark:bg-stone-950">
            <div className="relative aspect-[4/5] bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.38),_transparent_42%),linear-gradient(135deg,_#134e4a_0%,_#0c0a09_60%,_#1c1917_100%)]">
              {primaryImage ? (
                <Image
                  src={primaryImage.image_url}
                  alt={primaryImage.alt_text ?? product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.04)_0%,rgba(12,10,9,0.16)_35%,rgba(12,10,9,0.72)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-stone-50">
                <p className="text-sm uppercase tracking-[0.38em] text-teal-200">
                  {product.brand ?? "Abooba Perfumes"}
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-stone-200">
                  {product.short_description ??
                    "An elegant signature fragrance from the Abooba collection."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white/85 p-7 shadow-[0_24px_90px_-42px_rgba(15,118,110,0.28)] backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
              <div className="flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium tracking-wide text-stone-700 dark:bg-stone-900 dark:text-stone-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-4">
                <p className="text-4xl font-semibold tracking-tight text-stone-950 dark:text-white">
                  {formatPrice(product.price)}
                </p>
                {product.compare_at_price ? (
                  <p className="pb-1 text-lg text-stone-400 line-through">
                    {formatPrice(product.compare_at_price)}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-600 dark:text-stone-300">
                <p>
                  Status:{" "}
                  <span className="font-medium text-stone-900 dark:text-white">
                    {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
                  </span>
                </p>
                <p>
                  SKU:{" "}
                  <span className="font-medium text-stone-900 dark:text-white">
                    {product.sku ?? "Not assigned"}
                  </span>
                </p>
                <p>
                  Gender:{" "}
                  <span className="font-medium capitalize text-stone-900 dark:text-white">
                    {product.gender ?? "Unisex"}
                  </span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AddToCartButton
                  product={product}
                  className="min-w-[12rem] px-7"
                />
                <p className="text-sm leading-6 text-stone-500 dark:text-stone-400">
                  Cart items are saved in this browser so shoppers can keep
                  browsing and return anytime.
                </p>
              </div>

              <p className="mt-8 text-base leading-8 text-stone-700 dark:text-stone-200">
                {product.description ??
                  "This fragrance balances a luminous opening with a deeper heart and smooth, long-lasting base."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DetailSection
                label="Top Notes"
                value={topNotes.length > 0 ? topNotes.join(" • ") : null}
              />
              <DetailSection
                label="Middle Notes"
                value={middleNotes.length > 0 ? middleNotes.join(" • ") : null}
              />
              <DetailSection
                label="Base Notes"
                value={baseNotes.length > 0 ? baseNotes.join(" • ") : null}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
