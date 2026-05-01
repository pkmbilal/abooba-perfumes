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
  let savedAddresses = [];
  let isLoggedIn = false;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isLoggedIn = Boolean(user);

    const { data } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, volume_ml, short_description, product_images(image_url, alt_text, is_primary, sort_order)"
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(4);

    recommendedProducts = data ?? [];

    if (user) {
      const { data: addresses } = await supabase
        .from("addresses")
        .select(
          "id, label, recipient_name, phone, city, region, postal_code, address_line_1, address_line_2, address_type, is_default"
        )
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      savedAddresses = addresses ?? [];
    }
  } catch {
    recommendedProducts = [];
    savedAddresses = [];
    isLoggedIn = false;
  }

  return (
    <>
      <Header />
      <CartPageClient
        recommendedProducts={recommendedProducts}
        isLoggedIn={isLoggedIn}
        savedAddresses={savedAddresses}
      />
      <Footer />
    </>
  );
}
