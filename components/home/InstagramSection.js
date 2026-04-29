import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { INSTAGRAM_ACCOUNT_URL } from "@/lib/instagram/reels";
import SectionHeading from "./SectionHeading";

const reelLayoutClasses = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

function getReelTitle(reel) {
  return reel.caption.split("\n")[0].trim() || "Instagram reel";
}

export default function InstagramSection({ reels = [] }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,83,96,0.22),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Instagram"
            title="A premium social gallery inspired by fragrance rituals and elegant presentation"
            description="From product close-ups to styled gifting moments, follow our visual world for warm, modern, and aromatic inspiration."
          />

          <Link
            href={INSTAGRAM_ACCOUNT_URL}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#d8bb82]/35 hover:bg-white/10"
          >
            <ImageIcon size={16} />
            Follow Us on Instagram
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {reels.map((reel, index) => (
            <article
              key={reel.id}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6 shadow-[0_22px_90px_-55px_rgba(0,0,0,0.9)] ${
                reelLayoutClasses[index] ?? ""
              }`}
            >
              <Link
                href={reel.permalink}
                className="absolute inset-0 z-20"
                aria-label={`Open ${getReelTitle(reel)} on Instagram`}
              />
              {reel.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={reel.imageUrl}
                  alt={getReelTitle(reel)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.22),_transparent_42%),linear-gradient(135deg,_#0b2f3a_0%,_#07131d_70%,_#0f1720_100%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,29,0.05)_0%,rgba(6,19,29,0.2)_38%,rgba(6,19,29,0.76)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="line-clamp-2 text-sm font-medium text-white">
                  {getReelTitle(reel)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#d8bb82]">
                  @aboobaperfumes
                </p>
              </div>
            </article>
          ))}
          {reels.length === 0 ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 px-6 py-8 text-sm leading-6 text-slate-300 md:col-span-3">
              Instagram reels will appear here after the Instagram API
              credentials are configured.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
