import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "./home-data";
import { montserrat } from "./home-fonts";
import SectionHeading from "./SectionHeading";

export default function CategoriesSection() {
  return (
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
  );
}
