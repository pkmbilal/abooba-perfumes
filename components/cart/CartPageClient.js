"use client";

import { useMemo, useState } from "react";
import { buildWhatsAppCheckoutUrl } from "./cart-utils";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import EmptyCartState from "./EmptyCartState";
import { useCart } from "./CartProvider";
import { montserrat, poppins } from "@/components/home/home-fonts";

function formatAddress(address) {
  if (!address) {
    return "";
  }

  return [
    address.recipient_name,
    address.phone,
    address.address_line_1,
    address.address_line_2,
    [address.city, address.region, address.postal_code].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CartPageClient({ isLoggedIn = false, savedAddresses = [] }) {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const [guestAddress, setGuestAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses[0]?.id ?? "",
  );
  const deliveryFee = 0;
  const totalAmount = subtotal + deliveryFee;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const selectedAddress = useMemo(
    () =>
      savedAddresses.find((address) => address.id === selectedAddressId) ??
      savedAddresses[0] ??
      null,
    [savedAddresses, selectedAddressId],
  );
  const deliveryAddress = isLoggedIn
    ? formatAddress(selectedAddress)
    : guestAddress.trim();
  const addressDisabledReason =
    items.length === 0
      ? ""
      : isLoggedIn && savedAddresses.length === 0
        ? "Add a delivery address before checkout."
        : !isLoggedIn && !deliveryAddress
          ? "Enter a delivery address before checkout."
          : "";
  const checkoutUrl = buildWhatsAppCheckoutUrl({
    items,
    itemCount,
    subtotal,
    totalAmount,
    deliveryAddress,
    phoneNumber: whatsappNumber,
  });
  const checkoutDisabledReason =
    addressDisabledReason ||
    (items.length > 0 && !checkoutUrl
      ? "Add NEXT_PUBLIC_WHATSAPP_NUMBER to enable WhatsApp checkout."
      : "");

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
            isLoggedIn={isLoggedIn}
            savedAddresses={savedAddresses}
            selectedAddressId={selectedAddressId}
            onSelectedAddressIdChange={setSelectedAddressId}
            guestAddress={guestAddress}
            onGuestAddressChange={setGuestAddress}
          />
        </div>
      </section>
    </main>
  );
}
