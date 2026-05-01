import { ShieldCheck } from "lucide-react";
import { ctaHighlights } from "./home-data";
import { montserrat } from "./home-fonts";
import { PrimaryButton, SecondaryButton } from "./HomeButtons";

export default function CtaSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="theme-panel overflow-hidden rounded-[2.2rem] border p-8 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#d8bb82]">
                Signature luxury
              </p>
              <h2
                className={`${montserrat.className} theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Find the fragrance that feels distinctly yours
              </h2>
              <p className="theme-muted mt-4 text-sm leading-7 sm:text-base">
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

          <div className="theme-border mt-10 grid gap-4 border-t pt-8 sm:grid-cols-3">
            {ctaHighlights.map((item) => (
              <div key={item} className="theme-muted flex items-center gap-3 text-sm">
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
