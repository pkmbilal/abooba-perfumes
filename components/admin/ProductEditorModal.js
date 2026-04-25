"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { PencilLine, Plus, X } from "lucide-react";
import ProductImageUploadField from "@/components/admin/ProductImageUploadField";
import { extractProductImagePath } from "@/lib/storage/product-images";

const INITIAL_STATE = {
  status: "idle",
  message: "",
};

const EMPTY_PRODUCT = {
  productId: "",
  primaryImageId: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  sku: "",
  brand: "",
  gender: "",
  fragranceFamily: "",
  topNotes: "",
  middleNotes: "",
  baseNotes: "",
  volumeMl: "",
  price: "",
  compareAtPrice: "",
  stockQuantity: "0",
  isActive: true,
  isFeatured: false,
  primaryImageUrl: "",
  primaryImagePath: "",
  primaryImageAlt: "",
};

function buildInitialValues(product) {
  if (!product) {
    return EMPTY_PRODUCT;
  }

  const primaryImage = Array.isArray(product.product_images)
    ? [...product.product_images].sort((first, second) => {
        if (first.is_primary === second.is_primary) {
          return (first.sort_order ?? 0) - (second.sort_order ?? 0);
        }

        return first.is_primary ? -1 : 1;
      })[0]
    : null;

  return {
    productId: product.id ?? "",
    primaryImageId: primaryImage?.id ?? "",
    name: product.name ?? "",
    slug: product.slug ?? "",
    shortDescription: product.short_description ?? "",
    description: product.description ?? "",
    sku: product.sku ?? "",
    brand: product.brand ?? "",
    gender: product.gender ?? "",
    fragranceFamily: product.fragrance_family ?? "",
    topNotes: product.top_notes ?? "",
    middleNotes: product.middle_notes ?? "",
    baseNotes: product.base_notes ?? "",
    volumeMl: product.volume_ml ? String(product.volume_ml) : "",
    price: product.price != null ? String(product.price) : "",
    compareAtPrice:
      product.compare_at_price != null ? String(product.compare_at_price) : "",
    stockQuantity:
      product.stock_quantity != null ? String(product.stock_quantity) : "0",
    isActive: product.is_active !== false,
    isFeatured: Boolean(product.is_featured),
    primaryImageUrl: primaryImage?.image_url ?? "",
    primaryImagePath: extractProductImagePath(primaryImage?.image_url ?? ""),
    primaryImageAlt: primaryImage?.alt_text ?? "",
  };
}

function SaveButton({ isEditing }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : isEditing ? "Save Product" : "Create Product"}
    </button>
  );
}

function OpenButton({ isEditing, onClick }) {
  if (isEditing) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50"
      >
        <PencilLine size={15} />
        <span>Edit</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
    >
      <Plus size={16} />
      <span>Add Product</span>
    </button>
  );
}

