"use client";

import { buildWhatsAppCheckoutUrl } from "./cart-utils";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import EmptyCartState from "./EmptyCartState";
import { useCart } from "./CartProvider";
import { montserrat, poppins } from "@/components/home/home-fonts";

export default function CartPageClient() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const deliveryFee = 0;
  const totalAmount = subtotal + deliveryFee;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const checkoutUrl = buildWhatsAppCheckoutUrl({
    items,
    itemCount,
    subtotal,
    totalAmount,
    phoneNumber: whatsappNumber,
  });
  const checkoutDisabledReason =
    items.length > 0 && !checkoutUrl
      ? "Add NEXT_PUBLIC_WHATSAPP_NUMBER to enable WhatsApp checkout."
      : "";

  function handleProceedToCheckout() {
    if (!checkoutUrl) {
      return;
    }

    window.location.href = checkoutUrl;
  }

  return (
    <main
      className={`${poppins.className} theme-page min-h-screen overflow-x-hidden px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8`}
    >
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#7a5525] dark:text-[#d8bb82]">
            Your Cart
          </p>
          <h1
            className={`${montserrat.className} theme-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl`}
          >
            Review your fragrance selection
          </h1>
          <p className="theme-muted mt-5 text-base leading-8">
            Fine-tune quantities and continue to WhatsApp checkout when your
            order feels just right.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <div className="flex flex-col gap-5">
            {items.length > 0 ? (
              items.map((item, index) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  eagerImage={index === 0}
                />
              ))
            ) : (
              <EmptyCartState />
            )}
          </div>

          <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            totalAmount={totalAmount}
            hasItems={items.length > 0}
            onClearCart={clearCart}
            onProceedToCheckout={handleProceedToCheckout}
            checkoutDisabledReason={checkoutDisabledReason}
          />
        </div>
      </section>
    </main>
  );
}
