"use client";

import { buildWhatsAppCheckoutUrl } from "./cart-utils";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import EmptyCartState from "./EmptyCartState";
import { useCart } from "./CartProvider";

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
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_24%),linear-gradient(180deg,_#f8fbfb_0%,_#f5f7f7_52%,_#f7faf9_100%)] px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8 lg:pb-12 lg:pt-32 dark:bg-[linear-gradient(180deg,_#0c0a09_0%,_#111827_100%)]">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <div className="space-y-5">
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
