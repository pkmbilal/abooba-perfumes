import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-white/90 dark:border-stone-800 dark:bg-stone-950/85">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700 dark:text-teal-300">
            Abooba Perfumes
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
            Premium perfumes curated for everyday elegance.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
            Discover refined fragrance picks crafted for the Kerala market with
            a clean shopping experience and timeless presentation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-stone-950 dark:text-white">
              Shop
            </p>
            <div className="mt-3 flex flex-col gap-3 text-sm text-stone-600 dark:text-stone-300">
              <Link href="/products" className="transition hover:text-teal-700 dark:hover:text-teal-300">
                Explore products
              </Link>
              <Link href="/cart" className="transition hover:text-teal-700 dark:hover:text-teal-300">
                View cart
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-stone-950 dark:text-white">
              Contact
            </p>
            <div className="mt-3 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              <p>Kerala, India</p>
              <p>hello@aboobaperfumes.com</p>
              <p>+91 00000 00000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200/80 px-4 py-4 text-center text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
        © 2026 Abooba Perfumes. All rights reserved.
      </div>
    </footer>
  );
}

