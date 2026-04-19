import CartPageClient from "@/components/cart/CartPageClient";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Your Cart | Abooba Perfumes",
  description: "Review selected fragrances in your Abooba Perfumes cart.",
};

export default async function CartPage() {
  let recommendedProducts = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, volume_ml, short_description, product_images(image_url, alt_text, is_primary, sort_order)"
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(4);

    recommendedProducts = data ?? [];
  } catch {
    recommendedProducts = [];
  }

  return (
    <>
      <Header />
      <CartPageClient recommendedProducts={recommendedProducts} />
      <Footer />
    </>
  );
}
