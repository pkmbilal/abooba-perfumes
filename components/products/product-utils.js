export function formatPrice(price) {
  const amount = Number(price);

  if (Number.isNaN(amount)) {
    return "INR --";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function buildMeta(product) {
  return [
    product.brand,
    product.fragrance_family,
    product.volume_ml ? `${product.volume_ml} ml` : null,
  ].filter(Boolean);
}

export function getPrimaryImage(product) {
  if (!Array.isArray(product.product_images)) {
    return null;
  }

  const sortedImages = [...product.product_images].sort((first, second) => {
    if (first.is_primary === second.is_primary) {
      return (first.sort_order ?? 0) - (second.sort_order ?? 0);
    }

    return first.is_primary ? -1 : 1;
  });

  return sortedImages[0] ?? null;
}
