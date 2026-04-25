"use client";

import { useFormStatus } from "react-dom";

export default function DeleteProductButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        const confirmed = window.confirm(
          "Delete this product? This will also remove its saved image record.",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
