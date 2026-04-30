import Link from "next/link";
import { Heart, MapPinHouse, UserRound } from "lucide-react";

const TAB_ICONS = {
  profile: UserRound,
  address: MapPinHouse,
  favorites: Heart,
};

function TabLink({ href, label, isActive, icon: Icon }) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "inline-flex items-center gap-3 rounded-[1.3rem] border px-4 py-3 text-sm font-medium transition",
        isActive
          ? "border-[#d8bb82]/35 bg-[#d8bb82]/12 text-[#e3c995] shadow-[0_16px_36px_-24px_rgba(216,187,130,0.55)]"
          : "border-white/10 bg-white/6 text-slate-300 hover:border-[#d8bb82]/25 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          isActive ? "bg-[#d8bb82] text-[#0f1720]" : "bg-white/8 text-slate-400",
        ].join(" ")}
      >
        <Icon size={17} />
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardSidebar({ activeTab, tabs }) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="flex gap-3 overflow-x-auto pb-1 lg:hidden">
        {Object.entries(tabs).map(([key, label]) => {
          const Icon = TAB_ICONS[key];

          return (
            <TabLink
              key={key}
              href={`/dashboard?tab=${key}`}
              label={label}
              isActive={activeTab === key}
              icon={Icon}
            />
          );
        })}
      </div>

      <div className="hidden rounded-[1.75rem] border border-white/10 bg-white/6 p-3 lg:block">
        <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Dashboard
        </p>
        <nav className="grid gap-2">
          {Object.entries(tabs).map(([key, label]) => {
            const Icon = TAB_ICONS[key];

            return (
              <TabLink
                key={key}
                href={`/dashboard?tab=${key}`}
                label={label}
                isActive={activeTab === key}
                icon={Icon}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
