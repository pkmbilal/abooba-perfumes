"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { buildCartItem, CART_STORAGE_KEY, getItemLimit } from "./cart-utils";

const CartContext = createContext(null);
const CART_STORAGE_EVENT = "abooba-cart-updated";
const EMPTY_CART = [];
let cachedCartRaw = null;
let cachedCartSnapshot = EMPTY_CART;

function readStoredCart() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      cachedCartRaw = null;
      cachedCartSnapshot = EMPTY_CART;
      return EMPTY_CART;
    }

    if (storedCart === cachedCartRaw) {
      return cachedCartSnapshot;
    }

    const parsedCart = JSON.parse(storedCart);
    cachedCartRaw = storedCart;
    cachedCartSnapshot = Array.isArray(parsedCart) ? parsedCart : EMPTY_CART;
    return cachedCartSnapshot;
  } catch {
    cachedCartRaw = null;
    cachedCartSnapshot = EMPTY_CART;
    return EMPTY_CART;
  }
}

function subscribeToCartStore(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(event) {
    if (!event.key || event.key === CART_STORAGE_KEY) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_STORAGE_EVENT, callback);
  };
}

function writeStoredCart(items) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const serializedItems = JSON.stringify(items);
    cachedCartRaw = serializedItems;
    cachedCartSnapshot = items;
    window.localStorage.setItem(CART_STORAGE_KEY, serializedItems);
    window.dispatchEvent(new Event(CART_STORAGE_EVENT));
  } catch {
    // Ignore storage write errors so the cart still works for the current render.
  }
}

export function CartProvider({ children }) {
  const items = useSyncExternalStore(
    subscribeToCartStore,
    readStoredCart,
    () => EMPTY_CART
  );

  const value = useMemo(() => {
    function addItem(product, quantity = 1) {
      const nextItem = buildCartItem(product);
      const currentItems = readStoredCart();
      const existingItem = currentItems.find((item) => item.id === nextItem.id);

      if (!existingItem) {
        writeStoredCart([
          ...currentItems,
          {
            ...nextItem,
            quantity: Math.min(quantity, getItemLimit(nextItem)),
          },
        ]);
      } else {
        const limit = getItemLimit(existingItem);

        writeStoredCart(
          currentItems.map((item) =>
            item.id === nextItem.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, limit),
                }
            : item
          )
        );
      }
    }

    function removeItem(productId) {
      writeStoredCart(
        readStoredCart().filter((item) => item.id !== productId)
      );
    }

    function updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      writeStoredCart(
        readStoredCart().map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.min(quantity, getItemLimit(item)),
              }
            : item
        )
      );
    }

    function clearCart() {
      writeStoredCart([]);
    }

    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
