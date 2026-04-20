"use client";

import { CartProvider } from "./CartProvider";

export default function CartShell({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
