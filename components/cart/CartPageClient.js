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
      className={`${poppins.className} min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_18%_12%,rgba(12,109,96,0.24),transparent_32%),radial-gradient(circle_at_88%_4%,rgba(216,187,130,0.14),transparent_28%),linear-gradient(180deg,#07131d_0%,#06131d_64%,#081119_100%)] px-4 pb-10 pt-28 text-white sm:px-6 sm:pb-14 sm:pt-32 lg:px-8`}
    >
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#d8bb82]">
            Your Cart
          </p>
          <h1
            className={`${montserrat.className} mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl`}
          >
            Review your fragrance selection
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
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
