import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Gift,
  ImageIcon,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Montserrat, Poppins } from "next/font/google";
import Header from "@/components/common/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "Abooba Perfumes | Luxury Fragrances",
  description:
    "Discover premium perfumes, elegant gift sets, and signature fragrances from Abooba Perfumes.",
};

const categories = [
  {
    title: "Men's Perfumes",
    description: "Bold woods, spices, and refined depth for a lasting impression.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Women's Perfumes",
    description: "Soft florals, luminous notes, and graceful everyday luxury.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Unisex Perfumes",
    description: "Balanced signatures crafted to feel modern, warm, and versatile.",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gift Sets",
    description: "Beautifully presented fragrance collections for meaningful gifting.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80",
  },
];

const bestSellers = [
  {
    name: "Midnight Oud",
    note: "Oud, amber, saffron",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Velvet Bloom",
    note: "Rose, musk, vanilla",
    price: "₹2,199",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Azure Noir",
    note: "Bergamot, cedar, tonka",
    price: "₹2,699",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Golden Musk",
    note: "Musk, sandalwood, pear",
    price: "₹2,349",
    image:
      "https://images.unsplash.com/photo-1627913130573-4bdf6a8f1e74?auto=format&fit=crop&w=900&q=80",
  },
];

const benefits = [
  {
    title: "Premium ingredients",
    description:
      "Carefully selected notes and refined blends designed to feel rich and polished.",
    icon: Leaf,
  },
  {
    title: "Long-lasting fragrance",
    description:
      "Built for elegant projection and memorable wear from day to evening.",
    icon: Sparkles,
  },
  {
    title: "Elegant packaging",
    description:
      "Luxury presentation with a clean, gift-worthy finish in every order.",
    icon: PackageCheck,
  },
  {
    title: "Perfect for gifting",
    description:
      "Sophisticated scents and presentation that make every occasion feel special.",
    icon: Gift,
  },
];

const testimonials = [
  {
    name: "Afiya K.",
    title: "Kozhikode",
    quote:
      "The fragrance feels expensive from the first spray. Beautiful packaging and a scent that lasts all evening.",
  },
  {
    name: "Rishan M.",
    title: "Kochi",
    quote:
      "Abooba Perfumes has the kind of signature scents that feel personal. Clean, refined, and ideal for gifting.",
  },
  {
    name: "Nimra P.",
    title: "Malappuram",
    quote:
      "I loved how elegant everything felt, from the bottle to the unboxing. It truly feels like a premium brand.",
  },
];

const instagramShots = [
  {
    title: "Bottle detail",
    image:
      "https://images.unsplash.com/photo-1619994403073-2cec5a9c2f77?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Vanity styling",
    image:
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&w=900&q=80",
    className: "",
  },
  {
    title: "Gift presentation",
    image:
      "https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=900&q=80",
    className: "",
  },
  {
    title: "Aromatic workspace",
    image:
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-2",
  },
  {
    title: "Luxury shelf",
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=80",
    className: "",
  },
];

