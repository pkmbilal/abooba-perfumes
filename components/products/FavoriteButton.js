"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function FavoriteButton({ productId, initialIsFavorite }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  async function handleToggle() {
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const nextFavoriteState = !isFavorite;
    setIsFavorite(nextFavoriteState);

    if (nextFavoriteState) {
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        product_id: productId,
      });

      if (error) {
        setIsFavorite(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        setIsFavorite(true);
        return;
      }
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      disabled={isPending}
      onClick={handleToggle}
      className={[
        "absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition",
        isFavorite
          ? "border-rose-200 bg-white/90 text-rose-500 shadow-[0_18px_40px_-24px_rgba(244,63,94,0.45)]"
          : "border-white/45 bg-white/20 text-white hover:bg-white/30",
        isPending ? "cursor-not-allowed opacity-70" : "",
      ].join(" ")}
    >
      <Heart
        size={18}
        className={isFavorite ? "fill-current" : ""}
      />
    </button>
  );
}