export default function ProductEditorModal({ product, saveProductAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(saveProductAction, INITIAL_STATE);
  const previousStatusRef = useRef(state.status);
  const isEditing = Boolean(product?.id);
  const initialValues = buildInitialValues(product);
  const fieldValues = state.fieldValues ?? initialValues;

  useEffect(() => {
    const previousStatus = previousStatusRef.current;

    if (
      isOpen &&
      previousStatus !== "success" &&
      state.status === "success"
    ) {
      startTransition(() => {
        setIsOpen(false);
      });
    }

    previousStatusRef.current = state.status;
  }, [isOpen, state.status]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <OpenButton isEditing={isEditing} onClick={() => setIsOpen(true)} />

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close product editor"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.56),rgba(236,253,245,0.34))] backdrop-blur-xl"
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[8%] top-[10%] h-48 w-48 rounded-full bg-teal-200/25 blur-3xl" />
            <div className="absolute bottom-[14%] right-[10%] h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_36px_120px_-48px_rgba(15,118,110,0.3)]">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_55%),linear-gradient(180deg,_#fcfffe_0%,_#f8fafc_100%)] px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                  {isEditing ? "Edit product" : "Add product"}
                </p>
                <h3 className="mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight text-stone-950">
                  {isEditing
                    ? "Update your fragrance catalog"
                    : "Create a new fragrance listing"}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
                  Keep product details clean and consistent so pricing, stock,
                  and the storefront stay aligned.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-950"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <form action={formAction} className="space-y-6">
                <input type="hidden" name="productId" value={fieldValues.productId} />
                <input
                  type="hidden"
                  name="primaryImageId"
                  value={fieldValues.primaryImageId}
                />

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-stone-700">
                          Product name <span className="text-red-600">*</span>
                        </label>
                        <input
                          name="name"
                          type="text"
                          required
                          defaultValue={fieldValues.name}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Midnight Oud"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Slug <span className="text-red-600">*</span>
                        </label>
                        <input
                          name="slug"
                          type="text"
                          required
                          defaultValue={fieldValues.slug}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="midnight-oud"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          SKU
                        </label>
                        <input
                          name="sku"
                          type="text"
                          defaultValue={fieldValues.sku}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="ABO-001"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-stone-700">
                          Short description
                        </label>
                        <input
                          name="shortDescription"
                          type="text"
                          defaultValue={fieldValues.shortDescription}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="A warm signature scent for evenings and special occasions."
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-stone-700">
                          Full description
                        </label>
                        <textarea
                          name="description"
                          rows={5}
                          defaultValue={fieldValues.description}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Describe the scent profile, wear experience, and ideal occasion."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Brand
                        </label>
                        <input
                          name="brand"
                          type="text"
                          defaultValue={fieldValues.brand}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Abooba Perfumes"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Gender
                        </label>
                        <input
                          name="gender"
                          type="text"
                          defaultValue={fieldValues.gender}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Unisex"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Fragrance family
                        </label>
                        <input
                          name="fragranceFamily"
                          type="text"
                          defaultValue={fieldValues.fragranceFamily}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Woody amber"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Volume (ml)
                        </label>
                        <input
                          name="volumeMl"
                          type="number"
                          min="1"
                          step="1"
                          defaultValue={fieldValues.volumeMl}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="100"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Price (INR) <span className="text-red-600">*</span>
                        </label>
                        <input
                          name="price"
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          defaultValue={fieldValues.price}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="2499"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Compare-at price
                        </label>
                        <input
                          name="compareAtPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          defaultValue={fieldValues.compareAtPrice}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="2999"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Stock quantity <span className="text-red-600">*</span>
                        </label>
                        <input
                          name="stockQuantity"
                          type="number"
                          min="0"
                          step="1"
                          required
                          defaultValue={fieldValues.stockQuantity}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Top notes
                        </label>
                        <textarea
                          name="topNotes"
                          rows={3}
                          defaultValue={fieldValues.topNotes}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Bergamot, saffron"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Middle notes
                        </label>
                        <textarea
                          name="middleNotes"
                          rows={3}
                          defaultValue={fieldValues.middleNotes}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Rose, oud"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-700">
                          Base notes
                        </label>
                        <textarea
                          name="baseNotes"
                          rows={3}
                          defaultValue={fieldValues.baseNotes}
                          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          placeholder="Amber, musk, sandalwood"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-stone-50/90 p-4">
                      <ProductImageUploadField
                        initialUrl={fieldValues.primaryImageUrl}
                        initialPath={fieldValues.primaryImagePath}
                        initialAlt={fieldValues.primaryImageAlt}
                        productName={fieldValues.name}
                      />
                    </div>

                    <label className="flex items-start gap-3 rounded-[1.4rem] border border-stone-200 bg-stone-50 px-4 py-4">
                      <input
                        name="isActive"
                        type="checkbox"
                        defaultChecked={fieldValues.isActive}
                        className="mt-1 h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-stone-900">
                          Show on storefront
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-stone-600">
                          Active products remain visible on the public products pages.
                        </span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 rounded-[1.4rem] border border-stone-200 bg-stone-50 px-4 py-4">
                      <input
                        name="isFeatured"
                        type="checkbox"
                        defaultChecked={fieldValues.isFeatured}
                        className="mt-1 h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-stone-900">
                          Mark as featured
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-stone-600">
                          Keep this ready for featured sections or homepage merchandising.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {state.status === "error" ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {state.message || "We could not save this product right now."}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-5">
                  <SaveButton isEditing={isEditing} />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
