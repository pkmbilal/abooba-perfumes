"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.JPG"
            alt="Abooba Perfumes Logo"
            width={70}
            height={10}
            className="h-auto w-auto object-contain"
            priority
          />
        </Link>

        {/* Center: Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-md font-semibold text-gray-700 transition hover:text-black"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-md font-semibold text-gray-700 transition hover:text-black"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-md font-semibold text-gray-700 transition hover:text-black"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="text-gray-700 transition hover:text-black"
          >
            <Search size={22} />
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex text-gray-700 transition hover:text-black"
          >
            <ShoppingCart size={22} />
            <span className="absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold leading-none text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
