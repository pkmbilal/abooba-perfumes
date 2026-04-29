import { benefits } from "./home-data";
import { montserrat } from "./home-fonts";
import SectionHeading from "./SectionHeading";

export default function BenefitsSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Luxury fragrance essentials presented with clarity and purpose"
          description="Every detail is designed to create a premium buying experience that feels elegant, trustworthy, and gift-ready."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
  );
}
