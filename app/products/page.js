import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ProductCard from "@/components/products/ProductCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProductsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: products, error }, { data: favorites }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "*, product_images(image_url, alt_text, is_primary, sort_order)",
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    user
      ? supabase
          .from("favorites")
          .select("product_id")
          .eq("user_id", user.id)
      : Promise.resolve({ data: [] }),
  ]);

  if (error) {
    return <div>Failed to load products: {error.message}</div>;
  }

  const favoriteProductIds = new Set(
    (favorites ?? []).map((favorite) => favorite.product_id),
  );
  const productsWithFavoriteState =
    products?.map((product) => ({
      ...product,
      is_favorite: favoriteProductIds.has(product.id),
    })) ?? [];

  return (
    <>
    <Header />
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_32%),linear-gradient(180deg,_#f2fbf9_0%,_#f5f5f4_100%)] px-6 pb-24 pt-32 dark:bg-[linear-gradient(180deg,_#0c0a09_0%,_#111827_100%)]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-700 dark:text-teal-300">
            Abooba Perfumes
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 dark:text-white">
            Products
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
            Explore the current fragrance lineup pulled directly from your
            Supabase products table.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsWithFavoriteState.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
