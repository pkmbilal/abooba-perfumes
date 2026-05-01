"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={[
        "fixed bottom-10 right-10 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur transition duration-300",
        "border-[#7a5525]/25 bg-white/85 text-[#7a5525] shadow-[0_18px_45px_-28px_rgba(67,47,20,0.75)] hover:-translate-y-0.5 hover:border-[#7a5525]/40 hover:bg-white hover:text-[#17130c]",
        "dark:border-[#d8bb82]/25 dark:bg-[#07131d]/82 dark:text-[#e3c995] dark:shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] dark:hover:border-[#d8bb82]/45 dark:hover:bg-[#0f1720] dark:hover:text-white",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <ArrowUp size={19} strokeWidth={1.8} />
    </button>
  );
}
