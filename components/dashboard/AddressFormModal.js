"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { MapPinPlus, PencilLine, X } from "lucide-react";

const INITIAL_STATE = {
  status: "idle",
  message: "",
};

const EMPTY_ADDRESS = {
  id: "",
  label: "",
  recipientName: "",
  phone: "",
  city: "",
  region: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  addressType: "shipping",
  isDefault: false,
};

function SaveButton({ isEditing }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : isEditing ? "Save Changes" : "Add Address"}
    </button>
  );
}

function buildInitialValues(address) {
  if (!address) {
    return EMPTY_ADDRESS;
  }

  return {
    id: address.id ?? "",
    label: address.label ?? "",
    recipientName: address.recipientName ?? "",
    phone: address.phone ?? "",
    city: address.city ?? "",
    region: address.region ?? "",
    postalCode: address.postalCode ?? "",
    addressLine1: address.addressLine1 ?? "",
    addressLine2: address.addressLine2 ?? "",
    addressType: address.addressType ?? "shipping",
    isDefault: Boolean(address.isDefault),
  };
}

function OpenButton({ address, onClick }) {
  if (address) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50"
      >
        <span className="inline-flex items-center gap-2">
          <PencilLine size={15} />
          <span>Edit</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
    >
      <MapPinPlus size={16} />
      <span>Add New Address</span>
    </button>
  );
}

export default function AddressFormModal({ address, saveAddressAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(saveAddressAction, INITIAL_STATE);
  const previousStatusRef = useRef(state.status);
  const isEditing = Boolean(address?.id);
  const initialValues = buildInitialValues(address);
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
      <OpenButton address={address} onClick={() => setIsOpen(true)} />

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close address editor"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.42),rgba(236,253,245,0.3))] backdrop-blur-xl"
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[14%] h-44 w-44 rounded-full bg-teal-200/25 blur-3xl" />
            <div className="absolute bottom-[12%] right-[12%] h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),transparent_40%,rgba(255,255,255,0.12)_100%)]" />
          </div>

          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_36px_120px_-48px_rgba(15,118,110,0.3)]">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_55%),linear-gradient(180deg,_#fcfffe_0%,_#f8fafc_100%)] px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                  {isEditing ? "Edit address" : "Add address"}
                </p>
                <h3 className="mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight text-stone-950">
                  {isEditing
                    ? "Update your saved address"
                    : "Save a new delivery address"}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
                  Use the exact fields from your address book so delivery and
                  checkout details stay organized.
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

            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <form action={formAction} className="space-y-5">
                <input type="hidden" name="id" value={fieldValues.id} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor={`address-label-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Label
                    </label>
                    <input
                      id={`address-label-${fieldValues.id || "new"}`}
                      name="label"
                      type="text"
                      defaultValue={fieldValues.label}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Home, Work, Studio"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`address-type-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Address type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id={`address-type-${fieldValues.id || "new"}`}
                      name="addressType"
                      defaultValue={fieldValues.addressType}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="shipping">Shipping</option>
                      <option value="billing">Billing</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor={`recipient-name-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Recipient name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id={`recipient-name-${fieldValues.id || "new"}`}
                      name="recipientName"
                      type="text"
                      required
                      defaultValue={fieldValues.recipientName}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Enter recipient name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`address-phone-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Phone
                    </label>
                    <input
                      id={`address-phone-${fieldValues.id || "new"}`}
                      name="phone"
                      type="tel"
                      defaultValue={fieldValues.phone}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Add phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`address-postal-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Postal code
                    </label>
                    <input
                      id={`address-postal-${fieldValues.id || "new"}`}
                      name="postalCode"
                      type="text"
                      defaultValue={fieldValues.postalCode}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Postal or PIN code"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor={`address-line-1-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Address line 1 <span className="text-red-600">*</span>
                    </label>
                    <input
                      id={`address-line-1-${fieldValues.id || "new"}`}
                      name="addressLine1"
                      type="text"
                      required
                      defaultValue={fieldValues.addressLine1}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="House name, street, area"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor={`address-line-2-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Address line 2
                    </label>
                    <input
                      id={`address-line-2-${fieldValues.id || "new"}`}
                      name="addressLine2"
                      type="text"
                      defaultValue={fieldValues.addressLine2}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Apartment, floor, nearby location"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`address-city-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      id={`address-city-${fieldValues.id || "new"}`}
                      name="city"
                      type="text"
                      required
                      defaultValue={fieldValues.city}
                      className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor={`address-region-${fieldValues.id || "new"}`}
                      className="text-sm font-medium text-stone-700"
                    >
                      Region / State
                    </label>
                    <input
                      id={`address-region-${fieldValues.id || "new"}`}
                      name="region"
                      type="text"
                      defaultValue={fieldValues.region}
                      className="w-full rounded-2xl border border-white/55 bg-white/75 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Kerala, Tamil Nadu, etc."
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-[1.4rem] border border-stone-200 bg-stone-50 px-4 py-4">
                  <input
                    name="isDefault"
                    type="checkbox"
                    defaultChecked={fieldValues.isDefault}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-stone-900">
                      Set as default address
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-stone-600">
                      This address will be prioritized for future deliveries.
                    </span>
                  </span>
                </label>

                {state.status === "error" ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {state.message || "We could not save your address right now."}
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
