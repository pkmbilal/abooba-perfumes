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
    <div className="theme-chip rounded-[1.5rem] border p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.3em] text-[#7a5525] dark:text-[#d8bb82]">
        {label}
      </p>
      <p className="theme-muted mt-3 text-base leading-7">
        {value}
      </p>
    </div>
  );
}

export async function generateMetadata(props) {
  const { slug } = await props.params;
  try {
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
  } catch {
    return {
      title: "Product | Abooba Perfumes",
      description: "Discover fragrance details from the Abooba Perfumes collection.",
    };
  }
}

export default async function ProductDetailsPage(props) {
  const { slug } = await props.params;
  let product = null;

  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        "*, product_images(image_url, alt_text, is_primary, sort_order)",
      )
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (!error) {
      product = data;
    }
  } catch {
    product = null;
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
      className={`${poppins.className} theme-page min-h-screen px-6 pb-16 pt-28 sm:pt-32`}
    >
      <section className="mx-auto max-w-7xl">
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="theme-panel h-full overflow-hidden rounded-[2rem] border p-4 backdrop-blur">
            <div className="theme-image-bg relative aspect-[4/5] overflow-hidden rounded-[1.5rem] lg:h-full lg:aspect-auto">
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
                <h1 className={`${montserrat.className} mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl`}>
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
            <div className="theme-panel rounded-[2rem] border p-7 backdrop-blur">
              <div className="flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span
                    key={item}
                    className="theme-chip rounded-full border px-3 py-1 text-xs font-medium tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-end gap-4">
                <p className="theme-heading text-4xl font-semibold tracking-tight">
                  {formatPrice(product.price)}
                </p>
                {product.compare_at_price ? (
                  <p className="pb-1 text-lg text-stone-400 line-through">
                    {formatPrice(product.compare_at_price)}
                  </p>
                ) : null}
              </div>

              <div className="theme-muted mt-6 flex flex-wrap gap-4 text-sm">
                <p>
                  Status:{" "}
                  <span className="theme-heading font-medium">
                    {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
                  </span>
                </p>
                <p>
                  SKU:{" "}
                  <span className="theme-heading font-medium">
                    {product.sku ?? "Not assigned"}
                  </span>
                </p>
                <p>
                  Gender:{" "}
                  <span className="theme-heading font-medium capitalize">
                    {product.gender ?? "Unisex"}
                  </span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="min-w-[12rem]">
                  <AddToCartButton
                    product={product}
                    tone="luxury"
                    className="w-full px-7"
                  />
                </div>
              </div>

              <p className="theme-muted mt-8 text-base leading-8">
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
