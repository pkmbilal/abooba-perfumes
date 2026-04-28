import Link from "next/link";

export function PrimaryButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-6 py-3 text-sm font-semibold text-[#0f1720] shadow-[0_18px_40px_-20px_rgba(216,187,130,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-22px_rgba(216,187,130,0.95)]"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-[#d8bb82]/45 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
