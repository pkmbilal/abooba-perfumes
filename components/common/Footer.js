import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="theme-footer theme-border border-t">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="Abooba Perfumes"
              width={56}
              height={56}
              className="h-10 w-auto object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8bb82]">
              Abooba Perfumes
            </span>
          </Link>
          <h2 className="theme-heading mt-3 text-2xl font-semibold tracking-tight">
            Premium perfumes curated for everyday elegance.
          </h2>
          <p className="theme-muted mt-4 max-w-xl text-sm leading-7">
            Discover refined fragrance picks crafted for the Kerala market with
            a clean shopping experience and timeless presentation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="theme-heading text-sm font-semibold">
              Shop
            </p>
            <div className="theme-muted mt-3 flex flex-col gap-3 text-sm">
              <Link href="/products" className="transition hover:text-[#e3c995]">
                Explore products
              </Link>
              <Link href="/cart" className="transition hover:text-[#e3c995]">
                View cart
              </Link>
            </div>
          </div>

          <div>
            <p className="theme-heading text-sm font-semibold">
              Contact
            </p>
            <div className="theme-muted mt-3 flex flex-col gap-3 text-sm">
              <p>Kerala, India</p>
              <p>hello@aboobaperfumes.com</p>
              <p>+91 7593 060 060</p>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-border theme-muted border-t px-4 py-4 text-center text-xs">
        © 2026 Abooba Perfumes. All rights reserved.
      </div>
    </footer>
  );
}
