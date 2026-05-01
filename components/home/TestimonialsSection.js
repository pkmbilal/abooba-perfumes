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
              className="theme-panel rounded-[1.8rem] border p-7 backdrop-blur"
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
              <p className="theme-muted mt-6 text-base leading-8">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="theme-border mt-8 border-t pt-5">
                <p className="theme-heading font-semibold">{testimonial.name}</p>
                <p className="theme-muted mt-1 text-sm">
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
