"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  tone = "default",
}) {
  const { items, addItem, updateQuantity } = useCart();
  const isOutOfStock = product.stock_quantity <= 0;
  const cartItem = items.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity ?? 0;
  const maxQuantity =
    typeof product.stock_quantity === "number" && product.stock_quantity > 0
      ? product.stock_quantity
      : Number.POSITIVE_INFINITY;

  function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isOutOfStock) {
      return;
    }

    addItem(product, quantity);
  }

  function handleDecrease(event) {
    event.preventDefault();
    event.stopPropagation();
    updateQuantity(product.id, currentQuantity - 1);
  }

  function handleIncrease(event) {
    event.preventDefault();
    event.stopPropagation();

    if (currentQuantity >= maxQuantity) {
      return;
    }

    addItem(product, 1);
  }

  if (currentQuantity > 0) {
    const quantityClassName =
      tone === "luxury"
        ? "theme-chip"
        : "border-stone-200 bg-stone-50 text-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:text-white";
    const quantityButtonClassName =
      tone === "luxury"
        ? "hover:bg-white/10"
        : "hover:bg-white dark:hover:bg-stone-800";

    return (
      <div
        className={`inline-flex items-center rounded-full border p-1 text-sm font-semibold ${quantityClassName}`}
        aria-label={`${product.name} quantity in cart`}
      >
        <button
          type="button"
          onClick={handleDecrease}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${quantityButtonClassName}`}
          aria-label={`Decrease ${product.name} quantity`}
        >
          -
        </button>
        <span className="min-w-9 text-center text-sm tracking-[0.12em]">
          {currentQuantity}
        </span>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={currentQuantity >= maxQuantity}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition disabled:cursor-not-allowed disabled:opacity-40 ${quantityButtonClassName}`}
          aria-label={`Increase ${product.name} quantity`}
        >
          +
        </button>
      </div>
    );
  }

  const buttonClassName =
    tone === "luxury"
      ? isOutOfStock
        ? "cursor-not-allowed border border-white/10 bg-white/10 text-slate-400"
        : "bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] text-[#0f1720] shadow-[0_18px_40px_-22px_rgba(216,187,130,0.85)] hover:brightness-105"
      : isOutOfStock
        ? "cursor-not-allowed bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
        : "bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-stone-950 dark:hover:bg-teal-400";

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isOutOfStock}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bb82] focus-visible:ring-offset-2 ${buttonClassName} ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
