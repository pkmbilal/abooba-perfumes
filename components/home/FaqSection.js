"use client";

import { useState } from "react";
import { Box } from "lucide-react";
import { faqs } from "./home-data";
import SectionHeading from "./SectionHeading";

export default function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState("");

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Everything you may want to know before choosing your fragrance"
          description="Answers to common questions about delivery, authenticity, longevity, and gifting."
          align="center"
        />

        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              open={openQuestion === faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  setOpenQuestion(faq.question);
                } else if (openQuestion === faq.question) {
                  setOpenQuestion("");
                }
              }}
              className="theme-panel group rounded-[1.6rem] border p-6 backdrop-blur"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="theme-heading text-lg font-semibold">
                  {faq.question}
                </span>
                <Box
                  className="shrink-0 text-[#d8bb82] transition group-open:rotate-45"
                  size={18}
                />
              </summary>
              <p className="theme-muted mt-4 max-w-3xl text-sm leading-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
