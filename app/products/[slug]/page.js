import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { montserrat, poppins } from "@/components/home/home-fonts";
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
    <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d8bb82]">
        {label}
      </p>
      <p className="mt-3 text-base leading-7 text-slate-200">
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
    <main
      className={`${poppins.className} min-h-screen bg-[radial-gradient(circle_at_18%_12%,rgba(12,109,96,0.24),transparent_32%),radial-gradient(circle_at_88%_4%,rgba(216,187,130,0.14),transparent_28%),linear-gradient(180deg,#07131d_0%,#06131d_64%,#081119_100%)] px-6 pb-16 pt-28 text-white sm:pt-32`}
    >
      <section className="mx-auto max-w-7xl">
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.2),_transparent_44%),linear-gradient(135deg,_#11313b_0%,_#07131d_65%,_#0f1720_100%)]">
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
                <p className="text-sm uppercase tracking-[0.38em] text-[#d8bb82]">
                  {product.brand ?? "Abooba Perfumes"}
                </p>
                <h1 className={`${montserrat.className} mt-4 text-4xl font-semibold tracking-tight sm:text-5xl`}>
                  {product.name}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-stone-200">
                  {product.short_description ??
                    "An elegant signature fragrance from the Abooba collection."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-[0_28px_100px_-64px_rgba(0,0,0,0.85)] backdrop-blur">
              <div className="flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium tracking-wide text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-4">
                <p className="text-4xl font-semibold tracking-tight text-white">
                  {formatPrice(product.price)}
                </p>
                {product.compare_at_price ? (
                  <p className="pb-1 text-lg text-stone-400 line-through">
                    {formatPrice(product.compare_at_price)}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                <p>
                  Status:{" "}
                  <span className="font-medium text-white">
                    {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
                  </span>
                </p>
                <p>
                  SKU:{" "}
                  <span className="font-medium text-white">
                    {product.sku ?? "Not assigned"}
                  </span>
                </p>
                <p>
                  Gender:{" "}
                  <span className="font-medium capitalize text-white">
                    {product.gender ?? "Unisex"}
                  </span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AddToCartButton
                  product={product}
                  tone="luxury"
                  className="min-w-[12rem] px-7"
                />
                <p className="text-sm leading-6 text-slate-400">
                  Cart items are saved in this browser so shoppers can keep
                  browsing and return anytime.
                </p>
              </div>

              <p className="mt-8 text-base leading-8 text-slate-200">
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
