import Image from "next/image";
import { brandStoryPoints } from "./home-data";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="theme-panel relative h-full overflow-hidden rounded-[2rem] border p-4 backdrop-blur">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.12),_transparent_36%)]" />
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.5rem]">
            <Image
              src="/images/home/about_section_bg.webp"
              alt="Elegant perfume arrangement for the Abooba brand story"
              width={900}
              height={1000}
              className="h-full min-h-[22rem] w-full object-cover object-[64%_center]"
            />
          </div>
        </div>

        <div className="theme-panel rounded-[2rem] border p-8 backdrop-blur sm:p-10">
          <SectionHeading
            eyebrow="About Abooba"
            title="A fragrance house shaped by craftsmanship, elegance, and lasting impression"
            description="Abooba Perfumes is built around the idea that a fragrance should feel deeply personal and beautifully presented. Our approach blends premium notes, refined composition, and a luxury-first aesthetic that feels timeless, modern, and memorable."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {brandStoryPoints.map((item) => (
              <div
                key={item}
                className="theme-chip rounded-[1.5rem] border p-5"
              >
                <p className="text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
