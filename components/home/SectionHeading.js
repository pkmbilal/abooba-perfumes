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
