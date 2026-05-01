import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./HomeButtons";
import { montserrat } from "./home-fonts";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <Image
        src="/images/home/hero_bg_2.webp"
        alt="Premium perfume bottle styled with a dark luxury background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.96)_0%,rgba(255,253,248,0.84)_34%,rgba(255,253,248,0.34)_62%,rgba(255,253,248,0.04)_100%)] dark:bg-[linear-gradient(90deg,rgba(3,16,24,0.96)_0%,rgba(3,16,24,0.86)_34%,rgba(3,16,24,0.36)_62%,rgba(3,16,24,0.06)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(216,187,130,0.16),_transparent_34%),linear-gradient(180deg,rgba(255,253,248,0.08)_0%,rgba(255,253,248,0.58)_100%)] dark:bg-[radial-gradient(circle_at_left,_rgba(12,109,96,0.18),_transparent_34%),linear-gradient(180deg,rgba(3,16,24,0.22)_0%,rgba(3,16,24,0.56)_100%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb82]/40 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#7a5525] backdrop-blur dark:bg-white/8 dark:text-[#e3c995]">
            <BadgeCheck size={14} />
            Signature fragrance house
          </div>

          <h1
            className={`${montserrat.className} theme-heading mt-9 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl`}
          >
            Discover the Essence of Luxury
          </h1>

          <p className="theme-muted mt-8 max-w-2xl text-lg leading-9 sm:text-xl">
            Explore a refined world of signature perfumes crafted for men,
            women, and thoughtful gifting. Every bottle is designed to feel
            elegant, memorable, and beautifully modern.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="/products">Shop Now</PrimaryButton>
            <SecondaryButton href="#categories">Explore Collection</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