const faqs = [
  {
    question: "Do you offer delivery across Kerala and India?",
    answer:
      "Yes. We aim to deliver across Kerala and major locations in India with secure packaging and order updates.",
  },
  {
    question: "Are your perfumes authentic and long-lasting?",
    answer:
      "Abooba Perfumes focuses on premium fragrance quality, carefully selected blends, and a long-lasting scent experience.",
  },
  {
    question: "Can I order perfumes as gifts?",
    answer:
      "Yes. Our presentation is designed to feel gift-ready, and select collections are especially suited for gifting.",
  },
  {
    question: "How do I choose the right fragrance for me?",
    answer:
      "Start with your preferred scent family such as woody, floral, musk, or fresh. Our collections are organized to make discovery easier.",
  },
];

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignmentClassName =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignmentClassName}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#997240]">
        {eyebrow}
      </p>
      <h2
        className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl`}
      >
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function PrimaryButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-6 py-3 text-sm font-semibold text-[#0f1720] shadow-[0_18px_40px_-20px_rgba(216,187,130,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-22px_rgba(216,187,130,0.95)]"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-[#d8bb82]/45 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main
        className={`${poppins.className} overflow-hidden bg-[#06131d] text-white`}
      >
        <section className="relative isolate">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(12,109,96,0.34),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(18,66,108,0.28),_transparent_32%),linear-gradient(180deg,_#07131d_0%,_#081520_48%,_#071019_100%)]" />
          <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-[#d8bb82]/10 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-14 px-4 py-12 sm:px-6 md:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb82]/20 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#e3c995] backdrop-blur">
                <BadgeCheck size={14} />
                Signature fragrance house
              </div>

              <h1
                className={`${montserrat.className} mt-8 text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl`}
              >
                Discover the Essence of Luxury
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore a refined world of signature perfumes crafted for men,
                women, and thoughtful gifting. Every bottle is designed to feel
                elegant, memorable, and beautifully modern.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryButton href="/products">Shop Now</PrimaryButton>
                <SecondaryButton href="#categories">
                  Explore Collection
                </SecondaryButton>
              </div>

              <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
                {[
                  ["Premium blends", "Elegant notes curated for everyday luxury"],
                  ["Gift-ready", "Beautiful presentation for meaningful occasions"],
                  ["Modern identity", "Signature scents for men and women"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 shadow-[0_25px_80px_-60px_rgba(0,0,0,0.85)] backdrop-blur"
                  >
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur lg:block" />
              <div className="absolute -right-6 bottom-10 hidden h-36 w-36 rounded-full bg-[#d8bb82]/15 blur-3xl lg:block" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-3 shadow-[0_30px_120px_-45px_rgba(0,0,0,0.85)] backdrop-blur sm:p-5">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,15,24,0.08)_0%,rgba(5,15,24,0.18)_36%,rgba(5,15,24,0.72)_100%)]" />
                  <Image
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury perfume bottle with elegant styling"
                    width={900}
                    height={1100}
                    priority
                    className="h-[28rem] w-full object-cover sm:h-[38rem]"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#e3c995]">
                      Abooba Signature
                    </p>
                    <h2
                      className={`${montserrat.className} mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl`}
                    >
                      Crafted for presence, warmth, and unforgettable elegance
                    </h2>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-100">
                        Deep aromatic notes
                      </span>
                      <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-100">
                        Luxury gifting
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-[#0d2232]/82 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d8bb82]">
                    Best for
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Signature daily wear
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1c29]/82 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#d8bb82]">
                    Experience
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Elegant, modern, warm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Collections"
              title="Featured categories designed for every fragrance identity"
              description="Browse refined perfume collections tailored for men, women, versatile unisex wear, and premium gifting moments."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <article
                  key={category.title}
                  className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6 shadow-[0_25px_80px_-58px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d8bb82]/35"
                >
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,19,29,0.02)_0%,rgba(6,19,29,0.08)_28%,rgba(6,19,29,0.72)_100%)]" />
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={700}
                      height={900}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className={`${montserrat.className} text-2xl font-semibold tracking-tight text-white`}
                    >
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {category.description}
                    </p>
                    <Link
                      href="/products"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#e3c995] transition hover:text-white"
                    >
                      View collection
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(8,73,66,0.18),_transparent_26%),linear-gradient(180deg,_rgba(8,17,25,0)_0%,_rgba(7,18,27,0.7)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Best Sellers"
              title="Popular fragrances chosen for presence, character, and effortless sophistication"
              description="Our most-loved perfumes balance refined notes, modern luxury, and elegant presentation for gifting or personal signature wear."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {bestSellers.map((product) => (
                <article
                  key={product.name}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d8bb82]/35"
                >
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,19,29,0.08)_0%,rgba(7,19,29,0.12)_35%,rgba(7,19,29,0.55)_100%)]" />
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={700}
                      height={900}
                      className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d8bb82]">
                      {product.note}
                    </p>
                    <h3
                      className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-white`}
                    >
                      {product.name}
                    </h3>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
                          Price
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-white">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/products"
                          className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                          View
                        </Link>
                        <Link
                          href="/products"
                          className="rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-4 py-2 text-sm font-semibold text-[#0f1720] transition hover:brightness-105"
                        >
                          Add
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.12),_transparent_36%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <Image
                  src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80"
                  alt="Elegant perfume arrangement for the Abooba brand story"
                  width={900}
                  height={1000}
                  className="h-full min-h-[22rem] w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] p-8 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur sm:p-10">
              <SectionHeading
                eyebrow="About Abooba"
                title="A fragrance house shaped by craftsmanship, elegance, and lasting impression"
                description="Abooba Perfumes is built around the idea that a fragrance should feel deeply personal and beautifully presented. Our approach blends premium notes, refined composition, and a luxury-first aesthetic that feels timeless, modern, and memorable."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Crafted to feel elegant in both everyday wear and special moments.",
                  "Designed with warm aromatic depth, smooth transitions, and modern refinement.",
                  "Presented with premium packaging that feels gift-worthy from the first glance.",
                  "Made for fragrance lovers who value identity, quality, and sophisticated detail.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0b1d2a]/72 p-5"
                  >
                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Luxury fragrance essentials presented with clarity and purpose"
              description="Every detail is designed to create a premium buying experience that feels elegant, trustworthy, and gift-ready."
              align="center"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 text-center shadow-[0_24px_90px_-60px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#d8bb82]/35"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(216,187,130,0.2),rgba(13,83,96,0.2))] text-[#e3c995]">
                      <Icon size={24} />
                    </div>
                    <h3
                      className={`${montserrat.className} mt-5 text-xl font-semibold tracking-tight text-white`}
                    >
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="What customers love about the Abooba experience"
              description="A premium fragrance is more than scent alone. Our customers value the identity, presentation, and elegant feel of every order."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-[1.8rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.92)] backdrop-blur"
                >
                  <div className="flex gap-1 text-[#e3c995]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${testimonial.name}-${index}`} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-6 text-base leading-8 text-slate-200">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{testimonial.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,83,96,0.22),_transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Instagram"
                title="A premium social gallery inspired by fragrance rituals and elegant presentation"
                description="From product close-ups to styled gifting moments, follow our visual world for warm, modern, and aromatic inspiration."
              />

              <Link
                href="https://instagram.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#d8bb82]/35 hover:bg-white/10"
              >
                <ImageIcon size={16} />
                Follow Us on Instagram
              </Link>
            </div>

            <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-3">
              {instagramShots.map((shot) => (
                <article
                  key={shot.title}
                  className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6 shadow-[0_22px_90px_-55px_rgba(0,0,0,0.9)] ${shot.className}`}
                >
                  <Image
                    src={shot.image}
                    alt={shot.title}
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,29,0.05)_0%,rgba(6,19,29,0.2)_38%,rgba(6,19,29,0.76)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-medium text-white">{shot.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#d8bb82]">
                      @aboobaperfumes
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Everything you may want to know before choosing your fragrance"
              description="Answers to common questions about delivery, authenticity, longevity, and gifting."
              align="center"
            />

            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-[0_22px_90px_-62px_rgba(0,0,0,0.9)] backdrop-blur"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <span className="text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    <Box className="shrink-0 text-[#d8bb82] transition group-open:rotate-45" size={18} />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

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
                    Explore premium scents, refined gift sets, and elegant
                    fragrance experiences designed to feel memorable from first
                    impression to final note.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <PrimaryButton href="/products">Shop Now</PrimaryButton>
                  <SecondaryButton href="#categories">
                    Browse Categories
                  </SecondaryButton>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                {[
                  "Luxury-inspired curation",
                  "Elegant gifting moments",
                  "Responsive modern shopping",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-100">
                    <ShieldCheck size={18} className="text-[#d8bb82]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
