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
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  LayoutDashboard,
  Package,
  PackagePlus,
  ShieldCheck,
  Sparkles,
  Store,
  TriangleAlert,
} from "lucide-react";

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
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-200"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-amber-500/10 dark:text-amber-200"
        : "border-stone-200 bg-stone-100 text-stone-700 dark:border-white/10 dark:bg-white/8 dark:text-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${toneClassName}`}
    >
      {children}
    </span>
  );
}

function AdminNavLink({ href, icon: Icon, label, description, isActive = false }) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group flex items-center gap-3 rounded-[1.25rem] border px-3 py-3 text-sm transition",
        isActive
          ? "border-[#d8bb82]/35 bg-[#d8bb82]/14 text-[#7a5525] shadow-[0_18px_46px_-32px_rgba(122,85,37,0.55)] dark:text-[#e3c995]"
          : "theme-chip hover:border-[#d8bb82]/30 hover:text-[#7a5525] dark:hover:text-white",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition",
          isActive
            ? "bg-[#7a5525] text-white dark:bg-[#e3c995] dark:text-[#0f1720]"
            : "bg-white/70 text-[#7a5525] group-hover:bg-[#d8bb82]/18 dark:bg-white/8 dark:text-[#e3c995]",
        ].join(" ")}
      >
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{label}</span>
        <span className="theme-muted mt-0.5 block truncate text-xs">
          {description}
        </span>
      </span>
    </Link>
  );
}

function AdminStatCard({ title, value, description, icon: Icon, tone = "default" }) {
  const iconClassName =
    tone === "warning"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/12 dark:text-amber-200"
      : tone === "success"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-200"
        : "bg-[#d8bb82]/18 text-[#7a5525] dark:bg-[#d8bb82]/12 dark:text-[#e3c995]";

  return (
    <div className="theme-panel relative overflow-hidden rounded-[1.4rem] border p-5 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(circle_at_top_right,_rgba(216,187,130,0.14),_transparent_54%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="theme-muted text-xs font-semibold uppercase tracking-[0.24em]">
            {title}
          </p>
          <p className="theme-heading mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
          <p className="theme-muted mt-2 text-sm leading-6">{description}</p>
        </div>
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
          <Icon size={19} />
        </span>
      </div>
    </div>
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

  const productList = products ?? [];
  const totalProducts = productList.length;
  const activeProducts = productList.filter((product) => product.is_active).length;
  const featuredProducts = productList.filter((product) => product.is_featured).length;
  const outOfStockProducts = productList.filter(
    (product) => Number(product.stock_quantity ?? 0) <= 0,
  ).length;

  return (
    <>
      <Header />
      <main
        className={`${poppins.className} theme-page min-h-[calc(100vh-10rem)] px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8`}
      >
        <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="theme-panel h-fit rounded-[1.75rem] border p-4 backdrop-blur lg:sticky lg:top-28">
            <div className="flex items-center gap-3 px-2 py-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7a5525] text-white dark:bg-[#e3c995] dark:text-[#0f1720]">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="theme-heading text-sm font-semibold">
                  Abooba Admin
                </p>
                <p className="theme-muted text-xs">Catalog control center</p>
              </div>
            </div>

            <div className="theme-border mt-4 border-t pt-4">
              <p className="theme-muted px-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.28em]">
                Workspace
              </p>
              <nav className="grid gap-2">
                <AdminNavLink
                  href="/admin/products"
                  icon={LayoutDashboard}
                  label="Products"
                  description="Manage catalog"
                  isActive
                />
                <AdminNavLink
                  href="/products"
                  icon={Store}
                  label="Storefront"
                  description="View customer shop"
                />
                <AdminNavLink
                  href={DEFAULT_USER_DASHBOARD_PATH}
                  icon={Package}
                  label="User dashboard"
                  description="Account area"
                />
              </nav>
            </div>

            <div className="theme-chip mt-5 rounded-[1.25rem] border p-4">
              <p className="theme-heading text-sm font-semibold">
                Product hygiene
              </p>
              <p className="theme-muted mt-2 text-xs leading-6">
                Keep images, stock, price, and active status reviewed before
                promoting products on the storefront.
              </p>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="theme-panel overflow-hidden rounded-[1.75rem] border backdrop-blur">
              <div className="relative p-5 sm:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,_rgba(216,187,130,0.18),_transparent_46%),radial-gradient(circle_at_top_right,_rgba(12,109,96,0.16),_transparent_42%)]" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#7a5525] dark:text-[#d8bb82]">
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

                  <div className="flex items-center gap-3">
                    <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#d8bb82]/18 text-[#7a5525] dark:text-[#e3c995] sm:inline-flex">
                      <PackagePlus size={18} />
                    </span>
                    <ProductEditorModal saveProductAction={saveProductAction} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <AdminStatCard
                title="Total products"
                value={totalProducts}
                description="All catalog records"
                icon={Boxes}
              />
              <AdminStatCard
                title="Active listings"
                value={activeProducts}
                description="Visible in shop"
                icon={BadgeCheck}
                tone="success"
              />
              <AdminStatCard
                title="Featured"
                value={featuredProducts}
                description="Ready for promotion"
                icon={Sparkles}
              />
              <AdminStatCard
                title="Out of stock"
                value={outOfStockProducts}
                description="Needs attention"
                icon={TriangleAlert}
                tone="warning"
              />
            </div>

            <div className="theme-panel rounded-[1.75rem] border p-4 backdrop-blur sm:p-5">
              <div className="theme-border flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="theme-heading text-xl font-semibold tracking-tight">
                    Catalog
                  </h2>
                  <p className="theme-muted mt-1 text-sm">
                    Review product status, stock, pricing, and edit actions.
                  </p>
                </div>
                <p className="theme-chip rounded-full border px-3 py-1 text-xs font-semibold">
                  {totalProducts} products
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                {productList.length ? (
                  productList.map((product) => {
                    const primaryImage = getPrimaryImage(product);

                    return (
                      <article
                        key={product.id}
                        className="theme-chip grid gap-5 rounded-[1.5rem] border p-4 transition hover:border-[#d8bb82]/35 sm:p-5 xl:grid-cols-[136px_minmax(0,1fr)_auto]"
                      >
                        <div className="theme-image-bg flex h-40 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#d8bb82]/20 sm:h-44 xl:h-36">
                          {primaryImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={primaryImage.image_url}
                              alt={primaryImage.alt_text ?? product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <div className="theme-muted flex h-full items-center justify-center px-5 text-center text-sm leading-6">
                              No primary image
                            </div>
                          )}
                        </div>

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

                          <h3 className="theme-heading mt-4 text-xl font-semibold tracking-tight">
                            {product.name}
                          </h3>
                          <p className="theme-muted mt-2 line-clamp-2 text-sm leading-7">
                            {product.short_description ||
                              "No short description added yet."}
                          </p>

                          <div className="theme-muted mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
                            <p>
                              <span className="theme-heading font-semibold">Slug:</span>{" "}
                              {product.slug}
                            </p>
                            <p>
                              <span className="theme-heading font-semibold">Price:</span>{" "}
                              {formatPrice(product.price)}
                            </p>
                            <p>
                              <span className="theme-heading font-semibold">Brand:</span>{" "}
                              {product.brand || "Not set"}
                            </p>
                            <p>
                              <span className="theme-heading font-semibold">Updated:</span>{" "}
                              {formatDate(product.updated_at)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-start gap-3 xl:justify-end">
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
                      </article>
                    );
                  })
                ) : (
                  <div className="theme-panel rounded-[1.5rem] border border-dashed px-6 py-10 text-center">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
