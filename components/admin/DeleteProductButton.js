"use client";

import { Trash2 } from "lucide-react";
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
      className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-rose-400/30 dark:bg-rose-950/20 dark:text-rose-200 dark:hover:border-rose-300/50 dark:hover:bg-rose-500/15"
    >
      <Trash2 size={15} />
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
