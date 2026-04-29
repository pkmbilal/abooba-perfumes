import { ShieldCheck } from "lucide-react";
import { ctaHighlights } from "./home-data";
import { montserrat } from "./home-fonts";
import { PrimaryButton, SecondaryButton } from "./HomeButtons";

export default function CtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(216,187,130,0.16),_transparent_28%),linear-gradient(135deg,_rgba(10,31,45,0.98)_0%,_rgba(9,57,65,0.92)_100%)] p-8 shadow-[0_30px_110px_-55px_rgba(0,0,0,0.92)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#d8bb82]">
                Signature luxury
              </p>
              <h2
                className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl`}
              >
                Find the fragrance that feels distinctly yours
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">
                Explore premium scents, refined gift sets, and elegant fragrance
                experiences designed to feel memorable from first impression to
                final note.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="/products">Shop Now</PrimaryButton>
              <SecondaryButton href="#categories">Browse Categories</SecondaryButton>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {ctaHighlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-100">
                <ShieldCheck size={18} className="text-[#d8bb82]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
