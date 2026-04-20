function LoadingCard() {
  return (
    <div className="animate-pulse rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6">
      <div className="h-3 w-24 rounded-full bg-stone-200" />
      <div className="mt-4 h-7 w-40 rounded-full bg-stone-200" />
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full rounded-full bg-stone-100" />
        <div className="h-4 w-10/12 rounded-full bg-stone-100" />
        <div className="h-4 w-8/12 rounded-full bg-stone-100" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.16),_transparent_30%),linear-gradient(180deg,_#f7f7f5_0%,_#ecfeff_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="animate-pulse rounded-[2rem] border border-stone-200/80 bg-white/75 p-6 shadow-[0_24px_90px_-48px_rgba(15,118,110,0.3)] backdrop-blur sm:p-8">
          <div className="h-3 w-32 rounded-full bg-stone-200" />
          <div className="mt-5 h-10 w-60 rounded-full bg-stone-200" />
          <div className="mt-4 h-4 w-full max-w-2xl rounded-full bg-stone-100" />
          <div className="mt-2 h-4 w-full max-w-xl rounded-full bg-stone-100" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="hidden gap-3 lg:grid">
              <div className="h-14 rounded-[1.5rem] bg-stone-100" />
              <div className="h-14 rounded-[1.5rem] bg-stone-100" />
              <div className="h-14 rounded-[1.5rem] bg-stone-100" />
            </div>

            <div className="grid gap-4">
              <LoadingCard />
              <LoadingCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
