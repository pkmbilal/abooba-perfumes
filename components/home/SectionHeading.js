import { montserrat } from "./home-fonts";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignmentClassName =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignmentClassName}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#997240] dark:text-[#d8bb82]">
        {eyebrow}
      </p>
      <h2
        className={`${montserrat.className} theme-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl`}
      >
        {title}
      </h2>
      <p className="theme-muted mt-4 text-sm leading-7 sm:text-base">
        {description}
      </p>
    </div>
  );
}
