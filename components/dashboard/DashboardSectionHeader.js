export default function DashboardSectionHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="theme-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8bb82]">
          {eyebrow}
        </p>
        <h2 className="theme-heading mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="theme-muted mt-3 text-sm leading-7">{description}</p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
