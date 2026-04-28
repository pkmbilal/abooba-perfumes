import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AboutSection from "@/components/home/AboutSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { poppins } from "@/components/home/home-fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Abooba Perfumes | Luxury Fragrances",
  description:
    "Discover premium perfumes, elegant gift sets, and signature fragrances from Abooba Perfumes.",
};

async function getBestSellerProducts() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*, product_images(image_url, alt_text, is_primary, sort_order)")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    return [];
  }

  return products ?? [];
}

export default async function Home() {
  const bestSellerProducts = await getBestSellerProducts();

  return (
    <>
      <Header />

      <main
        className={`${poppins.className} overflow-hidden bg-[#06131d] text-white`}
      >
        <HeroSection />
        <CategoriesSection />
        <BestSellersSection products={bestSellerProducts} />
        <AboutSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
