"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/user-role";

async function getAuthenticatedAdmin() {
  const supabase = await createSupabaseServerClient();
  let {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session) {
    const { data: refreshedSessionData } = await supabase.auth.refreshSession();

    if (refreshedSessionData?.user) {
      user = refreshedSessionData.user;
    }
  }

  return {
    supabase,
    user,
    isAdmin: isAdminUser(user),
  };
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeSlug(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeOptionalUrl(value) {
  const url = normalizeText(value);

  if (!url) {
    return "";
  }

  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

function buildFieldValues(formData) {
  return {
    productId: normalizeText(formData.get("productId")),
    primaryImageId: normalizeText(formData.get("primaryImageId")),
    name: normalizeText(formData.get("name")),
    slug: normalizeSlug(formData.get("slug")),
    shortDescription: normalizeText(formData.get("shortDescription")),
    description: normalizeText(formData.get("description")),
    sku: normalizeText(formData.get("sku")),
    brand: normalizeText(formData.get("brand")),
    gender: normalizeText(formData.get("gender")),
    fragranceFamily: normalizeText(formData.get("fragranceFamily")),
    topNotes: normalizeText(formData.get("topNotes")),
    middleNotes: normalizeText(formData.get("middleNotes")),
    baseNotes: normalizeText(formData.get("baseNotes")),
    volumeMl: normalizeText(formData.get("volumeMl")),
    price: normalizeText(formData.get("price")),
    compareAtPrice: normalizeText(formData.get("compareAtPrice")),
    stockQuantity: normalizeText(formData.get("stockQuantity")),
    isActive: formData.get("isActive") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    primaryImageUrl: normalizeText(formData.get("primaryImageUrl")),
    primaryImagePath: normalizeText(formData.get("primaryImagePath")),
    primaryImageAlt: normalizeText(formData.get("primaryImageAlt")),
  };
}

function validateFieldValues(fieldValues) {
  if (!fieldValues.name) {
    return "Product name is required.";
  }

  if (!fieldValues.slug) {
    return "Product slug is required.";
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fieldValues.slug)) {
    return "Slug can only contain lowercase letters, numbers, and hyphens.";
  }

  const price = Number(fieldValues.price);

  if (!fieldValues.price || Number.isNaN(price) || price < 0) {
    return "Please enter a valid price.";
  }

  const stockQuantity = Number(fieldValues.stockQuantity);

  if (
    !fieldValues.stockQuantity ||
    !Number.isInteger(stockQuantity) ||
    stockQuantity < 0
  ) {
    return "Stock quantity must be a whole number of 0 or more.";
  }

  if (fieldValues.volumeMl) {
    const volumeMl = Number(fieldValues.volumeMl);

    if (!Number.isInteger(volumeMl) || volumeMl <= 0) {
      return "Volume must be a whole number greater than 0.";
    }
  }

  if (fieldValues.compareAtPrice) {
    const compareAtPrice = Number(fieldValues.compareAtPrice);

    if (Number.isNaN(compareAtPrice) || compareAtPrice < 0) {
      return "Compare-at price must be a valid number.";
    }
  }

  const primaryImageUrl = normalizeOptionalUrl(fieldValues.primaryImageUrl);

  if (fieldValues.primaryImageUrl && !primaryImageUrl) {
    return "Primary image URL must be a valid URL.";
  }

  return "";
}

function buildProductPayload(fieldValues) {
  return {
    slug: fieldValues.slug,
    name: fieldValues.name,
    short_description: fieldValues.shortDescription || null,
    description: fieldValues.description || null,
    sku: fieldValues.sku || null,
    brand: fieldValues.brand || null,
    gender: fieldValues.gender || null,
    fragrance_family: fieldValues.fragranceFamily || null,
    top_notes: fieldValues.topNotes || null,
    middle_notes: fieldValues.middleNotes || null,
    base_notes: fieldValues.baseNotes || null,
    volume_ml: fieldValues.volumeMl ? Number(fieldValues.volumeMl) : null,
    price: Number(fieldValues.price),
    compare_at_price: fieldValues.compareAtPrice
      ? Number(fieldValues.compareAtPrice)
      : null,
    stock_quantity: Number(fieldValues.stockQuantity),
    is_active: fieldValues.isActive,
    is_featured: fieldValues.isFeatured,
  };
}

async function upsertPrimaryImage(supabase, productId, fieldValues) {
  if (!fieldValues.primaryImageUrl) {
    if (fieldValues.primaryImageId) {
      const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", fieldValues.primaryImageId)
        .eq("product_id", productId);

      return { error, imageId: "" };
    }

    return { error: null, imageId: "" };
  }

  let imageId = fieldValues.primaryImageId;

  if (!imageId) {
    const { data: existingImage, error: existingImageError } = await supabase
      .from("product_images")
      .select("id")
      .eq("product_id", productId)
      .order("is_primary", { ascending: false })
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (existingImageError) {
      return { error: existingImageError, imageId: "" };
    }

    imageId = existingImage?.id ?? "";
  }

  const { error: resetPrimaryError } = await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);

  if (resetPrimaryError) {
    return { error: resetPrimaryError, imageId };
  }

  if (imageId) {
    const { error } = await supabase
      .from("product_images")
      .update({
        image_url: fieldValues.primaryImageUrl,
        alt_text: fieldValues.primaryImageAlt || null,
        sort_order: 0,
        is_primary: true,
      })
      .eq("id", imageId)
      .eq("product_id", productId);

    return { error, imageId };
  }

  const { data, error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: fieldValues.primaryImageUrl,
      alt_text: fieldValues.primaryImageAlt || null,
      sort_order: 0,
      is_primary: true,
    })
    .select("id")
    .single();

  return {
    error,
    imageId: data?.id ?? "",
  };
}

