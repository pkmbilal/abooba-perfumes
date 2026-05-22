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
  let products = [];
  let favorites = [];

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [
      { data: productData, error },
      { data: favoriteData },
    ] = await Promise.all([
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

    if (!error) {
      products = productData ?? [];
      favorites = favoriteData ?? [];
    }
  } catch {
    products = [];
    favorites = [];
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
        className={`${poppins.className} theme-page min-h-screen overflow-hidden`}
      >
        <section className="relative px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.12),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top,_rgba(8,73,66,0.18),_transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="theme-border mb-10 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#997240]">
                  Current Collection
                </p>
                <h2
                  className={`${montserrat.className} theme-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl`}
                >
                  Available perfumes
                </h2>
              </div>
              <p className="theme-muted text-sm leading-6 sm:max-w-sm sm:text-right">
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
              <div className="theme-panel rounded-[2rem] border px-6 py-10 text-sm leading-7 theme-muted backdrop-blur">
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
