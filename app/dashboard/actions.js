"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function updateProfileAction(_previousState, formData) {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "").trim();
  const gender = String(formData.get("gender") ?? "").trim();
  const normalizedGender = ["male", "female", "other"].includes(gender)
    ? gender
    : "";

  if (!fullName) {
    return {
      status: "error",
      message: "Full name is required.",
      fieldValues: {
        fullName,
        phoneNumber,
        avatarUrl,
        dateOfBirth,
        gender: normalizedGender,
      },
    };
  }

  if (avatarUrl) {
    try {
      new URL(avatarUrl);
    } catch {
      return {
        status: "error",
        message: "Please enter a valid avatar URL.",
        fieldValues: {
          fullName,
          phoneNumber,
          avatarUrl,
          dateOfBirth,
          gender: normalizedGender,
        },
      };
    }
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      full_name: fullName,
      phone: phoneNumber || null,
      avatar_url: avatarUrl || null,
      date_of_birth: dateOfBirth || null,
      gender: normalizedGender || null,
    },
    {
      onConflict: "id",
    },
  );

  if (profileError) {
    return {
      status: "error",
      message: profileError.message,
      fieldValues: {
        fullName,
        phoneNumber,
        avatarUrl,
        dateOfBirth,
        gender: normalizedGender,
      },
    };
  }

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone_number: phoneNumber || null,
      avatar_url: avatarUrl || null,
      date_of_birth: dateOfBirth || null,
      gender: normalizedGender || null,
    },
  });

  if (authError) {
    return {
      status: "error",
      message: authError.message,
      fieldValues: {
        fullName,
        phoneNumber,
        avatarUrl,
        dateOfBirth,
        gender: normalizedGender,
      },
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "Profile updated successfully.",
    fieldValues: {
      fullName,
      phoneNumber,
      avatarUrl,
      dateOfBirth,
      gender: normalizedGender,
    },
  };
}

export async function deleteAddressAction(formData) {
  const addressId = formData.get("addressId");
  const { supabase, user } = await getAuthenticatedUser();

  if (!user || !addressId) {
    return;
  }

  await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id);

  revalidatePath("/dashboard");
}

function buildAddressFieldValues(formData) {
  return {
    id: String(formData.get("id") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    recipientName: String(formData.get("recipientName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    region: String(formData.get("region") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim(),
    addressLine1: String(formData.get("addressLine1") ?? "").trim(),
    addressLine2: String(formData.get("addressLine2") ?? "").trim(),
    addressType: String(formData.get("addressType") ?? "").trim(),
    isDefault: formData.get("isDefault") === "on",
  };
}

function validateAddressFieldValues(fieldValues) {
  if (!fieldValues.recipientName) {
    return "Recipient name is required.";
  }

  if (!fieldValues.city) {
    return "City is required.";
  }

  if (!fieldValues.addressLine1) {
    return "Address line 1 is required.";
  }

  if (!["shipping", "billing", "both"].includes(fieldValues.addressType)) {
    return "Please choose a valid address type.";
  }

  return "";
}

export async function saveAddressAction(_previousState, formData) {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };
  }

  const fieldValues = buildAddressFieldValues(formData);
  const validationMessage = validateAddressFieldValues(fieldValues);

  if (validationMessage) {
    return {
      status: "error",
      message: validationMessage,
      fieldValues,
    };
  }

  if (fieldValues.isDefault) {
    const { error: resetDefaultError } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);

    if (resetDefaultError) {
      return {
        status: "error",
        message: resetDefaultError.message,
        fieldValues,
      };
    }
  }

  const payload = {
    user_id: user.id,
    label: fieldValues.label || null,
    recipient_name: fieldValues.recipientName,
    phone: fieldValues.phone || null,
    city: fieldValues.city,
    region: fieldValues.region || null,
    postal_code: fieldValues.postalCode || null,
    address_line_1: fieldValues.addressLine1,
    address_line_2: fieldValues.addressLine2 || null,
    address_type: fieldValues.addressType,
    is_default: fieldValues.isDefault,
  };

  const query = fieldValues.id
    ? supabase
        .from("addresses")
        .update(payload)
        .eq("id", fieldValues.id)
        .eq("user_id", user.id)
    : supabase.from("addresses").insert(payload);

  const { error } = await query;

  if (error) {
    return {
      status: "error",
      message: error.message,
      fieldValues,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: fieldValues.id
      ? "Address updated successfully."
      : "Address added successfully.",
    fieldValues,
  };
}

export async function removeFavoriteAction(formData) {
  const productId = formData.get("productId");
  const { supabase, user } = await getAuthenticatedUser();

  if (!user || !productId) {
    return;
  }

  await supabase
    .from("favorites")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", user.id);

  revalidatePath("/dashboard");
}