function revalidateProductPaths(slug) {
  revalidatePath("/admin/products");
  revalidatePath("/products");

  if (slug) {
    revalidatePath(`/products/${slug}`);
  }
}

export async function saveProductAction(_previousState, formData) {
  const { supabase, user, isAdmin } = await getAuthenticatedAdmin();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };
  }

  if (!isAdmin) {
    return {
      status: "error",
      message: "You do not have permission to manage products.",
    };
  }

  const fieldValues = buildFieldValues(formData);
  const validationMessage = validateFieldValues(fieldValues);

  if (validationMessage) {
    return {
      status: "error",
      message: validationMessage,
      fieldValues,
    };
  }

  const payload = buildProductPayload(fieldValues);
  let product = null;

  if (fieldValues.productId) {
    const { data: updatedProducts, error: productError } = await supabase
      .from("products")
      .update(payload)
      .eq("id", fieldValues.productId)
      .select("id, slug");

    if (productError) {
      return {
        status: "error",
        message: productError.message,
        fieldValues,
      };
    }

    if (!Array.isArray(updatedProducts) || updatedProducts.length !== 1) {
      return {
        status: "error",
        message:
          "Your admin session looks out of date. Please sign out, sign back in, and try the update again.",
        fieldValues,
      };
    }

    [product] = updatedProducts;
  } else {
    const { data: insertedProduct, error: productError } = await supabase
      .from("products")
      .insert(payload)
      .select("id, slug")
      .single();

    if (productError) {
      return {
        status: "error",
        message: productError.message,
        fieldValues,
      };
    }

    product = insertedProduct;
  }

  const { error: imageError, imageId } = await upsertPrimaryImage(
    supabase,
    product.id,
    fieldValues,
  );

  if (imageError) {
    return {
      status: "error",
      message: `Product saved, but the primary image could not be updated: ${imageError.message}`,
      fieldValues: {
        ...fieldValues,
        productId: product.id,
        primaryImageId: imageId || fieldValues.primaryImageId,
      },
    };
  }

  revalidateProductPaths(product.slug);

  return {
    status: "success",
    message: fieldValues.productId
      ? "Product updated successfully."
      : "Product created successfully.",
    fieldValues: {
      ...fieldValues,
      productId: product.id,
      primaryImageId: imageId,
    },
  };
}

export async function deleteProductAction(formData) {
  const { supabase, user, isAdmin } = await getAuthenticatedAdmin();
  const productId = normalizeText(formData.get("productId"));
  const slug = normalizeText(formData.get("slug"));

  if (!user || !isAdmin || !productId) {
    return;
  }

  await supabase.from("product_images").delete().eq("product_id", productId);
  await supabase.from("products").delete().eq("id", productId);

  revalidateProductPaths(slug);
}
