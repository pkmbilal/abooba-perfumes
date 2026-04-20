export default function DashboardSectionHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight text-stone-950">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
