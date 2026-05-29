"use client";

import { useRef, useState } from "react";
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
          {faqs.map((faq) => {
            const isOpen = openQuestion === faq.question;

            return (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={isOpen}
                onToggle={() =>
                  setOpenQuestion((currentQuestion) =>
                    currentQuestion === faq.question ? "" : faq.question,
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const answerId = `faq-answer-${faq.question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

  return (
    <div className="theme-panel rounded-[1.6rem] border p-6 backdrop-blur">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <span className="theme-heading text-lg font-semibold">
          {faq.question}
        </span>
        <Box
          className={`shrink-0 text-[#d8bb82] transition-transform duration-300 ease-out ${
            isOpen ? "rotate-45" : ""
          }`}
          size={18}
        />
      </button>
      <div
        id={answerId}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight ?? 0}px` : "0px",
        }}
      >
        <div ref={answerRef} className="pt-4">
          <p className="theme-muted max-w-3xl text-sm leading-7">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
