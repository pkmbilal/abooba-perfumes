"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
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
    return (
      <div
        className={`inline-flex items-center rounded-full border border-stone-200 bg-stone-50 p-1 text-sm font-semibold text-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:text-white ${className}`}
        aria-label={`${product.name} quantity in cart`}
      >
        <button
          type="button"
          onClick={handleDecrease}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-white dark:hover:bg-stone-800"
          aria-label={`Decrease ${product.name} quantity`}
        >
          -
        </button>
        <span className="min-w-10 text-center text-sm tracking-[0.12em]">
          {currentQuantity}
        </span>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={currentQuantity >= maxQuantity}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-stone-800"
          aria-label={`Increase ${product.name} quantity`}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isOutOfStock}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 ${
        isOutOfStock
          ? "cursor-not-allowed bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
          : "bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-stone-950 dark:hover:bg-teal-400"
      } ${className}`}
      aria-label={`Add ${product.name} to cart`}
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
