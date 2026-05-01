import Link from "next/link";

export default function Footer() {
  return (
    <footer className="theme-footer theme-border border-t">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8bb82]">
            Abooba Perfumes
          </p>
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
