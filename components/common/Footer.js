import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[radial-gradient(circle_at_top,_rgba(13,83,96,0.22),_transparent_28%),linear-gradient(180deg,_#07131d_0%,_#06111a_100%)] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8bb82]">
            Abooba Perfumes
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Premium perfumes curated for everyday elegance.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Discover refined fragrance picks crafted for the Kerala market with
            a clean shopping experience and timeless presentation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">
              Shop
            </p>
            <div className="mt-3 flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/products" className="transition hover:text-[#e3c995]">
                Explore products
              </Link>
              <Link href="/cart" className="transition hover:text-[#e3c995]">
                View cart
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Contact
            </p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <p>Kerala, India</p>
              <p>hello@aboobaperfumes.com</p>
              <p>+91 7593 060 060</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © 2026 Abooba Perfumes. All rights reserved.
      </div>
    </footer>
  );
}
