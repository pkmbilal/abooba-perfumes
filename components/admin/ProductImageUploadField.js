"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  extractProductImagePath,
  PRODUCT_IMAGES_BUCKET,
} from "@/lib/storage/product-images";

function sanitizeFileName(name) {
  const trimmedName = String(name ?? "").trim().toLowerCase();
  const extension = trimmedName.includes(".")
    ? trimmedName.split(".").pop()
    : "jpg";
  const baseName = trimmedName.replace(/\.[^.]+$/, "");
  const safeBaseName = baseName
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);

  return `${safeBaseName || "product-image"}.${extension || "jpg"}`;
}

function buildUploadPath(file) {
  const uniqueId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}`;

  return `products/${uniqueId}-${sanitizeFileName(file.name)}`;
}

export default function ProductImageUploadField({
  initialUrl = "",
  initialAlt = "",
  initialPath = "",
  productName = "",
}) {
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [imagePath, setImagePath] = useState(
    initialPath || extractProductImagePath(initialUrl),
  );
  const [imageAlt, setImageAlt] = useState(initialAlt);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Please upload a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Please upload an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    const supabase = createSupabaseBrowserClient();
    const uploadPath = buildUploadPath(file);

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(uploadPath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      setErrorMessage(uploadError.message);
      setIsUploading(false);
      event.target.value = "";
      return;
    }

    const { data } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(uploadPath);

    setImageUrl(data.publicUrl);
    setImagePath(uploadPath);
    setImageAlt((currentAlt) => currentAlt || file.name.replace(/\.[^.]+$/, ""));
    setIsUploading(false);
    event.target.value = "";
  }

  function handleRemoveImage() {
    setErrorMessage("");
    setImageUrl("");
    setImagePath("");
    setImageAlt("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-stone-50/90 p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-700">Product image</p>
        <p className="text-sm leading-6 text-stone-600">
          Choose a JPG, PNG, or WebP file and we will upload it to your
          Supabase product image bucket automatically.
        </p>
      </div>

      <input type="hidden" name="primaryImageUrl" value={imageUrl} />
      <input type="hidden" name="primaryImagePath" value={imagePath} />

      <div className="flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
          <Upload size={16} />
          <span>{isUploading ? "Uploading..." : imageUrl ? "Replace Image" : "Upload Image"}</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            className="sr-only"
          />
        </label>

        {imageUrl ? (
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <X size={16} />
            <span>Remove</span>
          </button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.24),_transparent_46%),linear-gradient(135deg,_#134e4a_0%,_#0c0a09_60%,_#1c1917_100%)]">
        <div className="relative aspect-[4/5]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={imageAlt || productName || "Product image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm leading-6 text-stone-200">
              Upload a product image to preview it here.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Image alt text
        </label>
        <input
          name="primaryImageAlt"
          type="text"
          value={imageAlt}
          onChange={(event) => setImageAlt(event.target.value)}
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="Midnight Oud bottle front view"
        />
      </div>

      {imagePath ? (
        <p className="text-xs leading-6 text-stone-500">Stored path: {imagePath}</p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
