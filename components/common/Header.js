import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
];

export default function Header() {
  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="min-w-0">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700 dark:text-teal-300">
            Abooba Perfumes
          </p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-stone-950 dark:text-white">
            Signature Scents
          </p>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-teal-50 hover:text-teal-700 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-teal-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

