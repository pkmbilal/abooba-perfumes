"use client";

import CartButton from "./CartButton";
import { CartProvider } from "./CartProvider";

export default function CartShell({ children }) {
  return (
    <CartProvider>
      {children}
      <CartButton />
    </CartProvider>
  );
}
