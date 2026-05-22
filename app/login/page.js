import { redirect } from "next/navigation";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AuthForm from "@/components/auth/AuthForm";
import { poppins } from "@/components/home/home-fonts";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Login | Abooba Perfumes",
  description: "Sign in to your Abooba Perfumes account.",
};

export default async function LoginPage({ searchParams }) {
  let user = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    user = authUser;
  } catch {
    user = null;
  }

  if (user) {
    redirect(getPostAuthRedirectPath(user));
  }

  return (
    <>
      <Header />
      <main
        className={`${poppins.className} theme-page flex min-h-[calc(100vh-10rem)] items-center justify-center px-6 pb-16 pt-28 sm:pt-32`}
      >
        <AuthForm mode="login" errorCode={searchParams?.error} />
      </main>
      <Footer />
    </>
  );
}
