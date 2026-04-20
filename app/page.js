import Header from "@/components/common/Header";
import { createSupabaseServerClient } from "../lib/supabase/server";
import Footer from "@/components/common/Footer";

export default async function Home() {
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let authState = "Configure your Supabase environment variables to continue.";

  if (hasSupabaseEnv) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    authState = user
      ? `Signed in as ${user.email ?? user.id}`
      : "Supabase is connected. No active user session was found.";
  }

  return (
    <>
    <Header />
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 py-16 text-stone-50">
      <section className="w-full max-w-3xl rounded-[2rem] border border-stone-800 bg-stone-900/80 p-8 shadow-2xl shadow-black/30 sm:p-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              Abooba Perfumes
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Supabase is wired into this Next 16 app.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-300">
              The app now includes browser and server Supabase clients using the
              App Router pattern for this version of Next.js.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-stone-800 bg-stone-950 p-5">
              <p className="text-sm text-stone-400">Environment</p>
              <p className="mt-3 text-xl font-medium text-white">
                {hasSupabaseEnv ? "Configured" : "Missing variables"}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                {hasSupabaseEnv
                  ? process.env.NEXT_PUBLIC_SUPABASE_URL
                  : "Add the values from .env.example to a local .env file."}
              </p>
            </article>

            <article className="rounded-3xl border border-stone-800 bg-stone-950 p-5">
              <p className="text-sm text-stone-400">Auth status</p>
              <p className="mt-3 text-xl font-medium text-white">{authState}</p>
            </article>
          </div>

          <div className="rounded-3xl border border-teal-500/20 bg-teal-500/10 p-5 text-sm leading-7 text-teal-100">
            Next step: create a `.env.local` file with your Supabase project URL
            and publishable key, then build routes or server actions on top of
            the helpers in `lib/supabase`.
          </div>
        </div>
      </section>
    </main>
    <Footer />
</>
  );
}
