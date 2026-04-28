import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./HomeButtons";
import { montserrat } from "./home-fonts";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1800&q=85"
        alt="Premium perfume bottle styled with a dark luxury background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,24,0.96)_0%,rgba(3,16,24,0.9)_34%,rgba(3,16,24,0.58)_62%,rgba(3,16,24,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(12,109,96,0.22),_transparent_34%),linear-gradient(180deg,rgba(3,16,24,0.28)_0%,rgba(3,16,24,0.9)_100%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb82]/30 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#e3c995] backdrop-blur">
            <BadgeCheck size={14} />
            Signature fragrance house
          </div>

          <h1
            className={`${montserrat.className} mt-9 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl`}
          >
            Discover the Essence of Luxury
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-100 sm:text-xl">
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
