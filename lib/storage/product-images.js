export const PRODUCT_IMAGES_BUCKET = "product-images";

export function extractProductImagePath(value) {
  const input = String(value ?? "").trim();

  if (!input) {
    return "";
  }

  if (!input.startsWith("http://") && !input.startsWith("https://")) {
    return input.replace(/^\/+/, "");
  }

  try {
    const url = new URL(input);
    const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return "";
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return "";
  }
}
