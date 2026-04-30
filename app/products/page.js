import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { montserrat, poppins } from "@/components/home/home-fonts";
import ProductCard from "@/components/products/ProductCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Shop Perfumes | Abooba Perfumes",
  description:
    "Shop premium perfumes, signature scents, and elegant fragrance gifts from Abooba Perfumes.",
};

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
      <main
        className={`${poppins.className} min-h-screen overflow-hidden bg-[#06131d] text-white`}
      >
        <section className="relative px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,73,66,0.18),_transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#997240]">
                  Current Collection
                </p>
                <h2
                  className={`${montserrat.className} mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl`}
                >
                  Available perfumes
                </h2>
              </div>
              <p className="text-sm leading-6 text-slate-400 sm:max-w-sm sm:text-right">
                {productsWithFavoriteState.length} fragrance
                {productsWithFavoriteState.length === 1 ? "" : "s"} ready to
                browse.
              </p>
            </div>

            {productsWithFavoriteState.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productsWithFavoriteState.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 text-sm leading-7 text-slate-300 backdrop-blur">
                Products will appear here when active fragrances are available
                in the catalog.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
