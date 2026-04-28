import { Star } from "lucide-react";
import { testimonials } from "./home-data";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What customers love about the Abooba experience"
          description="A premium fragrance is more than scent alone. Our customers value the identity, presentation, and elegant feel of every order."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-[1.8rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.92)] backdrop-blur"
            >
              <div className="flex gap-1 text-[#e3c995]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${testimonial.name}-${index}`}
                    size={16}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="mt-6 text-base leading-8 text-slate-200">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {testimonial.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
