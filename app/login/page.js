import { redirect } from "next/navigation";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AuthForm from "@/components/auth/AuthForm";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Login | Abooba Perfumes",
  description: "Sign in to your Abooba Perfumes account.",
};

export default async function LoginPage({ searchParams }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(getPostAuthRedirectPath(user));
  }

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.16),_transparent_30%),linear-gradient(180deg,_#f7f7f5_0%,_#f0fdfa_100%)] px-6 py-16">
        <AuthForm mode="login" errorCode={searchParams?.error} />
      </main>
      <Footer />
    </>
  );
}
