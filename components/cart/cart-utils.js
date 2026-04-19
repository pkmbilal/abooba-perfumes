import { getPrimaryImage } from "@/components/products/product-utils";

export const CART_STORAGE_KEY = "abooba-perfumes-cart";

export function buildCartItem(product) {
  const primaryImage =
    product.primaryImage ?? getPrimaryImage(product) ?? product.image ?? null;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price) || 0,
    stockQuantity:
      typeof product.stock_quantity === "number" ? product.stock_quantity : null,
    volumeMl: product.volume_ml ?? null,
    image: primaryImage
      ? {
          image_url: primaryImage.image_url,
          alt_text: primaryImage.alt_text ?? product.name,
        }
      : null,
  };
}

export function getItemLimit(item) {
  return typeof item.stockQuantity === "number" && item.stockQuantity > 0
    ? item.stockQuantity
    : Number.POSITIVE_INFINITY;
}

