function LoadingCard() {
  return (
    <div className="animate-pulse rounded-[1.75rem] border border-white/10 bg-white/6 p-6">
      <div className="h-3 w-24 rounded-full bg-white/15" />
      <div className="mt-4 h-7 w-40 rounded-full bg-white/15" />
      <div className="mt-5 flex flex-col gap-3">
        <div className="h-4 w-full rounded-full bg-white/10" />
        <div className="h-4 w-10/12 rounded-full bg-white/10" />
        <div className="h-4 w-8/12 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-[radial-gradient(circle_at_18%_12%,rgba(12,109,96,0.24),transparent_32%),radial-gradient(circle_at_88%_4%,rgba(216,187,130,0.14),transparent_28%),linear-gradient(180deg,#07131d_0%,#06131d_64%,#081119_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="animate-pulse rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)] backdrop-blur sm:p-8">
          <div className="h-3 w-32 rounded-full bg-white/15" />
          <div className="mt-5 h-10 w-60 rounded-full bg-white/15" />
          <div className="mt-4 h-4 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="mt-2 h-4 w-full max-w-xl rounded-full bg-white/10" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="hidden gap-3 lg:grid">
              <div className="h-14 rounded-[1.5rem] bg-white/10" />
              <div className="h-14 rounded-[1.5rem] bg-white/10" />
              <div className="h-14 rounded-[1.5rem] bg-white/10" />
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
