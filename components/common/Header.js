"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import AuthSessionLinks from "@/components/auth/AuthSessionLinks";
import { useCart } from "@/components/cart/CartProvider";

const navLinks = [
  { name: "Men", href: "/products" },
  { name: "Women", href: "/products" },
  { name: "Gift Items", href: "/products" },
  { name: "Shop", href: "/products" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-[#07131d]/92 py-3 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.85)] backdrop-blur-md"
          : "bg-[#07131d]/70 py-5 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.JPG"
                alt="Abooba Perfumes"
                width={72}
                height={72}
                className="h-10 w-auto object-contain sm:h-12"
                priority
              />
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative text-sm font-medium uppercase tracking-wide text-slate-200 transition-colors hover:text-[#e3c995]"
                  >
                    {link.name}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#d8bb82] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div className="hidden lg:flex">
              <AuthSessionLinks />
            </div>

            <Link
              href="/products"
              className="text-slate-200 transition-colors hover:text-[#e3c995]"
              aria-label="Browse products"
            >
              <Search size={20} strokeWidth={1.7} />
            </Link>

            <Link
              href="/cart"
              className="group relative text-slate-200 transition-colors hover:text-[#e3c995]"
              aria-label={`View cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={20} strokeWidth={1.7} />
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-1 text-[10px] font-bold leading-none text-[#0f1720] transition-transform group-hover:scale-110">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="text-slate-200 transition-colors hover:text-[#e3c995] md:hidden"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label="Toggle mobile menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={1.7} />
              ) : (
                <Menu size={24} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`absolute left-0 top-full w-full overflow-hidden border-b border-white/10 bg-[#081520]/96 transition-all duration-300 ease-in-out backdrop-blur-xl md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100 shadow-xl" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium uppercase tracking-wide text-slate-100 transition-colors hover:text-[#e3c995]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/10 pt-5">
            <AuthSessionLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
