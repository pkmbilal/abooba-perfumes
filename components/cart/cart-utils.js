import {
  formatPrice,
  getPrimaryImage,
} from "@/components/products/product-utils";

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

function sanitizeWhatsAppNumber(phoneNumber) {
  return String(phoneNumber ?? "").replace(/\D/g, "");
}

export function buildWhatsAppCheckoutUrl({
  items,
  itemCount,
  subtotal,
  totalAmount,
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
}) {
  const sanitizedNumber = sanitizeWhatsAppNumber(phoneNumber);

  if (!sanitizedNumber || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const itemLines = items.map((item, index) => {
    const volumeLabel = item.volumeMl ? `, ${item.volumeMl}ml` : "";
    const lineSubtotal = item.price * item.quantity;

    return [
      `${index + 1}. ${item.name}${volumeLabel}`,
      `Qty: ${item.quantity}`,
      `Unit price: ${formatPrice(item.price)}`,
      `Line total: ${formatPrice(lineSubtotal)}`,
    ].join("\n");
  });

  const message = [
    "Hello Abooba Perfumes, I would like to place an order.",
    "",
    "Selected items:",
    itemLines.join("\n\n"),
    "",
    `Total items: ${itemCount}`,
    `Subtotal: ${formatPrice(subtotal)}`,
    "Delivery fee: Free",
    `Total amount: ${formatPrice(totalAmount)}`,
  ].join("\n");

  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
}
