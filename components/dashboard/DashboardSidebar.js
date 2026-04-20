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
          ? "border-teal-200 bg-teal-50 text-teal-900 shadow-[0_16px_36px_-24px_rgba(13,148,136,0.55)]"
          : "border-stone-200 bg-white text-stone-600 hover:border-teal-100 hover:bg-stone-50 hover:text-stone-950",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          isActive ? "bg-white text-teal-700" : "bg-stone-100 text-stone-500",
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
    <aside className="space-y-4">
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

      <div className="hidden rounded-[1.75rem] border border-stone-200 bg-stone-50/85 p-3 lg:block">
        <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
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
