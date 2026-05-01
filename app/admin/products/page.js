import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductEditorModal from "@/components/admin/ProductEditorModal";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { montserrat, poppins } from "@/components/home/home-fonts";
import { formatPrice, getPrimaryImage } from "@/components/products/product-utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEFAULT_USER_DASHBOARD_PATH, isAdminUser } from "@/lib/auth/user-role";
import { deleteProductAction, saveProductAction } from "@/app/admin/products/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Products | Abooba Perfumes",
  description: "Manage product listings, stock, pricing, and product imagery.",
};

function formatDate(value) {
  if (!value) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function StatusBadge({ children, tone = "default" }) {
  const toneClassName =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "warning"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-stone-100 text-stone-700 border-stone-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${toneClassName}`}
    >
      {children}
    </span>
  );
}

export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUser(user)) {
    redirect(DEFAULT_USER_DASHBOARD_PATH);
  }

  const { data: products, error } = await supabase
    .from("products")
    .select(
      "*, product_images(id, image_url, alt_text, is_primary, sort_order, created_at)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <>
        <Header />
      <main
        className={`${poppins.className} theme-page min-h-[calc(100vh-10rem)] px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8`}
      >
        <section className="mx-auto max-w-6xl rounded-[2rem] border border-rose-300/30 bg-white/6 p-6 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
            <p className="text-sm font-semibold text-rose-700">
              We could not load the admin product dashboard: {error.message}
            </p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        className={`${poppins.className} theme-page min-h-[calc(100vh-10rem)] px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8`}
      >
        <section className="mx-auto max-w-7xl">
          <div className="theme-panel rounded-[2rem] border p-5 backdrop-blur sm:p-8">
            <div className="theme-border flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#d8bb82]">
                  Admin dashboard
                </p>
                <h1
                  className={`${montserrat.className} theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl`}
                >
                  Product management
                </h1>
                <p className="theme-muted mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                  Add, edit, publish, and remove products from your fragrance
                  catalog without leaving the app.
                </p>
              </div>

              <ProductEditorModal saveProductAction={saveProductAction} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="theme-chip rounded-[1.6rem] border p-5">
                <p className="theme-muted text-xs font-semibold uppercase tracking-[0.28em]">
                  Total products
                </p>
                <p className="theme-heading mt-3 text-3xl font-semibold tracking-tight">
                  {products?.length ?? 0}
                </p>
              </div>

              <div className="theme-chip rounded-[1.6rem] border p-5">
                <p className="theme-muted text-xs font-semibold uppercase tracking-[0.28em]">
                  Active listings
                </p>
                <p className="theme-heading mt-3 text-3xl font-semibold tracking-tight">
                  {products?.filter((product) => product.is_active).length ?? 0}
                </p>
              </div>

              <div className="theme-chip rounded-[1.6rem] border p-5">
                <p className="theme-muted text-xs font-semibold uppercase tracking-[0.28em]">
                  Featured products
                </p>
                <p className="theme-heading mt-3 text-3xl font-semibold tracking-tight">
                  {products?.filter((product) => product.is_featured).length ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {products?.length ? (
                products.map((product) => {
                  const primaryImage = getPrimaryImage(product);

                  return (
                    <article
                      key={product.id}
                      className="theme-chip grid gap-5 rounded-[1.75rem] border p-5 lg:grid-cols-[180px_minmax(0,1fr)]"
                    >
                      <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.28),_transparent_46%),linear-gradient(135deg,_#134e4a_0%,_#0c0a09_60%,_#1c1917_100%)]">
                        <div className="relative aspect-[4/5]">
                          {primaryImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={primaryImage.image_url}
                              alt={primaryImage.alt_text ?? product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center px-6 text-center text-sm leading-6 text-stone-200">
                              No primary image
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <StatusBadge tone={product.is_active ? "success" : "warning"}>
                                {product.is_active ? "Active" : "Hidden"}
                              </StatusBadge>
                              {product.is_featured ? (
                                <StatusBadge>Featured</StatusBadge>
                              ) : null}
                              {product.stock_quantity > 0 ? (
                                <StatusBadge>{product.stock_quantity} in stock</StatusBadge>
                              ) : (
                                <StatusBadge tone="warning">Out of stock</StatusBadge>
                              )}
                            </div>

                            <h2 className="theme-heading mt-4 text-2xl font-semibold tracking-tight">
                              {product.name}
                            </h2>
                            <p className="theme-muted mt-2 text-sm leading-7">
                              {product.short_description ||
                                "No short description added yet."}
                            </p>

                            <div className="theme-muted mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                              <p>
                                <span className="font-semibold text-white">Slug:</span>{" "}
                                {product.slug}
                              </p>
                              <p>
                                <span className="font-semibold text-white">Price:</span>{" "}
                                {formatPrice(product.price)}
                              </p>
                              <p>
                                <span className="font-semibold text-white">Brand:</span>{" "}
                                {product.brand || "Not set"}
                              </p>
                              <p>
                                <span className="font-semibold text-white">Updated:</span>{" "}
                                {formatDate(product.updated_at)}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <ProductEditorModal
                              product={product}
                              saveProductAction={saveProductAction}
                            />
                            <form action={deleteProductAction}>
                              <input type="hidden" name="productId" value={product.id} />
                              <input type="hidden" name="slug" value={product.slug} />
                              <DeleteProductButton />
                            </form>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="theme-panel rounded-[1.75rem] border border-dashed px-6 py-10 text-center">
                  <p className="theme-heading text-lg font-semibold">
                    No products yet
                  </p>
                  <p className="theme-muted mt-3 text-sm leading-7">
                    Start by adding your first fragrance to the admin catalog.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <ProductEditorModal saveProductAction={saveProductAction} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
